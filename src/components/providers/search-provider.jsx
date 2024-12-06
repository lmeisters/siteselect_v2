"use client";

import { Suspense } from "react";
import { useSearchStore } from "@/lib/search-store";

function SearchStateProvider({ children }) {
    const searchState = useSearchStore();
    return <Suspense fallback={<SearchFallback />}>{children}</Suspense>;
}

export function SearchProvider({ children }) {
    return <SearchStateProvider>{children}</SearchStateProvider>;
}

function SearchFallback() {
    return (
        <div className="animate-pulse">
            <div className="h-8 w-48 bg-muted rounded-md" />
        </div>
    );
}
