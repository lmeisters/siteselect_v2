import { Info } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

export function AboutSheet() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <button className="group rounded-lg p-2 border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                    <Info className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>About SiteSelect</SheetTitle>
                    <SheetDescription>
                        Your gateway to discovering exceptional website designs
                        and creative inspiration.
                    </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                    <p className="text-sm text-muted-foreground">
                        Explore our handpicked collection of the web's finest
                        designs. From stunning layouts to innovative
                        interactions, SiteSelect showcases the best in modern
                        web design. Perfect for designers, developers, and
                        creative professionals seeking fresh inspiration for
                        their next project.
                    </p>
                    <div className="border-t pt-4">
                        <p className="text-sm font-medium">
                            Want your website featured?
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Submit at{" "}
                            <a
                                href="mailto:siteselect@gmail.com"
                                className="text-primary hover:opacity-80"
                            >
                                siteselect@gmail.com
                            </a>
                        </p>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
