import axios from "axios";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState, useMemo } from "react";
import { useDebounce } from "use-debounce";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import AllLoanCard from "../../components/LoanCard/AllLoanCard";
import { Helmet } from "react-helmet-async";
import { FaSearch, FaTimes } from "react-icons/fa";

const AllLoans = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("desc");
  const [search] = useDebounce(searchTerm, 500);

  const { ref, inView } = useInView({ threshold: 0.1 });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["all-loans-infinite", search, category, sort],
      queryFn: async ({ pageParam = 1 }) => {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/loans`,
          {
            params: { search, category, sort, page: pageParam, limit: 8 },
          }
        );
        return data;
      },
      getNextPageParam: (lastPage) =>
        lastPage.currentPage < lastPage.totalPages
          ? lastPage.currentPage + 1
          : undefined,
    });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allLoans = useMemo(
    () => data?.pages.flatMap((page) => page.loans) || [],
    [data]
  );

  const { data: serverCategories } = useQuery({
    queryKey: ["loan-categories"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/loan-categories`
      );
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <section className="py-12 bg-gray-50 dark:bg-neutral-950 min-h-screen">
      <Helmet>
        <title>RinTrack | All Loans</title>
      </Helmet>

      <div className="max-w-7xl px-4 mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-end text-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Discover Loans
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <p className="text-sm font-medium text-gray-500">
                Total Found:{" "}
                <span className="text-blue-500 font-bold">
                  {data?.pages[0]?.totalCount || 0}
                </span>
              </p>
            </div>
          </div>

          {/* Reset Filters */}
          {(searchTerm || category || sort !== "desc") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setCategory("");
                setSort("desc");
              }}
              className="hidden sm:block text-xs font-semibold text-red-500 hover:text-red-600 transition-all cursor-pointer"
            >
              Reset All
            </button>
          )}
        </div>

        {/* --- Single Line Search, Filter, & Sort Bar --- */}
        <div className="flex flex-col lg:flex-row items-center gap-4 bg-white dark:bg-neutral-900 p-3 rounded-2xl shadow-sm border border-gray-100 dark:border-neutral-800 mb-10">
          {/* Search Box */}
          <div className="relative flex-1 w-full group">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              placeholder="Search by loan name..."
              className="w-full pl-11 pr-10 py-2.5 rounded-xl bg-gray-50 dark:bg-neutral-800 border-none outline-none focus:ring-2 focus:ring-blue-500 dark:text-white text-sm"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
              >
                <FaTimes size={12} />
              </button>
            )}
          </div>

          {/* Category Dropdown */}
          <div className="w-full lg:w-48">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-neutral-800 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none dark:text-white cursor-pointer"
            >
              <option value="">All Categories</option>
              {serverCategories?.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Sorting Dropdown */}
          <div className="w-full lg:w-48">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-neutral-800 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none dark:text-white cursor-pointer"
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
              <option value="price-high">Amount: High to Low</option>
              <option value="price-low">Amount: Low to High</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {allLoans.map((loan) => (
              <motion.div
                key={loan._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <AllLoanCard loan={loan} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div ref={ref} className="py-16 flex flex-col items-center">
          {isFetchingNextPage ? (
            <span className="loading loading-spinner loading-lg text-blue-500"></span>
          ) : !hasNextPage && allLoans.length > 0 ? (
            <div className="px-6 py-2 bg-white dark:bg-neutral-900 border dark:border-neutral-800 rounded-full text-gray-500 text-xs">
              End of list ({allLoans.length} items)
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default AllLoans;
