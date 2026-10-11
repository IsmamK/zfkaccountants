"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { motion } from "framer-motion";

import { useCms } from "@/components/cms/useCms";
import { mediaUrl } from "@/lib/api";
import BrandLogo from "@/components/layout/BrandLogo";


/* =========================================================
   DESKTOP CARDS
========================================================= */

const defaultDesktopCards = [
    {
        title: "Quarterly\nVAT Returns",
        desc: "Filed every quarter through MTD.",
        icon: "%",
        color: "#FF9C82",
        href: "/services/vat-returns",
        position: "top-[100px] left-[4%]",
    },

    {
        title: "Monthly\nPayroll",
        desc: "Payslips, RTI and pensions.",
        icon: "£",
        color: "#5DE3D3",
        href: "/services/payroll",
        position: "top-[85px] right-[2%]",
    },

    {
        title: "Annual Accounts\n& Corporation Tax",
        desc: "Accounts and CT600, filed on time.",
        icon: "▣",
        color: "#8DBEFF",
        href: "/services/annual-accounts",
        position: "top-[320px] left-[0%]",
    },

    {
        title: "Self Assessment\nTax Returns",
        desc: "Filed well before 31 January.",
        icon: "♙",
        color: "#C6A9FF",
        href: "/services/self-assessment",
        position: "top-[320px] right-[3%]",
    },
];


/* =========================================================
   MOBILE / TABLET CARDS
========================================================= */

const defaultCompactCards = [
    {
        title: "Quarterly VAT Returns",
        desc: "Filed every quarter.",
        icon: "%",
        color: "#FF9279",
        href: "/services/vat-returns",
    },

    {
        title: "Monthly Payroll",
        desc: "Payslips, RTI, pensions.",
        icon: "£",
        color: "#5DE3D3",
        href: "/services/payroll",
    },

    {
        title: "Annual Accounts & Corporation Tax",
        desc: "Filed on time.",
        icon: "▣",
        color: "#8DBEFF",
        href: "/services/annual-accounts",
    },

    {
        title: "Self Assessment Tax Returns",
        desc: "Before 31 January.",
        icon: "♟",
        color: "#C695FF",
        href: "/services/self-assessment",
    },
];


/* =========================================================
   MAIN
========================================================= */

const defaults = {
    eyebrow: "OUR SERVICES",
    title: "Online accounting\nservices for UK",
    titleHighlight: "businesses.",
    description:
        "Quarterly VAT returns, monthly payroll, annual accounts and Self Assessment: clear, accurate support delivered 100% online, wherever you are in the UK.",
    mobileEyebrow: "ACCOUNTING SERVICES",
    mobileTitle: "Keep your\nbusiness",
    mobileTitleHighlight: "compliant.",
    mobileDescription: "VAT, payroll, accounts and\ntax returns for UK businesses,\nhandled 100% online.",
    quoteText: "Book a Free Consultation",
    quoteHref: "/contact",
    mobileNavCtaText: "Book a Call",
    videoTitle: "Watch How We Help",
    videoSubtitle: "2 min video",
    videoUrl: "",
    image: "/images/services/services-hero-bg.png",
    imageAlt: "Accounting professional",
    trustItems: [
        { icon: "✓", title: "100% Online", subtitle: "UK-wide" },
        { icon: "£", title: "Tailored", subtitle: "Quotes" },
        { icon: "☁", title: "Cloud Accounting", subtitle: "Support" },
    ],
    desktopCards: defaultDesktopCards,
    compactCards: defaultCompactCards,
};

const fields = {
    title: { type: "textarea", help: "Each new line starts a new line on the page." },
    mobileTitle: { type: "textarea" },
    mobileDescription: { type: "textarea" },
    "desktopCards[].title": { type: "textarea" },
    "desktopCards[].position": { label: "Position (layout classes — leave unless you know Tailwind)" },
    "desktopCards[].color": { label: "Accent colour (hex)" },
    "compactCards[].color": { label: "Accent colour (hex)" },
    "trustItems[].icon": { label: "Icon (symbol)" },
    videoUrl: {
        label: "Video URL",
        help: "YouTube or Vimeo embed link, e.g. https://www.youtube.com/embed/VIDEO_ID. The “Watch how we help” button only shows when this is set.",
    },
};

