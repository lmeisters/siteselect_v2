import { Header } from "@/components/header";
import { DirectorySection } from "@/components/sections/directory-section";
import { ScrollWrapper } from "@/components/scroll-wrapper";

export const metadata = {
    title: "Directory | SiteSelect",
    description:
        "Browse our curated collection of website designs and find inspiration for your next project.",
};

export default function DirectoryPage() {
    return (
        <ScrollWrapper>
            <div className="min-h-screen bg-background">
                <Header />
                <DirectorySection />
            </div>
        </ScrollWrapper>
    );
}
