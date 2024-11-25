import { Header } from "@/components/header";
import { HeroSection } from "@/components/sections/hero-section";
import { FeaturedSection } from "@/components/sections/featured-section";
import { DirectorySection } from "@/components/sections/directory-section";
import { Footer } from "@/components/footer";

export default function Home() {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <HeroSection />
            <FeaturedSection />
            <DirectorySection />
            <Footer />
        </div>
    );
}
