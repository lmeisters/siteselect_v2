"use client";

import { useState } from "react";
import { WebsiteDialog } from "@/components/ui/website-dialog";
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
    description,
}) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const imagePath = `/images/${name.toLowerCase().replace(/\s+/g, "-")}.webp`;
    const hasImage = name !== "Featured Site";

    return (
        <>
            <div className="relative">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsDialogOpen(true);
                        onNameClick?.();
                    }}
                    className={cn(
                        "z-20 bg-white rounded-2xl font-bold inline-flex items-center",
                        "transition-all duration-200 ease-out",
                        "group/info absolute top-4 left-4",
                        size === "featured" ? "text-base" : "text-sm",
                        "px-3 py-1",
                        "hover:pr-7"
                    )}
                >
                    <span>{name}</span>
                    <Info
                        className={cn(
                            "absolute right-2",
                            "transition-all duration-200 ease-out",
                            "-translate-x-1 opacity-0 pointer-events-none",
                            "group-hover/info:translate-x-0 group-hover/info:opacity-100",
                            size === "featured" ? "w-4 h-4 ml-1" : "w-3.5 h-3.5"
                        )}
                    />
                </button>

                {isDialogOpen && (
                    <WebsiteDialog
                        isOpen={isDialogOpen}
                        onClose={() => {
                            console.log("Closing dialog");
                            setIsDialogOpen(false);
                        }}
                        website={{ name, href, description, tags }}
                    />
                )}

                <Link
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                        "group block relative w-full overflow-hidden rounded-xl",
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

                        <div className="absolute inset-0 p-4">
                            <button
                                className={cn(
                                    "absolute bg-white p-1.5 rounded-full overflow-hidden",
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
                                            key={`${tag}-${index}`}
                                            style={{
                                                "--enter-delay": `${
                                                    index * 50
                                                }ms`,
                                                "--exit-delay": `${
                                                    (tags.length - 1 - index) *
                                                    50
                                                }ms`,
                                            }}
                                            className={cn(
                                                "bg-white/90 backdrop-blur-sm px-3 py-1 rounded-2xl text-xs font-bold",
                                                "opacity-0 translate-y-5 blur-md",
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
            </div>
        </>
    );
}
