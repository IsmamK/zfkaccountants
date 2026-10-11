"use client";

import Link from "next/link";
import { FaArrowRight, FaCheck } from "react-icons/fa";

import { useCms } from "@/components/cms/useCms";

/* =========================================
   /services: how pricing works. Prices depend
   on each business, so this explains what
   shapes a quote instead of listing prices.
========================================= */

const defaults = {
    eyebrow: "PRICING",
    titleLine1: "Quotes tailored",
    titleHighlight: "to your business.",
    description:
        "We don't sell one-size-fits-all packages. After a free consultation we quote for exactly what your business needs, and agree it with you before any work starts.",
    promises: [
        "Free, no-obligation consultation",
        "A clear quote agreed before work starts",
        "Anything outside the quote agreed with you first",
    ],
    buttonText: "Book a Free Consultation",
    buttonHref: "/contact",
    factorsTitle: "What shapes your quote",
    factors: [
        { title: "Transaction volume", text: "How many sales, purchases and bank transactions we work with each period." },
        { title: "Team size", text: "How many people you pay through your monthly payroll." },
        { title: "VAT scheme", text: "Your VAT scheme and how complex your quarterly returns are." },
        { title: "State of your records", text: "Whether your bookkeeping is up to date or needs tidying first." },
        { title: "Services you need", text: "One service on its own, or several handled together." },
        { title: "Upcoming deadlines", text: "How soon your next VAT, payroll or filing deadline falls." },
    ],
};

export default function ServicesPricing() {
    const { data, hidden, E, editButton } = useCms("services-pricing", defaults, { label: "Services: how pricing works" });

    // Hidden by an admin: nothing is rendered for visitors.
    if (hidden) return null;

    return (
        <section id="pricing" className="relative bg-white py-16 sm:py-20 lg:py-24">
            {editButton}

            <div className="mx-auto grid w-full max-w-[1280px] gap-12 px-5 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 lg:px-8">
                <div className="lg:sticky lg:top-28 lg:self-start">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#0F9E86] sm:text-xs">
                        <E.Text path="eyebrow" />
                    </p>
                    <h2 className="mt-3 font-serif text-[34px] font-bold leading-[1.08] tracking-[-0.02em] text-[#123A5C] sm:text-[42px] lg:text-[48px]">
                        <E.Text path="titleLine1" />{" "}
                        <span className="text-[#FF6B4A]"><E.Text path="titleHighlight" /></span>
                    </h2>
                    <p className="mt-5 max-w-[520px] text-[15px] leading-7 text-[#475569] sm:text-[16px]">
                        <E.Text path="description" multiline />
                    </p>

                    <ul className="mt-7 space-y-3">
                        {data.promises.map((promise, index) => (
                            <li key={index} className="relative flex items-start gap-3 text-[15px] font-medium leading-6 text-[#123A5C]">
                                <E.Item path="promises" index={index} />
                                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0F9E86]/10 text-[#0F9E86]" aria-hidden="true">
                                    <FaCheck size={11} />
                                </span>
                                <E.Text path={`promises.${index}`} />
                            </li>
                        ))}
                        <E.Add path="promises" label="Add promise" />
                    </ul>

                    <Link
                        href={data.buttonHref}
                        className="mt-8 inline-flex min-h-[50px] items-center justify-center gap-3 rounded-xl bg-[#FF6B4A] px-7 text-[15px] font-semibold text-white shadow-[0_12px_28px_rgba(255,107,74,0.25)] transition hover:brightness-95"
                    >
                        <E.Text path="buttonText" /><E.Link path="buttonHref" />
                        <FaArrowRight size={13} aria-hidden="true" />
                    </Link>
                </div>

                <div className="rounded-[30px] bg-[#F4F7F8] p-6 sm:p-8 lg:p-10">
                    <h3 className="font-serif text-[24px] font-bold text-[#123A5C] sm:text-[28px]">
                        <E.Text path="factorsTitle" />
                    </h3>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        {data.factors.map((factor, index) => (
                            <div key={index} className="relative rounded-[20px] bg-white p-5 shadow-[0_10px_28px_rgba(18,58,92,0.07)] transition hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(18,58,92,0.11)]">
                                <E.Item path="factors" index={index} />
                                <span className="text-[13px] font-bold text-[#0F9E86]">{String(index + 1).padStart(2, "0")}</span>
                                <p className="mt-2 text-[16px] font-bold text-[#123A5C]">
                                    <E.Text path={`factors.${index}.title`} />
                                </p>
                                <p className="mt-1.5 text-[14px] leading-6 text-[#64748B]">
                                    <E.Text path={`factors.${index}.text`} multiline />
                                </p>
                            </div>
                        ))}
                        <E.Add path="factors" label="Add factor" />
                    </div>
                </div>
            </div>
        </section>
    );
}
