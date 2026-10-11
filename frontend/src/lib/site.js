import "server-only";

import { getSiteSettings } from "@/lib/cms";

// Public origin of this site, no trailing slash.
export async function siteUrl() {
    const settings = await getSiteSettings();
    const url = settings.seoDefaults?.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    return url.replace(/\/+$/, "");
}

// Routes that exist in code (dynamic CMS pages are added from the API).
export const STATIC_ROUTES = [
    { path: "", changeFrequency: "weekly", priority: 1 },
    { path: "about", changeFrequency: "monthly", priority: 0.8 },
    { path: "services", changeFrequency: "monthly", priority: 0.9 },
    { path: "resources", changeFrequency: "weekly", priority: 0.8 },
    { path: "faqs", changeFrequency: "monthly", priority: 0.7 },
    { path: "contact", changeFrequency: "monthly", priority: 0.8 },
];
