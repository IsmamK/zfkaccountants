import ServicesHero from "@/components/services/ServicesHero";

import WhoWeHelp from "@/components/services/WhoWeHelp";
import ServiceProcess from "@/components/services/ProcessSection";
import ServicesBenefits from "@/components/services/ServicesBenefits";
import ServicesPricing from "@/components/services/ServicesPricing";
import CmsSection from "@/components/cms/CmsSection";
import PageSeo from "@/components/seo/PageSeo";
import { pageMetadata } from "@/lib/seo";

const fallbackMetadata = {
    title: "Online Accounting Services for UK Businesses",
    description:
        "Quarterly VAT returns, monthly payroll, annual accounts, Corporation Tax and Self Assessment for UK businesses, delivered 100% online with tailored quotes.",
};

export function generateMetadata() {
    return pageMetadata("/services", fallbackMetadata);
}


export default function ServicesPage() {

    return (

        <CmsSection names={["services-hero", "services-who-we-help", "services-process", "services-pricing", "services-benefits"]}>

            <ServicesHero />



            <WhoWeHelp />

            <ServiceProcess />

            <ServicesPricing />

            <ServicesBenefits />


            <PageSeo path="/services" />

        </CmsSection>

    )

}