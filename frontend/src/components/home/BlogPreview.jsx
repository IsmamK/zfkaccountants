"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";

import { useCms } from "@/components/cms/useCms";

const defaults = {
    eyebrow: "Latest Insights",
    title: "Guidance to keep your",
    titleHighlight: "business ahead.",
    description:
        "Practical advice on VAT, accounts, Self Assessment and compliance from the ZFK Accountants team.",
    buttonText: "View all articles",
    buttonHref: "/resources",
    articleCount: 3,
    readMoreText: "Read Article",
};

const fields = {
    articleCount: { label: "Number of articles to show (1–6)" },
};

// The newest articles from the CMS blog (falls back to the built-in ones).
export default function BlogPreview({ articles = [] }) {
    const { data, E, editButton, hidden } = useCms("home-blog-preview", defaults, {
        label: "Latest articles",
        fields,
    });

    const count = Math.min(6, Math.max(1, Number(data.articleCount) || 3));
    const latest = articles.slice(0, count);

    if (!latest.length) return null;

    // Hidden by an admin: nothing is rendered for visitors.
    if (hidden) return null;

    return (
        <section className="relative overflow-hidden bg-[#F4F7F8] py-16 sm:py-20 lg:py-24">
            {editButton}

            <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-6 lg:px-8">
                <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
                    <div className="max-w-[620px]">
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#0F9E86]">
                            <E.Text path="eyebrow" />
                        </p>

                        <h2 className="mt-4 font-serif text-[34px] font-bold leading-[1.1] text-[#123A5C] sm:text-[42px]">
                            <E.Text path="title" />{" "}
                            <span className="text-[#FF6B4A]"><E.Text path="titleHighlight" /></span>
                        </h2>

                        <p className="mt-4 text-[15px] leading-7 text-[#475569] sm:text-base">
                            <E.Text path="description" />
                        </p>
                    </div>

                    <Link
                        href={data.buttonHref}
                        className="inline-flex shrink-0 items-center gap-3 rounded-xl border border-[#123A5C]/20 bg-white px-6 py-3 text-sm font-semibold text-[#123A5C] shadow-sm transition hover:-translate-y-0.5 hover:border-[#0F9E86] hover:text-[#0F9E86]"
                    >
                        <E.Text path="buttonText" /><E.Link path="buttonHref" />
                        <FaArrowRight size={12} />
                    </Link>
                </div>

                <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {latest.map((article, index) => (
                        <motion.div
                            key={article.slug}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                        >
                            <Link href={`/blog/${article.slug}`} className="group block h-full">
                                <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-[#E2E6E5] bg-white shadow-[0_15px_45px_rgba(6,40,68,0.08)] transition-all duration-500 hover:-translate-y-2 hover:border-[#062844] hover:bg-[#062844]">
                                    <div className="relative h-[210px] overflow-hidden">
                                        <Image
                                            src={article.image}
                                            alt={article.imageAlt || article.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <span className="absolute left-5 top-5 rounded-full bg-white/95 px-5 py-2 text-xs font-semibold text-[#123A5C] backdrop-blur">
                                            {article.category}
                                        </span>
                                    </div>

                                    <div className="flex flex-1 flex-col p-7">
                                        <p className="mb-4 flex gap-4 text-xs text-[#12BFAE]">
                                            <span>📅 {article.date}</span>
                                            <span>◷ {article.read}</span>
                                        </p>

                                        <h3 className="font-serif text-xl font-bold leading-snug text-[#123A5C] transition-colors duration-500 group-hover:text-white">
                                            {article.title}
                                        </h3>

                                        <p className="mt-3 flex-1 text-sm leading-6 text-[#64748B] transition-colors duration-500 group-hover:text-white/75">
                                            {article.description}
                                        </p>

                                        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0F9E86]">
                                            <E.Text path="readMoreText" /> <FaArrowRight size={11} />
                                        </span>
                                    </div>
                                </article>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
