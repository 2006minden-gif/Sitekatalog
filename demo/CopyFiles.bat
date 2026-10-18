@echo off
echo ========================================
echo   ElectroOpt - Copy Files
echo ========================================
echo.
echo Copying files from dist to demo folder...
echo.

xcopy /E /Y /I "..\dist\*" "." >nul 2>&1

if %errorlevel% neq 0 (
    echo ERROR: Failed to copy files.
    pause
    exit /b 1
)

echo Done! Files copied successfully.
echo.
echo Now you can run Launch.bat to open the website.
echo.
pause
