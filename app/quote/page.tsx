"use client";

import { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  Info,
  Layers,
  Package as PackageIcon,
  Plus,
  X,
  Zap,
} from "lucide-react";
import {
  ChoiceCard,
  FormSection,
  JoinedSelect,
  OptionToggle,
  SegmentedControl,
  SelectField,
  addButtonClass,
  fieldClass,
  joinedFieldClass,
  joinedInputClass,
  labelClass,
  questionClass,
  removeButtonClass,
  submitButtonClass,
  unitCardClass,
} from "@/components/form-fields";

interface Package {
  id: string;
  quantity: string;
  packageType: string;
  weight: string;
  length: string;
  width: string;
  height: string;
}

const COUNTRY_OPTIONS = [
  { code: "GB", name: "United Kingdom" },
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "IT", name: "Italy" },
  { code: "ES", name: "Spain" },
  { code: "NL", name: "Netherlands" },
  { code: "BE", name: "Belgium" },
  { code: "CH", name: "Switzerland" },
  { code: "AT", name: "Austria" },
  { code: "IE", name: "Ireland" },
  { code: "DK", name: "Denmark" },
  { code: "SE", name: "Sweden" },
  { code: "NO", name: "Norway" },
  { code: "FI", name: "Finland" },
  { code: "PL", name: "Poland" },
  { code: "CZ", name: "Czech Republic" },
  { code: "HU", name: "Hungary" },
];

const PHONE_CODES = [
  { code: "+1", label: "US +1" },
  { code: "+44", label: "UK +44" },
  { code: "+61", label: "AU +61" },
  { code: "+49", label: "DE +49" },
  { code: "+33", label: "FR +33" },
  { code: "+39", label: "IT +39" },
  { code: "+34", label: "ES +34" },
];

const ADDRESS_SIDES = [
  { title: "From", country: "fromCountry", postcode: "fromPostcode" },
  { title: "To", country: "toCountry", postcode: "toPostcode" },
] as const;

const MEASUREMENT_OPTIONS = [
  { value: "metric", label: "Metric (kg/cm)" },
  { value: "imperial", label: "Imperial (lbs/in)" },
];

const benefitIconClass =
  "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 border-[#1F447B] bg-white";

