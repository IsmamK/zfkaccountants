import { getSiteSettings } from "@/lib/cms";
import { siteUrl } from "@/lib/site";

export const revalidate = 3600;

// Mirrors the backend's robots rules. seoDefaults.robots.index === false
// (e.g. staging) blocks everything.
export default async function robots() {
    const [settings, base] = await Promise.all([getSiteSettings(), siteUrl()]);
    const blocked = settings.seoDefaults?.robots?.index === false;
    const rules = settings.robotsTxt || {};

    return {
        rules: blocked
            ? [{ userAgent: "*", disallow: "/" }]
            : [{
                  userAgent: "*",
                  allow: rules.allow?.length ? rules.allow : "/",
                  disallow: ["/admin", "/api/", ...(rules.disallow || []).filter((p) => p !== "/api/")],
              }],
        sitemap: `${base}/sitemap.xml`,
    };
}
