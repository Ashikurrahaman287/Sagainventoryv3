param(
    [switch]$SkipPackage
)

Set-Location $PSScriptRoot\..\..

Write-Output "Running web build and server bundler..."

# Run npm install in root to ensure deps (optional)
# npm install

Write-Output "Building client and server (build:web)..."
npm run build:web
$exit = $LASTEXITCODE
if ($exit -ne 0) {
    Write-Error "build:web failed with exit code $exit"
    exit $exit
}

if ($SkipPackage) {
    Write-Output "SkipPackage set, finishing after build:web"
    exit 0
}

Write-Output "Running predist checks..."
npm run predist
$exit = $LASTEXITCODE
if ($exit -ne 0) {
    Write-Error "predist failed with exit code $exit"
    exit $exit
}

Write-Output "Running electron-builder to create installer..."
npm run dist
$exit = $LASTEXITCODE
if ($exit -ne 0) {
    Write-Error "dist failed with exit code $exit"
    exit $exit
}

Write-Output "Package complete. See the 'dist' folder for output."
param(
  [switch]$SkipPackage
)

Write-Host "Running full build: client + server bundling"
Push-Location $PSScriptRoot
Set-Location ..

# Run client build and server bundler via npm script
Write-Host "Running: npm run build:web"
$ret = & npm run build:web 2>&1
Write-Output $ret
if ($LASTEXITCODE -ne 0) { Write-Error "build:web failed"; exit $LASTEXITCODE }

Write-Host "Running predist checks"
$ret = & npm run predist 2>&1
Write-Output $ret
if ($LASTEXITCODE -ne 0) { Write-Error "predist failed"; exit $LASTEXITCODE }

if (-not $SkipPackage) {
  Write-Host "Running electron-builder (packaging)"
  $ret = & npm run dist 2>&1
  Write-Output $ret
  if ($LASTEXITCODE -ne 0) { Write-Error "dist failed"; exit $LASTEXITCODE }
}

Write-Host "Build-and-package completed"
Pop-Location
