# Rule evidence — pass 2 (fingerprint 01f35b14d008)

| Rule | Proven | Evidence |
|---|---|---|
| R1 | yes | kit-verbatim; check-sections |
| R2 | yes | check-inline; acceptance: “click-and-type saved a draft”; acceptance: “page has a visible top-level inline-editable text” |
| R3 | yes | acceptance: “public data unchanged before publish”; acceptance: “publish copies the draft live”; acceptance: “discard drops the draft” |
| R4 | yes | check-inline; acceptance: “session cookie is httpOnly”; acceptance: “sign out ends the server session” |
| R5 | yes | check-inline; acceptance: “opening AI assist builds the prompt”; acceptance: “prompt restates its rules at the end” |
| R6 | yes | acceptance: “AI paste normalised” |
| R7 | yes | acceptance: “visitor HTML updated (revalidate webhook)” |
| R8 | yes | acceptance: “visitor: no admin bar, no editable spans” |
| R9 | yes | visual |
| R10 | yes | check-inline |
| R11 | yes | check-inline; acceptance: “/admin/images renders” |
| R12 | yes (report in pass 3) | report |
| R13 | yes | acceptance: “SEO panel opens on Ask AI”; acceptance: “every SEO check is listed” |
| R14 | yes | acceptance: “offered on /”; acceptance: “new entry follows the collection template exactly”; acceptance: “on a page that is not a collection index” |
| R15 | yes | acceptance: “block tools are never covered by the page” |
| R16 | yes | acceptance: “SEO: exactly one <h1>”; site-audit |
| R17 | yes | acceptance: “admin panels meet WCAG AA contrast” |
| R18 | yes | check-inline; acceptance: “typing keeps focus: inline field inside a list”; acceptance: “the field is never re-created while typing” |
| R19 | yes | check-inline; acceptance: “nothing token-like in web storage” |
| R20 | yes | acceptance: “responsive: no horizontal scroll at 390px”; acceptance: “responsive: panels fit a phone screen”; site-audit |
| R21 | yes | site-audit |
| R22 | yes (report in pass 3) | site-audit; report |
| R23 | yes | check-inline; acceptance: “a hidden block is not in the visitor's HTML”; acceptance: “a hidden list item is not shown to visitors”; acceptance: “a hidden section is not in the visitor's HTML” |
| R24 | yes | check-inline; acceptance: “emailed via FormSubmit to the Settings address”; acceptance: “the submission is also in the CMS inbox” |
| R25 | yes | check-inline; acceptance: “data layer variables are pushed before GTM”; acceptance: “the GTM container from Settings is loaded”; site-audit |
| R26 | yes | site-audit |
| R27 | yes | check-inline; site-audit |
| R28 | yes | site-audit |
| R29 | yes | site-audit |
| R30 | yes | check-inline; acceptance: “edit tools take no layout space”; acceptance: “the admin bar is one line”; acceptance: “touch: tapping a block shows its edit tools”; acceptance: “opens fully on screen with every action clickable” |
| R31 | yes | check-inline; acceptance: “tracking: blocks carry their marker”; acceptance: “tracking: the server matched the plan's lead conversions”; tracking-edge: “capture: no personal data in any event”; tracking-edge: “panel: approving with a broken trigger is refused”; verify-tracking; site-audit |
| R32 | yes | check-inline; acceptance: “consent: no marketing tag before the visitor chooses”; acceptance: “consent: withdrawing deletes the stored profile”; tracking-edge: “consent: Consent Mode default is denied”; tracking-edge: “consent: the banner passes WCAG”; site-audit |
| R33 | yes | check-inline; acceptance: “contacts: contacts are admin-only”; acceptance: “contacts: erase removes the contact”; tracking-edge: “contacts: “Erase permanently” removes the person”; tracking-edge: “profile: verification traffic is stored as a test” |
