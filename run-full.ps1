# ===============================
# Saga Inventory Full Run Script
# ===============================

# 1️⃣ Backend Environment Variables (dotenv)
$env:DATABASE_URL="postgres://saga:saga123@localhost:5432/sagainventory"
$env:PORT=5000

# 2️⃣ Start Backend (server)
Write-Host "Starting Backend..."
Start-Process powershell -ArgumentList '-NoExit', '-Command', 'cd "G:\SAGA_LAB\Sagainventoryv2\server"; npm run dev'

# 3️⃣ Start Frontend (client)
Write-Host "Starting Frontend..."
Start-Process powershell -ArgumentList '-NoExit', '-Command', 'cd "G:\SAGA_LAB\Sagainventoryv2\client"; npm run dev'

Write-Host "✅ Saga Inventory full app is running!"
Write-Host "Frontend: http://localhost:5173 | Backend: http://localhost:5000"
