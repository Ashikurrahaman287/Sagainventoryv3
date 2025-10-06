Build & Packaging for Windows (one-liner)

Preconditions:
- Build the renderer and server first: run `npm run build:web` from repo root. This creates `client/dist` and `server/dist/start.js`.
- Ensure no running instances of the app or leftover `dist/win-unpacked` from a prior electron-builder run.

Single command to build installer (PowerShell):

```powershell
# from repo root
npm run dist
```

Notes to avoid 7zip symbolic link errors:
- electron-builder uses 7zip during packaging. On some Windows environments, 7zip can encounter errors when files are locked or when the bundled portable 7z cannot create symlinks.
- If you see errors referencing 7zip or symbolic links, try:
  - Close running app instances and any explorer windows open inside the project dist dir.
  - Run the build with admin privileges.
  - If issues persist, temporarily set `compression` to `store` in `package.json` (this will produce larger installers but avoids 7zip linking steps).

If you want me to run the build here, say so and I'll proceed (I will run `npm run build:web` and then `npm run dist`).
