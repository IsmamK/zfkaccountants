"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { useBlogTemplate } from "@/components/blog/blogTemplate";
import { withLinks } from "@/components/dynamic/EditableParagraphs";


export default function ArticleBody({ article }) {

    const { data: labels } = useBlogTemplate();

    if (!article?.body?.length) {
        return null;
    }


    return (

        <section
            className="
            relative
            bg-[#F4F7F6]
            py-20
            lg:py-24
            "
        >


            {/* =====================================================
                BACKGROUND DECORATION

                IMPORTANT:
                overflow-hidden is ONLY on this decorative layer.
                Do not put overflow-hidden on the whole section,
                otherwise sticky positioning can stop working.
            ===================================================== */}

            <div
                className="
                pointer-events-none
                absolute
                inset-0
                overflow-hidden
                "
            >

                <div
                    className="
                    absolute
                    -left-[220px]
                    top-[120px]
                    h-[520px]
                    w-[520px]
                    rounded-full
                    bg-[#0F9E86]/[0.055]
                    "
                />


                <div
                    className="
                    absolute
                    -right-[180px]
                    bottom-[80px]
                    h-[500px]
                    w-[500px]
                    rounded-full
                    bg-[#123A5C]/[0.045]
                    "
                />


                <div
                    className="
                    absolute
                    right-[6%]
                    top-[8%]
                    h-[160px]
                    w-[160px]
                    rounded-full
                    border
                    border-[#0F9E86]/10
                    "
                />

            </div>





            {/* =====================================================
                ARTICLE LAYOUT
            ===================================================== */}

            <div
                className="
                relative
                z-10

                max-w-[1240px]
                mx-auto

                px-6
                md:px-8
                lg:px-10

                grid
                lg:grid-cols-[minmax(0,1fr)_310px]

                gap-10
                xl:gap-14

                items-start
                "
            >



                {/* =================================================
                    LEFT — ARTICLE BODY
                ================================================= */}

                <motion.article

                    initial={{
                        opacity: 0,
                        y: 28
                    }}

                    whileInView={{
                        opacity: 1,
                        y: 0
                    }}

                    viewport={{
                        once: true,
                        amount: 0.08
                    }}

                    transition={{
                        duration: 0.65,
                        ease: "easeOut"
                    }}

                    className="
                    min-w-0

                    bg-white

                    rounded-[30px]

                    border
                    border-[#E2E6E5]

                    px-7
                    py-9

                    md:px-10
                    md:py-11

                    lg:px-12
                    lg:py-12

                    shadow-[0_24px_70px_rgba(18,58,92,0.07)]
                    "
                >


                    {/* INTRO LABEL */}

                    <div
                        className="
                        flex
                        items-center
                        gap-4
                        mb-4
                        "
                    >

                        <span
                            className="
                            text-[#0F9E86]
                            text-xs
                            font-bold
                            "
                        >
                            01
                        </span>


                        <span
                            className="
                            block
                            w-10
                            h-px
                            bg-[#0F9E86]
                            "
                        />


                        <span
                            className="
                            uppercase
                            tracking-[0.24em]
                            text-[11px]
                            font-semibold
                            text-[#667580]
                            "
                        >
                            {article.body[0]?.eyebrow || "Introduction"}
                        </span>

                    </div>




                    {/* FIRST ARTICLE SECTION */}

                    <ArticleSection
                        section={article.body[0]}
                        index={0}
                        isFirst
                    />





                    {/* =================================================
                        GOOD TO KNOW
                    ================================================= */}

                    {article.goodToKnow && (

                        <motion.div

                            whileHover={{
                                y: -3
                            }}

                            transition={{
                                duration: 0.25
                            }}

                            className="
                            my-10

                            rounded-[22px]

                            border
                            border-[#0F9E86]/10

                            bg-gradient-to-r
                            from-[#E9FAF7]
                            to-[#F4FCFB]

                            px-6
                            py-6
                            md:px-7

                            flex
                            gap-5
                            items-center
                            "
                        >


                            <div
                                className="
                                shrink-0

                                w-14
                                h-14

                                rounded-full

                                bg-[#0F9E86]/10

                                flex
                                items-center
                                justify-center

                                text-2xl
                                "
                            >
                                💡
                            </div>



                            <div>

                                <p
                                    className="
                                    text-[#0F9E86]

                                    uppercase
                                    tracking-[0.2em]

                                    text-[11px]
                                    font-bold
                                    "
                                >
                                    {labels.goodToKnowLabel}
                                </p>


                                <p
                                    className="
                                    mt-2

                                    text-[#123A5C]

                                    text-[15px]
                                    md:text-base

                                    font-medium
                                    leading-7
                                    "
                                >
                                    {article.goodToKnow}
                                </p>

                            </div>


                        </motion.div>

                    )}





                    {/* =================================================
                        REMAINING ARTICLE CONTENT
                    ================================================= */}

                    <div>

                        {article.body.slice(1).map((section, index) => (

                            <ArticleSection
                                key={section.id}
                                section={section}
                                index={index + 1}
                            />

                        ))}

                    </div>


                </motion.article>





                {/* =================================================
                    RIGHT — STICKY ARTICLE GUIDE

                    IMPORTANT:
                    aside itself is sticky.
                    Animation is placed INSIDE it.
                ================================================= */}

                <aside
                    className="
                    hidden
                    lg:block

                    self-start

                    lg:sticky
                    lg:top-[110px]

                    h-fit
                    "
                >


                    <motion.div

                        initial={{
                            opacity: 0,
                            x: 25
                        }}

                        whileInView={{
                            opacity: 1,
                            x: 0
                        }}

                        viewport={{
                            once: true
                        }}

                        transition={{
                            duration: 0.6,
                            delay: 0.1
                        }}

                        className="
                        relative

                        bg-white

                        rounded-[26px]

                        border
                        border-[#E2E6E5]

                        p-7

                        shadow-[0_20px_55px_rgba(18,58,92,0.07)]
                        "
                    >



                        {/* ACTIVE EDGE */}

                        <div
                            className="
                            absolute
                            left-0
                            top-16

                            w-[3px]
                            h-9

                            rounded-r-full

                            bg-[#0F9E86]
                            "
                        />



                        <p
                            className="
                            uppercase
                            tracking-[0.2em]

                            text-[11px]
                            font-bold

                            text-[#0F9E86]

                            mb-2
                            "
                        >
                            {labels.guideEyebrow}
                        </p>



                        <h3
                            className="
                            font-serif

                            text-[27px]
                            font-bold

                            text-[#123A5C]

                            mb-7
                            "
                        >
                            {labels.guideTitle}
                        </h3>





                        {/* TABLE OF CONTENTS */}

                        <nav
                            aria-label="Article table of contents"
                            className="
                            space-y-1
                            "
                        >


                            {article.body.map((section, index) => (

                                <motion.a

                                    key={section.id}

                                    href={`#${section.id}`}

                                    whileHover={{
                                        x: 4
                                    }}

                                    className="
                                    group

                                    flex
                                    items-center
                                    gap-3

                                    rounded-xl

                                    px-2
                                    py-2.5

                                    text-sm

                                    text-[#5B6670]

                                    transition-colors

                                    hover:text-[#0F9E86]
                                    hover:bg-[#F4F7F6]
                                    "
                                >


                                    <span
                                        className="
                                        shrink-0

                                        w-8
                                        h-8

                                        rounded-full

                                        bg-[#F4F7F6]

                                        group-hover:bg-[#0F9E86]/10

                                        flex
                                        items-center
                                        justify-center

                                        text-[11px]
                                        font-semibold

                                        text-[#69747D]

                                        group-hover:text-[#0F9E86]

                                        transition
                                        "
                                    >

                                        {String(index + 1).padStart(2, "0")}

                                    </span>


                                    <span
                                        className="
                                        leading-5
                                        "
                                    >
                                        {section.eyebrow || section.heading}
                                    </span>


                                </motion.a>

                            ))}

                        </nav>





                        {/* ARTICLE INFORMATION */}

                        <div
                            className="
                            mt-7
                            pt-6

                            border-t
                            border-[#E2E6E5]

                            flex
                            items-center
                            justify-between

                            text-xs
                            text-[#69747D]
                            "
                        >

                            <span>
                                {article.read}
                            </span>


                            <span
                                className="
                                text-[#0F9E86]
                                font-medium
                                "
                            >
                                {article.category}
                            </span>

                        </div>


                        <ServiceCard labels={labels} category={article.category} />


                    </motion.div>

                </aside>


            </div>

        </section>

    );

}





/* =========================================================
    RELATED SERVICE (sidebar): article -> service page link
========================================================= */

function ServiceCard({ labels, category }) {
    const match = (labels.servicesByCategory || []).find((row) => row.category === category);
    const href = match?.href || labels.serviceFallbackHref;
    const text = match?.text || labels.serviceFallbackText;
    return (
        <div className="mt-6 rounded-2xl bg-[#06182F] p-5 text-white">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#5EEAD4]">{labels.serviceEyebrow}</p>
            <p className="mt-2 font-serif text-[19px] font-bold leading-snug">{labels.serviceTitle}</p>
            {href ? (
                <Link href={href} className="mt-3 inline-flex items-center gap-2 text-[14px] font-semibold text-[#5EEAD4] hover:underline">
                    {text} <span aria-hidden="true">→</span>
                </Link>
            ) : null}
            <Link href={labels.serviceButtonHref} className="mt-4 flex min-h-[44px] items-center justify-center rounded-xl bg-[#FF6B4A] px-4 text-[14px] font-semibold text-white transition hover:brightness-95">
                {labels.serviceButtonText}
            </Link>
        </div>
    );
}


/* =========================================================
    INDIVIDUAL ARTICLE SECTION
========================================================= */

function ArticleSection({
    section,
    index,
    isFirst = false
}) {


    if (!section) {
        return null;
    }


    return (

        <motion.section

            id={section.id}

            initial={{
                opacity: 0,
                y: 20
            }}

            whileInView={{
                opacity: 1,
                y: 0
            }}

            viewport={{
                once: true,
                amount: 0.12
            }}

            transition={{
                duration: 0.5
            }}

            className={`
            scroll-mt-32

            ${isFirst
                    ? ""
                    : "pt-10 mt-10 border-t border-[#E2E6E5]"
                }
            `}
        >



            {!isFirst && (

                <div
                    className="
                    flex
                    items-center
                    gap-4
                    mb-4
                    "
                >


                    <span
                        className="
                        text-[#0F9E86]
                        text-xs
                        font-bold
                        "
                    >
                        {String(index + 1).padStart(2, "0")}
                    </span>


                    <span
                        className="
                        block
                        w-10
                        h-px
                        bg-[#0F9E86]
                        "
                    />


                    <span
                        className="
                        uppercase
                        tracking-[0.22em]

                        text-[11px]
                        md:text-[11px]

                        font-semibold

                        text-[#667580]
                        "
                    >
                        {section.eyebrow}
                    </span>


                </div>

            )}





            <h2
                className={`
                font-serif
                font-bold

                text-[#123A5C]

                leading-[1.12]

                ${isFirst
                        ? "text-[34px] md:text-[40px]"
                        : "text-[30px] md:text-[36px]"
                    }
                `}
            >

                {section.heading}

            </h2>





            <div
                className="
                mt-5
                space-y-5
                "
            >

                {section.text?.map((paragraph, paragraphIndex) => (

                    <p
                        key={paragraphIndex}

                        className="
                        text-[#2B2E33]

                        text-[16px]
                        md:text-[17px]

                        leading-[1.85]
                        "
                    >
                        {withLinks(paragraph)}
                    </p>

                ))}

            </div>





            {section.bullets?.length > 0 && (

                <ul
                    className="
                    mt-6
                    space-y-3
                    "
                >

                    {section.bullets.map((bullet, bulletIndex) => (

                        <li
                            key={bulletIndex}

                            className="
                            flex
                            items-start
                            gap-3

                            text-[#2B2E33]

                            leading-7
                            "
                        >


                            <span
                                className="
                                mt-[5px]

                                shrink-0

                                w-5
                                h-5

                                rounded-full

                                bg-[#0F9E86]

                                text-white

                                flex
                                items-center
                                justify-center

                                text-[11px]
                                font-bold
                                "
                            >
                                ✓
                            </span>


                            <span>
                                {withLinks(bullet)}
                            </span>


                        </li>

                    ))}

                </ul>

            )}


        </motion.section>

    );

}