export default function QuotePage() {
  const [formData, setFormData] = useState({
    contactName: "",
    contactEmail: "",
    contactPhoneCountryCode: "+1",
    contactPhoneNumber: "",
    fromPostcode: "",
    fromCountry: "US",
    toPostcode: "",
    toCountry: "US",
    residentialAddress: false,
    requestPickup: false,
    palletStackable: false,
    dangerousGoods: false,
    dangerousGoodsCategory: "",
    requiresInsurance: false,
    insuranceValue: "",
    insuranceCurrency: "USD",
    measurementUnit: "metric",
  });

  // Package shipment type: 'cartons' or 'pallets'
  const [packageShipmentType, setPackageShipmentType] =
    useState<string>("cartons");

  const [packages, setPackages] = useState<Package[]>([
    {
      id: "1",
      quantity: "1",
      packageType: "parcel",
      weight: "",
      length: "",
      width: "",
      height: "",
    },
  ]);

  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isBenefitsVisible, setIsBenefitsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reveal = (target: Element) => {
      if (target === headerRef.current) setIsHeaderVisible(true);
      if (target === formRef.current) setIsFormVisible(true);
      if (target === benefitsRef.current) setIsBenefitsVisible(true);
    };

    // Reveal anything already on screen at load so the page doesn't sit
    // invisible until the user scrolls (the form is much taller than the
    // viewport, so a percentage threshold never triggers on its own).
    const isInViewport = (el: Element) => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) reveal(entry.target);
        });
      },
      { threshold: 0.05 },
    );

    [headerRef, formRef, benefitsRef].forEach((ref) => {
      const el = ref.current;
      if (!el) return;
      if (isInViewport(el)) reveal(el);
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (packageShipmentType !== "pallets") {
      setFormData((prev) => ({ ...prev, palletStackable: false }));
    }
  }, [packageShipmentType]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const setMeasurementUnit = (measurementUnit: string) =>
    setFormData((prev) => ({ ...prev, measurementUnit }));

  const handlePackageChange = (
    packageId: string,
    field: keyof Package,
    value: string,
  ) => {
    setPackages((prev) =>
      prev.map((pkg) =>
        pkg.id === packageId ? { ...pkg, [field]: value } : pkg,
      ),
    );
  };

  const addPackage = () => {
    const newPackage: Package = {
      id: Date.now().toString(),
      quantity: "1",
      packageType: packageShipmentType === "pallets" ? "pallet" : "parcel",
      weight: "",
      length: "",
      width: "",
      height: "",
    };
    setPackages((prev) => [...prev, newPackage]);
  };

  const removePackage = (packageId: string) => {
    if (packages.length > 1) {
      setPackages((prev) => prev.filter((pkg) => pkg.id !== packageId));
    }
  };

  const selectCartons = () => {
    setPackageShipmentType("cartons");
    setPackages((prev) =>
      prev.map((pkg) => ({
        ...pkg,
        packageType: pkg.packageType === "pallet" ? "parcel" : pkg.packageType,
      })),
    );
  };

  const selectPallets = () => {
    setPackageShipmentType("pallets");
    setPackages((prev) =>
      prev.map((pkg) => ({
        ...pkg,
        packageType: "pallet",
      })),
    );
  };

  const itemLabel = packageShipmentType === "pallets" ? "Pallet" : "Package";
  const weightUnit = formData.measurementUnit === "metric" ? "kg" : "lbs";
  const lengthUnit = formData.measurementUnit === "metric" ? "cm" : "in";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create payload for quote request
    const payload = {
      contact: {
        name: formData.contactName,
        email: formData.contactEmail,
        phoneCountryCode: formData.contactPhoneCountryCode,
        phoneNumber: formData.contactPhoneNumber,
      },
      from: {
        country: formData.fromCountry,
        postcode: formData.fromPostcode,
      },
      to: {
        country: formData.toCountry,
        postcode: formData.toPostcode,
      },
      options: {
        residentialAddress: formData.residentialAddress,
        requestPickup: formData.requestPickup,
        palletStackable: formData.palletStackable,
        dangerousGoods: formData.dangerousGoods,
        dangerousGoodsCategory: formData.dangerousGoodsCategory,
        requiresInsurance: formData.requiresInsurance,
        insuranceValue: formData.insuranceValue,
        insuranceCurrency: formData.insuranceCurrency,
        measurementUnit: formData.measurementUnit,
      },
      packageShipmentType,
      packages,
    };

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/quote-submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payload,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to submit quote request: ${response.statusText}`,
        );
      }

      const result = await response.json();
      await fetch("/api/quote-notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          form_data: payload,
          booking_id: result?.data?.id,
          location: "Ship It Smart",
        }),
      }).catch((notifyError) => {
        console.error("Quote email notification failed:", notifyError);
      });

      console.log("Quote request submitted successfully:", result);
      alert("Quote request submitted successfully!");
    } catch (error) {
      console.error("Error submitting quote request:", error);
      alert("Failed to submit quote request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="pt-28 pb-16 md:pt-32 md:pb-20">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className={`mb-10 max-w-2xl transition-all duration-700 md:mb-14 ${
            isHeaderVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            <span className="text-[#1F447B]">Get Your</span>{" "}
            <span className="text-[#EB993C]">Shipping Quote</span>
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-[#324A6D]/70">
            Tell us what you&apos;re sending and where it&apos;s going, and
            we&apos;ll find you the best rate across our carrier network.
          </p>
        </div>

        {/* Quote Form. No panel behind it: the steps sit on the page
            background, split by navy rules like the contact page. */}
        <div
          ref={formRef}
          className={`transition-all duration-700 ${
            isFormVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <form onSubmit={handleSubmit} className="space-y-10 md:space-y-12">
            <FormSection
              step={1}
              title="Contact Details"
              description="Who should we send the quote to?"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contactName" className={labelClass}>
                    Name
                  </label>
                  <input
                    id="contactName"
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    placeholder="Primary contact name"
                    className={fieldClass}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="contactPhoneNumber" className={labelClass}>
                    Phone
                  </label>
                  <div className={joinedFieldClass}>
                    <JoinedSelect
                      name="contactPhoneCountryCode"
                      aria-label="Phone country code"
                      value={formData.contactPhoneCountryCode}
                      onChange={handleInputChange}
                      required
                    >
                      {PHONE_CODES.map((phone) => (
                        <option key={phone.code} value={phone.code}>
                          {phone.label}
                        </option>
                      ))}
                    </JoinedSelect>
                    <input
                      id="contactPhoneNumber"
                      type="tel"
                      name="contactPhoneNumber"
                      value={formData.contactPhoneNumber}
                      onChange={handleInputChange}
                      placeholder="555 123 4567"
                      className={joinedInputClass}
                      required
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="contactEmail" className={labelClass}>
                    Email
                  </label>
                  <input
                    id="contactEmail"
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    placeholder="contact@example.com"
                    className={`${fieldClass} sm:max-w-[calc(50%-0.625rem)]`}
                    required
                  />
                </div>
              </div>
            </FormSection>

            <FormSection
              step={2}
              title="Addresses"
              description="Where the shipment is collected from and delivered to."
            >
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-5">
                {ADDRESS_SIDES.map((side) => (
                  <div key={side.title} className="space-y-4">
                    <h3 className="text-base font-semibold text-[#1F447B]">
                      {side.title}
                    </h3>
                    <div>
                      <label htmlFor={side.country} className={labelClass}>
                        Country
                      </label>
                      <SelectField
                        id={side.country}
                        name={side.country}
                        value={formData[side.country]}
                        onChange={handleInputChange}
                        required
                      >
                        {COUNTRY_OPTIONS.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.name}
                          </option>
                        ))}
                      </SelectField>
                    </div>
                    <div>
                      <label htmlFor={side.postcode} className={labelClass}>
                        Postcode
                      </label>
                      <input
                        id={side.postcode}
                        type="text"
                        name={side.postcode}
                        value={formData[side.postcode]}
                        onChange={handleInputChange}
                        className={fieldClass}
                        required
                      />
                    </div>
                  </div>
                ))}
              </div>
            </FormSection>

            <FormSection
              step={3}
              title="Additional Options"
              description="Extra services and handling requirements for this shipment."
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <OptionToggle
                  name="residentialAddress"
                  checked={formData.residentialAddress}
                  onChange={handleInputChange}
                  title="Residential Address"
                  description="Delivery to a residential location"
                />
                <OptionToggle
                  name="requestPickup"
                  checked={formData.requestPickup}
                  onChange={handleInputChange}
                  title="Request Pickup"
                  description="Schedule a pickup from your location"
                />
                <OptionToggle
                  name="palletStackable"
                  checked={formData.palletStackable}
                  onChange={handleInputChange}
                  title="Pallet Stackable"
                  description="Pallets can be safely stacked"
                  note="Carrier reserves the right to charge a non stack fee if they deem the pallet to be non stackable."
                />
                <OptionToggle
                  name="dangerousGoods"
                  checked={formData.dangerousGoods}
                  onChange={handleInputChange}
                  title="Dangerous Goods"
                  description="Contains hazardous materials"
                />
                <OptionToggle
                  name="requiresInsurance"
                  checked={formData.requiresInsurance}
                  onChange={handleInputChange}
                  title="Requires Insurance"
                  description="Add insurance coverage"
                />
              </div>

              {/* Dangerous Goods Category Dropdown */}
              {formData.dangerousGoods && (
                <div>
                  <label htmlFor="dangerousGoodsCategory" className={labelClass}>
                    Dangerous Goods Category
                  </label>
                  <SelectField
                    id="dangerousGoodsCategory"
                    name="dangerousGoodsCategory"
                    value={formData.dangerousGoodsCategory}
                    onChange={handleInputChange}
                    required={formData.dangerousGoods}
                  >
                    <option value="">Select Category</option>
                    <option value="DGR">DGR | Dangerous Goods</option>
                    <option value="DRY_ICE">DRY_ICE | Dry Ice</option>
                    <option value="LITHIUM">LITHIUM | Lithium Battery</option>
                  </SelectField>
                  <p className="mt-2 flex items-start gap-1.5 text-xs text-[#324A6D]/80">
                    <Info
                      className="mt-px h-3.5 w-3.5 shrink-0 text-[#EB993C]"
                      aria-hidden
                    />
                    Further documentation will be required prior to completion
                    of shipment.
                  </p>
                </div>
              )}

              {/* Insurance Details */}
              {formData.requiresInsurance && (
                <div>
                  <h3 className={questionClass}>Insurance Details</h3>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="insuranceValue" className={labelClass}>
                        Insurance Value
                      </label>
                      <input
                        id="insuranceValue"
                        type="number"
                        name="insuranceValue"
                        value={formData.insuranceValue}
                        onChange={handleInputChange}
                        className={fieldClass}
                        step="0.01"
                        required={formData.requiresInsurance}
                      />
                    </div>
                    <div>
                      <label htmlFor="insuranceCurrency" className={labelClass}>
                        Currency
                      </label>
                      <SelectField
                        id="insuranceCurrency"
                        name="insuranceCurrency"
                        value={formData.insuranceCurrency}
                        onChange={handleInputChange}
                        required={formData.requiresInsurance}
                      >
                        <option value="GBP">GBP - British Pound</option>
                        <option value="USD">USD - US Dollar</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="CAD">CAD - Canadian Dollar</option>
                        <option value="AUD">AUD - Australian Dollar</option>
                        <option value="CHF">CHF - Swiss Franc</option>
                        <option value="JPY">JPY - Japanese Yen</option>
                      </SelectField>
                    </div>
                  </div>
                </div>
              )}
            </FormSection>

            <FormSection
              step={4}
              title={
                packageShipmentType === "pallets"
                  ? "Pallet Details"
                  : "Package Details"
              }
              description="Weights and dimensions for each package."
            >
              <div className="space-y-6">
                <div>
                  <h3 className={questionClass}>What are you shipping?</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <ChoiceCard
                      icon={PackageIcon}
                      title="Cartons / Packages"
                      description="Individual parcels, boxes, or envelopes"
                      selected={packageShipmentType === "cartons"}
                      onSelect={selectCartons}
                    />
                    <ChoiceCard
                      icon={Layers}
                      title="Pallets / Skids"
                      description="Palletized freight or skids"
                      selected={packageShipmentType === "pallets"}
                      onSelect={selectPallets}
                    />
                  </div>
                </div>
                <SegmentedControl
                  label="Units"
                  name="measurementUnit"
                  value={formData.measurementUnit}
                  options={MEASUREMENT_OPTIONS}
                  onChange={setMeasurementUnit}
                />
              </div>

              <div className="space-y-4">
                {packages.map((pkg, index) => (
                  <div key={pkg.id} className={unitCardClass}>
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <h4 className="text-base font-semibold text-[#1F447B]">
                        {itemLabel} {index + 1}
                      </h4>
                      {packages.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removePackage(pkg.id)}
                          className={removeButtonClass}
                        >
                          <X className="h-4 w-4" aria-hidden />
                          Remove
                        </button>
                      )}
                    </div>
                    <div
                      className={`grid grid-cols-2 items-end gap-4 md:grid-cols-3 ${
                        packageShipmentType === "cartons"
                          ? "xl:grid-cols-6"
                          : "xl:grid-cols-5"
                      }`}
                    >
                      <div>
                        <label
                          htmlFor={`package-${pkg.id}-quantity`}
                          className={labelClass}
                        >
                          Quantity
                        </label>
                        <input
                          id={`package-${pkg.id}-quantity`}
                          type="number"
                          value={pkg.quantity}
                          onChange={(e) =>
                            handlePackageChange(
                              pkg.id,
                              "quantity",
                              e.target.value,
                            )
                          }
                          className={fieldClass}
                          placeholder="1"
                          min="1"
                          required
                        />
                      </div>
                      {packageShipmentType === "cartons" && (
                        <div>
                          <label
                            htmlFor={`package-${pkg.id}-type`}
                            className={labelClass}
                          >
                            Type
                          </label>
                          <SelectField
                            id={`package-${pkg.id}-type`}
                            value={pkg.packageType}
                            onChange={(e) =>
                              handlePackageChange(
                                pkg.id,
                                "packageType",
                                e.target.value,
                              )
                            }
                          >
                            <option value="envelope">Envelope</option>
                            <option value="packet">Packet</option>
                            <option value="parcel">Parcel</option>
                          </SelectField>
                        </div>
                      )}
                      <div>
                        <label
                          htmlFor={`package-${pkg.id}-weight`}
                          className={labelClass}
                        >
                          Weight ({weightUnit})
                        </label>
                        <input
                          id={`package-${pkg.id}-weight`}
                          type="number"
                          value={pkg.weight}
                          onChange={(e) =>
                            handlePackageChange(pkg.id, "weight", e.target.value)
                          }
                          className={fieldClass}
                          step="0.1"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor={`package-${pkg.id}-length`}
                          className={labelClass}
                        >
                          Length ({lengthUnit})
                        </label>
                        <input
                          id={`package-${pkg.id}-length`}
                          type="number"
                          value={pkg.length}
                          onChange={(e) =>
                            handlePackageChange(pkg.id, "length", e.target.value)
                          }
                          className={fieldClass}
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor={`package-${pkg.id}-width`}
                          className={labelClass}
                        >
                          Width ({lengthUnit})
                        </label>
                        <input
                          id={`package-${pkg.id}-width`}
                          type="number"
                          value={pkg.width}
                          onChange={(e) =>
                            handlePackageChange(pkg.id, "width", e.target.value)
                          }
                          className={fieldClass}
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor={`package-${pkg.id}-height`}
                          className={labelClass}
                        >
                          Height ({lengthUnit})
                        </label>
                        <input
                          id={`package-${pkg.id}-height`}
                          type="number"
                          value={pkg.height}
                          onChange={(e) =>
                            handlePackageChange(pkg.id, "height", e.target.value)
                          }
                          className={fieldClass}
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addPackage}
                  className={addButtonClass}
                >
                  <Plus className="h-4 w-4" aria-hidden />
                  Add Another {itemLabel}
                </button>
              </div>
            </FormSection>

            {/* Submit Button */}
            <div className="flex border-t border-[#1F447B] pt-8 sm:justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={submitButtonClass}
              >
                {isSubmitting ? "Submitting..." : "Get Quote"}
                <ArrowRight className="h-5 w-5" aria-hidden />
              </button>
            </div>
          </form>
        </div>

        {/* Benefits */}
        <div
          ref={benefitsRef}
          className={`mt-16 grid grid-cols-1 gap-8 md:mt-20 md:grid-cols-3 transition-all duration-700 ${
            isBenefitsVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          <div className="flex gap-4">
            <span className={benefitIconClass}>
              <Zap
                className="h-6 w-6 text-[#EB993C]"
                fill="currentColor"
                strokeWidth={1.5}
                aria-hidden
              />
            </span>
            <div>
              <h3 className="text-lg font-semibold text-[#1F447B]">
                Instant Quotes
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[#324A6D]/80">
                View real-time pricing in seconds with our advanced quoting
                engine.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <span className={benefitIconClass}>
              <span className="text-2xl font-bold leading-none text-[#EB993C]">
                $
              </span>
            </span>
            <div>
              <h3 className="text-lg font-semibold text-[#1F447B]">
                Best Rates
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[#324A6D]/80">
                Compare prices from multiple carriers to find the most
                competitive shipping rates.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <span className={benefitIconClass}>
              <PackageIcon className="h-6 w-6 text-[#EB993C]" aria-hidden />
            </span>
            <div>
              <h3 className="text-lg font-semibold text-[#1F447B]">
                Multiple Carriers
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[#324A6D]/80">
                Choose from Royal Mail, DPD, UPS, FedEx, DHL and many more
                carriers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
