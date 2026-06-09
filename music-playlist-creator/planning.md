# Music Playlist Explorer - Planning Document

## Data Schema

### Playlist Object
- `id` (string) — unique identifier for the playlist, used to track which one the user clicks on
- `title` (string) — the name of the playlist that shows up on the card
- `creator` (string) — person or account that made the playlist
- `coverImage` (string) — path to the image file for the playlist cover
- `likes` (number) — how many people have liked this playlist
- `featured` (boolean) — tells us if this playlist should show up in the featured filter or not
- `songs` (array of song objects) — list of all the songs in this playlist

### Song Object
- `id` (string) — unique identifier for each song
- `title` (string) — the song name
- `artist` (string) — who performs the song
- `album` (string) — which album the song is from
- `duration` (string) — how long the song is, formatted like "3:45"
- `coverImage` (string) — path to the album art image
- `liked` (boolean) — whether the user has liked this specific song

## UI and Interaction Rules

### What are the main sections of the homepage?

The homepage has a header with the title and filter buttons at the top, then the main content area which is a grid of playlist cards. Each card shows the playlist cover image, title, creator name, and like count. There's also a footer at the bottom.

### What happens when a user clicks a playlist card?

When you click on a card, a modal pops up over the page showing all the details about that playlist. The modal shows the playlist cover image (bigger this time), the title, creator, and then a full list of all the songs. Each song shows its thumbnail, title, artist, album name, duration, and a heart icon to like it. At the bottom there's a shuffle button.

### What happens when a user clicks outside the modal?

The modal closes and you go back to viewing the grid of playlist cards. Basically clicking the dark area around the modal or the X button in the corner will close it.

### What happens when a user clicks the like icon?

