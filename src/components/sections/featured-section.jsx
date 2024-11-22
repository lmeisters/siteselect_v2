import { WebsiteCard } from "@/components/ui/website-card";

export function FeaturedSection() {
    return (
        <section className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-xl font-medium mb-6">Editors picks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-8xl mx-auto">
                <WebsiteCard
                    name="Awwwards.com"
                    href="https://awwwards.com"
                    size="featured"
                    tags={[
                        "Active",
                        "Free",
                        "Portfolio",
                        "Active",
                        "Free",
                        "Portfolio",
                        "Active",
                        "Free",
                        "Portfolio",
                        "Active",
                        "Free",
                        "Portfolio",
                    ]}
                />
                <WebsiteCard
                    name="Featured Site"
                    href="#"
                    size="featured"
                    tags={["React", "Next.js", "Tailwind"]}
                />
            </div>
        </section>
    );
}
