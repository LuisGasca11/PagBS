import { Upload, File } from "lucide-react";
import { useState } from "react";
import { uploadDocumento } from "./utils/documentos.api";
import { toast } from "sonner";

export default function DocumentUploader({ token, onUploaded }) {
  const [loading, setLoading] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      await uploadDocumento(file, token);
      toast.success("Documento subido correctamente");
      onUploaded();
    } catch {
      toast.error("Error subiendo documento");
    } finally {
      setLoading(false);
      e.target.value = "";
    }
  };

  return (
    <label className="flex items-center gap-3 px-5 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl cursor-pointer shadow-lg transition-all">
      <Upload className="w-5 h-5" />
      <span className="font-semibold">
        {loading ? "Subiendo..." : "Subir documento"}
      </span>
      <input
        type="file"
        onChange={handleFile}
        className="hidden"
      />
    </label>
  );
}
