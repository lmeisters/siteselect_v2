"use client";

import { Search, Layout, Tag, Palette } from "lucide-react";
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
import { searchWebsites, getFilterCounts } from "@/lib/api";
import { useSearchStore } from "@/lib/search-store";
import { SEARCH_CATEGORIES } from "@/lib/constants";

export function SearchCommand() {
    const router = useRouter();
    const { query, type, tag, color, setSearch, resetSearch } =
        useSearchStore();
    const [isMac, setIsMac] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("type");
    const [filterCounts, setFilterCounts] = useState({
        types: {},
        colors: {},
        tags: {},
    });

    const categories = {
        type: "Types",
        tag: "Tags",
        color: "Colors",
    };

    const categoryIcons = {
        type: Layout,
        tag: Tag,
        color: Palette,
    };

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

    useEffect(() => {
        if (!isOpen) {
            setSearchValue("");
            setSearchResults([]);
        } else {
            setSelectedCategory("type");
        }
    }, [isOpen]);

    useEffect(() => {
        async function fetchCounts() {
            try {
                const counts = await getFilterCounts();
                setFilterCounts(counts);
            } catch (error) {
                console.error("Error fetching counts:", error);
            }
        }
        fetchCounts();
    }, []);

    const handleSearch = async (value) => {
        setIsLoading(true);
        try {
            const results = await searchWebsites({ query: value });
            setSearchResults(results);
        } catch (error) {
            console.error("Search error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearchChange = (value) => {
        setSearchValue(value);
        if (value.length >= 2) {
            handleSearch(value);
        } else {
            setSearchResults([]);
        }
    };

    const handleSearchSubmit = async (value) => {
        if (!value) return;
        setIsLoading(true);
        try {
            setIsOpen(false);
            setSearch({ query: value.toLowerCase() });
            if (window.location.pathname !== "/directory") {
                router.push(
                    `/directory?query=${encodeURIComponent(
                        value.toLowerCase()
                    )}`
                );
            }
        } catch (error) {
            console.error("Search error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelect = (website) => {
        setIsOpen(false);
        setSearch({ query: website.name });
    };

    const handleCategorySelect = (category, value) => {
        setIsOpen(false);
        setSearch({ [category]: value.toLowerCase() });
        if (window.location.pathname !== "/directory") {
            router.push(
                `/directory?${category}=${encodeURIComponent(
                    value.toLowerCase()
                )}`
            );
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <button className="flex w-full items-center h-9 rounded-3xl border bg-background px-3 text-sm text-muted-foreground shadow-sm hover:bg-accent">
                    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                    <span className="flex-1 text-left truncate">
                        {query
                            ? query
                            : type
                            ? `Type: ${type}`
                            : tag
                            ? `Tag: ${tag}`
                            : color
                            ? `Color: ${color}`
                            : "Search for designs..."}
                    </span>
                    <kbd className="pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[12px] font-medium opacity-100">
                        <span className="text-xs">{isMac ? "⌘" : "Ctrl"}</span>K
                    </kbd>
                </button>
            </DialogTrigger>
            <DialogContent className="p-0 gap-0 w-[95vw] max-w-lg rounded-xl">
                <DialogTitle className="sr-only">Search Designs</DialogTitle>
                <DialogDescription className="sr-only">
                    Search through website designs and filter by categories
                </DialogDescription>
                <Command className="rounded-lg border shadow-md">
                    <div className="flex items-center justify-between border-b px-3">
                        <div className="flex items-center flex-1">
                            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                            <CommandInput
                                placeholder="Search designs..."
                                value={searchValue}
                                onValueChange={handleSearchChange}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        handleSearchSubmit(searchValue);
                                    }
                                }}
                                className="h-9"
                            />
                        </div>
                        {(searchValue || selectedCategory) && (
                            <button
                                onClick={() => {
                                    setSearchValue("");
                                    setSelectedCategory("type");
                                    setSearchResults([]);
                                    resetSearch();
                                }}
                                className="text-sm text-muted-foreground hover:text-foreground px-2 py-1 rounded-md hover:bg-accent"
                            >
                                Reset
                            </button>
                        )}
                    </div>
                    <div className="flex flex-col sm:flex-row">
                        <CommandList className="w-full sm:w-[30%] max-h-[300px] sm:max-h-[400px] overflow-y-auto border-b sm:border-b-0 sm:border-r">
                            <CommandEmpty>
                                {isLoading
                                    ? "Searching..."
                                    : "No results found."}
                            </CommandEmpty>

                            {searchResults.length > 0 && (
                                <CommandGroup heading="Search Results">
                                    {searchResults.map((website) => (
                                        <CommandItem
                                            key={website.id}
                                            onSelect={() =>
                                                handleSelect(website)
                                            }
                                            className="cursor-pointer"
                                        >
                                            <Search className="mr-2 h-4 w-4" />
                                            <div className="flex flex-col overflow-hidden">
                                                <span className="truncate">
                                                    {website.name}
                                                </span>
                                                <span className="text-sm text-muted-foreground truncate">
                                                    {website.tags.join(", ")}
                                                </span>
                                            </div>
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            )}

                            {!searchValue && (
                                <CommandGroup>
                                    {Object.entries(categories).map(
                                        ([key, label]) => {
                                            const Icon = categoryIcons[key];
                                            return (
                                                <CommandItem
                                                    key={key}
                                                    onSelect={() =>
                                                        setSelectedCategory(key)
                                                    }
                                                    className={`cursor-pointer mb-0.5 last:mb-0 ${
                                                        selectedCategory === key
                                                            ? "bg-accent"
                                                            : ""
                                                    }`}
                                                >
                                                    <Icon className="mr-2 h-4 w-4" />
                                                    <span className="capitalize">
                                                        {label}
                                                    </span>
                                                </CommandItem>
                                            );
                                        }
                                    )}
                                </CommandGroup>
                            )}
                        </CommandList>

                        {selectedCategory && (
                            <div className="w-full sm:w-[70%] max-h-[200px] sm:max-h-[400px] overflow-y-auto">
                                <CommandList>
                                    <CommandGroup>
                                        {SEARCH_CATEGORIES[
                                            `${selectedCategory}s`
                                        ]?.map((item) => (
                                            <CommandItem
                                                key={item}
                                                onSelect={() =>
                                                    handleCategorySelect(
                                                        selectedCategory,
                                                        item
                                                    )
                                                }
                                                className="cursor-pointer mb-0.5 last:mb-0"
                                            >
                                                <span className="flex-1 truncate">
                                                    {item}
                                                </span>
                                                <span className="text-xs text-muted-foreground mr-2">
                                                    {filterCounts[
                                                        `${selectedCategory}s`
                                                    ]?.[item.toLowerCase()] ||
                                                        0}
                                                </span>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </div>
                        )}
                    </div>
                </Command>
            </DialogContent>
        </Dialog>
    );
}
