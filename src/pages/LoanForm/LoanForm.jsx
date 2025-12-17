import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import {
  FaUser,
  FaPhone,
  FaMoneyBillWave,
  FaIdCard,
  FaBuilding,
} from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useParams } from "react-router";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const LoanForm = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { data: loan = {}, isLoading } = useQuery({
    queryKey: ["loan", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/loans/${id}`
      );
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (isLoading) return <LoadingSpinner />;

  const onSubmit = async (data) => {
    const applicationData = {
      image: loan.image,
      loanCategory: loan.category,
      loanId: loan._id,
      loanTitle: loan.title,
      interestRate: loan.interestRate,
      userEmail: user?.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      nidOrPassport: data.nidOrPassport,
      incomeSource: data.incomeSource,
      monthlyIncome: parseFloat(data.monthlyIncome),
      loanAmount: parseFloat(data.loanAmount),
      reason: data.reason,
      address: data.address,
      notes: data.notes,
      status: "Pending",
      applicationFeeStatus: "Unpaid",
      createdAt: new Date().toISOString(),
      approvedAt: "",
    };

    try {
      const res = await axiosSecure.post(
        `${import.meta.env.VITE_API_URL}/loans/application`,
        applicationData
      );
      if (res.data?.success) {
        navigate("/dashboard/my-loans");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const InputField = ({
    label,
    name,
    type = "text",
    register,
    errors,
    icon: Icon,
    requiredMessage,
    placeholder,
  }) => (
    <div>
      <label className="mb-1 font-semibold text-gray-700 dark:text-gray-300 flex items-center">
        {Icon && <Icon className="w-4 h-4 mr-2 text-blue-500" />}
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder || `Enter ${label.toLowerCase()}`}
        {...register(name, { required: requiredMessage })}
        className="w-full px-4 py-3 border rounded-xl bg-orange-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors duration-200"
      />
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">{errors[name].message}</p>
      )}
    </div>
  );

  const TextareaField = ({
    label,
    name,
    register,
    errors,
    requiredMessage,
    optional = false,
  }) => (
    <div>
      <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">
        {label}{" "}
        {optional && <span className="text-sm font-normal">(Optional)</span>}
      </label>
      <textarea
        rows={optional ? 3 : 4}
        {...register(name, { required: optional ? false : requiredMessage })}
        className="w-full px-4 py-3 border rounded-xl bg-orange-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors duration-200"
      />
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">{errors[name].message}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center py-10 px-4 transition-colors duration-300">
      <Helmet>
        <title>RinTrack | {loan.title}</title>
      </Helmet>
      <div className=" w-full max-w-4xl p-8 lg:p-10 bg-orange-100 dark:bg-neutral-900/90 rounded-2xl shadow-2xl dark:shadow-[0_0_20px_rgba(14,165,233,0.1)] border border-blue-400/30">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 text-center border-b pb-4 border-blue-400/50">
          Apply for: <span className="text-blue-500">{loan.title}</span>
        </h2>

        <div className="mb-8 p-4 bg-orange-50 dark:bg-neutral-800 rounded-xl border border-blue-200 dark:border-blue-900">
          <h3 className="text-lg font-bold mb-3 text-blue-700 dark:text-blue-300">
            Loan Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-400">
            <div>
              <span className="font-medium">Email:</span> {user?.email}
            </div>
            <div>
              <span className="font-medium">Interest Rate:</span>{" "}
              {loan.interestRate}%
            </div>
            <div>
              <span className="font-medium">Max Loan Limit:</span> $
              {Number(loan.maxLoanLimit).toLocaleString()}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white border-b pb-2">
            1. Personal Details
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <InputField
              label="First Name"
              name="firstName"
              register={register}
              errors={errors}
              icon={FaUser}
              requiredMessage="First name is required"
            />
            <InputField
              label="Last Name"
              name="lastName"
              register={register}
              errors={errors}
              icon={FaUser}
              requiredMessage="Last name is required"
            />
            <InputField
              label="Phone Number"
              name="phone"
              type="tel"
              register={register}
              errors={errors}
              icon={FaPhone}
              requiredMessage="Phone number is required"
            />
            <InputField
              label="NID / Passport Number"
              name="nidOrPassport"
              register={register}
              errors={errors}
              icon={FaIdCard}
              requiredMessage="NID or Passport number is required"
            />
          </div>

          <h3 className="text-2xl font-bold text-gray-900 dark:text-white border-b pb-2 pt-4">
            2. Financial Details
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <InputField
              label="Income Source"
              name="incomeSource"
              register={register}
              errors={errors}
              icon={FaBuilding}
              requiredMessage="Income source is required"
              placeholder="e.g., Job, Business, Freelance"
            />
            <InputField
              label="Monthly Income ($)"
              name="monthlyIncome"
              type="number"
              register={register}
              errors={errors}
              icon={FaMoneyBillWave}
              requiredMessage="Monthly income is required"
            />
            <InputField
              label="Requested Loan Amount ($)"
              name="loanAmount"
              type="number"
              register={register}
              errors={errors}
              icon={FaMoneyBillWave}
              requiredMessage="Loan amount is required"
            />
          </div>

          <h3 className="text-2xl font-bold text-gray-900 dark:text-white border-b pb-2 pt-4">
            3. Purpose & Address
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <TextareaField
              label="Reason for Loan"
              name="reason"
              register={register}
              errors={errors}
              requiredMessage="Reason is required"
            />
            <TextareaField
              label="Current Address"
              name="address"
              register={register}
              errors={errors}
              requiredMessage="Address is required"
            />
          </div>

          <TextareaField
            label="Additional Notes"
            name="notes"
            register={register}
            errors={errors}
            requiredMessage="Additional Notes required"
          />

          <button
            type="submit"
            className="w-full py-4 mt-8 bg-gradient-to-r from-blue-500 to-sky-600 hover:from-blue-600 hover:to-sky-700 text-white dark:text-gray-900 font-extrabold text-xl rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-300 ease-in-out cursor-pointer"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoanForm;
