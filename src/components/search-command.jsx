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
import { useRouter } from "next/navigation";
import { searchWebsites } from "@/lib/api";
import { useSearchStore } from "@/lib/search-store";

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
    const router = useRouter();
    const { setSearch } = useSearchStore();
    const [isMac, setIsMac] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [searchPrefix, setSearchPrefix] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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

    const handleSearch = async (value) => {
        setIsLoading(true);
        try {
            const prefixMatch = value.match(/^(tag|color|type):(.+)/);
            let searchParams = { query: value };

            if (prefixMatch) {
                const [, prefix, query] = prefixMatch;
                searchParams = {
                    [prefix]: query.trim(),
                };
            }

            setSearch(searchParams);

            const results = await searchWebsites(searchParams);
            setSearchResults(results);
        } catch (error) {
            console.error("Search error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearchChange = (value) => {
        setSearchValue(value);
        const prefixMatch = value.match(/^(tag|color|type):(.+)/);

        if (prefixMatch) {
            const [, prefix] = prefixMatch;
            setSearchPrefix(prefix);
        } else {
            setSearchPrefix(null);
        }

        if (value.length >= 2) {
            handleSearch(value);
        } else {
            setSearchResults([]);
        }
    };

    const handleSelect = (website) => {
        setIsOpen(false);
        setSearch({ query: website.name });
        router.push("/directory");
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <button className="flex w-full items-center h-9 rounded-3xl border bg-background px-3 text-sm text-muted-foreground shadow-sm hover:bg-accent">
                    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                    <span className="flex-1 text-left">
                        Search for designs...
                    </span>
                    <kbd className="pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[12px] font-medium opacity-100">
                        <span className="text-xs">{isMac ? "⌘" : "Ctrl"}</span>K
                    </kbd>
                </button>
            </DialogTrigger>
            <DialogContent className="p-0 gap-0">
                <DialogTitle className="sr-only">Search designs</DialogTitle>
                <DialogDescription className="sr-only">
                    Search for designs using keywords or browse recent searches
                    and popular tags
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
                            {isLoading ? (
                                "Searching..."
                            ) : searchPrefix ? (
                                <p>
                                    No results found for {searchPrefix} search.
                                </p>
                            ) : (
                                "No results found."
                            )}
                        </CommandEmpty>

                        {searchResults.length > 0 && (
                            <CommandGroup heading="Search Results">
                                {searchResults.map((website) => (
                                    <CommandItem
                                        key={website.id}
                                        onSelect={() => handleSelect(website)}
                                        className="cursor-pointer"
                                    >
                                        <Search className="mr-2 h-4 w-4" />
                                        <div className="flex flex-col">
                                            <span>{website.name}</span>
                                            <span className="text-sm text-muted-foreground">
                                                {website.tags.join(", ")}
                                            </span>
                                        </div>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        )}

                        {!searchValue && (
                            <>
                                <CommandGroup heading="Recent Searches">
                                    {RECENT_SEARCHES.map((search) => (
                                        <CommandItem
                                            key={search}
                                            onSelect={() => {
                                                handleSearchChange(search);
                                                setIsOpen(false);
                                                router.push("/directory");
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
                                        router.push("/directory");
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
    );
}
