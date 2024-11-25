"use client";

import { ScrollArea } from "@/components/ui/scroll-area";

export function ScrollWrapper({ children }) {
    return (
        <ScrollArea className="h-screen min-h-[100dvh]">{children}</ScrollArea>
    );
}
