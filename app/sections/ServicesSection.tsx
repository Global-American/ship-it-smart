"use client";

import { useEffect, useRef } from "react";

export default function ServicesSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);
  const row4Ref = useRef<HTMLDivElement>(null);
  const row5Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const elements = [headerRef, row1Ref, row2Ref, row3Ref, row4Ref, row5Ref];
    elements.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className="text-center mb-16 opacity-0 transition-opacity duration-1000 ease-out"
        >
          <h2 className="text-4xl font-bold text-[#1F447B] mb-4">
            How <span className="text-[#EB993C]">Ship It Smart</span> Works
          </h2>
          <p className="text-lg text-[#324A6D] max-w-3xl mx-auto">
            From import to delivery tracking, we streamline your entire shipping
            workflow.
          </p>
        </div>

        {/* Story Row 1: Text Left, Image Right - Import Shipments */}
        <div
          ref={row1Ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-20 opacity-0 transition-opacity duration-1000 ease-out"
        >
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-[#1F447B]">
              Import Your Shipments
            </h3>
            <p className="text-lg text-[#324A6D] leading-relaxed">
              Easily pull in shipments from your favorite marketplaces or upload
              via CSV. Connect your Amazon, eBay, Shopify, and other platforms
              to automatically sync orders, or bulk upload shipment data with
              our simple CSV import tool.
            </p>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-[#EB993C] rounded-full"></div>
              <span className="text-[#1F447B] font-semibold">
                Marketplace Integration
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-[#EB993C] rounded-full"></div>
              <span className="text-[#1F447B] font-semibold">
                CSV Bulk Upload
              </span>
            </div>
          </div>
          <div className="bg-[#D4E2FF] rounded-2xl p-8 h-80 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1F447B] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
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
              <p className="text-[#1F447B] font-medium">Import Orders</p>
            </div>
          </div>
        </div>

        {/* Story Row 2: Image Left, Text Right - Shipment Rules */}
        <div
          ref={row2Ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-20 opacity-0 transition-opacity duration-1000 ease-out"
        >
          <div className="bg-[#FFF4E6] rounded-2xl p-8 h-80 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#EB993C] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v1a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2zM9 14H7a2 2 0 000 4h2a2 2 0 000-4zM20 5h-2a2 2 0 00-2 2v1a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2zM20 14h-2a2 2 0 00-2 2v1a2 2 0 002 2h2a2 2 0 002-2v-1a2 2 0 00-2-2z"
                  />
                </svg>
              </div>
              <p className="text-[#EB993C] font-medium">Smart Rules</p>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-[#1F447B]">
              Apply Shipment Rules & Mapping
            </h3>
            <p className="text-lg text-[#324A6D] leading-relaxed">
              Set up intelligent shipment rules and mapping to automatically
              categorize and route your orders. Define criteria based on
              destination, weight, value, or product type to ensure optimal
              carrier selection and shipping methods.
            </p>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-[#EB993C] rounded-full"></div>
              <span className="text-[#1F447B] font-semibold">
                Automated Rules
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-[#EB993C] rounded-full"></div>
              <span className="text-[#1F447B] font-semibold">
                Smart Mapping
              </span>
            </div>
          </div>
        </div>

        {/* Story Row 3: Text Left, Image Right - Create Labels */}
        <div
          ref={row3Ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-20 opacity-0 transition-opacity duration-1000 ease-out"
        >
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-[#1F447B]">
              Generate Shipping Labels
            </h3>
            <p className="text-lg text-[#324A6D] leading-relaxed">
              Create professional shipping labels instantly with our integrated
              label generation system. Compare rates across multiple carriers,
              select the best option, and generate compliant labels with all
              necessary documentation.
            </p>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-[#EB993C] rounded-full"></div>
              <span className="text-[#1F447B] font-semibold">
                Rate Comparison
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-[#EB993C] rounded-full"></div>
              <span className="text-[#1F447B] font-semibold">
                Instant Generation
              </span>
            </div>
          </div>
          <div className="bg-[#E8F5E8] rounded-2xl p-8 h-80 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#22C55E] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
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
              <p className="text-[#22C55E] font-medium">Create Labels</p>
            </div>
          </div>
        </div>

        {/* Story Row 4: Image Left, Text Right - Print Labels */}
        <div
          ref={row4Ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-20 opacity-0 transition-opacity duration-1000 ease-out"
        >
          <div className="bg-[#F3E8FF] rounded-2xl p-8 h-80 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#8B5CF6] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                  />
                </svg>
              </div>
              <p className="text-[#8B5CF6] font-medium">Print Labels</p>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-[#1F447B]">
              Print & Apply Labels
            </h3>
            <p className="text-lg text-[#324A6D] leading-relaxed">
              Print high-quality shipping labels using any standard printer. Our
              system supports various label formats and sizes, ensuring
              compatibility with your existing equipment and providing crisp,
              scannable barcodes every time.
            </p>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-[#EB993C] rounded-full"></div>
              <span className="text-[#1F447B] font-semibold">
                Multiple Formats
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-[#EB993C] rounded-full"></div>
              <span className="text-[#1F447B] font-semibold">
                High Quality Print
              </span>
            </div>
          </div>
        </div>

        {/* Story Row 5: Text Left, Image Right - Track Shipments */}
        <div
          ref={row5Ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center opacity-0 transition-opacity duration-1000 ease-out"
        >
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-[#1F447B]">
              Track Your Shipments
            </h3>
            <p className="text-lg text-[#324A6D] leading-relaxed">
              Monitor all your shipments in real-time with comprehensive
              tracking. Get automatic updates on delivery status, view shipment
              history, and provide customers with accurate delivery information
              through our tracking portal.
            </p>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-[#EB993C] rounded-full"></div>
              <span className="text-[#1F447B] font-semibold">
                Real-time Updates
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-[#EB993C] rounded-full"></div>
              <span className="text-[#1F447B] font-semibold">
                Customer Portal
              </span>
            </div>
          </div>
          <div className="bg-[#FEF3E2] rounded-2xl p-8 h-80 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#F59E0B] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <p className="text-[#F59E0B] font-medium">Track Shipments</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .fade-in {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
}
