import { Suspense } from "react";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/sections/hero-section";
import { FeaturedSection } from "@/components/sections/featured-section";
import { DirectorySection } from "@/components/sections/directory-section";
import { Footer } from "@/components/footer";

function PageContent() {
    return (
        <>
            <Header />
            <HeroSection />
            <FeaturedSection />
            <DirectorySection />
            <Footer />
        </>
    );
}

export default function Home() {
    return (
        <div className="min-h-screen bg-background">
            <Suspense fallback={<PageFallback />}>
                <PageContent />
            </Suspense>
        </div>
    );
}

function PageFallback() {
    return (
        <div className="min-h-screen bg-background animate-pulse">
            <div className="h-16 border-b bg-muted" />
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="space-y-4">
                    <div className="h-8 w-48 bg-muted rounded-md" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className="h-[300px] rounded-xl bg-muted"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
