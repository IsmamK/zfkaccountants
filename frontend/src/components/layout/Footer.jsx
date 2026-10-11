"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useCms } from "@/components/cms/useCms";
import BrandLogo, { BRAND_LOGO } from "@/components/layout/BrandLogo";
import { CookieSettingsLink } from "@/components/seo/ConsentBanner";
import { mediaUrl } from "@/lib/api";

const defaults = {
    logo: BRAND_LOGO,
    logoAlt: "ZFK Accountants",
    // Shown only if the logo image is removed.
    logoText: "ZFK",
    logoHighlight: "Accountants",
    description:
        "Online UK accountants for quarterly VAT returns, monthly payroll, annual accounts and Self Assessment, working with clients across the UK.",
    quickLinksTitle: "Quick Links",
    quickLinks: [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Services", href: "/services" },
        { name: "Resources / Blog", href: "/resources" },
        { name: "FAQs", href: "/faqs" },
        { name: "Book a Consultation", href: "/contact" },
    ],
    servicesTitle: "Our Services",
    serviceLinks: [
        { name: "Quarterly VAT Returns", href: "/services/vat-returns" },
        { name: "Monthly Payroll", href: "/services/payroll" },
        { name: "Annual Accounts & Corporation Tax", href: "/services/annual-accounts" },
        { name: "Self Assessment Tax Returns", href: "/services/self-assessment" },
    ],
    contactTitle: "Get in Touch",
    remoteLabel: "How we work",
    remoteText: "100% online, for clients anywhere in the UK",
    bookingText: "Book a free consultation",
    bookingHref: "/contact",
    copyright: "ZFK Accountants. All rights reserved.",
    legalLinks: [
        { name: "Privacy Policy", href: "/legal#privacy" },
        { name: "Terms of Use", href: "/legal#terms" },
        { name: "Cookie Policy", href: "/legal#cookies" },
    ],
    cookieSettingsText: "Cookie settings",
};

export default function Footer() {
    const { data, E, editButton, hidden } = useCms("footer", defaults, { label: "Footer" });
    const pathname = usePathname() || "/";
    const loginHref = pathname.startsWith("/admin") ? "/admin/login" : `/admin/login?next=${encodeURIComponent(pathname)}`;

    // Hidden by an admin: nothing is rendered for visitors.
    if (hidden) return null;

    return (
        <footer className="site-footer relative">
            {editButton}

            <div className="footer-container">

                {/* Company Information */}
                <div className="footer-column footer-company">
                    <Link href="/" className="footer-logo relative">
                        {data.logo ? (
                            <BrandLogo src={mediaUrl(data.logo)} alt={data.logoAlt} className="footer-logo-img" />
                        ) : (
                            <>
                                <E.Text path="logoText" /> <span><E.Text path="logoHighlight" /></span>
                            </>
                        )}
                        <E.Image path="logo" />
                    </Link>

                    <p>
                        <E.Text path="description" />
                    </p>
                </div>

                {/* Quick Links */}
                <div className="footer-column">
                    <p className="footer-heading"><E.Text path="quickLinksTitle" /></p>

                    <nav aria-label="Footer navigation">
                        <ul>
                            {data.quickLinks.map((link, index) => (
                                <li className="relative" key={index}>
                                    <E.Item path="quickLinks" index={index} />
                                    <Link href={link.href}>
                                        <E.Text path={`quickLinks.${index}.name`} /><E.Link path={`quickLinks.${index}.href`} />
                                    </Link>
                                </li>
                            ))}
                            <E.Add path="quickLinks" label="Add link" />
                        </ul>
                    </nav>
                </div>

                {/* Services */}
                <div className="footer-column">
                    <p className="footer-heading"><E.Text path="servicesTitle" /></p>

                    <ul>
                        {data.serviceLinks.map((link, index) => (
                            <li className="relative" key={index}>
                                <E.Item path="serviceLinks" index={index} />
                                <Link href={link.href}>
                                    <E.Text path={`serviceLinks.${index}.name`} /><E.Link path={`serviceLinks.${index}.href`} />
                                </Link>
                            </li>
                        ))}
                        <E.Add path="serviceLinks" label="Add service link" />
                    </ul>
                </div>

                {/* Contact: remote and booking-led. No phone, address or email is shown;
                    bookings are emailed to Settings → Form notifications (FormSubmit). */}
                <div className="footer-column">
                    <p className="footer-heading"><E.Text path="contactTitle" /></p>

                    <address>
                        <p>
                            <strong><E.Text path="remoteLabel" /></strong>
                            <br />
                            <E.Text path="remoteText" />
                        </p>

                        <p>
                            <Link href={data.bookingHref} className="footer-booking">
                                <E.Text path="bookingText" /><E.Link path="bookingHref" /> <span aria-hidden="true">→</span>
                            </Link>
                        </p>
                    </address>
                </div>

            </div>

            {/* Bottom Footer */}
            <div className="footer-bottom">
                <div className="footer-container">
                    <p>
                        © {new Date().getFullYear()} <E.Text path="copyright" />
                    </p>

                    <div className="footer-legal-links">
                        {data.legalLinks.map((link, index) => (
                            <Link className="relative" key={index} href={link.href}>
                                <E.Item path="legalLinks" index={index} />
                                <E.Text path={`legalLinks.${index}.name`} /><E.Link path={`legalLinks.${index}.href`} />
                            </Link>
                        ))}
                        <E.Add path="legalLinks" label="Add link" />

                        {/* Re-opens the consent banner (R32). */}
                        <CookieSettingsLink className="cursor-pointer bg-transparent p-0 text-inherit hover:underline">
                            <E.Text path="cookieSettingsText" />
                        </CookieSettingsLink>

                        <Link href={loginHref} rel="nofollow">
                            Staff login {/* cms-static: admin entry point */}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
