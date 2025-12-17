import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const AboutUs = () => {
  const teamCardInfo = [
    { name: "Alex Johnson", role: "CEO & Founder", img: "/alex_johnson.jpg" },
    {
      name: "Sarah Williams",
      role: "Head of Finance",
      img: "/sarah_williams.jpg",
    },
    { name: "Michael Chen", role: "Lead Developer", img: "/michael_chen.jpg" },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const fadeInScale = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  return (
    <div className="text-base-content min-h-screen transition-colors duration-500">
      <Helmet>
        <title>RinTrack | AboutUs</title>
      </Helmet>
      {/* --- About Hero --- */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold mb-6 text-gray-900 dark:text-white"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            We Are <br />
            <span className="bg-gradient-to-r from-blue-500 to-sky-500 bg-clip-text text-transparent">
              RinTrack
            </span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Bridging the gap between dreams and reality. We provide fast,
            secure, and transparent microloans to help you grow.
          </motion.p>
        </div>
      </section>

      {/* --- Our Story --- */}
      <section className="py-16">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            className="lg:w-1/2"
            variants={fadeInScale}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <img
              src="/office_meeting.png"
              alt="Office Meeting"
              className="relative rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 w-full object-cover h-[400px]"
            />
          </motion.div>

          <motion.div
            className="lg:w-1/2 text-center lg:text-left"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Building a Future <br /> Without Financial Barriers
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Founded in 2024,{" "}
              <span className="bg-gradient-to-r from-blue-500 to-sky-500 bg-clip-text text-transparent">
                RinTrack
              </span>{" "}
              started with a simple mission: to make financial support
              accessible to everyone, regardless of their background. We noticed
              that traditional banking systems were too slow for the fast-paced
              needs of modern life.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Today, we have served over 10,000+ customers, disbursing millions
              in microloans with a 98% satisfaction rate. Our technology-driven
              approach ensures that you get approved in minutes, not days.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- Team --- */}
      <section className="py-20 transition-colors duration-500">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Meet The Visionaries
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              The experts working behind the scenes to secure your future.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {teamCardInfo.map((member, idx) => (
              <motion.div
                key={idx}
                className="group relative bg-orange-100 dark:bg-neutral-900 rounded-2xl p-6 text-center border border-blue-400/20 shadow-lg dark:shadow-[0_0_10px_rgba(14,165,233,0.1)] hover:-translate-y-2 transition-transform duration-300"
                variants={fadeUp}
              >
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-100 dark:border-blue-900/50">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
