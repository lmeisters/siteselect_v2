"use client";

import Image from "next/image";
import { ArrowUpRight, Info } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function WebsiteCard({
    name,
    href,
    className,
    size = "default",
    tags = [],
    onNameClick,
}) {
    const imagePath = `/images/${name.toLowerCase().replace(/\s+/g, "-")}.webp`;
    const hasImage = name !== "Featured Site";

    return (
        <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                "group block relative w-full overflow-hidden rounded-xl",
                className
            )}
        >
            {/* Aspect ratio container */}
            <div
                className={cn(
                    "relative w-full",
                    size === "featured" ? "pb-[56.25%]" : "pb-[55%]"
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
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            onNameClick?.();
                        }}
                        className={cn(
                            "bg-white px-3 py-1 rounded-2xl text-sm font-bold inline-flex items-center",
                            "transition-all duration-200 ease-out",
                            "group/info relative",
                            size === "featured" ? "text-base" : "text-sm",
                            "pl-3 hover:pr-3",
                            "pr-[0.75rem] hover:pr-[1.875rem]"
                        )}
                    >
                        <span>{name}</span>
                        <Info
                            className={cn(
                                "w-3.5 h-3.5 absolute right-3",
                                "transition-all duration-200 ease-out",
                                "-translate-x-2 opacity-0 group-hover/info:translate-x-0 group-hover/info:opacity-100",
                                "text-black", // Added explicit color
                                "z-10", // Added z-index
                                size === "featured" ? "w-4 h-4" : "w-3.5 h-3.5"
                            )}
                        />
                    </button>

                    <button
                        // onClick={handleExternalClick}
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
                        <div
                            className={cn(
                                "absolute bottom-0 left-0 right-0",
                                size === "featured" ? "p-4" : "p-3",
                                "flex flex-wrap gap-2"
                            )}
                        >
                            {tags.map((tag, index) => (
                                <span
                                    key={tag}
                                    style={{
                                        "--enter-delay": `${index * 50}ms`,
                                        "--exit-delay": `${
                                            (tags.length - 1 - index) * 50
                                        }ms`,
                                    }}
                                    className={cn(
                                        "bg-white/90 backdrop-blur-sm px-3 py-1 rounded-2xl text-xs font-bold",
                                        "opacity-0 translate-y-5 blur-md",
                                        "will-change-transform will-change-opacity",
                                        "transition-all duration-300 ease-out",
                                        "group-hover:[transition-delay:var(--enter-delay)]",
                                        "group-hover:opacity-100 group-hover:translate-y-0 group-hover:blur-none",
                                        "[transition-delay:var(--exit-delay)]"
                                    )}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}
