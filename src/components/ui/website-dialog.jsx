"use client";

import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { SEARCH_CATEGORIES } from "@/lib/constants";

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

export function WebsiteDialog({ website, isOpen, onClose, children }) {
    const imagePath = `/images/${website.name
        .toLowerCase()
        .replace(/\s+/g, "-")}.webp`;

    // Flatten all categories into a single array for easier lookup
    const allCategories = {
        Type: SEARCH_CATEGORIES.types,
        Tag: SEARCH_CATEGORIES.tags,
        Color: SEARCH_CATEGORIES.colors,
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-4xl">
                <WebsiteStructuredData website={website} />
                <div className="flex gap-6">
                    {/* Main Content */}
                    <div className="flex-1">
                        <article className="website-details">
                            <header className="flex items-center mb-4">
                                <a
                                    href={website.href}
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
                        <div className="space-y-6">
                            {Object.entries(allCategories).map(
                                ([category, items]) => {
                                    const relevantTags = items.filter((item) =>
                                        website.tags
                                            ?.map((t) => t.toLowerCase())
                                            .includes(item.toLowerCase())
                                    );

                                    if (relevantTags.length === 0) return null;

                                    return (
                                        <div key={category}>
                                            <h4 className="text-sm font-medium mb-2">
                                                {category}
                                            </h4>
                                            <ul className="space-y-2">
                                                {relevantTags.map((tag) => (
                                                    <li key={tag}>
                                                        <span className="text-sm px-2.5 py-1 bg-secondary text-secondary-foreground rounded-md inline-block">
                                                            {tag}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
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
