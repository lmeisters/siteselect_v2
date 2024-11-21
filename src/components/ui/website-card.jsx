import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function WebsiteCard({ name, href, className, size = "default" }) {
    return (
        <Link
            href={href}
            className={cn(
                "group relative rounded-xl overflow-hidden hover:opacity-90 transition-opacity",
                size === "featured"
                    ? "aspect-[4/3] md:aspect-[16/9] lg:aspect-[2/1]"
                    : "aspect-[3/2]",
                "bg-gray-300",
                className
            )}
        >
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
                    "absolute bg-white p-1.5 rounded-full",
                    size === "featured" ? "top-4 right-4" : "top-3 right-3"
                )}
            >
                <ArrowUpRight
                    className={size === "featured" ? "h-4 w-4" : "h-3.5 w-3.5"}
                />
            </div>
        </Link>
    );
}
