import { LogIn, LogOut, User, Settings } from "lucide-react";

export default function Toolbar({
  isAuthenticated,
  username,
  onLoginClick,
  onLogoutClick,
  onOpenAdmin,
  onOpenVpsAdmin,
  onOpenHourlyAdmin, 
}) {
  
  return (
    <div
      className="
        fixed top-4 right-4
        flex items-center gap-4
        z-[999]
        backdrop-blur-xl
        bg-black/40
        border border-white/10
        text-white
        rounded-2xl
        px-6 py-3
        shadow-[0_4px_25px_rgba(0,0,0,0.35)]
        transition
      "
    >
      {isAuthenticated && (
        <button
          onClick={onOpenAdmin}
          className="
            flex items-center gap-2
            px-3 py-1.5
            rounded-xl
            bg-white/15
            hover:bg-white/25
            text-white
            transition-all
            shadow-[0_0_12px_rgba(255,255,255,0.1)]
          "
        >
          <Settings className="w-4 h-4 opacity-90" />
          <span className="text-sm font-medium">Admin Precios</span>
        </button>
      )}

      {isAuthenticated && (
        <button
          onClick={onOpenVpsAdmin}
          className="
            flex items-center gap-2
            px-3 py-1.5
            rounded-xl
            bg-white/15
            hover:bg-white/25
            text-white
            transition-all
            shadow-[0_0_12px_rgba(255,255,255,0.1)]
          "
        >
          <Settings className="w-4 h-4 opacity-90" />
          <span className="text-sm font-medium">Admin VPS</span>
        </button>
      )}

      {isAuthenticated && (
        <button
          onClick={onOpenHourlyAdmin}
          className="
            flex items-center gap-2 
            px-3 py-1.5 
            rounded-xl 
            bg-white/20 
            hover:bg-white/30 
            text-white/90 
            transition-all
            shadow-[0_0_15px_rgba(255,255,255,0.15)]
          "
        >
          <Settings className="w-4 h-4 opacity-80" />
          <span className="text-sm font-medium">Admin Hora</span>
        </button>
      )}

      {isAuthenticated ? (
        <div
          className="
            flex items-center gap-3
            px-4 py-1.5
            rounded-xl
            bg-white/10
            border border-white/10
            backdrop-blur-lg
            text-white
            shadow-[0_0_20px_rgba(0,0,0,0.25)]
          "
        >
          <User className="w-4 h-4 opacity-90" />
          <span className="text-sm font-medium tracking-wide">
            {username}
          </span>

          <button
            onClick={onLogoutClick}
            className="
              flex items-center gap-1.5
              px-2.5 py-1
              rounded-lg
              bg-red-500/90
              hover:bg-red-600
              text-white
              text-xs
              transition
              shadow-[0_0_8px_rgba(255,50,50,0.5)]
            "
          >
            <LogOut className="w-3.5 h-3.5" />
            Salir
          </button>
        </div>
      ) : (
        <button
          onClick={onLoginClick}
          className="
            flex items-center gap-2
            px-4 py-1.5
            rounded-xl
            bg-white/15
            hover:bg-white/25
            text-white
            backdrop-blur-xl
            shadow-[0_0_15px_rgba(0,0,0,0.25)]
            transition
          "
        >
          <LogIn className="w-4 h-4 opacity-90" />
          <span className="font-medium">Iniciar</span>
        </button>
      )}
    </div>
  );
}
