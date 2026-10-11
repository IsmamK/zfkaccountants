"use client";

import Link from "next/link";
import { Fragment } from "react";
import { motion } from "framer-motion";

import { useCms } from "@/components/cms/useCms";
import { mediaUrl } from "@/lib/api";

const MotionLink = motion.create(Link);


/* =========================================================
   DATA
========================================================= */

const defaultCards = [
    {
        icon: "📊",
        title: "Clear Insights",
        text: "Understand your finances with easy-to-read reports and practical advice.",
    },
    {
        icon: "💬",
        title: "Expert Support",
        text: "Talk to real UK accounting professionals by video call, wherever you are.",
    },
    {
        icon: "☁",
        title: "Modern Solutions",
        text: "Cloud accounting tools to keep your finances organised and accessible.",
    },
];


/* =========================================================
   MAIN
========================================================= */

const defaults = {
    eyebrow: "ACCOUNTING MADE SIMPLE",
    titleLine1: "Less admin.",
    titleLine2: "More",
    titleHighlight: "progress.",
    description:
        "We handle the numbers, tax and\ncompliance, so you can focus on\nrunning and growing your business.",
    buttonText: "Book a Free Consultation",
    buttonHref: "/contact",
    backgroundImage: "/images/services/services-benefits-zfk.png",
    cards: defaultCards,
};

const fields = {
    description: { type: "textarea", help: "Line breaks apply on mobile only." },
    "cards[].icon": { label: "Icon (emoji)" },
};

export default function ServicesBenefits() {
    const { data, E, editButton, hidden } = useCms("services-benefits", defaults, {
        label: "Benefits",
        fields,
    });

    // Hidden by an admin: nothing is rendered for visitors.
    if (hidden) return null;

    return (
        <div className="relative">
            {editButton}

            {/* =====================================================
                MOBILE + TABLET
                Completely separate from desktop
            ====================================================== */}

            <div className="block lg:hidden">
                <MobileServicesBenefits data={{ ...data, E }} />
            </div>


            {/* =====================================================
                DESKTOP
                Completely separate from mobile
            ====================================================== */}

            <div className="hidden lg:block">
                <DesktopServicesBenefits data={{ ...data, E }} />
            </div>
        </div>
    );
}


/* =========================================================
   MOBILE / TABLET
========================================================= */

