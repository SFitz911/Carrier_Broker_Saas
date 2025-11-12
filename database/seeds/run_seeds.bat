@echo off
REM Carrier Board - Database Seeder (Windows)
REM Run this script to populate the database with test data

echo ========================================
echo    Carrier Board - Database Seeder
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo Error: Python is not installed or not in PATH
    echo Please install Python 3.x first
    pause
    exit /b 1
)

REM Check if psycopg2 is installed
python -c "import psycopg2" >nul 2>&1
if errorlevel 1 (
    echo Installing required package: psycopg2-binary
    pip install psycopg2-binary
    echo.
)

REM Run the seeder
echo Running database seeds...
echo.
python run_seeds.py

echo.
echo ========================================
echo Press any key to exit...
pause >nul

