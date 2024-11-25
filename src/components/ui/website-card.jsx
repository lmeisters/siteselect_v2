"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function WebsiteCard({
    name,
    href,
    className,
    size = "default",
    tags = [],
    slug,
}) {
    const imagePath = `/images/${name.toLowerCase().replace(".com", "")}.webp`;
    const hasImage = name !== "Featured Site";
    const CardWrapper = slug ? Link : "div";
    const wrapperProps = slug ? { href: `/websites/${slug}` } : {};

    const handleExternalClick = (e) => {
        e.stopPropagation();
        window.open(href, "_blank", "noopener,noreferrer");
    };

    return (
        <CardWrapper
            {...wrapperProps}
            className={cn(
                "group block relative w-full overflow-hidden rounded-xl",
                className
            )}
        >
            {/* Aspect ratio container */}
            <div
                className={cn(
                    "relative w-full",
                    size === "featured" ? "pb-[56.25%]" : "pb-[75%]"
                )}
            >
                {/* Image container */}
                <div className="absolute inset-0 w-full h-full">
                    {hasImage ? (
                        <Image
                            src={imagePath}
                            alt={name}
                            fill
                            priority={size === "featured"}
                            className="object-cover transition-all duration-1000 ease-out group-hover:scale-110 group-hover:brightness-[0.85]"
                            sizes={
                                size === "featured"
                                    ? "(max-width: 768px) 100vw, 50vw"
                                    : "33vw"
                            }
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-100" />
                    )}
                </div>

                {/* Content overlay */}
                <div className="absolute inset-0 p-4">
                    <div
                        className={cn(
                            "bg-white px-3 py-1 rounded-2xl text-sm font-bold inline-block",
                            size === "featured" ? "text-base" : "text-sm"
                        )}
                    >
                        {name}
                    </div>

                    <button
                        onClick={handleExternalClick}
                        className={cn(
                            "absolute bg-white p-1.5 rounded-full overflow-hidden",
                            size === "featured"
                                ? "top-4 right-4"
                                : "top-4 right-4"
                        )}
                    >
                        <ArrowUpRight
                            className={cn(
                                size === "featured" ? "h-4 w-4" : "h-3.5 w-3.5",
                                "group-hover:animate-arrow-exit"
                            )}
                        />
                    </button>

                    {tags?.length > 0 && (
                        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </CardWrapper>
    );
}
