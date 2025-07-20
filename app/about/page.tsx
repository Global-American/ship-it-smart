"use client";

export default function AboutPage() {
  return (
    <section id="about" className="min-h-screen flex items-center bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-4xl font-bold text-[#1F447B] mb-6">
              About <span className="text-[#EB993C]">Us</span>
            </h2>
            <p className="text-lg text-[#324A6D] mb-6">
              Ship It Smart is revolutionizing the shipping industry by
              providing intelligent, cost-effective solutions for businesses of
              all sizes. Our platform leverages cutting-edge technology to offer
              exclusive discounts and streamlined logistics.
            </p>
            <p className="text-lg text-[#324A6D] mb-6">
              With partnerships with major carriers like FedEx, DHL, and UPS, we
              ensure your packages reach their destination safely, quickly, and
              affordably.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#EB993C]">10K+</div>
                <div className="text-[#324A6D]">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#EB993C]">50+</div>
                <div className="text-[#324A6D]">Countries Served</div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-full max-w-md h-96 bg-[#D4E2FF] rounded-lg flex items-center justify-center">
              <span className="text-[#1F447B] text-lg">About Us Image</span>
            </div>
          </div>
        </div>

        {/* Our Team Section */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-[#1F447B] mb-4">
            Our <span className="text-[#EB993C]">Team</span>
          </h2>
          <p className="text-lg text-[#324A6D] mb-12 max-w-4xl mx-auto">
            A short introduction to your team members and why their background
            should inspire potential clients' confidence.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Avi Mechlowitz */}
            <div className="text-center">
              <div className="w-64 h-64 bg-gray-200 rounded-lg mb-6 mx-auto flex items-center justify-center transition-transform duration-300 hover:scale-105 cursor-pointer">
                <svg
                  className="w-20 h-20 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L12 2L3 7V9H21ZM12 17.5C9.5 17.5 7.59 16.04 6.9 14H17.1C16.41 16.04 14.5 17.5 12 17.5ZM12 7.5C14 7.5 15.5 9 15.5 11H8.5C8.5 9 10 7.5 12 7.5Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#1F447B] mb-2">
                Avi Mechlowitz
              </h3>
              <p className="text-[#324A6D]">Founder</p>
            </div>

            {/* Andy Ebert */}
            <div className="text-center">
              <div className="w-64 h-64 bg-gray-200 rounded-lg mb-6 mx-auto flex items-center justify-center transition-transform duration-300 hover:scale-105 cursor-pointer">
                <svg
                  className="w-20 h-20 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L12 2L3 7V9H21ZM12 17.5C9.5 17.5 7.59 16.04 6.9 14H17.1C16.41 16.04 14.5 17.5 12 17.5ZM12 7.5C14 7.5 15.5 9 15.5 11H8.5C8.5 9 10 7.5 12 7.5Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#1F447B] mb-2">
                Andy Ebert
              </h3>
              <p className="text-[#324A6D]">Managing Director</p>
            </div>

            {/* Michael Gastwirth */}
            <div className="text-center">
              <div className="w-64 h-64 bg-gray-200 rounded-lg mb-6 mx-auto flex items-center justify-center transition-transform duration-300 hover:scale-105 cursor-pointer">
                <svg
                  className="w-20 h-20 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L12 2L3 7V9H21ZM12 17.5C9.5 17.5 7.59 16.04 6.9 14H17.1C16.41 16.04 14.5 17.5 12 17.5ZM12 7.5C14 7.5 15.5 9 15.5 11H8.5C8.5 9 10 7.5 12 7.5Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#1F447B] mb-2">
                Michael Gastwirth
              </h3>
              <p className="text-[#324A6D]">Sales & Operations Director</p>
            </div>

            {/* Jake Geller */}
            <div className="text-center">
              <div className="w-64 h-64 bg-gray-200 rounded-lg mb-6 mx-auto flex items-center justify-center transition-transform duration-300 hover:scale-105 cursor-pointer">
                <svg
                  className="w-20 h-20 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L12 2L3 7V9H21ZM12 17.5C9.5 17.5 7.59 16.04 6.9 14H17.1C16.41 16.04 14.5 17.5 12 17.5ZM12 7.5C14 7.5 15.5 9 15.5 11H8.5C8.5 9 10 7.5 12 7.5Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#1F447B] mb-2">
                Jake Geller
              </h3>
              <p className="text-[#324A6D]">Onboarding & I.T Support Manager</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
