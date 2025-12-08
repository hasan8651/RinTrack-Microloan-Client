import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { AuthContext } from "../../context/AuthContext";


const Navbar = () => {
  const { user, logoutFunction, loading } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const location = useLocation();
  const isDashboardActive = [
    "/dashboard",
    "/dashboard/my-enrolled",
    "/dashboard/add-course",
    "/dashboard/my-added",
  ].some((path) => location.pathname.startsWith(path));

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="mb-35">
      <div className="navbar max-w-7xl shadow-lg fixed top-0 w-full z-50 px-8">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden hover:bg-purple-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link className="hover:text-purple-400" to={"/"}>
                  Home
                </Link>
              </li>
              <li>
                <Link className="hover:text-purple-400" to={"/loans"}>
                  All-Loans
                </Link>
              </li>

              <li>
                {user && user?.email ? (
                  <details close='true'>
                    <summary className="hover:text-purple-400">
                      Dashboard
                    </summary>
                    <ul>
                      <li>
                        <NavLink
                          to="/profile"
                          className="hover:text-purple-400"
                        >
                          Update Profile
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/dashboard/my-enrolled"
                          className="hover:text-purple-400"
                        >
                          My Enrolled Course
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/dashboard/add-course"
                          className="hover:text-purple-400"
                        >
                          Add Course
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/dashboard/my-added"
                          className="hover:text-purple-400"
                        >
                          My Added Course
                        </NavLink>
                      </li>
                    </ul>
                  </details>
                ) : (
                <li>
                    <Link className="hover:text-purple-400" to={"/about-us"}>
                    About Us
                  </Link>
                  <Link className="hover:text-purple-400" to={"/contact"}>
                    Contact
                  </Link>
                </li>
                )}
              </li>

              <li>
                {user && user?.email ? (
                   <li>
                    <Link className="hover:text-purple-400" to={"/about-us"}>
                    About Us
                  </Link>
                  <Link className="hover:text-purple-400" to={"/contact"}>
                    Contact
                  </Link>
                </li>
                ) : (
                  <Link className="hover:text-purple-400" to={"/login"}>
                    Login / Register
                  </Link>
                )}
              </li>
            </ul>
          </div>
          <Link
            className="flex flex-wrap justify-center items-center gap-2 px-4 md:px-0 text-2xl font-bold"
            to="/"
          >
            <img className="w-24" src="/favicon.png" alt="logo" />
          </Link>
        </div>

        <div className="navbar-end hidden md:flex">
          <ul className="menu menu-horizontal px-1 space-x-6 font-semibold">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "bg-purple-900 text-purple-400"
                    : "hover:text-purple-400"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/loans"
                className={({ isActive }) =>
                  isActive
                    ? "bg-purple-900 text-purple-400"
                    : "hover:text-purple-400"
                }
              >
                All-Loans
              </NavLink>
            </li>

            {user && user?.email ? (
              <li>
                <div className="drawer-end">
                  <input
                    id="my-drawer-5"
                    type="checkbox"
                    className="drawer-toggle"
                  />
                  <div className="drawer-content">
                    <label
                      htmlFor="my-drawer-5"
                      className={`px-3 py-2 rounded cursor-pointer ${
                        isDashboardActive
                          ? "bg-purple-900 text-purple-400"
                          : "hover:text-purple-400"
                      }`}
                    >
                      Dashboard
                    </label>
                  </div>
                  <div className="drawer-side">
                    <label
                      htmlFor="my-drawer-5"
                      aria-label="close sidebar"
                      className="drawer-overlay"
                    ></label>
                    <ul className="menu section-gradient min-h-full w-80 p-4">
                      <li className="flex justify-center items-center pb-2">
                        <img
                          src={
                            user?.photoURL ||
                            "https://img.icons8.com/windows/64/user.png"
                          }
                          alt="user photo"
                          className="rounded-full"
                        />
                      </li>
                      <li className="text-center font-semibold border-b border-gray-200 mb-2 pb-2">
                        Hello, {user?.displayName || "User"}
                      </li>
                      <li>
                        <NavLink
                          to="/profile"
                          className={({ isActive }) =>
                          isActive
                              ? "bg-transparent text-purple-400 btn w-full"
                              : "hover:text-purple-400 btn btn-gradient w-full"
                          }
                        >
                          Update Profile
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/dashboard/my-enrolled"
                          className={({ isActive }) =>
                            isActive
                              ? "bg-transparent text-purple-400 btn w-full"
                              : "hover:text-purple-400 btn btn-gradient w-full"
                          }
                        >
                          My Enrolled Course
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/dashboard/add-course"
                          className={({ isActive }) =>
                            isActive
                              ? "bg-transparent text-purple-400 btn w-full"
                              : "hover:text-purple-400 btn btn-gradient w-full"
                          }
                        >
                          Add Course
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/dashboard/my-added"
                          className={({ isActive }) =>
                            isActive
                              ? "bg-transparent text-purple-400 btn w-full"
                              : "hover:text-purple-400 btn btn-gradient w-full"
                          }
                        >
                          My Added Course
                        </NavLink>
                      </li>

                      <li>
                        <button
                          onClick={logoutFunction}
                          className="btn btn-gradient w-full"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            ) : (
              ""
            )}

            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "bg-purple-900 text-purple-400"
                    : "hover:text-purple-400"
                }
              >
                About Us
              </NavLink>
              </li>
              <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "bg-purple-900 text-purple-400"
                    : "hover:text-purple-400"
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
          {loading ? (
            <div className="flex justify-center items-center">
              <span className="loading loading-spinner loading-md"></span>
            </div>
          ) : user && user?.email ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div
                  title={user?.displayName}
                  className="w-10 rounded-full border-2 border-white"
                >
                  <img
                    className="rounded-full"
                    src={
                      user?.photoURL ||
                      "https://img.icons8.com/windows/32/user.png"
                    }
                    alt="user photo"
                  />
                </div>
              </label>

              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow dropdown-content rounded-box w-52"
              >
                <li className="flex justify-center items-center pb-2">
                  <img
                    src={
                      user?.photoURL ||
                      "https://img.icons8.com/windows/64/user.png"
                    }
                    alt="user photo"
                    className="rounded-full border"
                  />
                </li>
                <li className="text-center font-semibold border-b border-gray-200 pb-2">
                  Hello, {user?.displayName || "User"}
                </li>
                <li className="text-center text-sm pb-2">
                  {user?.email}
                </li>
                <li>
                  <button
                    onClick={logoutFunction}
                    className="btn btn-sm w-full"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="hidden lg:flex gap-5 items-center">
              <Link
                to={"/login"}
                className="btn btn-gradient font-semibold hover:bg-blue-100"
              >
                Login
              </Link>
              <Link
                to={"/register"}
                className="btn btn-gradient font-semibold hover:bg-blue-100"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* <div className="navbar-end flex items-center space-x-4 gap-2">
          
        </div> */}
        <label className="swap swap-rotate ml-4">
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={toggleTheme}
          />

          <svg
            className="swap-off h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          <svg
            className="swap-on h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
      </div>
    </div>
  );
};

export default Navbar;
