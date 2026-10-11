"use client";

import Link from "next/link";
import { Fragment } from "react";
import { motion } from "framer-motion";

import { useCms } from "@/components/cms/useCms";
import { bgImage } from "@/lib/bgImage";


/* =========================================================
   PROCESS DATA
========================================================= */

const defaultSteps = [
    {
        number: "01",
        title: "Book",
        text: "A free video consultation to understand your needs.",
        icon: "●",
    },
    {
        number: "02",
        title: "Get a Quote",
        text: "A clear quote, tailored to your business.",
        icon: "▤",
    },
    {
        number: "03",
        title: "Onboard Online",
        text: "We set you up online and handle the paperwork.",
        icon: "⚙",
    },
    {
        number: "04",
        title: "We Handle It",
        text: "VAT, payroll, accounts and tax, done on time.",
        icon: "↗",
    },
];


/* =========================================================
   MAIN
========================================================= */

const defaults = {
    eyebrow: "OUR PROCESS",
    titleLine1: "Focused on",
    titleHighlight: "your success.",
    description:
        "A clear, fully online process to make\nyour accounting and tax simple,\naccurate and hassle-free.",
    buttonText: "Book a Free Consultation",
    buttonHref: "/contact",
    footerLabel: "ACCOUNTING MADE SIMPLE.",
    backgroundImage: "/images/services/process-bg.png",
    steps: defaultSteps,
};

const fields = {
    description: { type: "textarea", help: "Line breaks apply on mobile only." },
    "steps[].icon": { label: "Icon (symbol)" },
};

export default function ProcessSection() {
    const { data, E, editButton, hidden } = useCms("services-process", defaults, {
        label: "Our process",
        fields,
    });

    // Hidden by an admin: nothing is rendered for visitors.
    if (hidden) return null;

    return (
        <div id="how-we-work" className="relative scroll-mt-16">
            {editButton}

            {/* =====================================================
                MOBILE + TABLET
                COMPLETELY SEPARATE
            ====================================================== */}

            <div className="block lg:hidden">
                <MobileProcessSection data={{ ...data, E }} />
            </div>


            {/* =====================================================
                DESKTOP
                COMPLETELY SEPARATE
            ====================================================== */}

            <div className="hidden lg:block">
                <DesktopProcessSection data={{ ...data, E }} />
            </div>
        </div>
    );
}


/* =========================================================
   MOBILE / TABLET VERSION
========================================================= */

