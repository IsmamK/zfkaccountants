import { CmsDataProvider } from "@/components/cms/CmsDataProvider";
import { getContents } from "@/lib/cms";

// Server wrapper: fetch the named content blobs, then render children
// with that data available to their useCms() hooks.
// `shared`: these blocks appear on many pages (a layout's header, footer,
// CTA; a template's labels), so every one of them is excluded from page
// keyword coverage and whole-page AI assist.
export default async function CmsSection({ names, shared = false, children }) {
    const data = await getContents(names);
    return <CmsDataProvider data={data} shared={shared ? names : []}>{children}</CmsDataProvider>;
}
