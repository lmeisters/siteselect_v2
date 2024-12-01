import { Header } from "@/components/header";
import { SearchResultsSection } from "@/components/sections/search-results-section";
import { Footer } from "@/components/footer";

export const metadata = {
    title: "Search Results | SiteSelect",
    description:
        "Browse our curated collection of website designs filtered by your search criteria.",
};

export default function DirectoryPage() {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <SearchResultsSection />
            <Footer />
        </div>
    );
}
