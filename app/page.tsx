import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Process from "./components/Process";
import Services from "./components/Services";
import Quote from "./components/Quote";
import Testimonials from "./components/Testimonials";
import Articles from "./components/Articles";
import FAQ from "./components/FAQ";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Process />
      <Services />
      <Quote />
      <Testimonials />
      <Articles />
      <FAQ />
      <CTASection />
      <Footer />
    </main>
  );
}
