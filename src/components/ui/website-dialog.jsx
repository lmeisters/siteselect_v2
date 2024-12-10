"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Layout,
    Palette,
    Brush,
    Briefcase,
    Activity,
    RefreshCcw,
    Code,
    X,
} from "lucide-react";
import Image from "next/image";
import { SEARCH_CATEGORIES } from "@/lib/constants";
import { getRefUrl } from "@/lib/utils/url";
import { formatDate } from "@/lib/utils/date";
import { useSearchStore } from "@/lib/search-store";

const WebsiteStructuredData = ({ website }) => {
    const jsonLd = {
        // Declares this is Schema.org structured data
        "@context": "https://schema.org",
        // Specifies this describes a website
        "@type": "WebSite",
        // Basic website information
        name: website.name,
        description: website.description,
        url: website.href,
        // Convert tag objects to strings if necessary
        keywords: website.tags
            .map((tag) => (typeof tag === "string" ? tag : tag.name))
            .join(", "),
        // Main image URL, converting site name to kebab-case for the filename
        image: `/images/${website.name
            .toLowerCase()
            .replace(/\s+/g, "-")}.webp`,

        // Publication and modification dates with fallback to current date
        datePublished: website.dateAdded || new Date().toISOString(),
        dateModified: website.lastUpdated || new Date().toISOString(),

        // Language code with English fallback
        inLanguage: website.language || "en",

        // Website creator information
        creator: {
            "@type": "Organization",
            name: website.creator || website.name,
            url: website.href,
        },

        // Information about who is publishing this structured data
        publisher: {
            "@type": "Organization",
            name: "SiteSelect",
            url: "https://siteselect.dev", // TODO change
            logo: {
                "@type": "ImageObject",
                url: "https://siteselect.dev/logo.png", //TODO change
            },
        },

        // Defines the primary action users can take (visiting the site)
        potentialAction: {
            "@type": "ViewAction",
            target: website.href,
        },

        // Additional metadata
        additionalType: website.type, // Category/type of the website
        award: website.awards || [], // Any awards the site has received
        thumbnailUrl: `/images/${website.name
            .toLowerCase()
            .replace(/\s+/g, "-")}.webp`, // Thumbnail image

        // Boolean properties about the website
        isAccessibleForFree: true, // Indicates the site is free to access
        isFamilyFriendly: true, // Indicates the content is family-friendly
    };

    // Renders the structured data as a JSON-LD script tag
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
};

const categoryIcons = {
    Types: Layout,
    Styles: Brush,
    Industries: Briefcase,
    Colors: Palette,
    Features: Activity,
    Layouts: RefreshCcw,
    Platforms: Code,
};

const allCategories = {
    Types: SEARCH_CATEGORIES.types,
    Styles: SEARCH_CATEGORIES.styles,
    Industries: SEARCH_CATEGORIES.industries,
    Colors: SEARCH_CATEGORIES.colors,
    Features: SEARCH_CATEGORIES.features,
    Layouts: SEARCH_CATEGORIES.layouts,
    Platforms: SEARCH_CATEGORIES.platforms,
};

