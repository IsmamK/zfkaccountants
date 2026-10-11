"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { useCms } from "@/components/cms/useCms";
import { mediaUrl } from "@/lib/api";


/* =========================================================
   DESKTOP CARDS
========================================================= */

const defaultDesktopCards = [
    {
        title: "Limited Companies",
        text: "Accounts, Corporation Tax and ongoing compliance support.",
        position: "top-[18%] left-[30%]",
    },
    {
        title: "Sole Traders",
        text: "Simple Self Assessment and bookkeeping support.",
        position: "top-[31%] left-[0%]",
    },
    {
        title: "Landlords",
        text: "Property income tax advice and reporting support.",
        position: "top-[9%] right-[-10%]",
    },
    {
        title: "Contractors",
        text: "Flexible accounting support for contractors and freelancers.",
        position: "bottom-[22%] left-[13%]",
    },
    {
        title: "Individuals",
        text: "Personal tax advice and annual return support.",
        position: "bottom-[8%] right-[0%]",
    },
];


/* =========================================================
   MOBILE CARDS
========================================================= */

const defaultMobileCards = [
    {
        title: "Sole Traders",
        text: "Simple Self Assessment and bookkeeping support.",
        position: "left-[1%] top-[11%]",
    },
    {
        title: "Limited Companies",
        text: "Accounts, Corporation Tax and ongoing compliance support.",
        position: "right-[1%] top-[5%]",
    },
    {
        title: "Contractors",
        text: "Flexible accounting support for contractors and freelancers.",
        position: "left-[1%] top-[57%]",
    },
    {
        title: "Individuals",
        text: "Personal tax advice and annual return support.",
        position: "right-[2%] top-[69%]",
    },
];


/* =========================================================
   MAIN
========================================================= */

const defaults = {
    eyebrow: "WHO WE HELP",
    titleLine1: "Accounting",
    titleLine2: "support",
    titleLine3: "for",
    titleHighlight: "every type",
    titleLine4: "of business.",
    description:
        "Whether you’re a limited company, sole trader, landlord, contractor or individual, we provide tailored accounting and tax support to help you stay compliant and grow with confidence.",
    buttonText: "Explore Our Services",
    buttonHref: "#how-we-work",
    tagline: "People. Compliance. Progress.",
    image: "/images/services/who-we-help-bg.png",
    imageAlt: "Different businesses supported by ZFK Accountants",
    desktopCards: defaultDesktopCards,
    mobileCards: defaultMobileCards,
};

const fields = {
    "desktopCards[].position": { label: "Position (layout classes — leave unless you know Tailwind)" },
    "mobileCards[].position": { label: "Position (layout classes — leave unless you know Tailwind)" },
};

export default function WhoWeHelp() {
    const { data, E, editButton, hidden } = useCms("services-who-we-help", defaults, {
        label: "Who we help",
        fields,
    });

    // Hidden by an admin: nothing is rendered for visitors.
    if (hidden) return null;

    return (
        <div className="relative">
            {editButton}

            {/* MOBILE + TABLET */}

            <div className="block lg:hidden">
                <MobileWhoWeHelp data={{ ...data, E }} />
            </div>


            {/* DESKTOP */}

            <div className="hidden lg:block">
                <DesktopWhoWeHelp data={{ ...data, E }} />
            </div>
        </div>
    );
}


/* =========================================================
   MOBILE VIEW
========================================================= */

