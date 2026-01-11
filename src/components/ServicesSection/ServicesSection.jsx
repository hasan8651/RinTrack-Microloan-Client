import { FaUsers, FaMoneyCheckAlt, FaChartLine, FaShieldAlt } from "react-icons/fa";

const ServicesSection = () => {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
          Our Services
        </h2>
        <p className="text-base-content/70 mt-4 max-w-2xl mx-auto">
          RinTrack provides smart tools to manage microloans, borrowers,
          and repayments efficiently.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        <div className="card rounded-2xl border border-blue-400/30 shadow-lg dark:shadow-[0_0_10px_rgba(14,165,233,0.15)] backdrop-blur-xl hover:scale-[1.04] hover:shadow-2xl dark:hover:shadow-[0_0_15px_rgba(14,165,233,0.25)] transition-all duration-300 text-center bg-orange-100 dark:bg-neutral-900/90">
          <div className="card-body items-center text-center">
            <FaUsers className="text-4xl text-blue-500 mb-4" />
            <h3 className=" card-title text-xl font-semibold mb-4 text-gray-900 dark:text-blue-300">Borrower Management</h3>
            <p className="leading-relaxed italic text-gray-600 dark:text-blue-100/80">
              Easily add, update, and manage multiple borrowers
              from a single dashboard.
            </p>
          </div>
        </div>

       <div className="card rounded-2xl border border-blue-400/30 shadow-lg dark:shadow-[0_0_10px_rgba(14,165,233,0.15)] backdrop-blur-xl hover:scale-[1.04] hover:shadow-2xl dark:hover:shadow-[0_0_15px_rgba(14,165,233,0.25)] transition-all duration-300 text-center bg-orange-100 dark:bg-neutral-900/90">
          <div className="card-body items-center text-center">
            <FaMoneyCheckAlt className="text-4xl text-blue-500 mb-4" />
            <h3 className=" card-title text-xl font-semibold mb-4 text-gray-900 dark:text-blue-300">Loan Tracking</h3>
                   <p className="leading-relaxed italic text-gray-600 dark:text-blue-100/80">
              Track loan amounts, repayments, and remaining balances
              in real time.
            </p>
          </div>
        </div>

       <div className="card rounded-2xl border border-blue-400/30 shadow-lg dark:shadow-[0_0_10px_rgba(14,165,233,0.15)] backdrop-blur-xl hover:scale-[1.04] hover:shadow-2xl dark:hover:shadow-[0_0_15px_rgba(14,165,233,0.25)] transition-all duration-300 text-center bg-orange-100 dark:bg-neutral-900/90">
          <div className="card-body items-center text-center">
            <FaChartLine className="text-4xl text-blue-500 mb-4" />
            <h3 className=" card-title text-xl font-semibold mb-4 text-gray-900 dark:text-blue-300">Reports & Insights</h3>
                        <p className="leading-relaxed italic text-gray-600 dark:text-blue-100/80">
              View clear summaries and insights to make better
              financial decisions.
            </p>
          </div>
        </div>

       <div className="card rounded-2xl border border-blue-400/30 shadow-lg dark:shadow-[0_0_10px_rgba(14,165,233,0.15)] backdrop-blur-xl hover:scale-[1.04] hover:shadow-2xl dark:hover:shadow-[0_0_15px_rgba(14,165,233,0.25)] transition-all duration-300 text-center bg-orange-100 dark:bg-neutral-900/90">
          <div className="card-body items-center text-center">
            <FaShieldAlt className="text-4xl text-blue-500 mb-4" />
            <h3 className=" card-title text-xl font-semibold mb-4 text-gray-900 dark:text-blue-300">Secure Access</h3>
                       <p className="leading-relaxed italic text-gray-600 dark:text-blue-100/80">
              Protected routes and authentication ensure data
              security and privacy.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
