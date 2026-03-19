@echo off
cd /d "%~dp0"
echo.
echo =============================================
echo    Forge IDE -- Build Script for Windows
echo =============================================
echo.

where node >nul 2>nul
if %errorlevel% neq 0 (
  echo ERROR: Node.js not found.
  echo Please install Node.js v18 or later from https://nodejs.org
  pause
  exit /b 1
)

echo Installing dependencies...
call npm install
if %errorlevel% neq 0 goto :error

echo.
echo Building...
call node build-script.js win
if %errorlevel% neq 0 goto :error

echo.
echo =============================================
echo  BUILD COMPLETE! Output is in the dist folder
echo =============================================
echo.
dir dist\
pause
exit /b 0

:error
echo.
echo BUILD FAILED. See error above.
pause
exit /b 1
