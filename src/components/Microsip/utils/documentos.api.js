const isDev = import.meta.env.DEV;

const API_BASE = isDev 
  ? '/api/documentos'  
  : `${import.meta.env.VITE_API_URL || window.location.origin}/api/documentos`;

export async function getDocumentos(token) {
  const res = await fetch(API_BASE, {
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

  const res = await fetch(API_BASE, {
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
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Error eliminando archivo");
}

export async function downloadDocumento(id, token) {
  try {
    const url = `${API_BASE}/${id}/download-url`;
    
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Error generando URL de descarga");
    }

    const data = await res.json();
    window.open(data.url, "_blank");
  } catch (err) {
    throw err;
  }
}

export function previewDocumento(id, token) {
  return `${API_BASE}/${id}/preview`;
}

export async function getPublicPreviewUrl(id, token) {
  
  const res = await fetch(`${API_BASE}/${id}/public-preview`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    console.error('❌ Error en preview:', res.status, res.statusText);
    throw new Error("Error generando preview público");
  }

  const data = await res.json();
  return data.url;
}