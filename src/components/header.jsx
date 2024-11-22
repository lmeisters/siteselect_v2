"use client";

import { Input } from "@/components/ui/input";
import { Info, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

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
                <Sheet>
                    <SheetTrigger asChild>
                        <button className="w-10 flex justify-end hover:opacity-80">
                            <Info className="h-5 w-5" />
                        </button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>About SiteSelect</SheetTitle>
                            <SheetDescription>
                                Your gateway to discovering exceptional website
                                designs and creative inspiration.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="mt-6 space-y-4">
                            <p className="text-sm text-muted-foreground">
                                Explore our handpicked collection of the web's
                                finest designs. From stunning layouts to
                                innovative interactions, SiteSelect showcases
                                the best in modern web design. Perfect for
                                designers, developers, and creative
                                professionals seeking fresh inspiration for
                                their next project.
                            </p>
                            <div className="border-t pt-4">
                                <p className="text-sm font-medium">
                                    Want your website featured?
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Submit at{" "}
                                    <a
                                        href="mailto:siteselect@gmail.com"
                                        className="text-primary hover:opacity-80"
                                    >
                                        siteselect@gmail.com
                                    </a>
                                </p>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    );
};
