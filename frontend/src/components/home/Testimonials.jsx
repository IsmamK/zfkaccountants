"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
    FaArrowLeft,
    FaArrowRight,
    FaStar,
} from "react-icons/fa6";

import { useCms } from "@/components/cms/useCms";
import { mediaUrl } from "@/lib/api";

const AUTO_PLAY_DELAY = 3000;

const defaultTestimonials = [
    {
        name: "Sophie Ahmed",
        role: "Founder",
        company: "Glow Beauty Studio",
        image: "/images/home/testimonials/sarah.jpg",

        text: "Friendly, professional and incredibly knowledgeable. They sorted out our VAT returns and gave us clear advice whenever we had questions.",
    },
    {
        name: "James Carter",
        role: "Director",
        company: "Carter Construction Ltd",
        image: "/images/home/testimonials/james.png",
        text: "ZFK Accountants have been brilliant from day one. They handle our annual accounts quickly and always keep us updated.",
    },
    {
        name: "Michael Reeves",
        role: "Sole Trader",
        company: "MJR Electrical",
        image: "/images/home/testimonials/male.png",
        text: "I've been using ZFK Accountants for my self-assessment for years. They make the whole process simple and stress free.",
    },
];

const defaults = {
    // Hidden until real client reviews replace the placeholders below
    // (Site tools: "Hidden · Show" on this block).
    _hidden: true,
    eyebrow: "Testimonials",
    titleLine1: "Trusted by",
    titleLine2: "businesses",
    titleHighlight: "like yours",
    mobileDescription:
        "We're proud to support business owners, contractors and individuals across the UK.",
    description:
        "We're proud to support business owners, contractors and individuals across the UK. Here's what our clients say about working with ZFK Accountants.",
    buttonText: "Book a Free Consultation",
    buttonHref: "/contact",
    testimonials: defaultTestimonials,
};

const fields = {
    "testimonials[].image": { label: "Photo", category: "testimonials" },
};

function useTestimonialCarousel(count) {
    const [active, setActive] = useState(0);

    useEffect(() => {
        if (count < 2) return undefined;
        const timer = window.setInterval(() => {
            setActive((current) => (current + 1) % count);
        }, AUTO_PLAY_DELAY);

        return () => window.clearInterval(timer);
    }, [count]);

    const previous = () => {
        setActive(
            (current) => (current - 1 + count) % count,
        );
    };

    const next = () => {
        setActive((current) => (current + 1) % count);
    };

    return { active, setActive, previous, next };
}

function getCardPosition(index, active, mobile, count) {
    const offset = (index - active + count) % count;

    if (offset === 0) {
        return {
            opacity: 1,
            zIndex: 30,
            transform: "translateX(-50%) translateY(0) scale(1) rotate(0deg)",
        };
    }

    if (offset === 1) {
        return {
            opacity: mobile ? 0.68 : 0.65,
            zIndex: 10,
            transform: mobile
                ? "translateX(-27%) translateY(20px) scale(0.86) rotate(7deg)"
                : "translateX(-30%) translateY(45px) scale(0.8) rotate(9deg)",
        };
    }

    return {
        opacity: mobile ? 0.68 : 0.65,
        zIndex: 10,
        transform: mobile
            ? "translateX(-73%) translateY(20px) scale(0.86) rotate(-7deg)"
            : "translateX(-70%) translateY(45px) scale(0.8) rotate(-9deg)",
    };
}

export default function Testimonials() {
    const { data, E, editButton, hidden, editMode } = useCms("home-testimonials", defaults, {
        label: "Testimonials",
        fields,
    });

    const content = {
        ...data,
        testimonials: data.testimonials.map((item) => ({ ...item, image: mediaUrl(item.image) })),
        editButton,
        E,
        editMode,
    };

    if (!content.testimonials.length) return null;

    // Hidden by an admin: nothing is rendered for visitors.
    if (hidden) return null;

    return (
        <>
            <MobileTestimonials data={content} />
            <DesktopTestimonials data={content} />
        </>
    );
}

