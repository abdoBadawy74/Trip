import Landing from "../Components/Landing/Landing";
import About from "../Components/About";
import TopServices from "../Components/TopServices/TopServices";
import Insights from "../Components/Insights/Insights";
import Hotels from "../Components/Hotels";
import Fields from "../Components/Fields/Fields";
import Testimonials from "../Components/Testmonials/Testimonials";
import Footer from "../Components/Footer/Footer";

export default function LandingPage() {
  return (
    <div>
      <Landing />
      <About />
      <TopServices />
      <Insights />
      <Hotels />
      <Fields />
      <Testimonials />
      <Footer />
    </div>
  );
}