const VIDEO_URL = /^https:\/\/(www\.)?(youtube\.com\/embed\/|youtu\.be\/|player\.vimeo\.com\/video\/)/i;

function VideoModal({ url, title, onClose }) {
    useEffect(() => {
        const onKey = (event) => event.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/80 p-4"
            onClick={onClose}
        >
            <div className="relative w-full max-w-[960px]" onClick={(event) => event.stopPropagation()}>
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close video"
                    className="absolute -top-11 right-0 text-[28px] leading-none text-white hover:text-[#20D6C0]"
                >
                    ×
                </button>
                <div className="relative aspect-video overflow-hidden rounded-2xl bg-black">
                    <iframe
                        src={url}
                        title={title}
                        className="absolute inset-0 h-full w-full"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                        allowFullScreen
                        sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
                    />
                </div>
            </div>
        </div>
    );
}

// "Line one\nLine two" -> Line one<br />Line two
function Lines({ text }) {
    return String(text || "").split("\n").map((line, index) => (
        <Fragment key={index}>
            {index > 0 ? <br /> : null}
            {line}
        </Fragment>
    ));
}

// Each service card opens its service page. The whole card is the link for
// visitors; while editing, the card's text stays clickable for inline edits.
function CardLink({ card, editing }) {
    if (!card.href || editing) return null;
    return <Link href={card.href} aria-label={String(card.title).replace(/\s+/g, " ")} className="absolute inset-0 z-20 rounded-[inherit]" />;
}

export default function ServicesHero() {
    const { data, E, editButton, hidden, editMode } = useCms("services-hero", defaults, {
        label: "Services hero",
        fields,
        buttonPosition: "right-3 top-[90px]",
    });

    const [videoOpen, setVideoOpen] = useState(false);
    const hasVideo = VIDEO_URL.test(data.videoUrl || "");
    const video = { hasVideo, openVideo: () => setVideoOpen(true) };

    // Hidden by an admin: nothing is rendered for visitors.
    if (hidden) return null;

    return (
        <div className="relative">
            {editButton}

            {videoOpen && hasVideo ? (
                <VideoModal url={data.videoUrl} title={data.videoTitle} onClose={() => setVideoOpen(false)} />
            ) : null}

            {/* MOBILE + TABLET */}

            <div className="block lg:hidden">
                <CompactServicesHero data={{ ...data, E, editMode }} {...video} />
            </div>


            {/* DESKTOP */}

            <div className="hidden lg:block">
                <DesktopServicesHero data={{ ...data, E, editMode }} {...video} />
            </div>
        </div>
    );
}


/* =========================================================
   MOBILE + TABLET
========================================================= */

function CompactServicesHero({ data, hasVideo, openVideo }) {
    const compactCards = data.compactCards;
    return (
        <section
            className="
                relative
                h-[var(--ae-dvh)]
                overflow-hidden

                bg-[#061C36]
                text-white

                flex
                flex-col
            "
        >
            {/* =====================================================
                MOBILE NAVBAR
                Sits under the site's fixed header, which replaces it;
                kept as a spacer, hidden from keyboard and screen readers.
            ====================================================== */}

            <header
                aria-hidden="true"
                inert
                className="
                    relative
                    z-50
                    shrink-0

                    h-[clamp(60px,8dvh,74px)]

                    px-[clamp(20px,5vw,38px)]

                    flex
                    items-center
                    justify-between

                    bg-[#061C36]/95

                    border-b
                    border-white/[0.04]

                    backdrop-blur-md
                "
            >
                {/* LOGO */}

                <BrandLogo className="h-[clamp(18px,4.8vw,24px)] w-auto" priority />


                {/* RIGHT */}

                <div
                    className="
                        flex
                        items-center

                        gap-[clamp(10px,3vw,18px)]
                    "
                >
                    <button
                        className="
                            h-[clamp(40px,5.7dvh,50px)]

                            px-[clamp(15px,4vw,24px)]

                            rounded-[10px]

                            bg-[#FF674A]

                            text-[clamp(12px,3vw,16px)]

                            font-bold
                            text-white

                            whitespace-nowrap

                            shadow-[0_10px_25px_rgba(255,103,74,0.18)]
                        "
                    >
                        <data.E.Text path="mobileNavCtaText" />
                    </button>


                    {/* MENU */}

                    <button
                        aria-label="Open menu"
                        className="
                            w-[34px]
                            h-[40px]

                            flex
                            flex-col

                            items-center
                            justify-center

                            gap-[5px]
                        "
                    >
                        <span className="w-[26px] h-[2px] bg-white" />
                        <span className="w-[26px] h-[2px] bg-white" />
                        <span className="w-[26px] h-[2px] bg-white" />
                    </button>
                </div>
            </header>


            {/* =====================================================
                HERO BODY
            ====================================================== */}

            <div
                className="
                    relative

                    flex-1
                    min-h-0

                    overflow-hidden
                "
            >
                {/* =================================================
                    BACKGROUND MAN
                ================================================== */}

                <div
                    className="
                        absolute
                        z-0

                        top-0
                        right-0
                        bottom-0

                        w-[76%]

                        sm:w-[70%]
                        md:w-[66%]
                    "
                >
                    <data.E.Image path="image" />
                    <Image
                        src={mediaUrl(data.image)}
                    alt={data.imageAlt}

                        fill
                        priority

                        sizes="(max-width: 1023px) 76vw, 0px"

                        className="
                            object-cover

                            object-[50%_center]

                            scale-[1.03]
                        "
                    />
                </div>


                {/* =================================================
                    LEFT DARK GRADIENT
                ================================================== */}

                <div
                    className="
                        absolute
                        z-[1]

                        inset-y-0
                        left-0

                        w-[78%]

                        bg-gradient-to-r

                        from-[#061C36]
                        via-[#061C36]/94
                        to-transparent
                    "
                />


                {/* LIGHT GLOBAL TINT */}

                <div
                    className="
                        absolute
                        z-[1]

                        inset-0

                        bg-[#061C36]/5
                    "
                />


                {/* =================================================
                    LOWER DARK FADE
                ================================================== */}

                <div
                    className="
                        absolute
                        z-[2]

                        bottom-0
                        left-0
                        right-0

                        h-[47%]

                        bg-gradient-to-b

                        from-transparent
                        via-[#061C36]/52
                        to-[#061C36]
                    "
                />


                {/* =================================================
                    ALL CONTENT

                    justify-between makes the design use the
                    entire available screen height.
                ================================================== */}

                <div
                    className="
                        relative
                        z-20

                        h-full

                        px-[clamp(22px,6vw,46px)]

                        pt-[clamp(18px,2.6dvh,32px)]
                        pb-[clamp(10px,1.6dvh,18px)]

                        flex
                        flex-col

                        justify-between
                    "
                >
                    {/* =================================================
                        HERO COPY
                    ================================================== */}

                    <div>
                        {/* EYEBROW */}

                        <p
                            className="
                                text-[#25D8C5]

                                uppercase
                                font-bold

                                text-[clamp(11px,2.4vw,13px)]

                                tracking-[clamp(4px,1.4vw,7px)]
                            "
                        >
                            <data.E.Text path="mobileEyebrow" />
                        </p>


                        {/* HEADING */}

                        <div role="heading" aria-level={1}
                            className="
                                mt-[clamp(9px,1.4dvh,17px)]

                                font-serif
                                font-bold

                                text-[clamp(40px,11.8vw,62px)]

                                leading-[0.90]

                                tracking-[-1.5px]

                                text-white
                            "
                        >
                            <data.E.Text path="mobileTitle" multiline />
                            <br />

                            <span className="text-[#FF6B4A]">
                                <data.E.Text path="mobileTitleHighlight" />
                            </span>
                        </div>


                        {/* TEAL LINE */}

                        <div
                            className="
                                mt-[clamp(11px,1.5dvh,19px)]

                                w-[clamp(60px,18vw,95px)]
                                h-[3px]

                                bg-[#20D9C5]
                            "
                        />


                        {/* DESCRIPTION */}

                        <p
                            className="
                                mt-[clamp(11px,1.5dvh,18px)]

                                max-w-[63%]

                                text-[clamp(11px,3.1vw,16px)]

                                leading-[1.45]

                                text-[#E0E9F0]
                            "
                        >
                            <data.E.Text path="mobileDescription" multiline />
                        </p>


                        {/* CTA */}

                        <Link
                            href={data.quoteHref}
                            className="
                            inline-block
                                mt-[clamp(11px,1.6dvh,18px)]

                                h-[clamp(45px,6dvh,56px)]

                                px-[clamp(20px,5.5vw,30px)]

                                rounded-[10px]

                                bg-[#FF674A]

                                text-white

                                text-[clamp(11px,3.1vw,16px)]

                                font-bold

                                shadow-[0_12px_28px_rgba(255,103,74,0.18)]
                            "
                        >
                            <data.E.Text path="quoteText" /><data.E.Link path="quoteHref" />

                            <span className="ml-2">
                                →
                            </span>
                        </Link>
                    </div>


                    {/* =================================================
                        VIDEO
                    ================================================== */}

                    {hasVideo ? (
                    <div
                        role="button"
                        tabIndex={0}
                        onClick={openVideo}
                        onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                                event.preventDefault();
                                openVideo();
                            }
                        }}
                        aria-label={`${data.videoTitle} (${data.videoSubtitle})`}
                        className="
                            cursor-pointer
                            flex
                            items-center

                            gap-[clamp(10px,2.8vw,15px)]
                        "
                    >
                        {/* PLAY ICON */}

                        <div
                            className="
                                shrink-0

                                w-[clamp(40px,10.5vw,54px)]
                                h-[clamp(40px,10.5vw,54px)]

                                rounded-full

                                bg-[#15466F]

                                flex
                                items-center
                                justify-center
                            "
                        >
                            <div
                                className="
                                    w-[clamp(17px,4.5vw,22px)]
                                    h-[clamp(17px,4.5vw,22px)]

                                    rounded-[3px]

                                    bg-[#5BA4FF]

                                    flex
                                    items-center
                                    justify-center

                                    text-[11px]
                                    text-white
                                "
                            >
                                ▶
                            </div>
                        </div>


                        {/* TEXT */}

                        <div>
                            <p
                                className="
                                    text-white

                                    text-[clamp(13px,3.6vw,18px)]

                                    font-bold

                                    leading-[1.1]
                                "
                            >
                                <data.E.Text path="videoTitle" />
                            </p>

                            <p
                                className="
                                    mt-[3px]

                                    text-[#CBD8E4]

                                    text-[clamp(11px,2.8vw,14px)]
                                "
                            >
                                <data.E.Text path="videoSubtitle" />
                            </p>
                        </div>
                    </div>
                    ) : null}


                    {/* =================================================
                        SERVICE CARDS
                    ================================================== */}

                    <div
                        className="
                            grid
                            grid-cols-2

                            gap-[8px]

                            -mx-[2px]
                        "
                    >
                        {compactCards.map((card, index) => (
                            <motion.div
                                key={index}

                                initial={{
                                    opacity: 0,
                                    y: 8,
                                }}

                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}

                                transition={{
                                    duration: 0.3,
                                    delay: index * 0.05,
                                }}

                                className="
                                    relative

                                    h-[clamp(84px,11.2dvh,108px)]

                                    rounded-[17px]

                                    border
                                    border-white/20

                                    bg-[#123F68]/94

                                    backdrop-blur-[12px]

                                    px-[clamp(10px,2.8vw,16px)]
                                    py-[clamp(9px,1.4dvh,14px)]

                                    flex
                                    items-start

                                    shadow-[0_12px_28px_rgba(0,15,32,0.22)]
                                "
                            >
                                {/* ICON */}

                                <div
                                    className="
                                        shrink-0

                                        w-[clamp(38px,9.6vw,50px)]
                                        h-[clamp(38px,9.6vw,50px)]

                                        rounded-full

                                        flex
                                        items-center
                                        justify-center

                                        font-bold

                                        text-[clamp(16px,4.3vw,22px)]

                                        text-[#082844]
                                    "
                                    style={{
                                        backgroundColor: card.color,
                                    }}
                                >
                                    {card.icon}
                                </div>


                                {/* TEXT */}

                                <div
                                    className="
                                        ml-[clamp(8px,2.3vw,12px)]

                                        pt-[1px]

                                        pr-[5px]

                                        min-w-0
                                    "
                                >
                                    <h2
                                        className="
                                            text-white

                                            font-bold

                                            text-[clamp(11px,2.8vw,15px)]

                                            leading-[1.17]
                                        "
                                    >
                                        <data.E.Text path={`compactCards.${index}.title`} multiline />
                                    </h2>


                                    <p
                                        className="
                                            mt-[clamp(4px,0.6dvh,7px)]

                                            pr-[16px]

                                            text-[#CEDAE5]

                                            text-[clamp(11px,2.3vw,12px)]

                                            leading-[1.22]
                                        "
                                    >
                                        <data.E.Text path={`compactCards.${index}.desc`} />
                                    </p>
                                </div>


                                {/* ARROW */}

                                <div
                                    className="
                                        absolute

                                        right-[8px]
                                        bottom-[8px]

                                        w-[clamp(24px,6.2vw,32px)]
                                        h-[clamp(24px,6.2vw,32px)]

                                        rounded-full

                                        border
                                        border-white/30

                                        flex
                                        items-center
                                        justify-center

                                        text-white

                                        text-[11px]
                                    "
                                >
                                    →
                                </div>
                                <CardLink card={card} editing={data.editMode} />
                                <data.E.Link path={`compactCards.${index}.href`} />
                                <data.E.Item path="compactCards" index={index} />
                            </motion.div>
                        ))}
                        <data.E.Add path="compactCards" label="Add service card" />
                    </div>


                    {/* =================================================
                        TRUST ROW
                    ================================================== */}

                    <div
                        className="
                            grid
                            grid-cols-3

                            gap-[5px]

                            items-center
                        "
                    >
                        {data.trustItems.map((item, index) => (
                            <CompactTrust
                                key={index}
                                icon={item.icon}
                                E={data.E}
                                index={index}
                            />
                        ))}
                        <data.E.Add path="trustItems" label="Add trust point" />
                    </div>
                </div>
            </div>
        </section>
    );
}


/* =========================================================
   MOBILE TRUST ITEM
========================================================= */

function CompactTrust({
    icon,
    E,
    index,
}) {
    return (
        <div
            data-trust-item
            className="
                flex
                items-center

                gap-[clamp(5px,1.7vw,9px)]

                min-w-0
            "
        >
            <E.Item path="trustItems" index={index} />
            {/* ICON */}

            <div
                className="
                    shrink-0

                    w-[clamp(32px,8.5vw,44px)]
                    h-[clamp(32px,8.5vw,44px)]

                    rounded-full

                    bg-[#124B79]

                    flex
                    items-center
                    justify-center

                    text-[#21D9C4]

                    text-[clamp(13px,3.7vw,20px)]

                    font-bold
                "
            >
                {icon}
            </div>


            {/* TEXT */}

            <div className="min-w-0">
                <p
                    className="
                        text-white

                        text-[clamp(11px,2.1vw,11px)]

                        font-bold

                        leading-[1.08]
                    "
                >
                    <E.Text path={`trustItems.${index}.title`} />
                </p>


                <p
                    className="
                        mt-[2px]

                        text-[#D4DEE8]

                        text-[clamp(11px,1.8vw,11px)]

                        leading-[1.08]
                    "
                >
                    <E.Text path={`trustItems.${index}.subtitle`} />
                </p>
            </div>
        </div>
    );
}


/* =========================================================
   DESKTOP VERSION
   COMPLETELY SEPARATE FROM MOBILE
========================================================= */

function DesktopServicesHero({ data, hasVideo, openVideo }) {
    const desktopCards = data.desktopCards;
    return (
        <section
            className="
                relative
                overflow-hidden

                bg-[#061C36]

                min-h-[max(780px,calc(var(--ae-vh)-88px))]
                
            "
        >
            {/* =====================================================
                DESKTOP IMAGE
            ====================================================== */}

            <div
                className="
                    absolute

                    right-0
                    top-0

                    h-full
                    w-[58%]
                "
            >
                <data.E.Image path="image" />
                <Image
                    src={mediaUrl(data.image)}
                    alt={data.imageAlt}

                    fill
                    priority

                    sizes="58vw"

                    className="
                        object-cover
                        object-[65%_center]
                    "
                />


                {/* IMAGE DARKENING */}

                <div
                    className="
                        absolute
                        inset-0

                        bg-gradient-to-r

                        from-[#061C36]/70
                        via-[#061C36]/10
                        to-transparent
                    "
                />


                {/* LEFT FADE */}

                <div
                    className="
                        absolute

                        left-0
                        top-0

                        h-full
                        w-[35%]

                        bg-gradient-to-r

                        from-[#061C36]
                        to-transparent
                    "
                />
            </div>


            {/* =====================================================
                DESKTOP MAIN
            ====================================================== */}

            <div
                className="
                    relative
                    z-20

                    max-w-[1450px]

                    mx-auto

                    px-10

                    min-h-[inherit]

                    pb-12

                    flex
                    items-center
                "
            >
                {/* =================================================
                    LEFT
                ================================================== */}

                <div
                    className="
                        w-[45%]
                        pt-8
                    "
                >
                    {/* EYEBROW */}

                    <p
                        className="
                            text-[#19D6C0]

                            tracking-[9px]

                            uppercase
                            font-bold

                            text-sm
                        "
                    >
                        <data.E.Text path="eyebrow" />
                    </p>


                    {/* TITLE */}

                    <h1
                        className="
                            mt-8

                            font-serif
                            font-bold

                            text-white
                            text-[62px]

                            leading-[1.04]
                        "
                    >
                        <data.E.Text path="title" multiline />
                        <br />
                        <span className="text-[#FF6B4A]">
                            <data.E.Text path="titleHighlight" />
                        </span>
                    </h1>


                    {/* LINE */}

                    <div
                        className="
                            mt-8

                            h-[3px]
                            w-20

                            bg-[#19D6C0]
                        "
                    />


                    {/* DESCRIPTION */}

                    <p
                        className="
                            mt-8

                            text-[#D9E4EF]

                            text-lg

                            leading-9

                            max-w-[540px]
                        "
                    >
                        <data.E.Text path="description" />
                    </p>


                    {/* =================================================
                        DESKTOP CTA
                    ================================================== */}

                    <div
                        className="
                            flex
                            items-center

                            gap-5

                            mt-8
                        "
                    >
                        <Link
                            href={data.quoteHref}
                            className="
                            inline-block
                                px-10
                                py-5

                                rounded-xl

                                bg-[#FF6B4A]

                                text-white
                                font-semibold

                                shadow-xl
                            "
                        >
                            <data.E.Text path="quoteText" /><data.E.Link path="quoteHref" /> →
                        </Link>


                        {/* VIDEO */}

                        {hasVideo ? (
                    <div
                        role="button"
                        tabIndex={0}
                        onClick={openVideo}
                        onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                                event.preventDefault();
                                openVideo();
                            }
                        }}
                        aria-label={`${data.videoTitle} (${data.videoSubtitle})`}
                            className="
                            cursor-pointer
                                flex
                                items-center

                                gap-3

                                text-white
                            "
                        >
                            <div
                                className="
                                    w-12
                                    h-12

                                    rounded-full

                                    bg-white/10

                                    flex
                                    items-center
                                    justify-center
                                "
                            >
                                ▶
                            </div>


                            <div>
                                <p className="font-semibold">
                                    <data.E.Text path="videoTitle" />
                            </p>

                                <p className="text-sm text-gray-300">
                                    <data.E.Text path="videoSubtitle" />
                            </p>
                            </div>
                        </div>
                    ) : null}
                    </div>


                    {/* =================================================
                        DESKTOP TRUST
                    ================================================== */}

                    <div
                        className="
                            mt-12

                            flex

                            gap-8
                        "
                    >
                        {data.trustItems.map((item) => [item.icon, item.title, item.subtitle]).map((x, i) => (
                            <div
                                key={i}

                                className="
                                    flex
                                    gap-3
                                    items-center
                                "
                            >
                                <data.E.Item path="trustItems" index={i} />
                                {/* ICON */}

                                <div
                                    className="
                                        w-12
                                        h-12

                                        rounded-full

                                        bg-[#174A78]

                                        flex
                                        items-center
                                        justify-center

                                        text-[#20D6C0]
                                    "
                                >
                                    {x[0]}
                                </div>


                                {/* TEXT */}

                                <div>
                                    <p
                                        className="
                                            text-white
                                            font-semibold
                                        "
                                    >
                                        <data.E.Text path={`trustItems.${i}.title`} />
                                    </p>

                                    <p
                                        className="
                                            text-sm
                                            text-gray-300
                                        "
                                    >
                                        <data.E.Text path={`trustItems.${i}.subtitle`} />
                                    </p>
                                </div>
                            </div>
                        ))}
                        <data.E.Add path="trustItems" label="Add trust point" />
                    </div>
                </div>


                {/* =================================================
                    DESKTOP RIGHT
                ================================================== */}

                <div
                    className="
                        absolute

                        right-0
                        top-0

                        w-[55%]
                        h-full
                    "
                >
                    {/* GLOW */}

                    <div
                        className="
                            absolute

                            top-[200px]
                            left-[320px]

                            w-[250px]
                            h-[250px]

                            rounded-full

                            bg-[#20D6C0]/10

                            blur-[90px]
                        "
                    />


                    {/* =================================================
                        DESKTOP CARDS
                    ================================================== */}

                    {desktopCards.map((card, index) => (
                        <motion.div
                            key={index}

                            initial={{
                                opacity: 0,
                                y: 20,
                            }}

                            animate={{
                                opacity: 1,
                                y: 0,
                            }}

                            transition={{
                                delay: index * 0.15,
                            }}

                            className={`
                                absolute

                                ${card.position || "top-[540px] left-[10px]"}

                                w-[clamp(230px,23vw,300px)]

                                rounded-3xl

                                bg-[#163E67]/80

                                border
                                border-white/20

                                backdrop-blur-md

                                p-5

                                shadow-2xl
                            `}
                        >
                            <div
                                className="
                                    flex
                                    gap-4
                                "
                            >
                                {/* ICON */}

                                <div
                                    className="
                                        w-14
                                        h-14

                                        rounded-full

                                        flex
                                        items-center
                                        justify-center

                                        font-bold

                                        text-xl

                                        text-[#06203A]
                                    "
                                    style={{
                                        background: card.color,
                                    }}
                                >
                                    {card.icon}
                                </div>


                                {/* TEXT */}

                                <div>
                                    <h2
                                        className="
                                            text-white

                                            font-semibold

                                            text-lg

                                            leading-6
                                        "
                                    >
                                        <data.E.Text path={`desktopCards.${index}.title`} multiline />
                                    </h2>


                                    <p
                                        className="
                                            text-sm
                                            text-gray-300

                                            mt-2
                                        "
                                    >
                                        <data.E.Text path={`desktopCards.${index}.desc`} />
                                    </p>
                                </div>
                            </div>


                            {/* ARROW */}

                            <div
                                className="
                                    absolute

                                    right-5
                                    bottom-5

                                    w-7
                                    h-7

                                    rounded-full

                                    border
                                    border-white/30

                                    text-white

                                    flex
                                    items-center
                                    justify-center

                                    text-xs
                                "
                            >
                                →
                            </div>
                            <CardLink card={card} editing={data.editMode} />
                            <data.E.Link path={`desktopCards.${index}.href`} />
                            <data.E.Item path="desktopCards" index={index} />
                        </motion.div>
                    ))}
                    <data.E.Add path="desktopCards" label="Add service card" />


                </div>
            </div>
        </section>
    );
}