import { NavLink } from "react-router";

export default function Footer() {
  return (
    <footer className="w-full bg-[#FFF4D6] dark:bg-neutral-900 border-t border-neutral-300 dark:border-neutral-700 py-6 md:py-8 px-4 md:px-6 mt-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        {/* Logo + Description */}
        <div className="order-1 md:order-1">
          <div className="flex items-center gap-2 mb-2">
            <img src="/logo.png" alt="logo" className="h-[70px] w-auto" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-sky-500 bg-clip-text text-transparent">
              RinTrack
            </span>
          </div>
          <p className="text-sm md:text-md text-gray-700 dark:text-gray-300 leading-snug max-w-xs">
            <span className="bg-gradient-to-r from-blue-500 to-sky-500 bg-clip-text text-transparent">
              RinTrack
            </span>{" "}
            is a secure microloan request & approval management system for small
            financial organizations, NGOs, and microloan providers.
          </p>
        </div>

        {/* Copyright */}
        <div className="order-3 md:order-2 flex md:justify-center items-center text-center">
          <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300">
            © {new Date().getFullYear()}{" "}
            <span className="bg-gradient-to-r from-blue-500 to-sky-500 bg-clip-text text-transparent">
              RinTrack
            </span>{" "}
            — All Rights Reserved.
          </p>
        </div>

        {/* Useful Links + Social Links */}
        <div className="order-2 md:order-3 text-sm text-gray-700 dark:text-gray-300">
          <div className="grid grid-cols-2">
            <div>
              <h3 className="text-md font-bold mb-2">Useful Links</h3>
              <ul className="grid gap-2">
                <li>
                  <NavLink to="/" className="hover:text-blue-500 transition">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about-us"
                    className="hover:text-blue-500 transition"
                  >
                    About Us
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contact-us"
                    className="hover:text-blue-500 transition"
                  >
                    Contact
                  </NavLink>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-md font-bold mb-2">Social Links</h3>
              <div className="grid gap-3">
                <a
                  href="https://x.com/HasanAy67180300"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="X"
                  className="link hover:text-blue-500 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    className="fill-current"
                  >
                    <path d="M18.244 2H21L13.5 10.5 22 22h-6.555l-4.3-5.7-4.7 5.7H2l8.744-10.594L2 2h6.6l4.1 5.8L18.244 2z"></path>
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/hasan865"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Facebook"
                  className="link hover:text-blue-500 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    className="fill-current"
                  >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/@pixie-67"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="YouTube"
                  className="link hover:text-blue-500 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current"
                  >
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
