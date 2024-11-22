import { WebsiteCard } from "@/components/ui/website-card";

export function DirectorySection() {
    return (
        <section className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-medium">Directory</h2>
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground px-4 py-1">
                    Filter
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                <WebsiteCard
                    name="Featured Site"
                    href="#"
                    tags={["Design", "Inspiration", "Portfolio"]}
                />
                <WebsiteCard
                    name="Featured Site"
                    href="#"
                    tags={["Creative", "Portfolio", "Adobe"]}
                />
                <WebsiteCard
                    name="Featured Site"
                    href="#"
                    tags={["CSS", "Awards", "Web Design"]}
                />
                <WebsiteCard
                    name="Featured Site"
                    href="#"
                    tags={["Design", "Inspiration", "Portfolio"]}
                />
                <WebsiteCard
                    name="Featured Site"
                    href="#"
                    tags={["Creative", "Portfolio", "Adobe"]}
                />
                <WebsiteCard
                    name="Featured Site"
                    href="#"
                    tags={["CSS", "Awards", "Web Design"]}
                />
                <WebsiteCard
                    name="Featured Site"
                    href="#"
                    tags={["Design", "Inspiration", "Portfolio"]}
                />
                <WebsiteCard
                    name="Featured Site"
                    href="#"
                    tags={["Creative", "Portfolio", "Adobe"]}
                />
                <WebsiteCard
                    name="Featured Site"
                    href="#"
                    tags={["CSS", "Awards", "Web Design"]}
                />
            </div>
        </section>
    );
}
