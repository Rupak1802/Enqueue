import WorldCanvas from "./components/WorldCanvas";
import Loader from "./components/Loader";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import HeroScroll from "./components/HeroScroll";
import About from "./components/About";
import Services from "./components/Services";
import Values from "./components/Values";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      {/* Single unified 3D world — fixed behind everything */}
      <WorldCanvas />

      <Loader />
      <Cursor />

      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />
        <HeroScroll />
        <About />
        <Services />
        <Values />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
