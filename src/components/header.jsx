"use client";

import Link from "next/link";
import { SearchCommand } from "@/components/search-command";
import { AboutSheet } from "@/components/about-sheet";

export function Header() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
            <div className="max-w-8xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/" className="text-xl font-bold tracking-tighter">
                    SS.
                </Link>
                <div className="flex items-center space-x-4 flex-1 max-w-md mx-auto">
                    <SearchCommand />
                </div>
                <AboutSheet />
            </div>
        </nav>
    );
}
