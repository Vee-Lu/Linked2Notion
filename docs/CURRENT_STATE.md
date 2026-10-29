# Current state

Milestone 1 is implemented: the popup reads the active tab URL. LinkedIn extraction and Notion integration are not started.

## In place

- Manifest V3 popup extension with the `activeTab` permission.
- Popup markup, styles, and a script that wires **Read current tab** to `getCurrentTabUrl()`.
- `undefined` and thrown errors are shown in `#output` through `textContent`.
- `npm run build` bundles `src/popup.ts` to `dist/popup.js` and copies the static files.
- `npm run typecheck` checks `src/popup.ts` without emitting JavaScript.

## Your implementation

`getCurrentTabUrl()` in `extension/src/popup.ts` queries the active tab in the current window and returns `tab.url`. An empty result still returns `undefined`, and the popup shows the fallback sentence.

## Generated setup vs. your code

Setup: configuration, popup UI, button wiring, display, and error handling.

Yours: the body of `getCurrentTabUrl()`.

## Verification

From `extension/`, on this scaffold:

- `npm run typecheck` passed from `extension/`.
- `npm run build` from `extension/` wrote `dist/popup.js` with the `chrome.tabs.query` call.
- Reload the unpacked extension in `chrome://extensions` before expecting the toolbar popup to show a real URL.

`package.json` includes `allowScripts` for `esbuild` so npm can run esbuild’s install script and download its platform binary.
