"use client";

import { useState, useEffect } from "react";
import ColorPicker from "./ColorPicker";

interface LayoutClientProps {
  children: React.ReactNode;
}

export default function LayoutClient({ children }: LayoutClientProps) {
  const [backgroundColor, setBackgroundColor] = useState("#f3f4f6");

  useEffect(() => {
    const savedColor = localStorage.getItem("shipItSmart-backgroundColor");
    if (savedColor) {
      setBackgroundColor(savedColor);
    }
  }, []);

  const handleColorChange = (color: string) => {
    setBackgroundColor(color);
    localStorage.setItem("shipItSmart-backgroundColor", color);
  };

  useEffect(() => {
    // Apply background color to body
    document.body.style.backgroundColor = backgroundColor;

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [backgroundColor]);

  return (
    <>
      <ColorPicker
        onColorChange={handleColorChange}
        currentColor={backgroundColor}
      />
      {children}
    </>
  );
}
