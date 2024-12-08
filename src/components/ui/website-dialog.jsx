"use client";

import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowUpRight, Layout, Tag, Palette } from "lucide-react";
import Image from "next/image";
import { SEARCH_CATEGORIES } from "@/lib/constants";
import { getRefUrl } from "@/lib/utils/url";

const WebsiteStructuredData = ({ website }) => {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: website.name,
        description: website.description,
        url: website.href,
        keywords: website.tags.join(", "),
        image: `/images/${website.name
            .toLowerCase()
            .replace(/\s+/g, "-")}.webp`,
        datePublished: new Date().toISOString(),
        publisher: {
            "@type": "Organization",
            name: "SiteSelect",
            url: "https://siteselect.dev",
        },
        inLanguage: "en",
        potentialAction: {
            "@type": "ViewAction",
            target: website.href,
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
};

// ... existing imports ...

const categoryIcons = {
    Type: Layout,
    Tag: Tag,
    Color: Palette,
};

// Add this mapping from SEARCH_CATEGORIES
const allCategories = {
    Type: SEARCH_CATEGORIES.types,
    Tag: SEARCH_CATEGORIES.tags,
    Color: SEARCH_CATEGORIES.colors,
};

export function WebsiteDialog({ website, isOpen, onClose, children }) {
    const imagePath = `/images/${website.name
        .toLowerCase()
        .replace(/\s+/g, "-")}.webp`;

    // Group tags by category based on SEARCH_CATEGORIES
    const categorizedTags = {
        types: [],
        tags: [],
        colors: [],
    };

    website.tags?.forEach((tag) => {
        if (SEARCH_CATEGORIES.types.includes(tag)) {
            categorizedTags.types.push(tag);
        } else if (SEARCH_CATEGORIES.colors.includes(tag)) {
            categorizedTags.colors.push(tag);
        } else if (SEARCH_CATEGORIES.tags.includes(tag)) {
            categorizedTags.tags.push(tag);
        }
    });

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-3xl">
                <WebsiteStructuredData website={website} />
                <div className="flex gap-6">
                    {/* Main Content */}
                    <div className="flex-1">
                        <article className="website-details">
                            <header className="flex items-center mb-4">
                                <a
                                    href={getRefUrl(website.href)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center text-foreground hover:text-gray-700"
                                    aria-label={`Visit ${website.name} website`}
                                >
                                    <DialogTitle className="text-2xl font-bold">
                                        {website.name}
                                    </DialogTitle>
                                    <ArrowUpRight className="ml-2 h-4 w-4 -mt-1 group-hover:text-gray-700 transition-all duration-300 transform group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" />
                                </a>
                            </header>
                            <DialogDescription className="text-lg text-muted-foreground mb-6">
                                {website.description}
                            </DialogDescription>
                            <figure className="relative w-full aspect-video rounded-lg overflow-hidden">
                                <Image
                                    src={imagePath}
                                    alt={`Screenshot of ${website.name}'s homepage`}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 768px"
                                    priority
                                />
                            </figure>
                        </article>
                    </div>

                    {/* Sidebar */}
                    <div className="w-64 border-l pl-6">
                        <h3 className="text-sm font-medium text-muted-foreground mb-4">
                            Categories & Tags
                        </h3>
                        <div className="space-y-4">
                            {Object.entries(allCategories).map(
                                ([category, items]) => {
                                    const relevantTags = items.filter((item) =>
                                        website.tags
                                            ?.map((t) => t.toLowerCase())
                                            .includes(item.toLowerCase())
                                    );

                                    if (relevantTags.length === 0) return null;

                                    const Icon = categoryIcons[category];

                                    return (
                                        <div key={category}>
                                            <div className="flex items-center gap-2 mb-2">
                                                <Icon className="h-4 w-4 text-muted-foreground" />
                                                <h4 className="text-sm font-medium capitalize">
                                                    {category}
                                                </h4>
                                            </div>
                                            <div className="flex flex-wrap gap-1.5">
                                                {relevantTags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="text-xs px-2 py-0.5 bg-secondary text-secondary-foreground rounded-md"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
