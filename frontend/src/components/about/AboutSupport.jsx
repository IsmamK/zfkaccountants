"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { useCms } from "@/components/cms/useCms";
import { mediaUrl } from "@/lib/api";

const defaultCards = [
    {
        number: "01",
        title: "Limited Company Directors",
        text: "Support with annual accounts, Corporation Tax and more.",
        icon: "🏢",
        color: "#20D4C1",
    },
    {
        number: "02",
        title: "Sole Traders & Freelancers",
        text: "Simple, straightforward tax support tailored to your needs.",
        icon: "♙",
        color: "#FF8068",
    },
    {
        number: "03",
        title: "Landlords & Property Owners",
        text: "Help with rental income, Self Assessment and more.",
        icon: "♧",
        color: "#6DB7FF",
    },
    {
        number: "04",
        title: "Growing Businesses",
        text: "Flexible accounting support as you scale and grow.",
        icon: "▥",
        color: "#20D4C1",
    },
];

const defaults = {
    eyebrow: "WHO WE SUPPORT",
    titleLine1: "Different",
    titleLine2: "businesses.",
    titleHighlight1: "Same trusted",
    titleHighlight2: "support.",
    description:
        "We provide accounting and tax support for individuals and businesses across the UK, tailored to your goals and circumstances.",
    buttonText: "Explore Our Services",
    buttonHref: "/services",
    image: "/images/about/support-hero.png",
    imageAlt: "ZFK Accountants support",
    trustTitleLine1: "Trusted by",
    trustTitleLine2: "UK Businesses",
    trustTextLine1: "People. Compliance.",
    trustTextLine2: "Progress.",
    cards: defaultCards,
};

const fields = {
    "cards[].icon": { label: "Icon (symbol or emoji)" },
    "cards[].color": { label: "Accent colour (hex)" },
};

