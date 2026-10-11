import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import ServicesOverview from "@/components/home/ServicesOverview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Process from "@/components/home/Process";
import Testimonials from "@/components/home/Testimonials";
import BlogPreview from "@/components/home/BlogPreview";
import CmsSection from "@/components/cms/CmsSection";
import PageSeo from "@/components/seo/PageSeo";
import { pageMetadata } from "@/lib/seo";
import { articlesFrom } from "@/lib/blog";
import { getBlogPosts } from "@/lib/cms";

const fallbackMetadata = {
    title: "Online Accountants for UK Businesses | VAT, Payroll & Tax",
    description:
        "Online UK accountants for quarterly VAT returns, monthly payroll, annual accounts and Self Assessment. 100% remote. Book a free consultation today.",
};

export function generateMetadata() {
    return pageMetadata("/", fallbackMetadata);
}


export default async function HomePage() {

    const articles = articlesFrom(await getBlogPosts());

    return (
        <CmsSection
            names={[
                "home-hero",
                "home-trust-bar",
                "home-services",
                "home-why-choose-us",
                "home-process",
                "home-testimonials",
                "home-blog-preview",
            ]}
        >

            {/* HERO + FLOATING TRUST BAR */}
            <section className="relative">

                <Hero />


                <div
                    className="
                    hidden
                    lg:block
                    absolute
                    left-0
                    right-0
                    bottom-[-25px]
                    z-30
                    "
                >

                    <TrustBar />

                </div>


            </section>



            {/* MAIN CONTENT */}

            <div>


                {/* SERVICES */}

                <div
                    className="
    relative
    z-10
    mt-0
    lg:-mt-8
    max-lg:[&>section]:mt-0
"
                >
                    <ServicesOverview />
                </div>



                <WhyChooseUs />

                <Process />

                {/* TESTIMONIALS */}

                <Testimonials />

                {/* LATEST ARTICLES */}

                <BlogPreview articles={articles} />






            </div>

            <PageSeo path="/" />

        </CmsSection>
    );
}
