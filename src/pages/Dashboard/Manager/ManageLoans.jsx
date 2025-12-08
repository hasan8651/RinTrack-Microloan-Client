import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import ManageLoanDataRow from "../../../components/Dashboard/TableRows/ManageLoanDataRow";

const ManageLoans = () => {
  const {
    data: loans = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["loans"],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/loans`);
      return result.data;
    },
  });
  if (isLoading) {
    <LoadingSpinner/>;
  }
  console.log(loans);
  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 bg-white border-b">Image</th>
                  <th className="px-5 py-3 bg-white border-b">Title </th>
                  <th className="px-5  py-3 bg-white border-b">Interest</th>
                  <th className="px-5  py-3 bg-white border-b">Category</th>
                  <th className="px-5 py-3 bg-white border-b">Actions</th>
                </tr>
              </thead>

              <tbody>
                {loans.map((loan) => (
                  <ManageLoanDataRow
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

export default ManageLoans;
