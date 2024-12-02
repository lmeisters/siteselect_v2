import { supabase } from "./supabase";

export async function getFeaturedWebsites() {
    const { data, error } = await supabase
        .from("websites")
        .select(
            `
      *,
      website_tags (
        tags (
          name
        )
      )
    `
        )
        .eq("is_featured", true);

    if (error) throw error;

    return data.map((website) => ({
        ...website,
        tags: website.website_tags.map((wt) => wt.tags.name),
    }));
}

export async function getWebsiteBySlug(slug) {
    const { data, error } = await supabase
        .from("websites")
        .select(
            `
      *,
      website_tags (
        tags (
          name
        )
      )
    `
        )
        .eq("slug", slug)
        .single();

    if (error) throw error;

    return {
        ...data,
        tags: data.website_tags.map((wt) => wt.tags.name),
    };
}

export async function getAllWebsites() {
    const { data, error } = await supabase.from("websites").select(`
      *,
      website_tags (
        tags (
          name
        )
      )
    `);

    if (error) throw error;

    return data.map((website) => ({
        ...website,
        tags: website.website_tags.map((wt) => wt.tags.name),
    }));
}

export async function searchWebsites({ query, type, tag, color }) {
    try {
        let supabaseQuery = supabase.from("websites").select(`
                *,
                website_tags!inner (
                    tags!inner (
                        name
                    )
                )
            `);

        if (query) {
            supabaseQuery = supabaseQuery.or(
                `name.ilike.%${query}%,description.ilike.%${query}%`
            );
        }

        if (type) {
            supabaseQuery = supabaseQuery.eq("type", type.toLowerCase());
        }

        if (color) {
            supabaseQuery = supabaseQuery.eq(
                "color_scheme",
                color.toLowerCase()
            );
        }

        if (tag) {
            supabaseQuery = supabaseQuery.eq(
                "website_tags.tags.name",
                tag.toLowerCase()
            );
        }

        const { data, error } = await supabaseQuery;

        if (error) throw error;

        const uniqueWebsites = Array.from(new Set(data.map((w) => w.id))).map(
            (id) => {
                const website = data.find((w) => w.id === id);
                return {
                    ...website,
                    tags: [
                        ...new Set(
                            website.website_tags.map((wt) => wt.tags.name)
                        ),
                    ],
                };
            }
        );

        return uniqueWebsites || [];
    } catch (error) {
        console.error("Search error:", error);
        throw error;
    }
}

export async function getFilterCounts() {
    try {
        const { data: typeData } = await supabase
            .from("websites")
            .select("type", { count: "exact" })
            .not("type", "is", null);

        const { data: colorData } = await supabase
            .from("websites")
            .select("color_scheme", { count: "exact" })
            .not("color_scheme", "is", null);

        const { data: tagData } = await supabase
            .from("website_tags")
            .select(
                `
        tags (
          name
        )
      `
            )
            .not("tags.name", "is", null);

        // Count occurrences of each type
        const typeCounts = typeData.reduce((acc, item) => {
            acc[item.type] = (acc[item.type] || 0) + 1;
            return acc;
        }, {});

        // Count occurrences of each color
        const colorCounts = colorData.reduce((acc, item) => {
            acc[item.color_scheme] = (acc[item.color_scheme] || 0) + 1;
            return acc;
        }, {});

        // Count occurrences of each tag
        const tagCounts = tagData.reduce((acc, item) => {
            const tagName = item.tags.name;
            acc[tagName] = (acc[tagName] || 0) + 1;
            return acc;
        }, {});

        return {
            types: typeCounts,
            colors: colorCounts,
            tags: tagCounts,
        };
    } catch (error) {
        console.error("Error getting filter counts:", error);
        throw error;
    }
}

export async function getSearchSuggestions(query) {
    if (!query || query.length < 2) return [];

    try {
        const { data, error } = await supabase
            .from("websites")
            .select(
                `
                id,
                name,
                website_tags (
                    tags (
                        name
                    )
                )
            `
            )
            .ilike("name", `%${query}%`)
            .limit(5);

        if (error) throw error;

        return data.map((website) => ({
            id: website.id,
            name: website.name,
            tags: website.website_tags
                .map((wt) => wt.tags.name)
                .filter(Boolean),
        }));
    } catch (error) {
        console.error("Suggestion error:", error);
        return [];
    }
}
