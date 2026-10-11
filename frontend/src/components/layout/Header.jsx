"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";

import { useCms } from "@/components/cms/useCms";
import BrandLogo, { BRAND_LOGO } from "@/components/layout/BrandLogo";
import { mediaUrl } from "@/lib/api";

const defaults = {
    logo: BRAND_LOGO,
    logoAlt: "ZFK Accountants",
    // Shown only if the logo image is removed.
    logoText: "ZFK",
    logoHighlight: "Accountants",
    navigation: [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        {
            name: "Services",
            href: "/services",
            // Dropdown (desktop) / expandable submenu (mobile).
            children: [
                { name: "Quarterly VAT Returns", href: "/services/vat-returns", description: "Prepared and filed every quarter through MTD" },
                { name: "Monthly Payroll", href: "/services/payroll", description: "Payslips, RTI and pensions, every month" },
                { name: "Annual Accounts & Corporation Tax", href: "/services/annual-accounts", description: "Year-end accounts and CT600 returns" },
                { name: "Self Assessment Tax Returns", href: "/services/self-assessment", description: "Personal tax returns, filed on time" },
            ],
            allText: "View all services",
        },
        { name: "Resources / Blog", href: "/resources" },
        { name: "FAQs", href: "/faqs" },
    ],
    ctaText: "Book a Consultation",
    ctaHref: "/contact",
};

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();
    const { data, E, editButton, hidden } = useCms("header", defaults, {
        label: "Header & navigation",
        excludeFromKeywordAudit: true,
        buttonPosition: "left-1/2 top-full mt-2 -translate-x-1/2",
    });
    const navigation = data.navigation;
    const [openMenu, setOpenMenu] = useState(null);      // desktop dropdown index
    const [openSubmenu, setOpenSubmenu] = useState(null); // mobile submenu index

    // Close menus on navigation and on Escape.
    useEffect(() => {
        setOpenMenu(null);
        setOpenSubmenu(null);
        setMobileOpen(false);
    }, [pathname]);
    useEffect(() => {
        const onKey = (event) => event.key === "Escape" && setOpenMenu(null);
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, []);

    // A clicked dropdown link keeps focus (which holds the panel open via
    // :focus-within), so close the menu and drop focus on click.
    const closeMenu = (event) => {
        setOpenMenu(null);
        event.currentTarget.blur();
    };

    const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

    // Hidden by an admin: nothing is rendered for visitors.
    if (hidden) return null;

    return (
        <header className="site-header">
            <div className="header-container">

                {/* Logo */}
                <Link
                    href="/"
                    className="site-logo relative"
                    onClick={() => setMobileOpen(false)}
                >
                    {data.logo ? (
                        <BrandLogo src={mediaUrl(data.logo)} alt={data.logoAlt} className="site-logo-img" priority />
                    ) : (
                        <>
                            <E.Text path="logoText" />{" "}
                            <span><E.Text path="logoHighlight" /></span>
                        </>
                    )}
                    <E.Image path="logo" />
                </Link>


                {/* Desktop Navigation */}
                <nav
                    className="desktop-nav"
                    aria-label="Primary navigation"
                >
                    {navigation.map((item, index) => {
                        const children = Array.isArray(item.children) ? item.children : [];
                        if (!children.length) {
                            return (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className={`relative nav-link ${isActive(item.href) ? "active" : ""}`}
                                >
                                    <E.Item path="navigation" index={index} />
                                    <E.Text path={`navigation.${index}.name`} /><E.Link path={`navigation.${index}.href`} />
                                </Link>
                            );
                        }
                        const open = openMenu === index;
                        const panelId = `nav-menu-${index}`;
                        return (
                            <div
                                key={index}
                                className={`nav-dropdown ${open ? "open" : ""}`}
                                onMouseEnter={() => setOpenMenu(index)}
                                onMouseLeave={() => setOpenMenu(null)}
                            >
                                <E.Item path="navigation" index={index} />
                                <Link
                                    href={item.href}
                                    className={`relative nav-link ${isActive(item.href) ? "active" : ""}`}
                                >
                                    <E.Text path={`navigation.${index}.name`} /><E.Link path={`navigation.${index}.href`} />
                                </Link>
                                <button
                                    type="button"
                                    className="nav-dropdown-toggle"
                                    aria-expanded={open}
                                    aria-controls={panelId}
                                    aria-label={`${item.name} menu`}
                                    onClick={() => setOpenMenu(open ? null : index)}
                                >
                                    <FaChevronDown aria-hidden="true" />
                                </button>

                                <div id={panelId} className="nav-dropdown-panel">
                                    <ul>
                                        {children.map((child, childIndex) => (
                                            <li key={childIndex} className="relative">
                                                <E.Item path={`navigation.${index}.children`} index={childIndex} />
                                                <Link
                                                    href={child.href}
                                                    className={`nav-dropdown-link ${isActive(child.href) ? "active" : ""}`}
                                                    onClick={closeMenu}
                                                >
                                                    <span className="nav-dropdown-title">
                                                        <E.Text path={`navigation.${index}.children.${childIndex}.name`} /><E.Link path={`navigation.${index}.children.${childIndex}.href`} />
                                                    </span>
                                                    {child.description ? (
                                                        <span className="nav-dropdown-desc">
                                                            <E.Text path={`navigation.${index}.children.${childIndex}.description`} />
                                                        </span>
                                                    ) : null}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                    <E.Add path={`navigation.${index}.children`} label="Add submenu link" />
                                    {item.allText ? (
                                        <Link href={item.href} className="nav-dropdown-all" onClick={closeMenu}>
                                            <E.Text path={`navigation.${index}.allText`} /> <span aria-hidden="true">→</span>
                                        </Link>
                                    ) : null}
                                </div>
                            </div>
                        );
                    })}
                    <E.Add path="navigation" label="Add menu item" />
                </nav>


                {/* Primary CTA */}
                <Link
                    href={data.ctaHref}
                    className="header-cta"
                >
                    <E.Text path="ctaText" /><E.Link path="ctaHref" />
                </Link>


                {/* Mobile Menu Button */}
                <button
                    type="button"
                    className="mobile-menu-button"
                    aria-label={
                        mobileOpen
                            ? "Close menu"
                            : "Open menu"
                    }
                    aria-expanded={mobileOpen}
                    onClick={() => setMobileOpen(!mobileOpen)}
                >
                    <span />
                    <span />
                    <span />
                </button>

            </div>


            {/* Mobile Navigation */}
            {mobileOpen && (
                <nav
                    className="mobile-nav"
                    aria-label="Mobile navigation"
                >
                    {navigation.map((item, index) => {
                        const children = Array.isArray(item.children) ? item.children : [];
                        if (!children.length) {
                            return (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className={`mobile-nav-link ${isActive(item.href) ? "active" : ""}`}
                                    onClick={() => setMobileOpen(false)}
                                >
                                    <E.Text path={`navigation.${index}.name`} /><E.Link path={`navigation.${index}.href`} />
                                </Link>
                            );
                        }
                        const expanded = openSubmenu === index;
                        return (
                            <div key={index} className="mobile-nav-group">
                                <div className="mobile-nav-row">
                                    <Link
                                        href={item.href}
                                        className={`mobile-nav-link ${isActive(item.href) ? "active" : ""}`}
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        <E.Text path={`navigation.${index}.name`} /><E.Link path={`navigation.${index}.href`} />
                                    </Link>
                                    <button
                                        type="button"
                                        className={`mobile-submenu-toggle ${expanded ? "open" : ""}`}
                                        aria-expanded={expanded}
                                        aria-controls={`mobile-menu-${index}`}
                                        aria-label={`${item.name} menu`}
                                        onClick={() => setOpenSubmenu(expanded ? null : index)}
                                    >
                                        <FaChevronDown aria-hidden="true" />
                                    </button>
                                </div>
                                {expanded ? (
                                    <ul id={`mobile-menu-${index}`} className="mobile-subnav">
                                        {children.map((child, childIndex) => (
                                            <li key={childIndex}>
                                                <Link
                                                    href={child.href}
                                                    className={`mobile-subnav-link ${isActive(child.href) ? "active" : ""}`}
                                                    onClick={() => setMobileOpen(false)}
                                                >
                                                    <E.Text path={`navigation.${index}.children.${childIndex}.name`} /><E.Link path={`navigation.${index}.children.${childIndex}.href`} />
                                                </Link>
                                            </li>
                                        ))}
                                        {item.allText ? (
                                            <li>
                                                <Link href={item.href} className="mobile-subnav-link mobile-subnav-all" onClick={() => setMobileOpen(false)}>
                                                    <E.Text path={`navigation.${index}.allText`} /> <span aria-hidden="true">→</span>
                                                </Link>
                                            </li>
                                        ) : null}
                                    </ul>
                                ) : null}
                            </div>
                        );
                    })}


                    <Link
                        href={data.ctaHref}
                        className="mobile-nav-cta"
                        onClick={() => setMobileOpen(false)}
                    >
                        <E.Text path="ctaText" /><E.Link path="ctaHref" />
                    </Link>

                </nav>
            )}

            {editButton}

        </header>
    );
}
