@echo off
chcp 65001 > nul
title PassSapa - Local Dev Server Launcher
echo ========================================================
echo 🌿 PassSapa - Thai Traditional Medicine Exam Portal
echo ========================================================
echo [1/2] Checking & Installing Dependencies...
if not exist node_modules (
    echo Installing npm dependencies, please wait...
    call npm install
) else (
    echo Node modules found! Skipping install...
)

echo.
echo [2/2] Starting Next.js Local Dev Server...
echo --------------------------------------------------------
echo 🚀 PassSapa Dev Server running at: http://localhost:3000
echo --------------------------------------------------------
echo Press Ctrl + C to stop the server when done.
echo.

call npm run dev
pause
