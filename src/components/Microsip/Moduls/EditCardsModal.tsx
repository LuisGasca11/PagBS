import React, { useState } from "react";

interface Card {
  card_title: string;
  card_content: string;
  card_image: string;
}

const EditCardsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [cards, setCards] = useState<Card[]>([
    { card_title: "Cumplimiento fiscal", card_content: "Adjunta el CFDI correspondiente a retiros y depósitos", card_image: "path/to/image" },
    { card_title: "Herramientas", card_content: "Recalcular saldos, eliminar historial de cuentas", card_image: "path/to/image" },
    { card_title: "Reportes predefinidos", card_content: "Posición bancaria y depósitos", card_image: "path/to/image" },
    { card_title: "Complementos", card_content: "Movimientos bancarios", card_image: "path/to/image" },
  ]);

  const handleCardChange = (index: number, key: keyof Card, value: string) => {
    const updatedCards = [...cards];
    updatedCards[index] = { ...updatedCards[index], [key]: value };
    setCards(updatedCards);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]">
      <div className="bg-white p-8 rounded-lg shadow-md w-[90%] max-w-2xl">
        <h2 className="text-xl font-semibold mb-6">Editar Tarjetas</h2>
        {cards.map((card, index) => (
          <div key={index} className="p-6 bg-white rounded-lg shadow-md mb-4">
            <input
              type="text"
              value={card.card_title}
              onChange={(e) => handleCardChange(index, "card_title", e.target.value)}
              className="w-full p-2 border mb-4 rounded-lg"
            />
            <textarea
              value={card.card_content}
              onChange={(e) => handleCardChange(index, "card_content", e.target.value)}
              className="w-full p-2 border mb-4 rounded-lg"
            />
            <input
              type="text"
              value={card.card_image}
              onChange={(e) => handleCardChange(index, "card_image", e.target.value)}
              className="w-full p-2 border mb-4 rounded-lg"
            />
          </div>
        ))}
        <div className="flex justify-end">
          <button onClick={onClose} className="bg-red-500 text-white p-3 rounded-lg mr-2">Cerrar</button>
          <button className="bg-teal-500 text-white p-3 rounded-lg">Guardar</button>
        </div>
      </div>
    </div>
  );
};

export default EditCardsModal;
