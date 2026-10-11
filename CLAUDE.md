# zfkaccountants: working rules

This workspace has two parts:
- `frontend/`: this site (Next.js). It is also the **reference frontend** for
  the reusable CMS kit.
- `dynamic-cms/`: the CMS (Django backend, frontend kit, integration spec).
  Its own rules are in `dynamic-cms/AGENTS.md`.

## Any CMS change must reach future projects

- **Backend changes:** make them in `dynamic-cms/`; they are shared directly.
  Add a test, then run `./venv/bin/python manage.py test api` there.
- **Changes to CMS frontend files** (anything in the kit:
  `dynamic-cms/frontend-kit/MANIFEST.md` lists them, e.g. `src/components/cms/*`,
  `src/components/dynamic/*`, `src/lib/{api,cms,seo,keywords,seoChecks}.js`,
  `src/app/admin/*`, `src/middleware.js`, `src/app/cms.css`):
  1. Make the change in `frontend/`.
  2. Run `npm run check:inline` and `npm run build`.
  3. Run `npm run cms:kit-sync` to copy the change into
     `dynamic-cms/frontend-kit`.
  4. If behaviour or contract changed, update
     `dynamic-cms/FRONTEND_INTEGRATION_PROMPT.md` (and the acceptance test if
     it should be enforced), then commit in `dynamic-cms` and push to
     `main`. dynamic-cms has ONE branch, `main`: no feature branches, no PRs.
- Site-only changes (design, copy defaults, `components/home/*`, etc.) stay in
  `frontend/`.

## Done means run-gates, three passes

Any change that touches the CMS integration is finished only when
`dynamic-cms/frontend-kit/acceptance/run-gates.mjs` prints
`ALL GATES GREEN — 3 of 3 passes` against a production build of this site
(test copy on port 3123, backend on 8100): `--pass 1` until green, fresh
build with no changes, `--pass 2`, then `CMS_REPORT.md` and `--pass 3`.
The gates also need `.gates/visual` and `.gates/seo-baseline.json` (R34),
both recorded before the change; the report's `### SEO audit` section
gives the before and after numbers.
Never weaken a gate or edit `rules-map.json` to get there.

## Non-negotiables while editing this site

- Lists with editable fields are keyed by index, never by their text (fields
  lose focus otherwise). `check:inline` enforces it.
- Every visible string in a CMS component is `<E.Text>`; no hard-coded copy.
- Python is `./venv/bin/python` (macOS has no bare `python`).
- Don't touch the dev servers the user is running (3000 is another project;
  3001 is this site's dev server; 8000 is the CMS). Test on other ports.
