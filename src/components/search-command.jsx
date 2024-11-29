"use client";

import { Search, Clock, Hash } from "lucide-react";
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
import { useEffect, useState } from "react";

const RECENT_SEARCHES = ["Minimalist", "E-commerce", "Portfolio"];

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

const SEARCH_PREFIXES = {
    tag: "Search by tag",
    color: "Search by color scheme",
    type: "Search by website type",
};

export function SearchCommand() {
    const [isMac, setIsMac] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [searchPrefix, setSearchPrefix] = useState(null);

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
        const prefixMatch = value.match(/^(tag|color|type):(.+)/);
        if (prefixMatch) {
            const [, prefix, query] = prefixMatch;
            setSearchPrefix(prefix);
            setSearchValue(value);
        } else {
            setSearchPrefix(null);
            setSearchValue(value);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
                        Search for designs using keywords or browse recent
                        searches and popular tags
                    </DialogDescription>
                    <Command className="rounded-lg border shadow-md">
                        <CommandInput
                            placeholder="Search (try tag:minimal, color:dark, type:portfolio)"
                            value={searchValue}
                            onValueChange={handleSearchChange}
                            className="h-9"
                            autoFocus
                        />
                        <CommandList className="max-h-[300px] overflow-y-auto">
                            <CommandEmpty>
                                {searchPrefix ? (
                                    <p>
                                        No results found for {searchPrefix}{" "}
                                        search.
                                    </p>
                                ) : (
                                    "No results found."
                                )}
                            </CommandEmpty>

                            {!searchPrefix && (
                                <>
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

                                    <CommandGroup heading="Search Syntax">
                                        {Object.entries(SEARCH_PREFIXES).map(
                                            ([prefix, description]) => (
                                                <CommandItem
                                                    key={prefix}
                                                    onSelect={() => {
                                                        handleSearchChange(
                                                            `${prefix}:`
                                                        );
                                                    }}
                                                    className="cursor-pointer"
                                                >
                                                    <Search className="mr-2 h-4 w-4" />
                                                    <span className="font-mono">
                                                        {prefix}:
                                                    </span>
                                                    <span className="ml-2 text-muted-foreground">
                                                        {description}
                                                    </span>
                                                </CommandItem>
                                            )
                                        )}
                                    </CommandGroup>
                                </>
                            )}

                            <CommandGroup heading="Popular Tags">
                                {POPULAR_TAGS.map((tag) => (
                                    <CommandItem
                                        key={tag}
                                        onSelect={() => {
                                            handleSearchChange(
                                                `tag:${tag.toLowerCase()}`
                                            );
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
        </Dialog>
    );
}
