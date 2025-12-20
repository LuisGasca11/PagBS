import { useEffect, useState } from "react";
import AdminDocuments from "./AdminDocuments";
import { loadSession } from "./utils/auth";

export default function Documentos() {
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);
  const [open, setOpen] = useState(true);
  const session = loadSession();

  useEffect(() => {
    const session = loadSession();
    if (
      !session ||
      !session.token ||
      !["admin", "user"].includes(session.user?.rol)
    ) {
      window.location.href = "/Prices";
      return;
    }
    setAuthorized(true);
    setChecking(false);
  }, []);

  useEffect(() => {
    if (open) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      window.location.href = "/Prices"; 
    }
  }, [open]);

  if (checking || !open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white w-full max-w-7xl h-[80vh] rounded-2xl shadow-2xl overflow-y-auto">
        <AdminDocuments
          token={session?.token}
          isAdmin={session?.user?.rol === "admin"}
          onClose={() => setOpen(false)}
        />
      </div>
    </div>
  );
}
