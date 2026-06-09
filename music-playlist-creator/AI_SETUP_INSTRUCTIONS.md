# AI Playlist Description Setup Instructions

## 🎯 What You Need To Do

You just need to **paste your OpenRouter API key** into one file. Everything else is already set up!

---

## 📝 Step-by-Step Instructions

### Step 1: Get Your Free OpenRouter API Key

1. Go to: **https://openrouter.ai/keys**
2. Sign up or log in (free account)
3. Click **"Create Key"**
4. Copy the API key (it looks like: `sk-or-v1-...`)

### Step 2: Add Your API Key to config.js

1. Open the file: **`config.js`** (in the same folder as this README)
2. Find this line:
   ```javascript
   OPENROUTER_API_KEY: 'YOUR_OPENROUTER_API_KEY_HERE',
   ```
3. Replace `'YOUR_OPENROUTER_API_KEY_HERE'` with your actual API key:
   ```javascript
   OPENROUTER_API_KEY: 'sk-or-v1-1234567890abcdef...',
   ```
4. **Save the file**

### Step 3: Test It Out!

1. Open `index.html` in your browser
2. Click on any playlist card to open the modal
3. Click the **"✨ Get AI Description"** button
4. Wait a few seconds for the AI to generate a description
5. The description should appear below the button!

---

## ✅ That's It!

You're done! The AI feature should now work.

---

## 🔧 What's Already Set Up For You

Here's what I've already implemented:

### Files Created:
- ✅ **config.js** - Configuration file (you just add your API key)
- ✅ **config.example.js** - Example file for reference
- ✅ **.gitignore** - Prevents config.js from being committed to git

### Files Modified:
- ✅ **index.html** - Added description button and section to modal
- ✅ **script.js** - Added complete AI integration:
  - `getPlaylistDescription()` - Calls OpenRouter API
  - `handleGetDescriptionClick()` - Handles button clicks
  - Error handling and loading states
  - Timeout protection (10 seconds)
- ✅ **style.css** - Added beautiful styling for description section

### Features Implemented:
- ✅ **"Get AI Description" button** in playlist modal
- ✅ **Loading state** while AI generates description
- ✅ **Error handling** with helpful error messages
- ✅ **Retry functionality** if generation fails
- ✅ **Beautiful styling** with purple gradient theme
- ✅ **Security** - API key never committed to git

---

## 🎨 How It Works

When you click "Get AI Description":

1. **Button shows "Generating..."** and is disabled
2. **Script builds a prompt** with:
   - Playlist title
   - Creator name
   - List of songs (first 10)
3. **Calls OpenRouter API** with free Gemma model
4. **AI generates 2-3 sentences** capturing the vibe
5. **Description appears** in a styled box
6. **Button hides** after successful generation

If something goes wrong:
- Error message shows in red
- Button stays clickable for retry
- Console logs error details for debugging

---

## 🆓 Free Models Available

The config uses **free models** so you won't be charged:

**Default (in config.js):**
- `google/gemma-2-9b-it:free` - Gemma 2 9B Instruct

**Alternative (you can switch to):**
- `meta-llama/llama-3.2-3b-instruct:free` - Llama 3.2 3B Instruct

To switch models, just change the `MODEL` value in config.js.

---

## 🚨 Troubleshooting

### "OpenRouter API key not configured"
- You forgot to replace `'YOUR_OPENROUTER_API_KEY_HERE'` in config.js
- Make sure you saved the file after editing

### "Invalid API key"
- Your API key might be incorrect
- Check that you copied the full key from OpenRouter
- Make sure there are no extra spaces

### "Unable to connect to description service"
- Check your internet connection
- Make sure you can access https://openrouter.ai

### "Rate limit exceeded"
- You've made too many requests
- Wait a few minutes and try again
- Free tier has usage limits

### Button does nothing when clicked
- Open browser console (F12) to see error messages
- Make sure config.js is loaded (check Network tab)
- Verify script.js loads after config.js in index.html

---

## 📊 API Request Details

**Endpoint:** `https://openrouter.ai/api/v1/chat/completions`

**Request Format:**
```javascript
{
  model: "google/gemma-2-9b-it:free",
  max_tokens: 200,
  messages: [
    {
      role: "system",
      content: "You are a music curator writing engaging playlist descriptions."
    },
    {
      role: "user",
      content: "Generate a 2-3 sentence description for this playlist..."
    }
  ]
}
```

**Response Format:**
```javascript
{
  choices: [
    {
      message: {
        role: "assistant",
        content: "The generated description text..."
      }
    }
  ]
}
```

---

## 🔒 Security Notes

- **config.js is gitignored** - Your API key won't be committed
- **Never share your API key** publicly
- **Never commit config.js** to GitHub
- In production, you'd use a backend proxy instead of client-side API calls

---

## 📚 Files Overview

```
music-playlist-creator/
├── config.js                    ← ADD YOUR API KEY HERE
├── config.example.js            ← Example for reference
├── .gitignore                   ← Protects config.js
├── index.html                   ← Has description UI
├── script.js                    ← Has AI integration code
├── style.css                    ← Has description styles
├── AI_SETUP_INSTRUCTIONS.md     ← This file!
└── ... (other project files)
```

---

## 🎉 Example Output

When working correctly, you'll see descriptions like:

> "Perfect for lazy Sunday afternoons and quiet moments of reflection. This collection blends smooth jazz, mellow indie tracks, and coastal-inspired instrumentals to create a relaxing atmosphere. Let these sounds wash over you as you unwind and recharge."

> "Get your heart pumping with this high-energy mix of motivational anthems and pulse-pounding beats. Designed for intense workouts and personal records, every track builds momentum to push you past your limits."

---

## 💡 Pro Tips

1. **First time might be slow** - First API call can take 5-10 seconds
2. **Try different playlists** - Each gets a unique description based on its songs
3. **Check the console** - Open DevTools (F12) to see what's happening
4. **Descriptions are cached** - Opening same playlist again shows same description

---

## ✨ That's All!

Just add your API key to config.js and you're ready to go!

If you have any issues, check the browser console for error messages.
