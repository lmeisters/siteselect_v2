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
                    name,
                    category
                )
            )
        `);

        if (query) {
            supabaseQuery = supabaseQuery.or(
                `name.ilike.%${query}%,description.ilike.%${query}%`
            );
        }

        if (type) {
            supabaseQuery = supabaseQuery
                .eq("website_tags.tags.category", "type")
                .ilike("website_tags.tags.name", `%${type}%`);
        }

        if (tag) {
            supabaseQuery = supabaseQuery.ilike(
                "website_tags.tags.name",
                `%${tag}%`
            );
        }

        if (color) {
            supabaseQuery = supabaseQuery
                .eq("website_tags.tags.category", "color")
                .ilike("website_tags.tags.name", `%${color}%`);
        }

        const { data, error } = await supabaseQuery;

        if (error) throw error;
        if (!data) return [];

        return data.map((website) => ({
            ...website,
            tags: website.website_tags?.map((wt) => wt.tags.name) || [],
        }));
    } catch (error) {
        console.error("Search error:", error);
        return [];
    }
}

export async function getFilterCounts() {
    try {
        const { data: tagData } = await supabase
            .from("website_tags")
            .select(
                `
                tags (
                    name,
                    category
                )
            `
            )
            .not("tags.name", "eq", null);

        // Initialize counts object with all categories
        const counts = {
            types: {},
            styles: {},
            industries: {},
            colors: {},
            features: {},
            layouts: {},
            platforms: {},
        };

        // Count tags by category
        tagData?.forEach((item) => {
            const tag = item.tags;
            if (tag?.name && tag?.category) {
                const category = `${tag.category}s`; // Convert to plural form
                if (counts[category]) {
                    const normalizedName = tag.name.toLowerCase();
                    counts[category][normalizedName] =
                        (counts[category][normalizedName] || 0) + 1;
                }
            }
        });

        return counts;
    } catch (error) {
        console.error("Error getting filter counts:", error);
        return {
            types: {},
            styles: {},
            industries: {},
            colors: {},
            features: {},
            layouts: {},
            platforms: {},
        };
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
