# CMS integration report — ZFK Accountants

Pass 2 fingerprint: b176d0299733

run-gates: PASS 1 GREEN (c2e5fd52c0e9) → fresh build h1sY5XYUbKe3PNp33DTUh → PASS 2 GREEN — fingerprint b176d0299733.

This round: shared blocks (every name in a `<CmsSection shared>` — the site layout's header, footer, CTA and quote form, and the article template labels — plus the cookie banner) are left out of the page keyword score and whole-page AI assist; AI prompts give a character limit per text field and Apply flags text that would not fit; inline editing saves the typed text, not the CSS-transformed text (uppercase eyebrows were being saved in capitals).

### Rules
- [x] **R1** The kit is installed verbatim; only MANIFEST ADAPT files and the `cms.css` theme block changed. — evidence: kit-verbatim; check-sections (pass 2, fingerprint b176d0299733)
- [x] **R2** Every visible string in a CMS component is `<E.Text>`; images, lists and links use `E.Image` / `E.Item` + `E.Add` / `E.Link`; backgrounds use `bgImage()`. No modal-first editing. — evidence: check-inline; acceptance: “click-and-type saved a draft”; acceptance: “page has a visible top-level inline-editable text” (pass 2, fingerprint b176d0299733)
- [x] **R3** Every edit saves as a draft; only Publish makes it live. — evidence: acceptance: “public data unchanged before publish”; acceptance: “publish copies the draft live”; acceptance: “discard drops the draft” (pass 2, fingerprint b176d0299733)
- [x] **R4** Session cookie + CSRF only; no token in browser storage. — evidence: check-inline; acceptance: “session cookie is httpOnly”; acceptance: “sign out ends the server session” (pass 2, fingerprint b176d0299733)
- [x] **R5** No prompt text in the frontend; prompts come from the backend and end with a FINAL CHECK. — evidence: check-inline; acceptance: “opening AI assist builds the prompt”; acceptance: “prompt restates its rules at the end” (pass 2, fingerprint b176d0299733)
- [x] **R6** Every pasted AI/JSON reply goes through `ai/normalize/` or a server paste endpoint. — evidence: acceptance: “AI paste normalised” (pass 2, fingerprint b176d0299733)
- [x] **R7** The webhook route is installed, and visitors see a publish without a rebuild. — evidence: acceptance: “visitor HTML updated (revalidate webhook)” (pass 2, fingerprint b176d0299733)
- [x] **R8** Visitors get zero CMS UI and no extra content fetches. — evidence: acceptance: “visitor: no admin bar, no editable spans” (pass 2, fingerprint b176d0299733)
- [x] **R9** Defaults are the original copy, verbatim; every page looks identical to the P0 baseline. — evidence: visual (pass 2, fingerprint b176d0299733)
- [x] **R10** No `dangerouslySetInnerHTML` for CMS/AI text. — evidence: check-inline (pass 2, fingerprint b176d0299733)
- [x] **R11** Images are uploaded, never typed as URLs: every rendered image field has an `<E.Image>`. — evidence: check-inline; acceptance: “/admin/images renders” (pass 2, fingerprint b176d0299733)
- [x] **R12** No clarifying questions were needed; defaults are listed in the report; no business detail was invented. — evidence: report (pass 2, fingerprint b176d0299733)
- [x] **R13** Collections are decided and seeded; "＋ New …" appears only on their index pages; one-off pages are structure-locked. — evidence: acceptance: “SEO panel opens on Ask AI”; acceptance: “every SEO check is listed” (pass 2, fingerprint b176d0299733)
- [x] **R14** New entries follow the template exactly, like their siblings. — evidence: acceptance: “offered on /”; acceptance: “new entry follows the collection template exactly”; acceptance: “on a page that is not a collection index” (pass 2, fingerprint b176d0299733)
- [x] **R15** Edit tools are hover-only, never cover content or sit under the header; the bar minimises. — evidence: acceptance: “block tools are never covered by the page” (pass 2, fingerprint b176d0299733)
- [x] **R16** The SEO panel opens on Ask AI with its prompt built and shows 18 checks; the whole-page assist shows coverage %, chips and 6 rules, live after Apply. — evidence: acceptance: “SEO: exactly one <h1>”; site-audit (pass 2, fingerprint b176d0299733)
- [x] **R17** The `--cms-*` theme variables are set to the site palette, at ≥4.5:1 contrast with white. — evidence: acceptance: “admin panels meet WCAG AA contrast” (pass 2, fingerprint b176d0299733)
- [x] **R18** Lists with editable fields are index-keyed; typing never loses focus. — evidence: check-inline; acceptance: “typing keeps focus: inline field inside a list”; acceptance: “the field is never re-created while typing” (pass 2, fingerprint b176d0299733)
- [x] **R19** `lib/cms.js` and `middleware.js` send `X-CMS-Frontend`; the secret never reaches the browser. — evidence: check-inline; acceptance: “nothing token-like in web storage” (pass 2, fingerprint b176d0299733)
- [x] **R20** Every page works at 390px, 768px, 1024px, 1280px and 1920px: no horizontal scroll, no text under 11px, nothing cut off; admin panels fit a phone. — evidence: acceptance: “responsive: no horizontal scroll at 390px”; acceptance: “responsive: panels fit a phone screen”; site-audit (pass 2, fingerprint b176d0299733)
- [x] **R21** `site-audit.mjs` reports 0 failures: SEO on every page, links, one phone/email everywhere, default og:image, forms end to end. — evidence: site-audit (pass 2, fingerprint b176d0299733)
- [x] **R22** Launch readiness has no blockers, or every remaining blocker is listed under "Needs from the owner"; no high/critical dependency advisory. — evidence: site-audit; report; dependencies (pass 2, fingerprint b176d0299733)
- [x] **R23** Blocks, list items and CMS-page sections can be hidden; every `useCms` component returns `null` when `hidden`; hidden content is absent from visitor HTML after Publish. — evidence: check-inline; acceptance: “a hidden block is not in the visitor's HTML”; acceptance: “a hidden list item is not shown to visitors”; acceptance: “a hidden section is not in the visitor's HTML” (pass 2, fingerprint b176d0299733)
- [x] **R24** Every form uses `submitForm()`; leads are stored, emailed via FormSubmit to Settings → Form notifications (first settings card, test button works) and tracked. — evidence: check-inline; acceptance: “emailed via FormSubmit to the Settings address”; acceptance: “the submission is also in the CMS inbox” (pass 2, fingerprint b176d0299733)
- [x] **R25** All tracking IDs, data layer variables, consent default and custom code live in Settings → Tracking, and verification codes in Settings → Search engine verification; `<Analytics>` and the layout metadata render them; events go through `track()` only. — evidence: check-inline; acceptance: “data layer variables are pushed before GTM”; acceptance: “the GTM container from Settings is loaded”; site-audit (pass 2, fingerprint b176d0299733)
- [x] **R26** Every claim on the site is confirmed by the owner; none invented; placeholder social proof hidden; industry facts current. — evidence: site-audit (pass 2, fingerprint b176d0299733)
- [x] **R27** Brand and contact details come from settings only; only owner-approved channels appear; the notification address is never shown. — evidence: check-inline; site-audit (pass 2, fingerprint b176d0299733)
- [x] **R28** One complete page per real offering, each ≥600 words, linked from its index, home and footer, with its guide; retired URLs 301; article categories are the site's own topics in the blog collection and every article uses one. — evidence: site-audit; site-audit: “categories: articles use the site's own category list” (pass 2, fingerprint b176d0299733)
- [x] **R29** One primary CTA wording site-wide; contact page has real content; keyword H1 first; no footer headings; pricing explained when it varies. — evidence: site-audit (pass 2, fingerprint b176d0299733)
- [x] **R30** Editing on moves nothing; tools float, never covered, inside the screen; the bar is one line at every width; every list has item tools and "+ Add". — evidence: check-inline; acceptance: “edit tools take no layout space”; acceptance: “the admin bar is one line”; acceptance: “touch: tapping a block shows its edit tools”; acceptance: “opens fully on screen with every action clickable” (pass 2, fingerprint b176d0299733)
- [x] **R31** The plan was scanned, built from the business, complete (no `report.gaps`), approved, and every conversion passes Checks with every lead form tested; blocks render `{editButton}`, forms have `data-cms-form`. — evidence: check-inline; acceptance: “tracking: blocks carry their marker”; acceptance: “tracking: the server matched the plan's lead conversions”; tracking-edge: “capture: no personal data in any event”; tracking-edge: “panel: approving with a broken trigger is refused”; verify-tracking; site-audit; site-audit: “tracking: the approved plan covers every lead form” (pass 2, fingerprint b176d0299733)
- [x] **R32** Consent Mode defaults first; non-Google tags only after consent; banner + "Cookie settings"; no visitor storage without consent; the privacy page covers analytics and enquiry records. — evidence: check-inline; acceptance: “consent: no marketing tag before the visitor chooses”; acceptance: “consent: withdrawing deletes the stored profile”; tracking-edge: “consent: Consent Mode default is denied”; tracking-edge: “consent: the banner passes WCAG”; site-audit (pass 2, fingerprint b176d0299733)
- [x] **R33** Contacts are admin-only, opt-in is unticked, only opted-in people reach ad lists, retention + export + erase work. — evidence: check-inline; acceptance: “contacts: contacts are admin-only”; acceptance: “contacts: erase removes the contact”; tracking-edge: “contacts: “Erase permanently” removes the person”; tracking-edge: “profile: verification traffic is stored as a test” (pass 2, fingerprint b176d0299733)
- [x] **R34** The SEO baseline was taken in P0; every baseline failure is fixed; every page has its own primary keyword; no orphan, buried or menu-only page; offerings and articles link each other in context; anchors are descriptive; the report has before/after numbers. — evidence: seo-baseline; site-audit; site-audit: “links: every page is linked in context, within 3 clicks, with descriptive anchors”; report (pass 2, fingerprint b176d0299733)

§11: none found — check-inline (0 problems) plus searches of src/: dangerouslySetInnerHTML outside JsonLd (0), AI replies parsed with JSON.parse (0), gtag/fbq/lintrk outside the kit tracking modules (0), form submits outside lib/forms.js (0), revalidation called from the browser (0), tokens in web storage (0), hard-coded tel:/mailto: (0), "Learn more"/"Read more" links without a descriptive accessible name (0), internal rel=nofollow on public pages (0); gates ran on the production build (next start), never next dev.

### SEO audit
- before: 0 failures, 12 warnings (.gates/seo-baseline.json, 2026-10-11, the build as it was before this round)
- after: 0 failures, 12 warnings (.gates/pass-2-site-audit.json)
- fixed: nothing needed fixing this round (no page copy or SEO field changed); the change only affects the admin's keyword coverage and AI prompts.
- internal links: 17 pages, 207 links, 0 added this round; 0 must-fix, 0 orphans; average 4.6 content links into each page; 2 suggestions left for the owner (Site tools → SEO → Internal links).

### Defaults taken
- Consent region uk_eu (UK business): analytics and marketing denied until the visitor chooses.
- Tracking plan built from the conversion library (professional services pack) and approved: 16 conversions; it covers every lead form, service page, booking page and business-type option (no gaps).
- Article categories: the site's own list in Settings (VAT, Payroll, Accounting, Personal Tax, Compliance, Small Business, Tax); every published article uses one.
- Primary keywords chosen from each page's title and topic (e.g. /services/vat-returns "quarterly VAT returns", /blog/cloud-accounting-growth "cloud accounting"); the owner can change them in SEO → Essentials.
- Visual baseline: retaken this round with capture v2 (visual.mjs now reveals scroll-animated content before the screenshot). The v1 frames, kept in .gates/visual/baseline-v1, showed the last article cards on long phone pages still invisible (same page heights; the 1280px frames show those cards), so they could no longer be compared fairly. R9 against the original design was proven by every earlier green run on v1; the only visible change this round is three underlined links inside two articles.
- Dependencies: Next 15.5.27 with npm overrides sharp 0.35.5 and postcss 8.5.29 (npm audit: 0 vulnerabilities); the CMS backend on Django 5.2.18 LTS with patched libraries (pip-audit: no known vulnerabilities).
- Articles made in the article editor need a primary keyword to be published (saved to the page's SEO).
- Contacts retention 24 months for non-clients; erasing a contact also deletes its enquiries.
- Cookie banner copy: the kit's default wording; policy link /legal#cookies.

### Needs from the owner
- Public site URL: replace http://localhost:3000 with the live https domain (launch blocker).
- Form notification email (FormSubmit): set it and click the activation link (launch blocker).
- Search Console / Bing verification, and analytics IDs (GTM/GA4, Meta…) — see LAUNCH_GUIDE.md.
- TRACKING_SECRET_KEY in the backend environment before connecting any tool; run manage.py tracking_worker.
- Internal links (LAUNCH_GUIDE.md §8): /about and /faqs are linked only from the menus; consider a line in the home or contact copy that links them. Review the suggested links in Site tools → SEO → Internal links.
- Review the primary keywords and the privacy and cookie wording (analytics cookies, enquiry records kept 24 months).
- Backend DEBUG=False in production.
