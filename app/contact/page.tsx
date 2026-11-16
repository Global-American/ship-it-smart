"use client";

import { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  Package,
  Phone,
  RotateCcw,
  Ship,
  Truck,
} from "lucide-react";
import Link from "next/link";
import SocialLinks from "@/components/social-links";
import { COUNTRIES, findCountry } from "@/lib/countries";
import {
  checkboxClass,
  fieldClass,
  labelClass,
  submitButtonClass,
} from "@/components/form-fields";

// Mirrors the footer's Global Locations list so the contact page links to
// the same facilities on the About page.
const locations = [
  { id: "new-york", city: "Englewood, NJ", country: "United States", countryCode: "US" },
  { id: "belfast", city: "Strabane, Northern Ireland", country: "United Kingdom", countryCode: "GB" },
  { id: "dublin", city: "Convoy, Donegal", country: "Ireland", countryCode: "IE" },
  { id: "manchester", city: "Heywood, Manchester", country: "United Kingdom", countryCode: "GB" },
];

const services = [
  { id: "usDomestic", name: "US Domestic", icon: <Ship className="h-4 w-4" /> },
  { id: "usExports", name: "US Exports", icon: <Truck className="h-4 w-4" /> },
  { id: "usImports", name: "US Imports", icon: <RotateCcw className="h-4 w-4" /> },
  { id: "ukFinalMile", name: "UK Final Mile", icon: <Package className="h-4 w-4" /> },
  { id: "ukExports", name: "UK Exports", icon: <Package className="h-4 w-4" /> },
  { id: "chinaExports", name: "China Exports", icon: <Package className="h-4 w-4" /> },
  { id: "other", name: "Other", icon: <Package className="h-4 w-4" /> },
];

