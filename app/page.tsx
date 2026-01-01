import Hero from "./components/Hero";
import Navigation from "./components/Navigation";
import BusinessDivisions from "./components/BusinessDivisions";
import ElectronicsShowcase from "./components/ElectronicsShowcase";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <BusinessDivisions />
        <ElectronicsShowcase />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
