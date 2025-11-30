# Test Clerk Authentication

Write-Host "=== TESTING CLERK AUTHENTICATION ===" -ForegroundColor Cyan
Write-Host ""

# Test 1: Check auth without token
Write-Host "1. Testing /debug/auth endpoint (no token):" -ForegroundColor Yellow
$response1 = Invoke-WebRequest -Uri "http://localhost:5000/debug/auth" -Method GET
Write-Host $response1.Content
Write-Host ""

# Test 2: Try to access protected endpoint without token
Write-Host "2. Testing /api/educator/update-role endpoint (no token - should fail):" -ForegroundColor Yellow
try {
    $response2 = Invoke-WebRequest -Uri "http://localhost:5000/api/educator/update-role" -Method GET
    Write-Host $response2.Content
} catch {
    Write-Host $_.Exception.Response.StatusCode
    Write-Host $_.Exception.Message
}
Write-Host ""

Write-Host "=== HOW TO GET A VALID TOKEN ===" -ForegroundColor Green
Write-Host "1. Go to your frontend (http://localhost:5173)"
Write-Host "2. Sign in with Clerk"
Write-Host "3. Open browser DevTools > Console and paste this:"
Write-Host '   (await window.Clerk.getToken()).jwt'
Write-Host "4. Copy the token and use it in the Authorization header below"
Write-Host ""

Write-Host "=== EXAMPLE: WITH VALID TOKEN ===" -ForegroundColor Magenta
Write-Host "Replace TOKEN_HERE with your actual token and run:"
Write-Host 'curl -X GET http://localhost:5000/api/educator/update-role -H "Authorization: Bearer TOKEN_HERE"'
Write-Host ""
Write-Host "Or in PowerShell:"
Write-Host '@{Authorization = "Bearer TOKEN_HERE"} | % { $headers = $_; Invoke-WebRequest -Uri "http://localhost:5000/api/educator/update-role" -Method GET -Headers $headers }'
