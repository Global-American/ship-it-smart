"use client";

import { useState } from "react";

interface ColorPickerProps {
  onColorChange: (color: string) => void;
  onContainerColorChange?: (color: string) => void;
  currentColor: string;
  currentContainerColor?: string;
}

export default function ColorPicker({
  onColorChange,
  onContainerColorChange,
  currentColor,
  currentContainerColor,
}: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [customColor, setCustomColor] = useState("#F4FAFC");
  const [customContainerColor, setCustomContainerColor] = useState("#e6ecf7");
  const [hexInput, setHexInput] = useState("");
  const [containerHexInput, setContainerHexInput] = useState("");

  const presetColors = [
    "#F4FAFC", // Default
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

  const containerPresetColors = [
    "#e6ecf7", // Default container color
    "#ffffff", // White
    "#f8fafc", // Light gray
    "#fef7ed", // Light orange
    "#f0f9ff", // Light sky
    "#f0fdf4", // Light emerald
    "#fef2f2", // Light red
    "#faf5ff", // Light violet
    "#fffbeb", // Light amber
    "#f1f5f9", // Slate
    "#f9fafb", // Gray
    "#f4f3ff", // Indigo
  ];

  const handleHexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    // Add # if not present
    if (value && !value.startsWith("#")) {
      value = "#" + value;
    }
    setHexInput(value);
  };

  const handleContainerHexInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = e.target.value;
    // Add # if not present
    if (value && !value.startsWith("#")) {
      value = "#" + value;
    }
    setContainerHexInput(value);
  };

  const applyHexColor = () => {
    // Validate hex color format
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    if (hexRegex.test(hexInput)) {
      onColorChange(hexInput);
      setHexInput("");
    }
  };

  const applyContainerHexColor = () => {
    // Validate hex color format
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    if (hexRegex.test(containerHexInput)) {
      onContainerColorChange ? onContainerColorChange(containerHexInput) : null;
      setContainerHexInput("");
    }
  };

  return (
    <div className="fixed top-24 right-4 z-50">
      <div className="flex flex-col gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 rounded-full border-2 border-white shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
          style={{ backgroundColor: currentColor }}
          title="Change background color"
        >
          🎨
        </button>

        <div
          className="w-12 h-6 rounded-lg border-2 border-white shadow-lg"
          style={{ backgroundColor: currentContainerColor }}
          title="Container color preview"
        />
      </div>

      {isOpen && (
        <div className="absolute top-16 right-0 bg-white rounded-xl shadow-xl p-4 w-80 border max-h-96 overflow-y-auto">
          {/* Background Color Section */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              Background Color
            </h3>

            <div className="grid grid-cols-6 gap-2 mb-4">
              {presetColors.map((color) => (
                <button
                  key={color}
                  onClick={() => onColorChange(color)}
                  className={`w-8 h-8 rounded-lg border-2 hover:scale-110 transition-transform ${
                    currentColor === color
                      ? "border-gray-800"
                      : "border-gray-200"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

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

            <div className="space-y-2 mt-3">
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
          </div>

          {/* Container Color Section */}
          <div className="border-t pt-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              Container Color
            </h3>

            <div className="grid grid-cols-6 gap-2 mb-4">
              {containerPresetColors.map((color) => (
                <button
                  key={color}
                  onClick={() =>
                    onContainerColorChange
                      ? onContainerColorChange(color)
                      : null
                  }
                  className={`w-8 h-8 rounded-lg border-2 hover:scale-110 transition-transform ${
                    currentContainerColor === color
                      ? "border-gray-800"
                      : "border-gray-200"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

            <div className="space-y-2">
              <label className="text-xs text-gray-600">
                Custom Container Color:
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={customContainerColor}
                  onChange={(e) => setCustomContainerColor(e.target.value)}
                  className="w-8 h-8 rounded border cursor-pointer"
                />
                <button
                  onClick={() =>
                    onContainerColorChange
                      ? onContainerColorChange(customContainerColor)
                      : null
                  }
                  className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>

            <div className="space-y-2 mt-3">
              <label className="text-xs text-gray-600">
                Container Hex Code:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={containerHexInput}
                  onChange={handleContainerHexInputChange}
                  placeholder="#e6ecf7"
                  className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  maxLength={7}
                />
                <button
                  onClick={applyContainerHexColor}
                  className="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition-colors"
                  disabled={!containerHexInput}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>

          {/* Reset Section */}
          <div className="border-t pt-4 mt-4">
            <div className="flex gap-2">
              <button
                onClick={() => onColorChange("#f3f4f6")}
                className="flex-1 px-3 py-2 text-xs text-gray-600 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
              >
                Reset Background
              </button>
              <button
                onClick={() =>
                  onContainerColorChange
                    ? onContainerColorChange("#e6ecf7")
                    : null
                }
                className="flex-1 px-3 py-2 text-xs text-gray-600 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
              >
                Reset Container
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
