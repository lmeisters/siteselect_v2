"use client";

import { Input } from "@/components/ui/input";
import { Info, Search, Clock, Hash } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { AboutSheet } from "@/components/about-sheet";

const RECENT_SEARCHES = ["Minimalist", "E-commerce", "Portfolio", "Dark mode"];

const POPULAR_TAGS = [
    "Minimal",
    "Creative",
    "Portfolio",
    "E-commerce",
    "Agency",
    "Dark",
    "Responsive",
    "Modern",
];

export const Header = () => {
    const searchRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isMac, setIsMac] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        setIsMac(navigator?.platform?.includes("Mac"));
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "k") {
                e.preventDefault();
                setIsOpen(true);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
            <div className="max-w-8xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/" className="text-xl font-bold tracking-tighter">
                    SS.
                </Link>
                <div className="flex items-center space-x-4 flex-1 max-w-md mx-auto">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            ref={searchRef}
                            className="w-full h-9 rounded-3xl bg-gray-100 pl-9 pr-16 border-none focus-visible:ring-1 focus-visible:ring-gray-200 focus-visible:ring-offset-0 [&::-webkit-search-cancel-button]:hidden"
                            placeholder="Search for designs"
                            type="search"
                            onFocus={() => setIsOpen(true)}
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 transform hidden sm:inline-block">
                            <span className="text-xs font-bold text-muted-foreground">
                                {isMac ? "⌘K" : "Ctrl + K"}
                            </span>
                        </kbd>
                    </div>
                </div>
                <AboutSheet />
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogContent className="p-0 gap-0">
                        <DialogTitle className="sr-only">
                            Search designs
                        </DialogTitle>
                        <DialogDescription className="sr-only">
                            Search for website designs and inspiration
                        </DialogDescription>
                        <Command className="rounded-lg border shadow-md">
                            <CommandInput
                                placeholder="Type to search..."
                                value={searchValue}
                                onValueChange={setSearchValue}
                            />
                            <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup heading="Recent Searches">
                                    {RECENT_SEARCHES.map((search) => (
                                        <CommandItem
                                            key={search}
                                            onSelect={() => {
                                                setSearchValue(search);
                                                setIsOpen(false);
                                            }}
                                        >
                                            <Clock className="mr-2 h-4 w-4" />
                                            {search}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                                <CommandGroup heading="Popular Tags">
                                    {POPULAR_TAGS.map((tag) => (
                                        <CommandItem
                                            key={tag}
                                            onSelect={() => {
                                                setSearchValue(tag);
                                                setIsOpen(false);
                                            }}
                                        >
                                            <Hash className="mr-2 h-4 w-4" />
                                            {tag}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </DialogContent>
                </Dialog>
            </div>
        </nav>
    );
};
