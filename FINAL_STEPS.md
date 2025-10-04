# ✅ Deployment Checklist - FINAL STEPS

## Changes Successfully Pushed to GitHub ✅

All code changes have been committed and pushed. Your Render deployments will automatically rebuild.

---

## Backend Configuration on Render

Go to your **backend service** on Render and add/update this environment variable:

### Required Environment Variable:
```
FRONTEND_URL = https://food-ordering-app-frontend1-ovsw.onrender.com
```

This is your actual frontend URL that needs to be whitelisted in CORS.

### How to Add Environment Variable on Render:
1. Go to Render Dashboard → Your Backend Service
2. Click "Environment" in the left sidebar
3. Add the variable:
   - **Key:** `FRONTEND_URL`
   - **Value:** `https://food-ordering-app-frontend1-ovsw.onrender.com`
4. Click "Save Changes"
5. Service will automatically redeploy

---

## What Was Configured

### ✅ Frontend `.env.production`
Already set to: `https://food-ordering-app-backend-fgh4.onrender.com`

### ✅ Backend CORS
Configured to accept requests from `FRONTEND_URL` environment variable

### ✅ Axios Configuration
All API calls now use the centralized axios config from `frontend/src/api/axios.js`

### ✅ All Files Updated
- AuthContext.jsx
- LoginPage.jsx
- RegisterPage.jsx  
- MenuPage.jsx
- RestaurantListPage.jsx
- PlaceOrderPage.jsx
- ProfilePage.jsx
- OrderConfirmationPage.jsx

---

## After Setting Backend Environment Variable

1. **Wait for redeploy** - Both services will rebuild automatically
2. **Test your app**:
   - Visit your frontend URL
   - Open DevTools (F12) → Network tab
   - Try logging in or browsing restaurants
   - Verify API calls go to: `https://food-ordering-app-backend-fgh4.onrender.com/api/...`

3. **If you see errors**:
   - Check that `FRONTEND_URL` in backend matches your frontend URL **exactly**
   - Verify both services show "Live" status on Render
   - Check Render logs for any error messages
   - Hard refresh browser (Ctrl+Shift+R)

---

## Environment Variables Summary

### Backend (.env on Render):
```
PORT=5000
MONGO_URI=mongodb+srv://test_1:u3dDMQRTgm2z5Rj4@cluster0.2ylu1gh.mongodb.net/
JWT_SECRET=somerandomsecretstring123!@#
FRONTEND_URL=https://food-ordering-app-frontend1-ovsw.onrender.com  👈 ADD THIS!
EMAIL_USER=ptsa1209@gmail.com
EMAIL_PASS=mejcymhyeufjmqpp
```

### Frontend (.env.production):
```
VITE_API_URL=https://food-ordering-app-backend-fgh4.onrender.com  ✅ Already set
```

---

## Current Status

- ✅ Code pushed to GitHub
- ✅ Backend URL configured in frontend
- ⏳ **YOU NEED TO DO:** Add `FRONTEND_URL` to backend on Render
- ⏳ Wait for automatic redeployment
- ⏳ Test the live application

---

## Helpful Commands

### Test Backend Directly:
```
https://food-ordering-app-backend-fgh4.onrender.com/
```
Should show: "API is up and running!"

### Test Restaurants Endpoint:
```
https://food-ordering-app-backend-fgh4.onrender.com/api/restaurants
```
Should return JSON data

---

## Need Help?

- **CORS Error?** → Check `FRONTEND_URL` matches exactly
- **Network Error?** → Check both services are "Live" on Render  
- **404 Errors?** → Verify build completed successfully
- **Still issues?** → Check Render logs for detailed error messages

You're almost done! Just add that one environment variable to the backend and you'll be live! 🚀
