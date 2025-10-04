# 🚀 YOUR DEPLOYMENT CONFIGURATION

## ✅ Complete Setup

### Frontend URL (Render):
```
https://food-ordering-app-frontend-zh2d.onrender.com
```

### Backend URL (Render):
```
https://food-ordering-app-backend-fgh4.onrender.com
```

---

## 📝 FINAL ACTION REQUIRED

### Go to Render Backend Dashboard NOW:

1. **Open:** https://dashboard.render.com
2. **Select:** Your backend service (`food-ordering-app-backend-fgh4`)
3. **Click:** "Environment" tab on the left
4. **Add/Update this variable:**
   - **Key:** `FRONTEND_URL`
   - **Value:** `https://food-ordering-app-frontend-zh2d.onrender.com`
5. **Click:** "Save Changes"
6. **Wait:** For automatic redeploy (~2-3 minutes)

---

## ✅ Already Configured (No Action Needed)

### Frontend Configuration:
- ✅ `.env.production` set to backend URL
- ✅ All API calls use centralized axios
- ✅ Code pushed to GitHub
- ✅ Will auto-deploy from GitHub

### Backend Configuration:
- ✅ CORS configured to use FRONTEND_URL
- ✅ All other environment variables set
- ✅ Code pushed to GitHub

---

## 🧪 Testing After Deployment

### 1. Check Backend Health:
Open in browser:
```
https://food-ordering-app-backend-fgh4.onrender.com/
```
Should show: **"API is up and running!"**

### 2. Check Restaurants Endpoint:
```
https://food-ordering-app-backend-fgh4.onrender.com/api/restaurants
```
Should return JSON array of restaurants

### 3. Test Frontend:
```
https://food-ordering-app-frontend-zh2d.onrender.com
```

**Open DevTools (F12) → Network Tab:**
- Browse restaurants
- Try to login
- Check API calls go to: `https://food-ordering-app-backend-fgh4.onrender.com/api/...`

---

## 🔍 Troubleshooting

### ❌ CORS Error
**Cause:** FRONTEND_URL doesn't match  
**Fix:** Verify it's exactly `https://food-ordering-app-frontend-zh2d.onrender.com` (no trailing slash)

### ❌ Network Error / Failed to Fetch
**Cause:** Backend not reachable  
**Fix:** 
- Check backend is "Live" on Render
- Verify backend URL is correct in `.env.production`
- Hard refresh browser (Ctrl+Shift+R)

### ❌ 404 on API Calls
**Cause:** Routes not matching  
**Fix:** Check Render logs for backend errors

### ❌ Images/Assets Not Loading
**Cause:** Build path issue  
**Fix:** Check frontend build logs on Render

---

## 📊 Environment Variables Summary

### Backend (On Render Dashboard):
```env
PORT=5000
MONGO_URI=mongodb+srv://test_1:u3dDMQRTgm2z5Rj4@cluster0.2ylu1gh.mongodb.net/
JWT_SECRET=somerandomsecretstring123!@#
FRONTEND_URL=https://food-ordering-app-frontend-zh2d.onrender.com
EMAIL_USER=ptsa1209@gmail.com
EMAIL_PASS=mejcymhyeufjmqpp
```

### Frontend (Already Committed):
```env
VITE_API_URL=https://food-ordering-app-backend-fgh4.onrender.com
```

---

## ⏱️ Expected Timeline

1. **Now:** Add FRONTEND_URL to backend on Render
2. **2-3 mins:** Backend redeploys automatically
3. **~30 secs:** Frontend redeploys (already triggered by git push)
4. **Ready!** Both services live and communicating

---

## 🎯 Success Criteria

When everything works:
- ✅ Frontend loads at your Render URL
- ✅ Can browse restaurants
- ✅ Can register/login
- ✅ Can add items to cart
- ✅ Can place orders
- ✅ No CORS errors in console
- ✅ API calls visible in Network tab going to backend URL

---

## 🆘 Still Need Help?

Check these in order:
1. Render backend logs (click "Logs" tab)
2. Render frontend logs
3. Browser console errors (F12)
4. Network tab in DevTools

**Common issue:** Render free tier can take 30-60 seconds to "wake up" on first request.

---

**You're almost there! Just add that one environment variable and you'll be LIVE! 🎉**
