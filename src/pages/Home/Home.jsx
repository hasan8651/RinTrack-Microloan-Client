import { Helmet } from "react-helmet-async";
import FeaturedLoans from "../../components/FeaturedLoans/FeaturedLoans";
import Hero from "../../components/Hero/Hero";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>RinTrack - Home</title>
      </Helmet>
      <Hero />
      <FeaturedLoans />
    </div>
  );
};

export default Home;
