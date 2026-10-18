@echo off
echo ========================================
echo   ElectroOpt - Quick Demo
echo ========================================
echo.
echo Step 1: Copying files...
xcopy /E /Y /I "..\dist\*" "." >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Copy failed. Run npm run build first.
    pause
    exit /b 1
)
echo Done!
echo.
echo Step 2: Opening website...
start "" "%~dp0index.html"
echo.
echo ========================================
echo   Website opened!
echo ========================================
echo.
echo Admin password: admin123
echo.
pause
