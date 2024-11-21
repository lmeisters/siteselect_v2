import { Input } from "@/components/ui/input";
import { Info, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
    return (
        <div className="min-h-screen bg-background">
            {/* Navigation */}
            <nav className="border-b">
                <div className="max-w-8xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                    <Link
                        href="/"
                        className="text-xl font-bold tracking-tighter"
                    >
                        SiteSelect
                    </Link>
                    <div className="flex items-center space-x-4 flex-1 max-w-md mx-auto">
                        <Input
                            className="w-full rounded-2xl"
                            placeholder="Search for designs"
                            type="search"
                        />
                    </div>
                    <div className="w-10 flex justify-end">
                        <Info className="h-5 w-5" />
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-16 flex flex-col items-center justify-center">
                <div className="w-full text-center">
                    <h1 className="text-[clamp(4rem,15vw,16rem)] font-black leading-none tracking-tighter mx-auto">
                        SiteSelect
                    </h1>
                    <div className="mx-auto max-w-xl mt-32">
                        <p className="text-md leading-tight font-medium">
                            Discover the Web&apos;s Most Innovative Design
                            Galleries -
                        </p>
                        <p className="text-md leading-tight font-medium">
                            Categorized and Filtered for Instant Creative
                            Inspiration,
                        </p>
                        <p className="text-md leading-tight font-medium">
                            Featuring Rich Web Galleries with Stunning Examples
                            to Spark Creativity and Elevate Your Projects
                        </p>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h2 className="text-xl font-medium mb-6">Editors picks</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
                    <Link
                        href="#"
                        className="group relative aspect-[4/3] bg-gray-300 rounded-xl overflow-hidden hover:opacity-90 transition-opacity"
                    >
                        <div className="absolute top-3 left-3 bg-background/90 px-3 py-0.5 rounded-2xl text-sm font-bold">
                            Awwwards.com
                        </div>
                        <div className="absolute top-3 right-3 bg-background/90 p-1.5 rounded-full">
                            <ArrowUpRight className="h-4 w-4" />
                        </div>
                    </Link>
                    <Link
                        href="#"
                        className="group relative aspect-[4/3] bg-muted rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
                    >
                        <div className="absolute bottom-3 left-3 bg-background/90 px-3 py-1 rounded text-sm">
                            Featured Site
                        </div>
                    </Link>
                </div>
            </section>
        </div>
    );
}
