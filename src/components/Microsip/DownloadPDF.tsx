import React, { useState, useRef } from "react";
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

  const [companyData, setCompanyData] = useState<CompanyData>({
    razonSocial: "",
    representanteLegal: "",
    email: "",
    logo: null,
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      setCompanyData((prev) => ({ ...prev, logo: files[0] }));
    } else {
      setCompanyData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const generatePDF = async () => {
    if (!companyData.razonSocial || !companyData.representanteLegal || !companyData.email) {
      alert("Complete todos los campos");
      return;
    }

    setIsGenerating(true);

    try {
      const form = new FormData();

      form.append("razonSocial", companyData.razonSocial);
      form.append("representanteLegal", companyData.representanteLegal);
      form.append("email", companyData.email);

      if (companyData.logo) {
        form.append("logo", companyData.logo);
      }

      form.append("moduleSelections", JSON.stringify(moduleSelections));
      form.append("totals", JSON.stringify(totals));
      form.append("paymentFrequency", paymentFrequency);
      form.append("userCount", String(userCount));

      const res = await fetch("http://localhost:3019/api/generate-pdf", {
        method: "POST",
        body: form,
      });


      const blob = await res.blob();
      saveAs(blob, "Cotizacion_Microsip.pdf");

      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Error generando PDF");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <div className="flex justify-center mt-10">
        <button
          onClick={() => setIsModalOpen(true)}
          className="
            px-8 py-4
            bg-black
            text-white
            font-semibold 
            rounded-xl 
            shadow-md 
            hover:bg-gray-400
            hover:shadow-lg 
            active:scale-95
            transition-all 
            duration-200
          "
        >
          Descargar PDF
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4 text-black">
          <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">
            <h2 className="text-xl font-bold">Datos del PDF</h2>

            <input
              name="razonSocial"
              placeholder="Razón Social"
              className="border p-2 w-full text-black"
              onChange={handleInput}
            />

            <input
              name="representanteLegal"
              placeholder="Representante Legal text-black"
              className="border p-2 w-full"
              onChange={handleInput}
            />

            <input
              name="email"
              placeholder="Correo"
              className="border p-2 w-full text-black"
              onChange={handleInput}
            />

            <input
              type="file"
              accept="image/*"
              className="border p-2 w-full text-black"
              onChange={handleInput}
            />

            <div className="flex gap-3 mt-4">
              <button
                className="flex-1 border p-2 rounded-lg text-black"
                onClick={() => setIsModalOpen(false)}
              >
                Cancelar
              </button>

              <button
                className="flex-1 bg-red-600 text-black p-2 rounded-lg"
                onClick={generatePDF}
                disabled={isGenerating}
              >
                {isGenerating ? "Generando..." : "Descargar PDF"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
