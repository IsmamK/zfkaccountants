import Link from "next/link";
import AboutHero from "@/components/about/AboutHero";
import AboutStory from "@/components/about/AboutStory";
import AboutTeam from "@/components/about/AboutTeam";
import AboutApproach from "@/components/about/AboutApproach";
import AboutSupport from "@/components/about/AboutSupport";
import CmsSection from "@/components/cms/CmsSection";
import PageSeo from "@/components/seo/PageSeo";
import { pageMetadata } from "@/lib/seo";

const fallbackMetadata = {
    title: "About Us | Online UK Accountants",
    description:
        "Meet ZFK Accountants, a team of UK accountants and tax advisors helping limited companies, sole traders, contractors and landlords stay compliant.",
};

export function generateMetadata() {
    return pageMetadata("/about", fallbackMetadata);
}


export default function AboutPage() {

    return (

        <CmsSection names={["about-hero", "about-story", "about-team", "about-approach", "about-support"]}>
        <div className="overflow-hidden bg-white">


            {/* HERO */}

            <AboutHero />



            {/* PREMIUM STORY SECTION */}

            <AboutStory />
            <AboutTeam />
            <AboutApproach />
            <AboutSupport />

















        </div>

        <PageSeo path="/about" />
        </CmsSection>

    );

}