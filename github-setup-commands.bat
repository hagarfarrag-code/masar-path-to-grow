@echo off
echo Setting up GitHub connection for MASAR project...
echo.

echo Step 1: Pushing to GitHub repository...
git push -u origin master

echo.
echo If the above fails, try with main branch:
git branch -M main
git push -u origin main

echo.
echo Setup complete! Your code is now on GitHub and will sync with Lovable.
pause