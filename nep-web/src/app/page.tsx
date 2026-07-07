import { Navbar } from '@/components/landing/navbar';
import { Hero } from '@/components/landing/hero';
import { BusinessBenefits } from '@/components/landing/business-benefits';
import { WhatNepDoes } from '@/components/landing/what-nep-does';
import { WhoWeServe } from '@/components/landing/who-we-serve';
import { Features } from '@/components/landing/features';
import { WhyChoose } from '@/components/landing/why-choose';
import { Modules } from '@/components/landing/modules';
import { Testimonials } from '@/components/landing/testimonials';
import { Faq } from '@/components/landing/faq';
import { Cta } from '@/components/landing/cta';
import { Footer } from '@/components/landing/footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <BusinessBenefits />
        <WhatNepDoes />
        <WhoWeServe />
        <Features />
        <WhyChoose />
        <Modules />
        <Testimonials />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
