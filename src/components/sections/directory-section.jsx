"use client";

import { WebsiteCard } from "@/components/ui/website-card";
import { WebsiteDialog } from "@/components/ui/website-dialog";
import { useSearchStore } from "@/lib/search-store";
import { useEffect, useState } from "react";
import { searchWebsites } from "@/lib/api";
import { SectionLayout } from "@/components/layouts/section-layout";

export function DirectorySection() {
    const [websites, setWebsites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { query, type, tag, color } = useSearchStore();

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

    return (
        <SectionLayout>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Directory
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Browse our curated collection of {websites.length}{" "}
                        website designs
                    </p>
                </div>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {websites.map((website) => (
                        <WebsiteDialog key={website.id} website={website}>
                            <div className="cursor-pointer">
                                <WebsiteCard
                                    name={website.name}
                                    href={website.href}
                                    tags={website.tags}
                                />
                            </div>
                        </WebsiteDialog>
                    ))}
                </div>
            )}
        </SectionLayout>
    );
}
