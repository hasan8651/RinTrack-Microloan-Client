import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import AllApplicationDataRow from "../../../components/Dashboard/TableRows/AllApplicationDataRow";

const LoanApplication = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: allLoans = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["loans"],
    queryFn: async () => {
      const result = await axiosSecure(`/all-loans-application`);
      return result.data;
    },
  });
  console.log(allLoans);
  console.log(allLoans);
  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 bg-white border-b"> Loan ID</th>
                  <th className="px-5 py-3 bg-white border-b">User Info </th>
                  <th className="px-5  py-3 bg-white border-b">Amount</th>
                  <th className="px-5  py-3 bg-white border-b">Status</th>
                  <th className="px-5 py-3 bg-white border-b">Actions</th>
                </tr>
              </thead>

              <tbody>
                {allLoans.map((loan) => (
                  <AllApplicationDataRow
                    key={loan._id}
                    loan={loan}
                    refetch={refetch}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanApplication;
