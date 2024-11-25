import { createClient } from "@supabase/supabase-js";

//test

const websites = [
    {
        name: "Awwwards",
        slug: "awwwards",
        href: "https://www.awwwards.com/",
        description:
            "Awwwards showcases and recognizes the world's top web designers, developers, and creative agencies, celebrating excellence in web design and development.",
        is_featured: true,
        tags: [
            "Design",
            "E-Commerce",
            "Interactive",
            "Awards",
            "Design Agencies",
            "Realworld",
            "Jobs",
            "Courses",
            "Creators",
            "Active",
            "Free",
        ],
    },
    {
        name: "Godly",
        slug: "godly",
        href: "https://godly.website/",
        description:
            "Godly offers the best web design inspiration, showcasing top-tier creativity in digital design and technology for web and mobile applications.",
        is_featured: true,
        tags: [
            "Design",
            "Agency",
            "Technology",
            "Realworld",
            "Active",
            "Free",
            "E-commerce",
            "Web App",
            "Mobile App",
            "Portfolio",
        ],
    },
    {
        name: "Browsing Mode",
        slug: "browsing-mode",
        href: "https://browsingmode.com/",
        description:
            "Browsing Mode features a curated selection of websites known for their outstanding design and functionality, offering inspiration across e-commerce, fashion, and technology sectors.",
        is_featured: false,
        tags: [
            "E-commerce",
            "Fashion",
            "Technology",
            "Food & Drink",
            "Realworld",
            "Active",
            "Free",
            "Agency",
        ],
    },
    {
        name: "Site Inspire",
        slug: "site-inspire",
        href: "https://www.siteinspire.com/",
        description:
            "Site Inspire is a curated showcase of outstanding web design, featuring diverse examples across design, portfolio, and technology sectors for creative inspiration.",
        is_featured: false,
        tags: [
            "E-commerce",
            "Fashion",
            "Portfolio",
            "Realworld",
            "Creators",
            "Active",
            "Free",
        ],
    },
    {
        name: "Minimal Gallery",
        slug: "minimal-gallery",
        href: "https://minimal.gallery/",
        description:
            "Minimal Gallery showcases beautifully designed and highly functional websites, focusing on minimalist aesthetics and creative portfolios across various industries.",
        is_featured: false,
        tags: [
            "Design",
            "Photography",
            "Portfolio",
            "E-commerce",
            "Realworld",
            "Templates",
            "Jobs",
            "Tools",
            "Active",
            "Free",
        ],
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
