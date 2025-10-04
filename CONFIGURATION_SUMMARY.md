# Configuration Summary

## What Changed

### Problem
The Vite proxy in `vite.config.js` only works in development mode. In production (Render), the frontend couldn't reach the backend because it was still trying to use relative `/api` paths.

### Solution
Created a centralized axios configuration that uses environment variables to set the correct backend URL for both development and production.

---

## Files Modified

### Frontend
1. **Created:** `frontend/src/api/axios.js` - Centralized axios instance with baseURL
2. **Created:** `frontend/.env` - Development environment config
3. **Created:** `frontend/.env.production` - Production environment config (**YOU MUST UPDATE THIS**)
4. **Created:** `frontend/.env.example` - Example env file
5. **Updated:** All page files to import axios from `'../api/axios'` instead of `'axios'`
6. **Updated:** `frontend/src/context/AuthContext.jsx` - Uses configured axios

### Backend
1. **Updated:** `backend/server.js` - CORS configuration to use FRONTEND_URL
2. **Updated:** `backend/.env` - Added FRONTEND_URL variable

---

## Action Required: Update These Values

### 1. Frontend - `.env.production`
Open `frontend/.env.production` and replace:
```
VITE_API_URL=https://your-backend-app.onrender.com
```
With your actual Render backend URL, for example:
```
VITE_API_URL=https://food-ordering-backend-xyz.onrender.com
```

### 2. Backend - Render Environment Variables
In your Render backend dashboard, update the `FRONTEND_URL` variable:
```
FRONTEND_URL=https://your-actual-frontend-app.onrender.com
```

### 3. Redeploy Both Services
After updating the environment variables:
1. Redeploy your backend on Render (or it will auto-deploy if connected to GitHub)
2. Redeploy your frontend on Render

---

## How to Find Your URLs

### Backend URL
1. Go to Render dashboard
2. Click on your backend service
3. Copy the URL at the top (e.g., `https://yourapp.onrender.com`)

### Frontend URL
1. Go to Render dashboard
2. Click on your frontend service
3. Copy the URL at the top (e.g., `https://yourapp.onrender.com`)

---

## Next Steps

1. ✅ Code changes are ready (already done)
2. ⏳ Update `frontend/.env.production` with your backend URL
3. ⏳ Update backend `FRONTEND_URL` env variable on Render
4. ⏳ Commit and push changes to GitHub
5. ⏳ Redeploy both services on Render
6. ✅ Test the deployment

---

## Testing After Deployment

1. Open your frontend URL in browser
2. Press F12 to open DevTools
3. Go to Network tab
4. Try to login or browse restaurants
5. Check that API calls are going to your backend URL (not localhost)

If you see CORS errors or network errors, double-check that:
- Backend `FRONTEND_URL` matches your frontend URL exactly
- Frontend `VITE_API_URL` matches your backend URL exactly
- Both services have been redeployed after env changes
