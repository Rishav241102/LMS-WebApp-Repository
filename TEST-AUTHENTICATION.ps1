# Complete guide to test Clerk Authentication

Write-Host "╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║        HOW TO TEST CLERK AUTHENTICATION                        ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

Write-Host "STEP 1: Verify Server is Running" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5000/" -Method GET
    Write-Host "✓ Server is running" -ForegroundColor Green
    Write-Host "  Response: $($response.Content)" -ForegroundColor Gray
} catch {
    Write-Host "✗ Server is NOT running" -ForegroundColor Red
    Write-Host "  Start your server with: npm start" -ForegroundColor Yellow
    exit
}
Write-Host ""

Write-Host "STEP 2: Check Auth Without Token" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green
Write-Host "Testing GET http://localhost:5000/debug/auth"
$response = Invoke-WebRequest -Uri "http://localhost:5000/debug/auth" -Method GET
Write-Host "Response:" -ForegroundColor Gray
Write-Host $response.Content -ForegroundColor Yellow
Write-Host ""

Write-Host "STEP 3: Get JWT Token From Frontend" -ForegroundColor Green
Write-Host "===================================" -ForegroundColor Green
Write-Host "1. Open http://localhost:5173 in your browser" -ForegroundColor Cyan
Write-Host "2. Click 'Sign In' or 'Sign Up'" -ForegroundColor Cyan
Write-Host "3. Complete authentication with Clerk" -ForegroundColor Cyan
Write-Host "4. Open Browser DevTools (Press F12)" -ForegroundColor Cyan
Write-Host "5. Go to Console tab" -ForegroundColor Cyan
Write-Host "6. Paste this command and press Enter:" -ForegroundColor Cyan
Write-Host '   (await window.Clerk.getToken()).jwt' -ForegroundColor White -BackgroundColor DarkGray
Write-Host "7. Copy the token that appears" -ForegroundColor Cyan
Write-Host ""

Write-Host "STEP 4: Test With Token (Postman)" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green
Write-Host "In Postman:"
Write-Host "  1. Create a new GET request" -ForegroundColor Cyan
Write-Host "  2. URL: http://localhost:5000/debug/auth" -ForegroundColor Cyan
Write-Host "  3. Go to Headers tab" -ForegroundColor Cyan
Write-Host "  4. Add header: Authorization" -ForegroundColor Cyan
Write-Host "  5. Value: Bearer <YOUR_TOKEN_HERE>" -ForegroundColor Cyan
Write-Host "  6. Click Send" -ForegroundColor Cyan
Write-Host ""

Write-Host "STEP 5: Test With Token (PowerShell)" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Green
Write-Host "Copy your token and replace TOKEN_HERE, then run:" -ForegroundColor Yellow
Write-Host ""
Write-Host '$token = "TOKEN_HERE"' -ForegroundColor White -BackgroundColor DarkGray
Write-Host '$headers = @{"Authorization" = "Bearer $token"}' -ForegroundColor White -BackgroundColor DarkGray
Write-Host 'Invoke-WebRequest -Uri "http://localhost:5000/debug/auth" -Method GET -Headers $headers' -ForegroundColor White -BackgroundColor DarkGray
Write-Host ""

Write-Host "STEP 6: Test With Token (cURL)" -ForegroundColor Green
Write-Host "==============================" -ForegroundColor Green
Write-Host "Copy your token and replace TOKEN_HERE, then run:" -ForegroundColor Yellow
Write-Host ""
Write-Host 'curl -X GET http://localhost:5000/debug/auth -H "Authorization: Bearer TOKEN_HERE"' -ForegroundColor White -BackgroundColor DarkGray
Write-Host ""

Write-Host "STEP 7: Test Protected Endpoints" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green
Write-Host ""
Write-Host "With your token, test these endpoints:" -ForegroundColor Yellow
Write-Host ""
Write-Host "A) Update Role to Educator (GET request):" -ForegroundColor Cyan
Write-Host '   curl -X GET http://localhost:5000/api/educator/update-role \' -ForegroundColor Gray
Write-Host '     -H "Authorization: Bearer TOKEN_HERE"' -ForegroundColor Gray
Write-Host ""
Write-Host "B) Add Course (POST request):" -ForegroundColor Cyan
Write-Host '   curl -X POST http://localhost:5000/api/educator/add-course \' -ForegroundColor Gray
Write-Host '     -H "Authorization: Bearer TOKEN_HERE" \' -ForegroundColor Gray
Write-Host '     -H "Content-Type: application/json" \' -ForegroundColor Gray
Write-Host '     -d "{\"courseData\": \"{}\"}"' -ForegroundColor Gray
Write-Host ""

Write-Host "COMMON ERRORS & SOLUTIONS:" -ForegroundColor Magenta
Write-Host "=========================" -ForegroundColor Magenta
Write-Host ""
Write-Host '"Unauthorized - Please login" (401)' -ForegroundColor Yellow
Write-Host "  → Token is missing or invalid" -ForegroundColor Gray
Write-Host "  → Solution: Make sure you added the Authorization header" -ForegroundColor Gray
Write-Host ""
Write-Host '"Unauthorized Access - Only educators can access this" (403)' -ForegroundColor Yellow
Write-Host "  → User is not an educator" -ForegroundColor Gray
Write-Host "  → Solution: First call /api/educator/update-role to set role" -ForegroundColor Gray
Write-Host ""
Write-Host "Token expired or invalid:" -ForegroundColor Yellow
Write-Host "  → Token expired after some time" -ForegroundColor Gray
Write-Host "  → Solution: Get a new token from the frontend" -ForegroundColor Gray
Write-Host ""

Write-Host "╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                      Good luck! 🚀                             ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
