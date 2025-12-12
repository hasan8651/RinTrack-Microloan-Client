import { Helmet } from "react-helmet-async";
import FeaturedLoans from "../../components/FeaturedLoans/FeaturedLoans";
import Hero from "../../components/Hero/Hero";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import Feedback from "../../components/Feedback/Feedback";
import ExtraSections from "../../components/ExtraSection/ExtraSection";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>RinTrack - Home</title>
      </Helmet>
      <Hero />
      <FeaturedLoans />
      <HowItWorks/>
      <Feedback/>
      <ExtraSections/>
    </div>
  );
};

export default Home;
