import { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { Helmet } from "react-helmet-async";
import { saveOrUpdateUser, showAlert } from "../../utils";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import axiosPublic from "../../hooks/useAxiosPublic";

const Login = () => {
  const { loginFunction, setUser, loginPopFunction, setLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef(null);

  const handleReset = () => {
    showAlert({
      title: "This link isn't functional yet. Coming soon.",
      icon: "info",
      color: "skyblue",
    });
  };

  const handleGoogleLogin = async () => {
    const from = location?.state?.from?.pathname || "/";

    try {
      // Firebase google popup login
      const result = await loginPopFunction();
      const user = result.user;

      const idToken = await user.getIdToken();
      await axiosPublic.post("/auth/login", { idToken });

      // Save or update user in database
      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      });

      // Update React state
      setUser(user);
      showAlert({
        color: "lime",
        icon: "success",
        title: "Logged in successfully!",
      });

      navigate(from, { replace: true });
    } catch (err) {
      setError(err.code);
      setLoading(false);
      showAlert({
        color: "pink",
        icon: "error",
        title: "Failed to log in with Google.",
      });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const from = location?.state?.from?.pathname || "/";

    try {
      // Login with email/password
      const { user } = await loginFunction(email, password);

      const idToken = await user.getIdToken();
      await axiosPublic.post("/auth/login", { idToken });

      // Save or update DB user
      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      });

      // Update React state
      setUser(user);
      showAlert({
        color: "lime",
        icon: "success",
        title: "Logged in successfully!",
      });

      navigate(from, { replace: true });
    } catch (err) {
      setError(err.code);
      setLoading(false);
      showAlert({
        color: "pink",
        icon: "error",
        title: "Failed to log in with Google.",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>RinTrack | Login</title>
      </Helmet>
      <div className="bg-orange-50 dark:bg-transparent min-h-screen flex items-center justify-center py-12 px-4 transition-colors duration-300">
        <div className="w-full max-w-md p-8 lg:p-10 bg-orange-100 dark:bg-neutral-900/90 rounded-2xl shadow-2xl dark:shadow-[0_0_20px_rgba(14,165,233,0.1)] border border-blue-400/30 relative z-10">
          <h2 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-3">
            Access Your Account
          </h2>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
            Login to continue your journey.
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email  */}
            <div className="space-y-2">
              <label className="block font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 dark:text-gray-500">
                  <FaEnvelope className="w-5 h-5" />
                </span>
                <input
                  type="email"
                  name="email"
                  ref={emailRef}
                  placeholder="example@email.com"
                  className="w-full px-12 py-3 border rounded-xl bg-orange-50 dark:bg-neutral-800 dark:text-white focus:outline-none focus:ring-2 transition-colors duration-200 border-gray-300 dark:border-neutral-700 focus:ring-blue-400"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 dark:text-gray-500">
                  <FaLock className="w-5 h-5" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="password"
                  className="w-full px-12 py-3 border rounded-xl 
                         bg-orange-50 dark:bg-neutral-800 dark:text-white 
                         focus:outline-none focus:ring-2 transition-colors duration-200
                         border-gray-300 dark:border-neutral-700 focus:ring-blue-400"
                  required
                />

                {/* Show/Hide toggle aligned to input */}
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-500 cursor-pointer"
                  onClick={() => setShowPassword((p) => !p)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <MdVisibility size={20} />
                  ) : (
                    <MdVisibilityOff size={20} />
                  )}
                </button>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="space-y-3">
              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-sky-600 hover:from-blue-600 hover:to-sky-700 text-white dark:text-gray-900 font-bold text-lg rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-300 ease-in-out flex items-center justify-center cursor-pointer"
              >
                Login
              </button>

              <button
                onClick={handleGoogleLogin}
                type="button"
                className="w-full flex bg-amber-50 dark:bg-neutral-900/90 items-center justify-center space-x-3 py-3 rounded-xl font-medium border border-gray-300 dark:border-neutral-700 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-neutral-800 text-gray-700 dark:text-gray-300 cursor-pointer"
              >
                <FcGoogle size={24} />
                <span>Continue with Google</span>
              </button>
            </div>
          </form>

          <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-6">
            Don't have an account?{" "}
            <Link
              className="text-blue-600 dark:text-blue-400 hover:underline font-semibold transition-colors"
              to="/register"
            >
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
