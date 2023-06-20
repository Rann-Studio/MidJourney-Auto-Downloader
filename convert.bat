@echo off
set "currentPath=%CD%"
echo Automatic sync image converter has beed started.
echo Press ctrl+c to close this program.

:LOOP
for %%F in ("%currentPath%\input\*") do (
    start /b /wait cmd /c "magick convert input\%%~nxF -scale 210%% output\%%~nF.jpg"
    del /q /f input\%%~nxF
)

timeout /t 5 >nul 2>&1
goto LOOP
