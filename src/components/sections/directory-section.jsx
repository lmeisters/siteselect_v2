"use client";

import { Suspense } from "react";
import { WebsiteCard } from "@/components/ui/website-card";
import { WebsiteDialog } from "@/components/ui/website-dialog";
import { useSearchStore } from "@/lib/search-store";
import { useEffect, useState } from "react";
import { searchWebsites } from "@/lib/api";
import { SectionLayout } from "@/components/layouts/section-layout";
import { cn } from "@/lib/utils";
import {
    Activity,
    Clock,
    Lock,
    Brush,
    Code,
    Briefcase,
    Smartphone,
    RefreshCcw,
} from "lucide-react";

const COMMON_TAGS = [
    // Primary categories
    { id: "design", label: "Design", icon: Brush },
    { id: "development", label: "Development", icon: Code },
    { id: "portfolio", label: "Portfolio", icon: Briefcase },

    // Product types
    { id: "saas", label: "SaaS", icon: RefreshCcw },
    { id: "mobile", label: "Mobile", icon: Smartphone },

    // Status/attributes
    { id: "active", label: "Active", icon: Activity },
    { id: "recently-updated", label: "Recently Updated", icon: Clock },
    { id: "free", label: "Free", icon: Lock },
];

function DirectoryContent() {
    const [websites, setWebsites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { query, type, tag, color, setSearch } = useSearchStore();

    const handleCategorySelect = (category, value) => {
        setSearch({
            [category]: tag === value ? undefined : value,
        });
    };

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
            <div className="flex flex-row mb-6 gap-4 items-center justify-between">
                <h1 className="text-xl font-medium">Directory</h1>
                <div className="relative w-full sm:w-auto overflow-x-auto">
                    <div className="flex gap-2 overflow-x-auto scrollbar-hide relative">
                        {COMMON_TAGS.map((commonTag) => {
                            const Icon = commonTag.icon;
                            return (
                                <button
                                    key={commonTag.id}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleCategorySelect(
                                            "tag",
                                            commonTag.id
                                        );
                                    }}
                                    className={cn(
                                        "px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200",
                                        "bg-secondary whitespace-nowrap",
                                        "border border-border/50",
                                        "flex items-center gap-1.5",
                                        "text-muted-foreground",
                                        tag === commonTag.id
                                            ? "bg-primary text-primary-foreground"
                                            : "hover:bg-secondary/80 hover:text-foreground"
                                    )}
                                >
                                    <Icon className="h-3.5 w-3.5" />
                                    {commonTag.label}
                                </button>
                            );
                        })}
                    </div>
                    <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-background to-transparent pointer-events-none sm:hidden" />
                    <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-background to-transparent pointer-events-none sm:hidden" />
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
                                    tags={
                                        tag
                                            ? [
                                                  tag,
                                                  ...(
                                                      website.tags || []
                                                  ).filter((t) => t !== tag),
                                              ]
                                            : website.tags
                                    }
                                />
                            </div>
                        </WebsiteDialog>
                    ))}
                </div>
            )}
        </SectionLayout>
    );
}

export function DirectorySection() {
    return (
        <Suspense fallback={<DirectoryFallback />}>
            <DirectoryContent />
        </Suspense>
    );
}

function DirectoryFallback() {
    return (
        <SectionLayout>
            <div className="flex flex-row mb-6 gap-4 items-center justify-between">
                <h1 className="text-xl font-medium">Directory</h1>
                <div className="animate-pulse h-10 w-full sm:w-[400px] bg-muted rounded-lg" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="h-[300px] rounded-xl bg-muted animate-pulse"
                    />
                ))}
            </div>
        </SectionLayout>
    );
}
