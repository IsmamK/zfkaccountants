"use client";

import Link from "next/link";

import {
    FaComments,
    FaFileLines,
    FaGear,
    FaCheck,
    FaArrowRight,
} from "react-icons/fa6";

import { useCms } from "@/components/cms/useCms";

const ICONS = {
    chat: FaComments,
    document: FaFileLines,
    gear: FaGear,
    check: FaCheck,
};

const defaultSteps = [
    {
        number: "01",
        title: "Book",
        mobileText: "Book a free video consultation at a time that suits you.",
        text: "Book a free, no-obligation video consultation at a time that suits you. It only takes a minute.",
        icon: "chat",
    },
    {
        number: "02",
        title: "Get a Quote",
        mobileText: "Receive a clear quote tailored to your business.",
        text: "After the call you receive a clear quote, tailored to exactly what your business needs.",
        icon: "document",
    },
    {
        number: "03",
        title: "Onboard Online",
        mobileText: "We set you up online and connect to your records.",
        text: "We get you set up online, handle the paperwork and connect securely to your records.",
        icon: "gear",
    },
    {
        number: "04",
        title: "We Handle It",
        mobileText: "VAT, payroll, accounts and tax returns, done on time.",
        text: "Your VAT, payroll, accounts and tax returns are handled accurately and on time, all year round.",
        icon: "check",
    },
];

const defaults = {
    eyebrow: "Our Process",
    titleLine1: "A simple",
    titleLine2: "process,",
    titleHighlight: "built around you.",
    description:
        "We make accounting and compliance easy, transparent and stress-free, and entirely online, so you can focus on running your business.",
    buttonText: "Book a Free Consultation",
    buttonHref: "/contact",
    points: [
        "Free, no-obligation consultation",
        "Dedicated UK support",
        "Compliance you can trust",
    ],
    steps: defaultSteps,
};

const fields = {
    "steps[].icon": { type: "select", options: Object.keys(ICONS) },
    "steps[].mobileText": { label: "Text (mobile)" },
    "steps[].text": { label: "Text (desktop)" },
    points: { label: "Checklist (desktop)" },
};

