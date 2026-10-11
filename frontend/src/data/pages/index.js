// Built-in content for CMS-managed pages. Rendered when the CMS has no
// published page at that path; `npm run cms:seed` copies them into the CMS.
import annualAccounts from "./annual-accounts.json";
import legal from "./legal.json";
import payroll from "./payroll.json";
import selfAssessment from "./self-assessment.json";
import vatReturns from "./vat-returns.json";

export const BUILTIN_PAGES = Object.fromEntries(
    [vatReturns, payroll, annualAccounts, selfAssessment, legal].map((page) => [page.path, page])
);

// Same shape the CMS returns for sections.
export function builtinSections(page) {
    return page.sections.map((section, index) => ({
        id: `builtin-${index}`,
        order: index,
        section_type: section.section_type,
        content: section.content,
        media: [],
    }));
}
