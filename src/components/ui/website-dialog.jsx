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

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-3xl">
                <WebsiteStructuredData website={website} />
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
                    <DialogDescription className="text-lg text-gray-600 mb-4">
                        {website.description}
                    </DialogDescription>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {website.tags?.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-lg"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
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
            </DialogContent>
        </Dialog>
    );
}
