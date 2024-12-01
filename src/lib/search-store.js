import { useRouter, useSearchParams } from "next/navigation";

export function useSearchStore() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const setSearch = (params) => {
        const url = new URL(window.location.href);
        const currentParams = new URLSearchParams(url.search);

        Object.entries(params).forEach(([key, value]) => {
            if (value) {
                currentParams.set(key, value);
            } else {
                currentParams.delete(key);
            }
        });

        router.push(`${url.pathname}?${currentParams.toString()}`);
    };

    return {
        query: searchParams.get("query") || "",
        type: searchParams.get("type") || "",
        tag: searchParams.get("tag") || "",
        color: searchParams.get("color") || "",
        setSearch,
    };
}
