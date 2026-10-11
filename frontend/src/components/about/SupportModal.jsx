"use client";

import { motion } from "framer-motion";


export default function SupportModal({
    card,
    close
}) {

    return (

        <div
            className="
            fixed
            inset-0
            z-[200]
            flex
            items-center
            justify-center
            bg-black/40
            backdrop-blur-sm
            px-5
            "
            onClick={close}
        >


            <motion.div

                initial={{
                    opacity: 0,
                    scale: 0.85,
                    y: 30
                }}

                animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0
                }}

                exit={{
                    opacity: 0,
                    scale: 0.85
                }}

                transition={{
                    duration: 0.35
                }}


                onClick={(e) => e.stopPropagation()}


                className="
                relative
                w-full
                max-w-[460px]
                rounded-3xl
                bg-white
                p-8
                shadow-2xl
                "

            >


                {/* CLOSE */}

                <button

                    onClick={close}

                    className="
                    absolute
                    right-5
                    top-5
                    text-2xl
                    text-gray-400
                    hover:text-[#FF6B4A]
                    "

                >
                    ×

                </button>




                {/* ICON */}

                <div

                    className="
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-full
                    bg-[#E8F7F6]
                    text-3xl
                    text-[#0F9E86]
                    "

                >

                    {card.icon}

                </div>





                <h2

                    className="
                    mt-6
                    font-serif
                    text-3xl
                    font-bold
                    text-[#123A5C]
                    "

                >

                    {card.title}

                </h2>




                <p

                    className="
                    mt-4
                    text-base
                    leading-7
                    text-[#52627A]
                    "

                >

                    {card.text}

                </p>





                <div

                    className="
                    mt-6
                    space-y-3
                    text-[#123A5C]
                    "

                >

                    <p>
                        ✓ Annual accounts preparation
                    </p>

                    <p>
                        ✓ Tax compliance support
                    </p>

                    <p>
                        ✓ HMRC guidance
                    </p>

                    <p>
                        ✓ Business planning advice
                    </p>


                </div>






                <button

                    onClick={close}

                    className="
                    mt-8
                    rounded-xl
                    bg-[#FF6B4A]
                    px-8
                    py-3
                    font-semibold
                    text-white
                    transition
                    hover:-translate-y-1
                    "

                >

                    Close

                </button>




            </motion.div>


        </div>

    )

}