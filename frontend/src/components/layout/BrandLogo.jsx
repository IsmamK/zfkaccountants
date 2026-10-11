import Image from "next/image";

import { SITE_NAME } from "@/lib/brand";

// The horizontal ZFK Accountants logo (for dark backgrounds). Brand assets
// live in public/images/brand/; the header and footer can swap it in the CMS.
export const BRAND_LOGO = "/images/brand/zfk-logo-horizontal.png";

export default function BrandLogo({ src = BRAND_LOGO, alt = SITE_NAME, className = "", priority = false, sizes = "320px" }) {
    return <Image src={src} alt={alt || SITE_NAME} width={880} height={89} sizes={sizes} priority={priority} className={className} />;
}
