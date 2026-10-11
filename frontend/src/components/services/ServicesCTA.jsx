"use client";

import Link from "next/link";
import { motion } from "framer-motion";


export default function GetStartedSection() {


    return (

        <section
            className="
            relative
            isolate
            h-[var(--ae-vh)]
            max-h-[900px]
            min-h-[720px]
            overflow-hidden
            bg-[#F8FBFF]
            "
        >



            {/* BACKGROUND EFFECTS */}


            <motion.div

                animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.35, 0.6, 0.35]
                }}

                transition={{
                    duration: 10,
                    repeat: Infinity
                }}

                className="
                absolute
                -top-48
                -right-48
                w-[600px]
                h-[600px]
                rounded-full
                bg-[#DCEAFF]
                blur-3xl
                "
            />



            <motion.div

                animate={{
                    y: [0, -30, 0]
                }}

                transition={{
                    duration: 12,
                    repeat: Infinity
                }}

                className="
                absolute
                -bottom-60
                -left-40
                w-[550px]
                h-[550px]
                rounded-full
                bg-[#DDF7F2]
                blur-3xl
                opacity-60
                "
            />





            <div
                className="
                relative
                z-10
                max-w-[1400px]
                mx-auto
                h-full
                px-8
                lg:px-14
                grid
                lg:grid-cols-2
                gap-8
                items-center
                "
            >





                {/* LEFT SIDE */}


                <motion.div

                    initial={{
                        opacity: 0,
                        x: -40
                    }}

                    whileInView={{
                        opacity: 1,
                        x: 0
                    }}

                    viewport={{
                        once: true
                    }}

                    transition={{
                        duration: .8
                    }}

                >


                    <div
                        className="
                        flex
                        items-center
                        gap-5
                        mb-7
                        text-[#11B89C]
                        tracking-[6px]
                        text-sm
                        "
                    >

                        <span
                            className="
                            w-16
                            h-[2px]
                            bg-[#11B89C]
                            "
                        />

                        GET STARTED TODAY


                    </div>





                    <h2
                        className="
                        font-serif
                        font-bold
                        text-[#123A5C]
                        text-[58px]
                        xl:text-[72px]
                        leading-[1.05]
                        "
                    >

                        Ready when

                        <br />

                        <span
                            className="
                            text-[#FF6B4A]
                            "
                        >
                            you are.
                        </span>


                    </h2>





                    <p
                        className="
                        mt-7
                        max-w-xl
                        text-[#123A5C]/75
                        text-lg
                        leading-8
                        "
                    >

                        No complicated forms. No pressure.
                        Just a friendly conversation about
                        how we can support you.

                    </p>






                    <div
                        className="
                        flex
                        gap-5
                        mt-8
                        "
                    >

                        <Link
                href={"/contact"}
                            className="inline-block 
                            bg-[#FF6B4A]
                            text-white
                            px-9
                            py-4
                            rounded-xl
                            font-semibold
                            shadow-xl
                            hover:scale-105
                            transition
                            "
                        >

                            Get in Touch →

                        </Link>




                        <Link
                href={"/contact"}
                            className="inline-block 
                            bg-white
                            border
                            border-[#C9D8E8]
                            text-[#123A5C]
                            px-8
                            py-4
                            rounded-xl
                            font-semibold
                            hover:-translate-y-1
                            transition
                            "
                        >

                            ☎
                            <span className="ml-2">
                                Request a Callback
                            </span>


                        </Link>


                    </div>




                </motion.div>









                {/* RIGHT SIDE */}



                <div
                    className="
                    relative
                    h-[520px]
                    flex
                    items-center
                    justify-center
                    "
                >






                    {/* BACK GLASS LAYER */}


                    <motion.div

                        animate={{
                            rotate: [12, 15, 12],
                            y: [0, -12, 0]
                        }}

                        transition={{
                            duration: 7,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}

                        className="
                        absolute
                        w-[360px]
                        h-[440px]
                        rounded-[40px]
                        bg-white/40
                        backdrop-blur-xl
                        border
                        border-white
                        "
                    />







                    {/* MAIN CARD */}



                    <motion.div

                        animate={{
                            rotate: [-8, -11, -8],
                            y: [0, -20, 0]
                        }}

                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}

                        className="
                        relative
                        z-20
                        w-[330px]
                        h-[430px]
                        rounded-[40px]
                        bg-white/80
                        backdrop-blur-2xl
                        shadow-2xl
                        border
                        border-white
                        flex
                        flex-col
                        items-center
                        justify-center
                        "
                    >





                        <motion.div

                            animate={{
                                y: [0, -10, 0]
                            }}

                            transition={{
                                duration: 3,
                                repeat: Infinity
                            }}

                            className="
                            w-20
                            h-20
                            rounded-3xl
                            bg-[#DCEAFF]
                            flex
                            items-center
                            justify-center
                            text-4xl
                            "
                        >

                            📅

                        </motion.div>






                        <h3
                            className="
                            mt-8
                            text-[#123A5C]
                            font-serif
                            font-bold
                            text-3xl
                            text-center
                            leading-tight
                            "
                        >

                            Book a free

                            <br />

                            consultation

                        </h3>






                        <div
                            className="
                            flex
                            -space-x-4
                            mt-10
                            "
                        >

                            {
                                [1, 2, 3].map((x, index) => (

                                    <motion.div

                                        key={index}

                                        animate={{
                                            y: [0, -8, 0]
                                        }}

                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            delay: x * .3
                                        }}

                                        className="
                                        w-16
                                        h-16
                                        rounded-full
                                        bg-[#DDF7F2]
                                        border-4
                                        border-white
                                        flex
                                        items-center
                                        justify-center
                                        "
                                    >

                                        👤

                                    </motion.div>

                                ))
                            }

                        </div>



                    </motion.div>







                    {/* SMALL FLOATING ELEMENTS */}



                    <FloatingBox
                        text="Quick reply"
                        icon="💬"
                        className="top-24 left-0"
                    />


                    <FloatingBox
                        text="Expert advice"
                        icon="✓"
                        className="bottom-24 right-0"
                    />



                </div>


            </div>




            {/* BENEFITS */}



            <div
                className="
                absolute
                bottom-12
                left-1/2
                -translate-x-1/2
                w-full
                max-w-[1050px]
                px-8
                "
            >

                <div
                    className="
                    grid
                    md:grid-cols-3
                    gap-8
                    "
                >

                    <Benefit icon="📅" title="Choose a time" text="that works for you" />
                    <Benefit icon="💬" title="Speak with" text="real person" />
                    <Benefit icon="👤" title="Get clear advice" text="tailored to your needs" />


                </div>

            </div>



        </section>

    )

}






function FloatingBox({
    icon,
    text,
    className
}) {


    return (

        <motion.div

            animate={{
                y: [0, -14, 0],
                rotate: [0, 2, 0]
            }}

            transition={{
                duration: 5,
                repeat: Infinity
            }}

            className={`
            absolute
            z-30
            bg-white/90
            backdrop-blur-xl
            shadow-xl
            rounded-2xl
            px-5
            py-4
            text-[#123A5C]
            font-semibold
            flex
            gap-3
            items-center
            ${className}
            `}

        >

            {icon}

            {text}

        </motion.div>

    )

}







function Benefit({
    icon,
    title,
    text
}) {

    return (

        <div
            className="
            flex
            items-center
            gap-4
            "
        >

            <div
                className="
                w-14
                h-14
                rounded-full
                bg-[#DDF7F2]
                flex
                items-center
                justify-center
                "
            >

                {icon}

            </div>


            <div>

                <h4
                    className="
                    font-bold
                    text-[#123A5C]
                    "
                >

                    {title}

                </h4>


                <p
                    className="
                    text-[#123A5C]/70
                    "
                >

                    {text}

                </p>


            </div>


        </div>

    )

}