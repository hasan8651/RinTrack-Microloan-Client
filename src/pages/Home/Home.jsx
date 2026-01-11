import { Helmet } from "react-helmet-async";
import FeaturedLoans from "../../components/FeaturedLoans/FeaturedLoans";
import Hero from "../../components/Hero/Hero";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import Feedback from "../../components/Feedback/Feedback";
import ExtraSections from "../../components/ExtraSection/ExtraSection";
import HelpSection from "../../components/HelpSection/HelpSection";
import ServicesSection from "../../components/ServicesSection/ServicesSection";
import StatisticsSection from "../../components/StatisticsSection/StatisticsSection";
import BlogsSection from "../../components/BlogSection/BlogSection";


const Home = () => {
  return (
    <div>
      <Helmet>
        <title>RinTrack | Home</title>
      </Helmet>
      <Hero />
      <FeaturedLoans />
      <HowItWorks />
      <Feedback />
      <ExtraSections />
      <ServicesSection/>
      <StatisticsSection/>
      <BlogsSection/>
      <HelpSection />
    </div>
  );
};

export default Home;