function MobileProcessSection({ data }) {
    const steps = data.steps;
    return (
        <section
            className="
                relative
                isolate

                h-[calc(var(--ae-dvh)-64px)]
                min-h-0

                overflow-hidden

                bg-[#061C36]

                text-white
            "
        >
            {/* =====================================================
                BACKGROUND ART

                Your process-bg.png provides the:
                - hand / accountant image
                - curved design
                - background lighting
            ====================================================== */}

            <data.E.Image path="backgroundImage" />
            <div
                className="
                    absolute
                    inset-0
                    z-0

                    bg-cover
                    bg-no-repeat
                "
                style={{
                    backgroundImage:
                        bgImage(data.backgroundImage),

                    /*
                     * Important for the mobile crop.
                     *
                     * Man/hand stays towards the upper-right
                     * like your reference.
                     */
                    backgroundPosition: "63% center",
                }}
            />


            {/* =====================================================
                DARK OVERLAY

                Strong on left for text.
                Light enough on right to keep image visible.
            ====================================================== */}

            <div
                className="
                    absolute
                    inset-0
                    z-[1]

                    bg-gradient-to-r

                    from-[#061C36]/95
                    via-[#061C36]/76
                    to-[#061C36]/28
                "
            />


            {/* LOWER DARKNESS FOR CARDS */}

            <div
                className="
                    absolute
                    inset-x-0
                    bottom-0
                    z-[2]

                    h-[65%]

                    bg-gradient-to-b

                    from-transparent
                    via-[#061C36]/38
                    to-[#061C36]/80
                "
            />


            {/* =====================================================
                COMPLETE MOBILE CONTENT

                Everything must live inside available viewport.
            ====================================================== */}

            <div
                className="
                    relative
                    z-20

                    h-full

                    px-[clamp(22px,6vw,42px)]

                    pt-[clamp(18px,2.6dvh,30px)]
                    pb-[clamp(12px,1.8dvh,20px)]

                    flex
                    flex-col
                "
            >
                {/* =================================================
                    TOP COPY
                ================================================== */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 18,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                    }}
                    transition={{
                        duration: 0.6,
                    }}
                    className="
                        shrink-0
                    "
                >
                    {/* EYEBROW */}

                    <p
                        className="
                            text-white/70

                            uppercase

                            tracking-[clamp(5px,1.8vw,8px)]

                            text-[clamp(11px,2.5vw,13px)]

                            font-medium
                        "
                    >
                        <data.E.Text path="eyebrow" />
                        </p>


                    {/* HEADING */}

                    <h2
                        className="
                            mt-[clamp(14px,2dvh,22px)]

                            font-serif
                            font-bold

                            text-white

                            text-[clamp(39px,11.4vw,58px)]

                            leading-[0.97]

                            tracking-[-1px]
                        "
                    >
                        <data.E.Text path="titleLine1" />
                        <br />
                        <span className="text-[#FF6B4A]">
                            <data.E.Text path="titleHighlight" />
                        </span>
                    </h2>


                    {/* DESCRIPTION */}

                    <p
                        className="
                            mt-[clamp(14px,2dvh,21px)]

                            max-w-[80%]

                            text-white/80

                            text-[clamp(12px,3.3vw,17px)]

                            leading-[1.5]
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

                    <Link
                        href={data.buttonHref}
                        className="
                            mt-[clamp(15px,2.1dvh,22px)]

                            h-[clamp(48px,6.4dvh,60px)]

                            px-[clamp(24px,6vw,34px)]

                            bg-white

                            text-[#123A5C]

                            rounded-[12px]

                            text-[clamp(13px,3.5vw,17px)]

                            font-bold

                            shadow-[0_12px_30px_rgba(0,0,0,0.15)]

                            flex
                            items-center
                            justify-center

                            gap-[10px]
                        "
                    >
                        <data.E.Text path="buttonText" /><data.E.Link path="buttonHref" />
                        <span>
                            →
                        </span>
                    </Link>
                </motion.div>


                {/* =================================================
                    PROCESS CARDS

                    flex-1 means the cards consume the remaining
                    available height instead of causing page overflow.
                ================================================== */}

                <div
                    className="
                        mt-[clamp(18px,2.7dvh,28px)]

                        flex-1
                        min-h-0

                        grid
                        grid-rows-4

                        gap-[clamp(7px,1.2dvh,12px)]
                    "
                >
                    {steps.map((step, index) => (
                        <MobileStepCard
                            key={index}
                            step={step}
                            index={index}
                        />
                    ))}
                </div>


                {/* =================================================
                    BOTTOM TEXT
                ================================================== */}

                <p
                    className="
                        shrink-0

                        mt-[clamp(13px,2dvh,20px)]

                        text-white/55

                        tracking-[clamp(4px,1.6vw,7px)]

                        text-[clamp(11px,2.3vw,12px)]
                    "
                >
                    <data.E.Text path="footerLabel" />
                </p>
            </div>
        </section>
    );
}


/* =========================================================
   MOBILE CARD
========================================================= */

function MobileStepCard({
    step,
    index,
}) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                x: 18,
            }}
            whileInView={{
                opacity: 1,
                x: 0,
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

                min-h-0

                rounded-[clamp(17px,4vw,25px)]

                border
                border-white/20

                bg-white/[0.09]

                backdrop-blur-[14px]

                shadow-[0_12px_28px_rgba(0,0,0,0.12)]

                px-[clamp(14px,3.5vw,21px)]

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

                    w-[clamp(48px,13vw,66px)]
                    h-[clamp(48px,13vw,66px)]

                    rounded-full

                    bg-white

                    flex
                    items-center
                    justify-center

                    text-[#B99BE8]

                    text-[clamp(18px,5vw,27px)]

                    font-bold

                    shadow-[0_7px_18px_rgba(0,0,0,0.08)]
                "
            >
                {step.icon}
            </div>


            {/* =====================================================
                CARD TEXT
            ====================================================== */}

            <div
                className="
                    ml-[clamp(13px,3.5vw,21px)]

                    min-w-0

                    pr-[clamp(36px,9vw,58px)]
                "
            >
                <h3
                    className="
                        text-white

                        font-bold

                        text-[clamp(15px,4vw,21px)]

                        leading-[1.1]
                    "
                >
                    {step.title}
                </h3>


                <p
                    className="
                        mt-[clamp(4px,0.7dvh,7px)]

                        text-white/70

                        text-[clamp(11px,2.8vw,14px)]

                        leading-[1.28]
                    "
                >
                    {step.text}
                </p>
            </div>


            {/* =====================================================
                NUMBER
            ====================================================== */}

            <div
                className="
                    absolute

                    right-[clamp(14px,4vw,22px)]

                    top-1/2
                    -translate-y-1/2

                    text-white/18

                    text-[clamp(30px,9vw,48px)]

                    font-bold

                    tracking-[-2px]
                "
            >
                {step.number}
            </div>
        </motion.div>
    );
}


/* =========================================================
   DESKTOP VERSION
========================================================= */

function DesktopProcessSection({ data }) {
    const steps = data.steps;
    return (
        <section
            className="
                relative
                isolate

                h-[calc(var(--ae-dvh)-88px)]
                min-h-0

                overflow-hidden

                bg-[#061C36]

                bg-cover
                bg-center
            "
            style={{
                backgroundImage:
                    bgImage(data.backgroundImage),
            }}
        >
            {/* DARK OVERLAY */}

            <div
                className="
                    absolute
                    inset-0

                    bg-[#061C36]/35
                "
            />


            {/* =====================================================
                DESKTOP CONTAINER
            ====================================================== */}

            <div
                className="
                    relative
                    z-10

                    h-full

                    max-w-[1400px]
                    mx-auto

                    px-[clamp(32px,4vw,56px)]

                    grid
                    grid-cols-2

                    gap-[clamp(25px,4vw,60px)]

                    items-center
                "
            >
                {/* =================================================
                    LEFT
                ================================================== */}

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
                        relative

                        -translate-x-4

                        xl:-translate-x-8
                    "
                >
                    {/* EYEBROW */}

                    <p
                        className="
                            text-white/70

                            tracking-[clamp(5px,0.55vw,7px)]

                            text-[clamp(11px,0.95vw,14px)]
                        "
                    >
                        <data.E.Text path="eyebrow" />
                        </p>


                    {/* HEADING */}

                    <h2
                        className="
                            mt-[clamp(18px,2.5dvh,28px)]

                            font-serif
                            font-bold

                            text-white

                            text-[clamp(44px,4.5vw,68px)]

                            leading-[1]
                        "
                    >
                        <data.E.Text path="titleLine1" />
                        <br />
                        <span className="text-[#FF6B4A]">
                            <data.E.Text path="titleHighlight" />
                        </span>
                    </h2>


                    {/* DESCRIPTION */}

                    <p
                        className="
                            mt-[clamp(18px,2.5dvh,28px)]

                            max-w-md

                            text-white/80

                            text-[clamp(14px,1.2vw,18px)]

                            leading-[1.65]
                        "
                    >
                        {data.description.replace(/\n/g, " ")}
                    </p>


                    {/* CTA */}

                    <Link
                        href={data.buttonHref}
                        className="
                            inline-block
                            mt-[clamp(20px,3dvh,32px)]

                            bg-white

                            text-[#123A5C]

                            px-[clamp(25px,2.5vw,36px)]
                            py-[clamp(12px,1.7dvh,16px)]

                            rounded-xl

                            text-[clamp(14px,1.1vw,16px)]

                            font-semibold

                            hover:scale-105

                            transition
                        "
                    >
                        <data.E.Text path="buttonText" /><data.E.Link path="buttonHref" /> →
                    </Link>


                    {/* FOOTER LABEL */}

                    <p
                        className="
                            mt-[clamp(28px,4dvh,50px)]

                            text-white/60

                            tracking-[5px]

                            text-[clamp(11px,0.9vw,14px)]
                        "
                    >
                        <data.E.Text path="footerLabel" />
                    </p>
                </motion.div>


                {/* =================================================
                    DESKTOP RIGHT CARDS
                ================================================== */}

                <motion.div
                    initial={{
                        opacity: 0,
                        x: 40,
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
                        relative

                        lg:-translate-x-8
                        xl:-translate-x-16
                    "
                >
                    {/* TIMELINE */}

                    <div
                        className="
                            absolute

                            left-7

                            top-[5%]
                            bottom-[5%]

                            w-[2px]

                            bg-white/20
                        "
                    />


                    {/* CARDS */}

                    <div
                        className="
                            flex
                            flex-col

                            gap-[clamp(8px,1.4dvh,16px)]
                        "
                    >
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                animate={{
                                    y: [0, -5, 0],
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    delay: index * 0.5,
                                    ease: "easeInOut",
                                }}
                                className="
                                    relative

                                    ml-14

                                    min-h-[clamp(86px,13dvh,125px)]

                                    rounded-[clamp(18px,1.7vw,28px)]

                                    bg-white/10

                                    backdrop-blur-xl

                                    border
                                    border-white/20

                                    px-[clamp(16px,1.5vw,22px)]
                                    py-[clamp(13px,1.5dvh,20px)]

                                    flex
                                    items-center

                                    gap-[clamp(14px,1.5vw,20px)]

                                    shadow-lg
                                "
                            >
                                <data.E.Item path="steps" index={index} />
                                {/* DOT */}

                                <div
                                    className="
                                        absolute

                                        -left-[52px]

                                        w-5
                                        h-5

                                        rounded-full

                                        bg-[#11B89C]

                                        shadow-[0_0_20px_#11B89C]
                                    "
                                />


                                {/* ICON */}

                                <div
                                    className="
                                        shrink-0

                                        w-[clamp(48px,4vw,56px)]
                                        h-[clamp(48px,4vw,56px)]

                                        rounded-full

                                        bg-white

                                        flex
                                        items-center
                                        justify-center

                                        text-[#B99BE8]

                                        text-[clamp(17px,1.4vw,21px)]
                                    "
                                >
                                    {step.icon}
                                </div>


                                {/* TEXT */}

                                <div className="flex-1">
                                    <h3
                                        className="
                                            text-white

                                            font-semibold

                                            text-[clamp(16px,1.35vw,20px)]
                                        "
                                    >
                                        <data.E.Text path={`steps.${index}.title`} />
                                    </h3>


                                    <p
                                        className="
                                            mt-1

                                            text-white/70

                                            text-[clamp(11px,0.95vw,14px)]

                                            leading-[1.4]
                                        "
                                    >
                                        <data.E.Text path={`steps.${index}.text`} />
                                    </p>
                                </div>


                                {/* NUMBER */}

                                <div
                                    className="
                                        text-white/20

                                        text-[clamp(28px,2.5vw,40px)]

                                        font-bold
                                    "
                                >
                                    <data.E.Text path={`steps.${index}.number`} />
                                </div>
                            </motion.div>
                        ))}
                        <data.E.Add path="steps" label="Add step" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}