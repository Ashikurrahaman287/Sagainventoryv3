# Build Windows Installer (GitHub Actions)

This project includes a GitHub Actions workflow that builds a Windows installer (.exe) using `electron-builder` on `windows-latest`.

How to run:

1. Push your code to the `master` branch or open the repository's Actions tab and manually trigger the `Build Windows Installer` workflow via `workflow_dispatch`.
2. Wait for the workflow to finish. The artifact `saga-installer` will contain the Windows installer `.exe`.
3. Download the `.exe` from the workflow run artifacts and run it on a Windows machine.

Notes:
- The built app bundles the web client and server (server is bundled into `dist/index.js`).
 - The built app bundles the web client and server (server is bundled into `dist/index.js`).
 - NOTE: The codebase now includes a file-backed storage implementation (`FileStorage`) which is used when the app is packaged (production build). The packaged desktop app is self-contained and does not require Postgres; it stores data in `server/data/db.json` inside the application directory. For local development the project still uses Postgres by default.