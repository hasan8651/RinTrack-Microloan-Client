import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaSearch, FaTimes } from "react-icons/fa";
import ManageUserDataRow from "../../../components/Dashboard/TableRows/ManageUserDataRow";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { Helmet } from "react-helmet-async";

const USERS_PER_PAGE = 5;

const ManageUsers = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const searchRef = useRef("");

  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["users", user?.email, currentPage, searchTerm, filterRole],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/users", {
        params: {
          page: currentPage,
          limit: USERS_PER_PAGE,
          search: searchTerm,
          role: filterRole,
        },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  if (isLoading) return <LoadingSpinner />;

  const { users = [], totalPages = 1 } = data || {};

  const handleSearch = () => {
    setSearchTerm(searchInput);
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setSearchTerm("");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-orange-50 dark:bg-transparent transition-colors duration-300 p-4 md:p-8">
      <Helmet>
        <title>RinTrack | Manage Users</title>
      </Helmet>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col mt-6 md:mt-0 sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
              Manage Users
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              View, search, and manage all registered users.
            </p>
          </div>
          {isFetching && (
            <span className="text-xs text-blue-500 dark:text-blue-400">
              Updating...
            </span>
          )}
        </div>

        <div className="bg-orange-100 dark:bg-neutral-900/90 border border-gray-200 dark:border-blue-400/20 rounded-2xl shadow-md p-4 md:p-5 mb-6">
          <div className="flex flex-col md:flex-row gap-4 md:items-center">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name or email"
                  ref={searchRef}
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

            <div className="w-full md:w-56">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Filter by Role
              </label>
              <select
                value={filterRole}
                onChange={(e) => {
                  setFilterRole(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 
                           bg-orange-50 dark:bg-neutral-800 text-gray-800 dark:text-gray-100 
                           focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              >
                <option value="">All Roles</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="borrower">Borrower</option>
              </select>
            </div>
          </div>

          {isError && (
            <p className="mt-3 text-sm text-red-500">
              Failed to load users: {error?.message || "Unknown error"}
            </p>
          )}
        </div>

        <div className="bg-orange-50 dark:bg-neutral-900/90 border border-gray-200 dark:border-blue-400/20 rounded-2xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-800 text-sm">
              <thead className="bg-orange-100 dark:bg-neutral-800/80">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="bg-orange-50 dark:bg-neutral-900/90 divide-y divide-gray-200 dark:divide-neutral-800">
                {users.length > 0 ? (
                  users.map((user) => (
                    <ManageUserDataRow
                      key={user._id}
                      myLoan={user}
                      refetch={refetch}
                      user={user}
                    />
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-5 py-6 text-center text-sm text-gray-500 dark:text-gray-400"
                    >
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-6 space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-lg border text-sm font-medium cursor-pointer ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-500 dark:bg-neutral-800 dark:text-gray-500 cursor-not-allowed border-gray-300 dark:border-neutral-700"
                  : "bg-white dark:bg-neutral-900 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-neutral-700 hover:bg-blue-50 dark:hover:bg-neutral-800"
              }`}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, idx) => (
              <button
                key={idx + 1}
                onClick={() => setCurrentPage(idx + 1)}
                className={`px-3 py-1 rounded-lg border text-sm font-medium cursor-pointer ${
                  currentPage === idx + 1
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white dark:bg-neutral-900 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-neutral-700 hover:bg-blue-50 dark:hover:bg-neutral-800"
                }`}
              >
                {idx + 1}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-lg border text-sm font-medium cursor-pointer ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-500 dark:bg-neutral-800 dark:text-gray-500 cursor-not-allowed border-gray-300 dark:border-neutral-700"
                  : "bg-white dark:bg-neutral-900 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-neutral-700 hover:bg-blue-50 dark:hover:bg-neutral-800"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
