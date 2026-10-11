import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/home/CTASection";
import CmsSection from "@/components/cms/CmsSection";


export default function SiteLayout({ children }) {

    return (

        <CmsSection names={["header", "footer", "cta-section", "form-quote"]}>

            <Header />

            <main>
                {children}
            </main>


            <CTASection />


            <Footer />

        </CmsSection>

    );
}
