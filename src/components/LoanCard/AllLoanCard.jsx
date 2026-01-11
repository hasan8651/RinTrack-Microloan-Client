import { Link } from "react-router";
import { BiCategory } from "react-icons/bi";
import { TbCoin, TbPercentage } from "react-icons/tb";

const AllLoanCard = ({ loan }) => {
  const formattedMaxLimit =
    typeof loan.maxLoanLimit === "number"
      ? loan.maxLoanLimit.toLocaleString()
      : loan.maxLoanLimit;

  return (
    <div className="group relative flex flex-col bg-orange-100 dark:bg-neutral-900/90 rounded-2xl border border-blue-400/30 shadow-lg hover:shadow-2xl dark:hover:shadow-[0_0_20px_rgba(14,165,233,0.25)] overflow-hidden transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
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

      <div className="flex flex-col flex-1 px-4 pt-3 pb-4">
        <div className="flex items-center justify-between mt-2 mb-4 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
          <div className="flex flex-col items-start gap-1">
            <div className="flex items-center gap-1.5 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <BiCategory className="text-blue-600 dark:text-blue-400 text-sm" />
              <span className="font-semibold text-blue-700 dark:text-blue-300">
                {loan.category || "N/A"}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">
              Interest
            </span>
            <div className="flex items-center gap-1 text-red-600 dark:text-red-400">
              <span className="font-bold text-base">{loan.interestRate}%</span>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">
              Limit
            </span>
            <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
              <span className="font-bold text-base">${formattedMaxLimit}</span>
            </div>
          </div>
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
