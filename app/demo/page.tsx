"use client";

import { useState, useEffect, useRef } from "react";
import ColorPicker from "../components/ColorPicker";

export default function DemoPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [bgColor, setBgColor] = useState("#F4FAFC");
  const [containerColor, setContainerColor] = useState("#ffffff");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 lg:py-36"
      style={{ backgroundColor: bgColor }}
    >
      <ColorPicker
        onColorChange={setBgColor}
        onContainerColorChange={setContainerColor}
        currentColor={bgColor}
        currentContainerColor={containerColor}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div
          className={`text-center mb-12 lg:mb-20 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="inline-block mb-6">
            <span className="bg-[#EB993C] text-white px-6 py-3 rounded-full text-sm font-semibold border-2 border-[#1F447B]">
              LIVE DEMO
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1F447B] mb-6">
            Experience <span className="text-[#EB993C]">Ship It Smart</span>
          </h1>
          <p className="text-lg text-[#324A6D] max-w-3xl mx-auto leading-relaxed">
            Take a guided tour through our platform and discover how Ship It
            Smart can revolutionize your shipping workflow. No signup required.
          </p>
        </div>

        {/* Demo Container */}
        <div
          className={`max-w-7xl mx-auto transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <div
            className="rounded-3xl shadow-2xl p-4 md:p-8 border-2 border-[#1F447B] relative overflow-hidden"
            style={{ backgroundColor: containerColor }}
          >
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
              <div className="w-full h-full bg-[#EB993C] rounded-bl-full"></div>
            </div>
            <div className="absolute bottom-0 left-0 w-24 h-24 opacity-5">
              <div className="w-full h-full bg-[#1F447B] rounded-tr-full"></div>
            </div>

            {/* Demo Frame Container */}
            <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 md:p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-[#1F447B] mb-4">
                  Interactive Platform Demo
                </h2>
                <p className="text-[#324A6D] max-w-2xl mx-auto">
                  Click through our demo to see how easy it is to import orders,
                  compare rates, and manage your shipments all in one place.
                </p>
              </div>

              {/* Demo Frame */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-[#1F447B] to-[#324A6D] p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <div className="flex-1 text-center">
                      <span className="text-white text-sm font-medium">
                        Ship It Smart Demo
                      </span>
                    </div>
                  </div>
                </div>

                {/* Supademo Iframe */}
                <div
                  className="relative w-full"
                  style={{ paddingBottom: "56.25%" }}
                >
                  <iframe
                    src="https://app.supademo.com/demo/your-demo-id"
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0"
                    allow="clipboard-write"
                    allowFullScreen
                    title="Ship It Smart Platform Demo"
                  />
                </div>
              </div>

              {/* Demo Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="text-center p-6 bg-gradient-to-br from-[#D4E2FF] to-white rounded-xl border border-gray-100">
                  <div className="w-12 h-12 bg-[#1F447B] rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                      />
                    </svg>
                  </div>
                  <h3 className="font-bold text-[#1F447B] mb-2">
                    Import Orders
                  </h3>
                  <p className="text-sm text-[#324A6D]">
                    See how easy it is to import from marketplaces
                  </p>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-[#FFF4E6] to-white rounded-xl border border-gray-100">
                  <div className="w-12 h-12 bg-[#EB993C] rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-bold text-[#1F447B] mb-2">
                    Compare Rates
                  </h3>
                  <p className="text-sm text-[#324A6D]">
                    Real-time rate comparison across carriers
                  </p>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-[#E8F5E8] to-white rounded-xl border border-gray-100">
                  <div className="w-12 h-12 bg-[#22C55E] rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-bold text-[#1F447B] mb-2">
                    Generate Labels
                  </h3>
                  <p className="text-sm text-[#324A6D]">
                    Create and print shipping labels instantly
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div
          className={`text-center mt-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          <div
            className="rounded-2xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto border-2 border-[#1F447B]"
            style={{ backgroundColor: containerColor }}
          >
            <h2 className="text-3xl font-bold text-[#1F447B] mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-[#324A6D] mb-8 max-w-2xl mx-auto">
              Experience the full power of Ship It Smart with a personalized
              demo tailored to your business needs.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => (window.location.href = "/contact")}
                className="border-2 border-[#1F447B] bg-[#EB993C] hover:bg-[#d97706] text-white font-semibold px-8 py-4 rounded-full text-lg transition-colors duration-200 cursor-pointer shadow-lg hover:shadow-xl"
              >
                Book a Live Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
