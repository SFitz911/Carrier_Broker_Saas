@echo off
REM Carrier Board Quick Launch Script
REM Double-click this file to start both Backend and Frontend

echo ========================================
echo    Starting Carrier Board Services
echo ========================================
echo.

REM Start Backend API in new window
echo [1/2] Launching Backend API (Python/FastAPI)...
start "Carrier Board - Backend API" cmd /k "cd backend && echo Starting Backend API on http://localhost:8000 && echo. && python main.py"

REM Wait 3 seconds for backend to initialize
timeout /t 3 /nobreak > nul

REM Start Frontend in new window
echo [2/2] Launching Frontend (Next.js)...
start "Carrier Board - Frontend" cmd /k "cd frontend && echo Starting Frontend on http://localhost:3000 && echo. && npm run dev"

REM Wait a moment then open browser
timeout /t 8 /nobreak > nul
echo.
echo ========================================
echo    Services Starting...
echo ========================================
echo.
echo Backend API:  http://localhost:8000
echo Frontend App: http://localhost:3000
echo API Docs:     http://localhost:8000/api/docs
echo.
echo Opening browser in a moment...
timeout /t 2 /nobreak > nul

REM Open the app in default browser
start http://localhost:3000

echo.
echo ========================================
echo    Carrier Board is Running!
echo ========================================
echo.
echo Close the Backend and Frontend windows to stop the services.
echo You can close this window now.
echo.
pause

