"use client";

import { useState, useEffect, useRef } from "react";

const COLORS = {
  primary: "#1F447B",
  secondary: "#D4E2FF",
  body: "#324A6D",
  accent: "#EB993C",
};

export default function QuotePage() {
  const [formData, setFormData] = useState({
    fromPostcode: "",
    toPostcode: "",
    weight: "",
    length: "",
    width: "",
    height: "",
    value: "",
    serviceType: "standard",
    packageType: "parcel",
  });

  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isBenefitsVisible, setIsBenefitsVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === headerRef.current && entry.isIntersecting) {
            setIsHeaderVisible(true);
          }
          if (entry.target === formRef.current && entry.isIntersecting) {
            setIsFormVisible(true);
          }
          if (entry.target === benefitsRef.current && entry.isIntersecting) {
            setIsBenefitsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (headerRef.current) observer.observe(headerRef.current);
    if (formRef.current) observer.observe(formRef.current);
    if (benefitsRef.current) observer.observe(benefitsRef.current);

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle quote request
    console.log("Quote request:", formData);
  };

  return (
    <div className="min-h-screen">
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div
            ref={headerRef}
            className={`text-center mb-12 transition-all duration-700 ${
              isHeaderVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <h1 className="text-4xl font-bold text-[#1F447B] mb-4">
              Get Your <span className="text-[#EB993C]">Shipping Quote</span>
            </h1>
            <p className="text-lg text-[#324A6D] max-w-2xl mx-auto">
              Compare shipping rates from multiple carriers and find the best
              option for your needs.
            </p>
          </div>

          {/* Quote Form */}
          <div
            ref={formRef}
            className={`bg-[#e6ecf7] rounded-2xl shadow-lg p-8 transition-all duration-700  border-2 border-[#1F447B] ${
              isFormVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Addresses */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#324A6D] mb-2">
                    From Postcode
                  </label>
                  <input
                    type="text"
                    name="fromPostcode"
                    value={formData.fromPostcode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all"
                    placeholder="SW1A 1AA"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#324A6D] mb-2">
                    To Postcode
                  </label>
                  <input
                    type="text"
                    name="toPostcode"
                    value={formData.toPostcode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all"
                    placeholder="M1 1AA"
                    required
                  />
                </div>
              </div>

              {/* Package Details */}
              <div>
                <h3 className="text-xl font-semibold text-[#1F447B] mb-4">
                  Package Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#324A6D] mb-2">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all"
                      placeholder="1.5"
                      step="0.1"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#324A6D] mb-2">
                      Length (cm)
                    </label>
                    <input
                      type="number"
                      name="length"
                      value={formData.length}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all"
                      placeholder="30"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#324A6D] mb-2">
                      Width (cm)
                    </label>
                    <input
                      type="number"
                      name="width"
                      value={formData.width}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all"
                      placeholder="20"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#324A6D] mb-2">
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all"
                      placeholder="15"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Additional Options */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#324A6D] mb-2">
                    Package Value (£)
                  </label>
                  <input
                    type="number"
                    name="value"
                    value={formData.value}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all"
                    placeholder="50.00"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#324A6D] mb-2">
                    Service Type
                  </label>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all"
                  >
                    <option value="standard">Standard</option>
                    <option value="express">Express</option>
                    <option value="overnight">Overnight</option>
                    <option value="international">International</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#324A6D] mb-2">
                    Package Type
                  </label>
                  <select
                    name="packageType"
                    value={formData.packageType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all"
                  >
                    <option value="parcel">Parcel</option>
                    <option value="document">Document</option>
                    <option value="fragile">Fragile</option>
                    <option value="large">Large Item</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-[#EB993C] hover:bg-[#d4822a] text-white font-semibold px-12 py-4 rounded-lg text-lg transition-colors duration-200"
                >
                  Get Quote
                </button>
              </div>
            </form>
          </div>

          {/* Benefits */}
          <div
            ref={benefitsRef}
            className={`mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-700 ${
              isBenefitsVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-[#e6ecf7] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#1F447B] text-2xl font-bold">£</span>
              </div>
              <h3 className="text-xl font-semibold text-[#1F447B] mb-2">
                Best Rates
              </h3>
              <p className="text-[#324A6D]">
                Compare prices from multiple carriers to find the most
                competitive shipping rates.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#e6ecf7] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#1F447B] text-2xl font-bold">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-[#1F447B] mb-2">
                Instant Quotes
              </h3>
              <p className="text-[#324A6D]">
                Get real-time shipping quotes in seconds with our advanced
                pricing engine.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#e6ecf7] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#1F447B] text-2xl font-bold">📦</span>
              </div>
              <h3 className="text-xl font-semibold text-[#1F447B] mb-2">
                Multiple Carriers
              </h3>
              <p className="text-[#324A6D]">
                Choose from Royal Mail, DPD, UPS, FedEx, DHL and many more
                carriers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
