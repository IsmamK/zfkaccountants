"use client";

import { motion } from "framer-motion";

import { useFaqs } from "@/components/faqs/faqContent";

export default function FAQCategories({
    selectedCategory,
    setSelectedCategory,
    search = "",
    setSearch = () => {},
}) {
    const { data, E, categories, editButton, hidden } = useFaqs();

    const showResults = () =>
        document.getElementById("faq-answers")?.scrollIntoView({ behavior: "smooth", block: "start" });

    // Hidden by an admin: nothing is rendered for visitors.
    if (hidden) return null;

    return (
        <section
            className="
                relative
                z-10
                bg-white
                py-5
            "
        >
            {editButton}

            <div
                className="
                    mx-auto
                    max-w-[1400px]
                    px-6
                "
            >
                {/* Heading and search */}
                <div
                    className="
                        flex
                        items-center
                        justify-between
                        gap-10
                    "
                >
                    <div>
                        <p
                            className="
                                text-xs
                                font-bold
                                tracking-[5px]
                                text-[#0F9E86]
                            "
                        >
                            <E.Text path="browseEyebrow" />
                        </p>

                        <h2
                            className="
                                mt-2
                                font-serif
                                text-[36px]
                                font-bold
                                text-[#123A5C]
                            "
                        >
                            <E.Text path="browseTitle" /> <E.Text path="browseTitleSecondLine" />
                        </h2>
                    </div>

                    {/* Search bar */}
                    <div
                        className="
                            flex
                            h-[55px]
                            w-[500px]
                            shrink-0
                            items-center
                            rounded-xl
                            border
                            border-[#E2E6E5]
                            bg-white
                            px-2
                            pl-5
                            shadow-md
                        "
                    >
                        <input
                            type="search"
                            aria-label="Search FAQs"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === "Enter") showResults();
                            }}
                            placeholder="Search questions, topics or keywords..."
                            className="
                                min-w-0
                                flex-1
                                bg-transparent
                                text-sm
                                text-[#123A5C]
                                outline-none
                                placeholder:text-gray-400
                            "
                        />

                        <button
                            type="button"
                            onClick={showResults}
                            className="
                                rounded-xl
                                bg-[#FF6B4A]
                                px-8
                                py-3
                                font-medium
                                text-white
                                transition
                                hover:bg-[#f25639]
                            "
                        >
                            Search
                        </button>
                    </div>
                </div>

                {/* Category cards */}
                <div
                    className="
                        mt-6
                        flex
                        flex-wrap
                        justify-center
                        gap-5
                    "
                >
                    {categories.map((cat, index) => {
                        const Icon = cat.Icon;
                        const active =
                            selectedCategory === cat.name;

                        return (
                            <motion.button
                                type="button"
                                key={index}
                                whileHover={{
                                    y: -6,
                                }}
                                whileTap={{
                                    scale: 0.98,
                                }}
                                animate={{
                                    scale: active ? 1.03 : 1,
                                }}
                                transition={{
                                    duration: 0.25,
                                }}
                                onClick={() =>
                                    setSelectedCategory(cat.name)
                                }
                                className={`
                                    flex
                                    w-[calc((100%-60px)/4)]
                                    h-[100px]
                                    cursor-pointer
                                    items-center
                                    gap-4
                                    rounded-2xl
                                    border
                                    bg-white
                                    p-4
                                    text-left
                                    transition-shadow
                                    duration-300

                                    ${active
                                        ? `
                                                border-[#0F9E86]
                                                shadow-xl
                                            `
                                        : `
                                                border-[#E2E6E5]
                                                shadow-sm
                                            `
                                    }
                                `}
                            >
                                {/* Category icon */}
                                <div
                                    className="
                                        flex
                                        h-11
                                        w-11
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-[#EAF6F4]
                                        text-[#0F9E86]
                                    "
                                >
                                    <Icon className="text-[18px]" />
                                </div>

                                {/* Category information */}
                                <div className="min-w-0">
                                    <h3
                                        className="
                                            text-sm
                                            font-bold
                                            leading-tight
                                            text-[#123A5C]
                                        "
                                    >
                                        <E.Text path={`categories.${index}.name`} />
                                    </h3>

                                    <p
                                        className="
                                            mt-1
                                            text-xs
                                            leading-[1.3]
                                            text-gray-500
                                        "
                                    >
                                        <E.Text path={`categories.${index}.desc`} />
                                    </p>
                                </div>
                            </motion.button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}