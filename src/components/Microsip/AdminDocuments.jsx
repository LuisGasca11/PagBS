import { useEffect, useRef, useState } from "react";
import { FileText, Trash2, Download, Folder, Eye } from "lucide-react";
import {
  getDocumentos,
  deleteDocumento,
  downloadDocumento,
  getPublicPreviewUrl,
} from "./utils/documentos.api";
import DocumentUploader from "./DocumentUploader";
import { toast } from "sonner";

export default function AdminDocuments({ token, isAdmin, onClose }) {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const close = () => {
    window.history.back();
  };

  const loadDocs = async () => {
    try {
      setLoading(true);
      const data = await getDocumentos(token);
      setDocs(data);
    } catch {
      toast.error("Error cargando documentos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocs();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (previewUrl) {
          setPreviewUrl(null);
        } else {
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [previewUrl]);

  const handleBackdropMouseDown = (e) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      onClose();
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar documento?")) return;
    try {
      await deleteDocumento(id, token);
      toast.success("Documento eliminado");
      loadDocs();
    } catch {
      toast.error("Error eliminando documento");
    }
  };

  const handlePreview = async (id) => {
    try {
      const url = await getPublicPreviewUrl(id, token);
      setPreviewUrl(url);
    } catch (err) {
      toast.error("Error abriendo preview");
      console.error(err);
    }
  };

  const handleDownload = async (id) => {
    try {
      await downloadDocumento(id, token);
    } catch (err) {
      toast.error("Error descargando documento");
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <>
      <div
        onMouseDown={handleBackdropMouseDown}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center"
      >
        <div
          ref={containerRef}
          className="bg-gray-50 w-full max-w-7xl h-[90vh] rounded-2xl shadow-2xl overflow-y-auto"
        >
          <div className="px-4 sm:px-6 lg:px-8 py-10 min-h-full">
            {/* Título y Uploader */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-md flex items-center justify-center">
                  <Folder className="text-white w-6 h-6" />
                </div>
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                  Gestión de Documentos
                </h1>
              </div>

              {isAdmin && <DocumentUploader token={token} onUploaded={loadDocs} />}
            </div>

            {/* Área de Documentos */}
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
              {loading ? (
                <p className="p-8 text-lg font-medium text-gray-500 flex items-center justify-center">
                  Cargando documentos...
                </p>
              ) : docs.length === 0 ? (
                <div className="p-8 text-center text-lg text-gray-500">
                  <FileText className="w-10 h-10 text-orange-300 mx-auto mb-3" />
                  <p>No hay documentos cargados.</p>
                </div>
              ) : (
                <table className="w-full text-sm text-gray-700">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left w-1/3">Documento</th>
                      <th className="px-6 py-3 text-center w-1/6">Tamaño</th>
                      <th className="px-6 py-3 text-center w-1/6">Subido por</th>
                      <th className="px-6 py-3 text-center w-1/6">Fecha</th>
                      <th className="px-6 py-3 text-right w-1/6">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {docs.map((d) => (
                      <tr key={d.id_documento} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">{d.nombre_original}</td>
                        <td className="px-6 py-4 text-center">{formatFileSize(d.tamano)}</td>
                        <td className="px-6 py-4 text-center">{d.usuario}</td>
                        <td className="px-6 py-4 text-center">
                          {new Date(d.fecha_creacion).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handlePreview(d.id_documento)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Vista previa"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDownload(d.id_documento)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Descargar"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                            {isAdmin && (
                              <button
                                onClick={() => handleDelete(d.id_documento)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Eliminar"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Preview */}
      {previewUrl && (
        <div
          className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4"
          onClick={() => setPreviewUrl(null)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Vista Previa</h2>
              <button
                onClick={() => setPreviewUrl(null)}
                className="px-4 py-2 text-sm bg-black hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cerrar
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <iframe
                src={previewUrl}
                className="w-full h-full border-0"
                title="Document Preview"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}