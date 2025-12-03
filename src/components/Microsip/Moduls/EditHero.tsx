import React, { useState, useEffect } from "react";

interface HeroContent {
  title: string;
  subtitle: string;
}

const EditHero: React.FC<{ isAuthenticated: boolean }> = ({ isAuthenticated }) => {
  const [content, setContent] = useState<HeroContent | null>(null);

  useEffect(() => {
    fetch("/api/page-content/Hero") 
      .then((res) => res.json())
      .then(setContent);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContent({
      ...content!,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    fetch("/api/page-content/Hero", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    })
      .then((res) => res.json())
      .then((data) => console.log("Hero content updated", data));
  };

  if (!isAuthenticated) {
    return <p className="text-gray-500">Inicia sesión para editar el contenido.</p>;
  }

  return (
    <div>
      {content && (
        <div>
          <input
            type="text"
            name="title"
            value={content.title}
            onChange={handleChange}
            className="border p-2"
          />
          <textarea
            name="subtitle"
            value={content.subtitle}
            onChange={handleChange}
            className="border p-2"
          />
          <button onClick={handleSave} className="bg-blue-500 text-white p-2 rounded">
            Guardar
          </button>
        </div>
      )}
    </div>
  );
};

export default EditHero;
