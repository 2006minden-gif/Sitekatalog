@echo off
echo ========================================
echo   ElectroOpt - Prepare Demo
echo ========================================
echo.
echo Copying files from dist folder...
echo.

xcopy /E /Y /I "..\dist\*" "." >nul 2>&1

if %errorlevel% neq 0 (
    echo ERROR: Failed to copy files.
    echo Make sure the project is built (npm run build)
    pause
    exit /b 1
)

echo Files copied successfully!
echo.
echo Opening website in browser...
echo.

start "" "%~dp0index.html"

echo.
echo ========================================
echo   Website opened in your browser!
echo ========================================
echo.
echo To access admin mode:
echo   1. Scroll to the bottom of the page
echo   2. Click "Admin" link in the footer
echo   3. Enter password: admin123
echo.
echo To manage catalog:
echo   - Click "Manage Catalog" in admin panel
echo.
pause
