import { useRouter, useSearchParams } from "next/navigation";

export function useSearchStore() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const setSearch = (params) => {
        const url = new URL(window.location.href);
        const newParams = new URLSearchParams();

        const [[key, value]] = Object.entries(params);
        if (value) {
            newParams.set(key, value);
        }

        router.push(`${url.pathname}?${newParams.toString()}`);
    };

    return {
        query: searchParams.get("query") || "",
        type: searchParams.get("type") || "",
        tag: searchParams.get("tag") || "",
        color: searchParams.get("color") || "",
        setSearch,
    };
}
