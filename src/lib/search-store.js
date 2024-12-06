"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

function getSearchParamsObject(searchParams) {
    if (!searchParams)
        return {
            query: "",
            type: "",
            tag: "",
            color: "",
        };

    return {
        query: searchParams.get("query") || "",
        type: searchParams.get("type") || "",
        tag: searchParams.get("tag") || "",
        color: searchParams.get("color") || "",
    };
}

export function useSearchStore() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const setSearch = useCallback(
        (params) => {
            const url = new URL(window.location.href);
            const newParams = new URLSearchParams(searchParams?.toString());

            const [[key, value]] = Object.entries(params);
            if (value) {
                newParams.set(key, value.toLowerCase());
            } else {
                newParams.delete(key);
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
