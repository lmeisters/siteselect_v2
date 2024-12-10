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

export async function searchWebsites({
    query,
    type,
    style,
    industry,
    color,
    feature,
    layout,
    platform,
}) {
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

        // Handle general search query
        if (query) {
            const { data: taggedWebsites } = await supabase
                .from("website_tags")
                .select(`website_id, tags!inner(name)`)
                .ilike("tags.name", `%${query}%`);

            const websiteIds = taggedWebsites?.map((w) => w.website_id) || [];
            supabaseQuery = supabaseQuery.or(
                `name.ilike.%${query}%,description.ilike.%${query}%,id.in.(${websiteIds.join(
                    ","
                )})`
            );
        }

        // Map of parameter names to their corresponding categories in the database
        const categoryMap = {
            type: "type",
            style: "style",
            industry: "industry",
            color: "color",
            feature: "feature",
            layout: "layout",
            platform: "platform",
        };

        // Handle all category-based filters
        for (const [param, category] of Object.entries(categoryMap)) {
            if (eval(param)) {
                // Using eval to dynamically access the parameter
                const { data: taggedWebsites } = await supabase
                    .from("website_tags")
                    .select(
                        `
                        website_id,
                        tags!inner (
                            name,
                            category
                        )
                    `
                    )
                    .eq("tags.category", category)
                    .ilike("tags.name", `%${eval(param)}%`);

                if (taggedWebsites?.length > 0) {
                    const websiteIds = taggedWebsites.map((w) => w.website_id);
                    supabaseQuery = supabaseQuery.in("id", websiteIds);
                } else {
                    return [];
                }
            }
        }

        const { data, error } = await supabaseQuery;

        if (error) throw error;
        if (!data) return [];

        return data.map((website) => ({
            ...website,
            tags: [
                ...new Set(
                    website.website_tags?.map((wt) => wt.tags.name) || []
                ),
            ],
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
