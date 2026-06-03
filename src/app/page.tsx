import {
  BookSection,
  DoomedSection,
  Hero,
  FooterSection,
  KingsnorthSection,
  OrderSection,
} from '@/components/common';

export default function HomePage() {
  return (
    <div className="bg-black text-ds-foreground">
      <div className="mx-auto max-w-[1400px] px-4 pt-6 sm:px-6 sm:pt-8">
        <Hero />
      </div>

      <DoomedSection />

      <BookSection />

      <KingsnorthSection />

      <OrderSection />

      <FooterSection />
    </div>
  );
}