export default function AboutSupport() {
    const { data, E, editButton, hidden } = useCms("about-support", defaults, {
        label: "Who we support",
        fields,
    });

    const cards = data.cards;

    // Hidden by an admin: nothing is rendered for visitors.
    if (hidden) return null;

    return (
        <section
            className="
                relative
                overflow-hidden
                bg-[#032542]

                min-h-[var(--ae-svh)]

                py-5
                sm:py-8

                lg:min-h-[760px]
                lg:h-[calc(var(--ae-vh)-80px)]
                lg:py-0

                flex
                items-center
            "
        >
            {editButton}


            {/* =====================================================
                BACKGROUND
            ====================================================== */}

            <div
                className="
                    absolute
                    right-[-180px]
                    top-[-150px]
                    w-[360px]
                    h-[360px]
                    rounded-full
                    bg-[#073957]
                    blur-3xl
                    opacity-60
                "
            />

            <div
                className="
                    absolute
                    left-[-220px]
                    bottom-[-250px]
                    w-[400px]
                    h-[400px]
                    rounded-full
                    bg-[#073957]
                    blur-3xl
                    opacity-30
                "
            />


            {/* =====================================================
                CONTAINER
            ====================================================== */}

            <div
                className="
                    relative
                    z-10
                    w-full
                    max-w-[1400px]
                    mx-auto

                    px-5
                    sm:px-8
                    lg:px-10
                "
            >

                {/* =================================================
                    HERO
                ================================================== */}

                <div
                    className="
                        relative

                        grid
                        grid-cols-1

                        lg:grid-cols-[45%_55%]

                        items-center
                    "
                >

                    {/* =================================================
                        LEFT CONTENT
                    ================================================== */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            x: -30,
                        }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                        }}
                        viewport={{
                            once: true,
                        }}
                        transition={{
                            duration: 0.6,
                        }}
                        className="
                            relative
                            z-20
                        "
                    >

                        {/* LABEL */}

                        <p
                            className="
                                text-[#20D4C1]

                                uppercase

                                tracking-[4px]
                                sm:tracking-[6px]
                                lg:tracking-[8px]

                                font-bold

                                text-[11px]
                                sm:text-[11px]
                                lg:text-xs
                            "
                        >
                            <E.Text path="eyebrow" />
                        </p>


                        {/* =================================================
                            TITLE
                        ================================================== */}

                        <h2
                            className="
                                mt-2
                                sm:mt-3
                                lg:mt-4

                                font-serif
                                font-bold

                                text-[35px]
                                leading-[0.98]

                                sm:text-[42px]

                                lg:text-[48px]

                                text-white

                                max-w-[290px]
                                sm:max-w-[360px]
                                lg:max-w-none
                            "
                        >
                            <E.Text path="titleLine1" />
                            <br />

                            <E.Text path="titleLine2" />
                            <br />

                            <span className="text-[#FF6B4A]">
                                <E.Text path="titleHighlight1" />
                                <br />
                                <E.Text path="titleHighlight2" />
                            </span>
                        </h2>


                        {/* GREEN LINE */}

                        <div
                            className="
                                mt-3
                                sm:mt-4

                                w-12
                                sm:w-14

                                h-[3px]

                                bg-[#20D4C1]
                            "
                        />


                        {/* =================================================
                            DESCRIPTION
                        ================================================== */}

                        <p
                            className="
                                mt-3
                                sm:mt-4

                                max-w-[390px]

                                text-[12px]
                                leading-[1.45]

                                sm:text-sm
                                sm:leading-6

                                lg:text-base
                                lg:leading-7

                                text-[#D4E1EC]
                            "
                        >
                            <E.Text path="description" />
                        </p>


                        {/* =================================================
                            BUTTON
                        ================================================== */}

                        <Link
                            href={data.buttonHref}
                            className="
                                inline-block
                                mt-4
                                sm:mt-5

                                px-6
                                sm:px-7

                                py-2.5
                                sm:py-3

                                rounded-lg
                                sm:rounded-xl

                                bg-[#FF6B4A]

                                text-white
                                font-semibold

                                text-xs
                                sm:text-sm

                                shadow-lg

                                hover:scale-[1.02]
                                transition-transform
                            "
                        >
                            <E.Text path="buttonText" /><E.Link path="buttonHref" /> →
                        </Link>

                    </motion.div>


                    {/* =================================================
                        IMAGE AREA

                        IMPORTANT:
                        The face is deliberately positioned away
                        from the trust card.
                    ================================================== */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.94,
                        }}
                        whileInView={{
                            opacity: 1,
                            scale: 1,
                        }}
                        viewport={{
                            once: true,
                        }}
                        transition={{
                            duration: 0.7,
                        }}
                        className="
                            relative

                            h-[115px]

                            sm:h-[145px]

                            lg:h-[380px]

                            mt-[-20px]
                            sm:mt-[-25px]

                            lg:mt-0

                            pointer-events-none
                        "
                    >

                        {/* =================================================
                            MAN IMAGE

                            Mobile:
                            circle is on the right, but the face
                            remains fully visible.
                        ================================================== */}

                        <div
                            className="
                                absolute

                                right-[38px]
                                top-[-70px]

                                w-[150px]
                                h-[150px]

                                sm:right-[75px]
                                sm:top-[-95px]

                                sm:w-[190px]
                                sm:h-[190px]

                                lg:right-[150px]
                                lg:top-[-45px]

                                lg:w-[420px]
                                lg:h-[420px]

                                rounded-full
                                overflow-hidden

                                border-[4px]
                                sm:border-[5px]
                                lg:border-[7px]

                                border-[#0A385B]

                                z-10
                            "
                        >
                            <E.Image path="image" />
                            <Image
                                src={mediaUrl(data.image)}
                                alt={data.imageAlt}
                                fill
                                sizes="420px"
                                className="object-cover"
                            />
                        </div>


                        {/* =================================================
                            TRUST CARD

                            Mobile:
                            placed to the RIGHT/LOWER side of the image,
                            NOT across the man's face.
                        ================================================== */}

                        <motion.div
                            animate={{
                                y: [0, -5, 0],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="
                                absolute

                                right-[-2px]
                                top-[0px]

                                w-[115px]

                                sm:right-[5px]
                                sm:top-[5px]
                                sm:w-[140px]

                                lg:right-[35px]
                                lg:top-[55px]
                                lg:w-[200px]

                                rounded-xl
                                sm:rounded-2xl
                                lg:rounded-3xl

                                bg-[#0B3555]

                                border
                                border-white/10

                                p-2
                                sm:p-3
                                lg:p-5

                                shadow-2xl

                                z-20
                            "
                        >

                            {/* CHECK */}

                            <div
                                className="
                                    h-7
                                    w-7

                                    sm:h-8
                                    sm:w-8

                                    lg:h-12
                                    lg:w-12

                                    rounded-full

                                    bg-[#20D4C1]

                                    flex
                                    items-center
                                    justify-center

                                    text-xs
                                    sm:text-sm
                                    lg:text-xl
                                "
                            >
                                ✓
                            </div>


                            {/* TITLE */}

                            <h3
                                className="
                                    mt-1.5
                                    sm:mt-2
                                    lg:mt-4

                                    font-serif
                                    font-bold

                                    text-[11px]
                                    sm:text-xs
                                    lg:text-lg

                                    leading-tight

                                    text-white
                                "
                            >
                                <E.Text path="trustTitleLine1" />
                                <br />
                                <E.Text path="trustTitleLine2" />
                            </h3>


                            {/* TEXT */}

                            <p
                                className="
                                    mt-1
                                    sm:mt-1.5
                                    lg:mt-2

                                    text-[11px]
                                    sm:text-[11px]
                                    lg:text-xs

                                    leading-3
                                    sm:leading-4
                                    lg:leading-5

                                    text-gray-300
                                "
                            >
                                <E.Text path="trustTextLine1" />
                                <br />
                                <E.Text path="trustTextLine2" />
                            </p>

                        </motion.div>

                    </motion.div>

                </div>


                {/* =====================================================
                    SUPPORT CARDS
                ====================================================== */}

                <div
                    className="
                        grid
                        grid-cols-1
                        lg:grid-cols-4

                        gap-2.5
                        sm:gap-3
                        lg:gap-5

                        mt-[-4px]
                        sm:mt-0
                        lg:mt-2
                    "
                >

                    {cards.map((card, index) => (

                        <motion.div
                            key={index}

                            initial={{
                                opacity: 0,
                                y: 25,
                            }}

                            whileInView={{
                                opacity: 1,
                                y: 0,
                            }}

                            viewport={{
                                once: true,
                                amount: 0.1,
                            }}

                            transition={{
                                duration: 0.45,
                                delay: index * 0.08,
                            }}

                            className="
                                relative
                                overflow-hidden

                                h-[88px]

                                sm:h-[98px]

                                lg:h-[165px]

                                rounded-[18px]
                                sm:rounded-[22px]
                                lg:rounded-[26px]

                                bg-[#0A3150]

                                border
                                border-white/10

                                px-3
                                sm:px-4
                                lg:p-5

                                flex
                                items-center

                                group
                            "
                        >
<E.Item path="cards" index={index} />

                            {/* =================================================
                                ICON
                            ================================================== */}

                            <div
                                style={{
                                    background: card.color,
                                }}
                                className="
                                    shrink-0

                                    h-11
                                    w-11

                                    sm:h-12
                                    sm:w-12

                                    lg:h-12
                                    lg:w-12

                                    rounded-full

                                    flex
                                    items-center
                                    justify-center

                                    text-base
                                    sm:text-lg

                                    z-10
                                "
                            >
                                {card.icon}
                            </div>


                            {/* =================================================
                                CONTENT
                            ================================================== */}

                            <div
                                className="
                                    ml-3
                                    sm:ml-4

                                    pr-[55px]

                                    min-w-0
                                "
                            >

                                <h3
                                    className="
                                        font-serif
                                        font-bold

                                        text-[15px]
                                        leading-[1.1]

                                        sm:text-[17px]

                                        lg:text-lg

                                        text-white
                                    "
                                >
                                    <E.Text path={`cards.${index}.title`} />
                                </h3>


                                <p
                                    className="
                                        mt-1

                                        text-[11px]
                                        leading-[1.3]

                                        sm:text-[11px]

                                        lg:text-xs

                                        text-[#C8DCEB]

                                        line-clamp-2
                                    "
                                >
                                    <E.Text path={`cards.${index}.text`} />
                                </p>

                            </div>


                            {/* =================================================
                                NUMBER
                            ================================================== */}

                            <span
                                className="
                                    absolute

                                    right-3
                                    top-3

                                    sm:right-4
                                    sm:top-3

                                    lg:right-5
                                    lg:top-5

                                    text-[22px]
                                    sm:text-2xl
                                    lg:text-3xl

                                    font-bold

                                    text-[#6B9BC0]/45
                                "
                            >
                                <E.Text path={`cards.${index}.number`} />
                            </span>


                            {/* =================================================
                                CORNER COLOR
                            ================================================== */}

                            <div
                                style={{
                                    background: card.color,
                                }}
                                className="
                                    absolute

                                    bottom-[-18px]
                                    right-[-18px]

                                    w-14
                                    h-14

                                    rounded-full

                                    opacity-30
                                "
                            />


                            {/* =================================================
                                ARROW
                            ================================================== */}

                            <div
                                style={{
                                    borderColor: card.color,
                                }}
                                className="
                                    absolute

                                    right-3
                                    bottom-3

                                    sm:right-4
                                    sm:bottom-4

                                    lg:right-5
                                    lg:bottom-5

                                    w-7
                                    h-7

                                    sm:w-8
                                    sm:h-8

                                    lg:w-9
                                    lg:h-9

                                    rounded-full

                                    border

                                    flex
                                    items-center
                                    justify-center

                                    text-white

                                    text-xs
                                    sm:text-sm

                                    transition-transform
                                    duration-200

                                    group-hover:translate-x-1
                                "
                            >
                                →
                            </div>

                        </motion.div>

                    ))}
                    <E.Add path="cards" label="Add card" />

                </div>

            </div>

        </section>
    );
}