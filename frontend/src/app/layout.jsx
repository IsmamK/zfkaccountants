import "./globals.css";
import "./cms.css";

import { AdminProvider } from "@/components/cms/AdminProvider";
import AdminBar from "@/components/cms/AdminBar";
import Analytics from "@/components/seo/Analytics";
import { getSiteSettings } from "@/lib/cms";
import { SITE_NAME, verificationFrom } from "@/lib/seo";

const FALLBACK_TITLE = "ZFK Accountants | Accountancy & Tax Services";
const FALLBACK_DESCRIPTION =
    "Professional UK accountancy, tax and compliance services for businesses and individuals.";

function safeUrl(value) {
    try {
        return value ? new URL(value) : undefined;
    } catch {
        return undefined;
    }
}

// Site-wide defaults from SiteSettings.seoDefaults; pages override per route.
export async function generateMetadata() {
    const settings = await getSiteSettings();
    const seo = settings.seoDefaults || {};
    const template = seo.titleTemplate && seo.titleTemplate.includes("%s") ? seo.titleTemplate : "%s | ZFK Accountants";
    const defaultTitle = seo.defaultTitle || FALLBACK_TITLE;
    const description = seo.defaultDescription || FALLBACK_DESCRIPTION;
    const robots = seo.robots || {};

    return {
        metadataBase: safeUrl(seo.siteUrl || process.env.NEXT_PUBLIC_SITE_URL),
        title: { template, default: defaultTitle },
        description,
        applicationName: settings.organization?.name || SITE_NAME,
        openGraph: {
            type: "website",
            siteName: settings.organization?.name || SITE_NAME,
            locale: seo.locale || "en_GB",
            title: defaultTitle,
            description,
            ...(seo.defaultOgImage
                ? { images: [{ url: seo.defaultOgImage, width: 1200, height: 630, alt: seo.defaultOgImageAlt || defaultTitle }] }
                : {}),
        },
        twitter: {
            card: seo.twitterCard || "summary_large_image",
            ...(seo.twitterHandle ? { site: seo.twitterHandle } : {}),
        },
        robots: { index: robots.index !== false, follow: robots.follow !== false },
        verification: verificationFrom(settings.verification),
        formatDetection: { telephone: false },
    };
}

export async function generateViewport() {
    const settings = await getSiteSettings();
    const themeColor = settings.seoDefaults?.themeColor || settings.brand?.primaryColor;
    return themeColor ? { themeColor } : {};
}

export default async function RootLayout({ children }) {
    // Organization/WebSite JSON-LD is part of each page's seo/resolve graph
    // (see <PageSeo>), so it is not repeated here.
    const settings = await getSiteSettings();
    const lang = (settings.seoDefaults?.locale || "en_GB").split("_")[0];

    return (
        <html lang={lang}>
            <body>
                <AdminProvider>
                    {children}

                    <AdminBar />

                    {/* Inside the provider: the cookie banner's text is editable in place. */}
                    <Analytics analytics={settings.analytics} />
                </AdminProvider>
            </body>
        </html>
    );
}
