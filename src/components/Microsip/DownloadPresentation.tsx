import React, { useState, useRef } from 'react';
import PptxGenJS from 'pptxgenjs';
import { saveAs } from 'file-saver';

interface DownloadPresentationProps {
  moduleSelections: any;
  totals: any;
  paymentFrequency: string;
}

interface CompanyData {
  razonSocial: string;
  representanteLegal: string;
  email: string;
  logo: File | null;
  useDefaultLogo: boolean;
}

export default function DownloadPresentation({ 
  moduleSelections, 
  totals, 
  paymentFrequency ,
  userCount
}: DownloadPresentationProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [companyData, setCompanyData] = useState<CompanyData>({
    razonSocial: '',
    representanteLegal: '',
    email: '',
    logo: null,
    useDefaultLogo: false
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'logo' && files && files[0]) {
      setCompanyData(prev => ({
        ...prev,
        logo: files[0],
        useDefaultLogo: false
      }));
    } else {
      setCompanyData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyData(prev => ({
      ...prev,
      useDefaultLogo: e.target.checked,
      logo: e.target.checked ? null : prev.logo
    }));
  };

  const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const createBaseTemplate = async (logoData: string, companyData: CompanyData) => {
    const pptx = new PptxGenJS();

    pptx.layout = 'LAYOUT_WIDE';
    pptx.defineSlideMaster({
      title: 'MASTER_SLIDE',
      background: { color: 'FFFFFF' },
      objects: [
        {
          rect: { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: 'F59E0B' } }
        },
        {
          image: { 
            x: 0.3, 
            y: 0.1, 
            w: 1.5, 
            h: 0.6, 
            data: logoData 
          }
        },
        {
          rect: { x: 0, y: 6.8, w: '100%', h: 0.4, fill: { color: '1F2937' } }
        },
        {
          text: { 
            text: 'black_sheep - Cotización Microsip', 
            options: { 
              x: 0.3, 
              y: 6.9, 
              w: 8, 
              h: 0.2, 
              fontSize: 10, 
              color: 'FFFFFF',
              align: 'left'
            } 
          }
        },
        {
          text: { 
            text: `Generado: ${new Date().toLocaleDateString()}`, 
            options: { 
              x: 7, 
              y: 6.9, 
              w: 2, 
              h: 0.2, 
              fontSize: 10, 
              color: 'FFFFFF',
              align: 'right'
            } 
          }
        }
      ]
    });

    const coverSlide = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
    
    coverSlide.addText('COTIZACIÓN MICROSIP', {
      x: 1,
      y: 2,
      w: 8,
      h: 1,
      fontSize: 32,
      bold: true,
      color: '1F2937',
      align: 'center'
    });

    coverSlide.addText(`Razón Social: ${companyData.razonSocial}`, {
      x: 1,
      y: 3.2,
      w: 8,
      h: 0.5,
      fontSize: 16,
      bold: true,
      color: '4B5563',
      align: 'center'
    });

    coverSlide.addText(`Representante Legal: ${companyData.representanteLegal}`, {
      x: 1,
      y: 3.8,
      w: 8,
      h: 0.5,
      fontSize: 14,
      color: '4B5563',
      align: 'center'
    });

    coverSlide.addText(`Correo: ${companyData.email}`, {
      x: 1,
      y: 4.4,
      w: 8,
      h: 0.5,
      fontSize: 14,
      color: '4B5563',
      align: 'center'
    });

    const modulesSlide = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
    
    modulesSlide.addText('MÓDULOS SELECCIONADOS', {
      x: 0.5,
      y: 1,
      w: 9,
      h: 0.6,
      fontSize: 24,
      bold: true,
      color: '1F2937'
    });

    const moduleRows = [
      ['Módulo', 'Plan', 'Precio'],
    ];

    Object.entries(moduleSelections).forEach(([moduleName, selection]: [string, any]) => {
        moduleRows.push([
        moduleName,
        selection.plan.toUpperCase(),
        `$${selection.price}`
      ]);
    });

    modulesSlide.addTable(moduleRows, {
      x: 0.5,
      y: 1.8,
      w: 8.5,
      colW: [5, 2, 1.5],
      border: { pt: 1, color: 'E5E7EB' },
      fill: { color: 'F8FAFC' },
      color: '1F2937',
      fontSize: 12,
      align: 'left',
      valign: 'middle'
    });


const costsSlide = pptx.addSlide({ masterName: "MASTER_SLIDE" });

// Título
costsSlide.addText("RESUMEN DE COSTOS", {
  x: 0.5,
  y: 0.6,
  fontSize: 26,
  bold: true,
  color: "1F2937",
});

const mxnRows = [
  ["Concepto", "Monto (MXN)"],
  ["Subtotal módulos", `$${totals.subtotalModulos.toLocaleString("es-MX")}`],
];

if (totals.discountAmount > 0) {
  mxnRows.push([
    "Descuento aplicado",
    `-$${totals.discountAmount.toLocaleString("es-MX")}`,
  ]);
}

mxnRows.push([
  "TOTAL MXN",
  `$${totals.totalMXN.toLocaleString("es-MX")}`,
]);

costsSlide.addText("Costos en MXN", {
  x: 0.5,
  y: 1.4,
  fontSize: 20,
  bold: true,
  color: "F59E0B",
});

costsSlide.addTable(mxnRows, {
  x: 0.5,
  y: 1.9,
  w: 4,
  colW: [2.3, 1.7],
  border: { pt: 1, color: "E5E7EB" },
  fill: { color: "F8FAFC" },
  fontSize: 12,
  color: "1F2937",
});


const usdRows = [
  ["Concepto", "Monto (USD)"],
  [`Usuarios en la nube (${userCount})`, `$${totals.totalUSD}`],
  ["TOTAL USD", `$${totals.totalUSD}`],
];

costsSlide.addText("Costos en USD", {
  x: 5.1,
  y: 1.4,
  fontSize: 20,
  bold: true,
  color: "3B82F6",
});

costsSlide.addTable(usdRows, {
  x: 5.1,
  y: 1.9,
  w: 4,
  colW: [2.3, 1.7],
  border: { pt: 1, color: "E5E7EB" },
  fill: { color: "EFF6FF" }, // azul muy claro
  fontSize: 12,
  color: "1F2937",
});


    const contactSlide = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
    
    contactSlide.addText('PRÓXIMOS PASOS', {
      x: 0.5,
      y: 1,
      w: 9,
      h: 0.6,
      fontSize: 24,
      bold: true,
      color: '1F2937'
    });

    const steps = [
      '1. Revisión de la cotización',
      '2. Confirmación de módulos seleccionados',
      '3. Firma del contrato de servicios',
      '4. Implementación y capacitación',
      '5. Soporte continuo y actualizaciones'
    ];

    let yPosition = 1.8;
    steps.forEach(step => {
      contactSlide.addText(step, {
        x: 0.8,
        y: yPosition,
        w: 8,
        h: 0.4,
        fontSize: 14,
        color: '374151',
        bullet: { type: 'number' }
      });
      yPosition += 0.5;
    });

    contactSlide.addText('Para más información contacta a:', {
      x: 0.5,
      y: 4.5,
      w: 8,
      h: 0.4,
      fontSize: 16,
      bold: true,
      color: 'F59E0B'
    });

    contactSlide.addText('black_sheep\ncorreo@blacksheep.com\n+52 123 456 7890', {
      x: 0.5,
      y: 5,
      w: 8,
      h: 1,
      fontSize: 14,
      color: '4B5563'
    });

    return pptx;
  };

  const generatePresentation = async () => {
    if (!companyData.razonSocial || !companyData.representanteLegal || !companyData.email) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }

    setIsGenerating(true);

    try {
      let logoData = '';
      if (companyData.logo && !companyData.useDefaultLogo) {
        logoData = await convertImageToBase64(companyData.logo);
      } else {
        logoData = await loadDefaultLogo();
      }

      const pptx = await createBaseTemplate(logoData, companyData);

      const blob = await pptx.writeFile({
        fileName: `Cotización_Microsip_${companyData.razonSocial.replace(/\s+/g, '_')}.pptx`
      });
      
      saveAs(blob, `Cotización_Microsip_${companyData.razonSocial.replace(/\s+/g, '_')}.pptx`);
      
      setIsModalOpen(false);
      setCompanyData({
        razonSocial: '',
        representanteLegal: '',
        email: '',
        logo: null,
        useDefaultLogo: false
      });

      alert('Presentación generada y descargada exitosamente');

    } catch (error) {
      console.error('Error generando presentación:', error);
      alert('Error al generar la presentación');
    } finally {
      setIsGenerating(false);
    }
  };

  const loadDefaultLogo = async (): Promise<string> => {
    try {
      const response = await fetch('/BS_Hori.png');
      if (!response.ok) throw new Error('Logo no encontrado');
      
      const blob = await response.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error cargando logo por defecto:', error);
      return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgMjAwIDUwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjRjU5MzI2Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iMzAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPmJsYWNrX3NoZWVwPC90ZXh0Pgo8L3N2Zz4=';
    }
  };

  const modules = []; 

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
          Descargar Presentación
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-black mb-6">
                Personalizar Presentación
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Razón Social *
                  </label>
                  <input
                    type="text"
                    name="razonSocial"
                    value={companyData.razonSocial}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-500"
                    placeholder="Ingrese la razón social"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Representante Legal *
                  </label>
                  <input
                    type="text"
                    name="representanteLegal"
                    value={companyData.representanteLegal}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-500"
                    placeholder="Ingrese el representante legal"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={companyData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-500"
                    placeholder="correo@empresa.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Logo de la Empresa (Opcional)
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    name="logo"
                    accept="image/*"
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black file:text-black"
                  />
                  <p className="text-xs text-black mt-1">
                    Si no sube un logo, se usará el logo de black_sheep
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-black rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={isGenerating}
                >
                  Cancelar
                </button>
                <button
                  onClick={generatePresentation}
                  disabled={isGenerating}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
                >
                  {isGenerating ? 'Generando...' : 'Descargar PPTX'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}