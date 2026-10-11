"use client";


import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { useBlogTemplate } from "@/components/blog/blogTemplate";


export default function ArticleHero({ article }) {

    const { data: labels, editButton } = useBlogTemplate();


    return (

        <section

            className="
            relative
            overflow-hidden
            bg-[#062844]
            h-[calc(var(--ae-vh)-84px)]
            min-h-[720px]
            "

        >
            {editButton}




            <Image

                src="/images/resources/article-bg.png"

                fill

                priority

                alt="Article background"

                className="
                object-cover
                object-center
                "

            />





            <div

                className="
                absolute
                inset-0

                bg-gradient-to-r

                from-[#062844]/85

                via-[#062844]/60

                to-transparent
                "

            />







            <div

                className="
                relative
                z-10

                max-w-[1400px]

                mx-auto

                px-8

                lg:px-14

                h-full

                flex

                items-center
                "

            >



                <motion.div

                    initial={{
                        opacity: 0,
                        x: -40
                    }}

                    animate={{
                        opacity: 1,
                        x: 0
                    }}

                    transition={{
                        duration: .7
                    }}

                    className="
                    max-w-3xl
                    "

                >



                    <p

                        className="
                        uppercase
                        tracking-[6px]

                        text-[#12BFAE]

                        text-sm

                        mb-5
                        "

                    >

                        {article.category}

                    </p>






                    <h1

                        className="
                        font-serif

                        font-bold

                        text-white

                        text-[48px]

                        xl:text-[62px]

                        leading-[1.05]
                        "

                    >

                        {article.title}

                    </h1>






                    <p

                        className="
                        mt-6

                        text-white/85

                        text-lg

                        leading-8

                        max-w-2xl
                        "

                    >

                        {article.description}

                    </p>







                    <div

                        className="
                        mt-8

                        flex

                        gap-8

                        items-center

                        text-white

                        text-sm
                        "

                    >

                        <span>
                            📅 {article.date}
                        </span>


                        <span>
                            ◷ {article.read}
                        </span>


                        <span>
                            ✍ {article.author}
                        </span>


                    </div>







                    <div

                        className="
                        mt-8

                        flex

                        gap-6
                        "

                    >



                        <Link
                href={labels.backHref}

                            className="inline-block 
                            bg-[#FF6B4A]

                            text-white

                            px-8

                            py-4

                            rounded-xl

                            font-semibold

                            hover:scale-105

                            transition
                            "

                        >

                            {labels.backText} →

                        </Link>





                        <Link
                href={labels.contactHref}

                            className="inline-block 
                            text-white

                            border-b

                            border-[#12BFAE]

                            pb-1
                            "

                        >

                            {labels.contactText}

                        </Link>




                    </div>





                </motion.div>





            </div>




        </section>

    );

}