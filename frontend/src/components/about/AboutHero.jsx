"use client";

import {
    FaChartLine,
    FaShieldAlt,
    FaUsers,
} from "react-icons/fa";

import { useCms } from "@/components/cms/useCms";
import { mediaUrl } from "@/lib/api";

const ICONS = {
    shield: FaShieldAlt,
    users: FaUsers,
    chart: FaChartLine,
};

const defaults = {
    eyebrow: "About ZFK Accountants",
    titleLine1: "The accountants",
    titleLine2: "behind your",
    titleHighlight: "progress.",
    description:
        "We’re a UK-based accountancy and tax compliance practice helping business owners, contractors and individuals stay compliant, save money and achieve more.",
    image: "/images/about/about-hero.png",
    imageAlt: "ZFK Accountants team",
    trustItems: [
        {
            title: "100% Online",
            subtitle: "UK-wide",
            icon: "shield",
        },
        {
            title: "Client-Focused",
            subtitle: "Approach",
            icon: "users",
        },
        {
            title: "Committed to",
            subtitle: "Your Growth",
            icon: "chart",
        },
    ],
};

const fields = {
    "trustItems[].icon": { type: "select", options: Object.keys(ICONS) },
};

export default function AboutHero() {
    const { data, E, editButton, hidden } = useCms("about-hero", defaults, {
        label: "About hero",
        fields,
        buttonPosition: "right-3 top-[90px]",
    });

    const trustItems = data.trustItems.map((item) => ({
        ...item,
        Icon: ICONS[item.icon] || FaShieldAlt,
    }));

    // Hidden by an admin: nothing is rendered for visitors.
    if (hidden) return null;

    return (
        <>
            {/* =========================================
      {/* ================= MOBILE AND TABLET ONLY ================= */}

            <section
                className="
        relative
        isolate
        h-[var(--ae-dvh)]
        overflow-y-auto
        bg-[#062844]
        pt-[56px]
        lg:hidden
    "
            >
            {editButton}

                {/* Keep the existing space reserved for your fixed navbar */}
                <div
                    className="
            relative
            isolate
            mx-auto
            grid
            h-full
            w-full
            max-w-[760px]
            grid-rows-[auto_minmax(180px,1fr)_auto]
        "
                >
                    {/* ================= CONTINUOUS BACKGROUND ================= */}

                    {/*
            The photo starts behind the paragraph, not below it.
            Its transparent edges reveal the navy background.
        */}
                    <div
                        aria-hidden="true"
                        className="
                pointer-events-none
                absolute
                inset-x-0
                bottom-0
                top-[23%]
                z-0
            "
                        style={{
                            maskImage:
                                "linear-gradient(to bottom, transparent 0%, black 30%, black 78%, transparent 100%)",
                            WebkitMaskImage:
                                "linear-gradient(to bottom, transparent 0%, black 30%, black 78%, transparent 100%)",
                        }}
                    >
                        <E.Image path="image" />
                        <img
                            src={mediaUrl(data.image)}
                            alt=""
                            className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    object-cover
                    object-[72%_50%]
                "
                        />
                    </div>

                    {/* Subtle shade behind the paragraph's left side only */}
                    <div
                        aria-hidden="true"
                        className="
                pointer-events-none
                absolute
                inset-x-0
                top-0
                z-0
                h-[46%]
            "
                        style={{
                            background:
                                "linear-gradient(110deg, #062844 0%, rgba(6,40,68,0.65) 45%, transparent 80%)",
                            maskImage:
                                "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
                            WebkitMaskImage:
                                "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
                        }}
                    />

                    {/* Decorative shape — top area only */}
                    <div
                        aria-hidden="true"
                        className="
                pointer-events-none
                absolute
                inset-x-0
                top-0
                z-0
                h-[30%]
                overflow-hidden
            "
                    >
                        <div
                            className="
                    absolute
                    -right-16
                    -top-24
                    h-72
                    w-40
                    rotate-[30deg]
                    bg-[#155377]/20
                "
                        />
                    </div>

                    {/* ================= MOBILE TEXT ================= */}

                    <div
                        className="
                relative
                z-10
                px-5
                pb-3
                pt-[clamp(18px,3dvh,30px)]
                sm:px-8
            "
                    >
                        <p
                            className="
                    m-0
                    text-[clamp(11px,2.7vw,13px)]
                    font-semibold
                    uppercase
                    leading-normal
                    tracking-[0.28em]
                    text-[#10B49E]
                "
                        >
                            <E.Text path="eyebrow" />
                        </p>

                        <div role="heading" aria-level={1}
                            className="
                    mb-0
                    mt-[clamp(14px,2.3dvh,24px)]
                    font-serif
                    text-[clamp(30px,9.6vw,52px)]
                    font-bold
                    leading-[1.04]
                    tracking-[-0.025em]
                    text-white
                "
                        >
                            <E.Text path="titleLine1" />
                            <br />
                            <E.Text path="titleLine2" />{" "}
                            <span className="text-[#FF674B]">
                                <E.Text path="titleHighlight" />
                            </span>
                        </div>

                        <p
                            className="
                    mb-0
                    mt-[clamp(14px,2.3dvh,24px)]
                    max-w-[580px]
                    text-[clamp(13px,3.7vw,17px)]
                    font-normal
                    leading-[1.55]
                    text-[#EDF3F8]
                "
                        >
                            <E.Text path="description" />
                        </p>
                    </div>

                    {/* Space for the people — background remains continuous */}
                    <div
                        aria-hidden="true"
                        className="relative min-h-[180px]"
                    />

                    {/* ================= MOBILE TRUST ITEMS ================= */}

                    {/* No solid background here: the photo fades into this area */}
                    <div
                        className="
                relative
                z-10
                grid
                grid-cols-3
                px-3
                pb-[max(12px,env(safe-area-inset-bottom))]
                pt-3
                sm:px-6
            "
                    >
                        {trustItems.map(({ title, subtitle, Icon }, index) => (
                            <div
                                key={index}
                                className={`
                        flex
                        min-w-0
                        flex-col
                        items-center
                        px-1
                        text-center
                        ${index < trustItems.length - 1
                                        ? "border-r border-white/25"
                                        : ""
                                    }
                    `}
                            >
                                <div
                                    className="
                            flex
                            h-[clamp(34px,5dvh,46px)]
                            w-[clamp(34px,5dvh,46px)]
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-[#009E91]
                            text-[clamp(16px,2.5dvh,21px)]
                            text-white
                        "
                                >
                                    <Icon aria-hidden="true" />
                                </div>

                                <p
                                    className="
                            mb-0
                            mt-2
                            text-[clamp(11px,2.8vw,14px)]
                            font-semibold
                            leading-[1.25]
                            text-white
                        "
                                >
                                    <E.Text path={`trustItems.${index}.title`} />
                                </p>

                                <p
                                    className="
                            mb-0
                            mt-1
                            text-[clamp(11px,2.8vw,14px)]
                            font-normal
                            leading-[1.25]
                            text-white/85
                        "
                                >
                                    <E.Text path={`trustItems.${index}.subtitle`} />
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================================
                DESKTOP VIEW — UNCHANGED
            ========================================== */}

            <section
                className="
                    relative
                    hidden
                    h-[calc(var(--ae-vh)-80px)]
                    min-h-[820px]
                    overflow-hidden
                    bg-[#062844]
                    lg:block
                "
            >
            {editButton}

                {/* Right image */}
                <div
                    className="
                        absolute
                        right-0
                        top-0
                        h-full
                        w-[62%]
                    "
                >
                    <E.Image path="image" />
                    <img
                        src={mediaUrl(data.image)}
                        alt={data.imageAlt}
                        className="
                            h-full
                            w-full
                            object-cover
                            object-[center_40%]
                        "
                    />
                </div>

                {/* Desktop image overlay */}
                <div
                    className="
                        absolute
                        inset-0
                        bg-gradient-to-r
                        from-[#062844]
                        via-[#062844]/85
                        via-[42%]
                        to-transparent
                    "
                />

                {/* Desktop content */}
                <div
                    className="
                        relative
                        z-10
                        mx-auto
                        flex
                        h-full
                        w-[min(1200px,calc(100%-40px))]
                        items-center
                    "
                >
                    <div className="max-w-[620px] -translate-y-2">
                        <p
                            className="
                                text-sm
                                font-semibold
                                uppercase
                                tracking-[5px]
                                text-[#0F9E86]
                            "
                        >
                            <E.Text path="eyebrow" />
                        </p>

                        <h1
                            className="
                                mt-7
                                font-serif
                                text-[64px]
                                font-bold
                                leading-[1.04]
                                text-white
                                lg:text-[76px]
                            "
                        >
                            <E.Text path="titleLine1" />
                            <br />
                            <E.Text path="titleLine2" />{" "}
                            <span className="text-[#FF6B4A]">
                                <E.Text path="titleHighlight" />
                            </span>
                        </h1>

                        <p
                            className="
                                mt-7
                                max-w-[560px]
                                text-lg
                                leading-8
                                text-white/85
                            "
                        >
                            <E.Text path="description" />
                        </p>

                        {/* Desktop trust items */}
                        <div className="mt-10 flex">
                            {trustItems.map(({ title, subtitle, Icon }, index) => (
                                <div className="relative"
                                    key={index}
                                    className={
                                        index < trustItems.length - 1
                                            ? `
                                    mr-7
                                    flex
                                    items-center
                                    gap-3
                                    border-r
                                    border-white/20
                                    pr-7
                                `
                                            : "flex items-center gap-3"
                                    }
                                >
                                    <E.Item path="trustItems" index={index} />
                                    <div
                                        className="
                                        flex
                                        h-12
                                        w-12
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-[#0F9E86]/20
                                        text-[#0F9E86]
                                    "
                                    >
                                        <Icon />
                                    </div>

                                    <div>
                                        <p className="font-semibold text-white">
                                            <E.Text path={`trustItems.${index}.title`} />
                                        </p>

                                        <p className="text-white/70">
                                            <E.Text path={`trustItems.${index}.subtitle`} />
                                        </p>
                                    </div>
                                </div>
                            ))}
                            <E.Add path="trustItems" label="Add item" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}