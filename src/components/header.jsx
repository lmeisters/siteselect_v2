import { Input } from "@/components/ui/input";
import { Info } from "lucide-react";
import Link from "next/link";

export const Header = () => (
    <nav className="border-b">
        <div className="max-w-8xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <Link href="/" className="text-xl font-bold tracking-tighter">
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
);
