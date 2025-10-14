@echo off
echo ======================================================
echo   DEPLOY OKRIKA GRAMMAR SCHOOL WEBSITE - FULL ONLINE
echo ======================================================
echo.

:: Step 1 - Navigate to main folder
cd /d "%~dp0"

:: Step 2 - Build frontend
if exist client (
    echo Installing frontend dependencies...
    cd client
    call npm install
    call npm run build
    xcopy /E /I /Y dist ..\server\public
    cd ..
) else if exist frontend (
    echo Installing frontend dependencies...
    cd frontend
    call npm install
    call npm run build
    xcopy /E /I /Y dist ..\server\public
    cd ..
)

:: Step 3 - Install backend
cd server
echo Installing backend dependencies...
call npm install
cd ..

:: Step 4 - GitHub Sync
echo Committing to GitHub repository...
git add .
git commit -m "Automated full OGS deploy commit"
git branch -M main
git remote set-url origin https://github.com/ogs-developer/ogs-fullstack.git
git push -u origin main

:: Step 5 - Deploy Render (backend)
echo Deploying backend to Render...
start "" https://render.com/deploy?repo=https://github.com/ogs-developer/ogs-fullstack

:: Step 6 - Deploy Netlify (frontend)
echo Deploying frontend to Netlify...
start "" https://app.netlify.com/start/deploy?repository=https://github.com/ogs-developer/ogs-fullstack

echo.
echo ======================================================
echo   DEPLOYMENT STARTED SUCCESSFULLY!
echo   Check browser windows for Render and Netlify setup.
echo ======================================================
pause
