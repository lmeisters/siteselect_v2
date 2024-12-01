"use client";

import { Search, Clock, Layout, Tag, Palette } from "lucide-react";
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
import { SEARCH_CATEGORIES } from "@/lib/constants";

export function SearchCommand() {
    const router = useRouter();
    const { setSearch } = useSearchStore();
    const [isMac, setIsMac] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("type");

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
                    <span className="flex-1 text-left">
                        Search for designs...
                    </span>
                    <kbd className="pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[12px] font-medium opacity-100">
                        <span className="text-xs">{isMac ? "⌘" : "Ctrl"}</span>K
                    </kbd>
                </button>
            </DialogTrigger>
            <DialogContent className="p-0 gap-0">
                <DialogTitle className="sr-only">Search Designs</DialogTitle>
                <DialogDescription className="sr-only">
                    Search through website designs and filter by categories
                </DialogDescription>
                <Command className="rounded-lg border shadow-md">
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
                    <div className="flex">
                        <CommandList className="w-[50%] max-h-[300px] overflow-y-auto border-r">
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
                            <div className="w-[90%]">
                                <div>
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
                                                    {item}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </div>
                            </div>
                        )}
                    </div>
                </Command>
            </DialogContent>
        </Dialog>
    );
}
