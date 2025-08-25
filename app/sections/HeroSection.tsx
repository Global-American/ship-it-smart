"use client";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="min-h-[85vh] flex items-center relative overflow-hidden pt-24 mt-16"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1F447B] via-[#324A6D] to-[#EB993C] -z-20"></div>

      {/* Dotted World Map Background */}
      <div className="absolute inset-0 opacity-20 -z-10">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1200 800"
          className="w-full h-full"
        >
          <defs>
            <pattern
              id="dots"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="10" cy="10" r="1" fill="white" />
            </pattern>
          </defs>
          {/* Simplified world map outline made of dots */}
          <path
            d="M200,300 Q400,250 600,300 Q800,350 1000,300 Q1100,400 1000,500 Q800,450 600,500 Q400,550 200,500 Q100,400 200,300"
            fill="url(#dots)"
            stroke="none"
          />
          <path
            d="M150,200 Q350,150 550,200 Q750,250 950,200 Q1050,300 950,400 Q750,350 550,400 Q350,450 150,400 Q50,300 150,200"
            fill="url(#dots)"
            stroke="none"
          />
        </svg>
      </div>

      <div className="max-w-none mx-auto px-4 sm:px-8 lg:px-16 w-[90%] relative z-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          {/* Left Content */}
          <div className="text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-3">
              Smart shipping,
              <br />
              <span className="text-[#D4E2FF]">smarter savings</span>
            </h1>
            <p className="text-lg text-[#D4E2FF] mb-5 leading-relaxed max-w-2xl">
              Unlock exclusive shipping discounts with FedEx, DHL, and UPS. Our
              intelligent platform delivers rate-based import and export
              services with lightning-fast express and cost-effective economy
              options for businesses worldwide.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <button
                onClick={() => window.location.assign("/contact")}
                className="bg-white text-[#1F447B] font-semibold px-8 py-4 rounded-full text-lg hover:bg-[#EB993C] hover:text-white transition-colors duration-200 shadow-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:ring-offset-2"
                style={{ transition: "background 0.2s, color 0.2s" }}
              >
                Speak to an expert
              </button>
              <button
                onClick={() => window.location.assign("/demo")}
                className="bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-full text-lg hover:bg-white hover:text-[#1F447B] transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                style={{ transition: "background 0.2s, color 0.2s" }}
              >
                Experience our demo
              </button>
              <button
                onClick={() => window.location.assign("/quote")}
                className="bg-[#EB993C] text-white font-semibold px-8 py-4 rounded-full text-lg hover:bg-[#d4822a] transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#EB993C] focus:ring-offset-2"
                style={{ transition: "background 0.2s, color 0.2s" }}
              >
                Get a quote
              </button>
            </div>

            <div>
              <p className="text-[#D4E2FF] mb-2">
                Trusted by <span className="font-bold text-white">10,000+</span>{" "}
                businesses worldwide
              </p>
            </div>
          </div>

          {/* Right Content - Image Gallery with Varied Sizes */}
          <div className="relative flex items-center justify-start pl-8">
            <div className="grid grid-cols-4 grid-rows-4 gap-8 w-full max-w-lg h-80">
              {/* Medium box - top left (moved one column right) */}
              <div
                className="col-span-1 row-span-1 col-start-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 flex items-center justify-center animate-scale-pulse"
                style={{
                  animation: "scalePulseBox 2.5s ease-in-out infinite",
                  animationDelay: "0.5s",
                }}
              >
                <div className="w-full h-full bg-gradient-to-br from-white/20 to-white/5 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white/60"
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
              </div>

              {/* Small box - top right (moved one column right) */}
              <div
                className="col-span-2 row-span-2 col-start-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-2 flex items-center justify-center animate-scale-pulse"
                style={{
                  animation: "scalePulseBox 2.5s ease-in-out infinite",
                  animationDelay: "1s",
                }}
              >
                <div className="w-full h-full bg-gradient-to-br from-white/20 to-white/5 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white/60"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Small box - bottom left */}
              <div
                className="col-span-2 row-span-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-2 flex items-center justify-center animate-scale-pulse"
                style={{
                  animation: "scalePulseBox 2.5s ease-in-out infinite",
                  animationDelay: "1.5s",
                }}
              >
                <div className="w-full h-full bg-gradient-to-br from-white/20 to-white/5 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white/60"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
              </div>

              {/* Medium box - bottom right */}
              <div
                className="col-span-1 row-span-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 flex items-center justify-center animate-scale-pulse"
                style={{
                  animation: "scalePulseBox 2.5s ease-in-out infinite",
                  animationDelay: "2s",
                }}
              >
                <div className="w-full h-full bg-gradient-to-br from-white/20 to-white/5 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white/60"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Floating accent elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#EB993C] rounded-full animate-float"></div>
            <div
              className="absolute -bottom-6 -left-6 w-6 h-6 bg-white/30 rounded-full animate-float"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute top-1/2 -right-8 w-4 h-4 bg-[#D4E2FF] rounded-full animate-float"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="absolute bottom-8 right-8 w-3 h-3 bg-[#EB993C]/50 rounded-full animate-float"
              style={{ animationDelay: "2.5s" }}
            ></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scalePulseBox {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.07);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
