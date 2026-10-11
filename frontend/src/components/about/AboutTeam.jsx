"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { useCms } from "@/components/cms/useCms";
import { mediaUrl } from "@/lib/api";

const defaultTeam = [
    {
        name: "Ayesha Khan",
        role: "Senior Accountant",
        qualification: "",
        image: "/images/team/ayesha.png",
        quote: "Helping businesses stay compliant and grow with confidence.",
    },
    {
        name: "James Carter",
        role: "Tax Manager",
        qualification: "",
        image: "/images/team/james.png",
        quote: "Providing clear tax advice with a practical approach.",
    },
    {
        name: "Emma Wilson",
        role: "Compliance Lead",
        qualification: "",
        image: "/images/team/emma-wilson.png",
        quote: "Keeping clients protected with reliable compliance support.",
    },
    {
        name: "Daniel Smith",
        role: "Accountant",
        qualification: "",
        image: "/images/team/daniel.png",
        quote: "Supporting clients with accurate reporting and financial guidance.",
    },
    {
        name: "Sarah Lee",
        role: "Finance Advisor",
        qualification: "",
        image: "/images/team/sarah.png",
        quote: "Making financial decisions easier with expert guidance.",
    },
];

const defaultFeatures = [
    {
        icon: "👥",
        title: "Clear & Practical",
        text: "Advice",
    },
    {
        icon: "🛡",
        title: "Client-Focused",
        text: "Approach",
    },
    {
        icon: "📈",
        title: "Committed",
        text: "to Your Growth",
    },
];

/* =========================================
   MOBILE COMPONENT
   Independent layout and carousel state
========================================== */

const defaults = {
    // Hidden until real team members (names, photos, roles) replace the
    // placeholders below — never publish invented people (R26).
    _hidden: true,
    eyebrow: "Our Team",
    titleLine1: "The people",
    titleLine2: "behind your",
    titleHighlight: "progress.",
    description:
        "A dedicated team of UK accountants and tax specialists, committed to making your life easier with clear advice, expert support and a personal approach.",
    buttonText: "Meet Our Team",
    buttonHref: "#team-members",
    taglineLine1: "Real people.",
    taglineLine2: "Real support.",
    team: defaultTeam,
    features: defaultFeatures,
};

const fields = {
    "team[].image": { label: "Photo", category: "team" },
    "features[].icon": { label: "Icon (emoji)" },
};

