import { Header } from "@/components/header";
import { SearchResultsSection } from "@/components/sections/search-results-section";
import { Footer } from "@/components/footer";
import { SearchProvider } from "@/components/providers/search-provider";
import { Suspense } from "react";

export const metadata = {
    title: "Search Results | SiteSelect",
    description:
        "Browse our curated collection of website designs filtered by your search criteria.",
};

function SearchFallback() {
    return (
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse space-y-4">
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
    );
}

export default function DirectoryPage() {
    return (
        <Suspense fallback={<SearchFallback />}>
            <div className="min-h-screen bg-background">
                <Header />
                <SearchProvider>
                    <SearchResultsSection />
                </SearchProvider>
                <Footer />
            </div>
        </Suspense>
    );
}
