# FoodBridge Code Review - Bug Report

**Date:** May 16, 2026  
**Reviewer:** Kiro AI  
**Project:** FoodBridge - Food Donation Management System  
**Tech Stack:** MERN (MongoDB, Express, React 19, Node.js)

---

## Executive Summary

I've completed a comprehensive code review of your FoodBridge application (both backend and frontend). Overall, the code is **well-structured and production-ready**, but I've identified **12 bugs/issues** ranging from critical security vulnerabilities to minor improvements.

### Severity Breakdown:
- 🔴 **Critical:** 2 issues (Security vulnerabilities)
- 🟠 **High:** 3 issues (Data integrity, Race conditions)
- 🟡 **Medium:** 4 issues (Error handling, Validation)
- 🟢 **Low:** 3 issues (Code quality, Performance)

---

## 🔴 CRITICAL ISSUES

### 1. **JWT Secret Not Validated on Startup**
**Location:** `backend/server.js`, `backend/middleware/authMiddleware.js`  
**Severity:** 🔴 Critical  
**Impact:** Application can start without JWT_SECRET, causing runtime crashes when users try to authenticate

**Problem:**
```javascript
// In authMiddleware.js line 12
const decoded = jwt.verify(token, process.env.JWT_SECRET);
```

If `JWT_SECRET` is not set in environment variables, the app will start successfully but crash when any user tries to login/register.

**Fix:**
Add validation in `server.js` before starting the server:

```javascript
// Add this before startServer() function
if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is not defined in environment variables");
  process.exit(1);
}
```

---

### 2. **Public Food Addition Endpoint Without Rate Limiting**
**Location:** `backend/routes/foodRoutes.js` line 14  
**Severity:** 🔴 Critical  
**Impact:** Allows spam/abuse, database flooding, potential DoS attack

**Problem:**
```javascript
router.post("/add-public", addFood); // No authentication, no rate limiting
```

This endpoint allows anyone to add food items without authentication. This can be abused to:
- Flood database with fake food items
- Spam NGOs with fake donations
- Perform DoS attacks

**Fix:**
Either remove this endpoint or add rate limiting:

```javascript
// Option 1: Remove the endpoint (recommended)
// Delete line 14: router.post("/add-public", addFood);

// Option 2: Add rate limiting (if you need public donations)
const rateLimit = require('express-rate-limit');
const publicFoodLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many food items created, please try again later'
});
router.post("/add-public", publicFoodLimiter, addFood);
```

---

## 🟠 HIGH PRIORITY ISSUES

### 3. **Race Condition in Request Creation**
**Location:** `backend/controllers/requestController.js` lines 18-24  
**Severity:** 🟠 High  
**Impact:** Multiple NGOs can request the same food simultaneously

**Problem:**
```javascript
const existing = await Request.findOne({
  food: food._id,
  ngo: req.user._id,
  status: { $in: ["pending", "accepted"] },
});
if (existing) {
  res.status(409);
  throw new Error("You already requested this food");
}
```

This only checks if the **same NGO** requested the food, but doesn't prevent **multiple different NGOs** from requesting the same food item simultaneously.

**Scenario:**
1. NGO A checks if food is available → Yes
2. NGO B checks if food is available → Yes (at the same time)
3. NGO A creates request → Food status = "requested"
4. NGO B creates request → Food status = "requested" (duplicate!)

**Fix:**
Add a check to prevent multiple requests for the same food:

```javascript
// After line 17, add:
const anyExistingRequest = await Request.findOne({
  food: food._id,
  status: { $in: ["pending", "accepted"] },
});
if (anyExistingRequest) {
  res.status(409);
  throw new Error("This food item has already been requested by another NGO");
}
```

---

### 4. **Missing Index on Food Status Field**
**Location:** `backend/models/Food.js`  
**Severity:** 🟠 High  
**Impact:** Slow queries when filtering by status, especially with large datasets

**Problem:**
The `status` field is frequently queried but has no database index:
- `getFoods()` filters by status
- `createRequest()` checks for "available" status
- Admin dashboard filters by status

**Fix:**
Add index to Food model:

