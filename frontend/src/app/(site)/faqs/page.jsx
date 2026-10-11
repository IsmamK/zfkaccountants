import FAQPageClient from "@/components/faqs/FAQPageClient";
import CmsSection from "@/components/cms/CmsSection";
import PageSeo from "@/components/seo/PageSeo";
import { pageMetadata } from "@/lib/seo";

const fallbackMetadata = {
    title: "Accounting & Tax FAQs | ZFK Accountants",
    description:
        "Answers to common questions about UK accounts, VAT returns, payroll, Self Assessment, pricing and working online with ZFK Accountants.",
};

export function generateMetadata() {
    return pageMetadata("/faqs", fallbackMetadata);
}

export default function FAQPage() {
    return (
        <CmsSection names={["faq-items", "faq-hero", "faq-help-card", "faq-cta"]}>
            <FAQPageClient />

            <PageSeo path="/faqs" />
        </CmsSection>
    );
}
