"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

function getSearchParamsObject(searchParams) {
    if (!searchParams)
        return {
            query: "",
            type: undefined,
            style: undefined,
            industry: undefined,
            color: undefined,
            feature: undefined,
            layout: undefined,
            platform: undefined,
        };

    return {
        query: searchParams.get("query") || "",
        type: searchParams.get("type") || undefined,
        style: searchParams.get("style") || undefined,
        industry: searchParams.get("industry") || undefined,
        color: searchParams.get("color") || undefined,
        feature: searchParams.get("feature") || undefined,
        layout: searchParams.get("layout") || undefined,
        platform: searchParams.get("platform") || undefined,
    };
}

export function useSearchStore() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const setSearch = useCallback(
        (params) => {
            const url = new URL(window.location.href);
            const newParams = new URLSearchParams(searchParams?.toString());

            // Clear all existing search parameters
            for (const key of newParams.keys()) {
                newParams.delete(key);
            }

            // Set the new parameter
            const [[key, value]] = Object.entries(params);
            if (value) {
                newParams.set(key, value.toLowerCase());
            }

            router.replace(`${url.pathname}?${newParams.toString()}`, {
                scroll: false,
            });
        },
        [router, searchParams]
    );

    const resetSearch = useCallback(() => {
        const url = new URL(window.location.href);
        router.replace(url.pathname, {
            scroll: false,
        });
    }, [router]);

    return {
        ...getSearchParamsObject(searchParams),
        setSearch,
        resetSearch,
    };
}
