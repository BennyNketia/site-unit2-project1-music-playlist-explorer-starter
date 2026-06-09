## Music Playlist Explorer — Planning Spec

### Data Schema

**Playlist Object:**
- `id` (string) — Unique identifier for the playlist, used for tracking and future features
- `title` (string) — Display name of the playlist shown on the card and modal
- `creator` (string) — Name of the person or entity who created the playlist
- `coverImage` (string) — URL or path to the playlist's cover art image
- `likes` (number) — Count of how many users have liked this playlist
- `featured` (boolean) — Whether this playlist should appear in the "Featured" filter
- `songs` (array of Song objects) — Collection of all songs included in this playlist

**Song Object:**
- `id` (string) — Unique identifier for the song
- `title` (string) — Name of the song
- `artist` (string) — Name of the performing artist
- `album` (string) — Name of the album this song belongs to
- `duration` (string) — Length of the song in "M:SS" format (e.g., "3:45")
- `coverImage` (string) — URL or path to the song's album art
- `liked` (boolean) — Whether the current user has liked this song (default: false)

**Design Rationale:**
- IDs are strings for future flexibility (could include UUIDs)
- Duration as string maintains format consistency and simplifies display
- `featured` flag enables filter without restructuring data
- `liked` on songs enables independent like tracking per song
- Embedded songs array keeps data cohesive (alternative would be separate songs.json with playlist_id references)

### UI and Interaction Rules
[Leave blank — fill in before Milestone 1]
What are the main sections of the homepage?
The main sections of the homeopage are going to be the different playlists and a liuttle heading saying what the project is and a part at the top right for featured and all
What happens when a user clicks a playlist card?
When a user clicks a playlist card they see all the songs in the playlist and each
What happens when a user clicks outside the modal?
What happens when a user clicks the like icon?
the button for that song becomes red and theres a liked songs part
What does the shuffle button do?
It shuffles all of the songs in the playlist for the user so they are in different order

### Function Specs

#### `renderPlaylistCards(playlists)`
**Purpose:** Dynamically create and display playlist cards from data

**Input:**
- `playlists` (array of Playlist objects) — The array of playlist data to render

**Output:**
- No return value (void function)
- Side effect: Creates DOM elements and appends them to `.playlist-cards` container

**DOM Target:**
- Appends to: `document.querySelector('.playlist-cards')`
- Clears existing content before rendering to prevent duplicates

**Fields Used from Playlist Object:**
- `id` — Set as `data-playlist-id` attribute for click handling
- `title` — Display in `.playlist-title` element
- `creator` — Display in `.playlist-creator` element  
- `coverImage` — Set as `src` for `.playlist-image`
- `likes` — Display in `.playlist-count` element

**Error Handling:**
- If `playlists` array is empty, display "No playlists found" message
- If `playlists` is null/undefined, log error and show fallback message
- If image fails to load, use fallback gradient (handled in CSS)

**Accessibility:**
- Each card gets `tabindex="0"` for keyboard navigation
- `aria-label` set to "Playlist: {title} by {creator}"
- `role="listitem"` for semantic list structure

**Behavior:**
- Should be called after data loads from `data.json`
- Should preserve all CSS classes from original HTML structure
- Should maintain Spotify-inspired styling applied in Milestone 2

#### `populateModalContent(playlist)`
**Purpose:** Fill the modal with detailed information about a specific playlist, including all songs

**Input:**
- `playlist` (Playlist object) — The complete playlist object containing all data to display

**Output:**
- No return value (void function)
- Side effect: Updates multiple DOM elements within `.modal-content` with playlist data

**DOM Elements Updated:**
- `.modal-playlist-image` — Set `src` to `playlist.coverImage`, alt to empty string (decorative)
- `.modal-playlist-title` — Set `textContent` to `playlist.title`
- `.modal-playlist-creator` — Set `textContent` to `playlist.creator`
- `.modal-songs` — Clear existing content, then populate with song items

**For Each Song in `playlist.songs`:**
Creates an `<article class="song-item">` containing:
- `.song-thumbnail` — Image with `src` set to `song.coverImage`
- `.song-title` — h3 with `song.title`
- `.song-artist` — p with `song.artist`
- `.song-album` — p with `song.album`
- `.song-duration` — span with `song.duration`
- `.song-like-button` — Button with heart icon, `data-song-id` set to `song.id`, class `liked` added if `song.liked === true`

**Expected Modal State After Function Runs:**
- Modal header displays: Large playlist cover image (180x180px), playlist title (32px bold), creator name (16px gray)
- Songs section displays: Scrollable list of all songs, each showing thumbnail (56x56px), title/artist/album info, duration, and like button
- Modal actions section displays: Shuffle button at bottom
- All content is properly styled with dark Spotify theme
- Images load or show gradient fallback
- No placeholder/hardcoded data remains visible

