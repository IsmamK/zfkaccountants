"use client";

import Link from "next/link";
import { Fragment } from "react";

import { useFaqHelp } from "@/components/faqs/faqContent";
import { bgImage } from "@/lib/bgImage";

export default function FAQHelpCard() {

    const { data, E, editButton, hidden } = useFaqHelp();



    // Hidden by an admin: nothing is rendered for visitors.
    if (hidden) return null;

    return (

        <div
            className="
relative
h-[395px]
rounded-2xl
overflow-hidden
bg-cover
bg-center
"
            style={{
                backgroundImage:
                    bgImage(data.backgroundImage)
            }}
        >

            {editButton}
            <E.Image path="backgroundImage" />


            <div
                className="
p-8
"
            >

                <p
                    className="
text-[#10aaa5]
uppercase
tracking-[4px]
text-xs
font-bold
"
                >
                    <E.Text path="eyebrow" />
                </p>


                <h3
                    className="
font-serif
text-[#102b52]
text-[32px]
font-bold
leading-tight
mt-4
"
                >
                    {data.title.split("\n").map((line, index) => (
                        <Fragment key={index}>
                            {index > 0 ? <br /> : null}
                            {line}
                        </Fragment>
                    ))}
                </h3>


                <p
                    className="
text-[#506889]
mt-4
max-w-[260px]
"
                >
                    <E.Text path="description" />
                </p>


                <Link
                    href={data.buttonHref}
                    className="
inline-block
mt-6
bg-[#ff6848]
text-white
px-7
py-3
rounded-xl
"
                >
                    <E.Text path="buttonText" /> →
                </Link>


            </div>



        </div>

    )

}