```javascript
// Add before module.exports in Food.js
foodSchema.index({ status: 1 });
foodSchema.index({ donor: 1, status: 1 }); // Composite index for donor queries
foodSchema.index({ createdAt: -1 }); // For sorting
```

---

### 5. **No Validation for Expired Food Items**
**Location:** `backend/controllers/foodController.js`, `backend/controllers/requestController.js`  
**Severity:** 🟠 High  
**Impact:** NGOs can request expired food, donors can list expired food

**Problem:**
There's no validation to prevent:
1. Adding food with expiry date in the past
2. Requesting food that has already expired

**Fix:**

In `foodController.js` `addFood()` function, add after line 18:

```javascript
const expiryDate = new Date(expiry);
if (expiryDate < new Date()) {
  res.status(400);
  throw new Error("Expiry date cannot be in the past");
}
```

In `requestController.js` `createRequest()` function, add after line 17:

```javascript
if (new Date(food.expiry) < new Date()) {
  res.status(400);
  throw new Error("This food item has expired and cannot be requested");
}
```

---

## 🟡 MEDIUM PRIORITY ISSUES

### 6. **Weak Password Validation**
**Location:** `backend/models/User.js` line 18  
**Severity:** 🟡 Medium  
**Impact:** Users can create weak passwords, security risk

**Problem:**
```javascript
password: {
  type: String,
  required: true,
  minlength: 6, // Only checks length, no complexity requirements
},
```

Passwords like "123456" or "aaaaaa" are accepted.

**Fix:**
Add password validation in `authController.js` `register()` function:

```javascript
// After line 6, add:
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
if (!passwordRegex.test(password)) {
  res.status(400);
  throw new Error(
    "Password must be at least 8 characters and contain uppercase, lowercase, number, and special character"
  );
}
```

---

### 7. **Email Validation Missing**
**Location:** `backend/controllers/authController.js`  
**Severity:** 🟡 Medium  
**Impact:** Invalid emails can be registered, causing issues with notifications

**Problem:**
No validation for email format. Users can register with "notanemail" or "test@".

**Fix:**
Add email validation in `register()` function:

```javascript
// After line 6, add:
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  res.status(400);
  throw new Error("Invalid email format");
}
```

---

### 8. **Inconsistent Error Handling in Async Functions**
**Location:** Multiple controllers  
**Severity:** 🟡 Medium  
**Impact:** Some errors might not be caught properly

**Problem:**
Some async functions use `try-catch` with `next(error)`, but the pattern is inconsistent. All controllers use it correctly, but if any middleware or route handler is added without proper error handling, it could crash the server.

**Fix:**
Consider using `express-async-handler` package for cleaner error handling:

```bash
npm install express-async-handler
```

Then wrap all async route handlers:

```javascript
const asyncHandler = require('express-async-handler');

const addFood = asyncHandler(async (req, res) => {
  // No need for try-catch, errors are automatically passed to error middleware
  const { name, quantity, ... } = req.body;
  // ... rest of code
});
```

---

### 9. **Missing Request Body Size Limit**
**Location:** `backend/server.js` line 47  
**Severity:** 🟡 Medium  
**Impact:** Large payloads can cause memory issues or DoS

**Problem:**
```javascript
app.use(express.json()); // No size limit
```

Attackers can send extremely large JSON payloads to crash the server.

**Fix:**
```javascript
app.use(express.json({ limit: '10mb' })); // Adjust based on your needs
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
```

---

## 🟢 LOW PRIORITY ISSUES

### 10. **Inefficient Pagination in getMyRequests**
**Location:** `backend/controllers/requestController.js` lines 60-62  
**Severity:** 🟢 Low  
**Impact:** Performance degradation with many food items

**Problem:**
```javascript
const donorFoodIds = await Food.find({ donor: req.user._id }).distinct("_id");
filter = { food: { $in: donorFoodIds } };
```

This loads all food IDs into memory before querying requests. With thousands of food items, this is inefficient.

**Fix:**
Use aggregation pipeline:

```javascript
if (req.user.role === "donor") {
  const requests = await Request.aggregate([
    {
      $lookup: {
        from: "foods",
        localField: "food",
        foreignField: "_id",
        as: "foodData"
      }
    },
    {
      $match: {
        "foodData.donor": req.user._id
      }
    },
    // ... rest of aggregation
  ]);
}
```

