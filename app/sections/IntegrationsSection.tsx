export default function IntegrationsSection() {
  return (
    <section
      id="integrations"
      className="min-h-screen flex items-center bg-[#D4E2FF]"
    >
      <div className="flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 w-full">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-[#1F447B] mb-8">
            <span className="text-[#EB993C]">Integrations</span>
          </h2>
          <p className="text-lg text-[#324A6D] mb-4 max-w-3xl mx-auto">
            Seamlessly connect with your favorite platforms and tools.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "E-commerce Platforms",
              "CRM Systems",
              "Accounting Software",
              "Inventory Management",
            ].map((integration, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 bg-[#1F447B] rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <span className="text-white font-bold text-lg">
                    {integration.charAt(0)}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-[#1F447B] mb-2">
                  {integration}
                </h3>
                <p className="text-[#324A6D] text-sm">
                  Connect and streamline your workflow.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
