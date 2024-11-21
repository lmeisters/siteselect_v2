import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function WebsiteCard({ name, href, className, size = "default" }) {
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
                    : "aspect-[3/2]",
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
