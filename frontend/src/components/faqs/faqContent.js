"use client";

import {
    FaBuilding,
    FaFileAlt,
    FaLaptop,
    FaPercent,
    FaShieldAlt,
    FaUser,
    FaUsers,
} from "react-icons/fa";

import { useCms } from "@/components/cms/useCms";
import { apiRequest } from "@/lib/api";
import faqDefaults from "@/data/faqs.json";

/* =========================================
   FAQ content — one source for the desktop
   categories + accordion and the mobile view.
   CMS key: home/faq-items/
========================================= */

export const FAQ_ICONS = {
    general: FaFileAlt,
    compliance: FaShieldAlt,
    vat: FaPercent,
    personal: FaUser,
    company: FaBuilding,
    payroll: FaUsers,
    online: FaLaptop,
};

export const FAQ_DEFAULTS = faqDefaults;

const FIELDS = {
    "categories[].icon": { type: "select", options: Object.keys(FAQ_ICONS) },
    "categories[].desc": { label: "Short description" },
    "categories[].questions[].q": { label: "Question" },
    "categories[].questions[].a": { label: "Answer", type: "textarea" },
};

// Keep the FAQPage structured data (seo/faqs/) in step with the questions
// shown on the page.
export async function syncFaqSchema(data) {
    const faqItems = (data.categories || []).flatMap((category) =>
        (category.questions || []).filter((item) => item.q && item.a).map((item) => ({ q: item.q, a: item.a }))
    );
    try {
        const current = await apiRequest("seo/faqs/");
        const builders = new Set(current?.schema?.builders || []);
        builders.add("FAQPage");
        await apiRequest("seo/faqs/", {
            method: "PATCH",
            body: { faqItems, schema: { ...(current?.schema || {}), builders: [...builders] } },
        });
    } catch {
        // Content is saved either way; the schema catches up on the next save.
    }
}

export function useFaqs() {
    const { data, E, editButton, hidden } = useCms("faq-items", FAQ_DEFAULTS, {
        label: "FAQ questions",
        fields: FIELDS,
        afterSave: syncFaqSchema,
    });

    const categories = data.categories.map((category) => ({
        ...category,
        Icon: FAQ_ICONS[category.icon] || FaFileAlt,
    }));

    // { "Category name": [{ q, a }] } — the shape the FAQ views render.
    const faqData = Object.fromEntries(categories.map((c) => [c.name, c.questions || []]));

    return { data, E, categories, faqData, editButton, hidden };
}

const HERO_DEFAULTS = {
    eyebrow: "FAQs",
    title: "Accounting & tax",
    titleHighlight: "FAQs, answered.",
    description:
        "Clear, practical answers about accounting, tax and compliance from the ZFK Accountants team.",
    mobileDescription: "Clear, practical answers about accounting, tax and compliance.",
    backgroundImage: "/images/faq/faq-hero-bg.png",
};

export function useFaqHero() {
    return useCms("faq-hero", HERO_DEFAULTS, { label: "FAQ hero", buttonPosition: "right-3 top-[90px]" });
}

const HELP_DEFAULTS = {
    eyebrow: "Still need help?",
    title: "Can't find what\nyou're looking for?",
    description: "Book a free video consultation and talk through your VAT, payroll, accounts or tax questions.",
    mobileDescription: "Our friendly team is here to help.",
    buttonText: "Book a Consultation",
    buttonHref: "/contact",
    backgroundImage: "/images/faq/faq-light-bg.png",
};

export function useFaqHelp() {
    return useCms("faq-help-card", HELP_DEFAULTS, {
        label: "FAQ help card",
        fields: { title: { type: "textarea", help: "A line break splits the title on desktop." } },
    });
}

const CTA_DEFAULTS = {
    title: "Still have questions?",
    description: "Book a free video consultation with our UK accounting specialists.",
    buttonText: "Book a Free Consultation",
    buttonHref: "/contact",
};

export function useFaqCta() {
    return useCms("faq-cta", CTA_DEFAULTS, { label: "FAQ call to action" });
}
