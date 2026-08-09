import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Highlights from "@/components/Highlights";
import Venue from "@/components/Venue";
import Packages from "@/components/Packages";
import Gallery from "@/components/Gallery";
import Booking from "@/components/Booking";
import Testimonials from "@/components/Testimonials";
import ContactCta from "@/components/ContactCta";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Highlights />
        <Venue />
        <Packages />
        <Gallery />
        <Booking />
        <Testimonials />
        <ContactCta />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
