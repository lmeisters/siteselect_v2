"use client";

import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    ArrowUpRight,
    Layout,
    Tag,
    Palette,
    Calendar,
    Globe,
} from "lucide-react";
import Image from "next/image";
import { SEARCH_CATEGORIES } from "@/lib/constants";
import { getRefUrl } from "@/lib/utils/url";
import { formatDate } from "@/lib/utils/date";

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
        // Comma-separated list of tags for SEO keywords
        keywords: website.tags.join(", "),
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
            url: "https://siteselect.dev",
            logo: {
                "@type": "ImageObject",
                url: "https://siteselect.dev/logo.png",
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
    Type: Layout,
    Tag: Tag,
    Color: Palette,
};

const allCategories = {
    Type: SEARCH_CATEGORIES.types,
    Tag: SEARCH_CATEGORIES.tags,
    Color: SEARCH_CATEGORIES.colors,
};

export function WebsiteDialog({ website, isOpen, onClose, children }) {
    const imagePath = `/images/${website.name
        .toLowerCase()
        .replace(/\s+/g, "-")}.webp`;

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
            <DialogContent className="sm:max-w-4xl">
                <WebsiteStructuredData website={website} />
                <div className="flex gap-6">
                    <div className="flex-1">
                        <article className="website-details">
                            <header className="flex items-center justify-between mb-4">
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
                                        <ArrowUpRight className="ml-2 h-4 w-4 -mt-1 group-hover:text-gray-700 transition-all duration-300 transform group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" />
                                    </a>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    {website.dateAdded && (
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4" />
                                            <span>
                                                Added{" "}
                                                {formatDate(website.dateAdded)}
                                            </span>
                                        </div>
                                    )}
                                    {website.language && (
                                        <div className="flex items-center gap-1">
                                            <Globe className="h-4 w-4" />
                                            <span>{website.language}</span>
                                        </div>
                                    )}
                                </div>
                            </header>
                            <DialogDescription className="text-lg text-muted-foreground mb-6">
                                {website.description}
                            </DialogDescription>
                            <figure className="relative w-full aspect-video rounded-lg overflow-hidden mb-6">
                                <Image
                                    src={imagePath}
                                    alt={`Screenshot of ${website.name}'s homepage`}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 768px"
                                    priority
                                />
                            </figure>
                            {website.features && (
                                <div className="mt-6">
                                    <h3 className="text-lg font-semibold mb-2">
                                        Key Features
                                    </h3>
                                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                        {website.features.map(
                                            (feature, index) => (
                                                <li key={index}>{feature}</li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            )}
                        </article>
                    </div>
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
