"use client";

import { useFaqHero } from "@/components/faqs/faqContent";
import { bgImage } from "@/lib/bgImage";

export default function FAQHero() {

    const { data, E, editButton, hidden } = useFaqHero();


    // Hidden by an admin: nothing is rendered for visitors.
    if (hidden) return null;

    return (
        <section
            className="
            relative
            h-[270px]
            bg-[#123A5C]
            overflow-hidden
            "
        >
            {editButton}


            {/* background image */}
            <E.Image path="backgroundImage" />
            <div
                className="
                absolute
                inset-0
                bg-cover
                bg-center
                opacity-80
                "
                style={{
                    backgroundImage:
                        bgImage(data.backgroundImage)
                }}
            />


            {/* remove curve effect */}
            <div
                className="
                absolute
                inset-0
                bg-[#123A5C]/70
                "
            />



            <div
                className="
                relative
                max-w-[1400px]
                mx-auto
                px-6
                pt-6
                "
            >


                {/* Sits under the site's fixed header; spacer only. */}
                <nav
                    aria-hidden="true"
                    inert
                    className="
                    flex
                    justify-between
                    items-center
                    text-white
                    "
                >

                    <div className="font-bold text-xl">
                        ZFK{" "}
                        <span className="text-[#0F9E86]">
                            Accountants
                        </span>
                    </div>


                    <div className="
                    flex
                    gap-8
                    items-center
                    text-sm
                    font-medium
                    ">

                        {
                            [
                                "Home",
                                "About Us",
                                "Services",
                                "Resources / Blog",
                                "FAQs",
                                "Contact"
                            ].map((item, index) => (
                                <span
                                    key={index}
                                    className={
                                        item === "FAQs"
                                            ?
                                            "text-[#0F9E86]"
                                            :
                                            ""
                                    }
                                >
                                    {item}
                                </span>
                            ))
                        }


                        <button
                            className="
                        bg-[#FF6B4A]
                        px-6
                        py-3
                        rounded-xl
                        "
                        >
                            Book a Consultation
                        </button>


                    </div>


                </nav>



                <div className="mt-8">

                    <p
                        className="
                    text-[#0F9E86]
                    uppercase
                    tracking-[6px]
                    text-xs
                    font-bold
                    "
                    >
                        <E.Text path="eyebrow" />
                    </p>


                    <h1
                        className="
                    font-serif
                    text-white
                    text-[48px]
                    font-bold
                    mt-3
                    "
                    >
                        <E.Text path="title" />{" "}
                        <span className="text-[#FF6B4A]">
                            <E.Text path="titleHighlight" />
                        </span>
                    </h1>


                    <p
                        className="
                    text-white/90
                    mt-3
                    max-w-[480px]
                    "
                    >
                        <E.Text path="description" />
                    </p>


                </div>



            </div>


        </section>
    )
}