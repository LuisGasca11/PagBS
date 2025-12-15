const API_URL = "http://localhost:3019/api/documentos";

export async function getDocumentos(token) {
  const res = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Error cargando documentos");
  return res.json();
}

export async function uploadDocumento(file, token) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) throw new Error("Error subiendo archivo");
  return res.json();
}

export async function deleteDocumento(id, token) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Error eliminando archivo");
}

// Obtener URL temporal de descarga y abrir en nueva ventana
export async function downloadDocumento(id, token) {
  
  try {
    const url = `${API_URL}/${id}/download-url`;
    
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });


    if (!res.ok) {
      const errorText = await res.text();
      throw new Error("Error generando URL de descarga");
    }

    const data = await res.json();
    
    window.open(data.url, "_blank");
  } catch (err) {
    throw err;
  }
}

// Preview con autenticación (abre en nueva ventana)
export function previewDocumento(id, token) {
  return `${API_URL}/${id}/preview`;
}

// Obtener URL pública de preview (con JWT temporal)
export async function getPublicPreviewUrl(id, token) {
  const res = await fetch(`${API_URL}/${id}/public-preview`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Error generando preview público");
  }

  const data = await res.json();
  return data.url;
}