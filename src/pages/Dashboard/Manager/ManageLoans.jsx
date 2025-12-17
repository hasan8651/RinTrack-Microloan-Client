import { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import ManageLoanDataRow from "../../../components/Dashboard/TableRows/ManageLoanDataRow";
import { Helmet } from "react-helmet-async";

const ManageLoans = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: loans = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["manage-loans"],
    enabled: !!user?.email,
    queryFn: async () => {
      const result = await axiosSecure.get("/loans");
      return result.data;
    },
    keepPreviousData: true,
  });

  if (isLoading) return <LoadingSpinner />;

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredLoans = loans.filter((loan) => {
    if (loan.createdBy !== user?.email) return false;
    if (!normalizedSearch) return true;

    const haystack = `${loan.title || ""} ${loan.category || ""}`.toLowerCase();
    return haystack.includes(normalizedSearch);
  });

  const handleSearch = () => {
    setSearchTerm(searchInput);
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen transition-colors duration-300 p-4 md:p-8">
      <Helmet>
        <title>RinTrack | Manage Loans</title>
      </Helmet>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col mt-6 md:mt-0 sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
              Manage My Loans
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              View, edit, and manage loans created under your account.
            </p>
          </div>
          {isFetching && (
            <span className="text-xs text-blue-500 dark:text-blue-400">
              Updating...
            </span>
          )}
        </div>
        <div className="mb-6 bg-orange-100 dark:bg-neutral-900/90 border border-gray-200 dark:border-blue-400/20 rounded-2xl shadow-md p-4">
          <div className="flex flex-col md:flex-row gap-4 md:items-center">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Search Loans
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by title or category"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                  }}
                  className="w-full pl-3 pr-20 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 
                             bg-orange-50 dark:bg-neutral-800 text-gray-800 dark:text-gray-100 
                             focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                />
                {searchInput && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute inset-y-0 right-9 flex items-center px-2 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 cursor-pointer"
                    aria-label="Clear search"
                  >
                    <FaTimes size={12} />
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleSearch}
                  className="absolute inset-y-0 right-2 flex items-center px-2 text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 cursor-pointer"
                  aria-label="Search"
                >
                  <FaSearch size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {isError && (
          <p className="mb-4 text-sm text-red-500">
            Failed to load loans: {error?.message || "Unknown error"}
          </p>
        )}

        <div className="bg-orange-50 dark:bg-neutral-900/90 border border-gray-200 dark:border-blue-400/20 rounded-2xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-800 text-sm">
              <thead className="bg-orange-100 dark:bg-neutral-800/80">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Interest
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="bg-orange-50 dark:bg-neutral-900/90 divide-y divide-gray-200 dark:divide-neutral-800">
                {filteredLoans.length > 0 ? (
                  filteredLoans.map((loan) => (
                    <ManageLoanDataRow
                      key={loan._id}
                      loan={loan}
                      refetch={refetch}
                    />
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-5 py-6 text-center text-sm text-gray-500 dark:text-gray-400"
                    >
                      No loans found for your account or this search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageLoans;
