import React from "react";
import { Check } from "lucide-react";

export default function SuccessToast({ text }) {
  return (
    <div
      className="
        fixed top-8 left-1/2 -translate-x-1/2 
        z-[99999]
        bg-white/70 backdrop-blur-xl
        border border-white/40
        shadow-[0_10px_40px_rgba(0,0,0,0.15)]
        px-6 py-3
        rounded-2xl
        flex items-center gap-3
        animate-toastPop
      "
    >
      <div className="bg-green-500/90 p-2 rounded-full shadow">
        <Check className="w-4 h-4 text-white" />
      </div>
      <span className="text-gray-900 font-medium text-lg">{text}</span>

      <style>{`
        @keyframes toastPop {
          0% { 
            opacity: 0; 
            transform: translateY(-20px) scale(.95) translateX(-50%);
          }
          50% {
            opacity: 1;
            transform: translateY(0) scale(1.02) translateX(-50%);
          }
          100% {
            opacity: 1;
          }
        }
        .animate-toastPop {
          animation: toastPop 0.35s ease-out;
        }
      `}</style>
    </div>
  );
}
