import { Link } from "react-router";

const LoanCard = ({ loan }) => {
  const shortDesc =
    loan.description && loan.description.length > 100
      ? loan.description.slice(0, 100) + "..."
      : loan.description || "No description available.";

  const formattedMaxLimit =
    typeof loan.maxLoanLimit === "number"
      ? loan.maxLoanLimit.toLocaleString()
      : loan.maxLoanLimit;

  return (
    <div className="group relative flex flex-col bg-white dark:bg-neutral-900/90 rounded-2xl border border-gray-200 dark:border-blue-400/30 shadow-lg hover:shadow-2xl dark:hover:shadow-[0_0_20px_rgba(14,165,233,0.25)] overflow-hidden transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={loan.image}
          alt={loan.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Category badge */}
        {loan.category && (
          <span className="absolute top-3 left-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-black/60 text-white backdrop-blur-sm">
            {loan.category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 space-y-4">
        {/* Title */}
        <h2 className="text-xl font-extrabold text-gray-900 dark:text-blue-200 line-clamp-2">
          {loan.title}
        </h2>

        {/* Short description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {shortDesc}
        </p>

        {/* Max loan limit */}
      <div className="mt-2">
  <p className="text-sm text-gray-600 dark:text-gray-300">
    <span className="font-medium text-gray-700 dark:text-gray-200">
      Max Loan Limit:
    </span>{" "}
    <span className="font-bold text-green-600 dark:text-green-400">
      ${formattedMaxLimit}
    </span>
  </p>
</div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* View Details button */}
        <Link
          to={`/loans/${loan._id}`}
          className="mt-3 inline-flex items-center justify-center w-full py-2.5 px-4 
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

export default LoanCard;