export default function ContactPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    phoneCountry: "",
    country: "",
    company: "",
    message: "",
    selectedBrands: [] as string[],
  });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      // Low threshold: the section is much taller than a phone held sideways,
      // so a larger fraction might never be on screen at once
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Choosing a country also switches the phone prefix to that country.
  // Clearing the country clears the phone prefix as well.
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const country = e.target.value;
    setFormData((prev) => ({
      ...prev,
      country,
      phoneCountry: country,
    }));
  };

  const handleBrandSelection = (brandId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      selectedBrands: checked
        ? [...prev.selectedBrands, brandId]
        : prev.selectedBrands.filter((id) => id !== brandId),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const phoneCountry = findCountry(formData.phoneCountry);
      const country = findCountry(formData.country);
      const phoneNumber = formData.phone.trim();
      const payload = {
        ...formData,
        phone: phoneNumber
          ? `${phoneCountry?.dial ?? ""} ${phoneNumber}`.trim()
          : "",
        phoneCountryCode: phoneCountry?.dial ?? "",
        country: formData.country,
        countryName: country?.name ?? "",
      };

      const res = await fetch("/api/contact-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || "Failed to send message");
      }
      setFormData({
        name: "",
        email: "",
        phone: "",
        phoneCountry: "",
        country: "",
        company: "",
        message: "",
        selectedBrands: [],
      });
      alert("Message sent successfully.");
    } catch (err) {
      console.error(err);
      alert("There was an error sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fade = isVisible
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-4";

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="pt-28 pb-16 md:pt-32 md:pb-20"
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Intro and contact details on the left, the form card on the right.
            On phones it stacks intro → form → details so the form stays near the top. */}
        <div className="grid gap-10 lg:grid-cols-[5fr_7fr] lg:grid-rows-[auto_1fr] lg:gap-x-14 lg:gap-y-10">
          <div
            className={`lg:col-start-1 lg:row-start-1 transition-all duration-700 ${fade}`}
          >
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              <span className="text-[#1F447B]">Get in</span>{" "}
              <span className="text-[#EB993C]">Touch</span>
            </h1>
            <p className="mt-4 max-w-md text-lg font-semibold leading-relaxed text-[#324A6D]/70">
              We would like to hear from you!
            </p>
            <p className="mt-2 max-w-md text-base leading-relaxed text-[#324A6D]/70">
              Let us know how we can best serve you. Use the contact form to
              select the services of interest that best suit your shipping
              needs. It would be a pleasure to support you towards smarter
              shipping solutions.
            </p>
          </div>

          {/* Contact Form. On desktop it drops below the heading so its first
              labels line up with "We would like to hear from you!" */}
          <div
            className={`lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:pt-[4.875rem] transition-all duration-700 ${fade}`}
            style={{ transitionDelay: "100ms" }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Your details: name, company, email, country, phone */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Full Name <span className="text-[#E53935]">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className={fieldClass}
                  />
                </div>

                <div>
                  <label htmlFor="company" className={labelClass}>
                    Company Name
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Enter your company name"
                    className={fieldClass}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="email" className={labelClass}>
                    Email Address <span className="text-[#E53935]">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    className={fieldClass}
                  />
                </div>

                {/* Phone gets the wider share: its prefix picker takes room */}
                <div className="grid grid-cols-1 gap-5 sm:col-span-2 sm:grid-cols-[minmax(0,9fr)_minmax(0,11fr)]">
                  <div>
                    <label htmlFor="country" className={labelClass}>
                      Country
                    </label>
                    <div className="relative">
                      {formData.country && (
                        <span
                          aria-hidden
                          className="pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 items-center text-lg"
                        >
                          <span
                            className={`fi fi-${formData.country.toLowerCase()} rounded-sm`}
                          />
                        </span>
                      )}
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleCountryChange}
                        className={`h-12 w-full appearance-none rounded-md border-2 border-[#1F447B] bg-white pr-10 text-base text-[#324A6D] focus:border-[#EB993C] focus:outline-none ${
                          formData.country ? "pl-11" : "pl-4"
                        }`}
                      >
                        <option value="">Select your country</option>
                        {COUNTRIES.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1F447B]" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className={labelClass}>
                      Phone Number
                    </label>
                    <div className="flex h-12 overflow-hidden rounded-md border-2 border-[#1F447B] bg-white focus-within:border-[#EB993C]">
                      <div className="relative shrink-0 border-r-2 border-[#1F447B]">
                        {formData.phoneCountry && (
                          <span
                            aria-hidden
                            className="pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 items-center text-lg"
                          >
                            <span
                              className={`fi fi-${formData.phoneCountry.toLowerCase()} rounded-sm`}
                            />
                          </span>
                        )}
                        <select
                          id="phoneCountry"
                          name="phoneCountry"
                          aria-label="Phone country code"
                          value={formData.phoneCountry}
                          onChange={handleInputChange}
                          className={`h-full appearance-none bg-transparent pr-8 text-base text-[#324A6D] focus:outline-none ${
                            formData.phoneCountry ? "pl-11" : "pl-4"
                          }`}
                        >
                          <option value=""></option>
                          {COUNTRIES.map((c) => (
                            <option key={c.code} value={c.code}>
                              {c.code} {c.dial}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1F447B]" />
                      </div>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="555 123 4567"
                        className="min-w-0 flex-1 bg-white px-4 text-base text-[#324A6D] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Services of Interest */}
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold text-[#1F447B]">
                    Services of Interest{" "}
                    <span className="font-normal text-[#324A6D]/70">
                      (optional)
                    </span>
                  </p>
                  <p className="text-xs text-[#324A6D]/70">
                    Select the services you&apos;d like to learn more about
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className="group relative bg-white rounded-lg border-2 border-[#1F447B] p-2.5 hover:border-[#EB993C] hover:shadow-sm transition-all duration-200"
                    >
                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          id={service.id}
                          checked={formData.selectedBrands.includes(service.id)}
                          onChange={(e) =>
                            handleBrandSelection(service.id, e.target.checked)
                          }
                          className={checkboxClass}
                        />
                        <div className="flex-1 min-w-0">
                          <label
                            htmlFor={service.id}
                            className="cursor-pointer block"
                          >
                            <div className="flex items-center gap-2">
                              <div className="text-[#EB993C]">
                                {service.icon}
                              </div>
                              <span className="font-medium text-sm group-hover:text-[#EB993C] text-[#1F447B] transition-colors">
                                {service.name}
                              </span>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className={labelClass}>
                  Message <span className="text-[#E53935]">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your logistics needs, shipping volume, or any specific requirements..."
                  className="w-full resize-none rounded-md border-2 border-[#1F447B] bg-white px-4 py-2.5 text-base text-[#324A6D] placeholder:text-[#324A6D]/40 transition-colors focus:border-[#EB993C] focus:outline-none"
                />
              </div>

              <div className="flex sm:justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={submitButtonClass}
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block"></span>
                      Sending...
                    </>
                  ) : (
                    <>Send Message</>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Contact details, split by navy rules */}
          <div
            className={`lg:col-start-1 lg:row-start-2 transition-all duration-700 ${fade}`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="border-t border-[#1F447B] pt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#EB993C]">
                Call us
              </p>
              <a
                href="tel:+15512059492"
                className="mt-2 inline-flex items-center gap-2 text-xl font-semibold text-[#1F447B] transition-colors hover:text-[#EB993C]"
              >
                <Phone className="h-5 w-5 text-[#EB993C]" aria-hidden="true" />
                +1 551-205-9492
              </a>
            </div>

            <div className="mt-6 border-t border-[#1F447B] pt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#EB993C]">
                Follow us
              </p>
              <SocialLinks className="mt-3" />
            </div>

            <div className="mt-6 border-t border-[#1F447B] pt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#EB993C]">
                Our locations
              </p>
              <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                {locations.map((location) => (
                  <li key={location.id}>
                    <Link
                      href={`/about?location=${location.id}#warehouse-locations`}
                      className="group flex items-start gap-2.5"
                    >
                      <span
                        className={`fi fi-${location.countryCode.toLowerCase()} mt-1 shrink-0 rounded-sm shadow-sm`}
                        aria-hidden="true"
                      />
                      <span>
                        <span className="block text-sm font-semibold text-[#1F447B] transition-colors group-hover:text-[#EB993C]">
                          {location.city}
                        </span>
                        {!location.city.includes(location.country) && (
                          <span className="block text-xs text-[#324A6D]">
                            {location.country}
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
