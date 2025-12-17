import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Helmet } from "react-helmet-async";

const ContactUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-orange-50 dark:bg-transparent text-base-content py-20 transition-colors duration-500 relative overflow-hidden">
      <Helmet>
        <title>RinTrack | Contact Us</title>
      </Helmet>
      <div className="absolute top-0 right-0 w-96 h-96"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64"></div>
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white">
            Get in <span className="text-blue-500">Touch</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have questions about your loan?
            <br />
            Need help with the application?
            <br />
            Our support team is here to help you 24/7.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col md:flex-row gap-12 md:items-start max-w-6xl mx-auto"
        >
          <div className="md:w-5/12 space-y-8">
            {[
              {
                title: "Call Us",
                lines: ["+880 1718 047 653", "+880 1318 259 953"],
              },
              {
                title: "Email Support",
                lines: ["support@rintrack.com", "info@rintrack.com"],
              },
              {
                title: "Visit Us",
                lines: ["865 Financial District,", "Bogura, Bangladesh"],
              },
            ].map((info, idx) => (
              <motion.div
                key={idx}
                variants={child}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className="flex items-start gap-4 p-6 rounded-2xl bg-orange-100 dark:bg-neutral-900 border border-gray-200 dark:border-blue-400/20 shadow-lg dark:shadow-[0_0_15px_rgba(14,165,233,0.1)] transition-all duration-300"
              >
                <div className="w-12 h-12 bg-orange-200 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                  {idx === 0 && (
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  )}
                  {idx === 1 && (
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  )}
                  {idx === 2 && (
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {info.title}
                  </h3>
                  {info.lines.map((line, i) => (
                    <p key={i} className="text-gray-600 dark:text-gray-400">
                      {line}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={child} className="lg:w-7/12">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-orange-100 dark:bg-neutral-900 p-8 md:p-10 rounded-3xl border border-blue-400/20 shadow-2xl dark:shadow-[0_0_20px_rgba(14,165,233,0.15)]"
            >
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Send a Message
              </h3>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label className="label text-gray-600 dark:text-gray-300 font-medium">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Mahmudul Hasan"
                      className="input input-bordered w-full bg-orange-50 dark:bg-neutral-800 border-gray-300 dark:border-neutral-700 focus:border-blue-500 focus:outline-none transition-all duration-300"
                    />
                  </motion.div>
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label className="label text-gray-600 dark:text-gray-300 font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="mahmudul@email.com"
                      className="input input-bordered w-full bg-orange-50 dark:bg-neutral-800 border-gray-300 dark:border-neutral-700 focus:border-blue-500 focus:outline-none transition-all duration-300"
                    />
                  </motion.div>
                </div>

                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <label className="label text-gray-600 dark:text-gray-300 font-medium">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="Loan Inquiry"
                    className="input input-bordered w-full bg-orange-50 dark:bg-neutral-800 border-gray-300 dark:border-neutral-700 focus:border-blue-500 focus:outline-none transition-all duration-300"
                  />
                </motion.div>

                <label className="label text-gray-600 dark:text-gray-300 font-medium">
                  Message
                </label>
                <div className="form-control">
                  <textarea
                    className="textarea textarea-bordered w-full h-32 bg-orange-50 dark:bg-neutral-800 border-gray-300 dark:border-neutral-700 focus:border-blue-500 focus:outline-none transition-all duration-300"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full btn border-none bg-gradient-to-r from-blue-500 to-sky-600 hover:from-blue-600 hover:to-sky-700 text-white font-bold text-lg rounded-xl shadow-md shadow-blue-500/30 transition-all duration-300"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactUs;
