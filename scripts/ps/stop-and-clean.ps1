param(
    [switch]$Force
)

Write-Output "Stopping common Node/Electron processes and cleaning client dist..."

# Try to stop any running Electron or Node processes
$names = @('electron', 'electron.exe', 'node', 'node.exe')
foreach ($n in $names) {
    $procs = Get-Process -Name $n -ErrorAction SilentlyContinue
    if ($procs) {
        foreach ($p in $procs) {
            try {
                Write-Output "Stopping process $($p.ProcessName) (Id $($p.Id))"
                Stop-Process -Id $p.Id -Force -ErrorAction Stop
            } catch {
                Write-Warning "Failed to stop process Id $($p.Id): $_"
            }
        }
    }
}

# Attempt to remove client/dist with retries to handle locked files
$distPath = Join-Path $PSScriptRoot "..\..\client\dist"
if (Test-Path $distPath) {
    Write-Output "Removing $distPath"
    for ($i=0; $i -lt 6; $i++) {
        try {
            Remove-Item -LiteralPath $distPath -Recurse -Force -ErrorAction Stop
            Write-Output "Removed $distPath"
            break
        } catch {
            Write-Warning "Attempt $($i+1) to remove dist failed: $_"
            Start-Sleep -Seconds 2
        }
    }
} else {
    Write-Output "$distPath not present"
}

Write-Output "Done."
# Stop electron/node processes (force) and attempt to remove known lock folders
Write-Host "Stopping Electron and Node processes (if any)..."
Get-Process -Name electron -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.Id -Force -ErrorAction SilentlyContinue }
Get-Process -Name node -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.Id -Force -ErrorAction SilentlyContinue }

$tries = 5
$distPaths = @(
  (Join-Path -Path $PSScriptRoot -ChildPath "..\client\dist\win-unpacked"),
  (Join-Path -Path $PSScriptRoot -ChildPath "..\client\dist")
)

foreach ($p in $distPaths) {
  $p = (Resolve-Path -Path $p -ErrorAction SilentlyContinue)
  if ($p) {
    Write-Host "Attempting to remove $p"
    for ($i = 0; $i -lt $tries; $i++) {
      try {
        Remove-Item -Path $p -Recurse -Force -ErrorAction Stop
        Write-Host "Removed $p"
        break
      } catch {
        Write-Host "Attempt $($i+1) failed: $($_.Exception.Message)"
        Start-Sleep -Seconds 1
      }
    }
  }
}

Write-Host "Stop-and-clean complete."
