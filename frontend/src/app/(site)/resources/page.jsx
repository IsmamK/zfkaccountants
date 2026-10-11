import ResourcesPageClient from "@/components/resources/ResourcesPageClient";
import CmsSection from "@/components/cms/CmsSection";
import PageSeo from "@/components/seo/PageSeo";
import { articlesFrom } from "@/lib/blog";
import { getBlogPosts } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";

const fallbackMetadata = {
    title: "Accounting Resources & Tax Guides | ZFK Accountants",
    description:
        "Practical guides on VAT returns, annual accounts, Self Assessment, payroll and UK tax deadlines from the ZFK Accountants team.",
};

export function generateMetadata() {
    return pageMetadata("/resources", fallbackMetadata);
}

export default async function ResourcesPage() {
    const articles = articlesFrom(await getBlogPosts());

    return (
        <CmsSection names={["resources-hero"]}>
            <ResourcesPageClient articles={articles} />

            <PageSeo path="/resources" />
        </CmsSection>
    );
}
