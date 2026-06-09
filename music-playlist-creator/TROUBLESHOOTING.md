# 🔧 AI Feature Troubleshooting Guide

## ✅ Your Integration is Working!

If you see **"Rate limit exceeded"**, that means:
- ✅ Your API key is valid and working
- ✅ The code is correct
- ✅ OpenRouter received your request
- ⏳ You just hit the free tier usage limit

**This is normal for free tier usage!**

---

## 🚀 Quick Solutions

### **Solution 1: Wait and Retry** ⭐ Recommended

Free tier limits reset periodically:

1. **Wait 1-5 minutes**
2. **Click "Get AI Description" again**
3. Should work!

The button will automatically update to "✨ Get AI Description" after 60 seconds.

---

### **Solution 2: Switch Models**

Different free models have different rate limits:

**In `config.js`, try changing the MODEL:**

**Option A: Llama (currently using)**
```javascript
MODEL: 'meta-llama/llama-3.2-3b-instruct:free',
```

**Option B: Gemma**
```javascript
MODEL: 'google/gemma-2-9b-it:free',
```

Save and refresh the page, then try again.

---

### **Solution 3: Check Your OpenRouter Account**

1. Go to: https://openrouter.ai/
2. Log in
3. Click **"Credits"** or **"Activity"**
4. See:
   - How many requests you've made
   - When your limit resets
   - Current balance

---

### **Solution 4: Add Credits** (Optional)

If you want unlimited access:

1. Go to: https://openrouter.ai/credits
2. Add $5 credit (~500-1000 descriptions)
3. Very cheap: ~$0.01 per description
4. No more rate limits!

**You don't need to do this** - free tier works fine if you wait between requests.

---

## 📊 Common Error Messages

### ✅ "Rate limit exceeded"
**What it means:** You've used your free requests. Wait and try again.
**Fix:** Wait 1-5 minutes, then retry.

### ❌ "Invalid API key"
**What it means:** Your API key is wrong or expired.
**Fix:** 
1. Get new key from https://openrouter.ai/keys
2. Update `config.js`
3. Save and refresh

### ❌ "Unable to connect"
**What it means:** Network or CORS issue.
**Fix:**
1. Check your internet connection
2. Try a different browser
3. Disable browser extensions temporarily
4. Use a local HTTP server instead of opening file directly

### ❌ "Received invalid description format"
**What it means:** The API returned unexpected data.
**Fix:**
1. Try the other free model in config.js
2. Check browser console (F12) for details
3. Try test-api.html to see raw response

---

## 🧪 Debug Tools I Created

### **test-api.html**
A test page to diagnose issues:

1. Open `test-api.html` in browser
2. Click **"1. Test Config"** - Checks your API key
3. Click **"2. Test API Call"** - Tests the API directly
4. See detailed results in the output box

### **Browser Console Logs**
Detailed logging is now enabled:

1. Open `index.html`
2. Press **F12** (Developer Tools)
3. Click **Console** tab
4. Try "Get AI Description"
5. See detailed logs:
   - Request details
   - Response status
   - Error information

---

## 💡 Pro Tips

### **Manage Your Free Tier:**
- Free tier has **limited requests per hour/day**
- Use it wisely during testing
- Generate descriptions for unique playlists only
- Descriptions are cached in the playlist object

### **Best Practices:**
1. Test with 1-2 playlists first
2. Wait between requests if you hit rate limit
3. Switch models if one is rate limited
4. Consider adding $5 credit for unlimited testing

### **Development vs Production:**
- **Free tier:** Great for learning and testing
- **With credits:** Better for production use
- **Backend proxy:** Best for real products (hides API key)

---

## 📞 Still Having Issues?

### Check these in order:

1. **Open test-api.html**
   - Does "Test Config" pass? → API key is good
   - Does "Test API Call" work? → Integration is good
   - What error do you see? → That's the real issue

2. **Check Browser Console (F12)**
   - What does "Making API request to..." show?
   - What's the "Response status"?
   - Copy the error messages

3. **Verify config.js**
   - API key starts with `sk-or-v1-`
   - Wrapped in single quotes `'...'`
   - No extra spaces or line breaks
   - File is saved

4. **Try Different Browser**
   - Chrome, Firefox, Safari
   - Disable extensions
   - Check if CORS is the issue

---

## 🎯 Rate Limit Details

**Free Tier Limits (typical):**
- ~10-20 requests per minute
- ~100-200 requests per day
- Varies by model

**When limits reset:**
- Per-minute limits: Reset after 60 seconds
- Per-hour limits: Reset on the hour
- Per-day limits: Reset at midnight UTC

**Check exact limits:**
- https://openrouter.ai/docs/limits

---

## ✨ Everything Working Now?

Once your rate limit resets (1-5 minutes), you should be able to:

1. ✅ Click any playlist
2. ✅ Click "Get AI Description"
3. ✅ See "Generating..." loading state
4. ✅ Wait 3-5 seconds
5. ✅ See beautiful AI-generated description!

The AI will create unique 2-3 sentence descriptions for each playlist based on:
- Playlist name
- Creator
- Song titles and artists
- Musical vibe and mood

**Enjoy your working AI feature!** 🎉
