import { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { saveOrUpdateUser } from "../../utils";
import { FaEnvelope, FaLock, FaUser, FaImage } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import axiosPublic from "../../hooks/useAxiosPublic";

const Register = () => {
  const {
    createUserFunction,
    setUser,
    updateProfileFunction,
    loginPopFunction,
  } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef(null);

  const passwordValidation = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return regex.test(password);
  };

  const handleGoogleLogin = async () => {
    const from = location?.state?.from?.pathname || "/";

    try {
      const result = await loginPopFunction();
      const user = result.user;

      const idToken = await user.getIdToken();
    await axiosPublic.post("/auth/login", { idToken });

      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
        });

      setUser(user);

      Swal.fire({
        position: "top-end",
        background: "linear-gradient(to right, #093371, #6E11B0, #093371)",
        color: "white",
        icon: "success",
        title: "Logged in successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate(from, { replace: true });
    } catch (err) {
      setError(err.code || "Google login failed.");

      Swal.fire({
        position: "top-end",
        background: "linear-gradient(to right, #093371, #6E11B0, #093371)",
        color: "white",
        icon: "error",
        title: "Failed to log in with Google.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photoURL = e.target.photoURL.value;
    const role = e.target.role.value; // NEW
    const password = e.target.password.value;

    if (!passwordValidation(password)) {
      setPasswordError(
        "Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long."
      );
      return;
    }

    setPasswordError("");
    setError("");

    try {
      const result = await createUserFunction(email, password);
      const user = result.user;

      await updateProfileFunction({
        displayName: name,
        photoURL: photoURL,
      });

      await saveOrUpdateUser({
        name,
        email,
        image: photoURL,
        role,
      });

      setUser({
        ...user,
        displayName: name,
        photoURL: photoURL,
      });

      const idToken = await user.getIdToken();
await axiosPublic.post("/auth/login", { idToken });

      Swal.fire({
        position: "top-end",
        background: "linear-gradient(to right, #093371, #6E11B0, #093371)",
        color: "white",
        icon: "success",
        title: "Registered successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/");
    } catch (err) {
      setError(err.code || "Registration failed.");

      Swal.fire({
        position: "top-end",
        background: "linear-gradient(to right, #093371, #6E11B0, #093371)",
        color: "white",
        icon: "error",
        title: "Registration failed. Please try again.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>RinTrack - Register</title>
      </Helmet>

      <div className="bg-base-100 dark:bg-base-300 min-h-screen flex items-center justify-center py-12 px-4 transition-colors duration-300">
        <div
          className="w-full max-w-md p-8 lg:p-10 bg-white dark:bg-neutral-900/90 rounded-2xl shadow-2xl 
                     dark:shadow-[0_0_20px_rgba(14,165,233,0.1)] border border-gray-200 dark:border-blue-400/30 
                     relative z-10"
        >
          <h2 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-3">
            Create Your Account
          </h2>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
            Join us to continue your journey.
          </p>

          <form onSubmit={handleRegister} className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <label className="block font-medium text-gray-700 dark:text-gray-300">
                Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 dark:text-gray-500">
                  <FaUser className="w-5 h-5" />
                </span>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="w-full px-12 py-3 border rounded-xl bg-gray-50 dark:bg-neutral-800 dark:text-white 
                             focus:outline-none focus:ring-2 transition-colors duration-200
                             border-gray-300 dark:border-neutral-700 focus:ring-blue-400"
                  required
                />
              </div>
            </div>

            {/* Email */}
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
                  placeholder="Your Email"
                  className="w-full px-12 py-3 border rounded-xl bg-gray-50 dark:bg-neutral-800 dark:text-white 
                             focus:outline-none focus:ring-2 transition-colors duration-200
                             border-gray-300 dark:border-neutral-700 focus:ring-blue-400"
                  required
                />
              </div>
            </div>

            {/* Photo URL */}
            <div className="space-y-2">
              <label className="block font-medium text-gray-700 dark:text-gray-300">
                Photo URL
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 dark:text-gray-500">
                  <FaImage className="w-5 h-5" />
                </span>
                <input
                  type="text"
                  name="photoURL"
                  placeholder="Photo URL"
                  className="w-full px-12 py-3 border rounded-xl bg-gray-50 dark:bg-neutral-800 dark:text-white 
                             focus:outline-none focus:ring-2 transition-colors duration-200
                             border-gray-300 dark:border-neutral-700 focus:ring-blue-400"
                  required
                />
              </div>
            </div>

            {/* Role (NEW) */}
            <div className="space-y-2">
              <label className="block font-medium text-gray-700 dark:text-gray-300">
                Role
              </label>
              <div className="relative">
                <select
                  name="role"
                  defaultValue="borrower"
                  className="w-full px-4 py-3 border rounded-xl bg-gray-50 dark:bg-neutral-800 dark:text-white
                             focus:outline-none focus:ring-2 transition-colors duration-200
                             border-gray-300 dark:border-neutral-700 focus:ring-blue-400"
                  required
                >
                  <option value="borrower">Borrower</option>
                  <option value="manager">Manager</option>
                </select>
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
                  placeholder="Password"
                  className="w-full px-12 py-3 border rounded-xl 
                             bg-gray-50 dark:bg-neutral-800 dark:text-white 
                             focus:outline-none focus:ring-2 transition-colors duration-200
                             border-gray-300 dark:border-neutral-700 focus:ring-blue-400"
                  required
                />
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

              {passwordError && (
                <p className="text-red-500 text-sm">{passwordError}</p>
              )}
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-sky-600 
                           hover:from-blue-600 hover:to-sky-700 text-white dark:text-gray-900 
                           font-bold text-lg rounded-xl shadow-lg shadow-blue-500/30 
                           transition-all duration-300 ease-in-out flex items-center justify-center cursor-pointer"
              >
                Register
              </button>

              <button
                onClick={handleGoogleLogin}
                type="button"
                className="w-full flex items-center justify-center space-x-3 py-3 rounded-xl 
                           font-medium border border-gray-300 dark:border-neutral-700 
                           transition-all duration-200 hover:bg-gray-50 dark:hover:bg-neutral-800 
                           text-gray-700 dark:text-gray-300 cursor-pointer"
              >
                <FcGoogle size={24} />
                <span>Continue with Google</span>
              </button>
            </div>
          </form>

          <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-6">
            Already have an account?{" "}
            <Link
              className="text-blue-600 dark:text-blue-400 hover:underline font-semibold transition-colors"
              to="/login"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;