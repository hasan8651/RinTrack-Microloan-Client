import { Link, useSearchParams } from "react-router";
import { IoBagCheckOutline } from "react-icons/io5";
import { useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!sessionId) return;
    axios
        .get(`${import.meta.env.VITE_API_URL}/payment-success?session_id=${sessionId}`)
        .catch((err) => {console.error("Payment update failed:", err);})}, [sessionId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-6">
      <Helmet>
        <title>RinTrack | PaymentSuccess</title>
      </Helmet>
      <div className="bg-orange-100 dark:bg-transparent p-10 rounded-xl shadow-2xl text-center border border-gray-100 dark:border-neutral-700 max-w-lg w-full">
        <IoBagCheckOutline className="w-16 h-16 text-blue-500 dark:text-blue-400 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
          Payment Successful!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Thank you for paying the application fee. Your loan application is now
          being processed by the Manager.
        </p>
        <Link
          to="/dashboard/my-loans"
          className="inline-block bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
        >
          Go to My Loans
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
