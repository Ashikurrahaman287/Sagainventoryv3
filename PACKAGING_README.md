Packaging helper scripts

1) Stop any running Electron/Node processes and clean dist folders (to avoid locked files):

   powershell -ExecutionPolicy Bypass -File .\scripts\ps\stop-and-clean.ps1

2) Run the full build and package (this runs client build, server bundler, predist checks, and electron-builder):

   powershell -ExecutionPolicy Bypass -File .\scripts\ps\build-and-package.ps1

If you want to only build (no packaging), run:

   powershell -ExecutionPolicy Bypass -File .\scripts\ps\build-and-package.ps1 -SkipPackage

Notes:
- Close running instances of the app before packaging.
- If electron-builder gives 7zip/symlink errors, try running PowerShell as Administrator and/or set "compression": "store" in package.json temporarily.