**Error Handling:**
- If `playlist.songs` is empty or undefined, display "No songs in this playlist yet." message
- If required DOM elements don't exist, fail silently with console.error
- If song image fails to load, CSS gradient fallback applies

**Accessibility:**
- Modal maintains `aria-labelledby="modal-title"` pointing to playlist title
- Song like buttons have `aria-label="Like this song"`
- All interactive elements remain keyboard accessible

**Information Required to Be Present:**
1. Playlist cover image (visual)
2. Playlist title (prominent heading)
3. Playlist creator name (subheading)
4. Complete list of songs with:
   - Song thumbnail image
   - Song title (primary text)
   - Artist name (secondary text)
   - Album name (secondary text)
   - Duration (right-aligned)
   - Like button (interactive)
5. Shuffle button (action button at bottom)

**Behavior:**
- Should be called by `openModal()` before showing the modal
- Should clear previous modal content to prevent stale data
- Should work with playlists of any length (1 song to 100+ songs)
- Should maintain scroll position at top when new playlist loads
- Should not modify the playlist object itself (read-only operation)

#### `togglePlaylistLike(playlistId, likeIconElement, likeCountElement)`
**Purpose:** Toggle the liked state of a playlist and update both the data model and UI accordingly

**Input:**
- `playlistId` (string) — The unique ID of the playlist to toggle like state
- `likeIconElement` (HTMLElement) — The DOM element of the heart icon to update visually
- `likeCountElement` (HTMLElement) — The DOM element displaying the like count to update

**Output:**
- No return value (void function)
- Side effects: Modifies `playlistsData` array and updates DOM elements

**Toggle Logic - Branch 1: Unliked → Liked**

When a user clicks the like icon on a playlist that is NOT currently liked:

