"use client";

import Link from "next/link";
import { useState } from "react";
import {
    FaBuildingShield,
    FaCoins,
    FaCloud,
    FaCalendarCheck,
    FaLaptop,
    FaArrowRight,
    FaXmark,
} from "react-icons/fa6";

import { useCms } from "@/components/cms/useCms";

const ICONS = {
    shield: FaBuildingShield,
    coins: FaCoins,
    cloud: FaCloud,
    calendar: FaCalendarCheck,
    laptop: FaLaptop,
};

const defaults = {
    titleLine1: "Why Choose",
    titleLine2: "ZFK",
    titleHighlight: "Accountants",
    description:
        "More than just accountants: a long-term partner for your VAT, payroll, accounts and tax, delivered entirely online.",
    linkText: "Learn more",
    features: [
        {
            title: "100% Online, UK-wide",
            short:
                "Work with us from anywhere in the UK, with video calls and secure online document sharing.",
            details:
                "Everything happens online, from your first consultation to every filing, so there's never a need to visit an office.",
            benefits: [
                "Video consultations",
                "Secure online records",
                "Clients across the UK",
            ],
            icon: "laptop",
        },
        {
            title: "Tailored Quotes",
            short:
                "Every business is different, so you get a clear quote based on exactly what you need.",
            details:
                "After a free consultation we quote for your specific needs, so you only pay for the work your business requires.",
            benefits: [
                "Free consultation first",
                "Quote agreed upfront",
                "Priced to your needs",
            ],
            icon: "coins",
        },
        {
            title: "Cloud Accounting Support",
            short:
                "We work with Xero, QuickBooks and more to keep you connected anytime, anywhere.",
            details:
                "We help businesses use modern cloud accounting systems to make financial management easier and more efficient.",
            benefits: [
                "Cloud software support",
                "Real-time access",
                "Simplified bookkeeping",
            ],
            icon: "cloud",
        },
        {
            title: "Deadline Reminders",
            short:
                "Never miss an important deadline again. We keep you ahead all year round.",
            details:
                "We monitor important accounting deadlines and help make sure your business stays compliant throughout the year.",
            benefits: [
                "Tax deadline tracking",
                "Compliance reminders",
                "Less stress",
            ],
            icon: "calendar",
        },
    ],
    authorityTitleLine1: "100% online.",
    authorityTitleLine2: "UK-wide.",
    companies: ["Video calls", "Secure online records", "Cloud software", "Deadline reminders"],
    popupButtonText: "Book a Free Consultation",
    popupButtonHref: "/contact",
};

const fields = {
    "features[].icon": { type: "select", options: Object.keys(ICONS) },
    "features[].short": { label: "Card text" },
    "features[].details": { label: "Popup text" },
    "features[].benefits": { label: "Popup benefits" },
};

export default function WhyChooseUs() {
    const [selected, setSelected] = useState(1);
    const [popup, setPopup] = useState(null);

    const { data, E, editButton, hidden } = useCms("home-why-choose-us", defaults, {
        label: "Why choose us",
        fields,
    });

    const content = {
        ...data,
        features: data.features.map((item) => ({ ...item, icon: ICONS[item.icon] || FaBuildingShield })),
        editButton,
        E,
    };

    // Hidden by an admin: nothing is rendered for visitors.
    if (hidden) return null;

    return (
        <>
            <MobileWhyChooseUs
                data={content}
                selected={selected}
                setSelected={setSelected}
                setPopup={setPopup}
            />

            <DesktopWhyChooseUs
                data={content}
                selected={selected}
                setSelected={setSelected}
                setPopup={setPopup}
            />

            <FeaturePopup
                data={content}
                popup={popup}
                setPopup={setPopup}
            />
        </>
    );
}

/* =========================================================
   MOBILE AND TABLET SECTION
========================================================= */

