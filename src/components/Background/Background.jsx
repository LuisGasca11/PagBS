import { useLocation } from "react-router-dom";
import Threads from "./Threads";

const Background = ({ children }) => {
  const location = useLocation();

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">

      <div className="absolute inset-0 bg-black z-0" />

      <div className="absolute inset-0 z-10">
        <Threads mode="dark" />
      </div>

      {location.pathname === "/login" && (
        <div className="absolute inset-0 z-20">
          <img
            src="/back.jpg"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-gray-900/80 to-purple-900/70" />
        </div>
      )}

      <div className="relative z-30">
        {children}
      </div>

    </div>
  );
};

export default Background;
