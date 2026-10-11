import DynamicContentPage, { dynamicPageMetadata } from "@/components/dynamic/DynamicContentPage";

// Edited in the CMS (Dashboard → Pages & builder, path "legal"); built-in content lives in src/data/pages.
export function generateMetadata() {
    return dynamicPageMetadata("legal");
}

export default function Page() {
    return <DynamicContentPage path="legal" />;
}