function MobileWhyChooseUs({
    data,
    selected,
    setSelected,
    setPopup,
}) {
    return (
        <section
            className="
                relative
                isolate
                h-[calc(var(--ae-svh)-56px)]
                overflow-hidden
                bg-gradient-to-br
                from-[#F9FCFD]
                via-white
                to-[#F2F8FA]
                lg:hidden
            "
        >
            {data.editButton}

            {/* Background glow */}
            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -left-24
                    top-[20%]
                    h-[260px]
                    w-[260px]
                    rounded-full
                    bg-[#DFF6F2]/60
                    blur-3xl
                "
            />

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -right-28
                    bottom-[12%]
                    h-[280px]
                    w-[280px]
                    rounded-full
                    bg-[#FFE7E1]/50
                    blur-3xl
                "
            />

            <div
                className="
                    relative
                    z-10
                    mx-auto
                    flex
                    h-full
                    w-full
                    max-w-[760px]
                    flex-col
                    px-[clamp(16px,5vw,36px)]
                    pb-[clamp(8px,1.3svh,16px)]
                    pt-[clamp(12px,1.8svh,22px)]
                "
            >
                {/* Mobile heading */}
                <div className="shrink-0 text-center">
                    <h2
                        className="
                            font-serif
                            text-[clamp(28px,4.8svh,48px)]
                            font-bold
                            leading-[1.04]
                            tracking-[-0.025em]
                            text-[#123A5C]
                        "
                    >
                        <data.E.Text path="titleLine1" />
                        <span className="block">
                            <data.E.Text path="titleLine2" />{" "}
                            <span className="text-[#0F9E86]">
                                <data.E.Text path="titleHighlight" />
                            </span>
                        </span>
                    </h2>

                    <p
                        className="
                            mx-auto
                            mt-[clamp(7px,1.1svh,12px)]
                            max-w-[620px]
                            text-[clamp(12px,1.7svh,18px)]
                            leading-[1.45]
                            text-[#475569]
                        "
                    >
                        <data.E.Text path="description" />
                    </p>
                </div>

                {/* Mobile cards area */}
                <div
                    className="
                        mt-[clamp(12px,1.8svh,20px)]
                        flex
                        min-h-0
                        flex-1
                        items-center
                    "
                >
                    <div
                        className="
                            grid
                            h-full
                            max-h-[520px]
                            w-full
                            grid-cols-2
                            grid-rows-2
                            gap-[clamp(10px,1.5svh,16px)]
                        "
                    >
                        {data.features.map((item, index) => {
                            const Icon = item.icon;
                            const active = selected === index;

                            return (
                                <div
                                    key={index}
                                    onClick={() => setSelected(index)}
                                    className={`
                                        group
                                        relative
                                        flex
                                        min-h-0
                                        cursor-pointer
                                        flex-col
                                        overflow-hidden
                                        rounded-[clamp(20px,3svh,28px)]
                                        border
                                        p-[clamp(12px,1.9svh,22px)]
                                        transition-all
                                        duration-500

                                        ${active
                                            ? `
                                                    border-[#123A5C]
                                                    bg-gradient-to-br
                                                    from-[#073B61]
                                                    via-[#123A5C]
                                                    to-[#263D59]
                                                    text-white
                                                    shadow-[0_18px_40px_rgba(18,58,92,0.25)]
                                                `
                                            : `
                                                    border-white
                                                    bg-white
                                                    text-[#123A5C]
                                                    shadow-[0_12px_32px_rgba(18,58,92,0.08)]
                                                `
                                        }
                                    `}
                                >
                                    {/* Active glow */}
                                    {active && (
                                        <div
                                            aria-hidden="true"
                                            className="
                                                pointer-events-none
                                                absolute
                                                -bottom-12
                                                -right-12
                                                h-32
                                                w-32
                                                rounded-full
                                                bg-[#FF6B4A]/30
                                                blur-3xl
                                            "
                                        />
                                    )}

                                    {/* Icon */}
                                    <div
                                        className={`
                                            relative
                                            z-10
                                            flex
                                            h-[clamp(38px,5.8svh,56px)]
                                            w-[clamp(38px,5.8svh,56px)]
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-full

                                            ${active
                                                ? "bg-white/10 text-white"
                                                : "bg-[#E8F8F5] text-[#0F9E86]"
                                            }
                                        `}
                                    >
                                        <Icon className="text-[clamp(17px,2.7svh,27px)]" />
                                    </div>

                                    {/* Title */}
                                    <h3
                                        className="
                                            relative
                                            z-10
                                            mt-[clamp(9px,1.4svh,15px)]
                                            max-w-[180px]
                                            font-serif
                                            text-[clamp(17px,2.5svh,25px)]
                                            font-bold
                                            leading-[1.08]
                                        "
                                    >
                                        <data.E.Text path={`features.${index}.title`} />
                                    </h3>

                                    {/* Orange line */}
                                    <div
                                        className="
                                            relative
                                            z-10
                                            mt-[clamp(8px,1.2svh,13px)]
                                            h-[3px]
                                            w-[clamp(30px,7vw,46px)]
                                            shrink-0
                                            bg-[#FF6245]
                                        "
                                    />

                                    {/* No card description on mobile */}

                                    <button
                                        type="button"
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            setPopup(index);
                                        }}
                                        className={`
                                            relative
                                            z-10
                                            mt-auto
                                            flex
                                            items-center
                                            gap-2
                                            pt-2
                                            text-[clamp(12px,1.8svh,17px)]
                                            font-bold

                                            ${active
                                                ? "text-white"
                                                : "text-[#123A5C]"
                                            }
                                        `}
                                    >
                                        <data.E.Text path="linkText" />

                                        <FaArrowRight
                                            className="
                                                transition-transform
                                                duration-300
                                                group-hover:translate-x-1
                                            "
                                        />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Mobile authority bar */}
                <div
                    className="
                        mt-[clamp(10px,1.5svh,16px)]
                        shrink-0
                        rounded-[clamp(20px,2.8svh,28px)]
                        border
                        border-[#EDF2F5]
                        bg-white/95
                        px-[clamp(14px,4vw,24px)]
                        py-[clamp(8px,1.2svh,14px)]
                        shadow-[0_14px_36px_rgba(18,58,92,0.08)]
                        backdrop-blur-sm
                    "
                >
                    <div className="flex items-center justify-center gap-3">
                        <div
                            className="
                                flex
                                h-[clamp(34px,4.8svh,46px)]
                                w-[clamp(34px,4.8svh,46px)]
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                bg-[#E8F8F5]
                                text-[#123A5C]
                            "
                        >
                            <FaBuildingShield className="text-[clamp(16px,2.4svh,23px)]" />
                        </div>

                        <p
                            className="
                                font-serif
                                text-[clamp(13px,1.8svh,19px)]
                                font-bold
                                leading-[1.12]
                                text-[#123A5C]
                            "
                        >
                            <data.E.Text path="authorityTitleLine1" />
                            <br />
                            <data.E.Text path="authorityTitleLine2" />
                        </p>
                    </div>

                    <div
                        className="
                            mt-[clamp(7px,1svh,11px)]
                            grid
                            grid-cols-4
                            divide-x
                            divide-[#8EDDD1]
                            text-center
                            text-[clamp(11px,1.5svh,15px)]
                            font-bold
                            text-[#123A5C]
                        "
                    >
                        {data.companies.map((company, index) => (
                            <span key={index}>
                                <data.E.Text path={`companies.${index}`} />
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

/* =========================================================
   DESKTOP SECTION
========================================================= */

function DesktopWhyChooseUs({
    data,
    selected,
    setSelected,
    setPopup,
}) {
    return (
        <section
            className="
                relative
                hidden
                overflow-hidden
                bg-white
                py-6
                lg:block
            "
        >
            {data.editButton}

            {/* Background decorations */}
            <div
                aria-hidden="true"
                className="
                    absolute
                    -left-[120px]
                    top-20
                    h-[260px]
                    w-[260px]
                    rounded-full
                    bg-[#EEF8F6]
                    blur-3xl
                "
            />

            <div
                aria-hidden="true"
                className="
                    absolute
                    -right-[120px]
                    bottom-20
                    h-[260px]
                    w-[260px]
                    rounded-full
                    bg-[#EDF5FF]
                    blur-3xl
                "
            />

            <div className="relative mx-auto max-w-6xl px-6">
                {/* Desktop heading */}
                <div className="mb-5 text-center">
                    <h2
                        className="
                            font-serif
                            text-[40px]
                            font-bold
                            leading-tight
                            text-[#123A5C]
                        "
                    >
                        <data.E.Text path="titleLine1" />
                        <br />
                        <data.E.Text path="titleLine2" />{" "}
                        <span className="text-[#0F9E86]">
                            <data.E.Text path="titleHighlight" />
                        </span>
                    </h2>

                    <p
                        className="
                            mx-auto
                            mt-2
                            max-w-[620px]
                            text-sm
                            leading-6
                            text-[#475569]
                        "
                    >
                        <data.E.Text path="description" />
                    </p>
                </div>

                {/* Desktop cards */}
                <div className="grid grid-cols-4 gap-4">
                    {data.features.map((item, index) => {
                        const Icon = item.icon;
                        const active = selected === index;

                        return (
                            <div
                                key={index}
                                onClick={() => setSelected(index)}
                                className={`
                                    group
                                    relative
                                    flex
                                    h-[290px]
                                    cursor-pointer
                                    flex-col
                                    overflow-hidden
                                    rounded-[28px]
                                    p-6
                                    transition-all
                                    duration-500

                                    ${active
                                        ? `
                                                -translate-y-2
                                                bg-[#123A5C]
                                                text-white
                                                shadow-[0_25px_60px_rgba(18,58,92,0.3)]
                                            `
                                        : `
                                                bg-white
                                                text-[#123A5C]
                                                shadow-[0_10px_30px_rgba(0,0,0,0.06)]
                                                hover:-translate-y-2
                                                hover:shadow-xl
                                            `
                                    }
                                `}
                            >
                                <data.E.Item path="features" index={index} />
                                {active && (
                                    <div
                                        aria-hidden="true"
                                        className="
                                            pointer-events-none
                                            absolute
                                            -bottom-10
                                            -right-10
                                            h-[130px]
                                            w-[130px]
                                            rounded-full
                                            bg-[#FF6B4A]
                                            opacity-40
                                            blur-3xl
                                        "
                                    />
                                )}

                                <div
                                    className={`
                                        relative
                                        flex
                                        h-12
                                        w-12
                                        items-center
                                        justify-center
                                        rounded-full

                                        ${active
                                            ? "bg-white/10 text-white"
                                            : "bg-[#EEF8F6] text-[#0F9E86]"
                                        }
                                    `}
                                >
                                    <Icon size={24} />
                                </div>

                                <h3
                                    className="
                                        relative
                                        mt-4
                                        font-serif
                                        text-[20px]
                                        font-bold
                                        leading-tight
                                    "
                                >
                                    <data.E.Text path={`features.${index}.title`} />
                                </h3>

                                <div
                                    className="
                                        relative
                                        mt-3
                                        h-[3px]
                                        w-9
                                        bg-[#FF6B4A]
                                    "
                                />

                                <p
                                    className={`
                                        relative
                                        mt-3
                                        text-[14px]
                                        leading-6

                                        ${active
                                            ? "text-white/80"
                                            : "text-[#475569]"
                                        }
                                    `}
                                >
                                    <data.E.Text path={`features.${index}.short`} />
                                </p>

                                <button
                                    type="button"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        setPopup(index);
                                    }}
                                    className={`
                                        relative
                                        mt-auto
                                        flex
                                        items-center
                                        gap-2
                                        text-sm
                                        font-semibold

                                        ${active
                                            ? "text-white"
                                            : "text-[#123A5C]"
                                        }
                                    `}
                                >
                                    <data.E.Text path="linkText" />

                                    <FaArrowRight
                                        className="
                                            transition-transform
                                            duration-300
                                            group-hover:translate-x-2
                                        "
                                    />
                                </button>
                            </div>
                        );
                    })}
                    <data.E.Add path="features" label="Add feature" />
                </div>

                {/* Desktop authority bar */}
                <div
                    className="
                        mt-6
                        flex
                        items-center
                        justify-between
                        gap-5
                        rounded-[26px]
                        border
                        border-gray-100
                        bg-white
                        px-7
                        py-4
                        shadow-[0_15px_35px_rgba(18,58,92,0.08)]
                    "
                >
                    <div className="flex items-center gap-3">
                        <div
                            className="
                                flex
                                h-11
                                w-11
                                items-center
                                justify-center
                                rounded-full
                                bg-[#EEF8F6]
                                text-[#123A5C]
                            "
                        >
                            <FaBuildingShield size={22} />
                        </div>

                        <p
                            className="
                                font-serif
                                text-base
                                font-bold
                                leading-tight
                                text-[#123A5C]
                            "
                        >
                            <data.E.Text path="authorityTitleLine1" />
                            <br />
                            <data.E.Text path="authorityTitleLine2" />
                        </p>
                    </div>

                    <div
                        className="
                            flex
                            items-center
                            gap-7
                            text-sm
                            font-bold
                            text-[#123A5C]
                        "
                    >
                        {data.companies.map((company, index) => (
                            <span className="relative" key={index}>
                                <data.E.Item path="companies" index={index} />
                                <data.E.Text path={`companies.${index}`} />
                            </span>
                        ))}
                        <data.E.Add path="companies" label="Add name" />
                    </div>
                </div>
            </div>
        </section>
    );
}

/* =========================================================
   SHARED POPUP
========================================================= */

// `popupIndex` is the open feature's index, so the popup always shows (and
// edits) the live CMS data for that feature.
function FeaturePopup({ data, popup: popupIndex, setPopup }) {
    const popup = popupIndex === null ? null : data.features[popupIndex];
    if (!popup) {
        return null;
    }
    const i = popupIndex;

    return (
        <div
            className="
                fixed
                inset-0
                z-50
                flex
                items-center
                justify-center
                bg-black/40
                px-5
                backdrop-blur-sm
            "
            onClick={() => setPopup(null)}
        >
            <div
                className="
                    relative
                    w-full
                    max-w-lg
                    rounded-[28px]
                    bg-white
                    p-8
                    shadow-2xl
                "
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={() => setPopup(null)}
                    aria-label="Close feature details"
                    className="
                        absolute
                        right-5
                        top-5
                        text-gray-500
                        transition
                        hover:text-black
                    "
                >
                    <FaXmark size={22} />
                </button>

                <h3
                    className="
                        pr-8
                        font-serif
                        text-3xl
                        font-bold
                        text-[#123A5C]
                    "
                >
                    <data.E.Text path={`features.${i}.title`} />
                </h3>

                <p className="mt-4 leading-7 text-[#475569]">
                    <data.E.Text path={`features.${i}.details`} multiline />
                </p>

                <ul className="mt-5 space-y-3">
                    {popup.benefits.map((benefit, index) => (
                        <li
                            key={index}
                            className="relative flex gap-2 text-[#123A5C]"
                        >
                            <data.E.Item path={`features.${i}.benefits`} index={index} />
                            <span className="text-[#0F9E86]">
                                ✓
                            </span>

                            <data.E.Text path={`features.${i}.benefits.${index}`} />
                        </li>
                    ))}
                    <data.E.Add path={`features.${i}.benefits`} label="Add benefit" />
                </ul>

                <Link
                    href={data.popupButtonHref}
                    onClick={() => setPopup(null)}
                    className="
                        mt-7
                        inline-block
                        rounded-lg
                        bg-[#FF6B4A]
                        px-6
                        py-3
                        font-semibold
                        text-white
                    "
                >
                    <data.E.Text path="popupButtonText" /><data.E.Link path="popupButtonHref" />
                </Link>
            </div>
        </div>
    );
}