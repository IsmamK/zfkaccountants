import DynamicContentPage, { dynamicPageMetadata } from "@/components/dynamic/DynamicContentPage";

// Any path without its own route is looked up as a CMS ContentPage.
function pathFrom(slug) {
    return slug.map((part) => decodeURIComponent(part)).join("/").toLowerCase();
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    return dynamicPageMetadata(pathFrom(slug));
}

export default async function CmsPage({ params }) {
    const { slug } = await params;
    return <DynamicContentPage path={pathFrom(slug)} />;
}
