"use client";

import {
    Search,
    Layout,
    Palette,
    Brush,
    Briefcase,
    Activity,
    RefreshCcw,
    Code,
} from "lucide-react";
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
import { useEffect, useState, useMemo, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { searchWebsites, getFilterCounts } from "@/lib/api";
import { useSearchStore } from "@/lib/search-store";
import { SEARCH_CATEGORIES } from "@/lib/constants";
import { debounce, find } from "lodash";

export function SearchCommand() {
    const router = useRouter();
    const pathname = usePathname();
    const {
        query,
        type,
        style,
        industry,
        color,
        feature,
        layout,
        platform,
        setSearch,
        resetSearch,
    } = useSearchStore();
    const [isMac, setIsMac] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("type");
    const [filterCounts, setFilterCounts] = useState({
        types: {},
        styles: {},
        industries: {},
        colors: {},
        features: {},
        layouts: {},
        platforms: {},
    });

    const [suggestion, setSuggestion] = useState("");
    const scrollRef = useRef(null);

    const categories = {
        types: "Types",
        styles: "Styles",
        industries: "Industries",
        colors: "Colors",
        features: "Features",
        layouts: "Layouts",
        platforms: "Platforms",
    };

    const categoryIcons = {
        types: Layout,
        styles: Brush,
        industries: Briefcase,
        colors: Palette,
        features: Activity,
        layouts: RefreshCcw,
        platforms: Code,
    };

    useEffect(() => {
        if (pathname === "/") {
            resetSearch();
        }
    }, [pathname, resetSearch]);

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
            setSelectedCategory("types");
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

    const debouncedSearch = useMemo(
        () =>
            debounce(async (value) => {
                if (value.length < 2) {
                    setSearchResults([]);
                    setIsLoading(false);
                    return;
                }

                setIsLoading(true);
                try {
                    const results = await searchWebsites({ query: value });
                    setSearchResults(results);
                } catch (error) {
                    console.error("Search error:", error);
                    setSearchResults([]);
                } finally {
                    setIsLoading(false);
                }
            }, 300),
        [setSearchResults, setIsLoading]
    );

    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    const handleSearchChange = (value) => {
        setSearchValue(value);
        debouncedSearch(value);

        if (value.length >= 2) {
            let possibleSuggestion = "";

            const matchingResult = find(searchResults, (website) =>
                website.name.toLowerCase().startsWith(value.toLowerCase())
            );

            if (matchingResult) {
                possibleSuggestion = matchingResult.name;
            } else {
                for (const categoryKey of Object.keys(SEARCH_CATEGORIES)) {
                    const categoryItems = SEARCH_CATEGORIES[categoryKey] || [];
                    const matchingCategory = find(categoryItems, (item) =>
                        item.toLowerCase().startsWith(value.toLowerCase())
                    );
                    if (matchingCategory) {
                        possibleSuggestion = matchingCategory;
                        break;
                    }
                }
            }

            setSuggestion(possibleSuggestion);
        } else {
            setSuggestion("");
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
            } else {
                // Update URL without navigation
                const newUrl = `/directory?query=${encodeURIComponent(
                    value.toLowerCase()
                )}`;
                window.history.pushState({}, "", newUrl);
            }
        } catch (error) {
            console.error("Search error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelect = (website) => {
        setIsOpen(false);
        setSearch({ query: website.name.toLowerCase() });
    };

    const handleCategorySelect = (category, value) => {
        setIsOpen(false);
        const categoryParam = category.slice(0, -1); // Remove 's' from plural form

        // Reset all other search parameters and set only the selected category
        resetSearch();

        // Map the category to the correct search parameter
        let searchParam;
        switch (categoryParam) {
            case "type":
                searchParam = { type: value.toLowerCase() };
                break;
            case "style":
                searchParam = { style: value.toLowerCase() };
                break;
            case "industry":
                searchParam = { industry: value.toLowerCase() };
                break;
            case "color":
                searchParam = { color: value.toLowerCase() };
                break;
            case "feature":
                searchParam = { feature: value.toLowerCase() };
                break;
            case "layout":
                searchParam = { layout: value.toLowerCase() };
                break;
            case "platform":
                searchParam = { platform: value.toLowerCase() };
                break;
            default:
                searchParam = { tag: value.toLowerCase() };
        }

        setSearch(searchParam);

        // Reset scroll position
        if (scrollRef.current) {
            scrollRef.current.scrollTop = 0;
        }

        const paramKey = Object.keys(searchParam)[0];
        const newUrl = `/directory?${paramKey}=${encodeURIComponent(
            value.toLowerCase()
        )}`;

        if (window.location.pathname !== "/directory") {
            router.push(newUrl);
        } else {
            // Update URL without navigation
            window.history.pushState({}, "", newUrl);
        }
    };

    useEffect(() => {
        if (window.location.pathname === "/directory") {
            const searchParams = new URLSearchParams();

            if (query) searchParams.set("query", query);
            if (type) searchParams.set("type", type);
            if (style) searchParams.set("style", style);
            if (industry) searchParams.set("industry", industry);
            if (color) searchParams.set("color", color);
            if (feature) searchParams.set("feature", feature);
            if (layout) searchParams.set("layout", layout);
            if (platform) searchParams.set("platform", platform);

            const newUrl = searchParams.toString()
                ? `/directory?${searchParams.toString()}`
                : "/directory";

            window.history.pushState({}, "", newUrl);
        }
    }, [query, type, style, industry, color, feature, layout, platform]);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <button className="flex w-full items-center h-9 rounded-3xl border bg-background px-3 text-sm text-muted-foreground shadow-sm hover:bg-accent leading-normal py-2">
                    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                    <span className="flex-1 text-left truncate">
                        {query
                            ? query
                            : type
                            ? `Type: ${type}`
                            : style
                            ? `Style: ${style}`
                            : industry
                            ? `Industry: ${industry}`
                            : color
                            ? `Color: ${color}`
                            : feature
                            ? `Feature: ${feature}`
                            : layout
                            ? `Layout: ${layout}`
                            : platform
                            ? `Platform: ${platform}`
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
                            <div className="relative flex-1">
                                <CommandInput
                                    placeholder={
                                        query
                                            ? query
                                            : type
                                            ? `Type: ${type}`
                                            : style
                                            ? `Style: ${style}`
                                            : industry
                                            ? `Industry: ${industry}`
                                            : color
                                            ? `Color: ${color}`
                                            : feature
                                            ? `Feature: ${feature}`
                                            : layout
                                            ? `Layout: ${layout}`
                                            : platform
                                            ? `Platform: ${platform}`
                                            : "Search designs..."
                                    }
                                    value={searchValue}
                                    onValueChange={handleSearchChange}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            handleSearchSubmit(searchValue);
                                        } else if (
                                            e.key === "Tab" &&
                                            suggestion
                                        ) {
                                            e.preventDefault();
                                            setSearchValue(suggestion);
                                            setSuggestion("");
                                        }
                                    }}
                                    className="h-9"
                                />
                                {suggestion && searchValue && (
                                    <div className="flex h-9 w-full rounded-md bg-transparent py-2 text-sm outline-none absolute top-0 left-0 pointer-events-none">
                                        <span className="invisible">
                                            {searchValue}
                                        </span>
                                        <span className="text-muted-foreground/50">
                                            {suggestion.slice(
                                                searchValue.length
                                            )}
                                        </span>
                                    </div>
                                )}
                            </div>
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
                    <div className="flex flex-col sm:flex-row h-[400px] sm:h-[245px]">
                        {searchValue ? (
                            // Full-width search results with scroll
                            <div className="w-full overflow-y-auto">
                                <CommandList>
                                    <CommandEmpty>
                                        {isLoading
                                            ? "Searching..."
                                            : "No results found."}
                                    </CommandEmpty>
                                    {Object.entries(SEARCH_CATEGORIES).map(
                                        ([categoryKey, items]) => {
                                            const matchingItems = items.filter(
                                                (item) =>
                                                    item
                                                        .toLowerCase()
                                                        .includes(
                                                            searchValue.toLowerCase()
                                                        )
                                            );

                                            if (matchingItems.length === 0)
                                                return null;

                                            const Icon =
                                                categoryIcons[categoryKey];

                                            return (
                                                <CommandGroup
                                                    key={categoryKey}
                                                    heading={
                                                        categories[categoryKey]
                                                    }
                                                >
                                                    {matchingItems.map(
                                                        (item) => (
                                                            <CommandItem
                                                                key={`${categoryKey}-${item}`}
                                                                onSelect={() =>
                                                                    handleCategorySelect(
                                                                        categoryKey,
                                                                        item
                                                                    )
                                                                }
                                                                className="cursor-pointer"
                                                            >
                                                                <Icon className="mr-2 h-4 w-4" />
                                                                <span className="flex-1 truncate">
                                                                    {item}
                                                                </span>
                                                                <span className="text-xs text-muted-foreground mr-2">
                                                                    {filterCounts[
                                                                        categoryKey
                                                                    ]?.[
                                                                        item.toLowerCase()
                                                                    ] || 0}
                                                                </span>
                                                            </CommandItem>
                                                        )
                                                    )}
                                                </CommandGroup>
                                            );
                                        }
                                    )}
                                </CommandList>
                            </div>
                        ) : (
                            // Original split view for categories and tags
                            <>
                                <CommandList className="w-full sm:w-[30%] border-b sm:border-b-0 sm:border-r">
                                    <CommandGroup>
                                        {Object.entries(categories).map(
                                            ([key, label]) => {
                                                const Icon = categoryIcons[key];
                                                return (
                                                    <CommandItem
                                                        key={key}
                                                        onSelect={() => {
                                                            setSelectedCategory(
                                                                key
                                                            );
                                                            if (
                                                                scrollRef.current
                                                            ) {
                                                                scrollRef.current.scrollTop = 0;
                                                            }
                                                        }}
                                                        className={`cursor-pointer mb-0.5 last:mb-0 ${
                                                            selectedCategory ===
                                                            key
                                                                ? "bg-accent"
                                                                : ""
                                                        }`}
                                                    >
                                                        <Icon className="mr-2 h-4 w-4" />
                                                        <span
                                                            className={`capitalize ${
                                                                selectedCategory ===
                                                                key
                                                                    ? "font-medium"
                                                                    : ""
                                                            }`}
                                                        >
                                                            {label}
                                                        </span>
                                                    </CommandItem>
                                                );
                                            }
                                        )}
                                    </CommandGroup>
                                </CommandList>

                                {selectedCategory && (
                                    <div
                                        ref={scrollRef}
                                        className="w-full sm:w-[70%] overflow-y-auto"
                                    >
                                        <CommandList>
                                            <CommandGroup>
                                                {SEARCH_CATEGORIES[
                                                    selectedCategory
                                                ]?.map((item) => (
                                                    <CommandItem
                                                        key={item}
                                                        onSelect={() =>
                                                            handleCategorySelect(
                                                                selectedCategory,
                                                                item
                                                            )
                                                        }
                                                        className={`cursor-pointer mb-0.5 last:mb-0 ${
                                                            type?.toLowerCase() ===
                                                                item.toLowerCase() ||
                                                            style?.toLowerCase() ===
                                                                item.toLowerCase() ||
                                                            industry?.toLowerCase() ===
                                                                item.toLowerCase() ||
                                                            color?.toLowerCase() ===
                                                                item.toLowerCase() ||
                                                            feature?.toLowerCase() ===
                                                                item.toLowerCase() ||
                                                            layout?.toLowerCase() ===
                                                                item.toLowerCase() ||
                                                            platform?.toLowerCase() ===
                                                                item.toLowerCase()
                                                                ? "bg-accent"
                                                                : ""
                                                        }`}
                                                    >
                                                        <span
                                                            className={`flex-1 truncate ${
                                                                type?.toLowerCase() ===
                                                                    item.toLowerCase() ||
                                                                style?.toLowerCase() ===
                                                                    item.toLowerCase() ||
                                                                industry?.toLowerCase() ===
                                                                    item.toLowerCase() ||
                                                                color?.toLowerCase() ===
                                                                    item.toLowerCase() ||
                                                                feature?.toLowerCase() ===
                                                                    item.toLowerCase() ||
                                                                layout?.toLowerCase() ===
                                                                    item.toLowerCase() ||
                                                                platform?.toLowerCase() ===
                                                                    item.toLowerCase()
                                                                    ? "font-medium"
                                                                    : ""
                                                            }`}
                                                        >
                                                            {item}
                                                        </span>
                                                        <span className="text-xs text-muted-foreground mr-2">
                                                            {filterCounts[
                                                                selectedCategory
                                                            ]?.[
                                                                item.toLowerCase()
                                                            ] || 0}
                                                        </span>
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </Command>
            </DialogContent>
        </Dialog>
    );
}
