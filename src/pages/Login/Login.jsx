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

// Quick Auto Login Helper
const handleAutoLogin = async (email, password) => {
  try {
    // Firebase Login
    const { user } = await loginFunction(email, password);
    const idToken = await user.getIdToken();
    await axiosPublic.post("/auth/login", { idToken });

    await saveOrUpdateUser({
      name: user?.displayName,
      email: user?.email,
      image: user?.photoURL,
    });

    setUser(user);
    showAlert({
      color: "lime",
      icon: "success",
      title: `Logged in as ${email.split('@')[0].toUpperCase()}!`,
    });

    const from = location?.state?.from?.pathname || "/";
    navigate(from, { replace: true });
  } catch (err) {
    setError("Failed to auto-fill login. Please try manually.");
    setLoading(false);
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
      <div className="min-h-screen flex items-center justify-center py-12 px-4 transition-colors duration-300">
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

{/* --- Demo Login Section --- */}
<div className="mt-8">
  <div className="relative flex items-center justify-center mb-6">
    <div className="flex-grow border-t border-gray-300 dark:border-neutral-700"></div>
    <span className="flex-shrink mx-4 text-gray-400 text-xs font-semibold uppercase tracking-wider">
      Try Demo Accounts
    </span>
    <div className="flex-grow border-t border-gray-300 dark:border-neutral-700"></div>
  </div>

  <div className="grid grid-cols-3 gap-3">
    {[
      { label: "Admin", email: "admin@rintrack.com", pass: "Admin123#", color: "from-rose-500 to-red-600" },
      { label: "Manager", email: "manager@rintrack.com", pass: "Manager123#", color: "from-amber-500 to-orange-600" },
      { label: "Borrower", email: "borrower@rintrack.com", pass: "Borrower123#", color: "from-emerald-500 to-teal-600" },
    ].map((role) => (
      <button
        key={role.label}
        type="button"
        onClick={() => handleAutoLogin(role.email, role.pass)}
        className={`group relative flex flex-col items-center justify-center py-2 px-1 rounded-xl border border-transparent bg-white dark:bg-neutral-800 hover:border-blue-400 shadow-sm transition-all duration-300 cursor-pointer overflow-hidden`}
      >
        <span className="text-[10px] font-bold uppercase text-gray-500 dark:text-gray-400 group-hover:text-blue-500">
          {role.label}
        </span>
        <div className={`mt-1 h-1 w-6 rounded-full bg-gradient-to-r ${role.color}`}></div>
      </button>
    ))}
  </div>
</div>

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
