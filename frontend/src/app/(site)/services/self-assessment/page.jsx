import DynamicContentPage, { dynamicPageMetadata } from "@/components/dynamic/DynamicContentPage";

// Edited in the CMS (Dashboard → Pages & builder, path "services/self-assessment"); built-in content lives in src/data/pages.
export function generateMetadata() {
    return dynamicPageMetadata("services/self-assessment");
}

export default function Page() {
    return <DynamicContentPage path="services/self-assessment" />;
}
