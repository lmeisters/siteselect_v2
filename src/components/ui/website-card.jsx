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
}) {
    const imagePath = `/images/${name.toLowerCase().replace(".com", "")}.webp`;
    const hasImage = name !== "Featured Site";

    return (
        <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                "group relative rounded-xl overflow-hidden hover:opacity-100 transition-opacity",
                size === "featured"
                    ? "aspect-[4/3] md:aspect-[16/9] lg:aspect-[2/1]"
                    : "aspect-[16/10]",
                !hasImage && "bg-gray-100",
                className
            )}
        >
            <div className="absolute inset-0 overflow-hidden">
                {hasImage ? (
                    <Image
                        src={imagePath}
                        alt={name}
                        fill
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
            <div
                className={cn(
                    "absolute bg-white px-3 py-1 rounded-2xl text-sm font-bold",
                    size === "featured" ? "top-4 left-4" : "top-3 left-3"
                )}
            >
                {name}
            </div>
            <div
                className={cn(
                    "absolute bottom-0 left-0 right-0",
                    size === "featured" ? "p-4" : "p-3",
                    "flex flex-wrap gap-2"
                )}
            >
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        style={{
                            "--enter-delay": `${index * 50}ms`,
                            "--exit-delay": `${
                                (tags.length - 1 - index) * 50
                            }ms`,
                        }}
                        className={cn(
                            "bg-white px-3 py-1 rounded-2xl font-bold",
                            size === "featured" ? "text-sm" : "text-xs",
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
            <div
                className={cn(
                    "absolute bg-white p-1.5 rounded-full overflow-hidden",
                    size === "featured" ? "top-4 right-4" : "top-3 right-3"
                )}
            >
                <ArrowUpRight
                    className={cn(
                        size === "featured" ? "h-4 w-4" : "h-3.5 w-3.5",
                        "group-hover:animate-arrow-exit"
                    )}
                />
            </div>
        </Link>
    );
}
