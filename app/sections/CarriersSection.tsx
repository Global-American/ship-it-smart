export default function CarriersSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#1F447B] mb-4">
            Our Trusted <span className="text-[#EB993C]">Carriers</span>
          </h2>
          <p className="text-lg text-[#324A6D] max-w-3xl mx-auto">
            Partner with industry-leading carriers for reliable, fast, and
            cost-effective shipping solutions worldwide.
          </p>
        </div>

        <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 flex transition-all duration-700 ease-in-out">
            {/* UPS Side */}
            <div className="bg-gradient-to-br from-[#8B4513] to-[#D4AF37] flex-1 flex items-center justify-center relative overflow-hidden hover:flex-[2] group transition-all duration-700 ease-in-out cursor-pointer">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10 text-center text-white p-8 flex flex-col items-center justify-center h-full w-full">
                <div className="group-hover:opacity-0 transition-opacity duration-500">
                  <div className="w-40 h-40 bg-white/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm transition-all duration-500">
                    <svg
                      className="w-24 h-24 text-white transition-all duration-500 mx-auto"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2L2 7L12 12L22 7L12 2ZM2 17L12 22L22 17M2 12L12 17L22 12" />
                    </svg>
                  </div>
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 p-4 md:p-8">
                  <h3 className="text-3xl font-bold mb-4">UPS</h3>
                  <p className="text-lg mb-4 leading-relaxed max-w-full">
                    Reliable ground and air shipping services with comprehensive
                    tracking and delivery options for businesses of all sizes.
                  </p>
                  <ul className="text-left space-y-2 w-full max-w-lg">
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-3 text-[#D4AF37]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Ground & Air Services
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-3 text-[#D4AF37]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      International Shipping
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-3 text-[#D4AF37]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Real-time Tracking
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* FedEx Side */}
            <div className="bg-gradient-to-br from-[#4B0082] to-[#FF6600] flex-1 flex items-center justify-center relative overflow-hidden hover:flex-[2] group transition-all duration-700 ease-in-out cursor-pointer">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10 text-center text-white p-8 flex flex-col items-center justify-center h-full w-full">
                <div className="group-hover:opacity-0 transition-opacity duration-500">
                  <div className="w-40 h-40 bg-white/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm transition-all duration-500">
                    <svg
                      className="w-24 h-24 text-white transition-all duration-500 mx-auto"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 8L12 13L4 8V6L12 11L20 6V8ZM20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4Z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 p-4 md:p-8">
                  <h3 className="text-3xl font-bold mb-4">FedEx</h3>
                  <p className="text-lg mb-4 leading-relaxed max-w-md mx-auto">
                    Express delivery solutions with guaranteed delivery times
                    and exceptional customer service for time-sensitive
                    shipments.
                  </p>
                  <ul className="text-left space-y-2 w-full max-w-lg mx-auto">
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-3 text-[#FF6600]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Express Delivery
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-3 text-[#FF6600]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Same-Day Options
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-3 text-[#FF6600]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Global Network
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
