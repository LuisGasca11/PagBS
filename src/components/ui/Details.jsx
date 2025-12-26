import { createContext, useContext, useRef, useState } from "react";
import { useMeasure } from "react-use";
import clsx from "clsx";

const DetailsContext = createContext();

export function Details({ children, className }) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

function DetailsItem({ children, className }) {
  const [isActive, setIsActive] = useState(false);

  const toggle = () => {
    setIsActive(!isActive);
  };

  return (
    <DetailsContext.Provider value={{ isActive, toggle }}>
      <div className={className}>
        {typeof children === "function" ? children({ isActive, toggle }) : children}
      </div>
    </DetailsContext.Provider>
  );
}

function DetailsContent({ children, className }) {
  const { isActive } = useContext(DetailsContext);
  const [ref, { height }] = useMeasure();

  return (
    <div
      className={clsx(className)}
      style={{
        height: isActive ? height : 0,
      }}
    >
      <div ref={ref}>
        {children}
      </div>
    </div>
  );
}

Details.Item = DetailsItem;
Details.Content = DetailsContent;
