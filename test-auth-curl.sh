#!/bin/bash
# Test Clerk Authentication with curl

echo "=== TESTING CLERK AUTHENTICATION WITH CURL ==="
echo ""

echo "Step 1: Get your token from the frontend"
echo "=========================================="
echo "1. Open http://localhost:5173 in your browser"
echo "2. Sign in / Sign up with Clerk"
echo "3. Open Browser DevTools (F12) > Console"
echo "4. Paste this command:"
echo "   (await window.Clerk.getToken()).jwt"
echo "5. Copy the JWT token"
echo ""

echo "Step 2: Test WITHOUT token (will fail)"
echo "========================================"
echo "Running: curl -X GET http://localhost:5000/debug/auth"
curl -X GET http://localhost:5000/debug/auth
echo ""
echo ""

echo "Step 3: Test WITH token (replace YOUR_TOKEN_HERE)"
echo "=================================================="
echo ""
echo "CURL EXAMPLE:"
echo 'curl -X GET http://localhost:5000/debug/auth \\'
echo '  -H "Authorization: Bearer YOUR_TOKEN_HERE"'
echo ""
echo "REPLACE YOUR_TOKEN_HERE with the token from Step 1"
echo ""

echo "Step 4: Test Update Role endpoint (with token)"
echo "=============================================="
echo 'curl -X GET http://localhost:5000/api/educator/update-role \\'
echo '  -H "Authorization: Bearer YOUR_TOKEN_HERE"'
echo ""

echo "Step 5: Test Add Course endpoint (with token)"
echo "============================================"
echo 'curl -X POST http://localhost:5000/api/educator/add-course \\'
echo '  -H "Authorization: Bearer YOUR_TOKEN_HERE" \\'
echo '  -H "Content-Type: application/json" \\'
echo '  -d "{\"courseData\":\"{}\"}"'
echo ""
