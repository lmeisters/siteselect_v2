import { getWebsiteBySlug } from "@/lib/api";
import { WebsiteCard } from "@/components/ui/website-card";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
    const website = await getWebsiteBySlug(params.slug);

    if (!website) return {};

    return {
        title: `${website.name} | SiteSelect`,
        description: website.description,
        openGraph: {
            title: `${website.name} | SiteSelect`,
            description: website.description,
            images: [website.image_url],
        },
    };
}

export default async function WebsitePage({ params }) {
    const website = await getWebsiteBySlug(params.slug);

    if (!website) {
        notFound();
    }

    return (
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-3xl mx-auto">
                <WebsiteCard
                    name={website.name}
                    href={website.href}
                    tags={website.tags}
                    size="featured"
                />
                <div className="mt-8 prose prose-gray">
                    <h1 className="text-4xl font-bold">{website.name}</h1>
                    <p className="text-lg text-gray-600">
                        {website.description}
                    </p>
                </div>
            </div>
        </div>
    );
}