**Data Model Changes:**
- Find the playlist object in `playlistsData` array by `playlistId`
- Increment `playlist.likes` by 1 (e.g., 1247 → 1248)
- Set `playlist.likedByUser` to `true` (new field to track user's like state)

**DOM Changes:**
- Add class `liked` to `likeIconElement` (triggers CSS color change to green)
- Update `likeCountElement.textContent` to new formatted count (e.g., "1.2k" → "1.2k")
- Add visual feedback: brief scale animation or color transition

**State After:**
- Heart icon is green/highlighted
- Like count shows increased number
- Data model reflects user has liked this playlist
- Clicking again will trigger Branch 2 (unlike)

**Toggle Logic - Branch 2: Liked → Unliked**

When a user clicks the like icon on a playlist that IS currently liked:

**Data Model Changes:**
- Find the playlist object in `playlistsData` array by `playlistId`
- Decrement `playlist.likes` by 1 (e.g., 1248 → 1247)
- Set `playlist.likedByUser` to `false`

**DOM Changes:**
- Remove class `liked` from `likeIconElement` (reverts to gray color)
- Update `likeCountElement.textContent` to new formatted count (e.g., "1.2k" → "1.2k")
- Add visual feedback: brief scale animation or color transition

**State After:**
- Heart icon is gray/unhighlighted
- Like count shows decreased number
- Data model reflects user has unliked this playlist
- Clicking again will trigger Branch 1 (like)

**Constraints:**
1. **Single Like Rule**: A user can only have one like state per playlist at a time (either liked or unliked, never both)
2. **Persistence Within Session**: Like state persists while page is loaded but resets on page refresh (localStorage can be added later)
3. **Immediate UI Feedback**: DOM updates happen synchronously with data updates (no delay)
4. **Event Propagation**: Click on like icon should NOT trigger the card click event (must use `event.stopPropagation()`)
5. **Boundary Protection**: Like count cannot go below 0 (check before decrementing)
6. **Data Integrity**: Only modify the specific playlist, not other playlists in the array

**Error Handling:**
- If playlist with `playlistId` not found, log error and return early
- If `likeIconElement` or `likeCountElement` is null, log error and return early
- If `playlist.likes` would go negative, set to 0 instead

**Accessibility:**
- `likeIconElement` should have `role="button"` for screen readers
- Add `aria-pressed` attribute: "true" when liked, "false" when unliked
- Announce state change to screen readers (consider `aria-live` region)

**Visual Feedback:**
- Heart icon color: Gray (#a7a7a7) when unliked, Green (#1DB954) when liked
- Hover state: Slightly larger scale and brighter color
- Click animation: Brief scale pulse (0.9x → 1.1x → 1x over 200ms)

**Behavior:**
- Should be called when user clicks the like icon on any playlist card
- Should update the count immediately (optimistic UI update)
- Should work for both initial state (no likes from user) and toggled states
- Should prevent card click event from firing when like icon is clicked
- Should update the displayed count using `formatLikeCount()` for consistency

#### `shufflePlaylistSongs(playlistId)`
**Purpose:** Shuffle the order of songs in a playlist and update the modal view to reflect the new order

**Input:**
- `playlistId` (string) — The unique ID of the playlist whose songs should be shuffled

**Output:**
- No return value (void function)
- Side effects: Modifies the `songs` array in `playlistsData` and re-renders modal song list

**What "Shuffled" Means:**
- Songs appear in a **randomized order** different from their current arrangement
- Uses Fisher-Yates shuffle algorithm for true randomness (no bias)
- Each song appears exactly once (no duplicates or omissions)
- Order changes each time shuffle is clicked (not just toggling between two states)

**Original Order Preservation:**
- **YES - Original order is preserved** in a separate field: `playlist.originalSongOrder`
- When first shuffle is clicked, save `playlist.songs` to `playlist.originalSongOrder`
- Original order stored as deep copy (not reference) to prevent mutations
- Allows future "unshuffle" feature (not implemented in this milestone)
- Original order persists for session duration (resets on page refresh)

**Algorithm:**
1. Find playlist in `playlistsData` by `playlistId`
2. If `originalSongOrder` doesn't exist, create deep copy: `playlist.originalSongOrder = JSON.parse(JSON.stringify(playlist.songs))`
3. Shuffle `playlist.songs` array using Fisher-Yates algorithm:
   - Start from end of array
   - For each position, swap with random position from 0 to current
   - Ensures unbiased random distribution
4. Re-render song list in modal by calling `populateModalSongList(playlist)`

**UI State After Shuffling:**
- Modal remains open (doesn't close)
- Song list updates in place with smooth transition
- Same songs displayed, different order
- Scroll position resets to top of song list
- Shuffle button remains clickable
- All song data intact (thumbnails, titles, artists, albums, durations, like states)

**Multi-Shuffle Behavior:**
When user clicks shuffle multiple times in a row:
- **Each click produces a NEW random order** (not cycling through fixed patterns)
- Original order saved only on first shuffle (not overwritten by subsequent shuffles)
- No limit on number of shuffles (can click indefinitely)
- Each shuffle is independent (not undoing previous shuffle)
- Button provides visual feedback each time (brief animation/state change)

**Constraints:**
1. **Randomness**: Each shuffle must produce statistically random order (Fisher-Yates guarantees this)
2. **Idempotency of Original Save**: Only save original order once (first shuffle), not on every shuffle
3. **Data Integrity**: Shuffling must not modify song objects themselves (only array order)
4. **UI Consistency**: Modal must remain open and functional after shuffle
5. **No Empty State**: Cannot shuffle if playlist has 0 or 1 songs (nothing to shuffle)
6. **Reference Safety**: Deep copy original order to prevent accidental mutations

**Error Handling:**
- If `playlistId` not found, log error and return early
- If `playlist.songs` is empty or has < 2 songs, log warning and return early (cannot shuffle)
- If modal is not currently open, log error and return early
- If DOM elements for song list don't exist, log error and return early

**Helper Function: `shuffleArray(array)`**
- Takes any array and returns shuffled copy (doesn't mutate original)
- Uses Fisher-Yates algorithm
- Returns new array (functional approach)

**Accessibility:**
- Shuffle button has clear label: "🔀 Shuffle Playlist"
- Announce shuffle completion to screen readers (aria-live region or role="status")
- Maintain keyboard focus on shuffle button after action
- Song list maintains keyboard navigability after shuffle

**Visual Feedback:**
- Button shows active/pressed state on click
- Brief animation on button (scale or color change)
- Optional: Fade out/in animation on song list during transition
- Button remains enabled (not disabled after shuffle)

**Behavior:**
- Should be called when user clicks shuffle button in modal
- Should only work when modal is open with a playlist loaded
- Should preserve all song data (no information loss)
- Should work for playlists of any size (2 to 100+ songs)
- Should feel instant (no artificial delays)
- Should allow rapid consecutive shuffles without breaking

**Edge Cases:**
- **0 songs**: Do nothing, show message "No songs to shuffle"
- **1 song**: Do nothing, show message "Need at least 2 songs to shuffle"
- **2 songs**: Simple swap (50/50 chance of order change)
- **Many rapid clicks**: Each produces new order, no race conditions

### AI Feature Spec (Milestone 8)
[Leave blank — fill in before Milestone 8]

### Decisions Log
[One entry per milestone where you make spec-informed decisions]