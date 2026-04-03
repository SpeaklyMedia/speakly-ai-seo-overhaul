import { Hero } from "@/components/sections/Hero";
import { Market } from "@/components/sections/Market";
import { Problem } from "@/components/sections/Problem";
import { SourceOfTruth } from "@/components/sections/SourceOfTruth";
import { Solution } from "@/components/sections/Solution";
import { System } from "@/components/sections/System";
import { Proof } from "@/components/sections/Proof";
import { NextStep } from "@/components/sections/NextStep";
import { Footer } from "@/components/Footer";
import { SectionNav } from "@/components/SectionNav";

export function Home() {
  return (
    <main className="flex-1 w-full bg-background text-foreground">
      <SectionNav />
      <Hero />
      <Market />
      <Problem />
      <SourceOfTruth />
      <Solution />
      <System />
      <Proof />
      <NextStep />
      <Footer />
    </main>
  );
}