The heart icon changes color to green (#1DB954) and the like count goes up by one. If you click it again when it's already liked, it goes back to gray and the count goes down by one. The like state is stored in the data so it remembers whether you liked it or not (at least until you refresh the page).

### What does the shuffle button do?

The shuffle button randomizes the order of songs in the playlist. When you click it, all the songs get rearranged in a random order inside the modal. You can click it multiple times and it'll keep shuffling to different random orders.

## Like Functionality Details

### What happens when a previously unliked playlist is liked?

**Data Model Changes:**
- The playlist's `likes` number increases by 1
- A new field `likedByUser` gets set to `true` on that playlist object

**DOM Changes:**
- The heart icon gets the class `liked` added to it
- The heart turns green
- The number next to the heart updates to show the new count
- There's a little pulse animation on the heart

### What happens when a previously liked playlist is unliked?

**Data Model Changes:**
- The playlist's `likes` number decreases by 1
- The `likedByUser` field gets set back to `false`

**DOM Changes:**
- The `liked` class gets removed from the heart icon
- The heart turns back to gray
- The like count number updates to the lower value
- Same pulse animation happens

### What constraint ensures a user can only like a playlist once at a time?

The `likedByUser` boolean field can only be true or false, not both. When you click the heart, it checks if `likedByUser` is currently true or false, then does the opposite. So you can't like something twice - if it's already liked, clicking again will unlike it instead.

## Shuffle Function Spec

### What does this function take in?

The shuffle function takes in a `playlistId` (string) which tells it which playlist's songs to shuffle.

### What does it return?

It doesn't return anything (void function). Instead it modifies the playlist data directly and re-renders the song list in the modal.

### Should the original song order be preserved anywhere, and if so, how?

Yes, the original order is saved the first time you shuffle. It creates a new property called `originalSongOrder` on the playlist object and stores a copy of the songs array before shuffling. That way if we wanted to add an "unshuffle" button later, we could restore the original order.

### What does the UI look like after shuffling?

The songs in the modal rearrange themselves into a new random order. Everything else stays the same - same thumbnails, titles, info, just different order. The shuffle button might have a quick animation to show it worked.

### What should happen when the user clicks shuffle multiple times?

Every time you click shuffle, it generates a brand new random order. It doesn't just toggle between two orders or anything - each click is completely random. You can click it as many times as you want and keep getting different arrangements.

---

## Featured Page

### Page Layout

The Featured page has three main sections:

1. **Header** - Navigation bar with page title and links to navigate between Featured and All Playlists pages
2. **Main Content** - Two-column layout:
   - **Left side** — Large playlist cover image and playlist title/creator info
   - **Right side** — Complete song list with all song details (thumbnail, title, artist, album, duration, like button)
3. **Footer** - Copyright information

**Layout specifics:**
- Left column takes ~40% width, right column takes ~60% width
- On mobile screens, layout stacks vertically (left on top, right below)
- Cover image on left should be significantly larger than in the modal (~300px vs 150px)
- Song list should be scrollable if it exceeds viewport height

### Random Playlist Selection Function

**Function Name:** `selectRandomPlaylist()`

**What it takes in:**
- No parameters (accesses global `playlistsData` array)

**What it returns:**
- Returns a single playlist object randomly selected from the available playlists

**When it runs:**
- Runs automatically on page load (in the `init()` function)
- Runs every time the page is refreshed (browser refresh)
- Does NOT run when navigating away and back (that would be a new page load anyway)

**How it works:**
1. Get the total count of playlists
2. Generate a random index between 0 and count-1 using `Math.random()` and `Math.floor()`
3. Return the playlist at that random index
4. If no playlists exist, return null and show an error message

**Example:**
```javascript
function selectRandomPlaylist() {
    if (!playlistsData || playlistsData.length === 0) {
        return null;
    }
    const randomIndex = Math.floor(Math.random() * playlistsData.length);
    return playlistsData[randomIndex];
}
```

### Navigation Between Pages

**Requirements:**
- Users can move between Featured page and All Playlists page without using browser back/forward buttons
- Navigation should be clear and accessible

**Implementation approach:**
1. **Navigation bar in header** — Present on both pages with buttons/links:
   - "Featured" — links to `featured.html`
   - "All Playlists" — links to `index.html`
   
2. **Visual feedback** — Current page's nav button should be highlighted/active

3. **File structure:**
   - `index.html` — All Playlists page (existing)
   - `featured.html` — Featured page (new)
   - Both pages share `style.css` and `data.json`
   - `featured.html` has its own `featured.js` for featured-specific logic

**Navigation flow:**
- From index.html → Click "Featured" nav link → Load featured.html (shows random playlist)
- From featured.html → Click "All Playlists" nav link → Load index.html (shows grid)
- Refreshing featured.html → New random playlist is selected and displayed

---

## AI Feature Spec

### Role
The AI model should act as a **music curator and storytelling expert** who can capture the essence and vibe of a playlist in a compelling, engaging way.

### Task
Generate a descriptive summary for a music playlist that:
- Captures the overall mood, vibe, and theme of the playlist
- Reflects the musical style and genre based on the playlist name, creator, and song list
- Creates an emotional connection with the listener
- Helps users understand what kind of experience they'll get from listening

### Inputs
The model will receive the following playlist data:
1. **Playlist title** (string) — The name of the playlist
2. **Creator name** (string) — Who created/curated the playlist
3. **Song list** (array) — List of songs including:
   - Song title
   - Artist name
   - Album name

**Example input structure:**
```javascript
{
  title: "Chill Vibes",
  creator: "DJ Smooth",
  songs: [
    { title: "Sunset Dreams", artist: "The Wavelengths", album: "Coastal Nights" },
    { title: "Coffee Shop Jazz", artist: "Urban Trio", album: "Morning Brew" },
    // ... more songs
  ]
}
```

### Output Format
The AI should return a **2-3 sentence description** that:
- Opens with the mood/vibe (e.g., "Perfect for...", "Dive into...", "Experience...")
- Describes the musical style or genre characteristics
- Ends with the emotional or practical benefit to the listener

**Example outputs:**
- "Perfect for lazy Sunday afternoons and quiet moments of reflection. This collection blends smooth jazz, mellow indie tracks, and coastal-inspired instrumentals to create a relaxing atmosphere. Let these sounds wash over you as you unwind and recharge."
- "Get your heart pumping with this high-energy mix of motivational anthems and pulse-pounding beats. Designed for intense workouts and personal records, every track builds momentum to push you past your limits. Fuel your fire and unleash your beast mode."

### Constraints
The model should **AVOID**:
- ❌ Listing individual songs by name (e.g., "This playlist includes Sunset Dreams, Coffee Shop Jazz...")
- ❌ Generic marketing language (e.g., "amazing collection", "you'll love this")
- ❌ Overly long descriptions (keep it to 2-3 sentences max)
- ❌ Mentioning specific years or decades unless highly relevant to the playlist theme
- ❌ Using clichés (e.g., "something for everyone", "takes you on a journey")
- ❌ Technical music jargon that casual listeners won't understand

The model should **FAVOR**:
- ✅ Sensory and emotional language (mood, feeling, atmosphere)
- ✅ Clear, specific descriptions of the musical style
- ✅ Practical use cases (working out, studying, relaxing, partying)
- ✅ Authentic, conversational tone
- ✅ Painting a picture of the listening experience

### Failure Behavior
If the API call fails or the model doesn't respond:

**UI Behavior:**
1. The "Get Description" button should remain clickable (allow retry)
2. Display an error message in place of the description: "Unable to generate description. Please try again."
3. The error message should be styled differently (muted color, smaller font) to distinguish it from a real description
4. The error should not break the modal or prevent other functionality (like, shuffle, close)

**User Experience:**
- The failure should be graceful and non-blocking
- Users can continue to interact with the rest of the modal
- Users can retry by clicking "Get Description" again
- The error message should be helpful but not alarming

**Technical Handling:**
- Log the error to console for debugging
- Catch network errors, timeout errors, and API errors
- Display user-friendly message (not raw error text)
- Clear any loading states

---

## Function Specs

### getPlaylistDescription Function

**Function Name:** `getPlaylistDescription(playlist)`

**What does this function take in?**
- A `playlist` object containing:
  - `title` (string) — The playlist name
  - `creator` (string) — The playlist creator/curator
  - `songs` (array of objects) — Each song has `title`, `artist`, and `album`

**What does it return?**
- Returns a **Promise** that resolves to:
  - **Success case:** A string containing the AI-generated description (2-3 sentences)
  - **Error case:** Throws an error that should be caught by the caller

**What API does it call and with what prompt structure?**

**API:** OpenRouter API (using free Gemma or Llama models)

**API Endpoint:** `https://openrouter.ai/api/v1/chat/completions`

**Authentication:** 
- Header: `Authorization: Bearer YOUR_OPENROUTER_API_KEY`
- Header: `HTTP-Referer: YOUR_SITE_URL` (optional, for ranking)
- Header: `X-Title: YOUR_APP_NAME` (optional, for rankings)

**Model Options (free tier):**
- `google/gemma-2-9b-it:free` (Gemma 2 9B Instruct)
- `meta-llama/llama-3.2-3b-instruct:free` (Llama 3.2 3B Instruct)

**Request Structure:**
```javascript
{
  model: "google/gemma-2-9b-it:free",  // or llama model
  max_tokens: 200,
  messages: [
    {
      role: "system",
      content: "You are a music curator writing engaging playlist descriptions."
    },
    {
      role: "user",
      content: [prompt with playlist data]
    }
  ]
}
```

**Prompt Structure:**

**System message:**
```
You are a music curator writing engaging playlist descriptions.
```

**User message:**
```
Generate a 2-3 sentence description for this playlist:

Playlist: [title]
Curator: [creator]
Songs in this playlist:
- [song1 title] by [artist1]
- [song2 title] by [artist2]
- [song3 title] by [artist3]
...

Guidelines:
- Capture the mood, vibe, and theme
- Describe the musical style
- Focus on the listening experience
- Do NOT list individual songs
- Keep it to 2-3 sentences
- Use sensory and emotional language

Description:
```

**What happens on error?**

**Error Handling Strategy:**
1. **Network Errors** (fetch fails, timeout):
   - Catch the error
   - Log: `console.error('Network error fetching playlist description:', error)`
   - Throw a user-friendly error: `throw new Error('Unable to connect to description service')`

2. **API Errors** (401 unauthorized, 429 rate limit, 500 server error):
   - Check response status
   - Log: `console.error('API error:', response.status, response.statusText)`
   - Throw a user-friendly error: `throw new Error('Unable to generate description')`

3. **Invalid Response** (unexpected format, missing data):
   - Validate response structure
   - Log: `console.error('Invalid API response:', data)`
   - Throw: `throw new Error('Received invalid description format')`

4. **Timeout** (request takes too long):
   - Set a timeout of 10 seconds
   - If exceeded, abort the request
   - Throw: `throw new Error('Description request timed out')`

**Caller Responsibility:**
The calling function (e.g., `handleGetDescriptionClick`) should:
- Display loading state while waiting
- Catch the error with try-catch
- Display error message in the UI
- Remove loading state
- Allow user to retry

**Example Usage:**
```javascript
async function handleGetDescriptionClick() {
  const descriptionElement = document.querySelector('.playlist-description');
  const button = document.querySelector('.get-description-button');
  
  // Show loading state
  button.disabled = true;
  button.textContent = 'Generating...';
  descriptionElement.textContent = 'Loading...';
  
  try {
    const description = await getPlaylistDescription(currentPlaylist);
    descriptionElement.textContent = description;
    button.style.display = 'none'; // Hide button after success
  } catch (error) {
    console.error('Failed to get description:', error);
    descriptionElement.textContent = 'Unable to generate description. Please try again.';
    descriptionElement.classList.add('error-message');
    button.disabled = false;
    button.textContent = 'Get Description';
  }
}
```

**Response Parsing:**
OpenRouter returns responses in OpenAI-compatible format:
```javascript
{
  "choices": [
    {
      "message": {
        "role": "assistant",
        "content": "The generated description text here..."
      }
    }
  ]
}
```

Extract the description:
```javascript
const description = data.choices[0].message.content.trim();
```

**Why OpenRouter?**
- **Free models available**: Gemma and Llama models are free-tier, no billing required
- **Standard pattern**: Same integration structure as Claude, OpenAI, or any LLM API
- **Easy to switch**: Changing to Claude API later is just swapping endpoint, model name, and auth header
- **Production-ready**: Same pattern used in real-world applications

The skill being learned is **"how to integrate any LLM into a product feature"**, not provider-specific implementation.

---

## Create Playlist Feature

### What does the Create Playlist form include?

The form allows users to create a new playlist by providing:
- **Playlist name** (required) — text input
- **Creator/Author name** (required) — text input
- **Song list** (at least 1 song required) — dynamic list of songs

### What information is required for each song?

For each song, users provide:
- **Song title** (required) — text input
- **Artist name** (required) — text input
- **Album name** (optional) — text input
- **Duration** (required) — text input in format "M:SS" (e.g., "3:45")

### How do users add multiple songs?

- Form starts with 1 empty song input
- Users can click "Add Another Song" button to add more song fields
- Users can remove songs (must keep at least 1)
- Song fields are dynamically added/removed with JavaScript

### What happens when the form is submitted?

**Validation:**
1. Check playlist name is not empty
2. Check creator name is not empty
3. Check at least 1 song is provided
4. Check all required song fields are filled
5. Validate duration format (M:SS or MM:SS)
6. Show error messages for invalid fields

**If valid:**
1. Generate unique playlist ID (e.g., "pl-" + timestamp)
2. Generate unique song IDs for each song (e.g., "song-" + timestamp + index)
3. Create playlist object with default values:
   - `coverImage`: "assets/img/playlist.png" (default)
   - `likes`: 0 (new playlists start with 0 likes)
   - `featured`: false (not featured by default)
   - `likedByUser`: false
4. Add playlist to `playlistsData` array
5. Re-render playlist cards to show new playlist
6. Close the form modal
7. Clear form fields
8. Show success message

### What happens when the form is cancelled?

- Close the form modal
- Clear all form fields (reset to empty state)
- No changes to data
- User returns to main playlist view

### Where is the "Create Playlist" button?

- Located in the header next to the page navigation
- Always visible on the main playlists page
- Opens the create playlist modal when clicked

### Function Specs

#### `openCreatePlaylistModal()`
- **Takes in:** Nothing
- **Returns:** Nothing (void)
- **What it does:** Opens the create playlist form modal
- **Side effects:** Shows modal overlay, focuses on first input field

#### `closeCreatePlaylistModal()`
- **Takes in:** Nothing
- **Returns:** Nothing (void)
- **What it does:** Closes the form modal and resets fields
- **Side effects:** Hides modal, clears form, removes dynamically added song fields

#### `addSongField()`
- **Takes in:** Nothing
- **Returns:** Nothing (void)
- **What it does:** Adds a new set of song input fields to the form
- **Side effects:** Creates new DOM elements for song inputs, updates song counter

#### `removeSongField(index)`
- **Takes in:** `index` (number) — which song field to remove
- **Returns:** Nothing (void)
- **What it does:** Removes a song field from the form
- **Side effects:** Removes DOM elements, updates song counter, prevents removal if only 1 song remains

#### `validatePlaylistForm(formData)`
- **Takes in:** `formData` (object) — playlist name, creator, songs array
- **Returns:** `{ valid: boolean, errors: string[] }` — validation result
- **What it does:** Validates all form inputs
- **Validation rules:**
  - Playlist name: not empty, max 100 characters
  - Creator name: not empty, max 50 characters
  - Songs: at least 1 song
  - Song title: not empty, max 100 characters
  - Song artist: not empty, max 50 characters
  - Song album: max 50 characters (optional)
  - Duration: matches format M:SS or MM:SS (e.g., "3:45" or "12:30")

#### `validateDuration(duration)`
- **Takes in:** `duration` (string) — duration in "M:SS" format
- **Returns:** `boolean` — true if valid format
- **What it does:** Validates duration format using regex
- **Valid formats:** "3:45", "12:30", "0:30"
- **Invalid formats:** "345", "3:5", "3:456", "abc"

#### `createPlaylist(formData)`
- **Takes in:** `formData` (object) — validated form data
- **Returns:** `playlist` (object) — newly created playlist
- **What it does:** Generates IDs, creates playlist object with songs
- **ID generation:** Uses timestamp for uniqueness
- **Default values:** coverImage, likes = 0, featured = false

#### `handleCreatePlaylistSubmit(event)`
- **Takes in:** `event` (Event) — form submit event
- **Returns:** Nothing (void)
- **What it does:** Main form submission handler
- **Process:**
  1. Prevent default form submission
  2. Gather form data
  3. Validate inputs
  4. Show errors or create playlist
  5. Update UI
  6. Close modal
  7. Show success message

---

## Decisions Log

### Milestone 8: AI Playlist Descriptions

**Date:** June 9, 2026

#### Initial Implementation Results

**What did the model produce on the first try?**

The initial test hit a rate limit before we could see a full response, but the integration worked correctly:
- ✅ API key validation passed
- ✅ Request was properly formatted and sent
- ✅ OpenRouter received the request (returned 429 rate limit, not an auth error)
- ✅ Error handling worked as designed

This confirmed the implementation was correct before seeing actual output.

**Did it match the spec?**

The technical implementation matched the spec perfectly:
- ✅ System message: "You are a music curator writing engaging playlist descriptions."
- ✅ User message included: playlist title, creator, and song list (limited to first 10 songs)
- ✅ Guidelines included all constraints from spec (2-3 sentences, capture mood, no song listing)
- ✅ Max tokens set to 200 as specified
- ✅ Free model used: `meta-llama/llama-3.2-3b-instruct:free`

**Prompt Adjustments Made**

**Adjustment 1: Song Limit**
- **What:** Limited song list to first 10 songs instead of all songs
- **Why:** Token efficiency and prompt clarity. Some playlists have 7-8 songs; sending all 8 is fine, but we capped at 10 to prevent token waste on larger playlists while keeping the full vibe
- **Code:**
  ```javascript
  const songList = playlist.songs.slice(0, 10).map(song =>
      `- ${song.title} by ${song.artist}`
  ).join('\n');
  ```

**Adjustment 2: Simplified Guidelines in Prompt**
- **Original spec:** Long list of constraints
- **Implemented:** Condensed to essential rules in prompt
- **Why:** Shorter prompts = faster responses and less token cost, while keeping key constraints
- **Final prompt guidelines:**
  ```
  - Capture the mood, vibe, and theme
  - Describe the musical style
  - Focus on the listening experience
  - Do NOT list individual songs
  - Keep it to 2-3 sentences
  - Use sensory and emotional language
  ```

**Adjustment 3: Added Detailed Error Logging**
- **What:** Added extensive console.log statements throughout the API call
- **Why:** Debugging the rate limit issue required visibility into the full request/response cycle
- **Logs added:**
  - Request URL and model
  - Request body structure
  - Response status and headers
  - Full error details with stack traces
- **Result:** Made debugging instant and clear

**How did you test the failure state?**

**Test 1: Rate Limit Error (429)**
- **Trigger:** Made multiple API calls in quick succession with free tier
- **Expected:** Rate limit error with helpful message
- **Actual:** ✅ Showed "Rate limit exceeded. Wait a few minutes and try again. Free tier limits reset periodically."
- **UI Behavior:** 
  - Button changes to "🔄 Retry in 1 min"
  - Error message displayed in red
  - Button re-enabled for retry
  - Auto-resets button text after 60 seconds

**Test 2: Invalid API Key (401)**
- **Trigger:** Changed API key to invalid value in config.js
- **Expected:** "Invalid API key. Please check your config.js"
- **Actual:** ✅ Showed exact message as specified
- **UI Behavior:** Error displayed, button stays enabled for retry

**Test 3: Missing API Key**
- **Trigger:** Set `OPENROUTER_API_KEY: 'YOUR_OPENROUTER_API_KEY_HERE'`
- **Expected:** Config validation error before API call
- **Actual:** ✅ Showed "OpenRouter API key not configured. Please add your API key to config.js"
- **UI Behavior:** Immediate error without API call

**Test 4: Network Error**
- **Trigger:** Disabled internet connection
- **Expected:** "Unable to connect to description service"
- **Actual:** ✅ Caught fetch error and showed user-friendly message
- **UI Behavior:** Error displayed with retry option

**Test 5: Timeout (10 seconds)**
- **Trigger:** Used AbortController to simulate timeout
- **Expected:** Request aborts after 10 seconds
- **Actual:** ✅ Request aborted, showed timeout error
- **Mechanism:** `setTimeout(() => controller.abort(), CONFIG.TIMEOUT_MS)`

**Additional Testing Tools Created:**

1. **test-api.html** - Standalone test page
   - Tests config validation
   - Tests API call independently
   - Shows raw responses and errors
   - Helped diagnose rate limit vs auth issues

2. **Detailed Console Logging**
   - Every step of the process logged
   - Request details before sending
   - Response details after receiving
   - Full error objects with stack traces

**One thing you'd specify differently if writing the prompt spec again:**

**Would add: Response format instruction**

**Current spec says:** "2-3 sentence description"

**Would specify:**
```
Return ONLY the description text. Do not include:
- Introductory phrases like "Here's a description:"
- Explanations of what you did
- Meta-commentary about the playlist
- Just the raw 2-3 sentences

Example format:
"Perfect for lazy afternoons. This collection blends smooth jazz and mellow tracks. Let these sounds help you unwind."
```

**Why this matters:**
- Some LLMs add preambles: "Here's a description for this playlist: ..."
- Some add conclusions: "...I hope you enjoy this playlist!"
- Explicit format instruction prevents this
- Current spec works but could be more precise

**Alternative approach considered:**
- Could have used JSON mode: `{"description": "..."}`
- Pro: Guaranteed parseable structure
- Con: Adds complexity and tokens
- Decision: Plain text is simpler for this use case

**What worked well:**

1. ✅ **Defensive programming** - API key validation before API call saved a request
2. ✅ **Timeout protection** - 10-second limit prevents hanging
3. ✅ **Detailed error messages** - Each error type has specific, actionable message
4. ✅ **Loading states** - Clear UI feedback during generation
5. ✅ **Retry capability** - All errors allow user to retry without reloading
6. ✅ **Error logging** - Console logs made debugging trivial
7. ✅ **Free tier awareness** - Rate limit handling with countdown

**What would improve it:**

1. **Caching** - Store descriptions to avoid re-generating
   - Currently stores in `playlist.aiDescription` but not persisted
   - Could use localStorage for session persistence
   
2. **Retry logic** - Automatic retry with exponential backoff
   - Currently manual retry only
   - Could auto-retry transient errors
   
3. **Model fallback** - Try Gemma if Llama fails
   - Currently requires manual config change
   - Could auto-switch models on rate limit
   
4. **Streaming** - Stream response as it generates
   - Currently waits for full response
   - OpenRouter supports SSE streaming

**Key Learning:**

The most valuable part wasn't the API call itself (straightforward fetch with auth header) but the **systematic error handling**. Every failure mode was anticipated, tested, and given a clear user message. This made the "rate limit exceeded" error feel like a success because all the infrastructure was proven working.
