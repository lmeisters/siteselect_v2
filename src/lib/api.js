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
            ),
            website_colors (
                colors (
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
            const { data: coloredWebsites } = await supabase
                .from("website_colors")
                .select(
                    `
                    website_id,
                    colors!inner (
                        name
                    )
                `
                )
                .eq("colors.name", color);

            if (coloredWebsites?.length > 0) {
                const websiteIds = coloredWebsites.map((w) => w.website_id);
                supabaseQuery = supabaseQuery.in("id", websiteIds);
            } else {
                return [];
            }
        }

        if (tag) {
            const { data: taggedWebsites } = await supabase
                .from("website_tags")
                .select(
                    `
                    website_id,
                    tags!inner (
                        name
                    )
                `
                )
                .eq("tags.name", tag);

            if (taggedWebsites?.length > 0) {
                const websiteIds = taggedWebsites.map((w) => w.website_id);
                supabaseQuery = supabaseQuery.in("id", websiteIds);
            } else {
                return [];
            }
        }

        const { data, error } = await supabaseQuery;

        if (error) throw error;
        if (!data) return [];

        return data.map((website) => ({
            ...website,
            tags: [
                ...(website.website_tags?.map((wt) => wt.tags.name) || []),
                ...(website.website_colors?.map((wc) => wc.colors.name) || []),
            ],
        }));
    } catch (error) {
        console.error("Search error:", error);
        return [];
    }
}

export async function getFilterCounts() {
    try {
        const { data: typeData } = await supabase
            .from("websites")
            .select("type", { count: "exact" })
            .not("type", "is", null);

        const { data: colorData } = await supabase
            .from("website_colors")
            .select(
                `
                colors (
                    name
                )
            `
            )
            .not("colors.name", "is", null);

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
        const typeCounts =
            typeData?.reduce((acc, item) => {
                acc[item.type] = (acc[item.type] || 0) + 1;
                return acc;
            }, {}) || {};

        // Count occurrences of each color
        const colorCounts =
            colorData?.reduce((acc, item) => {
                const colorName = item.colors.name;
                acc[colorName] = (acc[colorName] || 0) + 1;
                return acc;
            }, {}) || {};

        // Count occurrences of each tag
        const tagCounts =
            tagData?.reduce((acc, item) => {
                const tagName = item.tags.name;
                acc[tagName] = (acc[tagName] || 0) + 1;
                return acc;
            }, {}) || {};

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
