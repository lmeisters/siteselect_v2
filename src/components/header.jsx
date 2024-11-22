"use client";

import { Input } from "@/components/ui/input";
import { Info, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export const Header = () => {
    const searchRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "k") {
                e.preventDefault();
                searchRef.current?.focus();
            } else if (e.key === "Escape" && isFocused) {
                e.preventDefault();
                searchRef.current?.blur();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isFocused]);

    return (
        <nav>
            <div className="max-w-8xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/" className="text-xl font-bold tracking-tighter">
                    SiteSelect
                </Link>
                <div className="flex items-center space-x-4 flex-1 max-w-md mx-auto">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            ref={searchRef}
                            className="w-full h-9 rounded-3xl bg-gray-100 pl-9 pr-16 border-none focus-visible:ring-1 focus-visible:ring-gray-200 focus-visible:ring-offset-0 [&::-webkit-search-cancel-button]:hidden"
                            placeholder="Search for designs"
                            type="search"
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        />
                        <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 transform hidden sm:inline-block">
                            <span className="text-xs font-bold text-muted-foreground">
                                {isFocused
                                    ? "Esc"
                                    : navigator?.platform?.includes("Mac")
                                    ? "⌘K"
                                    : "Ctrl + K"}
                            </span>
                        </kbd>
                    </div>
                </div>
                <div className="w-10 flex justify-end">
                    <Info className="h-5 w-5" />
                </div>
            </div>
        </nav>
    );
};
