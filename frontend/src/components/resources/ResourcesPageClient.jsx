"use client";


import { useMemo, useState } from "react";

import ResourcesHero from "@/components/resources/ResourcesHero";
import BlogFilters, { DEFAULT_CATEGORIES } from "@/components/resources/BlogFilters";
import Articles from "@/components/resources/Articles";



export default function ResourcesPageClient({ articles }) {


    const [selectedCategory, setSelectedCategory] =
        useState("All Articles");

    // Filters follow the categories actually used by published articles:
    // the usual ones in their usual order, then any new ones.
    const categories = useMemo(() => {
        const used = new Set(articles.map((article) => article.category).filter(Boolean));
        const known = DEFAULT_CATEGORIES.filter((c) => c !== "All Articles" && used.has(c));
        const extra = [...used].filter((c) => !DEFAULT_CATEGORIES.includes(c));
        return ["All Articles", ...known, ...extra];
    }, [articles]);



    return (

        <>


            <ResourcesHero />


            <BlogFilters

                categories={categories}

                selectedCategory={selectedCategory}

                setSelectedCategory={setSelectedCategory}

            />


            <Articles

                articles={articles}

                selectedCategory={selectedCategory}

            />


        </>

    );

}
