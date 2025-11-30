POSTMAN & CURL TESTING GUIDE
============================

## POSTMAN SETUP

### Test 1: Debug Auth Endpoint (No Token)
- Method: GET
- URL: http://localhost:5000/debug/auth
- Headers: None
- Expected: {"userId":null,"message":"Not authenticated"}

### Test 2: Debug Auth Endpoint (With Token)
- Method: GET
- URL: http://localhost:5000/debug/auth
- Headers:
  - Key: Authorization
  - Value: Bearer YOUR_TOKEN_HERE
- Expected: {"userId":"user_xxxxx","message":"Authenticated"}

### Test 3: Update Educator Role
- Method: GET
- URL: http://localhost:5000/api/educator/update-role
- Headers:
  - Authorization: Bearer YOUR_TOKEN_HERE
- Expected: {"success":true,"message":"You can publish a course now"}

### Test 4: Add Course
- Method: POST
- URL: http://localhost:5000/api/educator/add-course
- Headers:
  - Authorization: Bearer YOUR_TOKEN_HERE
  - Content-Type: application/json
- Body (JSON):
  {
    "courseData": "{}"
  }


## CURL COMMANDS

### Get Token (Run in Browser Console)
(await window.Clerk.getToken()).jwt

### Test 1: Without Token
curl http://localhost:5000/debug/auth

### Test 2: With Token (Windows PowerShell)
$token = "YOUR_TOKEN_HERE"
curl -H "Authorization: Bearer $token" http://localhost:5000/debug/auth

### Test 3: With Token (CMD)
curl -H "Authorization: Bearer YOUR_TOKEN_HERE" http://localhost:5000/debug/auth

### Test 4: Update Role
curl -H "Authorization: Bearer YOUR_TOKEN_HERE" http://localhost:5000/api/educator/update-role

### Test 5: Add Course (Windows)
curl -X POST http://localhost:5000/api/educator/add-course ^
  -H "Authorization: Bearer YOUR_TOKEN_HERE" ^
  -H "Content-Type: application/json" ^
  -d "{\"courseData\":\"{}\"}"

### Test 5: Add Course (Linux/Mac)
curl -X POST http://localhost:5000/api/educator/add-course \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"courseData":"{}"}'


## KEY POINTS

1. Always replace YOUR_TOKEN_HERE with actual token from browser
2. Token format: "Bearer eyJhbGc..." (includes "Bearer " prefix)
3. Without token header, you'll get: "Unauthorized - Please login"
4. Make sure server is running on port 5000
5. Make sure client is running on port 5173 for Clerk to work
