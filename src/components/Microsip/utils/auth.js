export function saveSession(user, token) {
  const expiresAt = Date.now() + 2 * 60 * 60 * 1000; // 2 horas

  localStorage.setItem(
    "session",
    JSON.stringify({ user, token, expiresAt })
  );

  localStorage.setItem("auth_token", token);
}

export function loadSession() {
  const session = localStorage.getItem("session");
  if (!session) return null;

  const { user, token, expiresAt } = JSON.parse(session);

  if (Date.now() > expiresAt) {
    localStorage.removeItem("session");
    localStorage.removeItem("auth_token");
    return null;
  }

  return { user, token };
}

export function extendSession() {
  const session = localStorage.getItem("session");
  if (!session) return;

  const data = JSON.parse(session);

  data.expiresAt = Date.now() + 2 * 60 * 60 * 1000; // +2 horas

  localStorage.setItem("session", JSON.stringify(data));
}

export function clearSession() {
  localStorage.removeItem("session");
}

export function getSessionExpiration() {
  const s = localStorage.getItem("session");
  if (!s) return null;
  return JSON.parse(s).expiresAt;
}

export async function loginUser(username, password) {
  try {
    const response = await fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) return { ok: false, message: data.message };

    return { ok: true, user: data.user, token: data.token }; 
  } catch {
    return { ok: false, message: "Error al conectar con el servidor" };
  }
}

export async function verifyToken(token, setAuth, setUsername) {
  try {
    const response = await fetch("http://localhost:3001/api/verify", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      logoutUser(setAuth, setUsername);
      return;
    }

    const data = await response.json();
    setAuth(true);
    setUsername(data.user.username);
  } catch {
    logoutUser(setAuth, setUsername);
  }
}

export function logoutUser(setAuth, setUsername) {
  clearSession();
  setAuth(false);
  setUsername("");
}
