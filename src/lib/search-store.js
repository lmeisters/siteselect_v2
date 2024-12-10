"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { create } from "zustand";

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

export const useSearchStore = create((set) => ({
    query: "",
    type: "",
    style: "",
    industry: "",
    color: "",
    feature: "",
    layout: "",
    platform: "",
    setSearch: (params) =>
        set((state) => ({
            ...state,
            ...params,
        })),
    resetSearch: () =>
        set({
            query: "",
            type: "",
            style: "",
            industry: "",
            color: "",
            feature: "",
            layout: "",
            platform: "",
        }),
}));
