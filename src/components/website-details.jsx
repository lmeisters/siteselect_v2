"use client";

import { WebsiteCard } from "@/components/ui/website-card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export function WebsiteDetails({ website }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="cursor-pointer">
                    <WebsiteCard
                        name={website.name}
                        href={website.href}
                        tags={website.tags}
                    />
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-3xl">
                <div className="space-y-4">
                    <WebsiteCard
                        name={website.name}
                        href={website.href}
                        tags={website.tags}
                        size="featured"
                    />
                    <div className="prose prose-gray">
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
