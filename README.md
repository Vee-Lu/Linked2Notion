# Linked2Notion

Copy a LinkedIn job into a Notion application tracker.

Milestone 1 is a Chrome popup that shows the active tab’s URL. Saving a job to Notion comes later. The function that reads the tab URL is intentionally left as a stub.

## Layout

```text
extension/
  src/popup.ts      Popup logic. getCurrentTabUrl() is the open task.
  popup.html        Popup document. Loads popup.css and the built popup.js.
  popup.css         Popup layout.
  manifest.json     Manifest V3. Declares the popup and activeTab.
  package.json      npm scripts and dev dependencies.
  tsconfig.json     Typecheck settings. Emits nothing.
  build.mjs         Bundles the script and copies static files into dist/.
  dist/             Build output. Load this folder in Chrome. Git ignores it.
docs/
  PROJECT_SPEC.md   Product goal, field mapping, and milestone boundaries.
  CURRENT_STATE.md  What is finished and what is still a stub.
```

Chrome runs the files in `extension/dist`, not the TypeScript source.

## Scripts

Run these from `extension/`:

```bash
npm install
npm run typecheck
npm run build
```

- `typecheck` runs `tsc --noEmit`. It reports type errors and writes no files.
- `build` runs esbuild, then copies `popup.html`, `popup.css`, and `manifest.json` into `extension/dist`.
- `allowScripts` in `package.json` lets npm run esbuild’s install script, which downloads the esbuild binary for this machine.

Rebuild after every change to `src/popup.ts`, then click **Reload** on the extension’s card in `chrome://extensions`.

## Load unpacked

1. Open `chrome://extensions`.
2. Turn on **Developer mode**.
3. Click **Load unpacked**.
4. Choose the `extension/dist` directory inside this repository.

The toolbar icon opens the popup. **Read current tab** calls `getCurrentTabUrl()`. Until that stub is replaced, the output area says that no URL was returned.

## Credentials

Notion tokens and other secrets stay out of the repository. `.env` files are gitignored, and this milestone does not read any.
