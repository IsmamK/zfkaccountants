import Link from "next/link";

import DraftPreview from "@/components/cms/DraftPreview";

export const metadata = {
    title: { absolute: "Page Not Found | ZFK Accountants" },
    robots: { index: false, follow: true },
};

export default function NotFound() {
    return (
        <DraftPreview>
            <section className="bg-[linear-gradient(180deg,#061120_0%,#08152A_100%)] px-5 pb-24 pt-[160px] text-center text-white">
                <p className="text-[12px] font-semibold uppercase tracking-[0.32em] text-[#0F9E86]">404</p>
                <h1 className="mt-4 font-serif text-[40px] font-bold sm:text-[52px]">Page not found</h1>
                <p className="mx-auto mt-4 max-w-[460px] text-[15px] leading-7 text-[#D7E2EE]">
                    The page you were looking for has moved or no longer exists.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <Link href="/" className="rounded-lg bg-[#FF6B4A] px-6 py-3 text-[14px] font-semibold text-white">Back to home</Link>
                    <Link href="/resources" className="rounded-lg border border-white/35 px-6 py-3 text-[14px] font-semibold text-white">Browse resources</Link>
                </div>
            </section>
        </DraftPreview>
    );
}
