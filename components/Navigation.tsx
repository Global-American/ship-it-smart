"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "How It Works", href: "#services" },
  { name: "Services", href: "/services" },
  { name: "Integrations", href: "/integrations" },
  { name: "Quote", href: "/quote" },
  { name: "Demo", href: "/demo" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
];

const loginSolutions = [
  {
    name: "Connexx",
    title: "Label Generation Platform",
    href: "https://connexx.co.uk",
    enabled: true,
  },
  {
    name: "Global American LLC",
    title: "Providing you simple shipping solutions",
    href: "",
    enabled: false,
  },
  {
    name: "FreightItSmart",
    title: "Coming Soon",
    href: "",
    enabled: false,
  },
  {
    name: "ReturnItSmart",
    title: "Coming Soon",
    href: "",
    enabled: false,
  },
  {
    name: "FulfillItSmart",
    title: "Coming Soon",
    href: "",
    enabled: false,
  },
];

const COLORS = {
  primary: "#1F447B",
  secondary: "#D4E2FF",
  body: "#324A6D",
  accent: "#EB993C",
};

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
  const [isMobileLoginOpen, setIsMobileLoginOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [navUnderlineKey, setNavUnderlineKey] = useState("home");
  const router = useRouter();
  const pathname = usePathname();
  const loginDropdownRef = useRef<HTMLDivElement>(null);

  // Update navigation state based on current pathname
  useEffect(() => {
    if (pathname === "/contact") {
      setNavUnderlineKey("contact");
    } else if (pathname === "/about") {
      setNavUnderlineKey("about");
    } else if (pathname === "/demo") {
      setNavUnderlineKey("demo");
    } else if (pathname === "/quote") {
      setNavUnderlineKey("quote");
    } else if (pathname === "/integrations") {
      setNavUnderlineKey("integrations");
    } else {
      setNavUnderlineKey(activeSection);
    }
  }, [pathname, activeSection]);

  useEffect(() => {
    // Only handle scroll on home page
    if (pathname !== "/") return;

    const handleScroll = () => {
      const sections = ["home", "services", "about", "contact"];
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
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        loginDropdownRef.current &&
        !loginDropdownRef.current.contains(event.target as Node)
      ) {
        setIsLoginDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsLoginDropdownOpen(false);
    setIsMobileLoginOpen(false);
    setIsOpen(false);
  }, [pathname]);

  const handleNavClick = (href: string) => {
    if (href.startsWith("/")) {
      // For all page routes including integrations
      router.push(href);
      setIsOpen(false);
      return;
    }

    if (pathname !== "/") {
      // Navigate to home page with hash for sections
      router.push("/" + href);
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

  const handleLoginRedirect = (href: string) => {
    setIsLoginDropdownOpen(false);
    setIsMobileLoginOpen(false);
    setIsOpen(false);
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 fixed top-0 left-0 right-0 z-[60] w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Left aligned */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/shipItSmartMain.png"
                alt="ShipItSmart Logo"
                width={160}
                height={48}
                priority
              />
            </Link>
          </div>
          {/* Desktop Navigation - Right aligned */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const sectionId = item.href.replace("#", "");
              // Simplified active state logic
              const isActive = item.href.startsWith("/")
                ? pathname === item.href
                : pathname === "/" && navUnderlineKey === sectionId;

              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={`relative group font-medium text-base px-2 py-2 transition-colors duration-200
                    ${
                      isActive
                        ? "text-[#1F447B]"
                        : "text-[#324A6D] hover:text-[#EB993C]"
                    }`}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  {item.name}
                  {isActive && (
                    <motion.span
                      key={`underline-${item.name}`}
                      className="absolute left-0 right-0 -bottom-2 h-0.5 rounded-full"
                      style={{
                        background: COLORS.primary,
                      }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      exit={{ scaleX: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                        duration: 0.3,
                      }}
                    />
                  )}
                  {!isActive && (
                    <span
                      className="absolute left-0 right-0 -bottom-2 h-0.5 rounded-full bg-[#EB993C] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}

            <div ref={loginDropdownRef} className="relative">
              <button
                type="button"
                onClick={() => setIsLoginDropdownOpen((open) => !open)}
                className="bg-[#EB993C] hover:bg-[#EB993C]/90 text-white font-medium px-6 py-2 rounded-full border-2 border-[#1F447B] transition-all duration-200"
              >
                <span className="flex items-center gap-2">
                  Login
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isLoginDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </span>
              </button>

              <div
                className={`absolute right-0 top-full mt-2 w-72 z-50 transition-all duration-200 ${
                  isLoginDropdownOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible translate-y-1"
                }`}
              >
                <div className="bg-white shadow-lg border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-[#1F447B] mb-4">
                    Choose Your Platform
                  </h3>
                  {loginSolutions.map((solution) => (
                    <button
                      key={solution.name}
                      type="button"
                      onClick={() => {
                        if (solution.enabled) {
                          handleLoginRedirect(solution.href);
                        }
                      }}
                      className={`mt-2 flex w-full items-center justify-between rounded-md p-3 text-left transition-all duration-200 ${
                        solution.enabled
                          ? "hover:bg-gray-50 cursor-pointer border border-accent/20"
                          : "opacity-40 blur-[1px] cursor-not-allowed"
                      }`}
                    >
                      <div>
                        <p
                          className={`text-sm font-bold ${
                            solution.enabled
                              ? "text-[#1F447B]"
                              : "text-muted-foreground"
                          }`}
                        >
                          {solution.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {solution.title}
                        </p>
                      </div>
                      <span
                        className={`text-xs px-3 py-1 ml-3 ${
                          solution.enabled
                            ? "bg-accent hover:bg-accent/90 text-accent-foreground rounded-md"
                            : "text-muted-foreground"
                        }`}
                      >
                        {solution.enabled ? "Login" : "Coming Soon"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
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
            // Simplified active state logic for mobile
            const isActive = item.href.startsWith("/")
              ? pathname === item.href
              : pathname === "/" && navUnderlineKey === sectionId;

            return (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className={`block w-full text-left font-medium text-base px-2 py-2 rounded-md transition-colors duration-200
                  ${
                    isActive
                      ? "text-[#1F447B] bg-gray-50"
                      : "text-[#324A6D] hover:text-[#EB993C] hover:bg-gray-50"
                  }`}
              >
                {item.name}
              </button>
            );
          })}
          <div className="mt-2 space-y-3">
            <button
              type="button"
              onClick={() => setIsMobileLoginOpen((open) => !open)}
              className="w-full bg-[#EB993C] hover:bg-[#EB993C]/90 text-white font-medium py-3 rounded-full border-2 border-[#1F447B] transition-all duration-200 flex items-center justify-center gap-2"
            >
              Login
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  isMobileLoginOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isMobileLoginOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="space-y-3 pt-2">
                <div className="space-y-3 pt-2">
                  {loginSolutions.map((solution) => (
                    <button
                      key={solution.name}
                      type="button"
                      className={`flex w-full items-center justify-between p-3 rounded-md transition-all duration-200 ${
                        solution.enabled
                          ? "bg-gray-50 cursor-pointer border border-accent/20"
                          : "opacity-40 blur-[1px] cursor-not-allowed"
                      }`}
                      onClick={() => {
                        if (solution.enabled) {
                          handleLoginRedirect(solution.href);
                        }
                      }}
                    >
                      <div className="flex-1">
                        <h5
                          className={`text-base font-bold ${
                            solution.enabled
                              ? "text-[#1F447B]"
                              : "text-muted-foreground"
                          }`}
                        >
                          {solution.name}
                        </h5>
                        <p className="text-sm text-muted-foreground">
                          {solution.title}
                        </p>
                      </div>
                      <div
                        className={`text-xs px-3 py-1 rounded ml-3 ${
                          solution.enabled
                            ? "bg-accent text-accent-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {solution.enabled ? "Login" : "Coming Soon"}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
