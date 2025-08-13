"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "Integrations", href: "#integrations" },
  { name: "Quote", href: "/quote" },
  { name: "Demo", href: "/demo" },
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
  const [activeSection, setActiveSection] = useState("home");
  const [isContactPage, setIsContactPage] = useState(false);
  const [isAboutPage, setIsAboutPage] = useState(false);
  const [isDemoPage, setIsDemoPage] = useState(false);
  const [isQuotePage, setIsQuotePage] = useState(false);
  const [navUnderlineKey, setNavUnderlineKey] = useState("home");
  const router = useRouter();

  // Only set isContactPage after mount to avoid hydration errors
  useEffect(() => {
    // Use a safer check for window and pathname
    if (typeof window !== "undefined") {
      setIsContactPage(window.location.pathname === "/contact");
      setIsAboutPage(window.location.pathname === "/about");
      setIsDemoPage(window.location.pathname === "/demo");
      setIsQuotePage(window.location.pathname === "/quote");
      // Set underline key based on current page
      if (window.location.pathname === "/contact")
        setNavUnderlineKey("contact");
      else if (window.location.pathname === "/about")
        setNavUnderlineKey("about");
      else if (window.location.pathname === "/demo") setNavUnderlineKey("demo");
      else if (window.location.pathname === "/quote")
        setNavUnderlineKey("quote");
      else setNavUnderlineKey(activeSection);
    }
  }, [activeSection]);

  useEffect(() => {
    if (isContactPage || isAboutPage || isDemoPage || isQuotePage) return;

    const handleScroll = () => {
      const sections = ["home", "services", "integrations", "about", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + height
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isContactPage, isAboutPage, isDemoPage, isQuotePage]);

  const handleNavClick = (href: string) => {
    let nextKey = "";
    if (href === "/contact") nextKey = "contact";
    else if (href === "/about") nextKey = "about";
    else if (href === "/demo") nextKey = "demo";
    else if (href === "/quote") nextKey = "quote";
    else nextKey = href.replace("#", "");

    setNavUnderlineKey(nextKey);

    if (href.startsWith("/")) {
      router.push(href);
      setIsOpen(false);
      return;
    }
    if (isContactPage || isAboutPage || isDemoPage || isQuotePage) {
      // Always go to home page for #home, otherwise go to main page and scroll
      if (href === "#home") {
        router.push("/");
      } else {
        router.push("/" + href);
      }
      setIsOpen(false);
      return;
    }
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Left aligned */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/shipItSmartMain.png"
                alt="ShipItSmart Logo"
                width={160}
                height={35}
                priority
                style={{ objectFit: "contain", height: 35 }}
              />
            </Link>
          </div>
          {/* Desktop Navigation - Right aligned */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => {
              const sectionId = item.href.replace("#", "");
              // Use navUnderlineKey for underline animation
              const isActive =
                (item.href === "/about" && navUnderlineKey === "about") ||
                (item.href === "/contact" && navUnderlineKey === "contact") ||
                (item.href === "/demo" && navUnderlineKey === "demo") ||
                (item.href === "/quote" && navUnderlineKey === "quote") ||
                (item.href !== "/about" &&
                  item.href !== "/contact" &&
                  item.href !== "/demo" &&
                  item.href !== "/quote" &&
                  navUnderlineKey === sectionId);

              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={`relative font-medium text-base px-2 py-2 transition-colors duration-200
                    ${
                      isActive
                        ? "text-[#1F447B]"
                        : "text-[#324A6D] hover:text-[#1F447B]"
                    }`}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  {item.name}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-0 right-0 -bottom-2 h-0.5 rounded-full"
                      style={{
                        background: COLORS.primary,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              );
            })}

            {/* Login Button */}
            <a
              href="https://connexx.co.uk"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                className="font-medium rounded-full px-8 py-2.5 text-base transition-colors duration-200 border-2"
                style={{
                  borderColor: COLORS.accent,
                  color: "#fff",
                  background: COLORS.accent,
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = COLORS.accent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = COLORS.accent;
                  e.currentTarget.style.color = "#fff";
                }}
              >
                Login
              </button>
            </a>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#324A6D] hover:text-[#1F447B] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#1F447B]"
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
        <div className="md:hidden px-4 pt-2 pb-3 bg-white border-t border-gray-100">
          {navItems.map((item) => {
            const sectionId = item.href.replace("#", "");
            const isActive = isContactPage
              ? item.href === "/contact"
              : isAboutPage
              ? item.href === "/about"
              : isDemoPage
              ? item.href === "/demo"
              : isQuotePage
              ? item.href === "/quote"
              : item.href === "/contact"
              ? false
              : activeSection === sectionId;
            return (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className={`block w-full text-left font-medium text-base px-2 py-2 rounded-md transition-colors duration-200
                  ${
                    isActive
                      ? "text-[#1F447B] bg-gray-50"
                      : "text-[#324A6D] hover:text-[#1F447B] hover:bg-gray-50"
                  }`}
              >
                {item.name}
              </button>
            );
          })}
          <a
            href="https://connexx.co.uk"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              className="w-full mt-2 font-medium rounded-full px-2 py-2 text-base transition-colors duration-200 border-2"
              style={{
                borderColor: COLORS.accent,
                color: "#fff",
                background: COLORS.accent,
              }}
            >
              Login
            </button>
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
