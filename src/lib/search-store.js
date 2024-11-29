import { useRouter, useSearchParams } from "next/navigation";

export function useSearchStore() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const setSearch = (params) => {
        const url = new URL(window.location.href);
        Object.entries(params).forEach(([key, value]) => {
            if (value) {
                url.searchParams.set(key, value);
            } else {
                url.searchParams.delete(key);
            }
        });
        router.push(url.pathname + url.search);
    };

    return {
        query: searchParams.get("query") || "",
        type: searchParams.get("type") || "",
        tag: searchParams.get("tag") || "",
        color: searchParams.get("color") || "",
        setSearch,
    };
}
