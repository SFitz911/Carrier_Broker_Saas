@echo off
REM Carrier Board Stop Script
REM Double-click this file to stop all services

echo ========================================
echo    Stopping Carrier Board Services
echo ========================================
echo.

echo Stopping Node.js (Frontend)...
taskkill /F /IM node.exe 2>nul
if %errorlevel% equ 0 (
    echo - Frontend stopped
) else (
    echo - No Frontend process found
)

echo.
echo Stopping Python (Backend)...
for /f "tokens=2" %%i in ('netstat -ano ^| findstr ":8000.*LISTENING"') do (
    taskkill /F /PID %%i 2>nul
)
echo - Backend stopped

echo.
echo ========================================
echo    All Services Stopped
echo ========================================
echo.
pause

