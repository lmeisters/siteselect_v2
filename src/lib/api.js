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
                website_tags (
                    tags (
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
            supabaseQuery = supabaseQuery.eq("type", type);
        }

        if (color) {
            supabaseQuery = supabaseQuery.eq("color_scheme", color);
        }

        if (tag) {
            supabaseQuery = supabaseQuery.contains("tags", [tag]);
        }

        const { data, error } = await supabaseQuery;

        if (error) throw error;

        return (
            data?.map((website) => ({
                ...website,
                tags: website.website_tags?.map((wt) => wt.tags?.name) || [],
            })) || []
        );
    } catch (error) {
        console.error("Search error:", error);
        throw error;
    }
}
