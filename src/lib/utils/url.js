export function getRefUrl(url) {
    try {
        const originalUrl = new URL(url);
        originalUrl.searchParams.set("ref", "siteselect");
        return originalUrl.toString();
    } catch (error) {
        return url;
    }
}
