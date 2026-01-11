import { FaUsers, FaHandHoldingUsd, FaCheckCircle, FaChartLine } from "react-icons/fa";

const StatisticsSection = () => {
  return (
    <section className="text-base-content pb-10">
      <div className="container mx-auto px-4">

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            RinTrack in Numbers
          </h2>
          <p className="text-base-content/70 mt-4 max-w-2xl mx-auto">
            A quick overview of how RinTrack helps manage microloans
            effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="card rounded-2xl border border-blue-400/30 shadow-lg dark:shadow-[0_0_10px_rgba(14,165,233,0.15)] backdrop-blur-xl hover:scale-[1.04] hover:shadow-2xl dark:hover:shadow-[0_0_15px_rgba(14,165,233,0.25)] transition-all duration-300 text-center bg-orange-100 dark:bg-neutral-900/90">
            <div className="card-body items-center text-center">
              <FaUsers className="text-4xl text-blue-500 mb-3" />
              <h3 className="text-3xl font-bold text-gray-900 dark:text-blue-300">1,200+</h3>
              <p className="leading-relaxed italic text-gray-600 dark:text-blue-100/80">
                Active Borrowers
              </p>
            </div>
          </div>

          <div className="card rounded-2xl border border-blue-400/30 shadow-lg dark:shadow-[0_0_10px_rgba(14,165,233,0.15)] backdrop-blur-xl hover:scale-[1.04] hover:shadow-2xl dark:hover:shadow-[0_0_15px_rgba(14,165,233,0.25)] transition-all duration-300 text-center bg-orange-100 dark:bg-neutral-900/90">
            <div className="card-body items-center text-center">
              <FaHandHoldingUsd className="text-4xl text-blue-500 mb-3" />
              <h3 className="text-3xl font-bold text-gray-900 dark:text-blue-300">$250K+</h3>
              <p className="leading-relaxed italic text-gray-600 dark:text-blue-100/80">
                Loans Managed
              </p>
            </div>
          </div>

          <div className="card rounded-2xl border border-blue-400/30 shadow-lg dark:shadow-[0_0_10px_rgba(14,165,233,0.15)] backdrop-blur-xl hover:scale-[1.04] hover:shadow-2xl dark:hover:shadow-[0_0_15px_rgba(14,165,233,0.25)] transition-all duration-300 text-center bg-orange-100 dark:bg-neutral-900/90">
            <div className="card-body items-center text-center">
              <FaCheckCircle className="text-4xl text-blue-500 mb-3" />
              <h3 className="text-3xl font-bold text-gray-900 dark:text-blue-300">98%</h3>
              <p className="leading-relaxed italic text-gray-600 dark:text-blue-100/80">
                Successful Repayments
              </p>
            </div>
          </div>

         <div className="card rounded-2xl border border-blue-400/30 shadow-lg dark:shadow-[0_0_10px_rgba(14,165,233,0.15)] backdrop-blur-xl hover:scale-[1.04] hover:shadow-2xl dark:hover:shadow-[0_0_15px_rgba(14,165,233,0.25)] transition-all duration-300 text-center bg-orange-100 dark:bg-neutral-900/90">
            <div className="card-body items-center text-center">
              <FaChartLine className="text-4xl text-blue-500 mb-3" />
              <h3 className="text-3xl font-bold text-gray-900 dark:text-blue-300">24/7</h3>
              <p className="leading-relaxed italic text-gray-600 dark:text-blue-100/80">
                System Availability
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default StatisticsSection;
