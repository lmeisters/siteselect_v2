"use client";

import { Suspense } from "react";
import { useSearchStore } from "@/lib/search-store";

function SearchStateProvider({ children }) {
    const searchState = useSearchStore();
    return <>{children}</>;
}

export function SearchProvider({ children }) {
    return (
        <Suspense fallback={<SearchFallback />}>
            <SearchStateProvider>{children}</SearchStateProvider>
        </Suspense>
    );
}

function SearchFallback() {
    return (
        <div className="animate-pulse">
            <div className="h-8 w-48 bg-muted rounded-md" />
        </div>
    );
}