export function WebsiteDialog({ website, isOpen, onClose, children }) {
    const [expandedCategories, setExpandedCategories] = useState({});
    const router = useRouter();
    const { resetSearch, setSearch } = useSearchStore();

    const handleTagClick = async (category, tag) => {
        // Map the plural category to singular search parameter
        const categoryMap = {
            Types: "type",
            Styles: "style",
            Industries: "industry",
            Colors: "color",
            Features: "feature",
            Layouts: "layout",
            Platforms: "platform",
        };

        const searchParam = categoryMap[category];

        if (!searchParam) return;

        // Reset other search parameters and set the selected one
        resetSearch();
        setSearch({ [searchParam]: tag.toLowerCase() });

        // Close the dialog
        if (typeof onClose === "function") {
            onClose();
        }

        // Navigate after state updates
        router.push(
            `/directory?${searchParam}=${encodeURIComponent(tag.toLowerCase())}`
        );
    };

    const getVisibleTags = (tags, category, maxRows = 2) => {
        if (!tags?.length) return [];
        if (expandedCategories[category]) return tags;

        const containerWidth = 256;
        const tagsPerRow = Math.floor(containerWidth / 100);
        const maxTags = tagsPerRow * maxRows;

        return tags.slice(0, maxTags);
    };

    const imagePath = `/images/${website.name
        .toLowerCase()
        .replace(/\s+/g, "-")}.webp`;

    const categorizedTags = {
        types: [],
        styles: [],
        industries: [],
        colors: [],
        features: [],
        layouts: [],
        platforms: [],
    };

    website.tags?.forEach((tag) => {
        // Handle tag whether it's a string or an object
        const tagName = typeof tag === "string" ? tag : tag.name;
        const category = typeof tag === "string" ? null : tag.category;

        // Categorize based on tag category if available, otherwise use the old logic
        if (category) {
            const categoryKey = `${category}s`.toLowerCase();
            if (categorizedTags[categoryKey]) {
                categorizedTags[categoryKey].push(tagName);
            }
        } else {
            if (SEARCH_CATEGORIES.types.includes(tagName)) {
                categorizedTags.types.push(tagName);
            } else if (SEARCH_CATEGORIES.styles.includes(tagName)) {
                categorizedTags.styles.push(tagName);
            } else if (SEARCH_CATEGORIES.industries.includes(tagName)) {
                categorizedTags.industries.push(tagName);
            } else if (SEARCH_CATEGORIES.colors.includes(tagName)) {
                categorizedTags.colors.push(tagName);
            } else if (SEARCH_CATEGORIES.features.includes(tagName)) {
                categorizedTags.features.push(tagName);
            } else if (SEARCH_CATEGORIES.layouts.includes(tagName)) {
                categorizedTags.layouts.push(tagName);
            } else if (SEARCH_CATEGORIES.platforms.includes(tagName)) {
                categorizedTags.platforms.push(tagName);
            }
        }
    });

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="w-[90vw] max-w-4xl p-0 rounded-xl h-[90vh] sm:h-auto overflow-hidden">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary z-50"
                >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </button>

                <WebsiteStructuredData website={website} />

                <div className="h-full overflow-y-auto p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                        <div className="flex-1">
                            <article className="website-details">
                                <header className="flex items-center justify-between mb-4">
                                    <div className="flex flex-col">
                                        <div className="flex items-center">
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
                                            </a>
                                        </div>
                                        <a
                                            href={getRefUrl(website.href)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-muted-foreground hover:text-foreground transition-colors mt-1"
                                        >
                                            {website.href}
                                        </a>
                                    </div>
                                </header>
                                <div className="space-y-4 mb-2">
                                    <DialogDescription className="text-lg text-muted-foreground">
                                        {website.description}
                                    </DialogDescription>
                                    <p className="text-sm text-muted-foreground">
                                        Last updated:{" "}
                                        {formatDate(
                                            website.lastUpdated || "2024-01-01"
                                        )}
                                    </p>
                                </div>
                                <figure className="relative w-full aspect-video rounded-lg overflow-hidden">
                                    <div className="absolute inset-0 bg-black/5 z-10" />
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

                        <div className="w-full sm:w-64 border-t sm:border-t-0 sm:border-l pt-4 sm:pt-0 sm:pl-6">
                            <h3 className="text-sm font-medium text-muted-foreground mb-4">
                                Categories & Tags
                            </h3>
                            <div className="space-y-4 pb-4 sm:pb-0">
                                {Object.entries(allCategories).map(
                                    ([category, items]) => {
                                        const relevantTags = items.filter(
                                            (item) =>
                                                website.tags
                                                    ?.map((t) =>
                                                        typeof t === "string"
                                                            ? t.toLowerCase()
                                                            : t.name.toLowerCase()
                                                    )
                                                    .includes(
                                                        item.toLowerCase()
                                                    )
                                        );

                                        if (relevantTags.length === 0)
                                            return null;

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
                                                    {getVisibleTags(
                                                        relevantTags,
                                                        category
                                                    ).map((tag) => (
                                                        <span
                                                            key={tag}
                                                            onClick={() =>
                                                                handleTagClick(
                                                                    category,
                                                                    tag
                                                                )
                                                            }
                                                            className="text-xs px-2 py-0.5 bg-secondary text-secondary-foreground rounded-md cursor-pointer hover:bg-primary/10 transition-colors"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                    {relevantTags.length >
                                                        getVisibleTags(
                                                            relevantTags,
                                                            category
                                                        ).length && (
                                                        <button
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                e.stopPropagation();
                                                                setExpandedCategories(
                                                                    (prev) => ({
                                                                        ...prev,
                                                                        [category]:
                                                                            !prev[
                                                                                category
                                                                            ],
                                                                    })
                                                                );
                                                            }}
                                                            className="text-xs px-2 py-0.5 bg-secondary text-secondary-foreground rounded-md cursor-pointer hover:bg-primary/10 transition-colors"
                                                        >
                                                            {expandedCategories[
                                                                category
                                                            ]
                                                                ? "−"
                                                                : `+${
                                                                      relevantTags.length -
                                                                      getVisibleTags(
                                                                          relevantTags,
                                                                          category
                                                                      ).length
                                                                  }`}
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
