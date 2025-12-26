import React, { useState, useEffect, useRef } from "react";
import { saveAs } from "file-saver";

interface Props {
  moduleSelections: any;
  totals: any;
  paymentFrequency: string;
  userCount: number;
}

interface CompanyData {
  razonSocial: string;
  representanteLegal: string;
  email: string;
  logo: File | null;
}

export default function DownloadPDF({
  moduleSelections,
  totals,
  paymentFrequency,
  userCount,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [logoName, setLogoName] = useState("");

  const [companyData, setCompanyData] = useState<CompanyData>({
    razonSocial: "",
    representanteLegal: "",
    email: "",
    logo: null,
  });

  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setCompanyData((prev) => ({ ...prev, logo: files[0] }));
      setLogoName(files[0].name);
    } else {
      setCompanyData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const generatePDF = async () => {
    if (!companyData.razonSocial || !companyData.representanteLegal || !companyData.email) {
      alert("Por favor, complete los campos obligatorios.");
      return;
    }
    setIsGenerating(true);
    try {
      const form = new FormData();
      form.append("razonSocial", companyData.razonSocial);
      form.append("representanteLegal", companyData.representanteLegal);
      form.append("email", companyData.email);
      if (companyData.logo) form.append("logo", companyData.logo);
      form.append("moduleSelections", JSON.stringify(moduleSelections));
      form.append("totals", JSON.stringify(totals));
      form.append("paymentFrequency", paymentFrequency);
      form.append("userCount", String(userCount));

      const res = await fetch("http://localhost:3019/api/generate-pdf", {
        method: "POST",
        body: form,
      });

      const blob = await res.blob();
      saveAs(blob, `Cotizacion_${companyData.razonSocial.replace(/\s+/g, '_')}.pdf`);
      setIsModalOpen(false);
    } catch (err) {
      alert("Error generando PDF");
    } finally {
      setIsGenerating(false);
    }
  };

  // Cerrar modal al presionar ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  // Cerrar modal al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // Verificar si el clic fue fuera del modal (en el overlay)
      if (
        isModalOpen &&
        overlayRef.current &&
        overlayRef.current === e.target &&
        modalRef.current &&
        !modalRef.current.contains(e.target as Node)
      ) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isModalOpen]);

  // Opcional: Prevenir scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const inputClasses = "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-orange-400 outline-none transition-all";
  const labelClasses = "flex items-center gap-2 text-xs font-bold text-gray-600 uppercase mb-1.5 ml-1";

  return (
    <div className="mt-6 flex justify-center">
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full sm:w-auto px-12 py-4 bg-gray-900 text-white font-black text-sm uppercase tracking-widest rounded-2xl shadow-xl hover:bg-black active:scale-95 border-b-4 border-gray-700 transition-all flex items-center justify-center gap-3"
      >
        Configurar y Descargar PDF
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </button>

      {isModalOpen && (
        <div 
          ref={overlayRef}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
        >
          <div 
            ref={modalRef}
            className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200"
          >
            <div className="bg-gray-50 border-b border-gray-100 p-6">
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Datos de la Empresa</h2>
              <p className="text-sm text-gray-500 mt-1 font-medium">Personaliza la cabecera de tu cotización PDF</p>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className={labelClasses}>🏢 Razón Social</label>
                <input name="razonSocial" placeholder="Nombre de la empresa" className={inputClasses} onChange={handleInput} />
              </div>

              <div>
                <label className={labelClasses}>👨‍💼 Representante Legal</label>
                <input name="representanteLegal" placeholder="Nombre completo" className={inputClasses} onChange={handleInput} />
              </div>

              <div>
                <label className={labelClasses}>📧 Correo de Contacto</label>
                <input name="email" type="email" placeholder="ejemplo@empresa.com" className={inputClasses} onChange={handleInput} />
              </div>

              <div className="pt-2">
                <label className={labelClasses}>🖼️ Logo (Opcional)</label>
                <div className="relative group border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-orange-400 transition-colors text-center">
                  <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleInput} />
                  <p className="text-xs font-bold text-gray-500 truncate">
                    {logoName ? `✅ ${logoName}` : "Seleccionar imagen..."}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
              <button
                className="flex-1 py-3 px-4 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-200 transition-colors uppercase"
                onClick={() => setIsModalOpen(false)}
              >
                Cancelar
              </button>

              <button
                onClick={generatePDF}
                disabled={isGenerating}
                className={`flex-[1.5] py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-3
                  ${isGenerating
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gray-900 text-white hover:bg-black active:scale-[0.98] border-b-4 border-gray-700"
                  }`}
              >
                {isGenerating ? (
                  <div className="h-5 w-5 border-2 border-gray-400 border-t-white rounded-full animate-spin" />
                ) : (
                  "Generar PDF"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}