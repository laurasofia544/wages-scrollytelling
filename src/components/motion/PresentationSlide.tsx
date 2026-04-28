"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import { SlideContext } from "./SlideContext";

export function PresentationSlide({
  children,
  index,
  hasBackground = false,
  backgroundColor,
}: {
  children: React.ReactNode;
  index: number;
  hasBackground?: boolean;
  backgroundColor?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  return (
    <SlideContext.Provider value={{ scrollYProgress }}>
      <section
        ref={ref}
        style={{
          height: hasBackground ? "200vh" : "170vh",
          position: "relative",
          zIndex: index,
          backgroundColor,
        }}
      >
        <div style={{ position: "sticky", top: 0, height: "100vh" }}>
          {children}
        </div>
      </section>
    </SlideContext.Provider>
  );
}
