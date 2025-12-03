import { useLocation } from "react-router-dom";
import FloatingLines from "./FloatingLines";

const Background = ({ children }) => {
  const location = useLocation();

  const hideBackground = [
    "/sat",
    "/banks",
    "/MicroPage",
    "/Prices"
  ].includes(location.pathname);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">

      {!hideBackground && (
        <div className="fixed inset-0 bg-black -z-10 pointer-events-none" />
      )}

      {/* Contenido */}
      <div className="relative z-10">
        {children}
      </div>

    </div>
  );
};

export default Background;
