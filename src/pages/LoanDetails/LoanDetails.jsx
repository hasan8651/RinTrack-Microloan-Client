import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import useRole from "../../hooks/useRole";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { Helmet } from "react-helmet-async";
import NotFound from "../NotFound/NotFound";

const LoanDetails = () => {
  const { id } = useParams();
  const [role, isRoleLoading] = useRole();
  const axiosSecure = useAxiosSecure();

  const {
    data: details,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["loan-details", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/loans/${id}`);
      return res.data;
    },
  });

  if (isLoading || isRoleLoading) return <LoadingSpinner />;

  if (isError || !details?._id) {
    return (
      <div className="bg-orange-100 dark:bg-neutral-900 flex items-center justify-center mt-6">
        <NotFound />
      </div>
    );
  }

  const docs = Array.isArray(details.requiredDocuments)
    ? details.requiredDocuments
    : (details.requiredDocuments || "")
        .split(",")
        .map((d) => d.trim())
        .filter(Boolean);

  const emiPlans = Array.isArray(details.emiPlans)
    ? details.emiPlans
    : (details.emiPlans || "")
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean);

  return (
    <div className="min-h-screen bg-orange-50 dark:bg-transparent transition-colors duration-300 p-4 md:p-8">
      <Helmet>
        <title>RinTrack | {details.title}</title>
      </Helmet>
      <div className="max-w-6xl mx-auto">
        <div className="bg-orange-100 dark:bg-neutral-900/95 border-blue-400/30 rounded-3xl shadow-xl overflow-hidden border">
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
                    Max Loan Limit
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
                    {details.createdAt
                      ? new Date(details.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            year: "numeric",
                          }
                        )
                      : "N/A"}
                  </p>
                </div>
              </div>
              <div className="mt-10">
                {role === "borrower" ? (
                  <Link
                    to={`/loan-form/${id}`}
                    className="inline-block bg-gradient-to-r from-blue-500 to-sky-600 hover:from-blue-600 hover:to-sky-700 text-white font-bold px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-lg cursor-pointer"
                  >
                    Apply Now
                  </Link>
                ) : (
                  <button
                    disabled
                    className="inline-block bg-red-300 dark:bg-neutral-700 text-gray-500 px-10 py-4 rounded-xl cursor-not-allowed font-medium"
                  >
                    Borrowers Only
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-6">
          <div className="p-6 bg-orange-100 dark:bg-neutral-900/95 border-blue-400/30 rounded-xl shadow-md border">
            <h2 className="font-bold text-2xl mb-4 border-b pb-2 text-gray-900 dark:text-white">
              Required Documents
            </h2>
            {docs.length ? (
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                {docs.map((doc, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No specific documents listed.
              </p>
            )}
          </div>

          <div className="bg-orange-100 dark:bg-neutral-900/95 border-blue-400/30 p-6 rounded-xl shadow-md border">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b pb-2">
              EMI Options
            </h2>
            <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
              Available EMI plans for this loan:
            </p>
            {emiPlans.length ? (
              <div className="flex flex-wrap gap-2">
                {emiPlans.map((plan, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-300  dark:bg-blue-500/10 dark:text-blue-300 border border-blue-100 dark:border-blue-500/30"
                  >
                    {plan}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No EMI plans specified.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanDetails;
