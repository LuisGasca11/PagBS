"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scaleDimensions = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const translateY = useTransform(scrollYProgress, [0, 1], [100, 0]);

  return (
    <div
      className="flex items-center justify-center relative py-20"
      ref={containerRef}
    >
      <div className="w-full relative" style={{ perspective: "1000px" }}>
        <div className="max-w-5xl mx-auto text-center mb-10">
          {titleComponent}
        </div>
        <motion.div
          style={{
            scale: scaleDimensions,
            rotateX: rotate,
            translateY: translateY,
          }}
          className="w-full"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};
