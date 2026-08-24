# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Inferred from the repository name and current scaffold; user confirmation pending.
The likely visitor is evaluating a recommendation-engine concept and needs to
see how a recommendation would be explained without mistaking a mock for a live
model.

## Product Purpose

This repository is intended to present a recommendation engine surface. The
current implementation is only a Next.js scaffold, so the recommendation
domain, inputs, and success criteria remain open.

## Positioning

Undecided. No model, ranking contract, item catalog, or connected inference
service is present in the inspected repository.

## Operating Context

The app is a standalone Next.js page with a shared `/api/mcp` route and a
portfolio cross-link. No verified recommendation workflow is wired to the UI.

## Capabilities and Constraints

- The current homepage is a generic scaffold and does not produce real
  recommendations.
- No catalog, user profile, model inference, feedback loop, or persistence is
  confirmed in the current app.
- Any ranking shown during visual work must be marked as synthetic/demo.

## Brand Commitments

The product name is `bookchaowalit-recommendation-engine-frontend`. No
additional visual or brand commitment is confirmed.

## Evidence on Hand

The evidence is the current `app/page.tsx`, `app/globals.css`, Next.js metadata,
and the shared MCP route. There is no verified model output or item dataset.

## Product Principles

- Explain why an item is recommended.
- Separate model output from authored editorial judgment.
- Make the unconnected state useful and honest.
- Keep exploration reversible and low-friction.

## Accessibility & Inclusion

Use semantic landmarks, keyboard-visible focus, readable contrast, and reduced
motion support. Product-specific accessibility requirements are not yet known.
