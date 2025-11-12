# Carrier Board Quick Launch Script (PowerShell)
# Right-click and "Run with PowerShell" to start both services

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Starting Carrier Board Services" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Start Backend API in new window
Write-Host "[1/2] Launching Backend API (Python/FastAPI)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList @(
    "-NoExit",
    "-Command",
    "cd '$PSScriptRoot\backend'; Write-Host 'Backend API Starting...' -ForegroundColor Cyan; Write-Host 'URL: http://localhost:8000' -ForegroundColor Green; Write-Host ''; python main.py"
) -WindowStyle Normal

# Wait for backend to initialize
Write-Host "Waiting for backend to initialize..." -ForegroundColor Gray
Start-Sleep -Seconds 3

# Start Frontend in new window
Write-Host "[2/2] Launching Frontend (Next.js)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList @(
    "-NoExit",
    "-Command",
    "cd '$PSScriptRoot\frontend'; Write-Host 'Frontend Starting...' -ForegroundColor Green; Write-Host 'URL: http://localhost:3000' -ForegroundColor Green; Write-Host ''; npm run dev"
) -WindowStyle Normal

# Wait for services to start
Write-Host ""
Write-Host "Waiting for services to start..." -ForegroundColor Gray
Start-Sleep -Seconds 8

# Display info
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Services Starting..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Backend API:  " -NoNewline
Write-Host "http://localhost:8000" -ForegroundColor Green
Write-Host "Frontend App: " -NoNewline
Write-Host "http://localhost:3000" -ForegroundColor Green
Write-Host "API Docs:     " -NoNewline
Write-Host "http://localhost:8000/api/docs" -ForegroundColor Green
Write-Host ""
Write-Host "Opening browser..." -ForegroundColor Yellow
Start-Sleep -Seconds 2

# Open the app in default browser
Start-Process "http://localhost:3000"

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "   Carrier Board is Running! 🚛" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Close the Backend and Frontend windows to stop the services." -ForegroundColor Gray
Write-Host ""
Write-Host "Press any key to close this window..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

