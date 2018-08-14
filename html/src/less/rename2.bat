@echo off
setlocal enabledelayedexpansion
set var=102 
set fileName=1

echo %var%
set /a i = i + var

for /r  %%a in (*.less) do (
  echo "%%a"
  set /a fileName="%%~na"
  echo %fileName%

  
)
pause