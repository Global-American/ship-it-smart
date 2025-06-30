"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Integrations", href: "/integrations" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
];

const COLORS = {
  primary: "#1F447B",
  secondary: "#D4E2FF",
  body: "#324A6D",
  accent: "#EB993C",
};

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.nav
        key={pathname}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -30, opacity: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        style={{ background: "#fff" }}
        className="shadow-lg border-b border-gray-200 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center min-w-[200px]">
              <Link href="/" className="flex items-center space-x-2">
                <Image
                  src="/shipItSmartMain.png"
                  alt="ShipItSmart Logo"
                  width={180}
                  height={40}
                  priority
                  style={{ objectFit: "contain", height: 40 }}
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex flex-1 items-center justify-center space-x-10">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative font-semibold text-lg px-2 py-1 transition-colors duration-200
                      ${
                        isActive
                          ? "text-[#1F447B]"
                          : "text-[#324A6D] hover:text-[#1F447B]"
                      }`}
                    style={{ zIndex: 1 }}
                  >
                    {item.name}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute left-0 right-0 -bottom-1 h-1 rounded-full"
                        style={{
                          background: COLORS.primary,
                          boxShadow: `0 2px 8px 0 ${COLORS.secondary}`,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Login Button */}
            <div className="hidden md:flex items-center min-w-[160px] justify-end">
              <Link href="/login">
                <button
                  className="font-semibold rounded-full px-10 py-3 text-lg transition-colors duration-200 shadow-md"
                  style={{ background: COLORS.accent, color: "#fff" }}
                >
                  Login
                </button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-[#324A6D] hover:text-[#1F447B] hover:bg-[#D4E2FF] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#1F447B]"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden px-4 pt-2 pb-3 bg-[#D4E2FF] border-t border-gray-200">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block font-semibold text-base px-3 py-2 rounded-md transition-colors duration-200
                  ${
                    pathname === item.href
                      ? "text-[#1F447B] bg-white"
                      : "text-[#324A6D] hover:text-[#1F447B] hover:bg-white"
                  }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link href="/login">
              <button
                className="w-full mt-2 font-semibold rounded-full px-3 py-2 text-base transition-colors duration-200 shadow-md"
                style={{ background: COLORS.accent, color: "#fff" }}
              >
                Login
              </button>
            </Link>
          </div>
        )}
      </motion.nav>
    </AnimatePresence>
  );
};

export default Navigation;
