import { WebsiteCard } from "@/components/ui/website-card";
import { getFeaturedWebsites } from "@/lib/api";

export async function FeaturedSection() {
    const featuredWebsites = await getFeaturedWebsites();

    return (
        <section className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-xl font-medium mb-6">Editors picks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-8xl mx-auto">
                {featuredWebsites.map((website) => (
                    <WebsiteCard
                        key={website.id}
                        name={website.name}
                        href={website.href}
                        size="featured"
                        tags={website.tags}
                        description={website.description}
                        slug={website.slug}
                    />
                ))}
            </div>
        </section>
    );
}
