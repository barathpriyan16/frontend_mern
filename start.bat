@echo off
echo Starting ExpenseTracker Pro...
echo.

echo Starting Backend Server...
start "Backend" cmd /k "cd backend && npm start"

timeout /t 3 /nobreak > nul

echo Starting Frontend Development Server...
start "Frontend" cmd /k "npm run dev"

echo.
echo Both servers are starting...
echo Backend: http://localhost:4001
echo Frontend: http://localhost:5173
echo.
pause