export default function Process() {
    const { data, E, editButton, hidden } = useCms("home-process", defaults, {
        label: "Process",
        fields,
    });

    const steps = data.steps.map((step) => ({ ...step, icon: ICONS[step.icon] || FaCheck }));

    // Hidden by an admin: nothing is rendered for visitors.
    if (hidden) return null;

    return (
        <>
            {/* ================= MOBILE AND TABLET ONLY ================= */}

            {/* ================= MOBILE AND TABLET ONLY ================= */}

            <section
                className="
        relative isolate
        h-[calc(var(--ae-svh)-56px)]
        overflow-hidden
        bg-gradient-to-br
        from-[#031b31] via-[#062b49] to-[#03172a]
        lg:hidden
    "
            >
            {editButton}

                {/* Background decorations */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-32 -top-28 h-[300px] w-[300px] rounded-full bg-[#0b466a]/40 blur-3xl"
                />

                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-32 -right-28 h-[300px] w-[300px] rounded-full bg-[#0F9E86]/15 blur-3xl"
                />

                <div
                    className="
            relative z-10 mx-auto
            grid h-full w-full max-w-[760px]
            grid-rows-[auto_minmax(0,1fr)_auto]
            px-[clamp(14px,4vw,32px)]
            pb-[clamp(4px,0.8svh,10px)]
            pt-[clamp(7px,1.2svh,14px)]
        "
                >
                    {/* Heading — unchanged */}
                    <div className="mt-8 shrink-0">
                        <p
                            className="
                    text-[clamp(12px,1.55svh,16px)]
                    font-bold uppercase tracking-[0.32em]
                    text-[#18bca5]
                "
                        >
                            <E.Text path="eyebrow" />
                        </p>

                        <h2
                            className="
                    mt-[clamp(4px,0.65svh,7px)]
                    font-serif text-[clamp(32px,4.9svh,50px)]
                    font-bold leading-[1] tracking-[-0.025em]
                    text-white
                "
                        >
                            <E.Text path="titleLine1" /> <E.Text path="titleLine2" />
                            <br />
                            <span className="text-[#FF6B4A]">
                                <E.Text path="titleHighlight" />
                            </span>
                        </h2>

                        <p
                            className="
                    mt-[clamp(7px,0.95svh,10px)]
                    max-w-[680px]
                    text-[clamp(14px,1.9svh,20px)]
                    font-semibold leading-[1.35]
                    text-[#E0EAF3]
                "
                        >
                            <E.Text path="description" />
                        </p>
                    </div>

                    {/* Middle process area */}
                    <div
                        className="
                relative flex min-h-0 w-full items-center
                py-[clamp(4px,0.8svh,10px)]
            "
                    >
                        <div
                            className="
                    relative -mt-10 grid w-full grid-cols-1
                    [--icon-size:clamp(36px,5.5svh,48px)]
                    [--step-gap:clamp(8px,1svh,12px)]
                    gap-y-[var(--step-gap)]
                "
                        >
                            {steps.map((step, index) => {
                                const Icon = step.icon;

                                return (
                                    <div
                                        key={index}
                                        className="
                                relative grid
                                grid-cols-[var(--icon-size)_minmax(0,1fr)]
                                items-center gap-x-2
                            "
                                    >
                                        <E.Item path="steps" index={index} />
                                        {/* Connect icon centres, stopping at last icon */}
                                        {index < steps.length - 1 && (
                                            <div
                                                aria-hidden="true"
                                                className="
                                        pointer-events-none
                                        absolute
                                        left-[calc(var(--icon-size)/2)]
                                        top-1/2
                                        h-[calc(100%+var(--step-gap))]
                                        w-[2px] -translate-x-1/2
                                        bg-[#12ab96]
                                    "
                                            />
                                        )}

                                        {/* Icon — separate from the card */}
                                        <div
                                            className="
                                    relative z-10 flex
                                    h-[var(--icon-size)]
                                    w-[var(--icon-size)]
                                    items-center justify-center
                                    rounded-full
                                    border-[clamp(3px,0.5svh,4px)]
                                    border-[#EAF6FC]
                                    bg-white text-[#0FA58A]
                                    shadow-[0_5px_14px_rgba(0,0,0,0.18)]
                                "
                                        >
                                            <Icon
                                                aria-hidden="true"
                                                className="text-[clamp(14px,1.9svh,20px)]"
                                            />
                                        </div>

                                        {/* Card — original height and shape */}
                                        <div
                                            className="
                                    group relative flex
                                    h-[clamp(64px,9svh,86px)]
                                    min-w-0
                                    items-center justify-between gap-2
                                    overflow-hidden
                                    rounded-[clamp(13px,1.9svh,19px)]
                                    bg-white
                                    px-[clamp(11px,3vw,18px)]
                                    py-[clamp(5px,0.7svh,8px)]
                                    shadow-[0_7px_20px_rgba(0,0,0,0.15)]
                                "
                                        >
                                            <div className="min-w-0">
                                                <p
                                                    className="
                                            text-[clamp(11px,1.1svh,11px)]
                                            font-extrabold leading-none
                                            text-[#0FA58A]
                                        "
                                                >
                                                    <E.Text path={`steps.${index}.number`} />
                                                </p>

                                                <h3
                                                    className="
                                            mt-[clamp(1px,0.2svh,2px)]
                                            font-serif
                                            text-[clamp(16px,2.1svh,22px)]
                                            font-bold leading-none
                                            text-[#123A5C]
                                        "
                                                >
                                                    <E.Text path={`steps.${index}.title`} />
                                                </h3>

                                                <p
                                                    className="
                                            mt-[clamp(2px,0.3svh,3px)]
                                            line-clamp-2
                                            text-[clamp(11px,1.3svh,13px)]
                                            leading-[1.2]
                                            text-[#526D86]
                                        "
                                                >
                                                    <E.Text path={`steps.${index}.mobileText`} />
                                                </p>
                                            </div>

                                            <FaArrowRight
                                                aria-hidden="true"
                                                className="
                                        shrink-0
                                        text-[clamp(12px,1.6svh,17px)]
                                        text-[#123A5C]
                                        transition-transform duration-300
                                        group-hover:translate-x-1
                                    "
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                            <E.Add path="steps" label="Add step" />
                        </div>
                    </div>

                    {/* CTA — original placement */}
                    <div className="mb-10">
                        <Link
                            href={data.buttonHref}
                            className="
                    flex h-[clamp(44px,6.5svh,56px)]
                    items-center justify-center gap-3
                    rounded-[clamp(13px,1.9svh,20px)]
                    bg-[#FF6245] px-6
                    text-[clamp(13px,1.7svh,17px)]
                    font-bold text-white
                    shadow-[0_10px_24px_rgba(255,98,69,0.28)]
                    transition active:scale-[0.98]
                "
                        >
                            <E.Text path="buttonText" /><E.Link path="buttonHref" />
                            <FaArrowRight
                                aria-hidden="true"
                                className="text-[clamp(12px,1.6svh,15px)]"
                            />
                        </Link>
                    </div>
                </div>
            </section>
            {/* ================= DESKTOP ONLY ================= */}

            <section
                className="
                relative
                hidden
                h-[700px]
                overflow-hidden
                bg-gradient-to-br
                from-[#06182F]
                via-[#082B4B]
                to-[#06172D]
                lg:block
                "
            >
            {editButton}

                {/* Background glow */}

                <div
                    className="
                    absolute
                    -left-[220px]
                    -top-[180px]
                    h-[500px]
                    w-[500px]
                    rounded-full
                    bg-[#123A5C]
                    opacity-40
                    blur-3xl
                    "
                />

                <div
                    className="
                    absolute
                    bottom-[-180px]
                    right-[-180px]
                    h-[450px]
                    w-[450px]
                    rounded-full
                    bg-[#0F9E86]
                    opacity-10
                    blur-3xl
                    "
                />

                {/* Bottom curve */}

                <div
                    className="
                    absolute
                    bottom-0
                    left-0
                    h-[120px]
                    w-full
                    rounded-t-[50%]
                    bg-[#082341]
                    opacity-40
                    "
                />

                <div
                    className="
                    relative
                    mx-auto
                    grid
                    h-full
                    max-w-[1400px]
                    grid-cols-2
                    px-10
                    "
                >
                    {/* Left content */}

                    <div className="flex flex-col justify-center">
                        <p
                            className="
                            text-xs
                            font-semibold
                            uppercase
                            tracking-[0.35em]
                            text-[#0F9E86]
                            "
                        >
                            <E.Text path="eyebrow" />
                        </p>

                        <h2
                            className="
                            mt-4
                            max-w-[450px]
                            font-serif
                            text-[48px]
                            font-bold
                            leading-[1.05]
                            text-white
                            "
                        >
                            <E.Text path="titleLine1" />
                            <br />
                            <E.Text path="titleLine2" />
                            <br />

                            <span className="text-[#FF6B4A]">
                                <E.Text path="titleHighlight" />
                            </span>
                        </h2>

                        <p
                            className="
                            mt-5
                            max-w-[430px]
                            text-[16px]
                            leading-7
                            text-[#D9E4EF]
                            "
                        >
                            <E.Text path="description" />
                        </p>

                        <Link
                            href={data.buttonHref}
                            className="
                            mt-6
                            flex
                            w-fit
                            items-center
                            gap-3
                            rounded-xl
                            bg-[#FF6B4A]
                            px-7
                            py-3.5
                            font-semibold
                            text-white
                            transition
                            hover:-translate-y-1
                            "
                        >
                            <E.Text path="buttonText" /><E.Link path="buttonHref" />
                            <FaArrowRight />
                        </Link>

                        <div className="mt-6 space-y-3">
                            {data.points.map((item, index) => (
                                <div
                                    key={index}
                                    className="relative 
                                    flex
                                    items-center
                                    gap-4
                                    text-white
                                    "
                                >
                                    <E.Item path="points" index={index} />
                                    <span
                                        className="
                                        flex
                                        h-8
                                        w-8
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-[#0F9E86]
                                        text-sm
                                        "
                                    >
                                        ✓
                                    </span>

                                    <E.Text path={`points.${index}`} />
                                </div>
                            ))}
                            <E.Add path="points" label="Add point" />
                        </div>
                    </div>

                    {/* Right process */}

                    <div className="relative flex items-center">
                        {/* Timeline */}

                        <div
                            className="
                            absolute
                            bottom-[40px]
                            left-[25px]
                            top-[40px]
                            w-[2px]
                            bg-[#0F9E86]/40
                            "
                        />

                        {/* Icons */}

                        <div
                            className="
                            absolute
                            bottom-[40px]
                            left-[-7px]
                            top-[40px]
                            flex
                            flex-col
                            justify-between
                            "
                        >
                            {steps.map((step, index) => {
                                const Icon = step.icon;

                                return (
                                    <div
                                        key={index}
                                        className="
                                        z-10
                                        flex
                                        h-[64px]
                                        w-[64px]
                                        items-center
                                        justify-center
                                        rounded-full
                                        border-[7px]
                                        border-[#EDF7FF]
                                        bg-white
                                        text-[#0F9E86]
                                        shadow-xl
                                        "
                                    >
                                        <Icon size={21} />
                                    </div>
                                );
                            })}
                        </div>

                        {/* Cards */}

                        <div
                            className="
                            ml-20
                            flex
                            w-full
                            flex-col
                            gap-3
                            "
                        >
                            {steps.map((step, index) => (
                                <div
                                    key={index}
                                    className="relative 
                                    group
                                    rounded-[24px]
                                    bg-white
                                    px-8
                                    py-4
                                    shadow-[0_20px_50px_rgba(0,0,0,.12)]
                                    transition
                                    hover:-translate-y-2
                                    "
                                >
                                    <E.Item path="steps" index={index} />
                                    <div className="flex justify-between">
                                        <div>
                                            <p
                                                className="
                                                text-xs
                                                font-bold
                                                text-[#0F9E86]
                                                "
                                            >
                                                <E.Text path={`steps.${index}.number`} />
                                            </p>

                                            <h3
                                                className="
                                                mt-1
                                                font-serif
                                                text-[24px]
                                                font-bold
                                                text-[#123A5C]
                                                "
                                            >
                                                <E.Text path={`steps.${index}.title`} />
                                            </h3>
                                        </div>

                                        <FaArrowRight
                                            className="
                                            mt-4
                                            text-[#123A5C]
                                            transition
                                            group-hover:translate-x-2
                                            "
                                        />
                                    </div>

                                    <p
                                        className="
                                        mt-1
                                        text-[14px]
                                        leading-5
                                        text-[#475569]
                                        "
                                    >
                                        <E.Text path={`steps.${index}.text`} />
                                    </p>
                                </div>
                            ))}
                            <E.Add path="steps" label="Add step" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}