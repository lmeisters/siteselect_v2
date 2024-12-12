"use client";

import { Suspense } from "react";
import { WebsiteCard } from "@/components/ui/website-card";
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
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 9; // 3x3 grid
    const { query, type, tag, color, setSearch } = useSearchStore();

    const handleCategorySelect = (category, value) => {
        setSearch({
            [category]: value === type ? undefined : value,
        });
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    useEffect(() => {
        async function fetchWebsites() {
            setIsLoading(true);
            try {
                const searchParams = { query, type, tag, color };
                const results = await searchWebsites(searchParams);
                setWebsites(results);
                setTotalPages(Math.ceil(results.length / itemsPerPage));
                setCurrentPage(1); // Reset to first page on new search
            } catch (error) {
                console.error("Error fetching websites:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchWebsites();
    }, [query, type, tag, color]);

    const paginatedWebsites = websites.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <SectionLayout>
            <div className="flex flex-row mb-6 gap-4 items-center justify-between">
                <h1 className="text-xl font-medium">Directory</h1>
                <div className="relative w-full sm:w-auto overflow-x-auto">
                    <div className="flex gap-1.5 overflow-x-auto scrollbar-hide relative">
                        {COMMON_TAGS.map((commonTag) => {
                            const Icon = commonTag.icon;
                            return (
                                <button
                                    key={commonTag.id}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleCategorySelect(
                                            "type",
                                            commonTag.id
                                        );
                                    }}
                                    className={cn(
                                        "px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200",
                                        "bg-secondary whitespace-nowrap",
                                        "border border-border/50",
                                        "flex items-center gap-1.5",
                                        "text-muted-foreground",
                                        type === commonTag.id
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 h-fit lg:min-h-[900px]">
                    {[...Array(9)].map((_, i) => (
                        <div
                            key={i}
                            className="h-[300px] rounded-xl bg-gradient-to-r from-muted via-muted/30 to-muted bg-[length:200%_100%] animate-shimmer-dark"
                        />
                    ))}
                </div>
            ) : websites.length === 0 ? (
                <div className="h-fit lg:min-h-[900px] flex flex-col items-center justify-center py-32 text-center">
                    <p className="text-lg font-medium text-muted-foreground">
                        No matching websites found
                    </p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 h-fit lg:min-h-[900px]">
                        {paginatedWebsites.map((website) => (
                            <WebsiteCard
                                key={website.id}
                                name={website.name}
                                href={website.href}
                                tags={website.tags}
                                description={website.description}
                            />
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-8">
                            <button
                                onClick={() =>
                                    handlePageChange(currentPage - 1)
                                }
                                disabled={currentPage === 1}
                                className="w-8 h-8 flex items-center justify-center rounded-lg border border-border/50 bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground disabled:opacity-50 disabled:pointer-events-none"
                                aria-label="Previous page"
                            >
                                ←
                            </button>

                            <div className="flex items-center gap-2">
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handlePageChange(i + 1)}
                                        className={cn(
                                            "w-8 h-8 rounded-lg text-sm font-medium transition-colors",
                                            "border border-border/50",
                                            currentPage === i + 1
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                                        )}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() =>
                                    handlePageChange(currentPage + 1)
                                }
                                disabled={currentPage === totalPages}
                                className="w-8 h-8 flex items-center justify-center rounded-lg border border-border/50 bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground disabled:opacity-50 disabled:pointer-events-none"
                                aria-label="Next page"
                            >
                                →
                            </button>
                        </div>
                    )}
                </>
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
                {[...Array(9)].map((_, i) => (
                    <div
                        key={i}
                        className="h-[300px] rounded-xl bg-muted animate-pulse"
                    />
                ))}
            </div>
        </SectionLayout>
    );
}
