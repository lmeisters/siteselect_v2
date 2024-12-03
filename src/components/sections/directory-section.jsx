"use client";

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
    Banknote,
    Lock,
    Github,
    Brain,
    Brush,
    ChartBar,
    Code,
    Briefcase,
    User,
    Portfolio,
} from "lucide-react";

const COMMON_TAGS = [
    { id: "active", label: "Active", icon: Activity },
    { id: "recently-updated", label: "Recently Updated", icon: Clock },
    { id: "free", label: "Free", icon: Lock },
    { id: "paid", label: "Paid", icon: Banknote },
    { id: "ai", label: "AI", icon: Brain },
    { id: "design", label: "Design", icon: Brush },
    { id: "marketing", label: "Marketing", icon: ChartBar },
    { id: "development", label: "Development", icon: Code },
    { id: "business", label: "Business", icon: Briefcase },
    { id: "portfolio", label: "Personal", icon: User },
];

export function DirectorySection() {
    const [websites, setWebsites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { query, type, tag, color, setSearch } = useSearchStore();

    const handleCategorySelect = (category, value) => {
        setSearch({ [category]: value });
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
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl font-medium">Directory</h1>
                <div className="flex gap-2">
                    {COMMON_TAGS.map((commonTag) => {
                        const Icon = commonTag.icon;
                        return (
                            <button
                                key={commonTag.id}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleCategorySelect("tag", commonTag.id);
                                }}
                                className={cn(
                                    "px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200",
                                    "bg-secondary hover:bg-secondary/80",
                                    "border border-border/50",
                                    "flex items-center gap-1.5",
                                    "text-muted-foreground hover:text-foreground",
                                    tag === commonTag.id &&
                                        "bg-primary text-primary-foreground hover:text-primary-foreground"
                                )}
                            >
                                <Icon className="h-3.5 w-3.5" />
                                {commonTag.label}
                            </button>
                        );
                    })}
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
