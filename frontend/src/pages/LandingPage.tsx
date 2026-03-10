import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import TargetUsersSection from '@/components/landing/TargetUsersSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import BenefitsSection from '@/components/landing/BenefitsSection';
import PricingSection from '@/components/landing/PricingSection';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <div className="dark min-h-screen bg-bg-dark text-white selection:bg-primary/30">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TargetUsersSection />
      <TestimonialsSection />
      <BenefitsSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  );
}
