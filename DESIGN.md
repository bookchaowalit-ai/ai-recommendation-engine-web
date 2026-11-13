# Design direction — The Ranking Desk

## World

A quiet editorial sorting room: cream stock, red pencil marks, blue-black
index ink, and a long docket where candidates would be compared. It gives a
recommendation engine a human-readable frame without pretending that a model or
catalog is connected.

## First viewport

The first viewport asks what kind of next step the visitor is exploring, then
ranks the local project catalog with editorial rules. The product's honesty is
part of the interface: every pick carries its score and the reasons behind each
point, and the copy states plainly that no machine-learning model is involved.

## Palette and material

- Stock cream `#eee9dd` is the paper ground.
- Blue-black `#162532` is the index ink and primary text.
- Vermilion `#c64b3d` is the pencil action and active mark.
- Faded olive `#a0a78c` carries quiet classification notes.

## Type

`Newsreader` gives the desk an editorial voice for the main statement.
`Plus Jakarta Sans` keeps controls and explanations modern and readable.
`DM Mono` is reserved for docket IDs, model state, and provenance labels.

## Interaction and states

Intent tabs change the brief being considered while the docket remains honest.
The active tab is a red pencil underline, not a floating pill. Unwired,
empty-catalog, and rationale-pending states are written as rows in the docket.

## Responsive rules

The desktop layout uses a slim index rail beside the paper desk. On mobile the
rail becomes a top index strip and the docket rows keep their labels aligned
without horizontal scrolling.


---

## Storybook

Storybook 10 (`@storybook/nextjs-vite`) shows this design system with the app's real CSS, tokens and fonts.

```bash
npm run storybook        # http://localhost:6006
npm run build-storybook  # static build in storybook-static/ (CI: .github/workflows/storybook.yml)
```

- **Foundations/Tokens** reads every CSS custom property the app defines at runtime, so it never drifts from the code.
- **Design/DESIGN.md** renders this file.
- **Components/**, **Sections/** and **Pages/** show the UI with mock data only (no network, analytics off).
- Toolbar: locale, theme (light / dark, when the app has a dark theme), viewports 320 / 375 / 768 / 1440. The a11y panel runs axe (WCAG 2.2 AA).
- Rule: a new shared component or page section ships with a story in `stories/`.
