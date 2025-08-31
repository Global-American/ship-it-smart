import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1">
            <div className="mb-4">
              <Image
                src="/shipItSmartMain.png"
                alt="ShipItSmart Logo"
                width={120}
                height={30}
                style={{ objectFit: "contain", height: 30 }}
              />
            </div>
            <p className="text-[#324A6D] text-sm leading-relaxed mb-6">
              We offer exclusive discounts with FedEx, DHL, and UPS for U.S. and
              international shipping. Our platform provides rate-based import
              and export services with express and economy options.
            </p>
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-[#EB993C] hover:text-[#d97706] transition-colors"
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

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-[#1F447B] font-semibold text-lg mb-4">
              Quick <span className="text-[#EB993C]">Links</span>
            </h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/"
                  className="text-[#324A6D] hover:text-[#1F447B] transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="text-[#324A6D] hover:text-[#1F447B] transition-colors text-sm"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/#integrations"
                  className="text-[#324A6D] hover:text-[#1F447B] transition-colors text-sm"
                >
                  Integrations
                </Link>
              </li>
              <li>
                <Link
                  href="/quote"
                  className="text-[#324A6D] hover:text-[#1F447B] transition-colors text-sm"
                >
                  Quote
                </Link>
              </li>
              <li>
                <Link
                  href="/demo"
                  className="text-[#324A6D] hover:text-[#1F447B] transition-colors text-sm"
                >
                  Demo
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-[#324A6D] hover:text-[#1F447B] transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-[#324A6D] hover:text-[#1F447B] transition-colors text-sm"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Get In Touch */}
          <div className="col-span-1">
            <h3 className="text-[#1F447B] font-semibold text-lg mb-4">
              Get In <span className="text-[#EB993C]">Touch</span>
            </h3>
            <div className="space-y-3">
              <p className="text-[#324A6D] text-sm">Phone: +1 551-205-9492</p>
            </div>
          </div>

          {/* Map */}
          <div className="col-span-1">
            <div className="w-full h-full  rounded-lg overflow-hidden flex items-center justify-center">
              {/* <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3048.4!2d-74.0!3d40.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzAwLjAiTiA3NMKwMDAnMDAuMCJX!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Birch Industrial Estate Location"
              ></iframe> */}
              <Image
                src="/shipItSmartIcon.png"
                alt="ShipItSmart Icon"
                width={200}
                height={200}
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
