"use client";


import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import {
    FaFileInvoice,
    FaCalculator,
    FaUserTie,
    FaShieldAlt,
    FaUsers,
    FaCheckCircle,
    FaClock,
    FaChartLine,
    FaArrowRight,
} from "react-icons/fa";

import { useCms } from "@/components/cms/useCms";
import { mediaUrl } from "@/lib/api";


const ICONS = {
    invoice: FaFileInvoice,
    calculator: FaCalculator,
    person: FaUserTie,
    shield: FaShieldAlt,
    users: FaUsers,
    check: FaCheckCircle,
    clock: FaClock,
    chart: FaChartLine,
};


const defaults = {
    eyebrow: "OUR SERVICES",
    titleLine1: "Everything your business",
    titleLine2: "needs to",
    titleHighlight: "stay compliant",
    description:
        "Quarterly VAT returns, monthly payroll, annual accounts and Self Assessment, handled online by UK accountants so you can focus on growing your business.",
    mobileTitleLine1: "Stay compliant.",
    mobileTitleLine2: "Grow further.",
    mobileDescription: "VAT, payroll, accounts and tax returns, all online.",
    image: "/images/home/second section/accountant.png",
    imageAlt: "Accountant",
    linkText: "Learn more",
    services: [
        {
            number: "01",
            title: "Quarterly\nVAT Returns",
            description:
                "Prepared, checked and filed every quarter through Making Tax Digital.",
            icon: "calculator",
            link: "/services/vat-returns",
        },

        {
            number: "02",
            title: "Monthly\nPayroll",
            description:
                "Payslips, RTI submissions and pensions, run every month for your team.",
            icon: "users",
            link: "/services/payroll",
        },

        {
            number: "03",
            title: "Annual Accounts &\nCorporation Tax",
            description:
                "Statutory accounts and CT600 returns for UK limited companies, once a year.",
            icon: "invoice",
            link: "/services/annual-accounts",
        },

        {
            number: "04",
            title: "Self Assessment\nTax Returns",
            description:
                "Personal tax returns for sole traders, landlords and directors, filed on time.",
            icon: "person",
            link: "/services/self-assessment",
        },
    ],
    stats: [
        {
            value: "Tailored",
            text: "Quotes priced to your needs",
            icon: "users",
        },
        {
            value: "Compliant",
            text: "Compliance focused",
            icon: "check",
        },
        {
            value: "On time",
            text: "Every deadline, every time",
            icon: "clock",
        },
        {
            value: "100% online",
            text: "Wherever you are in the UK",
            icon: "chart",
        },
    ],
};


const fields = {
    "services[].icon": { type: "select", options: Object.keys(ICONS) },
    "services[].title": { type: "textarea", help: "A line break splits the title over two lines." },
    "stats[].icon": { type: "select", options: Object.keys(ICONS) },
};


const withIcon = (item) => ({ ...item, icon: ICONS[item.icon] || FaCheckCircle });



