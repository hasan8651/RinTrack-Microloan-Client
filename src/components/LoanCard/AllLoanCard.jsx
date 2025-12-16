import { Link } from "react-router";

const AllLoanCard = ({ loan }) => {
  const formattedMaxLimit =
    typeof loan.maxLoanLimit === "number"
      ? loan.maxLoanLimit.toLocaleString()
      : loan.maxLoanLimit;

  return (
    <div className="group relative flex flex-col bg-orange-100 dark:bg-neutral-900/90 rounded-2xl border border-blue-400/30 shadow-lg hover:shadow-2xl dark:hover:shadow-[0_0_20px_rgba(14,165,233,0.25)] overflow-hidden transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-64 overflow-hidden">
        <img
          src={loan.image}
          alt={loan.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 pt-8 pb-3">
          <h2 className="text-lg sm:text-xl font-extrabold text-white line-clamp-2">
            {loan.title}
          </h2>
        </div>
      </div>

      <div className="flex flex-col flex-1 px-4 pt-3 pb-4 space-y-3">
        <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-snug">
          <p>
            <span className="font-medium text-gray-700 dark:text-gray-200">
              Loan Category:
            </span>{" "}
            <span className="font-semibold">{loan.category || "N/A"}</span>
          </p>
          <p className="mt-1">
            <span className="font-medium text-gray-700 dark:text-gray-200">
              Interest:
            </span>{" "}
            <span className="font-semibold text-red-600 dark:text-red-400">
              {loan.interestRate}%
            </span>
            <span className="mx-2 text-gray-400">•</span>
            <span className="font-medium text-gray-700 dark:text-gray-200">
              Max Loan Limit:
            </span>{" "}
            <span className="font-bold text-green-600 dark:text-green-400">
              ${formattedMaxLimit}
            </span>
          </p>
        </div>

        <div className="flex-1" />
        <Link
          to={`/loans/${loan._id}`}
          className="mt-1 inline-flex items-center justify-center w-full py-2.5 
                     rounded-xl bg-gradient-to-r from-blue-500 to-sky-600 
                     hover:from-blue-600 hover:to-sky-700 text-white dark:text-gray-900 
                     font-semibold text-sm shadow-md shadow-blue-500/30 
                     hover:shadow-lg transition-all duration-200"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default AllLoanCard;
