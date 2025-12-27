import { useState } from "react";
import { mapTotalsToPresentation } from "./utils/mapTotalsToPresentation";
import modulesList from "./utils/modulesList";
import { loadSession } from "./utils/auth";

// ✅ Variable de entorno al inicio
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3019';

export default function DownloadPresentation({
  moduleSelections,
  totals,
  paymentFrequency,
  selectedVps = [],
  hourRentals = [],
  userCount = 0,
  isCloudUsers = true
}) {
  const [logoBase64, setLogoBase64] = useState(null);
  const [loading, setLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const [formData, setFormData] = useState({
    titulo: "Propuesta Comercial",
    contexto: "",
    objetivo: "",
    diagnostico: "",
    resultado: ""
  });

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setLogoBase64(reader.result.split(",")[1]);
      setLogoPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDownload = async () => {
    setLoading(true);
    try {
      const session = loadSession();

      if (!session || !session.token) {
        throw new Error("No hay sesión activa. Por favor inicia sesión.");
      }

      const token = session.token;

      const mappedData = mapTotalsToPresentation({
        moduleSelections, modulesList, selectedVps, hourRentals,
        totals, paymentFrequency, userCount, isCloudUsers,
        exchangeRate: totals.exchangeRate || 17.0
      });

      const payload = {
        ...formData,
        diagnostico: formData.diagnostico.split("\n").filter(l => l.trim()).map(l => `• ${l.trim()}`),
        fecha: new Date().toLocaleDateString("es-MX", { 
          year: "numeric", 
          month: "long", 
          day: "numeric" 
        }),
        ...mappedData,
        logoBase64
      };

      // ✅ Usar API_URL dinámico
      const res = await fetch(`${API_URL}/api/presentation`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || errorData.message || "Error al generar el archivo");
      }

      const data = await res.json();

      // ✅ Usar downloadUrl del backend
      if (data.success && data.downloadUrl) {
        const link = document.createElement('a');
        link.href = data.downloadUrl;
        link.setAttribute('download', data.fileName || 'propuesta.pptx');
        link.target = '_blank'; // Importante para CORS
        document.body.appendChild(link);
        link.click();
        
        setTimeout(() => {
          document.body.removeChild(link);
        }, 100);
      }
      
    } catch (err) {
      console.error("Error en descarga:", err);
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all";
  const labelClasses = "flex items-center gap-2 text-xs font-bold text-gray-600 uppercase mb-1.5 ml-1";

  return (
    <div className="mt-6 space-y-6">
      <div className="bg-white rounded-2xl p-5 sm:p-8 shadow-inner border border-white/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="md:col-span-2">
            <label className={labelClasses}>
               Título de la Propuesta
            </label>
            <input
              type="text"
              value={formData.titulo}
              onChange={(e) => handleInputChange("titulo", e.target.value)}
              className={inputClasses}
              placeholder="Ej. Implementación Microsip - Cliente"
            />
          </div>

          <div>
            <label className={labelClasses}>Objetivo</label>
            <textarea
              value={formData.objetivo}
              onChange={(e) => handleInputChange("objetivo", e.target.value)}
              rows={3}
              className={inputClasses}
              placeholder="¿Qué buscamos lograr?"
            />
          </div>

          <div>
            <label className={labelClasses}> Contexto del Cliente</label>
            <textarea
              value={formData.contexto}
              onChange={(e) => handleInputChange("contexto", e.target.value)}
              rows={3}
              className={inputClasses}
              placeholder="Situación actual..."
            />
          </div>

          <div className="md:col-span-2">
            <label className={labelClasses}> Diagnóstico (Una línea por punto)</label>
            <textarea
              value={formData.diagnostico}
              onChange={(e) => handleInputChange("diagnostico", e.target.value)}
              rows={4}
              className={`${inputClasses} font-mono text-sm`}
              placeholder="Punto 1&#10;Punto 2..."
            />
          </div>

          <div className="md:col-span-2">
            <label className={labelClasses}>Resultado Esperado</label>
            <input
              type="text"
              value={formData.resultado}
              onChange={(e) => handleInputChange("resultado", e.target.value)}
              className={inputClasses}
              placeholder="¿Cuál será el impacto final?"
            />
          </div>
        </div>
      </div>

      {/* SECCIÓN DE LOGO Y BOTÓN */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Dropzone Mini */}
        <div className="relative flex-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-4 flex items-center gap-4 group hover:bg-white/30 transition-all">
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
          />
          <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
            {logoPreview ? (
              <img src={logoPreview} alt="Logo" className="h-full w-full object-contain p-1" />
            ) : (
              <span className="text-2xl">🖼️</span>
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-white leading-tight">Logo del Cliente</p>
            <p className="text-xs text-white/70 italic">Opcional - Reemplaza etiqueta</p>
          </div>
          {logoPreview && (
            <button 
              onClick={() => {setLogoPreview(null); setLogoBase64(null);}}
              className="z-30 p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          )}
        </div>

        {/* Botón de Descarga */}
        <button
          onClick={handleDownload}
          disabled={loading}
          className={`flex-[1.2] py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-3
            ${loading 
              ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
              : "bg-gray-900 text-white hover:bg-black active:scale-[0.98] border-b-4 border-gray-700"
            }`}
        >
          {loading ? (
            <>
              <div className="h-5 w-5 border-2 border-gray-400 border-t-white rounded-full animate-spin" />
              Generando...
            </>
          ) : (
            <>
              Descargar Presentación PPTX
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
}