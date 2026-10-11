"use client";


import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { useBlogTemplate } from "@/components/blog/blogTemplate";



export default function RelatedArticles({ article, articles }) {

    const { data: labels } = useBlogTemplate();



    const relatedArticles = articles

        .filter(
            item => item.slug !== article.slug
        )

        .slice(0, 3);




    return (

        <section

            className="
            relative
            bg-white
            py-24
            overflow-hidden
            "

        >



            {/* background decoration */}

            <div

                className="
                absolute
                -left-40
                top-20
                w-[350px]
                h-[350px]
                bg-[#12BFAE]/10
                rounded-full
                blur-3xl
                "

            />



            <div

                className="
                relative
                z-10

                max-w-[1240px]

                mx-auto

                px-8
                lg:px-10
                "

            >




                {/* HEADER */}


                <motion.div

                    initial={{
                        opacity: 0,
                        y: 30
                    }}

                    whileInView={{
                        opacity: 1,
                        y: 0
                    }}

                    viewport={{
                        once: true
                    }}

                    transition={{
                        duration: .6
                    }}

                    className="
                    text-center
                    max-w-2xl
                    mx-auto
                    mb-14
                    "

                >



                    <p

                        className="
                        uppercase
                        tracking-[5px]
                        text-[#12BFAE]
                        text-xs
                        font-semibold
                        mb-4
                        "

                    >

                        {labels.relatedEyebrow}
                    </p>





                    <h2

                        className="
                        font-serif
                        font-bold
                        text-[#123A5C]
                        text-4xl
                        md:text-5xl
                        "

                    >

                        {labels.relatedTitle}
                    </h2>





                    <p

                        className="
                        mt-5
                        text-gray-600
                        text-lg
                        leading-8
                        "

                    >

                        {labels.relatedDescription}

                    </p>



                </motion.div>









                {/* ARTICLE CARDS */}



                <div

                    className="
                    grid
                    md:grid-cols-2
                    lg:grid-cols-3
                    gap-8
                    "

                >



                    {
                        relatedArticles.map((item, index) => (



                            <motion.div


                                key={item.slug}


                                initial={{
                                    opacity: 0,
                                    y: 35
                                }}


                                whileInView={{
                                    opacity: 1,
                                    y: 0
                                }}


                                viewport={{
                                    once: true
                                }}


                                transition={{
                                    duration: .5,
                                    delay: index * .1
                                }}


                                whileHover={{
                                    y: -10
                                }}



                            >



                                <Link

                                    href={`/blog/${item.slug}`}

                                    className="
                                block
                                "

                                >




                                    <article


                                        className="
                                group

                                overflow-hidden

                                rounded-3xl

                                bg-white

                                border
                                border-[#E2E6E5]

                                shadow-[0_15px_45px_rgba(6,40,68,0.08)]

                                hover:shadow-[0_30px_70px_rgba(6,40,68,0.18)]

                                transition-all
                                duration-500

                                "

                                    >





                                        {/* IMAGE */}


                                        <div

                                            className="
                                    relative
                                    h-[210px]
                                    overflow-hidden
                                    "

                                        >



                                            <Image

                                                src={item.image}

                                                alt={item.title}

                                                fill

                                                className="
                                        object-cover

                                        group-hover:scale-110

                                        transition-transform

                                        duration-700
                                        "

                                            />





                                            {/* CATEGORY */}


                                            <div

                                                className="
                                        absolute
                                        top-5
                                        left-5

                                        bg-white/95

                                        backdrop-blur

                                        px-5
                                        py-2

                                        rounded-full

                                        text-xs

                                        font-semibold

                                        text-[#123A5C]

                                        group-hover:bg-[#12BFAE]

                                        group-hover:text-white

                                        transition-all
                                        duration-500

                                        "

                                            >

                                                {item.category}

                                            </div>



                                        </div>









                                        {/* CONTENT */}



                                        <div

                                            className="
                                    p-7
                                    "

                                        >



                                            <div

                                                className="
                                        flex
                                        items-center
                                        gap-4

                                        text-xs

                                        text-[#12BFAE]

                                        mb-4
                                        "

                                            >

                                                <span>
                                                    📅 {item.date}
                                                </span>


                                                <span>
                                                    ◷ {item.read}
                                                </span>


                                            </div>







                                            <h3

                                                className="
                                        font-serif

                                        font-bold

                                        text-[#123A5C]

                                        text-xl

                                        leading-snug

                                        group-hover:text-[#12BFAE]

                                        transition-colors
                                        "

                                            >

                                                {item.title}

                                            </h3>






                                            <p

                                                className="
                                        mt-4

                                        text-gray-600

                                        text-sm

                                        leading-6
                                        "

                                            >

                                                {item.description}

                                            </p>







                                            <div

                                                className="
                                        mt-6

                                        flex

                                        justify-between

                                        items-center

                                        "

                                            >



                                                <span

                                                    className="
                                            text-[#12BFAE]

                                            font-semibold

                                            text-sm
                                            "

                                                >

                                                    Read Article →

                                                </span>





                                                <div

                                                    className="
                                            w-11
                                            h-11

                                            rounded-full

                                            bg-[#12BFAE]/10

                                            flex

                                            items-center

                                            justify-center

                                            text-[#12BFAE]

                                            group-hover:bg-[#FF6B4A]

                                            group-hover:text-white

                                            transition-all
                                            "

                                                >

                                                    →

                                                </div>



                                            </div>






                                        </div>





                                    </article>



                                </Link>





                            </motion.div>



                        ))
                    }



                </div>






            </div>




        </section>

    )

}