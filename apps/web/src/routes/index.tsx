import { createFileRoute } from '@tanstack/react-router';

import CTASection from '@/modules/landing/cta-section';
import DeveloperSection from '@/modules/landing/developer-section';
import HeroSection from '@/modules/landing/hero-section';
import HowItWorks from '@/modules/landing/how-it-works';
import KeyCapabilities from '@/modules/landing/key-capabilities';
import PricingSection from '@/modules/landing/pricing-section';

export const Route = createFileRoute('/')({ component: LandingPage });

function LandingPage() {
  return (
    <main>
      <HeroSection />
      <HowItWorks />
      <KeyCapabilities />
      <DeveloperSection />
      <PricingSection />
      <CTASection />
    </main>
  );
}
