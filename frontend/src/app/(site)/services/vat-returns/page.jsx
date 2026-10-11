import DynamicContentPage, { dynamicPageMetadata } from "@/components/dynamic/DynamicContentPage";

// Edited in the CMS (Dashboard → Pages & builder, path "services/vat-returns"); built-in content lives in src/data/pages.
export function generateMetadata() {
    return dynamicPageMetadata("services/vat-returns");
}

export default function Page() {
    return <DynamicContentPage path="services/vat-returns" />;
}
