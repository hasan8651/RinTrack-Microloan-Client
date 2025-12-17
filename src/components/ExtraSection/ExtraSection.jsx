const ExtraSections = () => {
  return (
    <div className="space-y-24 transition-colors duration-300">
      {/* Our Mission */}
      <section className="text-center text-base-content pt-10">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-gray-900 dark:text-white">
            Our Mission
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Empower Borrowers",
                desc: "We aim to make microloans easily accessible for individuals and small businesses.",
              },
              {
                title: "Transparent Process",
                desc: "We build trust with a clear, honest, zero-hidden-charge loan system.",
              },
              {
                title: "Faster Loan Approval",
                desc: "Experience seamless loan request, verification & approval.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="relative p-8 rounded-2xl border border-blue-400/30 shadow-lg dark:shadow-[0_0_10px_rgba(59,130,246,0.15)] backdrop-blur-xl hover:scale-[1.04] hover:shadow-2xl dark:hover:shadow-[0_0_15px_rgba(59,130,246,0.25)] transition-all duration-300 bg-orange-100 dark:bg-neutral-900/90"
              >
                <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-blue-300">
                  {item.title}
                </h3>
                <p className="leading-relaxed italic text-gray-600 dark:text-blue-100/80">
                  {item.desc}
                </p>
                <div className="absolute bottom-4 right-4 w-3 h-3 bg-blue-400 dark:bg-blue-400 rounded-full shadow-md" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="text-base-content pb-10">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Why Choose Us
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Fast Approval",
                desc: "Get approved within 24 hours with efficient verification.",
              },
              {
                title: "Transparent Process",
                desc: "No hidden fees. No confusion. Just clarity.",
              },
              {
                title: "Customer Support",
                desc: "We're available 24/7 to assist you anytime.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="relative p-8 rounded-2xl border border-blue-400/30 shadow-lg dark:shadow-[0_0_10px_rgba(14,165,233,0.15)] backdrop-blur-xl hover:scale-[1.04] hover:shadow-2xl dark:hover:shadow-[0_0_15px_rgba(14,165,233,0.25)] transition-all duration-300 text-center bg-orange-100 dark:bg-neutral-900/90"
              >
                <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-blue-300">
                  {item.title}
                </h3>
                <p className="leading-relaxed italic text-gray-600 dark:text-blue-100/80">
                  {item.desc}
                </p>
                <div className="absolute bottom-4 right-4 w-3 h-3 bg-blue-300 dark:bg-blue-400 rounded-full shadow-md"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExtraSections;
