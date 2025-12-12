import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router";
import useRole from "../../hooks/useRole";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const LoanDetails = () => {
  const { id } = useParams();
  const [role, isRoleLoading] = useRole();

  // Fetch loan details
  const { data: details = {}, isLoading } = useQuery({
    queryKey: ["loans", id],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/loans/${id}`);
      return result.data;
    },
  });

  if (isLoading || isRoleLoading) return <LoadingSpinner />;

  return (
    <section className="py-12 transition-colors">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-xl overflow-hidden border border-gray-200 dark:border-neutral-800">
          <div className="grid lg:grid-cols-5 gap-0">
            <div className="lg:col-span-2">
              <img
                src={details.image}
                alt={details.title}
                className="w-full h-80 sm:h-96 lg:h-full object-cover"
              />
            </div>

            <div className="lg:col-span-3 p-8 lg:p-12 flex flex-col justify-center">
              <div className="max-w-2xl">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                  {details.title}
                </h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {details.description}
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Category
                  </p>
                  <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                    {details.category}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Interest Rate
                  </p>
                  <p className="mt-1 text-xl font-bold text-red-600 dark:text-red-400">
                    {details.interestRate}%
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Max Limit
                  </p>
                  <p className="mt-1 text-xl font-bold text-green-600 dark:text-green-400">
                    ${details.maxLoanLimit?.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Since
                  </p>
                  <p className="mt-1 text-base font-medium text-gray-700 dark:text-gray-300">
                    {new Date(details.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* Apply Button */}
              <div className="mt-10">
                {role === "borrower" ? (
                  <Link
                    to={`/loan-form/${id}`}
                    className="inline-block bg-gradient-to-r from-blue-500 to-sky-600 
                         hover:from-blue-600 hover:to-sky-700 text-white font-bold 
                         px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 
                         transition-all duration-200 text-lg"
                  >
                    Apply Now
                  </Link>
                ) : (
                  <button
                    disabled
                    className="inline-block bg-gray-200 dark:bg-neutral-700 text-gray-500 
                         px-10 py-4 rounded-xl cursor-not-allowed font-medium"
                  >
                    Borrowers Only
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-12 container mx-auto">
          <div className="p-6 bg-white dark:bg-neutral-900/90 rounded-xl shadow-md border border-gray-200 dark:border-neutral-700">
            <h2 className="font-bold text-2xl mb-4 border-b pb-2 text-gray-900 dark:text-white">
              Required Documents 📄
            </h2>

            <ul className="space-y-3">
              {details.requiredDocuments}
            </ul>
          </div>

          <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-gray-200 dark:border-neutral-800">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              EMI Options
            </h2>
            <div className="p-6 bg-white dark:bg-neutral-900/90 rounded-xl shadow-md border border-gray-200 dark:border-neutral-700">
              <h2 className="font-bold text-2xl mb-4 border-b pb-2 text-gray-900 dark:text-white">
                Available EMI Plans 📅
              </h2>

              <div className="flex flex-wrap gap-3">
                {details.emiPlans}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoanDetails;
