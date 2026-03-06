# WebdriverIO – Sauce Demo E2E Tests

E2E tests for [Sauce Labs Demo](https://www.saucedemo.com/) using WebdriverIO, Mocha, and the visual service.

---

## Prerequisites

- **Node.js** – v18 or v20 (LTS recommended). [Download](https://nodejs.org/)
- **npm** – comes with Node.js (or use yarn/pnpm)
- **Chrome** – installed and up to date (tests run in Chrome by default)

Check versions:

```bash
node -v
npm -v
```

---

## Clone & setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd webDriverIO
```

Replace `<your-repo-url>` with your actual Git URL (e.g. `https://github.com/username/webDriverIO.git`).

### 2. Install dependencies

```bash
npm install
```

### 3. Run tests

```bash
npm run wdio
```

This runs the WebdriverIO suite defined in `wdio.conf.js` (default: Chrome, specs under `test/specs/`).

---

## Project structure

| Path | Description |
|------|-------------|
| `wdio.conf.js` | WebdriverIO config (browser, timeouts, specs, services) |
| `test/specs/` | Test spec files (e.g. `standAloneScripts.js`) |
| `test/pageobjects/` | Page objects (e.g. `login.page.js`, `inventory.page.js`) |

---

## Scripts

| Command | Description |
|--------|-------------|
| `npm run wdio` | Run all tests via `wdio run ./wdio.conf.js` |

---

## Run a specific spec

To run a single spec file, use the same config and override specs:

```bash
npx wdio run ./wdio.conf.js --spec ./test/specs/standAloneScripts.js
```

---

## Troubleshooting

- **Chrome not found / driver errors** – Ensure Chrome is installed and that your Node/Chrome versions are compatible. You may need to add `@wdio/chromedriver-service` and configure it in `wdio.conf.js` if not already present.
- **Tests time out** – Increase `waitforTimeout` or `mochaOpts.timeout` in `wdio.conf.js`.
- **Install fails** – Use a supported Node version (v18 or v20) and run `npm install` again. If needed, clear cache: `npm cache clean --force` then `npm install`.

---

## Tech stack

- **WebdriverIO** v9
- **Mocha** (BDD)
- **@wdio/visual-service** for visual checks
- **Sauce Demo** (https://www.saucedemo.com/) as the target app
