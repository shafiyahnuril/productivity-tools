import { LandingNavbar } from "./components/LandingNavbar";
import { HeroSection } from "./components/HeroSection";
import { FeatureSection } from "./components/FeatureSection";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";
import { LandingClient } from "./LandingClient";

export default function LandingPage() {
  return (
    <LandingClient>
      <LandingNavbar />

      {/* Hero Section */}
      <section id="hero">
        <HeroSection />
      </section>

      {/* Features Section */}
      <FeatureSection />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </LandingClient>
  );
}
