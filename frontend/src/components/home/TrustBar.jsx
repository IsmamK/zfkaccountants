"use client";

import Link from "next/link";
import { FaCalculator, FaFileInvoice, FaLaptop, FaUserTie, FaUsers } from "react-icons/fa6";

import { useCms } from "@/components/cms/useCms";

// The bar under the home hero: what the practice does and how it works
// (remote, UK-wide). Each item links to its service page.
const ICONS = { vat: FaCalculator, payroll: FaUsers, accounts: FaFileInvoice, personal: FaUserTie, online: FaLaptop };

const defaults = {
    titleLine1: "Online accountants.",
    titleLine2: "Wherever you are in the UK.",
    items: [
        { icon: "vat", name: "Quarterly VAT", description: "Returns filed via MTD", href: "/services/vat-returns" },
        { icon: "payroll", name: "Monthly Payroll", description: "Payslips, RTI, pensions", href: "/services/payroll" },
        { icon: "accounts", name: "Annual Accounts", description: "Accounts & CT600", href: "/services/annual-accounts" },
        { icon: "personal", name: "Self Assessment", description: "Personal tax returns", href: "/services/self-assessment" },
    ],
};

const fields = {
    "items[].icon": { type: "select", options: Object.keys(ICONS) },
};

export default function TrustBar() {

    const { data, E, editButton, hidden } = useCms("home-trust-bar", defaults, {
        label: "Services bar",
        fields,
        buttonPosition: "right-6 -top-10",
    });

    const items = data.items;


    // Hidden by an admin: nothing is rendered for visitors.
    if (hidden) return null;

    return (
        <section className="relative px-4">

            {editButton}

            <div
                className="
                max-w-7xl
                mx-auto
                bg-white
                rounded-[24px]
                shadow-[0_20px_50px_rgba(0,0,0,0.12)]
                border border-gray-100
                px-6
                lg:px-10
                lg:py-6
                border-l-[#FF6B4A]
                border-l-4
                "
            >

                <div
                    className="
                    flex
                    flex-col
                    gap-4
                    py-5
                    lg:py-0
                    lg:gap-5
                    "
                >


                    {/* Trust Message */}

                    <div
                        className="
                        flex-shrink-0
                        border-l-4
                        border-[#0F9E86]
                        pl-4
                        "
                    >

                        <h2
                            className="
                            text-[#123A5C]
                            font-serif
                            text-lg
                            lg:text-xl
                            font-bold
                            leading-tight
                            "
                        >
                            <E.Text path="titleLine1" />
                            <br className="md:hidden" />
                            <span className="hidden md:inline"> </span>
                            <E.Text path="titleLine2" />
                        </h2>

                    </div>



                    {/* Authority Items */}

                    <div
                        className="
                        grid
                        w-full
                        flex-1
                        grid-cols-2
                        gap-4
                        md:grid-cols-4
                        md:gap-3
                        "
                    >

                        {items.map((item, index) => {
                            const Icon = ICONS[item.icon] || FaLaptop;
                            return (
                                <div
                                    key={index}
                                    className="relative flex min-w-0 items-center border-l border-gray-200 pl-4"
                                >
                                    <E.Item path="items" index={index} />
                                    <Link href={item.href || "/services"} className="group flex min-w-0 items-center gap-3">
                                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EAF6F4] text-[#0F9E86] transition group-hover:bg-[#0F9E86] group-hover:text-white" aria-hidden="true">
                                            <Icon size={17} />
                                        </span>
                                        <span className="min-w-0">
                                            <span className="block text-sm font-bold text-[#123A5C] lg:text-base">
                                                <E.Text path={`items.${index}.name`} /><E.Link path={`items.${index}.href`} />
                                            </span>
                                            <span className="block text-xs text-gray-500 lg:text-sm">
                                                <E.Text path={`items.${index}.description`} />
                                            </span>
                                        </span>
                                    </Link>
                                </div>
                            );
                        })}
                        <E.Add path="items" label="Add item" />


                    </div>


                </div>

            </div>

        </section>
    );
}
