"use client";

import { WebsiteCard } from "@/components/ui/website-card";
import { WebsiteDialog } from "@/components/ui/website-dialog";
import { useEffect, useState } from "react";
import { searchWebsites } from "@/lib/api";
import { SectionLayout } from "@/components/layouts/section-layout";
import { useSearchStore } from "@/lib/search-store";

export function SearchResultsSection() {
    const {
        query,
        type,
        style,
        industry,
        color,
        feature,
        layout,
        platform,
        resetSearch,
    } = useSearchStore();

    const [websites, setWebsites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchWebsites() {
            setIsLoading(true);
            try {
                const searchParams = {
                    query,
                    type,
                    style,
                    industry,
                    color,
                    feature,
                    layout,
                    platform,
                };
                const results = await searchWebsites(searchParams);
                setWebsites(results);
            } catch (error) {
                console.error("Error fetching websites:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchWebsites();
    }, [query, type, style, industry, color, feature, layout, platform]);

    return (
        <SectionLayout>
            <div>
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
                    {(query ||
                        type ||
                        style ||
                        industry ||
                        color ||
                        feature ||
                        layout ||
                        platform) && (
                        <button
                            onClick={resetSearch}
                            className="px-2 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
                        >
                            Reset Filters
                        </button>
                    )}
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className="h-[300px] rounded-xl bg-muted animate-pulse"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {websites.map((website) => (
                            <WebsiteCard
                                key={website.id}
                                name={website.name}
                                href={website.href}
                                tags={website.tags}
                                description={website.description}
                                tag={style}
                            />
                        ))}
                    </div>
                )}
            </div>
        </SectionLayout>
    );
}
