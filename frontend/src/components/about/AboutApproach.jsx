"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { useCms } from "@/components/cms/useCms";
import { mediaUrl } from "@/lib/api";

const defaultSteps = [
    {
        number: "01",
        title: "Understand",
        text: "Your goals, challenges and opportunities.",
        icon: "💬",
        image: "/images/about/approach-understand.png",
        color: "#12BFA3",
    },
    {
        number: "02",
        title: "Plan",
        text: "A tailored strategy to get you where you want to be.",
        icon: "📄",
        image: "/images/about/approach-plan.png",
        color: "#FF6B4A",
    },
    {
        number: "03",
        title: "Deliver",
        text: "We provide accurate, compliant and efficient solutions.",
        icon: "⚙",
        image: "/images/about/approach-deliver.png",
        color: "#4EA3FF",
    },
    {
        number: "04",
        title: "Support",
        text: "We're with you for the long-term success.",
        icon: "📈",
        image: "/images/about/approach-support.png",
        color: "#12BFA3",
    },
];

const defaults = {
    eyebrow: "OUR APPROACH",
    titleLine1: "Built around",
    titleLine2: "you,",
    titleHighlight1: "not just",
    titleHighlight2: "numbers.",
    description:
        "We take the time to understand your goals, simplify the complex, and provide practical, tailored solutions so you can move forward with confidence.",
    buttonText: "See How We Work",
    buttonHref: "/services#how-we-work",
    steps: defaultSteps,
};

const fields = {
    "steps[].icon": { label: "Icon (emoji)" },
    "steps[].color": { label: "Accent colour (hex)" },
};

