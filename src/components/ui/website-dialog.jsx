"use client";

import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { WebsiteCard } from "@/components/ui/website-card";

export function WebsiteDialog({ website, children }) {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-3xl">
                <DialogTitle className="sr-only">{website.name}</DialogTitle>
                <DialogDescription className="sr-only">
                    {website.description}
                </DialogDescription>
                <div className="space-y-4">
                    <WebsiteCard
                        name={website.name}
                        href={website.href}
                        tags={website.tags}
                        size="featured"
                    />
                    <div className="mt-8 prose prose-gray">
                        <h1 className="text-4xl font-bold">{website.name}</h1>
                        <p className="text-lg text-gray-600">
                            {website.description}
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
