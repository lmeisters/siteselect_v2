"use client";

import { useState, useEffect } from "react";
import { WebsiteDialog } from "@/components/ui/website-dialog";
import Image from "next/image";
import { ArrowUpRight, Info } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getRefUrl } from "@/lib/utils/url";

function getPriorityTags(tags = [], maxTags, searchedTag = null) {
    const priorityTags = [
        "Design",
        "Development",
        "Portfolio",
        "SaaS",
        "Mobile",
    ];

    const sortedTags = [...tags].sort((a, b) => {
        // If there's a searched tag, it should always come first
        if (searchedTag) {
            if (a.toLowerCase() === searchedTag.toLowerCase()) return -1;
            if (b.toLowerCase() === searchedTag.toLowerCase()) return 1;
        }

        const aIndex = priorityTags.indexOf(a);
        const bIndex = priorityTags.indexOf(b);
        if (aIndex === -1 && bIndex === -1) return 0;
        if (aIndex === -1) return 1;
        if (bIndex === -1) return -1;
        return aIndex - bIndex;
    });

    return sortedTags.slice(0, maxTags);
}

export function WebsiteCard({
    name,
    href,
    className,
    size = "default",
    tags = [],
    onNameClick,
    description,
    tag,
}) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const imagePath = `/images/${name.toLowerCase().replace(/\s+/g, "-")}.webp`;
    const hasImage = name !== "Featured Site";

    const getMaxTagsForSize = (screenWidth, componentSize) => {
        if (screenWidth < 640) {
            return 3;
        }

        const isLarge = screenWidth >= 768;
        if (componentSize === "featured") {
            return isLarge ? 12 : 8;
        }
        return isLarge ? 8 : 6;
    };

    const [visibleTags, setVisibleTags] = useState([]);

    useEffect(() => {
        const handleResize = () => {
            const maxTags = getMaxTagsForSize(window.innerWidth, size);
            setVisibleTags(getPriorityTags(tags, maxTags, tag));
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [size, tags, tag]);

    return (
        <>
            <div className="relative group/card">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsDialogOpen(true);
                        onNameClick?.();
                    }}
                    className={cn(
                        "z-20 bg-white rounded-2xl font-bold inline-flex items-center",
                        "transition-all duration-200 ease-out",
                        "absolute top-4 left-4",
                        size === "featured" ? "text-base" : "text-sm",
                        "px-3 py-1",
                        "group-hover/card:pr-7"
                    )}
                >
                    <span>{name}</span>
                    <Info
                        className={cn(
                            "absolute right-2",
                            "transition-all duration-200 ease-out",
                            "-translate-x-1 opacity-0 pointer-events-none",
                            "group-hover/card:translate-x-0 group-hover/card:opacity-100",
                            size === "featured" ? "w-4 h-4 ml-1" : "w-3.5 h-3.5"
                        )}
                    />
                </button>

                {isDialogOpen && (
                    <WebsiteDialog
                        isOpen={isDialogOpen}
                        onClose={() => {
                            setIsDialogOpen(false);
                        }}
                        website={{ name, href, description, tags }}
                    />
                )}

                <Link
                    href={getRefUrl(href)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                        "group block relative w-full overflow-hidden rounded-xl",
                        "bg-white/5 backdrop-blur-[2px] shadow-sm",
                        className
                    )}
                >
                    <div
                        className={cn(
                            "relative w-full",
                            size === "featured" ? "pb-[56.25%]" : "pb-[55%]"
                        )}
                    >
                        <div className="absolute inset-0">
                            {hasImage ? (
                                <>
                                    <div className="absolute inset-0 bg-black/5 z-10" />
                                    <Image
                                        src={imagePath}
                                        alt={name}
                                        fill
                                        priority={size === "featured"}
                                        className="object-cover transition-all duration-1000 ease-out group-hover:scale-110 group-hover:brightness-[0.90]"
                                        sizes={
                                            size === "featured"
                                                ? "(max-width: 768px) 100vw, 50vw"
                                                : "33vw"
                                        }
                                    />
                                </>
                            ) : (
                                <div className="w-full h-full bg-gray-100" />
                            )}
                        </div>

                        <div className="absolute inset-0 p-4">
                            <button
                                className={cn(
                                    "z-20 absolute bg-white p-1.5 rounded-full overflow-hidden",
                                    size === "featured"
                                        ? "top-4 right-4"
                                        : "top-4 right-4",
                                    "group/arrow"
                                )}
                            >
                                <ArrowUpRight
                                    className={cn(
                                        size === "featured"
                                            ? "h-4 w-4"
                                            : "h-3.5 w-3.5",
                                        "transition-all duration-100 ease-out",
                                        "transform group-hover:translate-x-4 group-hover:-translate-y-2",
                                        "motion-safe:group-hover:animate-[arrow-move_0.5s_ease-out_forwards]"
                                    )}
                                />
                            </button>

                            {visibleTags.length > 0 && (
                                <div
                                    className={cn(
                                        "absolute bottom-0 left-0 right-0",
                                        size === "featured" ? "p-4" : "p-3",
                                        "flex flex-wrap gap-2"
                                    )}
                                >
                                    {visibleTags.map((tag, index) => (
                                        <span
                                            key={`${tag}-${index}`}
                                            style={{
                                                "--enter-delay": `${
                                                    index * 50
                                                }ms`,
                                                "--exit-delay": `${
                                                    (visibleTags.length -
                                                        1 -
                                                        index) *
                                                    50
                                                }ms`,
                                            }}
                                            className={cn(
                                                "bg-white z-20 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-bold",
                                                "sm:opacity-0 sm:translate-y-5 sm:blur-md",
                                                "transition-all duration-300 ease-out",
                                                "sm:group-hover:[transition-delay:var(--enter-delay)]",
                                                "sm:group-hover:opacity-100 sm:group-hover:translate-y-0 sm:group-hover:blur-none",
                                                "sm:[transition-delay:var(--exit-delay)]"
                                            )}
                                        >
                                            {tag}
                                        </span>
                                    ))}

                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setIsDialogOpen(true);
                                        }}
                                        style={{
                                            "--enter-delay": `${
                                                visibleTags.length * 50
                                            }ms`,
                                            "--exit-delay": `0ms`,
                                        }}
                                        className={cn(
                                            "bg-white z-20 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-bold",
                                            "sm:opacity-0 sm:translate-y-5 sm:blur-md",
                                            "transition-all duration-300 ease-out",
                                            "sm:group-hover:[transition-delay:var(--enter-delay)]",
                                            "sm:group-hover:opacity-100 sm:group-hover:translate-y-0 sm:group-hover:blur-none",
                                            "sm:[transition-delay:var(--exit-delay)]",
                                            "hover:bg-white",
                                            "hover:scale-110",
                                            "active:scale-95",
                                            "transition-transform"
                                        )}
                                    >
                                        +
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </Link>
            </div>
        </>
    );
}