export default function ServicesOverview() {


    const [activeService, setActiveService] = useState(1);

    const { data, E, editButton, hidden } = useCms("home-services", defaults, {
        label: "Services overview",
        fields,
    });

    const services = data.services.map(withIcon);
    const stats = data.stats.map(withIcon);



    // Hidden by an admin: nothing is rendered for visitors.
    if (hidden) return null;

    return (

        <>


            {/* ================= MOBILE AND TABLET ONLY ================= */}

            {/* ================= MOBILE AND TABLET ONLY ================= */}

            <section
                className="
        relative
        isolate
        h-[calc(var(--ae-svh)-56px)]
        min-h-0
        overflow-hidden
        bg-[#F7FBFD]
        lg:hidden
    "
            >
                {editButton}

                {/* ================= BACKGROUND IMAGE ================= */}

                <div
                    aria-hidden="true"
                    className="
            pointer-events-none
            absolute
            inset-x-0
            top-0
            h-[clamp(245px,40svh,390px)]
            overflow-hidden
        "
                >
                    <E.Image path="image" />
                    <Image
                        src={mediaUrl(data.image)}
                        alt=""
                        fill
                        priority
                        sizes="100vw"
                        className="
                translate-x-[16%]
                scale-[1.03]
                object-cover
                object-[68%_16%]
                sm:translate-x-[10%]
                sm:object-[70%_18%]
                md:translate-x-[30%]
            "
                    />

                    {/* Fade only behind the heading — not over the man's face */}
                    <div
                        className="
                absolute
                inset-y-0
                left-0
                w-[56%]
                bg-gradient-to-r
                from-[#F7FBFD]
                via-[#F7FBFD]/90
                to-transparent
                sm:w-[50%]
                md:w-[52%]
            "
                    />

                    {/* Small bottom fade — kept away from the face */}
                    <div
                        className="
                absolute
                inset-x-0
                bottom-0
                h-[22%]
                bg-gradient-to-t
                from-[#F7FBFD]
                to-transparent
            "
                    />
                </div>

                {/* Background colour glows */}
                <div
                    aria-hidden="true"
                    className="
            pointer-events-none
            absolute
            -bottom-24
            -left-24
            h-[260px]
            w-[260px]
            rounded-full
            bg-[#DFF6F2]/55
            blur-3xl
        "
                />

                <div
                    aria-hidden="true"
                    className="
            pointer-events-none
            absolute
            -bottom-24
            -right-24
            h-[260px]
            w-[260px]
            rounded-full
            bg-[#FFE4DE]/45
            blur-3xl
        "
                />

                {/* ================= MAIN LAYOUT ================= */}

                <div
                    className="
            relative
            z-10
            mx-auto
            grid
            h-full
            w-full
            max-w-[760px]
            grid-rows-[auto_minmax(0,1fr)_auto]
            px-[clamp(16px,5vw,34px)]
            pb-[clamp(8px,1.2svh,14px)]
            pt-[clamp(12px,1.8svh,20px)]
        "
                >
                    {/* ================= HEADING ================= */}

                    <div className="relative z-20 shrink-0">
                        <div className="flex items-center gap-3">
                            <span
                                className="
                        h-[3px]
                        w-[clamp(30px,8vw,46px)]
                        shrink-0
                        bg-[#0F9E86]
                    "
                            />

                            <p
                                className="
                        whitespace-nowrap
                        text-[clamp(11px,1.4svh,14px)]
                        font-bold
                        uppercase
                        tracking-[0.32em]
                        text-[#0F9E86]
                    "
                            >
                                <E.Text path="eyebrow" />
                            </p>
                        </div>

                        <h2
                            className="
                    mt-[clamp(7px,1svh,11px)]
                    max-w-[72%]
                    font-serif
                    text-[clamp(26px,4.1svh,44px)]
                    font-bold
                    leading-[0.96]
                    tracking-[-0.025em]
                    text-[#123A5C]
                    sm:max-w-[65%]
                    md:max-w-[48%]
                "
                        >
                            <span className="block whitespace-nowrap">
                                <E.Text path="mobileTitleLine1" />
                            </span>

                            <span className="block whitespace-nowrap text-[#FF6245]">
                                <E.Text path="mobileTitleLine2" />
                            </span>
                        </h2>

                        <p
                            className="
                    mt-[clamp(7px,1svh,11px)]
                    max-w-[58%]
                    text-[clamp(12px,1.65svh,16px)]
                    font-medium
                    leading-[1.4]
                    text-[#49647D]
                    sm:max-w-[52%]
                    md:max-w-[42%]
                "
                        >
                            <E.Text path="mobileDescription" />
                        </p>
                    </div>

                    {/* ================= CARDS AREA ================= */}

                    <div
                        className="
                relative
                flex
                min-h-0
                flex-col
                justify-end
                pt-[clamp(40px,6.5svh,76px)]
            "
                    >
                        <div
                            className="
                    grid
                    h-full
                    max-h-[455px]
                    min-h-0
                    w-full
                    grid-cols-2
                    grid-rows-2
                    gap-[clamp(10px,1.5svh,16px)]
                "
                        >
                            {services.map((service, index) => {
                                const Icon = service.icon;
                                const active = activeService === index;

                                return (
                                    <div
                                        key={index}
                                        onClick={() => setActiveService(index)}
                                        className={`
                                group
                                relative
                                flex
                                min-h-0
                                cursor-pointer
                                flex-col
                                overflow-hidden
                                rounded-[clamp(20px,3svh,30px)]
                                border
                                p-[clamp(12px,2svh,22px)]
                                transition-all
                                duration-500

                                ${active
                                                ? `
                                            border-[#123A5C]
                                            bg-gradient-to-br
                                            from-[#0B456E]
                                            via-[#123A5C]
                                            to-[#062E4E]
                                            text-white
                                            shadow-[0_18px_40px_rgba(18,58,92,0.25)]
                                        `
                                                : `
                                            border-white
                                            bg-white
                                            text-[#123A5C]
                                            shadow-[0_12px_30px_rgba(18,58,92,0.09)]
                                        `
                                            }
                            `}
                                    >
                                        {/* Active card glow */}
                                        {active && (
                                            <div
                                                aria-hidden="true"
                                                className="
                                        pointer-events-none
                                        absolute
                                        -bottom-12
                                        -right-12
                                        h-36
                                        w-36
                                        rounded-full
                                        bg-[#0D6B9B]/45
                                        blur-3xl
                                    "
                                            />
                                        )}

                                        {/* Service icon */}
                                        <div
                                            className="
                                    relative
                                    z-10
                                    flex
                                    h-[clamp(40px,5.8svh,60px)]
                                    w-[clamp(40px,5.8svh,60px)]
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-[#E7F8F4]
                                    text-[#0FA58A]
                                "
                                        >
                                            <Icon className="text-[clamp(18px,2.8svh,29px)]" />
                                        </div>

                                        {/* Service title */}
                                        <h3
                                            className="
                                    relative
                                    z-10
                                    mt-[clamp(9px,1.4svh,15px)]
                                    whitespace-pre-line
                                    font-serif
                                    text-[clamp(17px,2.5svh,26px)]
                                    font-bold
                                    leading-[1.08]
                                    tracking-[-0.015em]
                                "
                                        >
                                            <E.Text path={`services.${index}.title`} />
                                        </h3>

                                        {/* Orange underline */}
                                        <div
                                            className="
                                    relative
                                    z-10
                                    mt-[clamp(7px,1.1svh,12px)]
                                    h-[3px]
                                    w-[clamp(30px,8vw,48px)]
                                    shrink-0
                                    bg-[#FF6245]
                                "
                                        />

                                        {/* No descriptions on mobile */}

                                        <Link
                href={service.link}
                                            aria-label={`${data.linkText}: ${String(service.title || "").replace(/\s+/g, " ")}`}
                                            className={`
                                    relative
                                    z-10
                                    mt-auto
                                    flex
                                    items-center
                                    gap-3
                                    pt-2
                                    text-[clamp(12px,1.8svh,18px)]
                                    font-semibold

                                    ${active
                                                    ? "text-white"
                                                    : "text-[#123A5C]"
                                                }
                                `}
                                        >
                                            <E.Text path="linkText" />

                                            <FaArrowRight
                                                className="
                                        transition-transform
                                        duration-300
                                        group-hover:translate-x-1
                                    "
                                            />
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* ================= STATS BAR ================= */}

                    <div
                        className="
                mt-[clamp(10px,1.5svh,16px)]
                grid
                shrink-0
                grid-cols-4
                divide-x
                divide-[#DCE7EC]
                rounded-[clamp(20px,2.8svh,28px)]
                border
                border-white
                bg-white/95
                px-1
                py-[clamp(8px,1.2svh,14px)]
                shadow-[0_14px_35px_rgba(18,58,92,0.10)]
            "
                    >
                        {stats.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={index}
                                    className="
                            flex
                            min-w-0
                            flex-col
                            items-center
                            justify-center
                            px-1
                            text-center
                        "
                                >
                                    <Icon
                                        className="
                                text-[clamp(14px,2svh,21px)]
                                text-[#0FA58A]
                            "
                                    />

                                    <p
                                        className="
                                mt-[clamp(2px,0.4svh,4px)]
                                whitespace-nowrap
                                text-[clamp(11px,1.7svh,17px)]
                                font-extrabold
                                leading-none
                                text-[#123A5C]
                            "
                                    >
                                        <E.Text path={`stats.${index}.value`} />
                                    </p>

                                    <p
                                        className="
                                mt-[2px]
                                line-clamp-1
                                text-[clamp(11px,0.85svh,11px)]
                                leading-[1.1]
                                text-[#536B87]
                            "
                                    >
                                        <E.Text path={`stats.${index}.text`} />
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
            {/* ================= DESKTOP ONLY ================= */}

            <section
                className="
            relative
            mt-8
            hidden
            min-h-[var(--ae-vh)]
            overflow-hidden
            bg-[#f8fbff]
            lg:block
            "
            >

                {editButton}


                {/* RIGHT IMAGE */}

                <div
                    className="
                absolute
                right-0
                top-0
                h-full
                w-[45%]
                "
                >

                    <E.Image path="image" />
                    <Image
                        src={mediaUrl(data.image)}
                        alt={data.imageAlt}
                        width={1200}
                        height={1000}
                        priority
                        className="
                    h-full
                    w-full
                    object-cover
                    object-center
                    "
                    />

                </div>



                {/* IMAGE BLEND */}

                <div
                    className="
                absolute
                left-0
                top-0
                
                h-full
                w-[65%]
                bg-gradient-to-r
                from-white
                via-white
                to-transparent
                "
                />





                <div
                    className="
                relative
                z-10
                mx-auto
                flex
                min-h-[calc(var(--ae-vh)-76px)]
                w-[min(1200px,calc(100%-40px))]
                flex-col
                pt-8
                pb-6
                "
                >





                    {/* HEADER */}

                    <div
                        className="
                    max-w-[650px]
                    "
                    >

                        <div
                            className="
                        mb-4
                        mt-12
                        flex
                        items-center
                        gap-4
                        "
                        >

                            <span
                                className="
                            h-[3px]
                            w-14
                            bg-[#ff6b4a]
                            "
                            />


                            <p
                                className="
                            text-xs
                            font-bold
                            tracking-[5px]
                            text-[#123a5c]
                            "
                            >
                                <E.Text path="eyebrow" />
                            </p>

                        </div>




                        <h2
                            className="
                        font-serif
                        text-[44px]
                        font-bold
                        leading-[1.05]
                        text-[#123a5c]
                        "
                        >

                            <E.Text path="titleLine1" />

                            <br />

                            <E.Text path="titleLine2" />{" "}

                            <span
                                className="
                            relative
                            text-[#ff6b4a]
                            "
                            >

                                <E.Text path="titleHighlight" />


                                <span
                                    className="
                                absolute
                                bottom-[-7px]
                                left-0
                                h-[4px]
                                w-full
                                bg-[#ff6b4a]
                                "
                                />

                            </span>


                        </h2>





                        <p
                            className="
                        mt-3
                        max-w-[600px]
                        text-base
                        leading-relaxed
                        text-slate-600
                        "
                        >

                            <E.Text path="description" />

                        </p>


                    </div>






                    {/* SERVICE CARDS */}


                    <div
                        className="
                    mt-7
                    flex
                    gap-4
                    "
                    >

                        {
                            services.map((service, index) => {


                                const Icon = service.icon;

                                const active = activeService === index;



                                return (

                                    <div

                                        key={index}

                                        onClick={() =>
                                            setActiveService(index)
                                        }

                                        className={`
                                    group
                                    relative
                                    flex
                                    h-[285px]
                                    w-[245px]
                                    cursor-pointer
                                    flex-col
                                    rounded-[24px]
                                    p-6
                                    transition-all
                                    duration-500

                                    hover:-translate-y-3


                                    ${active

                                                ?

                                                `
                                        bg-[#123a5c]
                                        text-white
                                        shadow-[0_25px_60px_rgba(18,58,92,.35)]
                                        `

                                                :

                                                `
                                        bg-white
                                        text-[#123a5c]
                                        shadow-lg
                                        hover:shadow-2xl
                                        `
                                            }

                                    `}
                                    >
<E.Item path="services" index={index} />



                                        <div
                                            className={`
                                        flex
                                        h-12
                                        w-12
                                        items-center
                                        justify-center
                                        rounded-full
                                        transition
                                        duration-300
                                        group-hover:scale-110


                                        ${active

                                                    ?

                                                    "bg-white/10 text-white"

                                                    :

                                                    "bg-[#e8f7f5] text-[#0fa58a]"
                                                }

                                        `}
                                        >

                                            <Icon size={25} />

                                        </div>






                                        <h3
                                            className="
                                        mt-4
                                        whitespace-pre-line
                                        min-h-[48px]
                                        text-lg
                                        font-bold
                                        leading-tight
                                        "
                                        >

                                            <E.Text path={`services.${index}.title`} />

                                        </h3>






                                        <div
                                            className="
                                        mt-3
                                        h-[3px]
                                        w-10
                                        bg-[#ff6b4a]
                                        "
                                        />







                                        <p
                                            className={`
                                        mt-3
                                        text-sm
                                        leading-relaxed


                                        ${active

                                                    ?

                                                    "text-white/80"

                                                    :

                                                    "text-slate-600"
                                                }

                                        `}
                                        >

                                            <E.Text path={`services.${index}.description`} />

                                        </p>







                                        {/* ONLY THIS GOES TO PAGE */}

                                        <Link

                                            href={service.link}
                                            aria-label={`${data.linkText}: ${String(service.title || "").replace(/\s+/g, " ")}`}

                                            onClick={(e) =>
                                                e.stopPropagation()
                                            }

                                            className={`
                                        absolute
                                        bottom-6
                                        left-6
                                        flex
                                        items-center
                                        gap-3
                                        text-sm
                                        font-semibold


                                        ${active

                                                    ?

                                                    "text-white"

                                                    :

                                                    "text-[#123a5c]"
                                                }

                                        `}
                                        >

                                            <E.Text path="linkText" />


                                            <span
                                                className="
                                            flex
                                            h-8
                                            w-8
                                            items-center
                                            justify-center
                                            rounded-full
                                            border
                                            transition
                                            duration-300
                                            group-hover:translate-x-2
                                            "
                                            >

                                                <FaArrowRight size={12} />

                                            </span>


                                        </Link>





                                    </div>


                                );


                            })
                        }
                        <E.Add path="services" label="Add service" />


                    </div>








                    {/* STATS */}


                    <div
                        className="
                    mt-7
                    grid
                    grid-cols-4
                    rounded-[26px]
                    bg-white
                    px-7
                    py-4
                    shadow-xl
                    "
                    >


                        {
                            stats.map((item, index) => {


                                const Icon = item.icon;


                                return (

                                    <div
                                        key={index}
                                        className="relative 
                                    flex
                                    items-center
                                    gap-4
                                    border-r
                                    border-slate-200
                                    px-4
                                    last:border-none
                                    "
                                    >
<E.Item path="stats" index={index} />

                                        <div
                                            className="
                                        flex
                                        h-11
                                        w-11
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-[#e8f7f5]
                                        text-[#0fa58a]
                                        "
                                        >

                                            <Icon size={20} />

                                        </div>



                                        <div>

                                            <h4
                                                className="
                                            text-[24px]
                                            font-bold
                                            leading-none
                                            text-[#123a5c]
                                            "
                                            >

                                                <E.Text path={`stats.${index}.value`} />

                                            </h4>


                                            <p
                                                className="
                                            mt-1
                                            text-xs
                                            text-slate-500
                                            "
                                            >

                                                <E.Text path={`stats.${index}.text`} />

                                            </p>

                                        </div>


                                    </div>

                                );

                            })
                        }
                        <E.Add path="stats" label="Add stat" />


                    </div>





                </div>



            </section>

        </>

    );

}