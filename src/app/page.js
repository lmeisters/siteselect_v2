import { WebsiteCard } from "@/components/ui/website-card";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
    return (
        <ScrollArea className="h-screen">
            <div className="min-h-screen bg-background">
                <Header />

                {/* Hero Section */}
                <section className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-16 flex flex-col items-center justify-center">
                    <div className="w-full text-center">
                        <h1 className="text-[clamp(4rem,15vw,16rem)] font-black leading-none tracking-tighter mx-auto">
                            SiteSelect
                        </h1>
                        <div className="mx-auto max-w-xl mt-32">
                            <p className="text-md leading-tight font-medium">
                                Discover the Web&apos;s Most Innovative Design
                                Galleries -
                            </p>
                            <p className="text-md leading-tight font-medium">
                                Categorized and Filtered for Instant Creative
                                Inspiration,
                            </p>
                            <p className="text-md leading-tight font-medium">
                                Featuring Rich Web Galleries with Stunning
                                Examples to Spark Creativity and Elevate Your
                                Projects
                            </p>
                        </div>
                    </div>
                </section>

                {/* Featured Section */}
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

                {/* Directory Section */}
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

                <Footer />
            </div>
        </ScrollArea>
    );
}
