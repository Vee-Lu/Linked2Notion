# Linked2Notion

Chrome extension that reads the selected job in LinkedIn’s job details panel and saves it to a Notion application tracker.

## Field mapping

| LinkedIn source | Notion destination |
| --- | --- |
| Company | Company column |
| Job title | Position column |
| Full “About the job” description | Page body, inside the Notes callout (see below) |
| External application URL, or the text `Easy Apply` | Website column |

Each save creates a new row from the database’s default template, **New Application [Company Name]** (`aa06e072-861d-8358-98cc-013d0ae859fb`). This repository does not store Notion credentials.

## Page body

The template’s page content, in order, is:

1. Blue callout (`blue_bg`, icon `/icons/friends_gray.svg`) titled **Recruiter Details.**, with the lines `📫 e:` and `📞 t:`.
2. Orange callout (`orange_bg`, icon `/icons/drafts_gray.svg`) titled **Notes.** The heading is followed by one empty paragraph. In the tracker this callout is the brown “📝 Notes.” section shown in side peek.
3. One empty paragraph after the callouts.

The full job description replaces that empty paragraph **inside** the Notes callout, directly under `### Notes.`. It is page content, not a database property.

Leave the Recruiter Details callout, the Notes heading, the callout colors and icons, and the trailing empty paragraph as the template defined them. Do not append the description at the top or bottom of the page, and do not add a new block beside the two callouts.

## Stack

- TypeScript
- Chrome Extension Manifest V3
- esbuild
- Plain HTML and CSS
- npm

No React and no backend in the current milestone.

## Milestone 1 — active tab URL

A popup with a **Read current tab** button and an output area.

- Permission: `activeTab` only.
- The button calls `getCurrentTabUrl()` and displays the returned URL.
- `undefined` produces a short message in the output area.
- Output is written with `textContent`.
- `getCurrentTabUrl()` stays a stub until it is implemented by hand.

### Done when

- `npm run typecheck` passes.
- `npm run build` writes `extension/dist`.
- Chrome can load `extension/dist` as an unpacked extension.
- After `getCurrentTabUrl()` is implemented, the popup shows the active tab’s URL.

## Later milestones

Not started. Do not implement these until they are explicitly requested.

1. Read the selected job from LinkedIn’s job details panel.
2. Map company, position, description, and application URL or Easy Apply.
3. Create a new Notion tracker row for that job.
