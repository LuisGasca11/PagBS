import React, { useState } from "react";

interface Card {
  card_title: string;
  card_content: string;
  card_image: string;
}

const EditCards: React.FC<{ section: string; isAuthenticated: boolean }> = ({ section, isAuthenticated }) => {
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

  if (!isAuthenticated) {
    return <p className="text-gray-500">Inicia sesión para editar las tarjetas.</p>;
  }

  return (
    <div className="space-y-4">
      {cards.map((card, index) => (
        <div key={index} className="p-6 bg-white rounded-lg shadow-md">
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
          <button className="bg-teal-500 text-white p-3 rounded-lg">Guardar</button>
        </div>
      ))}
    </div>
  );
};

export default EditCards;