function MobileServicesBenefits({ data }) {
    const cards = data.cards;
    return (
        <section
            className="
                relative
                isolate

                h-[calc(var(--ae-dvh)-64px)]
                min-h-0

                overflow-hidden

                bg-[#F8FBFF]
            "
        >
            {/* =====================================================
                FULL BACKGROUND IMAGE

                This provides:
                - laptop
                - desk
                - mug
                - plants
                - teal curved design
            ====================================================== */}

            <div
                className="
                    absolute
                    inset-0
                    z-0
                "
            >
                <data.E.Image path="backgroundImage" />
                <img
                    src={mediaUrl(data.backgroundImage)}
                    alt=""
                    className="
                        w-full
                        h-full

                        object-cover

                        object-[56%_center]
                    "
                />
            </div>


            {/* =====================================================
                SOFT TOP LIGHT OVERLAY

                Keeps heading readable without hiding the laptop.
            ====================================================== */}

            <div
                className="
                    pointer-events-none

                    absolute
                    z-[1]

                    inset-x-0
                    top-0

                    h-[45%]

                    bg-gradient-to-b
                    from-[#F8FBFF]/95
                    via-[#F8FBFF]/65
                    to-transparent
                "
            />


            {/* =====================================================
                SOFT LOWER OVERLAY FOR CARDS
            ====================================================== */}

            <div
                className="
                    pointer-events-none

                    absolute
                    z-[1]

                    inset-x-0
                    bottom-0

                    h-[42%]

                    bg-gradient-to-t
                    from-[#F8FBFF]/92
                    via-[#F8FBFF]/60
                    to-transparent
                "
            />


            {/* =====================================================
                MOBILE CONTENT
            ====================================================== */}

            <div
                className="
                    relative
                    z-20

                    h-full

                    px-[clamp(20px,5vw,38px)]

                    pt-[clamp(20px,2.8dvh,32px)]
                    pb-[clamp(12px,1.6dvh,18px)]

                    flex
                    flex-col
                "
            >
                {/* =================================================
                    TOP CONTENT
                ================================================== */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 15,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                    }}
                    transition={{
                        duration: 0.55,
                    }}
                    className="
                        shrink-0
                    "
                >
                    {/* EYEBROW */}

                    <p
                        className="
                            text-[#11B89C]

                            tracking-[clamp(4px,1.5vw,7px)]

                            text-[clamp(11px,2.3vw,12px)]

                            font-medium
                        "
                    >
                        <data.E.Text path="eyebrow" />
                    </p>


                    {/* =================================================
                        HEADING
                    ================================================== */}

                    <h2
                        className="
                            mt-[clamp(12px,1.7dvh,20px)]

                            font-serif
                            font-bold

                            text-[#123A5C]

                            text-[clamp(40px,11vw,58px)]

                            leading-[0.94]

                            tracking-[-1.3px]
                        "
                    >
                        <data.E.Text path="titleLine1" />
                        <br />
                        <data.E.Text path="titleLine2" />{" "}
                        <span className="text-[#FF6B4A]">
                            <data.E.Text path="titleHighlight" />
                        </span>
                    </h2>


                    {/* DESCRIPTION */}

                    <p
                        className="
                            mt-[clamp(12px,1.8dvh,20px)]

                            max-w-[75%]

                            text-[#526B86]

                            text-[clamp(12px,3.3vw,17px)]

                            leading-[1.45]
                        "
                    >
                        {data.description.split("\n").map((line, index) => (
                            <Fragment key={index}>
                                {index > 0 ? <br /> : null}
                                {line}
                            </Fragment>
                        ))}
                    </p>


                    {/* CTA */}

                    <MotionLink
                        href={data.buttonHref}
                        whileTap={{
                            scale: 0.98,
                        }}
                        className="
                            inline-block
                            mt-[clamp(15px,2dvh,22px)]

                            h-[clamp(48px,6.3dvh,60px)]

                            px-[clamp(24px,6vw,34px)]

                            rounded-[11px]

                            bg-[#FF6B4A]

                            text-white

                            text-[clamp(13px,3.5vw,17px)]

                            font-bold

                            shadow-[0_12px_30px_rgba(255,107,74,.22)]
                        "
                    >
                        <data.E.Text path="buttonText" /><data.E.Link path="buttonHref" />
                        <span className="ml-2">
                            →
                        </span>
                    </MotionLink>
                </motion.div>


                {/* =================================================
                    EMPTY FLEX AREA

                    This is intentional.

                    The laptop/background artwork stays visible here,
                    exactly like your reference.

                    Because the cards use mt-auto, they sit at the
                    bottom of the section.
                ================================================== */}

                <div className="flex-1 min-h-0" />


                {/* =================================================
                    MOBILE BENEFIT CARDS
                ================================================== */}

                <div
                    className="
                        shrink-0

                        space-y-[clamp(7px,1.2dvh,11px)]
                    "
                >
                    {cards.map((card, index) => (
                        <MobileBenefitCard
                            key={index}
                            card={card}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}


/* =========================================================
   MOBILE BENEFIT CARD
========================================================= */

function MobileBenefitCard({
    card,
    index,
}) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 15,
            }}
            whileInView={{
                opacity: 1,
                y: 0,
            }}
            viewport={{
                once: true,
            }}
            transition={{
                duration: 0.4,
                delay: index * 0.07,
            }}
            className="
                relative

                min-h-[clamp(72px,10.5dvh,96px)]

                w-full

                rounded-[clamp(18px,4.5vw,25px)]

                bg-white/95

                border
                border-white

                backdrop-blur-md

                shadow-[0_12px_30px_rgba(18,58,92,.10)]

                px-[clamp(14px,3.5vw,20px)]

                flex
                items-center
            "
        >
            {/* =====================================================
                ICON
            ====================================================== */}

            <div
                className="
                    shrink-0

                    w-[clamp(46px,12vw,62px)]
                    h-[clamp(46px,12vw,62px)]

                    rounded-full

                    bg-[#E7F8F4]

                    flex
                    items-center
                    justify-center

                    text-[clamp(17px,4.8vw,24px)]
                "
            >
                {card.icon}
            </div>


            {/* =====================================================
                TEXT
            ====================================================== */}

            <div
                className="
                    ml-[clamp(12px,3.3vw,18px)]

                    min-w-0

                    pr-[clamp(34px,9vw,48px)]
                "
            >
                <h3
                    className="
                        font-serif
                        font-bold

                        text-[#123A5C]

                        text-[clamp(15px,4vw,21px)]

                        leading-[1.1]
                    "
                >
                    {card.title}
                </h3>


                <p
                    className="
                        mt-[clamp(4px,0.7dvh,7px)]

                        text-[#607890]

                        text-[clamp(11px,2.8vw,14px)]

                        leading-[1.3]
                    "
                >
                    {card.text}
                </p>
            </div>


            {/* =====================================================
                ARROW
            ====================================================== */}

            <div
                className="
                    absolute

                    right-[clamp(12px,3.5vw,18px)]

                    top-1/2
                    -translate-y-1/2

                    w-[clamp(30px,8vw,42px)]
                    h-[clamp(30px,8vw,42px)]

                    rounded-full

                    bg-[#DDF7F2]

                    flex
                    items-center
                    justify-center

                    text-[#11B89C]

                    text-[clamp(13px,3.7vw,19px)]

                    font-bold
                "
            >
                →
            </div>
        </motion.div>
    );
}


/* =========================================================
   DESKTOP VERSION

   Completely independent.
   Mobile code cannot affect this.
========================================================= */

function DesktopServicesBenefits({ data }) {
    const cards = data.cards;
    return (
        <section
            className="
                relative
                overflow-hidden

                h-[calc(var(--ae-dvh)-88px)]
                min-h-0

                bg-white
            "
        >
            {/* =====================================================
                DESKTOP BACKGROUND
            ====================================================== */}

            <div
                className="
                    absolute
                    inset-0
                "
            >
                <data.E.Image path="backgroundImage" />
                <img
                    src={mediaUrl(data.backgroundImage)}
                    alt=""
                    className="
                        w-full
                        h-full

                        object-cover
                        object-center
                    "
                />
            </div>


            {/* =====================================================
                DESKTOP CONTENT
            ====================================================== */}

            <div
                className="
                    relative
                    z-10

                    h-full

                    max-w-[1450px]

                    mx-auto

                    px-[clamp(35px,4vw,56px)]

                    flex
                    items-center
                "
            >
                <motion.div
                    initial={{
                        opacity: 0,
                        x: -40,
                    }}

                    whileInView={{
                        opacity: 1,
                        x: 0,
                    }}

                    viewport={{
                        once: true,
                    }}

                    transition={{
                        duration: 0.8,
                    }}

                    className="
                        w-[55%]
                    "
                >
                    {/* EYEBROW */}

                    <p
                        className="
                            text-[#11B89C]

                            tracking-[6px]

                            text-xs

                            mb-[clamp(12px,2dvh,20px)]
                        "
                    >
                        <data.E.Text path="eyebrow" />
                    </p>


                    {/* HEADING */}

                    <h2
                        className="
                            font-serif
                            font-bold

                            text-[#123A5C]

                            text-[clamp(42px,4.2vw,58px)]

                            leading-[1.05]
                        "
                    >
                        <data.E.Text path="titleLine1" />
                        <br />
                        <data.E.Text path="titleLine2" />{" "}
                        <span className="text-[#FF6B4A]">
                            <data.E.Text path="titleHighlight" />
                        </span>
                    </h2>


                    {/* DESCRIPTION */}

                    <p
                        className="
                            mt-[clamp(16px,2.5dvh,24px)]

                            max-w-xl

                            text-[#526B86]

                            text-[clamp(14px,1.2vw,18px)]

                            leading-[1.55]
                        "
                    >
                        {data.description.replace(/\n/g, " ")}
                    </p>


                    {/* =================================================
                        DESKTOP CARDS
                    ================================================== */}

                    <div
                        className="
                            mt-[clamp(18px,3dvh,32px)]

                            grid
                            grid-cols-3

                            gap-[clamp(12px,1.5vw,20px)]
                        "
                    >
                        {cards.map((card, index) => (
                            <motion.div
                                key={index}

                                animate={{
                                    y: [0, -6, 0],
                                }}

                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    delay: index * 0.5,
                                }}

                                className="relative 
                                    bg-white/90

                                    backdrop-blur-md

                                    rounded-[clamp(18px,1.8vw,28px)]

                                    border
                                    border-white

                                    shadow-[0_20px_50px_rgba(18,58,92,.12)]

                                    p-[clamp(14px,1.4vw,20px)]

                                    h-[clamp(180px,25dvh,230px)]
                                "
                            >
                                <data.E.Item path="cards" index={index} />
                                {/* ICON */}

                                <div
                                    className="
                                        w-[clamp(38px,3vw,44px)]
                                        h-[clamp(38px,3vw,44px)]

                                        rounded-full

                                        bg-[#E7F8F4]

                                        flex
                                        items-center
                                        justify-center
                                    "
                                >
                                    {card.icon}
                                </div>


                                {/* TITLE */}

                                <h3
                                    className="
                                        mt-[clamp(12px,2dvh,20px)]

                                        font-serif
                                        font-bold

                                        text-[#123A5C]

                                        text-[clamp(16px,1.4vw,20px)]
                                    "
                                >
                                    <data.E.Text path={`cards.${index}.title`} />
                                </h3>


                                {/* TEXT */}

                                <p
                                    className="
                                        mt-[clamp(6px,1dvh,12px)]

                                        text-[clamp(11px,0.95vw,14px)]

                                        text-[#607890]

                                        leading-[1.5]
                                    "
                                >
                                    <data.E.Text path={`cards.${index}.text`} />
                                </p>


                                {/* ARROW */}

                                <div
                                    className="
                                        mt-[clamp(10px,1.7dvh,18px)]

                                        w-[clamp(30px,2.5vw,36px)]
                                        h-[clamp(30px,2.5vw,36px)]

                                        rounded-full

                                        bg-[#DDF7F2]

                                        flex
                                        items-center
                                        justify-center

                                        text-[#11B89C]
                                    "
                                >
                                    →
                                </div>
                            </motion.div>
                        ))}
                        <data.E.Add path="cards" label="Add card" />
                    </div>


                    {/* CTA */}

                    <MotionLink
                        href={data.buttonHref}
                        whileHover={{
                            scale: 1.05,
                        }}
                        className="
                            inline-block
                            mt-[clamp(18px,2.8dvh,28px)]

                            bg-[#FF6B4A]

                            text-white

                            rounded-xl

                            px-[clamp(25px,2.5vw,36px)]
                            py-[clamp(12px,1.7dvh,16px)]

                            text-[clamp(13px,1vw,16px)]

                            font-semibold
                        "
                    >
                        <data.E.Text path="buttonText" /><data.E.Link path="buttonHref" /> →
                    </MotionLink>
                </motion.div>
            </div>
        </section>
    );
}