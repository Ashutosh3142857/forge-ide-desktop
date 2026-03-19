@echo off
echo.
echo =============================================
echo    Forge IDE -- Build Script for Windows
echo =============================================
echo.

:: Change to the directory where this bat file lives
cd /d "%~dp0"

where node >nul 2>nul
if %errorlevel% neq 0 (
  echo ERROR: Node.js not found.
  echo Install from https://nodejs.org ^(v18 or later^)
  pause
  exit /b 1
)

echo Installing dependencies...
call npm install
if %errorlevel% neq 0 goto :error

echo.
echo Building Windows installer...
set CSC_IDENTITY_AUTO_DISCOVERY=false
set WIN_CSC_LINK=
call npx electron-builder --win --x64
if %errorlevel% neq 0 goto :error

echo.
echo BUILD COMPLETE!
echo Output files are in the dist\ folder
echo.
dir dist\
pause
exit /b 0

:error
echo.
echo BUILD FAILED. Check the error above.
pause
exit /b 1
