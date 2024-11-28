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
    DialogTrigger,
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

    const handleSearchChange = (value) => {
        setSearchValue(value);
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
            <div className="max-w-8xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/" className="text-xl font-bold tracking-tighter">
                    SS.
                </Link>
                <div className="flex items-center space-x-4 flex-1 max-w-md mx-auto">
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger asChild>
                            <button className="flex w-full items-center h-9 rounded-3xl border bg-background px-3 text-sm text-muted-foreground shadow-sm hover:bg-accent">
                                <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                                <span className="flex-1 text-left">
                                    Search for designs...
                                </span>
                                <kbd className="pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[12px] font-medium opacity-100">
                                    <span className="text-xs">
                                        {isMac ? "⌘" : "Ctrl"}
                                    </span>
                                    K
                                </kbd>
                            </button>
                        </DialogTrigger>
                        <DialogContent className="p-0 gap-0">
                            <DialogTitle className="sr-only">
                                Search designs
                            </DialogTitle>
                            <DialogDescription className="sr-only">
                                Search for designs using keywords or browse
                                recent searches and popular tags
                            </DialogDescription>
                            <Command className="rounded-lg border shadow-md">
                                <CommandInput
                                    placeholder="Search for designs"
                                    value={searchValue}
                                    onValueChange={handleSearchChange}
                                    className="h-9"
                                    autoFocus
                                />
                                <CommandList className="max-h-[300px] overflow-y-auto">
                                    <CommandEmpty>
                                        No results found.
                                    </CommandEmpty>
                                    <CommandGroup heading="Recent Searches">
                                        {RECENT_SEARCHES.map((search) => (
                                            <CommandItem
                                                key={search}
                                                onSelect={() => {
                                                    handleSearchChange(search);
                                                    setIsOpen(false);
                                                }}
                                                className="cursor-pointer"
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
                                                    handleSearchChange(tag);
                                                    setIsOpen(false);
                                                }}
                                                className="cursor-pointer"
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
                <AboutSheet />
            </div>
        </nav>
    );
};