function MobileTestimonials({ data }) {
    const { testimonials } = data;
    const { active, setActive, previous, next } = useTestimonialCarousel(testimonials.length);

    return (
        <section className="relative isolate h-[calc(var(--ae-svh)-56px)] min-h-0 overflow-hidden bg-[#F9FCFD] lg:hidden">
            {data.editButton}

            {/* Background glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-[40%] h-[55%] w-[120%] -translate-x-1/2 rounded-full bg-[#DDF2F2]/70 blur-[75px]"
            />

            <div className="relative z-10 mx-auto flex h-full w-full max-w-[760px] flex-col justify-between px-4 py-[clamp(8px,1.5svh,16px)] sm:px-8">
                {/* Heading */}
                <div className="shrink-0 text-center">
                    <p className="text-[clamp(11px,1.35svh,13px)] font-bold uppercase tracking-[0.35em] text-[#0F9E86]">
                        <data.E.Text path="eyebrow" />
                    </p>

                    <h2 className="mt-[clamp(4px,0.8svh,8px)] font-serif text-[clamp(28px,4.3svh,41px)] font-bold leading-[1.02] tracking-[-0.025em] text-[#123A5C]">
                        <data.E.Text path="titleLine1" />

                        <span className="block">
                            <data.E.Text path="titleLine2" />{" "}
                            <span className="text-[#FF6245]">
                                <data.E.Text path="titleHighlight" />
                            </span>
                        </span>
                    </h2>

                    <p className="mx-auto mt-[clamp(5px,0.9svh,9px)] max-w-[520px] text-[clamp(14px,2svh,18px)] leading-[1.4] text-[#536B87]">
                        <data.E.Text path="mobileDescription" />
                    </p>
                </div>

                {/* Testimonial cards */}
                <div
                    className="relative isolate mx-auto h-[clamp(245px,37svh,335px)] w-full shrink-0"
                    role="region"
                    aria-roledescription="carousel"
                    aria-label="Client testimonials"
                >
                    {/* Shadow behind cards */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute left-1/2 top-[43%] h-[70%] w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#123A5C]/10 blur-[42px]"
                    />

                    {testimonials.map((item, index) => (
                        <div
                            key={index}
                            className={`${data.editMode && index === active ? "pointer-events-auto" : "pointer-events-none"}

                                absolute
                                left-1/2
                                top-0
                                h-[calc(100%-25px)]
                                w-[70%]
                                max-w-[310px]
                                origin-center
                                transition-[transform,opacity]
                                duration-700
                                ease-[cubic-bezier(0.45,0,0.2,1)]
                                motion-reduce:duration-0
                            `}
                            style={getCardPosition(index, active, true, testimonials.length)}
                            aria-hidden={index !== active}
                        >
                            {index === active ? <data.E.Item path="testimonials" index={index} /> : null}
                            <MobileTestimonialCard
                                item={item}
                                active={index === active}
                                E={data.E}
                                index={index}
                            />
                        </div>
                    ))}
                    <data.E.Add path="testimonials" label="Add review" />

                    {/* Previous button */}
                    <button
                        type="button"
                        onClick={previous}
                        aria-label="Previous testimonial"
                        className="
                            absolute
                            left-0
                            top-[43%]
                            z-40
                            flex
                            h-[clamp(36px,5.2svh,45px)]
                            w-[clamp(36px,5.2svh,45px)]
                            -translate-y-1/2
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-[#E2EBF0]
                            bg-white
                            text-[#123A5C]
                            shadow-[0_9px_24px_rgba(18,58,92,0.18)]
                            transition
                            active:scale-95
                        "
                    >
                        <FaArrowLeft className="text-[13px]" />
                    </button>

                    {/* Next button */}
                    <button
                        type="button"
                        onClick={next}
                        aria-label="Next testimonial"
                        className="
                            absolute
                            right-0
                            top-[43%]
                            z-40
                            flex
                            h-[clamp(36px,5.2svh,45px)]
                            w-[clamp(36px,5.2svh,45px)]
                            -translate-y-1/2
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-[#E2EBF0]
                            bg-white
                            text-[#123A5C]
                            shadow-[0_9px_24px_rgba(18,58,92,0.18)]
                            transition
                            active:scale-95
                        "
                    >
                        <FaArrowRight className="text-[13px]" />
                    </button>

                    {/* Pagination dots */}
                    <div className="absolute bottom-0 left-0 right-0 z-40 flex items-center justify-center gap-3">
                        {testimonials.map((item, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => setActive(index)}
                                aria-label={`Show testimonial ${index + 1}`}
                                className={`h-[clamp(8px,1.3svh,11px)] w-[clamp(8px,1.3svh,11px)] rounded-full transition-colors duration-300 ${index === active
                                    ? "bg-[#0F9E86]"
                                    : "bg-[#A9BBC8]"
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <Link
                    href={data.buttonHref}
                    className="flex h-[clamp(40px,5.8svh,50px)] shrink-0 items-center justify-center gap-4 rounded-[clamp(14px,2.1svh,19px)] bg-[#FF6245] px-6 text-[clamp(14px,1.9svh,17px)] font-bold text-white shadow-[0_12px_28px_rgba(255,98,69,0.24)] transition active:scale-[0.98]"
                >
                    <data.E.Text path="buttonText" /><data.E.Link path="buttonHref" />
                    <FaArrowRight />
                </Link>
            </div>
        </section>
    );
}

function MobileTestimonialCard({ item, active, E, index }) {
    return (
        <article
            className={`relative h-full overflow-hidden rounded-[clamp(18px,2.6svh,23px)] border px-[clamp(11px,3vw,18px)] py-[clamp(10px,1.5svh,14px)] shadow-[0_16px_40px_rgba(18,58,92,0.18)] transition-colors duration-700 ${active
                ? "border-[#0A527C]"
                : "border-[#E3EBF0]"
                }`}
        >
            {/* White inactive background */}
            <div className="absolute inset-0 bg-white" />

            {/* Navy active background */}
            <div
                className={`absolute inset-0 bg-gradient-to-br from-[#07517A] via-[#06466D] to-[#063452] transition-opacity duration-700 ${active ? "opacity-100" : "opacity-0"
                    }`}
            />

            <div className="relative z-10 flex h-full flex-col items-center text-center">
                {/* Client image */}
                <E.Image path={`testimonials.${index}.image`} category="testimonials" />
                    <Image
                    src={item.image}
                    width={62}
                    height={62}
                    alt={`${item.name} testimonial`}
                    className="h-[clamp(46px,6.2svh,58px)] w-[clamp(46px,6.2svh,58px)] shrink-0 rounded-full border-[3px] border-white object-cover shadow-md"
                />

                {/* Client name */}
                <h3
                    className={`mt-[clamp(4px,0.7svh,7px)] text-[clamp(17px,2.35svh,22px)] font-bold leading-none transition-colors duration-700 ${active
                        ? "text-white"
                        : "text-[#123A5C]"
                        }`}
                >
                    <E.Text path={`testimonials.${index}.name`} />
                </h3>

                {/* Role and company */}
                <p
                    className={`mt-[clamp(3px,0.5svh,5px)] text-[clamp(11px,1.45svh,14px)] font-medium leading-[1.25] transition-colors duration-700 ${active
                        ? "text-[#D6E5EE]"
                        : "text-[#64748B]"
                        }`}
                >
                    <E.Text path={`testimonials.${index}.role`} />,
                    <br />
                    <E.Text path={`testimonials.${index}.company`} />
                </p>

                {/* Rating */}
                <div
                    className="mt-[clamp(4px,0.7svh,7px)] flex gap-[3px] text-[#FF6245]"
                    role="img"
                    aria-label="5 out of 5 stars"
                >
                    {[1, 2, 3, 4, 5].map((star, index) => (
                        <FaStar
                            key={index}
                            className="text-[clamp(12px,1.75svh,16px)]"
                            aria-hidden="true"
                        />
                    ))}
                </div>

                {/* Testimonial text */}
                <p
                    className={`mt-[clamp(5px,0.8svh,8px)] line-clamp-5 text-[clamp(11px,1.6svh,15px)] font-medium leading-[1.35] transition-colors duration-700 ${active
                        ? "text-white"
                        : "text-[#64748B]"
                        }`}
                >
                    &ldquo;<E.Text path={`testimonials.${index}.text`} multiline />&rdquo;
                </p>
            </div>
        </article>
    );
}

function DesktopTestimonials({ data }) {
    const { testimonials } = data;
    const { active, previous, next } = useTestimonialCarousel(testimonials.length);

    return (
        <section className="relative hidden overflow-hidden bg-white py-16 lg:block xl:h-[700px] xl:py-0">
            {data.editButton}

            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E9F5F4] opacity-40 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-[300px] -left-[200px] h-[520px] w-[700px] rounded-full bg-[#F3FAF9] blur-3xl" />

            <div className="relative mx-auto flex h-full max-w-[1450px] items-center px-6 sm:px-8">
                <div className="grid w-full grid-cols-1 items-center gap-12 xl:grid-cols-[340px_minmax(0,1fr)] xl:gap-10">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#0F9E86]">
                            <data.E.Text path="eyebrow" />
                        </p>

                        <h2 className="mt-5 font-serif text-[40px] font-bold leading-[1.15] text-[#123A5C] sm:text-[46px]">
                            <data.E.Text path="titleLine1" />
                            <br />
                            <data.E.Text path="titleLine2" /> <span className="text-[#FF6B4A]">{data.titleHighlight.split(" ")[0]}</span>
                            <br />
                            <span className="text-[#FF6B4A]">{data.titleHighlight.split(" ").slice(1).join(" ")}</span>
                        </h2>

                        <p className="mt-5 max-w-[360px] text-[15px] leading-7  text-[#475569]">
                            <data.E.Text path="description" />
                        </p>

                        <Link
                            href={data.buttonHref}
                            className="mt-7 flex w-fit items-center gap-4 rounded-xl bg-[#FF6B4A] px-7 py-3.5 font-semibold text-white shadow-[0_14px_35px_rgba(255,107,74,.22)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(255,107,74,.30)]"
                        >
                            <data.E.Text path="buttonText" /><data.E.Link path="buttonHref" />
                            <FaArrowRight size={14} />
                        </Link>
                    </div>

                    <div
                        className="relative isolate mx-auto h-[420px] w-full max-w-[620px]"
                        role="region"
                        aria-roledescription="carousel"
                        aria-label="Client testimonials"
                    >
                        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[330px] w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#123A5C]/10 blur-[70px]" />

                        {testimonials.map((item, index) => (
                            <div
                                key={index}
                                className={`${data.editMode && index === active ? "pointer-events-auto" : "pointer-events-none"} absolute left-1/2 top-0 w-[88%] max-w-[530px] origin-center transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.45,0,0.2,1)] motion-reduce:duration-0`}
                                style={getCardPosition(index, active, false, testimonials.length)}
                                aria-hidden={index !== active}
                            >
                                {index === active ? <data.E.Item path="testimonials" index={index} /> : null}
                                <DesktopTestimonialCard item={item} active={index === active} E={data.E} index={index} />
                            </div>
                        ))}
                        <data.E.Add path="testimonials" label="Add review" />

                        <button
                            type="button"
                            onClick={previous}
                            aria-label="Previous testimonial"
                            className="absolute -left-2 top-[43%] z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#E6EEF4] bg-white text-[#123A5C] shadow-lg transition-colors duration-300 hover:bg-[#123A5C] hover:text-white sm:-left-4 sm:h-12 sm:w-12"
                        >
                            <FaArrowLeft />
                        </button>

                        <button
                            type="button"
                            onClick={next}
                            aria-label="Next testimonial"
                            className="absolute -right-2 top-[43%] z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#E6EEF4] bg-white text-[#123A5C] shadow-lg transition-colors duration-300 hover:bg-[#123A5C] hover:text-white sm:-right-4 sm:h-12 sm:w-12"
                        >
                            <FaArrowRight />
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
}

function DesktopTestimonialCard({ item, active, E, index }) {
    return (
        <article
            className={`relative h-[350px] overflow-hidden rounded-[28px] border p-8 shadow-[0_20px_60px_rgba(18,58,92,0.14)] transition-colors duration-700 ${active ? "border-[#07385C]" : "border-[#EDF1F4]"
                }`}
        >
            <div className="absolute inset-0 bg-white" />
            <div
                className={`absolute inset-0 bg-gradient-to-br from-[#062844] via-[#07385C] to-[#062844] transition-opacity duration-700 ${active ? "opacity-100" : "opacity-0"
                    }`}
            />

            <div className="relative z-10">
                <div className="flex items-center gap-4">
                    <E.Image path={`testimonials.${index}.image`} category="testimonials" />
                        <Image
                        src={item.image}
                        width={74}
                        height={74}
                        alt={`${item.name} testimonial`}
                        className="h-[74px] w-[74px] shrink-0 rounded-full object-cover"
                    />

                    <div>
                        <h3
                            className={`text-[21px] font-bold transition-colors duration-700 ${active ? "text-white" : "text-[#123A5C]"
                                }`}
                        >
                            <E.Text path={`testimonials.${index}.name`} />
                        </h3>

                        <p
                            className={`mt-1 text-sm leading-5 transition-colors duration-700 ${active ? "text-[#C5D8E6]" : "text-[#64748B]"
                                }`}
                        >
                            <E.Text path={`testimonials.${index}.role`} />,
                            <br />
                            <E.Text path={`testimonials.${index}.company`} />
                        </p>

                        <div
                            className="mt-3 flex gap-[2px] text-[#FF6B4A]"
                            role="img"
                    aria-label="5 out of 5 stars"
                        >
                            {[1, 2, 3, 4, 5].map((star, index) => (
                                <FaStar key={index} size={15} aria-hidden="true" />
                            ))}
                        </div>
                    </div>
                </div>

                <p
                    className={`mt-6 text-[17px] leading-8 transition-colors duration-700 ${active ? "text-white" : "text-[#64748B]"
                        }`}
                >
                    &ldquo;<E.Text path={`testimonials.${index}.text`} multiline />&rdquo;
                </p>
            </div>
        </article>
    );
}
