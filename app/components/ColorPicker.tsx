"use client";

import { useState } from "react";

interface ColorPickerProps {
  onColorChange: (color: string) => void;
  currentColor: string;
}

export default function ColorPicker({
  onColorChange,
  currentColor,
}: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [customColor, setCustomColor] = useState("#4287f5");
  const [hexInput, setHexInput] = useState("");

  const presetColors = [
    "#f3f4f6", // Default gray-50
    "#fef3c7", // Warm yellow
    "#e0e7ff", // Light blue
    "#ecfdf5", // Light green
    "#fce7f3", // Light pink
    "#f3e8ff", // Light purple
    "#fed7e2", // Light rose
    "#4287f5", // Blue from your picker
    "#1e3a8a", // Dark blue
    "#059669", // Green
    "#dc2626", // Red
    "#7c3aed", // Purple
  ];

  const handleHexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Add # if not present
    if (value && !value.startsWith("#")) {
      value = "#" + value;
    }

    setHexInput(value);
  };

  const applyHexColor = () => {
    // Validate hex color format
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    if (hexRegex.test(hexInput)) {
      onColorChange(hexInput);
      setHexInput("");
    }
  };

  return (
    <div className="fixed top-24 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full border-2 border-white shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
        style={{ backgroundColor: currentColor }}
        title="Change background color"
      >
        🎨
      </button>

      {isOpen && (
        <div className="absolute top-14 right-0 bg-white rounded-xl shadow-xl p-4 w-64 border">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">
            Background Color
          </h3>

          {/* Preset Colors */}
          <div className="grid grid-cols-6 gap-2 mb-4">
            {presetColors.map((color) => (
              <button
                key={color}
                onClick={() => onColorChange(color)}
                className={`w-8 h-8 rounded-lg border-2 hover:scale-110 transition-transform ${
                  currentColor === color ? "border-gray-800" : "border-gray-200"
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>

          {/* Custom Color */}
          <div className="space-y-2">
            <label className="text-xs text-gray-600">Custom Color:</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                className="w-8 h-8 rounded border cursor-pointer"
              />
              <button
                onClick={() => onColorChange(customColor)}
                className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
              >
                Apply
              </button>
            </div>
          </div>

          {/* Hex Code Input */}
          <div className="space-y-2 mt-4">
            <label className="text-xs text-gray-600">Hex Code:</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={hexInput}
                onChange={handleHexInputChange}
                placeholder="#FF5733"
                className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                maxLength={7}
              />
              <button
                onClick={applyHexColor}
                className="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition-colors"
                disabled={!hexInput}
              >
                Apply
              </button>
            </div>
          </div>

          {/* Reset */}
          <button
            onClick={() => onColorChange("#f3f4f6")}
            className="w-full mt-3 px-3 py-2 text-xs text-gray-600 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
          >
            Reset to Default
          </button>
        </div>
      )}
    </div>
  );
}
