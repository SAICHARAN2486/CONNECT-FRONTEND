@echo off
echo Preparing to push frontend code to GitHub...
cd /d "c:\tt projects\mini project\connect\frontend"
echo # CONNECT-FRONTEND >> README.md
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/SAICHARAN2486/CONNECT-FRONTEND.git
git push -u origin main
echo.
echo Process complete. If successful, check your GitHub repository.
pause
