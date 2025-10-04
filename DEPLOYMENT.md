# Deployment Guide - Render.com

## Overview
This guide explains how to deploy your food ordering app to Render.com with the frontend and backend as separate services.

## Prerequisites
- Both frontend and backend deployed on Render.com
- Backend URL from Render (e.g., `https://your-backend.onrender.com`)
- Frontend URL from Render (e.g., `https://your-frontend.onrender.com`)

---

## Backend Deployment (Already Done)

### Environment Variables on Render
In your Render backend service, add these environment variables:

```
PORT=5000
MONGO_URI=mongodb+srv://test_1:u3dDMQRTgm2z5Rj4@cluster0.2ylu1gh.mongodb.net/
JWT_SECRET=somerandomsecretstring123!@#
FRONTEND_URL=https://your-frontend-app.onrender.com
EMAIL_USER=ptsa1209@gmail.com
EMAIL_PASS=mejcymhyeufjmqpp
```

**Important:** Replace `https://your-frontend-app.onrender.com` with your actual Render frontend URL.

---

## Frontend Deployment Configuration

### Step 1: Update `.env.production` File

In the `frontend/.env.production` file, replace the placeholder with your actual Render backend URL:

```
VITE_API_URL=https://your-backend-app.onrender.com
```

**Example:**
```
VITE_API_URL=https://food-ordering-backend-abc123.onrender.com
```

### Step 2: Render Environment Variables (Optional)

Alternatively, you can set the environment variable directly in Render's dashboard:

1. Go to your frontend service in Render
2. Navigate to "Environment" tab
3. Add: `VITE_API_URL = https://your-backend-app.onrender.com`

### Step 3: Build Command on Render

Ensure your frontend service has the correct build settings:

- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm run preview` or use a static site host
- **Publish Directory:** `dist`

---

## How It Works

### Development (Local)
- Frontend proxy in `vite.config.js` redirects `/api` requests to `http://localhost:5000`
- Uses `.env` file with `VITE_API_URL=http://localhost:5000`

### Production (Render)
- Frontend uses `.env.production` with your Render backend URL
- All API calls use the configured axios instance from `src/api/axios.js`
- Backend CORS is configured to accept requests from your frontend URL

---

## Files Changed

### Frontend
1. **`frontend/.env`** - Local development config
2. **`frontend/.env.production`** - Production config (UPDATE THIS!)
3. **`frontend/src/api/axios.js`** - New axios configuration with baseURL
4. **All page files** - Updated to use configured axios instead of default

### Backend
1. **`backend/server.js`** - Updated CORS to use FRONTEND_URL from env
2. **`backend/.env`** - Added FRONTEND_URL variable

---

## Testing the Deployment

### 1. Check Backend Health
Visit your backend URL in browser:
```
https://your-backend-app.onrender.com/
```
You should see: "API is up and running!"

### 2. Test API Endpoints
Try accessing an API endpoint:
```
https://your-backend-app.onrender.com/api/restaurants
```

### 3. Check Frontend
- Visit your frontend URL
- Open browser DevTools (F12) → Network tab
- Try to load restaurants or login
- Check if API calls are going to your backend URL

### 4. Common Issues

**Issue:** "CORS error"
**Solution:** Make sure `FRONTEND_URL` in backend .env matches your exact frontend URL

**Issue:** "Network Error" or "Failed to fetch"
**Solution:** 
- Verify backend is running on Render
- Check `VITE_API_URL` in frontend `.env.production`
- Make sure you rebuilt frontend after changing .env.production

**Issue:** API calls go to localhost
**Solution:** 
- Clear browser cache (Ctrl+Shift+R)
- Verify `.env.production` is being used (check Render build logs)

---

## Quick Checklist

- [ ] Backend deployed on Render
- [ ] Frontend deployed on Render
- [ ] Updated `backend/.env` with `FRONTEND_URL` (your Render frontend URL)
- [ ] Updated `frontend/.env.production` with `VITE_API_URL` (your Render backend URL)
- [ ] Redeployed both services after env changes
- [ ] Tested API calls in browser DevTools

---

## URLs to Update

**Replace these placeholders:**

1. In `frontend/.env.production`:
   - `https://your-backend-app.onrender.com` → Your actual Render backend URL

2. In Render Backend Environment Variables:
   - `FRONTEND_URL=https://your-frontend-app.onrender.com` → Your actual Render frontend URL

---

## Support

If you're still having issues:
1. Check Render logs for both services
2. Verify environment variables are set correctly
3. Make sure both services are deployed successfully
4. Test API endpoints directly in browser