function MobileMeetTeam({ data }) {
    const { team, features } = data;
    const [active, setActive] = useState(0);
    const activeCardRef = useRef(null);
    const reduceMotion = useReducedMotion();

    // Automatically rotate the mobile cards.
    useEffect(() => {
        const timer = setInterval(() => {
            setActive((current) => (current + 1) % team.length);
        }, 2500);

        return () => clearInterval(timer);
    }, [team.length]);

    const next = () => {
        setActive((current) => (current + 1) % team.length);
    };

    const previous = () => {
        setActive(
            (current) => (current - 1 + team.length) % team.length
        );
    };

    return (
        <section
            aria-label="Our team"
            className="
                relative
                isolate
                h-[calc(var(--ae-svh)-56px)]
                overflow-y-auto
                bg-[#032B4A]
                lg:hidden
            "
        >
            {data.editButton}

            <div
                className="
                    relative
                    mx-auto
                    grid
                    h-full
                    min-h-[640px]
                    w-full
                    max-w-[680px]
                    grid-rows-[auto_minmax(250px,1fr)_auto_auto]
                    gap-y-3
                    overflow-hidden
                    pb-[max(12px,env(safe-area-inset-bottom))]
                    pt-[clamp(16px,2.5svh,26px)]
                "
            >
                {/* Decorative circle */}
                <div
                    aria-hidden="true"
                    className="
                        pointer-events-none
                        absolute
                        -right-[12%]
                        top-5
                        -z-10
                        aspect-square
                        w-[76%]
                        rounded-full
                        border
                        border-[#164766]
                    "
                >
                    <div
                        className="
                            absolute
                            inset-0
                            rotate-[35deg]
                            rounded-full
                            border-r
                            border-t
                            border-[#FF6B4A]/80
                        "
                    />
                </div>

                {/* ================= MOBILE HEADING ================= */}

                <div className="px-5 sm:px-8">
                    <p
                        className="
                            m-0
                            text-[11px]
                            font-bold
                            uppercase
                            tracking-[0.35em]
                            text-[#0FAE98]
                        "
                    >
                        <data.E.Text path="eyebrow" />
                    </p>

                    <h2
                        className="
                            mb-0
                            mt-3
                            font-serif
                            text-[clamp(30px,4.8svh,46px)]
                            font-bold
                            leading-[1.01]
                            tracking-[-0.025em]
                            text-white
                        "
                    >
                        <data.E.Text path="titleLine1" />
                        <br />
                        <data.E.Text path="titleLine2" />
                        <br />
                        <span className="text-[#FF6B4A]">
                            <data.E.Text path="titleHighlight" />
                        </span>
                    </h2>

                    <p
                        className="
                            mb-0
                            mt-3
                            max-w-[520px]
                            text-[clamp(13px,1.8svh,16px)]
                            font-normal
                            leading-[1.4]
                            text-[#EDF4F9]
                        "
                    >
                        <data.E.Text path="description" />
                    </p>

                    <button
                        type="button"
                        onClick={() => {
                            activeCardRef.current?.focus({
                                preventScroll: true,
                            });
                        }}
                        className="
                            mt-3
                            inline-flex
                            min-h-11
                            items-center
                            justify-center
                            gap-3
                            rounded-xl
                            bg-[#FF6B4A]
                            px-6
                            py-2
                            text-[14px]
                            font-bold
                            text-white
                            transition-transform
                            active:scale-[0.98]
                        "
                    >
                        <data.E.Text path="buttonText" /><data.E.Link path="buttonHref" />
                        <span aria-hidden="true">→</span>
                    </button>
                </div>

                {/* ================= MOBILE CAROUSEL ================= */}

                <div
                    role="region"
                    aria-roledescription="carousel"
                    aria-label="Team members"
                    className="relative min-h-0"
                >
                    {team.map((member, index) => {
                        const difference =
                            (index - active + team.length) % team.length;

                        const isActive = difference === 0;
                        const isRight = difference === 1;
                        const isLeft = difference === team.length - 1;
                        const visible = isActive || isLeft || isRight;

                        return (
                            <motion.article
                                key={index}
                                ref={isActive ? activeCardRef : null}
                                tabIndex={isActive ? 0 : -1}
                                aria-hidden={!isActive}
                                aria-label={`${member.name}, ${member.role}`}
                                initial={false}
                                animate={{
                                    x: isLeft
                                        ? "-84%"
                                        : isRight
                                            ? "84%"
                                            : "0%",
                                    y: isActive ? "0%" : "8%",
                                    scale: isActive ? 1 : 0.8,
                                    opacity: isActive
                                        ? 1
                                        : visible
                                            ? 0.46
                                            : 0,
                                }}
                                transition={{
                                    duration: reduceMotion ? 0 : 0.25,
                                    ease: "easeInOut",
                                }}
                                style={{
                                    zIndex: isActive ? 30 : visible ? 10 : 0,
                                    pointerEvents: isActive ? "auto" : "none",
                                }}
                                className="
                                    absolute
                                    left-[25%]
                                    top-0
                                    grid
                                    h-full
                                    w-[50%]
                                    origin-center
                                    grid-rows-[48%_52%]
                                    overflow-hidden
                                    rounded-[20px]
                                    border
                                    border-[#175370]
                                    bg-[#07385A]
                                    shadow-[0_12px_28px_rgba(0,0,0,0.18)]
                                    outline-offset-2
                                    outline-[#0FBEA7]
                                "
                            >
                                {/* Photo */}
                                <div className="relative min-h-0">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        sizes="(max-width: 680px) 50vw, 340px"
                                        className="
                                            object-cover
                                            object-[center_25%]
                                        "
                                    />

                                    <span
                                        className="
                                            absolute
                                            right-2
                                            top-2
                                            rounded-full
                                            bg-[#00AB96]
                                            px-3
                                            py-1
                                            text-[11px]
                                            font-bold
                                            leading-none
                                            text-white
                                            sm:text-xs
                                        "
                                    >
                                        <data.E.Text path={`team.${index}.qualification`} />
                                    </span>
                                </div>

                                {/* Card content */}
                                <div
                                    className="
                                        flex
                                        min-h-0
                                        flex-col
                                        px-3
                                        py-2
                                        text-white
                                        sm:px-4
                                    "
                                >
                                    <h3
                                        className="
                                            m-0
                                            text-[clamp(13px,1.9svh,18px)]
                                            font-bold
                                            leading-tight
                                        "
                                    >
                                        <data.E.Text path={`team.${index}.name`} />
                                    </h3>

                                    <p
                                        className="
                                            mb-0
                                            mt-1
                                            text-[clamp(11px,1.5svh,14px)]
                                            leading-tight
                                            text-[#DAE7F0]
                                        "
                                    >
                                        <data.E.Text path={`team.${index}.role`} />
                                    </p>

                                    <p
                                        className="
                                            mb-0
                                            mt-2
                                            text-[clamp(11px,1.6svh,15px)]
                                            leading-[1.25]
                                            text-white
                                        "
                                    >
                                        “<data.E.Text path={`team.${index}.quote`} />”
                                    </p>

                                    <button
                                        type="button"
                                        onClick={next}
                                        tabIndex={isActive ? 0 : -1}
                                        aria-label="Show next team member"
                                        className="
                                            mt-auto
                                            flex
                                            h-7
                                            w-7
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-[#00AB96]
                                            text-lg
                                            text-white
                                        "
                                    >
                                        <span aria-hidden="true">→</span>
                                    </button>
                                </div>
                            </motion.article>
                        );
                    })}
                </div>

                {/* ================= MOBILE NAVIGATION ================= */}

                <div className="flex items-center justify-center gap-3">
                    <button
                        type="button"
                        onClick={previous}
                        aria-label="Previous team member"
                        className="
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-full
                            bg-[#104463]
                            text-xl
                            text-white
                            transition-transform
                            active:scale-95
                        "
                    >
                        <span aria-hidden="true">←</span>
                    </button>

                    <button
                        type="button"
                        onClick={next}
                        aria-label="Next team member"
                        className="
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-full
                            bg-[#00AB96]
                            text-xl
                            text-white
                            transition-transform
                            active:scale-95
                        "
                    >
                        <span aria-hidden="true">→</span>
                    </button>
                </div>

                {/* ================= MOBILE FEATURES ================= */}

                <div className="grid grid-cols-3 px-3">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`
                                flex
                                min-w-0
                                flex-col
                                items-center
                                px-1
                                text-center
                                ${index < features.length - 1
                                    ? "border-r border-[#26617B]"
                                    : ""
                                }
                            `}
                        >
                            <span
                                aria-hidden="true"
                                className="
                                    mb-1.5
                                    flex
                                    h-[clamp(32px,4.5svh,44px)]
                                    w-[clamp(32px,4.5svh,44px)]
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-[#104463]
                                    text-lg
                                "
                            >
                                {feature.icon}
                            </span>

                            <p
                                className="
                                    m-0
                                    text-[clamp(11px,2.7vw,14px)]
                                    font-bold
                                    leading-tight
                                    text-white
                                "
                            >
                                <data.E.Text path={`features.${index}.title`} />
                            </p>

                            <p
                                className="
                                    mb-0
                                    mt-1
                                    text-[clamp(11px,2.7vw,14px)]
                                    leading-tight
                                    text-[#DCE7EF]
                                "
                            >
                                <data.E.Text path={`features.${index}.text`} />
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
/* =========================================
   DESKTOP COMPONENT
   Original layout and automatic rotation
========================================== */

function DesktopMeetTeam({ data }) {
    // Fit the carousel to its stage: centre card in the middle, side cards
    // (scaled to 0.78 → 234px wide) inside the stage at any width.
    const stageRef = useRef(null);
    const [stageWidth, setStageWidth] = useState(740);
    useEffect(() => {
        const el = stageRef.current;
        if (!el || typeof ResizeObserver === "undefined") return undefined;
        const observer = new ResizeObserver(([entry]) => setStageWidth(entry.contentRect.width));
        observer.observe(el);
        return () => observer.disconnect();
    }, []);
    const stageLeft = Math.max(0, (stageWidth - 300) / 2);
    const spread = Math.round(Math.min(220, Math.max(90, stageWidth / 2 - 125)));
    const { team } = data;
    const features = data.features;
    const [active, setActive] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActive((current) => (current + 1) % team.length);
        }, 4000);

        return () => clearInterval(timer);
    }, [team.length]);

    const next = () => {
        setActive((current) => (current + 1) % team.length);
    };

    const previous = () => {
        setActive(
            (current) => (current - 1 + team.length) % team.length
        );
    };

    const getPosition = (index) => {
        const difference =
            (index - active + team.length) % team.length;

        if (difference === 0) return "center";
        if (difference === 1) return "right";
        if (difference === team.length - 1) return "left";

        return "hidden";
    };

    return (
        <section
            className="
                relative
                hidden
                h-[720px]
                items-center
                overflow-hidden
                bg-[#032B4A]
                lg:flex
            "
        >
            {data.editButton}

            {/* Desktop background circle */}
            <div
                className="
                    absolute
                    right-[80px]
                    top-[50px]
                    h-[600px]
                    w-[600px]
                    rounded-full
                    border
                    border-[#164766]
                "
            >
                <div
                    className="
                        absolute
                        inset-0
                        rotate-[35deg]
                        rounded-full
                        border-t
                        border-[#FF6B4A]
                    "
                />
            </div>

            <div
                className="
                    mx-auto
                    grid
                    w-full
                    max-w-[1400px]
                    grid-cols-[40%_60%]
                    items-center
                    px-10
                "
            >
                {/* Desktop text */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <p
                        className="
                            text-sm
                            font-bold
                            uppercase
                            tracking-[7px]
                            text-[#0F9E86]
                        "
                    >
                        <data.E.Text path="eyebrow" />
                    </p>

                    <h2
                        className="
                            mt-6
                            font-serif
                            text-[62px]
                            font-bold
                            leading-[1.05]
                            text-white
                        "
                    >
                        <data.E.Text path="titleLine1" />
                        <br />
                        <data.E.Text path="titleLine2" />
                        <span className="text-[#FF6B4A]">
                            <br />
                            <data.E.Text path="titleHighlight" />
                        </span>
                    </h2>

                    <p
                        className="
                            mt-6
                            max-w-[470px]
                            text-lg
                            leading-8
                            text-gray-200
                        "
                    >
                        <data.E.Text path="description" />
                    </p>

                    <Link
                href={data.buttonHref}
                        className="inline-block 
                            mt-8
                            rounded-xl
                            bg-[#FF6B4A]
                            px-9
                            py-4
                            text-lg
                            font-semibold
                            text-white
                        "
                    >
                        <data.E.Text path="buttonText" /><data.E.Link path="buttonHref" /> →
                    </Link>

                    <div className="mt-10 flex gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="relative flex items-center gap-3"
                            >
                                <data.E.Item path="features" index={index} />
                                <div
                                    className="
                                        flex
                                        h-12
                                        w-12
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-[#104463]
                                    "
                                >
                                    {feature.icon}
                                </div>

                                <div className="text-sm text-white">
                                    <p className="font-bold">
                                        <data.E.Text path={`features.${index}.title`} />
                                    </p>
                                    <p className="text-gray-300">
                                        <data.E.Text path={`features.${index}.text`} />
                                    </p>
                                </div>
                            </div>
                        ))}
                        <data.E.Add path="features" label="Add feature" />
                    </div>
                </motion.div>

                {/* Desktop carousel: cards are centred and spaced to fit the
                    stage, so side cards never leave the screen on laptops. */}
                <div ref={stageRef} id="team-members" className="relative h-[560px] scroll-mt-28">
                    <div
                        className="
                            absolute
                            right-0
                            top-[-20px]
                            font-serif
                            text-3xl
                            italic
                            text-gray-300
                        "
                    >
                        <data.E.Text path="taglineLine1" />
                        <br />
                        <data.E.Text path="taglineLine2" />

                        <div className="mt-2 h-[2px] w-36 bg-[#0F9E86]" />
                    </div>

                    {team.map((member, index) => {
                        const position = getPosition(index);

                        const animation =
                            position === "center"
                                ? {
                                    x: 0,
                                    scale: 1,
                                    opacity: 1,
                                    zIndex: 30,
                                }
                                : position === "left"
                                    ? {
                                        x: -spread,
                                        scale: 0.78,
                                        opacity: 0.55,
                                        zIndex: 10,
                                    }
                                    : position === "right"
                                        ? {
                                            x: spread,
                                            scale: 0.78,
                                            opacity: 0.55,
                                            zIndex: 10,
                                        }
                                        : {
                                            x: 0,
                                            scale: 0.5,
                                            opacity: 0,
                                            zIndex: 0,
                                        };

                        return (
                            <motion.div
                                key={index}
                                animate={animation}
                                transition={{
                                    duration: 0.8,
                                    ease: "easeInOut",
                                }}
                                style={{ left: stageLeft }}
                                className="
                                    absolute
                                    top-[100px]
                                    w-[300px]
                                    overflow-hidden
                                    rounded-[30px]
                                    bg-[#07385A]
                                    shadow-2xl
                                "
                            >
                                <data.E.Item path="team" index={index} />
                                <div className="relative h-[270px]">
                                    <data.E.Image path={`team.${index}.image`} category="team" />
                                    <Image
                                        src={member.image}
                                        fill
                                        sizes="300px"
                                        alt={member.name}
                                        className="object-cover"
                                    />

                                    <div
                                        className="
                                            absolute
                                            right-4
                                            top-4
                                            rounded-full
                                            bg-[#0F9E86]
                                            px-4
                                            py-1
                                            text-sm
                                            font-bold
                                            text-white
                                        "
                                    >
                                        <data.E.Text path={`team.${index}.qualification`} />
                                    </div>
                                </div>

                                <div className="p-5 text-white">
                                    <h3 className="text-xl font-bold">
                                        <data.E.Text path={`team.${index}.name`} />
                                    </h3>

                                    <p className="text-sm text-gray-300">
                                        <data.E.Text path={`team.${index}.role`} />
                                    </p>

                                    <p className="mt-4 text-sm leading-6">
                                        “<data.E.Text path={`team.${index}.quote`} />”
                                    </p>

                                    <div
                                        className="
                                            mt-4
                                            flex
                                            h-10
                                            w-10
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-[#0F9E86]
                                        "
                                    >
                                        →
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                    <data.E.Add path="team" label="Add team member" />

                    {/* Desktop dots */}
                    <div className="absolute bottom-6 left-[250px] flex gap-3">
                        {team.map((member, index) => (
                            <button
                                type="button"
                                key={index}
                                aria-label={`Show ${member.name}`}
                                onClick={() => setActive(index)}
                                className={`
                                    h-3 w-3 rounded-full
                                    ${active === index
                                        ? "bg-[#0F9E86]"
                                        : "bg-gray-400"
                                    }
                                `}
                            />
                        ))}
                    </div>

                    {/* Desktop arrows */}
                    <div className="absolute bottom-6 right-0 flex gap-4">
                        <button
                            type="button"
                            onClick={previous}
                            aria-label="Previous team member"
                            className="
                                h-14 w-14 rounded-full
                                bg-[#104463] text-2xl text-white
                            "
                        >
                            ←
                        </button>

                        <button
                            type="button"
                            onClick={next}
                            aria-label="Next team member"
                            className="
                                h-14 w-14 rounded-full
                                bg-[#104463] text-2xl text-white
                            "
                        >
                            →
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* =========================================
   PAGE EXPORT
========================================== */

export default function MeetTeam() {
    const { data, E, editButton, hidden } = useCms("about-team", defaults, {
        label: "Our team",
        fields,
    });

    const content = {
        ...data,
        team: data.team.map((member) => ({ ...member, image: mediaUrl(member.image) })),
        editButton,
        E,
    };

    if (!content.team.length) return null;

    // Hidden by an admin: nothing is rendered for visitors.
    if (hidden) return null;

    return (
        <div id="our-team" className="scroll-mt-16">
            <MobileMeetTeam data={content} />
            <DesktopMeetTeam data={content} />
        </div>
    );
}