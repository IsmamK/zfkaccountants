"use client";

import {
    useState
} from "react";

import {
    motion,
    AnimatePresence
} from "framer-motion";

import { useFaqs } from "@/components/faqs/faqContent";



export default function FAQAccordion({
    selectedCategory,
    search = ""
}) {


    const [open, setOpen] = useState(null);

    const { faqData, categories, E, hidden } = useFaqs();
    const categoryIndex = categories.findIndex((c) => c.name === selectedCategory);

    const query = search.trim().toLowerCase();


    // A search looks across every category; otherwise show the chosen one.
    const questions = query
        ? Object.values(faqData).flat().filter(
            (item) =>
                item.q.toLowerCase().includes(query) ||
                item.a.toLowerCase().includes(query)
        )
        : faqData[selectedCategory] || [];



    // Hidden by an admin: nothing is rendered for visitors.
    if (hidden) return null;

    return (

        <motion.div

            id="faq-answers"

            key={query ? `search-${query}` : selectedCategory}

            initial={{
                opacity: 0,
                y: 20
            }}

            animate={{
                opacity: 1,
                y: 0
            }}

            className="
bg-white
rounded-3xl
p-8
shadow-sm
"


        >


            <div
                className="
border-l-4
border-[#FF6B4A]
pl-5
"
            >

                <p
                    className="
text-[#0F9E86]
tracking-[5px]
text-xs
font-bold
"
                >
                    {query ? "Search results" : selectedCategory}
                </p>


                <h2
                    className="
font-serif
text-[#123A5C]
text-[32px]
font-bold
"
                >
                    {query ? `Results for “${search.trim()}”` : `${selectedCategory} FAQs`}
                </h2>


            </div>




            <div className="
mt-8
space-y-4
">


                {
                    questions.map((item, index) => {


                        const active = open === index;


                        return (

                            <div
                                key={index}
                                className="
relative
rounded-2xl
overflow-hidden
border
border-[#123A5C]/20
"
                            >
                                {!query ? <E.Item path={`categories.${categoryIndex}.questions`} index={index}/> : null}


                                <button
                                    type="button"
                                    aria-expanded={active}
                                    data-track-faq-topic={selectedCategory || undefined}
                                    onClick={() =>
                                        setOpen(
                                            active ? null : index
                                        )
                                    }

                                    className={`
w-full
flex
justify-between
items-center
px-6
py-5
text-left
transition

${active
                                            ?
                                            "bg-[#123A5C] text-white"
                                            :
                                            "bg-white text-[#123A5C]"
                                        }

`}

                                >


                                    <span
                                        className="
font-semibold
"
                                    >
                                        {query ? item.q : <E.Text path={`categories.${categoryIndex}.questions.${index}.q`} />}
                                    </span>



                                    <span
                                        className={`
w-8
h-8
rounded-full
flex
items-center
justify-center
font-bold

${active
                                                ?
                                                "bg-[#FF6B4A] text-white"
                                                :
                                                "bg-[#EAF6F4] text-[#0F9E86]"
                                            }

`}
                                    >
                                        {
                                            active
                                                ?
                                                "−"
                                                :
                                                "+"
                                        }
                                    </span>


                                </button>



                                <AnimatePresence>


                                    {
                                        active &&

                                        <motion.div

                                            initial={{
                                                height: 0,
                                                opacity: 0
                                            }}

                                            animate={{
                                                height: "auto",
                                                opacity: 1
                                            }}

                                            exit={{
                                                height: 0,
                                                opacity: 0
                                            }}

                                            className="
bg-[#F4F7F6]
px-6
py-5
text-[#2B2E33]
"

                                        >

                                            {query ? item.a : <E.Text path={`categories.${categoryIndex}.questions.${index}.a`} multiline />}

                                        </motion.div>

                                    }


                                </AnimatePresence>



                            </div>


                        )


                    })
                }

                {!query && categoryIndex >= 0 ? <E.Add path={`categories.${categoryIndex}.questions`} label="Add question" /> : null}

                {questions.length === 0 ? (
                    <p className="text-[#475569]">
                        No matching questions were found.
                    </p>
                ) : null}

            </div>



        </motion.div>


    )

}