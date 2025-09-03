"use client";

import { useState, useEffect, useRef } from "react";
import ColorPicker from "../components/ColorPicker";

export default function IntegrationsPage() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [bgColor, setBgColor] = useState("#F4FAFC");
  const [containerColor, setContainerColor] = useState("#ffffff");
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === headerRef.current && entry.isIntersecting) {
            setIsHeaderVisible(true);
          }
          if (entry.target === contentRef.current && entry.isIntersecting) {
            setIsContentVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (headerRef.current) observer.observe(headerRef.current);
    if (contentRef.current) observer.observe(contentRef.current);

    // Trigger animations immediately if elements are already in view
    setTimeout(() => {
      if (headerRef.current) {
        const rect = headerRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setIsHeaderVisible(true);
        }
      }
      if (contentRef.current) {
        const rect = contentRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setIsContentVisible(true);
        }
      }
    }, 100);

    return () => observer.disconnect();
  }, []);

  const categories = [
    "ALL",
    "CARRIERS",
    "ECOMMERCE STORE",
    "MARKETPLACE",
    "WMS",
    "ORDER MANAGEMENT",
    "FINANCE",
    "API",
  ];

  const integrations = [
    {
      name: "API",
      description:
        "Build your own integrations and apps using the Ship It Smart API",
      category: "API",
      color: "bg-[#A8E6CF]",
      textColor: "text-[#2E7D5A]",
    },
    {
      name: "Royal Mail",
      description:
        "Connect with Royal Mail for reliable UK domestic and international shipping",
      category: "CARRIERS",
      color: "bg-[#E60012]",
      textColor: "text-white",
    },
    {
      name: "DPD",
      description:
        "Integrate with DPD for fast and secure parcel delivery across Europe",
      category: "CARRIERS",
      color: "bg-[#D40511]",
      textColor: "text-white",
    },
    {
      name: "UPS",
      description:
        "Ship with UPS for worldwide express and standard delivery services",
      category: "CARRIERS",
      color: "bg-[#8B4513]",
      textColor: "text-white",
    },
    {
      name: "FedEx",
      description:
        "Connect with FedEx for premium international shipping solutions",
      category: "CARRIERS",
      color: "bg-[#4D148C]",
      textColor: "text-white",
    },
    {
      name: "DHL",
      description:
        "Integrate with DHL for global express delivery and logistics",
      category: "CARRIERS",
      color: "bg-[#FFCC00]",
      textColor: "text-black",
    },
    {
      name: "Hermes",
      description: "Ship with Hermes for cost-effective UK parcel delivery",
      category: "CARRIERS",
      color: "bg-[#8B0000]",
      textColor: "text-white",
    },
    {
      name: "Yodel",
      description: "Connect with Yodel for flexible UK delivery solutions",
      category: "CARRIERS",
      color: "bg-[#FF6B35]",
      textColor: "text-white",
    },
    {
      name: "TNT",
      description:
        "Integrate with TNT for express delivery across Europe and beyond",
      category: "CARRIERS",
      color: "bg-[#FF8C00]",
      textColor: "text-white",
    },
    {
      name: "Parcelforce",
      description:
        "Connect with Parcelforce for UK express and international delivery",
      category: "CARRIERS",
      color: "bg-[#1F447B]",
      textColor: "text-white",
    },
    {
      name: "XDP",
      description: "Integrate with XDP for next-day delivery across the UK",
      category: "CARRIERS",
      color: "bg-[#00A651]",
      textColor: "text-white",
    },
    {
      name: "APC",
      description: "Ship with APC for reliable overnight delivery services",
      category: "CARRIERS",
      color: "bg-[#E31837]",
      textColor: "text-white",
    },
    {
      name: "Collect+",
      description:
        "Connect with Collect+ for convenient parcel collection services",
      category: "CARRIERS",
      color: "bg-[#7B68EE]",
      textColor: "text-white",
    },
    {
      name: "Etsy",
      description:
        "Connect your Etsy shop to streamline handmade and vintage item shipping",
      category: "MARKETPLACE",
      color: "bg-[#F16521]",
      textColor: "text-white",
    },
    {
      name: "eBay",
      description:
        "Seamlessly ship your eBay sales with automated order processing",
      category: "MARKETPLACE",
      color: "bg-[#E53238]",
      textColor: "text-white",
    },
    {
      name: "Amazon",
      description: "Ship your Amazon orders while meeting their requirements",
      category: "MARKETPLACE",
      color: "bg-[#232F3E]",
      textColor: "text-white",
    },
    {
      name: "ShipStation",
      description:
        "Integrate with ShipStation for multi-channel shipping management",
      category: "ORDER MANAGEMENT",
      color: "bg-[#3B82F6]",
      textColor: "text-white",
    },
    {
      name: "WooCommerce",
      description:
        "Connect your WordPress WooCommerce store for automated shipping",
      category: "ECOMMERCE STORE",
      color: "bg-[#96588A]",
      textColor: "text-white",
    },
    {
      name: "TikTok",
      description:
        "Ship orders from TikTok Shop with integrated social commerce",
      category: "MARKETPLACE",
      color: "bg-[#FF0050]",
      textColor: "text-white",
    },
    {
      name: "Shopify",
      description: "Sync your Shopify store for seamless order fulfillment",
      category: "ECOMMERCE STORE",
      color: "bg-[#7AB55C]",
      textColor: "text-white",
    },
    {
      name: "Linnworks",
      description: "Automate your multi-channel inventory and order management",
      category: "WMS",
      color: "bg-[#1E3A8A]",
      textColor: "text-white",
    },
    {
      name: "Aimco",
      description: "Integrate with Aimco for advanced warehouse management",
      category: "WMS",
      color: "bg-[#6B7280]",
      textColor: "text-white",
    },
    {
      name: "Mintsoft",
      description:
        "Connect Mintsoft for comprehensive warehouse and inventory control",
      category: "WMS",
      color: "bg-[#10B981]",
      textColor: "text-white",
    },
    {
      name: "Veeqo",
      description:
        "Sync with Veeqo for multi-channel inventory and shipping management",
      category: "WMS",
      color: "bg-[#8B5CF6]",
      textColor: "text-white",
    },
  ];

  const filteredIntegrations = integrations.filter((integration) => {
    const matchesCategory =
      selectedCategory === "ALL" || integration.category === selectedCategory;
    const matchesSearch =
      integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      integration.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
        <div
          ref={headerRef}
          className={`text-center mb-12 lg:mb-20 transition-all duration-700 ${
            isHeaderVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-[#1F447B] mb-4">
            Our <span className="text-[#EB993C]">Integrations</span>
          </h1>
          <p className="text-lg text-[#324A6D] max-w-3xl mx-auto">
            Connect Ship It Smart with your existing tools and platforms to
            streamline your shipping workflow.
          </p>
        </div>

        <div
          ref={contentRef}
          className={`flex flex-col lg:flex-row gap-8 transition-all duration-700 ${
            isContentVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div
              className="rounded-2xl p-6 shadow-lg sticky top-8 border-2 border-[#1F447B]"
              style={{ backgroundColor: containerColor }}
            >
              {/* Search */}
              <div className="mb-8">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-2 border-[#1F447B] w-full px-4 py-3 bg-[#F4FAFC] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:border-transparent text-[#324A6D]"
                />
              </div>

              {/* Categories */}
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors font-medium ${
                      selectedCategory === category
                        ? "bg-[#EB993C] text-white border-2 border-[#1F447B]"
                        : "text-[#324A6D] hover:bg-gray-100"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredIntegrations.map((integration, index) => (
                <div
                  key={index}
                  className={`border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-700 cursor-pointer ${
                    isContentVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{
                    transitionDelay: `${400 + (index % 9) * 100}ms`,
                    transition: "all 0.7s ease-out, box-shadow 0.3s ease-out",
                    backgroundColor: containerColor,
                  }}
                >
                  {/* Integration Icon */}
                  <div
                    className={`w-16 h-16 ${integration.color} rounded-xl flex items-center justify-center mb-4`}
                  >
                    <span
                      className={`${integration.textColor} font-bold text-sm`}
                    >
                      {integration.name === "API"
                        ? "</>"
                        : integration.name.split(" ")[0]}
                    </span>
                  </div>

                  {/* Integration Info */}
                  <h3 className="text-xl font-bold text-[#1F447B] mb-2">
                    {integration.name}
                  </h3>
                  <p className="text-[#324A6D] text-sm leading-relaxed">
                    {integration.description}
                  </p>
                </div>
              ))}
            </div>

            {filteredIntegrations.length === 0 && (
              <div className="text-center py-12">
                <p className="text-[#324A6D] text-lg">
                  No integrations found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
