"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Phone, MapPin, Instagram, Linkedin, Youtube } from "lucide-react";

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
    <footer id="footer" className="bg-white border-t border-gray-200 pt-8">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
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
              <h4 className="text-base font-semibold mb-3 text-[#1F447B]">
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
          <div className="col-span-1 flex flex-col items-start">
            <h3 className="font-semibold text-lg mb-4">
              <span className="text-[#1F447B]">Quick</span>{" "}
              <span className="text-[#EB993C]">Links</span>
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {[
                { label: "Home", href: "/#home" },
                { label: "Services", href: "/#services" },
                { label: "Integrations", href: "/integrations" },
                { label: "Quote", href: "/quote" },
                { label: "Demo", href: "/demo" },
                { label: "About Us", href: "/about" },
                { label: "Contact Us", href: "/contact" },
                { label: "Booking Form", href: "/booking" },
              ].map((link) => (
                <div
                  key={link.label}
                  className="flex items-center justify-start gap-2"
                >
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#EB993C] flex-shrink-0 self-center"></span>
                  <Link
                    href={link.href}
                    className="text-[#1F447B] hover:text-[#0f2a52] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-1 flex flex-col items-start text-start ml-8">
            {/* Brands */}
            <div>
              <h3 className="font-semibold text-lg mb-4 text-start">
                <span className="text-[#1F447B]">Our</span>{" "}
                <span className="text-[#EB993C]">Brands</span>
              </h3>
              <div className="space-y-2">
                <div className="flex items-start justify-start space-x-2">
                  <ul className="space-y-2">
                    {[
                      { label: "ShipItSmart", href: "" },
                      { label: "FreightItSmart", href: "" },
                      { label: "ReturnItSmart", href: "" },
                      { label: "FulfillItSmart", href: "" },
                    ].map((link) => (
                      <li
                        key={link.label}
                        className="flex items-start justify-start gap-2"
                      >
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#EB993C] flex-shrink-0 self-center"></span>
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
              </div>
            </div>
          </div>

          {/* Column 4: Global Locations and Get In Touch */}
          <div className="col-span-1 flex flex-col items-start text-start">
            {/* Global Locations */}
            <div>
              <h3 className="font-semibold text-lg mb-4 text-start">
                <span className="text-[#1F447B]">Global</span>{" "}
                <span className="text-[#EB993C]">Locations</span>
              </h3>
              <div className="space-y-2">
                <div className="flex items-start justify-start space-x-2">
                  <div className="text-sm text-muted-foreground leading-relaxed text-start text-[#1F447B]">
                    <div className="flex items-start">
                      <MapPin
                        className="h-4 w-4 mt-0.5 flex-shrink-0 text-[#EB993C] mr-2"
                        aria-hidden="true"
                      />
                      <p className="font-medium text-foreground">
                        🇺🇸 New York, USA
                      </p>
                    </div>{" "}
                    <div className="flex items-start">
                      <MapPin
                        className="h-4 w-4 mt-0.5 flex-shrink-0 text-[#EB993C] mr-2"
                        aria-hidden="true"
                      />
                      <p className="font-medium text-foreground">
                        🇬🇧 Belfast, Northern Ireland
                      </p>
                    </div>{" "}
                    <div className="flex items-start">
                      <MapPin
                        className="h-4 w-4 mt-0.5 flex-shrink-0 text-[#EB993C] mr-2"
                        aria-hidden="true"
                      />
                      <p className="font-medium text-foreground">
                        🇮🇪 Dublin, Republic of Ireland
                      </p>
                    </div>{" "}
                    <div className="flex items-start">
                      <MapPin
                        className="h-4 w-4 mt-0.5 flex-shrink-0 text-[#EB993C] mr-2"
                        aria-hidden="true"
                      />
                      <p className="font-medium text-foreground">
                        🇬🇧 Manchester, United Kingdom
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Get In Touch */}
            <div className="mt-6">
              <h3 className="font-semibold text-lg mb-4 text-start">
                <span className="text-[#1F447B]">Get In</span>{" "}
                <span className="text-[#EB993C]">Touch</span>
              </h3>
              <div className="space-y-3">
                <div className="flex items-start justify-start space-x-2">
                  <Phone
                    className="h-4 w-4 flex-shrink-0 text-[#EB993C]"
                    aria-hidden="true"
                  />
                  <span className="text-sm text-muted-foreground  text-[#1F447B]">
                    +1 551-205-9492
                  </span>
                </div>
                <div className="flex justify-start space-x-4 pt-2">
                  {/* Facebook */}
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
                  {/* X (Twitter) */}
                  <a
                    href="#"
                    className="text-[#EB993C] hover:text-[#d97706] transition-colors"
                    aria-label="X"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  {/* LinkedIn */}
                  <a
                    href="#"
                    className="text-[#EB993C] hover:text-[#d97706] transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                  {/* Instagram */}
                  <a
                    href="#"
                    className="text-[#EB993C] hover:text-[#d97706] transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                  {/* TikTok */}
                  <a
                    href="#"
                    className="text-[#EB993C] hover:text-[#d97706] transition-colors"
                    aria-label="TikTok"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                    </svg>
                  </a>
                  {/* YouTube */}
                  <a
                    href="#"
                    className="text-[#EB993C] hover:text-[#d97706] transition-colors"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>

            {/* spacer to balance height if needed */}
            <div className="grow" />
          </div>

          {/* Column 5: Icon on far right */}
          <div className="col-span-1 flex items-start justify-center">
            <Image
              src="/shipItSmartIcon.png"
              alt="ShipItSmart Icon"
              width={195}
              height={195}
              className="w-auto object-contain"
              priority={false}
            />
          </div>
        </div>
      </div>
      {/* Compact Bottom Bar */}
      <div
        className={`border-t border-accent/10 py-3 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: "500ms" }}
      >
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Global American LLC. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
