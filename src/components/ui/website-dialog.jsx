"use client";

import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { WebsiteCard } from "@/components/ui/website-card";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export function WebsiteDialog({ website }) {
    const [isOpen, setIsOpen] = useState(false);
    const imagePath = `/images/${website.name
        .toLowerCase()
        .replace(/\s+/g, "-")}.webp`;

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <WebsiteCard
                name={website.name}
                href={website.href}
                tags={website.tags}
                onNameClick={() => setIsOpen(true)}
            />
            <DialogContent className="sm:max-w-3xl">
                <div className="flex items-center mb-4">
                    <a
                        href={website.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center text-foreground hover:text-gray-700"
                    >
                        <DialogTitle className="text-2xl font-bold">
                            {website.name}
                        </DialogTitle>
                        <ArrowUpRight className="ml-2 h-4 w-4 -mt-1 group-hover:text-gray-700 transition-all duration-300 transform group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" />
                    </a>
                </div>
                <DialogDescription className="text-lg text-gray-600 mb-4">
                    {website.description}
                </DialogDescription>
                <div className="flex flex-wrap gap-2 mb-6">
                    {website.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                    <Image
                        src={imagePath}
                        alt={`Screenshot of ${website.name}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 768px"
                        priority
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}
