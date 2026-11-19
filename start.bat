@echo off
echo ==============================================
echo       INICIANT SCRIPTUM (Espai Literari)
echo ==============================================
echo.

if not exist node_modules (
  echo [1/2] Instal·lant dependencies de Scriptum...
  npm install
) else (
  echo [1/2] Dependencies ja instal·lades.
)

echo.
echo [2/2] Engegant servidor local a http://localhost:4321 ...
echo Prem Ctrl+C per aturar el servidor.
echo.
npm run dev

