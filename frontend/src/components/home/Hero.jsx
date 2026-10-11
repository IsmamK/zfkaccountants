"use client";

import Link from "next/link";
import Image from "next/image";

import { useCms } from "@/components/cms/useCms";
import { mediaUrl } from "@/lib/api";

const defaults = {
    eyebrow: "Online UK Accountants",
    titleLine1: "Online accountants",
    titleLine2: "for UK businesses.",
    description:
        "Quarterly VAT returns, monthly payroll, annual accounts and Self Assessment, handled 100% online",
    descriptionDesktopExtra:
        "wherever you are in the UK, accurately and on time",
    primaryButtonText: "Book a Free Consultation",
    primaryButtonHref: "/contact",
    secondaryButtonText: "Explore Services",
    secondaryButtonHref: "/services",
    trustItems: [
        {
            label: "100% Online, UK-wide",
            firstLine: "100% Online",
            secondLine: "UK-wide",
        },
        {
            label: "Tailored Quotes",
            firstLine: "Tailored",
            secondLine: "Quotes",
        },
        {
            label: "Cloud Accounting Support",
            firstLine: "Cloud Accounting",
            secondLine: "Support",
        },
    ],
    image: "/images/home/hero-man.png",
    imageAlt: "Accountant working on a laptop",
    accreditationTitleLine1: "Online accountants.",
    accreditationTitleLine2: "Wherever you are in the UK.",
    accreditations: ["VAT", "Payroll", "Accounts", "Tax returns"],
};

const fields = {
    descriptionDesktopExtra: { label: "Description (extra text on desktop)" },
    "trustItems[].firstLine": { label: "Mobile line 1" },
    "trustItems[].secondLine": { label: "Mobile line 2" },
    accreditations: { label: "Services (mobile card)" },
};

const doodles = [
    {
        className: "right-[20%] top-[36%] hidden 2xl:block",
        content: <div className="text-3xl text-[#FF6B4A]">✦</div>,
    },
];

