import FeaturedLoans from "../../components/FeaturedLoans/FeaturedLoans";
import Hero from "../../components/Hero/Hero";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";


const Home = () => {
 

  return (
    <div>
       <h2>Home Page</h2>
      <Hero/>
      <FeaturedLoans/>
    </div>
     
  );
};

export default Home;
