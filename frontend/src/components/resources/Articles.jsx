"use client";


import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Articles({

    articles = [],

    selectedCategory

}) {



    const filteredArticles =

        selectedCategory === "All Articles"

            ?

            articles

            :

            articles.filter(

                (article) =>

                    article.category === selectedCategory

            );




    return (

        <section

            className="
            relative
            bg-white
            pb-20
            "

        >



            <div

                className="
                max-w-[1400px]
                mx-auto
                px-8
                lg:px-14
                "

            >



                <div

                    className="
                    grid
                    md:grid-cols-2
                    lg:grid-cols-3
                    gap-8
                    "

                >




                    {

                        filteredArticles.map((article, index) => (



                            <motion.div


                                key={article.slug}


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

                                    delay: index * .08

                                }}



                                whileHover={{

                                    y: -10

                                }}


                            >





                                <Link


                                    href={`/blog/${article.slug}`}


                                    className="block"



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
                                    hover:bg-[#062844]
                                    hover:border-[#062844]
                                    transition-all
                                    duration-500
                                    "


                                    >





                                        {/* IMAGE */}


                                        <div


                                            className="
                                        relative
                                        h-[220px]
                                        overflow-hidden
                                        "


                                        >




                                            <Image


                                                src={article.image}


                                                alt={article.title}


                                                fill


                                                sizes="(max-width:768px) 100vw, 33vw"


                                                className="
                                            object-cover
                                            group-hover:scale-110
                                            transition-transform
                                            duration-700
                                            "


                                            />





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
                                            "


                                            >

                                                {article.category}


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
                                            gap-4
                                            text-xs
                                            text-[#12BFAE]
                                            mb-4
                                            "


                                            >


                                                <span>

                                                    📅 {article.date}

                                                </span>



                                                <span>

                                                    ◷ {article.read}

                                                </span>



                                            </div>






                                            <h2


                                                className="
                                            font-serif
                                            font-bold
                                            text-[#123A5C]
                                            group-hover:text-white
                                            text-xl
                                            leading-snug
                                            transition-colors
                                            duration-500
                                            "


                                            >

                                                {article.title}


                                            </h2>







                                            <p


                                                className="
                                            mt-4
                                            text-gray-600
                                            group-hover:text-white/80
                                            text-sm
                                            leading-6
                                            transition-colors
                                            duration-500
                                            "


                                            >

                                                {article.description}


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
                                                group-hover:text-[#FF6B4A]
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
                                                text-[#12BFAE]
                                                group-hover:bg-[#FF6B4A]
                                                group-hover:text-white
                                                flex
                                                items-center
                                                justify-center
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





                {
                    filteredArticles.length === 0 && (

                        <div

                            className="
                            text-center
                            py-20
                            text-gray-500
                            "

                        >

                            No articles found.

                        </div>

                    )

                }




            </div>




        </section>


    );


}