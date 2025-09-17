"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// Main solutions with taglines for simple carousel
const partnerSolutions = [
  {
    name: "ShipItSmart",
    tagline: "Be Smart, Ship itSmart",
    description:
      "Discounted express and economy shipping with FedEx, DHL, and UPS for domestic and international parcels—rate compare, book, and track in one place.",
  },
  {
    name: "FreightItSmart",
    tagline: "Be Smart, Freight itSmart",
    description:
      "LTL, FTL, air, and ocean freight made simple—instant quotes, multi‑carrier options, and end‑to‑end visibility for heavy and bulk shipments.",
  },
  {
    name: "ReturnItSmart",
    tagline: "Be Smart, Return itSmart",
    description:
      "Hassle‑free returns with prepaid labels, smart routing, and status updates—improve CX while controlling costs and reverse‑logistics complexity.",
  },
  {
    name: "FulfillItSmart",
    tagline: "Be Smart, Fulfill itSmart",
    description:
      "Omnichannel fulfillment and inventory sync—pick, pack, and ship with real‑time rates, automation rules, and integrations to your sales channels.",
  },
];

const Footer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Reveal-on-view animation using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    const footerEl = document.querySelector("#footer");
    if (footerEl) observer.observe(footerEl);
    return () => observer.disconnect();
  }, []);

  // Auto-advance carousel every 3s
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % partnerSolutions.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const getCurrentSolution = () => partnerSolutions[currentIndex];

  return (
    <footer id="footer" className="bg-white border-t border-gray-200 py-12">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div
            className={`col-span-1 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-3"
            }`}
          >
            {/* Logo */}
            <div className="mb-4 text-left">
              <Image
                src="/gaLogo.png"
                alt="Global American LLC"
                width={200}
                height={60}
                className="h-12 w-auto hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* In Partnership with Section */}
            <div className="mb-4 text-left">
              <h4 className="text-base font-semibold mb-3">
                In <span className="text-[#EB993C]">Partnership</span> with
              </h4>
              <div className="relative">
                <div className="min-h-[60px] flex items-center">
                  <div
                    key={`${getCurrentSolution().name}-${currentIndex}`}
                    className={`text-left transition-all duration-500 w-full ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-2"
                    }`}
                  >
                    <p className="text-sm font-semibold text-[#1F447B] leading-tight mb-1">
                      {getCurrentSolution().name}
                    </p>
                    <p className="text-xs text-[#EB993C] font-medium">
                      {getCurrentSolution().tagline}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[#324A6D] text-sm leading-relaxed mb-6">
              {getCurrentSolution().description}
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 flex flex-col">
            <h3 className="font-semibold text-lg mb-4">
              <span className="text-[#1F447B]">Quick</span>{" "}
              <span className="text-[#EB993C]">Links</span>
            </h3>
            <ul className="space-y-2">
              {[
                { label: "About Us", href: "/about" },
                { label: "Solutions", href: "/#integrations" },
                { label: "Services", href: "/#services" },
                { label: "Testimonials", href: "/#testimonials" },
                { label: "Get a Quote", href: "/quote" },
                { label: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.label} className="flex items-start gap-2">
                  <span className="mt-2 inline-block w-1.5 h-1.5 rounded-full bg-[#EB993C] flex-shrink-0"></span>
                  <Link
                    href={link.href}
                    className="text-[#1F447B] hover:text-[#0f2a52] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get In Touch */}
          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4">
              <span className="text-[#1F447B]">Get In</span>{" "}
              <span className="text-[#EB993C]">Touch</span>
            </h3>
            <div className="space-y-3">
              <p className="text-[#324A6D] text-sm">Phone: +1 551-205-9492</p>
              {/* Social Media Icons */}
              <div className="flex space-x-4 pt-2">
                <a
                  href="#"
                  className="text-[#EB993C] hover:text-[#d97706] transition-colors"
                  aria-label="Facebook"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-[#EB993C] hover:text-[#d97706] transition-colors"
                  aria-label="Twitter"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="col-span-1 flex flex-col justify-between">
            <h3 className="font-semibold text-lg mb-4">
              <span className="text-[#1F447B]">Global</span>{" "}
              <span className="text-[#EB993C]">Locations</span>
            </h3>
            <ul className="space-y-3">
              {[
                { label: "New York, USA", flag: "🇺🇸" },
                { label: "Belfast, Northern Ireland", flag: "🇬🇧" },
                { label: "Dublin, Republic of Ireland", flag: "🇮🇪" },
                { label: "Manchester, United Kingdom", flag: "🇬🇧" },
              ].map((loc) => (
                <li key={loc.label} className="flex items-center gap-2">
                  <span className="text-lg">📍</span>
                  <span className="text-xl" aria-hidden>
                    {loc.flag}
                  </span>
                  <span className="text-[#1F447B] text-sm font-medium">
                    {loc.label}
                  </span>
                </li>
              ))}
            </ul>
            <div className="pt-6 mt-6 flex justify-end">
              <Image
                src="/shipItSmartIcon.png"
                alt="ShipItSmart Icon"
                width={120}
                height={120}
                className="h-16 w-auto object-contain"
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
