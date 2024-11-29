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
        const supabaseQuery = supabase
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
            .limit(40);

        if (type) {
            supabaseQuery.ilike("type", `%${type}%`);
        }

        if (tag) {
            supabaseQuery.contains("website_tags.tags.name", [tag]);
        }

        if (color) {
            supabaseQuery.ilike("color_scheme", `%${color}%`);
        }

        if (query && !type && !tag && !color) {
            supabaseQuery.or(
                `name.ilike.%${query}%,description.ilike.%${query}%`
            );
        }

        const { data, error } = await supabaseQuery;

        if (error) {
            console.error("Supabase query error:", error);
            throw error;
        }

        if (!data) {
            return [];
        }

        return data.map((website) => ({
            ...website,
            tags: website.website_tags?.map((wt) => wt.tags?.name) || [],
        }));
    } catch (error) {
        console.error("Search error details:", error);
        return [];
    }
}
