@echo off
echo Patching Forge IDE...

set SRC=C:\Users\DELL\Downloads\forge-ide-desktop
set BUILT=%SRC%\dist\Forge IDE-win32-x64\resources\app\renderer\index.html
set SOURCE=%SRC%\renderer\index.html
set URL=https://raw.githubusercontent.com/Ashutosh3142857/forge-ide-desktop/main/renderer/index.html

echo Downloading latest renderer...
curl -s -o "%SOURCE%" "%URL%"
if errorlevel 1 (
  echo ERROR: Download failed
  pause
  exit /b 1
)
echo Downloaded to source folder.

if exist "%BUILT%" (
  copy /y "%SOURCE%" "%BUILT%" >nul
  echo Patched built app directly.
) else (
  echo Built app not found, run: node build-script.js win
)

echo.
echo Done! Restart Forge IDE.
pause
