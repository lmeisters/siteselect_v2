import { useRouter, useSearchParams } from "next/navigation";

export function useSearchStore() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const setSearch = (params) => {
        const url = new URL(window.location.href);
        const newParams = new URLSearchParams(searchParams.toString());

        const [[key, value]] = Object.entries(params);
        if (value) {
            newParams.set(key, value.toLowerCase());
        } else {
            newParams.delete(key);
        }

        router.replace(`${url.pathname}?${newParams.toString()}`, {
            scroll: false,
            shallow: true,
        });
    };

    const resetSearch = () => {
        const url = new URL(window.location.href);
        router.replace(url.pathname, {
            scroll: false,
            shallow: true,
        });
    };

    return {
        query: searchParams.get("query") || "",
        type: searchParams.get("type") || "",
        tag: searchParams.get("tag") || "",
        color: searchParams.get("color") || "",
        setSearch,
        resetSearch,
    };
}
