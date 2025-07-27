"use client";

import { useState } from "react";

export default function IntegrationsSection() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    "ALL",
    "ECOMMERCE STORE",
    "MARKETPLACE",
    "INVENTORY MANAGEMENT",
    "ORDER MANAGEMENT",
    "WAREHOUSING",
    "ERP",
    "FINANCE",
    "CROWDFUNDING",
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
      category: "INVENTORY MANAGEMENT",
      color: "bg-[#1E3A8A]",
      textColor: "text-white",
    },
    {
      name: "Aimco",
      description: "Integrate with Aimco for advanced warehouse management",
      category: "WAREHOUSING",
      color: "bg-[#6B7280]",
      textColor: "text-white",
    },
    {
      name: "Mintsoft",
      description:
        "Connect Mintsoft for comprehensive warehouse and inventory control",
      category: "WAREHOUSING",
      color: "bg-[#10B981]",
      textColor: "text-white",
    },
    {
      name: "Veeqo",
      description:
        "Sync with Veeqo for multi-channel inventory and shipping management",
      category: "INVENTORY MANAGEMENT",
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
    <section id="integrations" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#1F447B] mb-4">
            Our <span className="text-[#EB993C]">Integrations</span>
          </h2>
          <p className="text-lg text-[#324A6D] max-w-3xl mx-auto">
            Connect Ship It Smart with your existing tools and platforms to
            streamline your shipping workflow.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-gray-50 rounded-2xl p-6 sticky top-8">
              {/* Search */}
              <div className="mb-8">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:border-transparent"
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
                        ? "bg-[#EB993C] text-white"
                        : "text-[#324A6D] hover:bg-gray-100"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* View Shipping Solutions Link */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <a
                  href="#"
                  className="flex items-center text-[#4A90E2] font-medium hover:text-[#EB993C] transition-colors"
                >
                  VIEW SHIPPING SOLUTIONS
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredIntegrations.map((integration, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow cursor-pointer"
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