function MobileWhoWeHelp({ data }) {
    const mobileCards = data.mobileCards;
    return (
        <section
            className="
                relative

                h-[calc(var(--ae-dvh)-64px)]
                min-h-0

                overflow-hidden

                bg-[#F8FBFF]

                text-[#123A5C]

                flex
                flex-col
            "
        >
            {/* BACKGROUND DECORATION */}

            <div
                className="
                    pointer-events-none
                    absolute

                    -left-[35%]
                    top-[45%]

                    w-[90vw]
                    h-[90vw]

                    rounded-full

                    bg-[#DFF3FB]/40

                    blur-[60px]
                "
            />


            {/* =====================================================
                TOP COPY
            ====================================================== */}

            <motion.div
                initial={{
                    opacity: 0,
                    y: 15,
                }}
                whileInView={{
                    opacity: 1,
                    y: 0,
                }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
                className="
                    relative
                    z-20

                    shrink-0

                    px-[clamp(20px,5vw,34px)]

                    pt-[clamp(18px,2.8dvh,30px)]
                "
            >
                {/* EYEBROW */}

                <p
                    className="
                        uppercase

                        tracking-[clamp(4px,1.5vw,7px)]

                        font-bold

                        text-[clamp(11px,2.3vw,12px)]

                        text-[#0F9E86]
                    "
                >
                    <data.E.Text path="eyebrow" />
                </p>


                <div
                    className="
                        mt-[clamp(8px,1dvh,12px)]

                        w-[clamp(50px,14vw,68px)]
                        h-[3px]

                        rounded-full

                        bg-[#0F9E86]
                    "
                />


                {/* HEADING */}

                <h2
                    className="
                        mt-[clamp(12px,1.8dvh,22px)]

                        font-serif
                        font-bold

                        text-[#123A5C]

                        text-[clamp(35px,9.8vw,52px)]

                        leading-[0.94]

                        tracking-[-1px]
                    "
                >
                    <data.E.Text path="titleLine1" />
                    <br />
                    <data.E.Text path="titleLine2" /> <data.E.Text path="titleLine3" />{" "}
                    <span className="text-[#FF6B4A]">
                        <data.E.Text path="titleHighlight" />
                    </span>
                    <br />
                    <data.E.Text path="titleLine4" />
                </h2>


                {/* DESCRIPTION */}

                <p
                    className="
                        mt-[clamp(12px,1.8dvh,20px)]

                        max-w-[96%]

                        text-[clamp(11px,3vw,15px)]

                        leading-[1.45]

                        text-[#596273]
                    "
                >
                    <data.E.Text path="description" />
                </p>


                {/* CTA */}

                <Link
                href={data.buttonHref}
                    className="
                        mt-[clamp(12px,1.8dvh,20px)]

                        h-[clamp(43px,5.7dvh,55px)]

                        px-[clamp(20px,5vw,28px)]

                        rounded-[10px]

                        bg-[#FF6648]

                        text-white

                        text-[clamp(12px,3.3vw,16px)]

                        font-bold

                        shadow-[0_12px_28px_rgba(255,107,74,0.18)]

                        flex
                        items-center

                        gap-[9px]
                    "
                >
                    <data.E.Text path="buttonText" /><data.E.Link path="buttonHref" />
                    <span>→</span>
                </Link>
            </motion.div>


            {/* =====================================================
                VISUAL AREA

                KEY:
                flex-1 means this takes ALL remaining viewport height.
                No fixed 600px / 900px heights.
            ====================================================== */}

            <div
                className="
                    relative

                    z-10

                    flex-1
                    min-h-0

                    mt-[clamp(8px,1.4dvh,16px)]

                    mx-[10px]
                "
            >
                {/* ARTWORK */}

                <div
                    className="
                        absolute

                        inset-x-[-9%]
                        inset-y-0

                        z-0
                    "
                >
                    <data.E.Image path="image" />
                    <Image
                        src={mediaUrl(data.image)}
                        alt={data.imageAlt}

                        fill

                        sizes="115vw"

                        className="
                            object-contain
                            object-center
                        "
                    />
                </div>


                {/* CARDS */}

                {mobileCards.map((card, index) => (
                    <motion.div
                        key={index}
                        initial={{
                            opacity: 0,
                            scale: 0.96,
                        }}
                        whileInView={{
                            opacity: 1,
                            scale: 1,
                        }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.35,
                            delay: index * 0.07,
                        }}
                        className={`
                            absolute
                            z-30

                            ${card.position || "bottom-[2%] left-[40%]"}

                            w-[43%]

                            rounded-[clamp(11px,3vw,17px)]

                            bg-white/96

                            px-[clamp(10px,2.7vw,16px)]
                            py-[clamp(9px,1.4dvh,14px)]

                            shadow-[0_10px_26px_rgba(20,58,92,0.10)]
                        `}
                    >
                        <h3
                            className="
                                font-bold

                                text-[#123A5C]

                                text-[clamp(11px,2.8vw,15px)]

                                leading-[1.12]
                            "
                        >
                            <data.E.Text path={`mobileCards.${index}.title`} />
                        </h3>

                        <p
                            className="
                                mt-[clamp(4px,0.6dvh,7px)]

                                text-[#667084]

                                text-[clamp(11px,2.2vw,12px)]

                                leading-[1.3]
                            "
                        >
                            <data.E.Text path={`mobileCards.${index}.text`} />
                        </p>
                        <data.E.Item path="mobileCards" index={index} />
                    </motion.div>
                ))}
                <data.E.Add path="mobileCards" label="Add card" />


                {/* =================================================
                    TAGLINE

                    Positioned INSIDE the remaining visual area so
                    it cannot create additional section height.
                ================================================== */}

                <div
                    className="
                        absolute

                        z-40

                        left-0
                        right-0
                        bottom-[1%]

                        text-center
                    "
                >
                    <p
                        className="
                            font-serif
                            italic

                            text-[#123A5C]

                            text-[clamp(17px,5vw,27px)]

                            leading-none
                        "
                    >
                        <data.E.Text path="tagline" />
                    </p>

                    <div
                        className="
                            mx-auto

                            mt-[clamp(8px,1.2dvh,13px)]

                            w-[clamp(45px,13vw,65px)]
                            h-[3px]

                            rounded-full

                            bg-[#0F9E86]
                        "
                    />
                </div>
            </div>
        </section>
    );
}


/* =========================================================
   DESKTOP VIEW
========================================================= */

function DesktopWhoWeHelp({ data }) {
    const desktopCards = data.desktopCards;
    return (
        <section
            className="
                relative

                h-[calc(var(--ae-dvh)-88px)]
                min-h-0

                overflow-hidden

                bg-[#F8FBFF]
            "
        >
            {/* =====================================================
                RIGHT BACKGROUND ART
            ====================================================== */}

            <div
                className="
                    absolute

                    right-[-3%]
                    top-0
                    bottom-0

                    w-[59%]
                "
            >
                <data.E.Image path="image" />
                <Image
                    src={mediaUrl(data.image)}
                    alt={data.imageAlt}

                    fill

                    priority

                    sizes="59vw"

                    className="
                        object-contain
                        object-center
                    "
                />
            </div>


            {/* =====================================================
                MAIN DESKTOP WRAPPER
            ====================================================== */}

            <div
                className="
                    relative
                    z-20

                    max-w-[1500px]

                    mx-auto

                    h-full

                    px-[clamp(45px,5vw,80px)]

                    flex
                    items-center
                "
            >
                {/* =================================================
                    LEFT CONTENT
                ================================================== */}

                <motion.div
                    initial={{
                        opacity: 0,
                        x: -35,
                    }}
                    whileInView={{
                        opacity: 1,
                        x: 0,
                    }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="
                        w-[44%]
                    "
                >
                    {/* EYEBROW */}

                    <p
                        className="
                            uppercase

                            tracking-[clamp(5px,0.55vw,8px)]

                            font-bold

                            text-[clamp(11px,1vw,14px)]

                            text-[#0F9E86]
                        "
                    >
                        <data.E.Text path="eyebrow" />
                    </p>


                    <div
                        className="
                            mt-[clamp(10px,1.4dvh,18px)]

                            w-[clamp(50px,4vw,64px)]
                            h-[3px]

                            bg-[#0F9E86]
                        "
                    />


                    {/* HEADING */}

                    <h2
                        className="
                            mt-[clamp(18px,2.8dvh,30px)]

                            font-serif
                            font-bold

                            text-[#123A5C]

                            text-[clamp(42px,4.3vw,64px)]

                            leading-[0.96]

                            tracking-[-1px]
                        "
                    >
                        <data.E.Text path="titleLine1" />
                        <br />
                        <data.E.Text path="titleLine2" />
                        <br />
                        <data.E.Text path="titleLine3" />{" "}
                        <span className="text-[#FF6B4A]">
                            <data.E.Text path="titleHighlight" />
                        </span>
                        <br />
                        <data.E.Text path="titleLine4" />
                    </h2>


                    {/* DESCRIPTION */}

                    <p
                        className="
                            mt-[clamp(17px,2.5dvh,28px)]

                            max-w-[520px]

                            text-[clamp(14px,1.15vw,18px)]

                            leading-[1.65]

                            text-[#2B2E33]/70
                        "
                    >
                        <data.E.Text path="description" />
                    </p>


                    {/* BUTTON */}

                    <Link
                href={data.buttonHref}
                        className="inline-block 
                            mt-[clamp(18px,3dvh,32px)]

                            bg-[#FF6B4A]

                            text-white

                            px-[clamp(25px,2.5vw,40px)]
                            py-[clamp(13px,1.9dvh,20px)]

                            rounded-xl

                            text-[clamp(14px,1.1vw,17px)]

                            font-semibold

                            shadow-xl
                        "
                    >
                        <data.E.Text path="buttonText" /><data.E.Link path="buttonHref" /> →
                    </Link>


                    {/* TAGLINE */}

                    <p
                        className="
                            mt-[clamp(22px,3.5dvh,40px)]

                            text-[clamp(22px,2vw,30px)]

                            italic

                            font-serif

                            text-[#123A5C]
                        "
                    >
                        <data.E.Text path="tagline" />
                    </p>
                </motion.div>


                {/* =================================================
                    RIGHT CARDS

                    Everything uses percentage positioning rather than
                    fixed pixel heights.
                ================================================== */}

                <div
                    className="
                        relative

                        w-[56%]
                        h-[88%]
                    "
                >
                    {desktopCards.map((card, index) => (
                        <motion.div
                            key={index}
                            initial={{
                                opacity: 0,
                                scale: 0.93,
                            }}
                            whileInView={{
                                opacity: 1,
                                scale: 1,
                            }}
                            viewport={{ once: true }}
                            transition={{
                                delay: index * 0.08,
                                duration: 0.4,
                            }}
                            className={`
                                absolute

                                ${card.position || "bottom-[2%] left-[40%]"}

                                w-[clamp(180px,14vw,235px)]

                                bg-white

                                rounded-[clamp(18px,1.8vw,28px)]

                                p-[clamp(15px,1.5vw,24px)]

                                shadow-2xl

                                z-30
                            `}
                        >
                            <h3
                                className="
                                    text-[clamp(15px,1.3vw,20px)]

                                    font-bold

                                    leading-[1.15]

                                    text-[#123A5C]
                                "
                            >
                                <data.E.Text path={`desktopCards.${index}.title`} />
                            </h3>

                            <p
                                className="
                                    mt-[clamp(6px,0.8dvh,12px)]

                                    text-[clamp(11px,0.95vw,14px)]

                                    leading-[1.5]

                                    text-[#2B2E33]/70
                                "
                            >
                                <data.E.Text path={`desktopCards.${index}.text`} />
                            </p>
                            <data.E.Item path="desktopCards" index={index} />
                        </motion.div>
                    ))}
                    <data.E.Add path="desktopCards" label="Add card" />
                </div>
            </div>
        </section>
    );
}