"use client";

import { useState, useEffect, useRef } from "react";
import ColorPicker from "../../components/ColorPicker";

interface Item {
  id: string;
  description: string;
  commodityCode: string;
  sku: string;
  quantity: string;
  value: string;
  currency: string;
  weight: string;
  countryOfOrigin: string;
  manufacturerDetails: string;
}

interface Package {
  id: string;
  quantity: string;
  packageType: string;
  weight: string;
  length: string;
  width: string;
  height: string;
}

export default function BookingFormPage() {
  const [formData, setFormData] = useState({
    // Booking contact details
    bookingName: "",
    bookingPhone: "",
    bookingEmail: "",
    // From address details
    fromCountry: "US",
    fromPostcode: "",
    fromCompany: "",
    fromContactName: "",
    fromPhone: "",
    fromEmail: "",
    fromAddress1: "",
    fromAddress2: "",
    fromCity: "",
    fromState: "",
    fromEori: "", // Added
    fromVatEin: "", // Added
    // To address details
    toCountry: "US",
    toPostcode: "",
    toCompany: "",
    toContactName: "",
    toPhone: "",
    toEmail: "",
    toAddress1: "",
    toAddress2: "",
    toCity: "",
    toState: "",
    toEori: "", // Added
    toVatEin: "", // Added
    // Options
    residentialAddress: false,
    requestPickup: false,
    dangerousGoods: false,
    dangerousGoodsCategory: "",
    requiresInsurance: false,
    uploadDocuments: false,
    insuranceValue: "",
    insuranceCurrency: "USD",
    measurementUnit: "metric",
    // Pickup details
    pickupDate: "",
    pickupTimeStart: "",
    pickupTimeEnd: "",
    pickupInstructions: "",
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

  // Standalone items (not tied to packages)
  const [items, setItems] = useState<Item[]>([
    {
      id: "item-1",
      description: "",
      commodityCode: "",
      sku: "",
      quantity: "1",
      value: "",
      currency: "USD",
      weight: "",
      countryOfOrigin: "US",
      manufacturerDetails: "",
    },
  ]);

  // Uploaded documents
  const [documents, setDocuments] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setDocuments(files);
  };

  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isBenefitsVisible, setIsBenefitsVisible] = useState(false);
  const [bgColor, setBgColor] = useState("#F4FAFC");
  const [containerColor, setContainerColor] = useState("#e6ecf7");
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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
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

  // Item handlers (standalone)
  const handleItemChange = (
    itemId: string,
    field: keyof Item,
    value: string
  ) => {
    setItems((prev) =>
      prev.map((it) => (it.id === itemId ? { ...it, [field]: value } : it))
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

  const addItem = () => {
    const newItem: Item = {
      id: `item-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      description: "",
      commodityCode: "",
      sku: "",
      quantity: "1",
      value: "",
      currency: "USD",
      weight: "",
      countryOfOrigin: "US",
      manufacturerDetails: "",
    };
    setItems((prev) => [...prev, newItem]);
  };

  const removeItem = (itemId: string) => {
    setItems((prev) =>
      prev.length > 1 ? prev.filter((i) => i.id !== itemId) : prev
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation for pickup range
    if (formData.requestPickup) {
      if (
        formData.pickupTimeStart &&
        formData.pickupTimeEnd &&
        formData.pickupTimeStart >= formData.pickupTimeEnd
      ) {
        alert("Pickup end time must be after start time");
        return;
      }
    }
    // Handle book shipment request
    const payload = {
      bookingContact: {
        name: formData.bookingName,
        phone: formData.bookingPhone,
        email: formData.bookingEmail,
      },
      from: {
        country: formData.fromCountry,
        postcode: formData.fromPostcode,
        company: formData.fromCompany,
        contactName: formData.fromContactName,
        phone: formData.fromPhone,
        email: formData.fromEmail,
        address1: formData.fromAddress1,
        address2: formData.fromAddress2,
        city: formData.fromCity,
        state: formData.fromState,
        eori: formData.fromEori, // Added
        vatEin: formData.fromVatEin, // Added
        contactRef: (formData as any).fromContactRef || "",
      },
      to: {
        country: formData.toCountry,
        postcode: formData.toPostcode,
        company: formData.toCompany,
        contactName: formData.toContactName,
        phone: formData.toPhone,
        email: formData.toEmail,
        address1: formData.toAddress1,
        address2: formData.toAddress2,
        city: formData.toCity,
        state: formData.toState,
        eori: formData.toEori, // Added
        vatEin: formData.toVatEin, // Added
        contactRef: (formData as any).toContactRef || "",
      },
      options: {
        residentialAddress: formData.residentialAddress,
        requestPickup: formData.requestPickup,
        pickupDate: formData.pickupDate,
        pickupTimeStart: formData.pickupTimeStart,
        pickupTimeEnd: formData.pickupTimeEnd,
        pickupInstructions: formData.pickupInstructions,
        dangerousGoods: formData.dangerousGoods,
        dangerousGoodsCategory: formData.dangerousGoodsCategory,
        requiresInsurance: formData.requiresInsurance,
        uploadDocuments: formData.uploadDocuments,
        insuranceValue: formData.insuranceValue,
        insuranceCurrency: formData.insuranceCurrency,
        measurementUnit: formData.measurementUnit,
      },
      packages,
      documents: documents.map((f) => ({
        name: f.name,
        size: f.size,
        type: f.type,
      })),
      items,
    };
    console.log("Book Shipment Request:", payload);
  };

  // Derived totals
  const unitLabel = formData.measurementUnit === "metric" ? "kg" : "lbs";
  const totalPackageWeight = packages.reduce((sum, pkg) => {
    const qty = parseFloat(pkg.quantity || "0") || 0;
    const wt = parseFloat(pkg.weight || "0") || 0;
    return sum + qty * wt;
  }, 0);

  const totalsByCurrency = items.reduce((acc, it) => {
    const qty = parseFloat(it.quantity || "0") || 0;
    const val = parseFloat(it.value || "0") || 0;
    const cur = it.currency || "USD";
    acc[cur] = (acc[cur] || 0) + qty * val;
    return acc;
  }, {} as Record<string, number>);

  // Stable server/client currency formatting to avoid hydration mismatches
  const formatCurrency = (code: string, amount: number) => {
    const map: Record<string, string> = {
      USD: "$",
      GBP: "£",
      EUR: "€",
      CAD: "CA$",
      AUD: "A$",
      JPY: "¥",
    };
    const symbol = map[code] ?? `${code} `;
    // If symbol already ends with typical currency sign, no extra space
    const needsSpace = /[A-Za-z]$/.test(symbol);
    return `${symbol}${needsSpace ? " " : ""}${amount.toFixed(2)}`;
  };

  // Total weight based on items (quantity × weight)
  const totalItemWeight = items.reduce((sum, it) => {
    const qty = parseFloat(it.quantity || "0") || 0;
    const wt = parseFloat(it.weight || "0") || 0;
    return sum + qty * wt;
  }, 0);

  return (
    <section
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
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-12 lg:mb-20 transition-all duration-700`}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-[#1F447B] mb-4">
            Book Your <span className="text-[#EB993C]">Shipment</span>
          </h1>
          <p className="text-lg text-[#324A6D] max-w-2xl mx-auto">
            Compare shipping rates from multiple carriers and find the best
            option for your needs.
          </p>
        </div>

        {/* Booking Form */}
        <div
          className={`max-w-5xl lg:max-w-6xl mx-auto transition-all duration-700`}
        >
          <div
            ref={formRef}
            className="rounded-2xl shadow-lg p-6 sm:p-8 lg:p-12 xl:p-16 border-2 border-[#1F447B]"
            style={{
              backgroundColor: containerColor,
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-8 lg:space-y-10">
              {/* Booking Contact Information */}
              <div className="bg-white/50 rounded-xl p-6 border border-[#1F447B]/20">
                <h4 className="text-xl font-semibold text-[#1F447B] mb-6">
                  Booking Contact Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#324A6D] mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="bookingName"
                      value={formData.bookingName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border-2 border-[#1F447B] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all text-[#324A6D]"
                      placeholder="Primary contact name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#324A6D] mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="bookingPhone"
                      value={formData.bookingPhone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border-2 border-[#1F447B] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all text-[#324A6D]"
                      placeholder="+1 555 123 4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#324A6D] mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="bookingEmail"
                      value={formData.bookingEmail}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border-2 border-[#1F447B] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all text-[#324A6D]"
                      placeholder="contact@example.com"
                    />
                  </div>
                </div>
              </div>
              {/* Addresses */}
              <div className="space-y-10">
                <div className="bg-white/50 rounded-xl p-6 border border-[#1F447B]/20">
                  <h4 className="text-xl font-semibold text-[#1F447B] mb-6">
                    From Address
                  </h4>
                  {/* Company / Contact */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-[#324A6D] mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        name="fromCompany"
                        value={formData.fromCompany}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border-2 border-[#1F447B] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all text-[#324A6D]"
                        placeholder="Sender Company"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#324A6D] mb-2">
                        Contact Name
                      </label>
                      <input
                        type="text"
                        name="fromContactName"
                        value={formData.fromContactName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border-2 border-[#1F447B] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all text-[#324A6D]"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                  {/* New EORI / VAT-EIN Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-[#324A6D] mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="fromPhone"
                        value={formData.fromPhone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border-2 border-[#1F447B] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all text-[#324A6D]"
                        placeholder="+1 555 123 4567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#324A6D] mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="fromEmail"
                        value={formData.fromEmail}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border-2 border-[#1F447B] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all text-[#324A6D]"
                        placeholder="sender@example.com"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-[#324A6D] mb-2">
                        Address Line 1
                      </label>
                      <input
                        type="text"
                        name="fromAddress1"
                        value={formData.fromAddress1}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border-2 border-[#1F447B] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all text-[#324A6D]"
                        placeholder="123 Main St"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#324A6D] mb-2">
                        Address Line 2
                      </label>
                      <input
                        type="text"
                        name="fromAddress2"
                        value={formData.fromAddress2}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border-2 border-[#1F447B] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all text-[#324A6D]"
                        placeholder="Suite / Unit / Apt"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-[#324A6D] mb-2">
                        EORI Number
                      </label>
                      <input
                        type="text"
                        name="fromEori"
                        value={formData.fromEori}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border-2 border-[#1F447B] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all text-[#324A6D]"
                        placeholder="GB123456789000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#324A6D] mb-2">
                        VAT / EIN Number
                      </label>
                      <input
                        type="text"
                        name="fromVatEin"
                        value={formData.fromVatEin}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border-2 border-[#1F447B] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all text-[#324A6D]"
                        placeholder="VAT123456 / 12-3456789"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#324A6D] mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="fromCity"
                        value={formData.fromCity}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border-2 border-[#1F447B] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all text-[#324A6D]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#324A6D] mb-2">
                        State / Province
                      </label>
                      <input
                        type="text"
                        name="fromState"
                        value={formData.fromState}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border-2 border-[#1F447B] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all text-[#324A6D]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#324A6D] mb-2">
                        Postcode / ZIP
                      </label>
                      <input
                        type="text"
                        name="fromPostcode"
                        value={formData.fromPostcode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border-2 border-[#1F447B] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all text-[#324A6D]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#324A6D] mb-2">
                        Country
                      </label>
                      <select
                        name="fromCountry"
                        value={formData.fromCountry}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 pr-12 bg-white border-2 border-[#1F447B] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all text-[#324A6D]"
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
                  </div>
                </div>
                <div className="bg-white/50 rounded-xl p-6 border border-[#1F447B]/20">
                  <h4 className="text-xl font-semibold text-[#1F447B] mb-6">
                    To Address
                  </h4>
                  {/* Company / Contact */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-[#324A6D] mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        name="toCompany"
                        value={formData.toCompany}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border-2 border-[#1F447B] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all text-[#324A6D]"
                        placeholder="Recipient Company"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#324A6D] mb-2">
                        Contact Name
                      </label>
                      <input
                        type="text"
                        name="toContactName"
                        value={formData.toContactName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border-2 border-[#1F447B] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all text-[#324A6D]"
                        placeholder="Jane Smith"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-[#324A6D] mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="toPhone"
                        value={formData.toPhone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border-2 border-[#1F447B] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all text-[#324A6D]"
                        placeholder="+44 20 1234 5678"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#324A6D] mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="toEmail"
                        value={formData.toEmail}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border-2 border-[#1F447B] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all text-[#324A6D]"
                        placeholder="recipient@example.com"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-[#324A6D] mb-2">
                        Address Line 1
                      </label>
                      <input
                        type="text"
                        name="toAddress1"
                        value={formData.toAddress1}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border-2 border-[#1F447B] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all text-[#324A6D]"
                        placeholder="456 Market St"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#324A6D] mb-2">
                        Address Line 2
                      </label>
                      <input
                        type="text"
                        name="toAddress2"
                        value={formData.toAddress2}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border-2 border-[#1F447B] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all text-[#324A6D]"
                        placeholder="Suite / Unit / Apt"
                      />
                    </div>
                  </div>
                  {/* New EORI / VAT-EIN Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-[#324A6D] mb-2">
                        EORI Number
                      </label>
                      <input
                        type="text"
                        name="toEori"
                        value={formData.toEori}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border-2 border-[#1F447B] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all text-[#324A6D]"
                        placeholder="EU123456789000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#324A6D] mb-2">
                        VAT / EIN Number
                      </label>
                      <input
                        type="text"
                        name="toVatEin"
                        value={formData.toVatEin}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border-2 border-[#1F447B] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all text-[#324A6D]"
                        placeholder="VAT987654 / 98-7654321"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#324A6D] mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="toCity"
                        value={formData.toCity}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border-2 border-[#1F447B] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all text-[#324A6D]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#324A6D] mb-2">
                        State / Province
                      </label>
                      <input
                        type="text"
                        name="toState"
                        value={formData.toState}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border-2 border-[#1F447B] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all text-[#324A6D]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#324A6D] mb-2">
                        Postcode / ZIP
                      </label>
                      <input
                        type="text"
                        name="toPostcode"
                        value={formData.toPostcode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border-2 border-[#1F447B] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all text-[#324A6D]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#324A6D] mb-2">
                        Country
                      </label>
                      <select
                        name="toCountry"
                        value={formData.toCountry}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 pr-12 bg-white border-2 border-[#1F447B] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all text-[#324A6D]"
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
                  </div>
                </div>
              </div>

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
                            className="w-full px-4 py-3 bg-[#F4FAFC] border-2 border-[#1F447B] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all text-[#324A6D]"
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
                            className="w-full px-4 py-3 pr-12 bg-[#F4FAFC] border-2 border-[#1F447B] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all text-[#324A6D]"
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
                            className="w-full px-4 py-3 bg-[#F4FAFC] border-2 border-[#1F447B] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all text-[#324A6D]"
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
                            className="w-full px-4 py-3 bg-[#F4FAFC] border-2 border-[#1F447B] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all text-[#324A6D]"
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
                            className="w-full px-4 py-3 bg-[#F4FAFC] border-2 border-[#1F447B] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all text-[#324A6D]"
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
                            className="w-full px-4 py-3 bg-[#F4FAFC] border-2 border-[#1F447B] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all text-[#324A6D]"
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
                    className="bg-[#1F447B] hover:bg-[#1a3a6b] text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2 border-2 border-[#EB993C]"
                  >
                    <span className="text-lg">+</span>
                    Add Another Package
                  </button>
                </div>
              </div>

              {/* Items (Standalone) */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-[#1F447B]">
                    Item Details
                  </h3>
                </div>
                <div className="space-y-6">
                  {items.map((item, itemIndex) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-lg p-6 border"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h6 className="font-medium text-[#1F447B]">
                          Item #{itemIndex + 1}
                        </h6>
                        {items.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="text-xs text-[#EB993C] border border-[#EB993C] px-2 py-1 rounded hover:bg-[#EB993C]/10"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        {/* Row 1 */}
                        <div>
                          <label className="block text-xs font-medium text-[#324A6D] mb-1">
                            Description
                          </label>
                          <input
                            type="text"
                            value={item.description}
                            onChange={(e) =>
                              handleItemChange(
                                item.id,
                                "description",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 bg-[#F4FAFC] border-2 border-[#1F447B] rounded-md focus:outline-none focus:ring-2 focus:ring-[#EB993C] text-[#324A6D]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-[#324A6D] mb-1">
                            Commodity code
                          </label>
                          <input
                            type="text"
                            value={item.commodityCode}
                            onChange={(e) =>
                              handleItemChange(
                                item.id,
                                "commodityCode",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 bg-[#F4FAFC] border-2 border-[#1F447B] rounded-md focus:outline-none focus:ring-2 focus:ring-[#EB993C] text-[#324A6D]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-[#324A6D] mb-1">
                            SKU
                          </label>
                          <input
                            type="text"
                            value={item.sku}
                            onChange={(e) =>
                              handleItemChange(item.id, "sku", e.target.value)
                            }
                            className="w-full px-3 py-2 bg-[#F4FAFC] border-2 border-[#1F447B] rounded-md focus:outline-none focus:ring-2 focus:ring-[#EB993C] text-[#324A6D]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-[#324A6D] mb-1">
                            Quantity
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              handleItemChange(
                                item.id,
                                "quantity",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 bg-[#F4FAFC] border-2 border-[#1F447B] rounded-md focus:outline-none focus:ring-2 focus:ring-[#EB993C] text-[#324A6D]"
                          />
                        </div>
                        {/* Row 2 */}
                        <div>
                          <label className="block text-xs font-medium text-[#324A6D] mb-1">
                            Item Weight (
                            {formData.measurementUnit === "metric"
                              ? "kg"
                              : "lbs"}
                            )
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            value={item.weight}
                            onChange={(e) =>
                              handleItemChange(
                                item.id,
                                "weight",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 bg-[#F4FAFC] border-2 border-[#1F447B] rounded-md focus:outline-none focus:ring-2 focus:ring-[#EB993C] text-[#324A6D]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-[#324A6D] mb-1">
                            Item value
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            value={item.value}
                            onChange={(e) =>
                              handleItemChange(item.id, "value", e.target.value)
                            }
                            className="w-full px-3 py-2 bg-[#F4FAFC] border-2 border-[#1F447B] rounded-md focus:outline-none focus:ring-2 focus:ring-[#EB993C] text-[#324A6D]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-[#324A6D] mb-1">
                            Currency
                          </label>
                          <select
                            value={item.currency}
                            onChange={(e) =>
                              handleItemChange(
                                item.id,
                                "currency",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 bg-[#F4FAFC] border-2 border-[#1F447B] rounded-md focus:outline-none focus:ring-2 focus:ring-[#EB993C] text-[#324A6D]"
                          >
                            <option value="GBP">GBP - £</option>
                            <option value="USD">USD - $</option>
                            <option value="EUR">EUR - €</option>
                            <option value="CAD">CAD - $</option>
                            <option value="AUD">AUD - $</option>
                            <option value="JPY">JPY - ¥</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-[#324A6D] mb-1">
                            Country of origin
                          </label>
                          <select
                            value={item.countryOfOrigin}
                            onChange={(e) =>
                              handleItemChange(
                                item.id,
                                "countryOfOrigin",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 bg-[#F4FAFC] border-2 border-[#1F447B] rounded-md focus:outline-none focus:ring-2 focus:ring-[#EB993C] text-[#324A6D]"
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
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#324A6D] mb-1">
                          Manufacturer details
                        </label>
                        <textarea
                          value={item.manufacturerDetails}
                          onChange={(e) =>
                            handleItemChange(
                              item.id,
                              "manufacturerDetails",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 bg-[#F4FAFC] border-2 border-[#1F447B] rounded-md focus:outline-none focus:ring-2 focus:ring-[#EB993C] text-[#324A6D] min-h-[70px]"
                          placeholder="Factory info, batch numbers, etc."
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={addItem}
                    className="bg-[#1F447B] hover:bg-[#1a3a6b] text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2 border-2 border-[#EB993C]"
                  >
                    <span className="text-lg">+</span>
                    Add Another Item
                  </button>
                </div>
              </div>

              {/* Additional Options (moved after Packages and Items) */}
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
                      <p className="text-xs text-[#EB993C] mt-1">
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
                      <p className="text-xs text-[#EB993C] mt-1">
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
                      <p className="text-xs text-[#EB993C] mt-1">
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
                      <p className="text-xs text-[#EB993C] mt-1">
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

                  <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
                    <div>
                      <label className="text-sm font-medium text-[#324A6D] cursor-pointer">
                        Upload Your Own Documents
                      </label>
                      <p className="text-xs text-[#EB993C] mt-1">
                        Attach commercial invoice or other shipping docs
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="uploadDocuments"
                        checked={formData.uploadDocuments}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-[#1F447B] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#EB993C]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#EB993C]"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Conditional blocks for Additional Options */}
              {formData.requestPickup && (
                <div className="bg-white/50 rounded-xl p-6 border border-[#1F447B]/20">
                  <h3 className="text-xl font-semibold text-[#1F447B] mb-4">
                    Pickup Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-[#324A6D] mb-2">
                        Pickup Date
                      </label>
                      <input
                        type="date"
                        name="pickupDate"
                        value={formData.pickupDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border-2 border-[#1F447B] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all text-[#324A6D]"
                        required={formData.requestPickup}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#324A6D] mb-2">
                        Time Range (Local Time)
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="time"
                          name="pickupTimeStart"
                          value={formData.pickupTimeStart}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white border-2 border-[#1F447B] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all text-[#324A6D]"
                          required={formData.requestPickup}
                        />
                        <span className="text-[#324A6D]">→</span>
                        <input
                          type="time"
                          name="pickupTimeEnd"
                          value={formData.pickupTimeEnd}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white border-2 border-[#1F447B] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all text-[#324A6D]"
                          required={formData.requestPickup}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#324A6D] mb-2">
                      Pickup Instructions
                    </label>
                    <textarea
                      name="pickupInstructions"
                      value={formData.pickupInstructions}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border-2 border-[#1F447B] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all text-[#324A6D] min-h-[80px]"
                      placeholder="e.g., Call upon arrival, loading dock at rear"
                    />
                  </div>
                </div>
              )}

              {formData.dangerousGoods && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-[#324A6D] mb-2">
                    Dangerous Goods Category
                  </label>
                  <select
                    name="dangerousGoodsCategory"
                    value={formData.dangerousGoodsCategory}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 pr-12 bg-white border-2 border-[#1F447B] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all text-[#324A6D]"
                    required={formData.dangerousGoods}
                  >
                    <option value="">Select Category</option>
                    <option value="DGR">DGR | Dangerous Goods</option>
                    <option value="DRY_ICE">DRY_ICE | Dry Ice</option>
                    <option value="LITHIUM">LITHIUM | Lithium Battery</option>
                  </select>
                  <p className="text-xs text-[#EB993C] mt-2 italic">
                    Further documentation will be required prior to completion
                    of shipment.
                  </p>
                </div>
              )}

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
                        className="w-full px-4 py-3 bg-white border-2 border-[#1F447B] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all text-[#324A6D]"
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
                        className="w-full px-4 py-3 pr-12 bg-white border-2 border-[#1F447B] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:bg-white transition-all text-[#324A6D]"
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

              {formData.uploadDocuments && (
                <div className="mt-4 bg-white/50 rounded-xl p-6 border border-[#1F447B]/20">
                  <h3 className="text-xl font-semibold text-[#1F447B] mb-4">
                    Upload Documents
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-[#324A6D] mb-2">
                      Select files
                    </label>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="block w-full text-sm text-[#324A6D] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#1F447B] file:text-white hover:file:bg-[#1a3a6b]"
                    />
                    {documents.length > 0 && (
                      <ul className="mt-3 space-y-1 text-xs text-[#324A6D]">
                        {documents.map((f, i) => (
                          <li key={i}>
                            {f.name} ({Math.round(f.size / 1024)} KB)
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <p className="text-xs text-[#EB993C] mt-2">
                    PDFs, images, or other relevant shipping documents.
                  </p>
                </div>
              )}

              {/* Totals Summary */}
              <div className="mt-8 bg-white/50 rounded-xl p-6 border border-[#1F447B]/20">
                <h3 className="text-xl font-semibold text-[#1F447B] mb-4">
                  Totals
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Item Weight */}
                  <div className="bg-white rounded-lg p-5 border border-[#1F447B]/10 shadow-sm">
                    <h4 className="text-sm font-medium text-[#324A6D] mb-1">
                      Total Item Weight
                    </h4>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-semibold text-[#1F447B]">
                        {totalItemWeight.toFixed(2)}
                      </span>
                      <span className="text-sm text-[#324A6D] font-medium">
                        {unitLabel}
                      </span>
                    </div>
                    <p className="text-xs text-[#EB993C] mt-2">
                      Items (quantity × weight)
                    </p>
                  </div>
                  {/* Package Weight */}
                  <div className="bg-white rounded-lg p-5 border border-[#1F447B]/10 shadow-sm">
                    <h4 className="text-sm font-medium text-[#324A6D] mb-1">
                      Total Package Weight
                    </h4>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-semibold text-[#1F447B]">
                        {totalPackageWeight.toFixed(2)}
                      </span>
                      <span className="text-sm text-[#324A6D] font-medium">
                        {unitLabel}
                      </span>
                    </div>
                    <p className="text-xs text-[#EB993C] mt-2">
                      Packages (quantity × weight)
                    </p>
                  </div>
                  {/* Item Value */}
                  <div className="bg-white rounded-lg p-5 border border-[#1F447B]/10 shadow-sm">
                    <h4 className="text-sm font-medium text-[#324A6D] mb-1">
                      Total Item Value
                    </h4>
                    <div className="space-y-1 mt-1">
                      {Object.keys(totalsByCurrency).length === 0 ? (
                        <div className="text-3xl font-semibold text-[#1F447B]">
                          {formatCurrency("USD", 0)}
                        </div>
                      ) : (
                        Object.entries(totalsByCurrency).map(
                          ([cur, amount]) => (
                            <div
                              key={cur}
                              className="flex items-baseline gap-2"
                            >
                              <span className="text-2xl font-semibold text-[#1F447B]">
                                {formatCurrency(cur, amount)}
                              </span>
                              <span className="text-[10px] tracking-wide text-[#324A6D]/70 uppercase">
                                {cur}
                              </span>
                            </div>
                          )
                        )
                      )}
                    </div>
                    <p className="text-xs text-[#EB993C] mt-2">
                      Items (quantity × value)
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-[#EB993C] hover:bg-[#d4822a] text-white font-semibold px-12 py-4 rounded-lg text-lg transition-colors duration-200 border-2 border-[#1F447B]"
                >
                  Book Shipment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
