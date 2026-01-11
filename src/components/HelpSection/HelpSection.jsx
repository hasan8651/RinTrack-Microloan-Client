const HelpSection = () => {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* FAQ Section */}
        <div className="lg:col-span-2">
          <h2 className="text-3xl text-center font-bold mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            <div className="collapse collapse-arrow rounded-2xl border border-blue-400/30 shadow-lg dark:shadow-[0_0_10px_rgba(14,165,233,0.15)] backdrop-blur-xl hover:scale-[1.04] hover:shadow-2xl dark:hover:shadow-[0_0_15px_rgba(14,165,233,0.25)] transition-all duration-300 bg-orange-100 dark:bg-neutral-900/90">
              <input type="radio" name="faq" defaultChecked />
              <div className="collapse-title font-medium">
                What is RinTrack?
              </div>
              <div className="collapse-content">
                <p>
                  RinTrack is a microloan tracking system for managing loans and
                  repayments easily.
                </p>
              </div>
            </div>

            <div className="collapse collapse-arrow rounded-2xl border border-blue-400/30 shadow-lg dark:shadow-[0_0_10px_rgba(14,165,233,0.15)] backdrop-blur-xl hover:scale-[1.04] hover:shadow-2xl dark:hover:shadow-[0_0_15px_rgba(14,165,233,0.25)] transition-all duration-300 bg-orange-100 dark:bg-neutral-900/90">
              <input type="radio" name="faq" />
              <div className="collapse-title font-medium">
                Who can use RinTrack?
              </div>
              <div className="collapse-content">
                <p>
                  RinTrack is ideal for microfinance organizations, NGOs,
                  individual lenders, and anyone managing multiple loans.
                </p>
              </div>
            </div>

            <div className="collapse collapse-arrow rounded-2xl border border-blue-400/30 shadow-lg dark:shadow-[0_0_10px_rgba(14,165,233,0.15)] backdrop-blur-xl hover:scale-[1.04] hover:shadow-2xl dark:hover:shadow-[0_0_15px_rgba(14,165,233,0.25)] transition-all duration-300 bg-orange-100 dark:bg-neutral-900/90">
              <input type="radio" name="faq" />
              <div className="collapse-title font-medium">
                Is user data secure?
              </div>
              <div className="collapse-content">
                <p>
                  Yes. RinTrack uses secure authentication and protected routes
                  to ensure data safety.
                </p>
              </div>
            </div>

            <div className="collapse collapse-arrow rounded-2xl border border-blue-400/30 shadow-lg dark:shadow-[0_0_10px_rgba(14,165,233,0.15)] backdrop-blur-xl hover:scale-[1.04] hover:shadow-2xl dark:hover:shadow-[0_0_15px_rgba(14,165,233,0.25)] transition-all duration-300 bg-orange-100 dark:bg-neutral-900/90">
              <input type="radio" name="faq" />
              <div className="collapse-title font-medium">
                Can I track loan repayments?
              </div>
              <div className="collapse-content">
                <p>
                  Yes. Users can track repayments, remaining balances, and loan
                  status in real time.
                </p>
              </div>
            </div>

            <div className="collapse collapse-arrow rounded-2xl border border-blue-400/30 shadow-lg dark:shadow-[0_0_10px_rgba(14,165,233,0.15)] backdrop-blur-xl hover:scale-[1.04] hover:shadow-2xl dark:hover:shadow-[0_0_15px_rgba(14,165,233,0.25)] transition-all duration-300 bg-orange-100 dark:bg-neutral-900/90">
              <input type="radio" name="faq" />
              <div className="collapse-title font-medium">
                Does RinTrack work on mobile devices?
              </div>
              <div className="collapse-content">
                <p>
                  Yes. RinTrack is fully responsive and works on mobile, tablet,
                  and desktop devices.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="rounded-2xl border border-blue-400/30 shadow-lg dark:shadow-[0_0_10px_rgba(14,165,233,0.15)] backdrop-blur-xl hover:scale-[1.04] hover:shadow-2xl dark:hover:shadow-[0_0_15px_rgba(14,165,233,0.25)] transition-all duration-300 bg-orange-100 dark:bg-neutral-900/90 p-8 h-fit mt-14">
          <h3 className="text-2xl font-bold mb-4">Subscribe to Updates</h3>

          <p className="text-gray-900 dark:text-white mb-6">
            Get product updates and microloan management tips.
          </p>

          <input
            type="email"
            placeholder="Your email"
            className="input input-bordered w-full mb-4"
          />

          <button
            className="mt-1 inline-flex items-center justify-center w-full py-2.5 
                     rounded-xl bg-gradient-to-r from-blue-500 to-sky-600 
                     hover:from-blue-600 hover:to-sky-700 text-white dark:text-gray-900 
                     font-semibold text-sm shadow-md shadow-blue-500/30 
                     hover:shadow-lg transition-all duration-200 cursor-pointer"
          >
            Subscribe
          </button>

          <p className="text-xs mt-4 text-gray-900 dark:text-white">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HelpSection;
