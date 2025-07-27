"use client";

import { useEffect, useRef } from "react";

export default function ServicesSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);
  const row4Ref = useRef<HTMLDivElement>(null);

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

    const elements = [headerRef, row1Ref, row2Ref, row3Ref, row4Ref];
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
            From pickup to delivery, we make shipping simple, smart, and
            reliable.
          </p>
        </div>

        {/* Story Row 1: Text Left, Image Right */}
        <div
          ref={row1Ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-20 opacity-0 transition-opacity duration-1000 ease-out"
        >
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-[#1F447B]">
              Smart Shipping Solutions
            </h3>
            <p className="text-lg text-[#324A6D] leading-relaxed">
              We analyze your shipping needs and connect you with the best
              carriers. Our intelligent platform compares rates, delivery times,
              and service options to find the perfect match for every package.
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
                Carrier Selection
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
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <p className="text-[#1F447B] font-medium">Smart Analytics</p>
            </div>
          </div>
        </div>

        {/* Story Row 2: Image Left, Text Right */}
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
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <p className="text-[#EB993C] font-medium">Express Delivery</p>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-[#1F447B]">
              Lightning-Fast Pickup
            </h3>
            <p className="text-lg text-[#324A6D] leading-relaxed">
              Schedule a pickup in minutes, not hours. Our network of trusted
              drivers and carriers ensures your packages are collected quickly
              and handled with care from the moment they leave your hands.
            </p>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-[#EB993C] rounded-full"></div>
              <span className="text-[#1F447B] font-semibold">
                Same-Day Pickup
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-[#EB993C] rounded-full"></div>
              <span className="text-[#1F447B] font-semibold">
                Trusted Drivers
              </span>
            </div>
          </div>
        </div>

        {/* Story Row 3: Text Left, Image Right */}
        <div
          ref={row3Ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-20 opacity-0 transition-opacity duration-1000 ease-out"
        >
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-[#1F447B]">
              Real-Time Tracking
            </h3>
            <p className="text-lg text-[#324A6D] leading-relaxed">
              Stay informed every step of the way. Our advanced tracking system
              provides real-time updates, delivery notifications, and complete
              transparency throughout your package's journey.
            </p>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-[#EB993C] rounded-full"></div>
              <span className="text-[#1F447B] font-semibold">Live Updates</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-[#EB993C] rounded-full"></div>
              <span className="text-[#1F447B] font-semibold">
                SMS Notifications
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
              <p className="text-[#22C55E] font-medium">Live Tracking</p>
            </div>
          </div>
        </div>

        {/* Story Row 4: Image Left, Text Right */}
        <div
          ref={row4Ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center opacity-0 transition-opacity duration-1000 ease-out"
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-[#8B5CF6] font-medium">Secure Delivery</p>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-[#1F447B]">
              Safe & Secure Delivery
            </h3>
            <p className="text-lg text-[#324A6D] leading-relaxed">
              Your packages arrive safely, on time, every time. With insurance
              options, signature confirmation, and our satisfaction guarantee,
              you can ship with complete confidence and peace of mind.
            </p>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-[#EB993C] rounded-full"></div>
              <span className="text-[#1F447B] font-semibold">
                Insurance Protection
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-[#EB993C] rounded-full"></div>
              <span className="text-[#1F447B] font-semibold">
                Satisfaction Guarantee
              </span>
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
