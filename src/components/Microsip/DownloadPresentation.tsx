import { useState } from "react";
import { mapTotalsToPresentation } from "./utils/mapTotalsToPresentation";
import modulesList from "./utils/modulesList";

const API_URL = import.meta.env.PROD 
  ? 'https://blck-sheep.com/Prices' 
  : 'http://localhost:3019';

export default function DownloadPresentation({
  moduleSelections,
  totals,
  paymentFrequency,
  selectedVps = [],
  hourRentals = [],
  userCount = 0
}) {
  const [logoBase64, setLogoBase64] = useState(null);
  const [loading, setLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const [formData, setFormData] = useState({
    titulo: "Propuesta Comercial 2025",
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
      const base64 = reader.result.split(",")[1];
      setLogoBase64(base64);
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
      const mappedData = mapTotalsToPresentation({
        moduleSelections,
        modulesList,
        selectedVps,
        hourRentals,
        totals,
        paymentFrequency,
        userCount
      });

      // Preparar diagnóstico como array
      const diagnosticoArray = formData.diagnostico
        .split("\n")
        .filter(line => line.trim())
        .map(line => `• ${line.trim()}`);

      const payload = {
        titulo: formData.titulo,
        fecha: new Date().toLocaleDateString("es-MX", {
          year: "numeric",
          month: "long",
          day: "numeric"
        }),
        contexto: formData.contexto,
        objetivo: formData.objetivo,
        diagnostico: diagnosticoArray,
        resultado: formData.resultado,
        modulos: mappedData.modulos,
        servicios: mappedData.servicios,
        implementacion: mappedData.implementacion,
        subtotal: mappedData.subtotal,
        total: mappedData.total,
        frecuencia: mappedData.frecuencia,
        logoBase64: logoBase64 || null  
      };

      console.log("📤 Enviando datos:", payload);

      const res = await fetch(`${API_URL}/api/presentation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Error al generar presentación");
      }

      const data = await res.json();
      
      window.open(`${API_URL}${data.url}`, "_blank");
      
      if (data.hasLogo) {
        alert("✅ Presentación generada con logo del cliente incluido!");
      } else {
        alert(`✅ ${data.message || "Presentación generada"}\n\n💡 Puedes agregar el logo manualmente si lo deseas.`);
      }

    } catch (err) {
      console.error("❌ Error:", err);
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Título de la Propuesta
          </label>
          <input
            type="text"
            value={formData.titulo}
            onChange={(e) => handleInputChange("titulo", e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
            placeholder="Propuesta Comercial 2025"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Contexto del Cliente
          </label>
          <textarea
            value={formData.contexto}
            onChange={(e) => handleInputChange("contexto", e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
            placeholder="Describe la situación actual del cliente..."
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Objetivo de la Propuesta
          </label>
          <textarea
            value={formData.objetivo}
            onChange={(e) => handleInputChange("objetivo", e.target.value)}
            rows={2}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
            placeholder="¿Qué se busca lograr con esta implementación?"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Diagnóstico (un punto por línea)
          </label>
          <textarea
            value={formData.diagnostico}
            onChange={(e) => handleInputChange("diagnostico", e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
            placeholder="Sistema actual desactualizado&#10;Falta de integración entre áreas&#10;Procesos manuales lentos"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Resultado Esperado
          </label>
          <textarea
            value={formData.resultado}
            onChange={(e) => handleInputChange("resultado", e.target.value)}
            rows={2}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
            placeholder="Optimización de procesos, reducción de tiempos..."
          />
        </div>
      </div>

      <div className="border-2 border-dashed border-white rounded-lg p-6 bg-white/5">
        <label className="block text-sm font-semibold text-white mb-3">
          Logo del Cliente (Opcional - se insertará automáticamente)
        </label>
        
        <div className="space-y-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="block w-full text-sm text-white
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-white file:text-orange-500
              hover:file:bg-gray-100
              file:cursor-pointer cursor-pointer"
          />
          
          {logoPreview && (
            <div className="bg-white rounded-lg p-4 flex items-center gap-4">
              <img
                src={logoPreview}
                alt="Logo preview"
                className="h-24 w-24 object-contain"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-700">✅ Logo cargado</p>
                <p className="text-xs text-gray-500 mt-1">
                  Se insertará automáticamente en la portada
                </p>
                <button
                  onClick={() => {
                    setLogoBase64(null);
                    setLogoPreview(null);
                  }}
                  className="mt-2 text-xs text-red-600 hover:text-red-700 font-medium"
                >
                  Eliminar
                </button>
              </div>
            </div>
          )}
          
          {!logoPreview && (
            <div className="flex items-start gap-2 text-sm text-white/80">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>
                Si subes un logo, se insertará automáticamente en la portada. 
                Si no subes logo, podrás agregarlo manualmente después.
              </p>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={handleDownload}
        disabled={loading}
        className={`w-full font-bold py-4 px-6 rounded-lg shadow-lg transition-all duration-300 transform
          ${loading
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-white text-orange-500 hover:bg-gray-100 hover:scale-105 hover:shadow-xl"
          }`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Generando presentación...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
            Descargar Presentación PPTX
          </span>
        )}
      </button>
    </div>
  );
}