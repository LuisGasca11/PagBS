export default function Documentos() {
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const session = loadSession();
    if (!session || !session.token || session.user?.rol !== "admin") {
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
          token={loadSession()?.token}
          isAdmin
          onClose={() => setOpen(false)}
        />
      </div>
    </div>
  );
}
