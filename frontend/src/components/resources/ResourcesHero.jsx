"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { useCms } from "@/components/cms/useCms";
import { mediaUrl } from "@/lib/api";

const defaults = {
    eyebrow: "Resources & Insights",
    titleLine1: "Accounting & tax",
    titleLine2: "guides for UK",
    titleHighlight: "businesses.",
    description:
        "Explore practical advice, tax updates and expert insights to help you stay compliant and make better business decisions.",
    image: "/images/resources/resources-hero.png",
    imageAlt: "Resources and financial insights",
};

export default function ResourcesHero() {
    const { data, E, editButton, hidden } = useCms("resources-hero", defaults, {
        label: "Resources hero",
        buttonPosition: "right-3 top-[90px]",
    });
    const highlightWords = data.titleHighlight.split(" ");

    // Hidden by an admin: nothing is rendered for visitors.
    if (hidden) return null;

    return (
        <>
            {/* =========================================
                MOBILE AND TABLET HERO
                Straight bottom — no curved SVG
            ========================================== */}

            <section
                className="
                    relative
                    h-[clamp(350px,52svh,480px)]
                    overflow-hidden
                    bg-[#062844]
                    lg:hidden
                "
            >
            {editButton}

                {/* Background image */}
                <E.Image path="image" />
                <Image
                    src={mediaUrl(data.image)}
                    alt={data.imageAlt}
                    fill
                    priority
                    sizes="100vw"
                    className="
                        object-cover
                        object-[62%_center]
                    "
                />

                {/* Mobile overlay */}
                <div
                    className="
                        absolute
                        inset-0
                        bg-gradient-to-r
                        from-[#052B4A]/95
                        via-[#063A61]/76
                        to-[#062844]/25
                    "
                />

                {/* Small bottom shade */}
                <div
                    aria-hidden="true"
                    className="
                        absolute
                        inset-x-0
                        bottom-0
                        h-[24%]
                        bg-gradient-to-t
                        from-[#052A48]/55
                        to-transparent
                    "
                />

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.65,
                    }}
                    className="
                        relative
                        z-10
                        mx-auto
                        flex
                        h-full
                        w-full
                        max-w-[760px]
                        flex-col
                        justify-center
                        px-6
                        pb-5
                        pt-4
                    "
                >
                    <p
                        className="
                            text-[clamp(11px,1.5svh,13px)]
                            font-medium
                            uppercase
                            tracking-[0.34em]
                            text-[#16C3B2]
                        "
                    >
                        <E.Text path="eyebrow" />
                    </p>

                    <div role="heading" aria-level={1}
                        className="
                            mt-[clamp(12px,1.8svh,18px)]
                            max-w-[390px]
                            font-serif
                            text-[clamp(32px,9.5vw,50px)]
                            font-bold
                            leading-[0.98]
                            tracking-[-0.025em]
                            text-white
                        "
                    >
                        <span className="block">
                            <E.Text path="titleLine1" />
                        </span>

                        <span className="block">
                            <E.Text path="titleLine2" />{" "}
                            <span className="text-[#FF674B]">
                                {highlightWords.slice(0, -1).join(" ")}
                            </span>
                        </span>

                        <span className="block text-[#FF674B]">
                            {highlightWords.at(-1)}
                        </span>
                    </div>

                    <p
                        className="
                            mt-[clamp(18px,2.5svh,24px)]
                            max-w-[350px]
                            text-[clamp(13px,3.7vw,17px)]
                            leading-[1.65]
                            text-white/90
                        "
                    >
                        <E.Text path="description" />
                    </p>
                </motion.div>

                {/* No curve on mobile */}
            </section>

            {/* =========================================
                DESKTOP HERO
                Existing desktop design
            ========================================== */}

            <section
                className="
                    relative
                    hidden
                    h-[650px]
                    overflow-hidden
                    bg-[#062844]
                    lg:block
                "
            >
            {editButton}

                {/* Desktop background */}
                <E.Image path="image" />
                <Image
                    src={mediaUrl(data.image)}
                    alt={data.imageAlt}
                    fill
                    priority
                    sizes="100vw"
                    className="
                        object-cover
                        object-center
                    "
                />

                {/* Desktop overlay */}
                <div
                    className="
                        absolute
                        inset-0
                        bg-gradient-to-r
                        from-[#062844]/90
                        via-[#062844]/55
                        to-transparent
                    "
                />

                <div
                    className="
                        relative
                        z-10
                        mx-auto
                        max-w-[1400px]
                        px-8
                        pt-24
                        lg:px-14
                    "
                >
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 25,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.7,
                        }}
                        className="max-w-xl"
                    >
                        <p
                            className="
                                mb-4
                                text-sm
                                uppercase
                                tracking-[6px]
                                text-[#12BFAE]
                            "
                        >
                            <E.Text path="eyebrow" />
                        </p>

                        <h1
                            className="
                                font-serif
                                text-[48px]
                                font-bold
                                leading-[1.05]
                                text-white
                                xl:text-[60px]
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
                                mt-5
                                max-w-lg
                                text-lg
                                leading-8
                                text-white/85
                            "
                        >
                            <E.Text path="description" />
                        </p>
                    </motion.div>
                </div>

                {/* Desktop U shape */}
                <div
                    className="
                        absolute
                        bottom-[-1px]
                        left-0
                        w-full
                    "
                >
                    <svg
                        viewBox="0 0 1440 110"
                        preserveAspectRatio="none"
                        className="h-[110px] w-full"
                    >
                        <path
                            fill="white"
                            d="
                                M0 0
                                C350 90 1090 90 1440 0
                                L1440 110
                                L0 110
                                Z
                            "
                        />
                    </svg>
                </div>
            </section>
        </>
    );
}