export default function AboutApproach() {
    const { data, E, editButton, hidden } = useCms("about-approach", defaults, {
        label: "Our approach",
        fields,
    });

    const steps = data.steps;

    // Hidden by an admin: nothing is rendered for visitors.
    if (hidden) return null;

    return (
        <section
            className="
                relative
                overflow-hidden
                bg-white

                min-h-[780px]
                py-10

                sm:min-h-[850px]
                sm:py-12

                lg:h-[760px]
                lg:min-h-0
                lg:py-0

                flex
                items-center
            "
        >
            {editButton}


            {/* =========================
                BACKGROUND TOP RIGHT
            ========================== */}

            <div
                className="
                    absolute
                    right-[-150px]
                    top-[-150px]
                    w-[320px]
                    h-[320px]
                    rounded-full
                    bg-[#F3FAFA]

                    sm:right-[-140px]
                    sm:top-[-160px]
                    sm:w-[350px]
                    sm:h-[350px]
                "
            />


            {/* =========================
                BACKGROUND BOTTOM LEFT
            ========================== */}

            <div
                className="
                    absolute
                    left-[-250px]
                    bottom-[-300px]
                    w-[450px]
                    h-[450px]
                    rounded-full
                    bg-[#F5FBFC]
                    opacity-80
                "
            />


            <div
                className="
                    relative
                    w-full
                    max-w-[1450px]
                    mx-auto

                    px-5
                    sm:px-8
                    lg:px-10

                    grid
                    grid-cols-1
                    lg:grid-cols-[38%_62%]

                    items-center

                    gap-8
                    sm:gap-10
                    lg:gap-0
                "
            >

                {/* =====================================================
                    LEFT / HERO
                ====================================================== */}

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
                        amount: 0.2,
                    }}
                    transition={{
                        duration: 0.7,
                    }}
                    className="
                        relative
                        z-10
                        w-full
                        max-w-[650px]
                        mx-auto
                        lg:mx-0
                    "
                >

                    {/* LABEL */}

                    <p
                        className="
                            uppercase
                            tracking-[5px]
                            sm:tracking-[7px]

                            text-[11px]
                            sm:text-xs
                            lg:text-sm

                            font-bold
                            text-[#12BFA3]
                        "
                    >
                        <E.Text path="eyebrow" />
                    </p>


                    {/* TITLE */}

                    <h2
                        className="
                            mt-3
                            sm:mt-4
                            lg:mt-6

                            font-serif
                            font-bold

                            text-[38px]
                            leading-[1.02]

                            sm:text-[46px]
                            sm:leading-[1.04]

                            md:text-[56px]

                            lg:text-[62px]
                            lg:leading-[1.05]

                            text-[#123A5C]
                        "
                    >
                        <E.Text path="titleLine1" />
                        <br />

                        <E.Text path="titleLine2" />{" "}

                        <span className="text-[#FF6B4A]">
                            <E.Text path="titleHighlight1" />
                        </span>

                        <br />

                        <span className="text-[#FF6B4A]">
                            <E.Text path="titleHighlight2" />
                        </span>
                    </h2>


                    {/* GREEN LINE */}

                    <div
                        className="
                            mt-4
                            sm:mt-5
                            lg:mt-7

                            w-14
                            sm:w-16

                            h-[3px]

                            bg-[#12BFA3]
                        "
                    />


                    {/* DESCRIPTION */}

                    <p
                        className="
                            mt-4
                            sm:mt-5
                            lg:mt-7

                            max-w-[500px]

                            text-[14px]
                            leading-[1.55]

                            sm:text-base
                            sm:leading-7

                            lg:text-lg
                            lg:leading-8

                            text-[#334B65]
                        "
                    >
                        <E.Text path="description" />
                    </p>


                    {/* BUTTON */}

                    <Link
                href={data.buttonHref}
                        className="inline-block 
                            mt-5
                            sm:mt-6
                            lg:mt-9

                            px-7
                            sm:px-8
                            lg:px-10

                            py-3
                            sm:py-3.5
                            lg:py-4

                            rounded-xl

                            bg-[#FF6B4A]

                            text-white
                            font-semibold

                            text-sm
                            sm:text-base

                            shadow-lg

                            hover:scale-[1.02]
                            transition-transform
                            duration-200
                        "
                    >
                        <E.Text path="buttonText" /><E.Link path="buttonHref" /> →
                    </Link>

                </motion.div>


                {/* =====================================================
                    RIGHT / STEPS
                ====================================================== */}

                <div
                    className="
                        relative
                        w-full

                        h-[385px]

                        sm:h-[430px]

                        lg:h-[620px]
                    "
                >

                    {/* =================================================
                        MOBILE SNAKE
                    ================================================== */}

                    <svg
                        className="
                            absolute

                            left-[-4px]
                            top-[8px]

                            w-[85px]
                            h-[370px]

                            sm:left-[0]
                            sm:w-[100px]
                            sm:h-[415px]

                            lg:hidden

                            z-0
                        "
                        viewBox="0 0 100 415"
                        fill="none"
                    >
                        <path
                            d="
                                M70 10
                                C15 35 15 75 65 105
                                C100 130 95 165 45 195
                                C10 215 10 255 65 280
                                C100 300 90 340 40 365
                                C25 375 25 395 50 405
                            "
                            stroke="#123A5C"
                            strokeWidth="1.8"
                            strokeDasharray="4 9"
                            strokeLinecap="round"
                        />
                    </svg>


                    {/* =================================================
                        DESKTOP SNAKE
                    ================================================== */}

                    <svg
                        className="
                            hidden
                            lg:block

                            absolute
                            left-[5px]
                            top-[25px]

                            w-[170px]
                            h-[570px]

                            z-0
                        "
                        viewBox="0 0 170 570"
                        fill="none"
                    >
                        <path
                            d="
                                M120 25
                                C40 65 40 120 95 155
                                C150 195 145 235 70 285
                                C15 325 20 380 100 415
                                C155 450 140 510 60 550
                            "
                            stroke="#123A5C"
                            strokeWidth="2"
                            strokeDasharray="4 10"
                            strokeLinecap="round"
                        />
                    </svg>


                    {/* =================================================
                        STEPS
                    ================================================== */}

                    {steps.map((step, index) => (

                        <motion.div
                            key={index}

                            initial={{
                                opacity: 0,
                                x: 35,
                            }}

                            whileInView={{
                                opacity: 1,
                                x: 0,
                            }}

                            viewport={{
                                once: true,
                                amount: 0.15,
                            }}

                            transition={{
                                duration: 0.55,
                                delay: index * 0.12,
                            }}

                            className="
                                absolute
                                z-10

                                left-[35px]
                                right-0

                                sm:left-[50px]

                                lg:left-[115px]
                                lg:right-4

                                flex
                                items-center
                            "

                            style={{
                                top: `${index * 94}px`,
                            }}
                        >
<E.Item path="steps" index={index} />

                            {/* ==============================
                                COLORED DOT
                            =============================== */}

                            <div
                                className="
                                    absolute

                                    left-[-44px]

                                    sm:left-[-52px]

                                    lg:left-[-82px]

                                    h-[13px]
                                    w-[13px]

                                    sm:h-4
                                    sm:w-4

                                    lg:h-5
                                    lg:w-5

                                    rounded-full

                                    border-[2px]
                                    sm:border-[3px]
                                    lg:border-[4px]

                                    border-white

                                    shadow-lg

                                    z-20
                                "
                                style={{
                                    background: step.color,
                                }}
                            />


                            {/* ==============================
                                CARD
                            =============================== */}

                            <div
                                className="
                                    relative
                                    w-full

                                    h-[82px]

                                    sm:h-[92px]

                                    lg:w-full
                                    lg:max-w-[620px]
                                    lg:h-[118px]

                                    rounded-[20px]
                                    sm:rounded-[25px]
                                    lg:rounded-[35px]

                                    bg-white

                                    shadow-[0_10px_30px_rgba(0,0,0,.07)]

                                    flex
                                    items-center

                                    px-2.5
                                    sm:px-4
                                    lg:px-6
                                "
                            >

                                {/* ==============================
                                    NUMBER
                                =============================== */}

                                <div
                                    className="
                                        shrink-0

                                        h-[55px]
                                        w-[55px]

                                        sm:h-[64px]
                                        sm:w-[64px]

                                        lg:h-[86px]
                                        lg:w-[86px]

                                        rounded-full

                                        bg-[#EFFAF8]

                                        flex
                                        items-center
                                        justify-center

                                        font-serif
                                        font-bold

                                        text-[23px]

                                        sm:text-[28px]

                                        lg:text-4xl
                                    "
                                    style={{
                                        color: step.color,
                                    }}
                                >
                                    <E.Text path={`steps.${index}.number`} />
                                </div>


                                {/* ==============================
                                    ICON
                                =============================== */}

                                <div
                                    className="
                                        shrink-0

                                        ml-2

                                        sm:ml-2.5

                                        lg:ml-5

                                        h-[38px]
                                        w-[38px]

                                        sm:h-[44px]
                                        sm:w-[44px]

                                        lg:h-[56px]
                                        lg:w-[56px]

                                        rounded-full

                                        bg-[#EAF7F4]

                                        flex
                                        items-center
                                        justify-center

                                        text-[14px]

                                        sm:text-[16px]

                                        lg:text-xl
                                    "
                                >
                                    {step.icon}
                                </div>


                                {/* ==============================
                                    TEXT
                                =============================== */}

                                <div
                                    className="
                                        ml-2

                                        sm:ml-3

                                        lg:ml-6

                                        pr-[54px]

                                        sm:pr-[65px]

                                        lg:pr-28

                                        min-w-0
                                    "
                                >

                                    <h3
                                        className="
                                            font-serif
                                            font-bold

                                            text-[16px]

                                            sm:text-[19px]

                                            lg:text-2xl

                                            leading-tight

                                            text-[#123A5C]
                                        "
                                    >
                                        <E.Text path={`steps.${index}.title`} />
                                    </h3>


                                    <p
                                        className="
                                            mt-0.5

                                            text-[11px]
                                            leading-[1.25]

                                            sm:text-[11px]
                                            sm:leading-[1.3]

                                            lg:text-sm
                                            lg:leading-5

                                            text-[#334B65]
                                        "
                                    >
                                        <E.Text path={`steps.${index}.text`} />
                                    </p>

                                </div>


                                {/* ==============================
                                    IMAGE
                                =============================== */}

                                <div
                                    className="
                                        absolute

                                        right-2

                                        sm:right-3

                                        lg:right-5

                                        h-[58px]
                                        w-[58px]

                                        sm:h-[68px]
                                        sm:w-[68px]

                                        lg:h-[92px]
                                        lg:w-[92px]

                                        rounded-full

                                        overflow-hidden
                                    "
                                >
                                    <E.Image path={`steps.${index}.image`} />
                                    <Image
                                        src={mediaUrl(step.image)}
                                        fill
                                        sizes="92px"
                                        alt=""
                                        className="object-cover"
                                    />
                                </div>

                            </div>

                        </motion.div>

                    ))}
                    <E.Add path="steps" label="Add step" />

                </div>

            </div>

        </section>
    );
}