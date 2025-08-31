"use client";

import { useState, useEffect, useRef } from "react";

const COLORS = {
  primary: "#1F447B",
  secondary: "#D4E2FF",
  body: "#324A6D",
  accent: "#EB993C",
};

interface Package {
  id: string;
  quantity: string;
  packageType: string;
  weight: string;
  length: string;
  width: string;
  height: string;
}

export default function QuotePage() {
  const [formData, setFormData] = useState({
    fromPostcode: "",
    fromCountry: "GB",
    toPostcode: "",
    toCountry: "GB",
    residentialAddress: false,
    requestPickup: false,
    dangerousGoods: false,
    dangerousGoodsCategory: "",
    requiresInsurance: false,
    insuranceValue: "",
    insuranceCurrency: "GBP",
    measurementUnit: "metric",
  });

  const [packages, setPackages] = useState<Package[]>([
    {
      id: "1",
      quantity: "1",
      packageType: "parcel",
      weight: "",
      length: "",
      width: "",
      height: "",
    },
  ]);

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
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePackageChange = (
    packageId: string,
    field: keyof Package,
    value: string
  ) => {
    setPackages((prev) =>
      prev.map((pkg) =>
        pkg.id === packageId ? { ...pkg, [field]: value } : pkg
      )
    );
  };

  const addPackage = () => {
    const newPackage: Package = {
      id: Date.now().toString(),
      quantity: "1",
      packageType: "parcel",
      weight: "",
      length: "",
      width: "",
      height: "",
    };
    setPackages((prev) => [...prev, newPackage]);
  };

  const removePackage = (packageId: string) => {
    if (packages.length > 1) {
      setPackages((prev) => prev.filter((pkg) => pkg.id !== packageId));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle quote request
    console.log("Quote request:", { ...formData, packages });
  };

  return (
    <div className="min-h-screen">
      <div className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-[#1F447B]">From</h4>
                  <div>
                    <label className="block text-sm font-medium text-[#324A6D] mb-2">
                      Country
                    </label>
                    <select
                      name="fromCountry"
                      value={formData.fromCountry}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 pr-10 bg-[#F4FAFC] border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all text-[#324A6D]"
                      required
                    >
                      <option value="GB">United Kingdom</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="AU">Australia</option>
                      <option value="DE">Germany</option>
                      <option value="FR">France</option>
                      <option value="IT">Italy</option>
                      <option value="ES">Spain</option>
                      <option value="NL">Netherlands</option>
                      <option value="BE">Belgium</option>
                      <option value="CH">Switzerland</option>
                      <option value="AT">Austria</option>
                      <option value="IE">Ireland</option>
                      <option value="DK">Denmark</option>
                      <option value="SE">Sweden</option>
                      <option value="NO">Norway</option>
                      <option value="FI">Finland</option>
                      <option value="PL">Poland</option>
                      <option value="CZ">Czech Republic</option>
                      <option value="HU">Hungary</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#324A6D] mb-2">
                      Postcode
                    </label>
                    <input
                      type="text"
                      name="fromPostcode"
                      value={formData.fromPostcode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#F4FAFC] border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all text-[#324A6D]"
                      placeholder="SW1A 1AA"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-[#1F447B]">To</h4>
                  <div>
                    <label className="block text-sm font-medium text-[#324A6D] mb-2">
                      Country
                    </label>
                    <select
                      name="toCountry"
                      value={formData.toCountry}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 pr-10 bg-[#F4FAFC] border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all text-[#324A6D]"
                      required
                    >
                      <option value="GB">United Kingdom</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="AU">Australia</option>
                      <option value="DE">Germany</option>
                      <option value="FR">France</option>
                      <option value="IT">Italy</option>
                      <option value="ES">Spain</option>
                      <option value="NL">Netherlands</option>
                      <option value="BE">Belgium</option>
                      <option value="CH">Switzerland</option>
                      <option value="AT">Austria</option>
                      <option value="IE">Ireland</option>
                      <option value="DK">Denmark</option>
                      <option value="SE">Sweden</option>
                      <option value="NO">Norway</option>
                      <option value="FI">Finland</option>
                      <option value="PL">Poland</option>
                      <option value="CZ">Czech Republic</option>
                      <option value="HU">Hungary</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#324A6D] mb-2">
                      Postcode
                    </label>
                    <input
                      type="text"
                      name="toPostcode"
                      value={formData.toPostcode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#F4FAFC] border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all text-[#324A6D]"
                      placeholder="M1 1AA"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Additional Options Toggles */}
              <div>
                <h3 className="text-xl font-semibold text-[#1F447B] mb-4">
                  Additional Options
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
                    <div>
                      <label className="text-sm font-medium text-[#324A6D] cursor-pointer">
                        Residential Address
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        Delivery to a residential location
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="residentialAddress"
                        checked={formData.residentialAddress}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-[#1F447B] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#EB993C]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#EB993C]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
                    <div>
                      <label className="text-sm font-medium text-[#324A6D] cursor-pointer">
                        Request Pickup
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        Schedule a pickup from your location
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="requestPickup"
                        checked={formData.requestPickup}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-[#1F447B] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#EB993C]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#EB993C]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
                    <div>
                      <label className="text-sm font-medium text-[#324A6D] cursor-pointer">
                        Dangerous Goods
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        Contains hazardous materials
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="dangerousGoods"
                        checked={formData.dangerousGoods}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-[#1F447B] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#EB993C]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#EB993C]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
                    <div>
                      <label className="text-sm font-medium text-[#324A6D] cursor-pointer">
                        Requires Insurance
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        Add insurance coverage
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="requiresInsurance"
                        checked={formData.requiresInsurance}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-[#1F447B] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#EB993C]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#EB993C]"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Dangerous Goods Category Dropdown */}
              {formData.dangerousGoods && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-[#324A6D] mb-2">
                    Dangerous Goods Category
                  </label>
                  <select
                    name="dangerousGoodsCategory"
                    value={formData.dangerousGoodsCategory}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 pr-10 bg-[#F4FAFC] border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all text-[#324A6D]"
                    required={formData.dangerousGoods}
                  >
                    <option value="">Select Category</option>
                    <option value="DGR">DGR | Dangerous Goods</option>
                    <option value="DRY_ICE">DRY_ICE | Dry Ice</option>
                    <option value="LITHIUM">LITHIUM | Lithium Battery</option>
                  </select>
                  <p className="text-xs text-gray-600 mt-2 italic">
                    Further documentation will be required prior to completion
                    of shipment.
                  </p>
                </div>
              )}

              {/* Insurance Details */}
              {formData.requiresInsurance && (
                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-[#1F447B] mb-4">
                    Insurance Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#324A6D] mb-2">
                        Insurance Value
                      </label>
                      <input
                        type="number"
                        name="insuranceValue"
                        value={formData.insuranceValue}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-[#F4FAFC] border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all text-[#324A6D]"
                        placeholder="1000.00"
                        step="0.01"
                        required={formData.requiresInsurance}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#324A6D] mb-2">
                        Currency
                      </label>
                      <select
                        name="insuranceCurrency"
                        value={formData.insuranceCurrency}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 pr-10 bg-[#F4FAFC] border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all text-[#324A6D]"
                        required={formData.requiresInsurance}
                      >
                        <option value="GBP">GBP - British Pound</option>
                        <option value="USD">USD - US Dollar</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="CAD">CAD - Canadian Dollar</option>
                        <option value="AUD">AUD - Australian Dollar</option>
                        <option value="CHF">CHF - Swiss Franc</option>
                        <option value="JPY">JPY - Japanese Yen</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Package Details */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-[#1F447B]">
                    Package Details
                  </h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="measurementUnit"
                          value="metric"
                          checked={formData.measurementUnit === "metric"}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-[#EB993C] bg-gray-100 border-gray-300 focus:ring-0 focus:ring-offset-0"
                        />
                        <span className="ml-2 text-sm text-[#324A6D]">
                          Metric (kg/cm)
                        </span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="measurementUnit"
                          value="imperial"
                          checked={formData.measurementUnit === "imperial"}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-[#EB993C] bg-gray-100 border-gray-300 focus:ring-0 focus:ring-offset-0"
                        />
                        <span className="ml-2 text-sm text-[#324A6D]">
                          Imperial (lbs/in)
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Multiple Packages */}
                <div className="space-y-6">
                  {packages.map((pkg, index) => (
                    <div
                      key={pkg.id}
                      className="bg-white rounded-lg p-6 border"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-lg font-medium text-[#1F447B]">
                          Package {index + 1}
                        </h4>
                        {packages.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removePackage(pkg.id)}
                            className="text-[#EB993C] hover:text-[#d4822a] px-3 py-1 text-sm border border-[#EB993C] rounded-md hover:bg-[#EB993C]/10 transition-colors"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[#324A6D] mb-2">
                            Quantity
                          </label>
                          <input
                            type="number"
                            value={pkg.quantity}
                            onChange={(e) =>
                              handlePackageChange(
                                pkg.id,
                                "quantity",
                                e.target.value
                              )
                            }
                            className="w-full px-4 py-3 bg-[#F4FAFC] border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all text-[#324A6D]"
                            placeholder="1"
                            min="1"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#324A6D] mb-2">
                            Package Type
                          </label>
                          <select
                            value={pkg.packageType}
                            onChange={(e) =>
                              handlePackageChange(
                                pkg.id,
                                "packageType",
                                e.target.value
                              )
                            }
                            className="w-full px-4 py-3 pr-10 bg-[#F4FAFC] border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all text-[#324A6D]"
                          >
                            <option value="envelope">Envelope</option>
                            <option value="packet">Packet</option>
                            <option value="parcel">Parcel</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#324A6D] mb-2">
                            Weight (
                            {formData.measurementUnit === "metric"
                              ? "kg"
                              : "lbs"}
                            )
                          </label>
                          <input
                            type="number"
                            value={pkg.weight}
                            onChange={(e) =>
                              handlePackageChange(
                                pkg.id,
                                "weight",
                                e.target.value
                              )
                            }
                            className="w-full px-4 py-3 bg-[#F4FAFC] border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all text-[#324A6D]"
                            placeholder={
                              formData.measurementUnit === "metric"
                                ? "1.5"
                                : "3.3"
                            }
                            step="0.1"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#324A6D] mb-2">
                            Length (
                            {formData.measurementUnit === "metric"
                              ? "cm"
                              : "in"}
                            )
                          </label>
                          <input
                            type="number"
                            value={pkg.length}
                            onChange={(e) =>
                              handlePackageChange(
                                pkg.id,
                                "length",
                                e.target.value
                              )
                            }
                            className="w-full px-4 py-3 bg-[#F4FAFC] border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all text-[#324A6D]"
                            placeholder={
                              formData.measurementUnit === "metric"
                                ? "30"
                                : "12"
                            }
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#324A6D] mb-2">
                            Width (
                            {formData.measurementUnit === "metric"
                              ? "cm"
                              : "in"}
                            )
                          </label>
                          <input
                            type="number"
                            value={pkg.width}
                            onChange={(e) =>
                              handlePackageChange(
                                pkg.id,
                                "width",
                                e.target.value
                              )
                            }
                            className="w-full px-4 py-3 bg-[#F4FAFC] border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all text-[#324A6D]"
                            placeholder={
                              formData.measurementUnit === "metric" ? "20" : "8"
                            }
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#324A6D] mb-2">
                            Height (
                            {formData.measurementUnit === "metric"
                              ? "cm"
                              : "in"}
                            )
                          </label>
                          <input
                            type="number"
                            value={pkg.height}
                            onChange={(e) =>
                              handlePackageChange(
                                pkg.id,
                                "height",
                                e.target.value
                              )
                            }
                            className="w-full px-4 py-3 bg-[#F4FAFC] border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all text-[#324A6D]"
                            placeholder={
                              formData.measurementUnit === "metric" ? "15" : "6"
                            }
                            required
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Package Button */}
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={addPackage}
                    className="bg-[#1F447B] hover:bg-[#1a3a6b] text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="text-lg">+</span>
                    Add Another Package
                  </button>
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