---

### 11. **No Logging for Critical Operations**
**Location:** All controllers  
**Severity:** 🟢 Low  
**Impact:** Difficult to debug production issues, no audit trail

**Problem:**
No logging for:
- User registrations
- Food item deletions
- Request status changes
- Admin actions

**Fix:**
Add logging using Winston or similar:

```javascript
const winston = require('winston');
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// In controllers:
logger.info('User registered', { userId: user._id, email: user.email });
logger.warn('Food item deleted', { foodId: food._id, deletedBy: req.user._id });
```

---

### 12. **Frontend: No Request Timeout Handling**
**Location:** `frontend/src/services/apiClient.js` line 36  
**Severity:** 🟢 Low  
**Impact:** Poor user experience on slow connections

**Problem:**
```javascript
timeout: 30000, // 30 seconds timeout
```

When timeout occurs, user sees generic error. No retry mechanism.

**Fix:**
Add axios interceptor for better timeout handling:

```javascript
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      return Promise.reject(new Error('Request timeout. Please check your connection and try again.'));
    }
    return Promise.reject(error);
  }
);
```

---

## Additional Recommendations

### Security Enhancements:
1. **Add Helmet.js** for security headers:
   ```bash
   npm install helmet
   ```
   ```javascript
   const helmet = require('helmet');
   app.use(helmet());
   ```

2. **Add Rate Limiting** to all routes:
   ```bash
   npm install express-rate-limit
   ```

3. **Add Input Sanitization** to prevent XSS:
   ```bash
   npm install express-mongo-sanitize xss-clean
   ```

### Performance Improvements:
1. Add Redis caching for frequently accessed data (food listings, stats)
2. Implement pagination cursor-based instead of offset-based for better performance
3. Add database indexes (mentioned in issue #4)

### Code Quality:
1. Add ESLint and Prettier for consistent code formatting
2. Add unit tests using Jest/Mocha
3. Add API documentation using Swagger/OpenAPI
4. Add TypeScript for better type safety

---

## Testing Checklist

Before deploying fixes, test these scenarios:

- [ ] Try registering with weak password (should fail after fix #6)
- [ ] Try registering with invalid email (should fail after fix #7)
- [ ] Try adding food with past expiry date (should fail after fix #5)
- [ ] Try requesting expired food (should fail after fix #5)
- [ ] Have 2 NGOs request same food simultaneously (should fail for second NGO after fix #3)
- [ ] Try accessing `/api/food/add-public` multiple times rapidly (should be rate-limited after fix #2)
- [ ] Start server without JWT_SECRET (should fail immediately after fix #1)
- [ ] Send large JSON payload (should be rejected after fix #9)

---

## Priority Implementation Order

1. **Fix Critical Issues First** (#1, #2) - Security vulnerabilities
2. **Fix High Priority Issues** (#3, #4, #5) - Data integrity
3. **Fix Medium Priority Issues** (#6, #7, #8, #9) - Validation and error handling
4. **Fix Low Priority Issues** (#10, #11, #12) - Performance and UX

---

## Conclusion

Your FoodBridge application is **well-architected and mostly production-ready**. The critical issues are relatively easy to fix and should be addressed before handling more traffic. The codebase follows good practices:

✅ **Strengths:**
- Clean separation of concerns (MVC pattern)
- Proper authentication and authorization
- Good error handling structure
- Consistent API response format
- Proper use of async/await
- Environment variable configuration

⚠️ **Areas for Improvement:**
- Add rate limiting and input validation
- Implement proper logging and monitoring
- Add database indexes for performance
- Enhance security with additional middleware
- Add comprehensive testing

**Overall Code Quality: 8/10** 🌟

The issues identified are common in early-stage applications and can be resolved systematically. None of the bugs are "showstoppers" for your BCA final year project, but fixing the critical and high-priority issues will make your application more robust and impressive during your presentation.

---

**Need Help Implementing Fixes?**  
Let me know which issues you'd like me to help fix, and I can provide detailed implementation guidance or code snippets for each fix.
