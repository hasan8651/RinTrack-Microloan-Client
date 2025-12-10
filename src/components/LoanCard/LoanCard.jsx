import { Link } from "react-router";

const LoanCard = ({ loan }) => {
  return (
    <div className="card relative bg-white dark:bg-neutral-900/90  border border-gray-200 dark:border-blue-400/30 shadow-xl dark:shadow-[0_0_15px_rgba(251,191,36,0.1)] hover:scale-[1.02] hover:shadow-2xl dark:hover:shadow-[0_0_20px_rgba(251,191,36,0.25)] transition-all duration-300 rounded-2xl overflow-hidden">
      <figure className="h-52 overflow-hidden">
        <img
          src={loan.image}
          alt={loan.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
        />
      </figure>

      <div className="card-body p-6 flex flex-col justify-between">
        <div>
          <h2 className="card-title text-2xl font-extrabold mb-2 text-gray-900 dark:text-blue-300">
            {loan.title}
          </h2>
          <p className="mb-1 text-gray-600 dark:text-gray-400">
            Category: <span className="font-medium dark:text-gray-300">{loan.category}</span>
          </p>
          <p className="mb-1 text-gray-600 dark:text-gray-400">
            Interest:{" "}
            <span className="font-semibold text-red-600 dark:text-red-400">{loan.interestRate}%</span>
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Max Loan Limit:{" "}
            <span className="font-semibold text-green-600 dark:text-green-400">${loan.maxLoanLimit}</span>
          </p>
        </div>

        <Link
          to={`/loans/${loan._id}`}
          className="mt-6 py-3 px-4 text-center bg-gradient-to-r from-blue-400 to-sky-500 text-white dark:text-gray-900 font-bold rounded-xl shadow-md hover:shadow-lg hover:brightness-110 transition-all duration-300 ease-in-out">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default LoanCard;