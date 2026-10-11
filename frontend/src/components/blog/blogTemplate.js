"use client";

import { useCms } from "@/components/cms/useCms";

// Labels shared by every article page. CMS key: home/blog-template/
const defaults = {
    backText: "Back to Resources",
    backHref: "/resources",
    contactText: "Contact our team",
    contactHref: "/contact",
    goodToKnowLabel: "Good to know",
    guideEyebrow: "Article guide",
    guideTitle: "On this page",
    relatedEyebrow: "More Insights",
    relatedTitle: "Continue Reading",
    relatedDescription: "Explore more accounting, tax and business guidance from ZFK Accountants.",
    // Sidebar card linking each article to the service it relates to (by category).
    serviceEyebrow: "Need a hand?",
    serviceTitle: "We can handle this for you",
    serviceButtonText: "Book a Free Consultation",
    serviceButtonHref: "/contact",
    serviceFallbackText: "Explore our services",
    serviceFallbackHref: "/services",
    servicesByCategory: [
        { category: "VAT", text: "Quarterly VAT returns", href: "/services/vat-returns" },
        { category: "Payroll", text: "Monthly payroll", href: "/services/payroll" },
        { category: "Accounting", text: "Annual accounts & Corporation Tax", href: "/services/annual-accounts" },
        { category: "Personal Tax", text: "Self Assessment tax returns", href: "/services/self-assessment" },
        { category: "Tax", text: "Self Assessment tax returns", href: "/services/self-assessment" },
    ],
};

export function useBlogTemplate() {
    return useCms("blog-template", defaults, {
        label: "Article page labels",
        buttonPosition: "right-3 top-[90px]",
        hideable: false, // labels used across the article page, not one visible block
    });
}
