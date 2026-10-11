# ZFK Accountants — tracking plan (from dynamic-cms TRACKING_IMPLEMENTATION_PLAN, Appendix A)


**Facts used:**
- four service entries: `/services/vat-returns`, `/services/payroll`,
  `/services/annual-accounts`, `/services/self-assessment`;
- form `quote` with fields `business_type` (select), `services`
  (checkboxes), `preferred_date`, `preferred_time`, `meeting`, `message`;
- FAQ page with categories General, Data & Security, VAT, Payroll,
  Accounts, Self Assessment;
- a pricing block on `/services`;
- a "Who we help" block;
- no phone or address shown;
- `/resources` articles.

**Intents:** `vat`, `payroll`, `annual_accounts`, `self_assessment`. Each
matches its service path and its FAQ category, and the `services` option
values.

**Segments** (from the `business_type` options and the "Who we help"
items): `ltd_company`, `sole_trader`, `partnership`, `landlord`,
`contractor`, `individual`. Director-only signal: the FAQ "payroll for just
me as a director".

**Stages:**

| Stage | Signals |
|---|---|
| `switching` | FAQs "How do I switch…", "take over from my current payroll provider" |
| `urgency` | deadline FAQs (Self Assessment, VAT due, accounts filing), plus Self Assessment intent in December–January (a month param, not a rule) |
| `price` | pricing block seen; "How much…", "What affects the price?" |
| `starting` | "Do I need an accountant?", "Do I need to register for VAT?" |
| `remote_hesitation` | "Do I need to visit an office?", "How do I share my documents?", Data & Security FAQs |

**Conversions:**

| Id | Tier | Trigger | Meta |
|---|---|---|---|
| `booked` | primary | `generate_lead` form `quote` | Schedule |
| `booked_vat` | primary | `generate_lead` with services ∋ VAT | |
| `booked_payroll` | primary | `generate_lead` with services ∋ Payroll | |
| `booked_accounts` | primary | `generate_lead` with services ∋ Annual accounts | |
| `booked_sa` | primary | `generate_lead` with services ∋ Self Assessment | |
| `booking_intent` | secondary | `cta_click` to `/contact` | |
| `booking_abandoned` | secondary | `form_abandon` quote | |
| `service_engaged_*` | secondary | per intent | |
| `pricing_seen` | secondary | `section_view` of the pricing block | |
| `switching_signal` | secondary | `faq_open` with stage switching | |
| `guide_read` | secondary | `scroll_depth` 75 on an article | |

**Values:** off until the owner sets relative values per service (optional
`by_intent`).

**Audiences:**

| Audience | Purpose |
|---|---|
| Payroll / VAT / Accounts / Self Assessment interest, no booking (30 days) | service-specific reminder of the free consultation |
| Switching, no booking (60 days) | "we handle the handover" |
| Self Assessment interest, December–January | deadline reminder |
| Price checkers, no booking | "tailored quote, no obligation" |
| Guide readers (90 days) | nurture with more guides |
| Exclusion: booked (180 days) and Contacts marked Client | |

**Not used:** call or email clicks (none shown), directions, downloads,
e-commerce, health or other restricted categories.

**Site changes needed for ZFK:**
- `track` spreads on all `useCms` roots;
- `data-track-faq` on the FAQ accordions;
- `data-track-cta` on the Book buttons;
- the `consent_marketing` field added to the quote form (unticked);
- the privacy page updated with the analytics, enquiry-record and
  retention paragraphs;
- the consent banner styled to the theme;
- the footer "Cookie settings" link.
