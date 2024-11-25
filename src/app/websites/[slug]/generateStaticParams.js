import { getAllWebsites } from "@/lib/api";

export async function generateStaticParams() {
    const websites = await getAllWebsites();

    return websites.map((website) => ({
        slug: website.slug,
    }));
}
