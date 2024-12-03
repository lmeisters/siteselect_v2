import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t mt-16">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-2 md:py-4 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex flex-col md:flex-row items-center gap-2 text-center md:text-left">
                        <Link
                            href="/"
                            className="text-lg font-bold tracking-tighter"
                        >
                            SiteSelect.
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            Curated design inspiration for creative
                            professionals
                        </p>
                    </div>

                    <div className="text-sm text-muted-foreground text-center md:text-right">
                        Created by{" "}
                        <Link
                            href="https://github.com/lmeisters"
                            className="font-bold hover:text-foreground/80 transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Linards M.
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
