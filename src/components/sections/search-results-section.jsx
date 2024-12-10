"use client";

import { WebsiteCard } from "@/components/ui/website-card";
import { WebsiteDialog } from "@/components/ui/website-dialog";
import { useEffect, useState } from "react";
import { searchWebsites } from "@/lib/api";
import { SectionLayout } from "@/components/layouts/section-layout";
import { SEARCH_CATEGORIES } from "@/lib/constants";
import { useSearchStore } from "@/lib/search-store";

export function SearchResultsSection() {
    const { query, type, tag, color, setSearch, resetSearch } =
        useSearchStore();
    const [websites, setWebsites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchWebsites() {
            setIsLoading(true);
            try {
                const searchParams = { query, type, tag, color };
                const results = await searchWebsites(searchParams);
                setWebsites(results);
            } catch (error) {
                console.error("Error fetching websites:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchWebsites();
    }, [query, type, tag, color]);

    const handleCategorySelect = (category, value) => {
        setSearch({ [category]: value.toLowerCase() });
    };

    return (
        <SectionLayout>
            <div className="flex gap-8">
                {/* Main Content */}
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">
                                Search Results
                            </h1>
                            <p className="text-muted-foreground mt-1">
                                Found {websites.length} websites matching your
                                criteria
                            </p>
                        </div>
                        {(query || type || tag || color) && (
                            <button
                                onClick={() => resetSearch()}
                                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
                            >
                                Reset Filters
                            </button>
                        )}
                    </div>

                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[...Array(6)].map((_, i) => (
                                <div
                                    key={i}
                                    className="h-[300px] rounded-xl bg-muted animate-pulse"
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {websites.map((website) => (
                                <WebsiteDialog
                                    key={website.id}
                                    website={{
                                        ...website,
                                        tags: tag
                                            ? [
                                                  tag,
                                                  ...(
                                                      website.tags || []
                                                  ).filter(
                                                      (t) =>
                                                          t.toLowerCase() !==
                                                          tag.toLowerCase()
                                                  ),
                                              ]
                                            : website.tags,
                                    }}
                                >
                                    <div className="cursor-pointer">
                                        <WebsiteCard
                                            name={website.name}
                                            href={website.href}
                                            tags={
                                                tag
                                                    ? [
                                                          tag,
                                                          ...(
                                                              website.tags || []
                                                          ).filter(
                                                              (t) =>
                                                                  t.toLowerCase() !==
                                                                  tag.toLowerCase()
                                                          ),
                                                      ]
                                                    : website.tags
                                            }
                                            description={website.description}
                                        />
                                    </div>
                                </WebsiteDialog>
                            ))}
                        </div>
                    )}
                </div>

                {/* Sidebar Categories */}
                <div className="w-64 space-y-6">
                    <div className="sticky top-24">
                        {Object.entries(SEARCH_CATEGORIES).map(
                            ([category, items]) => (
                                <div key={category} className="mb-6">
                                    <h3 className="text-sm font-medium text-muted-foreground mb-3 capitalize">
                                        {category}
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {items.map((item) => {
                                            const isSelected =
                                                (category === "types" &&
                                                    type?.toLowerCase() ===
                                                        item.toLowerCase()) ||
                                                (category === "tags" &&
                                                    tag?.toLowerCase() ===
                                                        item.toLowerCase()) ||
                                                (category === "colors" &&
                                                    color?.toLowerCase() ===
                                                        item.toLowerCase());

                                            return (
                                                <button
                                                    key={item}
                                                    onClick={() =>
                                                        handleCategorySelect(
                                                            category.slice(
                                                                0,
                                                                -1
                                                            ),
                                                            item
                                                        )
                                                    }
                                                    className={`text-xs px-2 py-1 rounded-md transition-colors ${
                                                        isSelected
                                                            ? "bg-primary text-primary-foreground"
                                                            : "bg-secondary hover:bg-secondary/80"
                                                    }`}
                                                >
                                                    {item}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </SectionLayout>
    );
}
