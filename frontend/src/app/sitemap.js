import { getBlogPosts, getContentPages, getPageSeoList } from "@/lib/cms";
import { articles as localArticles } from "@/data/articles";
import { STATIC_ROUTES, siteUrl } from "@/lib/site";
import { BUILTIN_PAGES } from "@/data/pages";

export const revalidate = 3600;

// Static routes + published blog posts + published CMS pages, minus any
// page an admin marked noindex or excluded from the sitemap.
export default async function sitemap() {
    const [base, seoRows, posts, pages] = await Promise.all([
        siteUrl(),
        getPageSeoList(),
        getBlogPosts(),
        getContentPages(),
    ]);

    const seoByPath = Object.fromEntries(seoRows.map((row) => [row.path, row.data || {}]));
    const excluded = (path) => {
        const data = seoByPath[path || "home"];
        return data?.sitemap?.include === false || data?.robots?.index === false;
    };

    const entries = [];
    const add = (path, extra = {}) => {
        if (excluded(path)) return;
        const seo = seoByPath[path || "home"]?.sitemap || {};
        entries.push({
            url: path ? `${base}/${path}` : `${base}/`,
            lastModified: extra.lastModified || new Date(),
            changeFrequency: seo.changefreq || extra.changeFrequency || "monthly",
            priority: typeof seo.priority === "number" ? seo.priority : extra.priority ?? 0.5,
        });
    };

    for (const route of STATIC_ROUTES) add(route.path, route);

    if (posts && posts.length) {
        for (const post of posts) {
            add(`blog/${post.slug}`, { lastModified: post.updated_at, changeFrequency: "monthly", priority: 0.6 });
        }
    } else {
        for (const article of localArticles) {
            add(`blog/${article.slug}`, { changeFrequency: "monthly", priority: 0.6 });
        }
    }

    const cmsPaths = new Set();
    for (const page of pages) {
        if (page.body_mode !== "dynamic") continue;
        cmsPaths.add(page.path);
        add(page.path, { lastModified: page.updated_at, priority: page.path.startsWith("services/") ? 0.8 : 0.6 });
    }

    // Built-in pages render even before they exist in the CMS.
    for (const path of Object.keys(BUILTIN_PAGES)) {
        if (!cmsPaths.has(path)) add(path, { priority: path.startsWith("services/") ? 0.8 : 0.4 });
    }

    return entries;
}
