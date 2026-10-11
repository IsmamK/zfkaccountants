"use client";

import { motion } from "framer-motion";

export const DEFAULT_CATEGORIES = [
    "All Articles",
    "Accounting",
    "VAT",
    "Personal Tax",
    "Compliance",
    "Small Business",
];

export default function BlogFilters({
    categories = DEFAULT_CATEGORIES,
    selectedCategory,
    setSelectedCategory,
}) {
    return (
        <>
            {/* =========================================
                MOBILE AND TABLET FILTERS
            ========================================== */}

            <section
                className="
                    relative
                    z-20
                    border-b
                    border-[#E7EDF1]
                    bg-white
                    px-4
                    py-[clamp(14px,2svh,20px)]
                    lg:hidden
                "
            >
                <div className="mx-auto w-full max-w-[760px]">
                    {/* First four options in one line */}
                    <div
                        className="
                            grid
                            grid-cols-[1.05fr_1.1fr_.62fr_1.25fr]
                            gap-1.5
                        "
                    >
                        {categories.slice(0, 4).map((item) => {
                            const active =
                                selectedCategory === item;

                            return (
                                <motion.button
                                    type="button"
                                    key={item}
                                    onClick={() =>
                                        setSelectedCategory(item)
                                    }
                                    whileTap={{
                                        scale: 0.96,
                                    }}
                                    className={`
                                        flex
                                        h-[clamp(36px,5.4svh,44px)]
                                        min-w-0
                                        items-center
                                        justify-center
                                        whitespace-nowrap
                                        rounded-full
                                        px-1
                                        text-[clamp(11px,2.65vw,12px)]
                                        font-medium
                                        transition-all
                                        duration-300

                                        ${active
                                            ? `
                                                    bg-gradient-to-r
                                                    from-[#123A5C]
                                                    to-[#07517E]
                                                    text-white
                                                    shadow-[0_7px_18px_rgba(18,58,92,0.22)]
                                                `
                                            : `
                                                    border
                                                    border-[#D6DEE5]
                                                    bg-white
                                                    text-[#123A5C]
                                                    shadow-[0_3px_8px_rgba(18,58,92,0.08)]
                                                `
                                        }
                                    `}
                                >
                                    {item}
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* Last two options */}
                    <div
                        className="
                            mt-2
                            flex
                            items-center
                            gap-2
                        "
                    >
                        {categories.slice(4).map((item) => {
                            const active =
                                selectedCategory === item;

                            return (
                                <motion.button
                                    type="button"
                                    key={item}
                                    onClick={() =>
                                        setSelectedCategory(item)
                                    }
                                    whileTap={{
                                        scale: 0.96,
                                    }}
                                    className={`
                                        flex
                                        h-[clamp(36px,5.4svh,44px)]
                                        items-center
                                        justify-center
                                        whitespace-nowrap
                                        rounded-full
                                        px-[clamp(17px,5vw,26px)]
                                        text-[clamp(11px,2.8vw,12px)]
                                        font-medium
                                        transition-all
                                        duration-300

                                        ${active
                                            ? `
                                                    bg-gradient-to-r
                                                    from-[#123A5C]
                                                    to-[#07517E]
                                                    text-white
                                                    shadow-[0_7px_18px_rgba(18,58,92,0.22)]
                                                `
                                            : `
                                                    border
                                                    border-[#D6DEE5]
                                                    bg-white
                                                    text-[#123A5C]
                                                    shadow-[0_3px_8px_rgba(18,58,92,0.08)]
                                                `
                                        }
                                    `}
                                >
                                    {item}
                                </motion.button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* =========================================
                DESKTOP FILTERS
                Existing desktop layout
            ========================================== */}

            <section
                className="
                    relative
                    z-20
                    hidden
                    -translate-y-12
                    bg-white
                    lg:block
                "
            >
                <div
                    className="
                        mx-auto
                        flex
                        max-w-[1400px]
                        justify-center
                        px-8
                        lg:px-14
                    "
                >
                    <div className="flex flex-wrap gap-4">
                        {categories.map((item) => (
                            <motion.button
                                type="button"
                                key={item}
                                onClick={() =>
                                    setSelectedCategory(item)
                                }
                                whileHover={{
                                    y: -4,
                                }}
                                whileTap={{
                                    scale: 0.95,
                                }}
                                className={`
                                    rounded-full
                                    px-7
                                    py-3
                                    text-sm
                                    font-medium
                                    shadow-sm
                                    transition-all

                                    ${selectedCategory === item
                                        ? `
                                                bg-[#123A5C]
                                                text-white
                                            `
                                        : `
                                                border
                                                border-gray-200
                                                bg-white
                                                text-[#123A5C]
                                            `
                                    }
                                `}
                            >
                                {item}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}