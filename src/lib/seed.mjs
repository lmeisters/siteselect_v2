import { supabase } from "./supabase";

const websites = [
    {
        name: "Awwwards.com",
        slug: "awwwards",
        href: "https://awwwards.com",
        description:
            "The awards of design, creativity and innovation on the internet",
        is_featured: true,
        tags: ["Active", "Free", "Portfolio"],
    },
    {
        name: "Featured Site",
        slug: "featured-site",
        href: "#",
        description: "Example featured site",
        is_featured: true,
        tags: ["React", "Next.js", "Tailwind"],
    },
];

async function seedDatabase() {
    // First, insert all unique tags
    const uniqueTags = [...new Set(websites.flatMap((site) => site.tags))];
    const { data: tagData, error: tagError } = await supabase
        .from("tags")
        .upsert(
            uniqueTags.map((name) => ({ name })),
            { onConflict: "name" }
        )
        .select();

    if (tagError) {
        console.error("Error inserting tags:", tagError);
        return;
    }

    // Create a map of tag names to their IDs
    const tagMap = tagData.reduce(
        (acc, tag) => ({
            ...acc,
            [tag.name]: tag.id,
        }),
        {}
    );

    // Insert websites
    for (const website of websites) {
        const { tags, ...websiteData } = website;

        // Insert website
        const { data: siteData, error: siteError } = await supabase
            .from("websites")
            .upsert([websiteData], { onConflict: "slug" })
            .select()
            .single();

        if (siteError) {
            console.error("Error inserting website:", siteError);
            continue;
        }

        // Insert website_tags relations
        const websiteTagRelations = tags.map((tagName) => ({
            website_id: siteData.id,
            tag_id: tagMap[tagName],
        }));

        const { error: relationError } = await supabase
            .from("website_tags")
            .upsert(websiteTagRelations);

        if (relationError) {
            console.error("Error inserting website_tags:", relationError);
        }
    }
}

seedDatabase();
