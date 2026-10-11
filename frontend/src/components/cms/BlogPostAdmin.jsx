"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useAdmin } from "@/components/cms/AdminProvider";
import BlogPostEditor from "@/components/cms/BlogPostEditor";

// "Edit article" for LEGACY (block-structured) articles only. Dynamic
// articles are edited inline on the page, and their title / URL / excerpt /
// category / publish state live in the admin bar's "Article settings"
// (the collection panel). Built-in (not yet migrated) articles can only be
// edited after running the seed script.
export default function BlogPostAdmin({ post }) {
    const { editMode } = useAdmin();
    const [open, setOpen] = useState(false);
    const router = useRouter();

    if (!editMode || post?.body_mode === "dynamic") return null;

    if (!post) {
        return (
            <div className="cms-ui fixed right-4 top-[90px] z-[1400] max-w-[280px] rounded-xl bg-[#FFFAEB] px-4 py-3 text-[12px] text-[#B54708] shadow-lg">
                This is a built-in article. Run <code>npm run cms:seed</code> to move the articles into the CMS so they can be edited.
            </div>
        );
    }

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="cms-ui fixed right-4 top-[90px] z-[1400] rounded-full bg-[var(--cms-accent)] px-4 py-2 text-[13px] font-semibold text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] hover:brightness-110"
            >
                Edit article
            </button>

            {open ? (
                <BlogPostEditor
                    post={post}
                    onClose={() => setOpen(false)}
                    onSaved={(saved) => {
                        setOpen(false);
                        if (saved.slug !== post.slug) router.push(`/blog/${saved.slug}`);
                        else router.refresh();
                    }}
                    onDeleted={() => router.push("/resources")}
                />
            ) : null}
        </>
    );
}