export default function Hero() {
    const { data, E, editButton, hidden } = useCms("home-hero", defaults, {
        label: "Home hero",
        fields,
        buttonPosition: "right-3 top-[90px]",
    });

    // Hidden by an admin: nothing is rendered for visitors.
    if (hidden) return null;

    return (
        <section className="ae-hero relative h-[var(--ae-vh)] overflow-hidden">
            {editButton}

            {/* Original background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(18,58,107,0.33),transparent_22%),radial-gradient(circle_at_52%_34%,rgba(16,41,84,0.30),transparent_24%),radial-gradient(circle_at_72%_60%,rgba(34,44,92,0.26),transparent_30%),linear-gradient(180deg,#061120_0%,#08152A_42%,#071224_100%)]" />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_52%,rgba(9,31,63,0.18),transparent_32%)]" />

            {doodles.map((doodle, index) => (
                <div
                    key={index}
                    className={`pointer-events-none absolute z-[1] ${doodle.className}`}
                >
                    {doodle.content}
                </div>
            ))}

            <div
                className="
                    ae-hero-inner
                    relative z-10 mx-auto flex h-full w-full
                    max-w-[1280px] flex-col px-5 pt-[88px]
                    sm:px-6 sm:pt-[96px]
                    lg:justify-center lg:px-8 lg:pb-[64px] lg:pt-[100px]
                "
            >
                <div
                    className="
                        ae-hero-grid
                        grid items-center gap-8
                        lg:grid-cols-[minmax(0,470px)_minmax(0,1fr)]
                        lg:gap-4
                        xl:grid-cols-[minmax(0,500px)_minmax(0,1fr)]
                    "
                >
                    <div className="ae-hero-copy max-w-[500px] self-center">
                        <p
                            className="
                                ae-hero-eyebrow
                                mb-4 text-[11px] font-semibold uppercase
                                tracking-[0.32em] text-[#0F9E86] sm:text-xs
                            "
                        >
                            <E.Text path="eyebrow" />
                        </p>

                        <h1
                            className="
                                ae-hero-title
                                max-w-[450px] text-[34px] font-bold
                                leading-[0.98] tracking-[-0.045em]
                                text-[#F7F8FB]
                                sm:text-[40px] md:text-[48px]
                                lg:text-[52px] xl:text-[56px]
                            "
                        >
                            <span className="block"><E.Text path="titleLine1" /></span>
                            <span className="block"><E.Text path="titleLine2" /></span>
                        </h1>

                        <p
                            className="
                                ae-hero-description
                                mt-4 max-w-[400px] text-[14px]
                                leading-[1.8] text-[#DFE7F3] sm:text-[15px]
                            "
                        >
                            <E.Text path="description" />
                            {data.descriptionDesktopExtra ? (
                                <span className="hidden lg:inline">
                                    {" "}<E.Text path="descriptionDesktopExtra" />
                                </span>
                            ) : null}
                            .
                        </p>

                        {/* Buttons */}
                        <div className="ae-hero-actions mt-6 flex flex-wrap items-center gap-3">
                            <Link
                                href={data.primaryButtonHref}
                                className="
                                    inline-flex min-h-[44px] items-center
                                    justify-center rounded-md bg-[#FF6B4A]
                                    px-5 py-3 text-sm font-semibold text-white
                                    transition hover:brightness-95
                                "
                            >
                                <E.Text path="primaryButtonText" /><E.Link path="primaryButtonHref" />
                            </Link>

                            <Link
                                href={data.secondaryButtonHref}
                                className="
                                    inline-flex min-h-[44px] items-center
                                    justify-center rounded-md border border-white/35
                                    px-5 py-3 text-sm font-semibold text-white
                                    transition hover:bg-white/8
                                "
                            >
                                <E.Text path="secondaryButtonText" /><E.Link path="secondaryButtonHref" />
                            </Link>
                        </div>

                        {/* Three trust points */}
                        <div
                            className="
                                ae-hero-benefits
                                mt-5 grid max-w-[510px] gap-x-4 gap-y-2
                                text-[12px] text-[#D8E4F0]
                                sm:grid-cols-3 sm:text-[12.5px]
                            "
                        >
                            {data.trustItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="relative 
                                        ae-hero-benefit
                                        flex items-center gap-2 whitespace-nowrap
                                    "
                                >
                                    <E.Item path="trustItems" index={index} />
                                    <span
                                        aria-hidden="true"
                                        className="ae-hero-check text-[#0F9E86]"
                                    >
                                        ✓
                                    </span>

                                    <span className="hidden lg:inline">
                                        <E.Text path={`trustItems.${index}.label`} />
                                    </span>

                                    <span className="ae-benefit-mobile lg:hidden">
                                        <E.Text path={`trustItems.${index}.firstLine`} />
                                        <br />
                                        <E.Text path={`trustItems.${index}.secondLine`} />
                                    </span>
                                </div>
                            ))}
                            <E.Add path="trustItems" label="Add point" />
                        </div>
                    </div>

                    {/* Image fills the remaining mobile height */}
                    <div
                        className="
                            ae-hero-art
                            relative flex min-h-[280px]
                            items-end justify-center
                            lg:min-h-[430px] xl:min-h-[500px]
                        "
                    >
                        <E.Image path="image" />
                        <Image
                            src={mediaUrl(data.image)}
                            alt={data.imageAlt}
                            width={1200}
                            height={900}
                            priority
                            className="
                                ae-hero-image
                                relative z-10 h-auto w-full
                                max-w-[720px] object-contain
                                lg:max-w-[760px] xl:max-w-[800px]
                            "
                        />
                    </div>

                    {/* Compact services card: mobile only */}
                    <div className="ae-hero-accreditation hidden">
                        <p className="ae-accreditation-title">
                            <E.Text path="accreditationTitleLine1" />
                            <br />
                            <E.Text path="accreditationTitleLine2" />
                        </p>

                        <ul
                            className="ae-accreditation-names"
                            aria-label="Professional organisations"
                        >
                            {data.accreditations.map((name, index) => (
                                <li key={index} className="relative">
                                    <E.Item path="accreditations" index={index} />
                                    <E.Text path={`accreditations.${index}`} />
                                </li>
                            ))}
                            <E.Add path="accreditations" label="Add service" />
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}