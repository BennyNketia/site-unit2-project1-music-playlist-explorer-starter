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

### AI Feature Spec (Milestone 8)
[Leave blank — fill in before Milestone 8]

### Decisions Log
[One entry per milestone where you make spec-informed decisions]