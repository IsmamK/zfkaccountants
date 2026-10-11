"use client";

import Link from "next/link";

import { useFaqCta } from "@/components/faqs/faqContent";

export default function FAQCTA() {

    const { data, E, editButton, hidden } = useFaqCta();

    // Hidden by an admin: nothing is rendered for visitors.
    if (hidden) return null;

    return (

        <section className="
relative
bg-[#123A5C]
py-20
px-6
text-center
">
            {editButton}



            <h2 className="
text-white
text-4xl
font-serif
">

                <E.Text path="title" />

            </h2>


            <p className="
text-gray-300
mt-4
">

                <E.Text path="description" />

            </p>


            <Link href={data.buttonHref} className="
inline-block
mt-8
bg-[#FF6B4A]
text-white
px-8
py-4
rounded-xl
font-semibold
">

                <E.Text path="buttonText" />

            </Link>


        </section>

    )

}