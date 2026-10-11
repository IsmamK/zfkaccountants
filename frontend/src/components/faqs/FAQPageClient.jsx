"use client";

import { useState } from "react";

import FAQMobile from "@/components/faqs/FAQMobile";

import FAQHero from "@/components/faqs/FAQHero";
import FAQCategories from "@/components/faqs/FAQCategories";
import FAQAccordion from "@/components/faqs/FAQAccordion";
import FAQHelpCard from "@/components/faqs/FAQHelpCard";
import FAQCTA from "@/components/faqs/FAQCTA";
import { useFaqs } from "@/components/faqs/faqContent";

export default function FAQPageClient() {
    const { categories } = useFaqs();
    const [chosenCategory, setSelectedCategory] =
        useState("General");
    const [search, setSearch] = useState("");

    // Fall back to the first category if an admin renamed or removed it.
    const selectedCategory = categories.some((c) => c.name === chosenCategory)
        ? chosenCategory
        : categories[0]?.name;

    return (
        <>
            {/* =========================================
                MOBILE AND TABLET VIEW
                Visible below 1024px
            ========================================== */}

            <FAQMobile />

            {/* =========================================
                DESKTOP VIEW
                Your existing desktop design is unchanged
            ========================================== */}

            <main className="hidden lg:block">
                <FAQHero />

                <FAQCategories
                    selectedCategory={selectedCategory}
                    setSelectedCategory={(category) => {
                        setSearch("");
                        setSelectedCategory(category);
                    }}
                    search={search}
                    setSearch={setSearch}
                />

                <section
                    className="
                        relative
                        bg-[#F4F7F8]
                        px-6
                        py-16
                    "
                >
                    <div
                        className="
                            mx-auto
                            grid
                            max-w-[1400px]
                            grid-cols-[380px_minmax(0,1fr)]
                            items-start
                            gap-8
                        "
                    >
                        <FAQHelpCard />

                        <FAQAccordion
                            selectedCategory={selectedCategory}
                            search={search}
                        />
                    </div>
                </section>

                <FAQCTA />
            </main>
        </>
    );
}
