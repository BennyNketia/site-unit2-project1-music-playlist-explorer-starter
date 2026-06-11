## Unit Assignment: Music Playlist Explorer

Submitted by: **Benny Nketia**

Estimated time spent: **40** hours spent in total

Deployed Application: [Live Demo](https://bennynketia.github.io/site-unit2-project1-music-playlist-explorer-starter/music-playlist-creator/)

### Application Features

#### CORE FEATURES

- [x] **Display Playlists**
  - [x] Dynamically render playlists on the homepage using JavaScript.
    - [x] Playlists are shown in grid view.
    - [x] Playlist images are reasonably sized (at least 6 playlists on laptop when full screen; large enough that components are legible).
  - [x] Fetch data from a provided JavaScript file and use it to create interactive playlist tiles.

- [x] **Playlist Components**
  - [x] Each tile displays the playlist's:
    - [x] Cover image
    - [x] Name
    - [x] Author
    - [x] Like count

- [x] **Playlist Details**
  - [x] Create a modal pop-up view that displays detailed information about a playlist when a user clicks on a playlist tile.
  - [x] The modal shows the playlist's:
    - [x] Cover image
    - [x] Name
    - [x] Author
    - [x] List of songs, including each song's:
      - [x] Title
      - [x] Artist
      - [x] Duration
  - [x] The modal itself:
    - [x] Does not occupy the entire screen.
    - [x] Has a shadow to show that it is a pop-up.
    - [x] Appears floating on the screen.
    - [x] The backdrop appears darker or in a different shade.

- [x] **Like Playlists**
  - [x] Implement functionality to allow users to like playlists by clicking a heart icon on each playlist tile.
  - [x] When the heart icon is clicked:
    - [x] If previously unliked:
      - [x] The like count on the playlist tile increases by 1.
      - [x] There is visual feedback (heart changes color) to show that the playlist has been liked.
    - [x] If previously liked:
      - [x] The like count on the playlist tile decreases by 1.
      - [x] There is visual feedback (heart changes color) to show that the playlist has been unliked.
    - [x] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS:** Filmed liking and unliking:
      - [x] a playlist with a like count of 0
      - [x] a playlist with a non-zero like count

- [x] **Shuffle Songs**
  - [x] Enable users to shuffle the songs within a playlist using a shuffle button in the playlist's detail modal.
  - [x] When the shuffle button is clicked, the playlist's songs display in a different order.
  - [x] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS:** Showed shuffling the same playlist more than once.
  
- [x] **Featured Page**
  - [x] Application includes a dedicated page that randomly selects and displays a playlist, showing the playlist's:
    - [x] Playlist Image
    - [x] Playlist Name
    - [x] List of songs, including each song's:
      - [x] Title
      - [x] Artist
      - [x] Duration
  - [x] When the page is refreshed or reloaded, a new random playlist is displayed
    - [x] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS:** Showed refreshing the featured page more than once.
  - [x] Application includes a navigation bar such that users can navigate between pages without using browser's back/forward buttons.

- [x] **Planning Documentation**
  - [x] Repository includes a `planning.md` file with:
    - [x] A **Data Shape** section (fields and types for playlist and song objects)
    - [x] A **UI and Interaction Rules** section (at least three rules describing what happens in the UI for a user action)
    - [x] At least one **Function Spec** (name, purpose, inputs, outputs, side effects)
    - [x] A **Featured Page** section describing the random playlist display behavior
    - [x] A **Decisions Log** with entries from at least two different milestones

- [x] **AI-Powered Playlist Description**
  - [x] The playlist detail modal includes a "Get Description" button.
  - [x] Clicking the button calls an AI API and displays a generated description within the modal.
  - [x] `planning.md` includes an **AI Feature Spec** documenting role, task, inputs, output format, constraints, and failure behavior.
  - [x] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS:** DevTools Network tab shows outbound request to AI API URL (`openrouter.ai`).

#### STRETCH FEATURES

- [x] **Add New Playlists**
  - [x] Allow users to create new playlists.
  - [x] Using a form, users can input playlist:
    - [x] Name
    - [x] Author
    - [x] Cover image
    - [x] Add one or more songs to the playlist, specifying the song's:
      - [x] Title
      - [x] Artist
  - [x] The resulting playlist displays in the grid view.
  - [x] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS:** Showed adding at least two songs to the playlist.

- [x] **Edit Existing Playlists**
  - [x] Enable users to modify the details of existing playlists.
  - [x] Add an edit button to each playlist tile.
  - [x] Users can update the playlist:
    - [x] Name
    - [x] Author
    - [x] Songs
  - [x] The playlist grid view and playlist detail modal update to display any changes.
  - [x] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS:** Showed:
    - [x] Editing all of a playlist's features (name, creator, AND songs)
    - [x] Editing some of a playlist's features (name, creator, OR songs)

- [ ] **Delete Playlists**
  - [ ] Add a delete button to each playlist tile within the grid view.
  - [ ] When clicked, the playlist is removed from the playlist grid view.

- [ ] **Search Functionality**
  - [ ] Implement a search bar that allows users to filter playlists by:
    - [ ] Name 
    - [ ] Author
  - [ ] The search bar should include:
    - [ ] Text input field
    - [ ] Submit/Search Button
    - [ ] Clear Button
  - [ ] Playlists matching the search query are displayed when user presses Enter or clicks Search.
  - [ ] User can click the clear button to reset search.

- [ ] **Sorting Options**
  - [ ] Implement a drop-down or button options that allow users to sort the playlist by:
    - [ ] Name (A-Z alphabetically)
    - [ ] Number of likes (descending order)
    - [ ] Date added (most recent to oldest, chronologically)

#### BONUS FEATURES (Not Required)

- [x] **Music Player**
  - [x] Built-in music player with play/pause controls
  - [x] Previous and next song buttons
  - [x] Progress bar with seek functionality
  - [x] Click any song to play it

- [x] **Individual Song Likes**
  - [x] Like/unlike individual songs within playlists
  - [x] Visual feedback for song like state

- [x] **AI Description Persistence**
  - [x] Generated descriptions are cached and persist during the session
  - [x] No need to re-generate descriptions for the same playlist

- [x] **Premium UI/UX**
  - [x] Spotify-inspired dark theme with green accents
  - [x] Smooth animations and transitions
  - [x] Glassmorphism effects
  - [x] Responsive design (mobile, tablet, desktop)
  - [x] Accessibility features (ARIA labels, keyboard navigation)

### Walkthrough Video

**Walkthrough video:** [Music Playlist Explorer Walkthrough](https://www.loom.com/share/3b0347ab91424c609f561761ae731a0c)

### Reflection

* Did the topics discussed in your labs prepare you to complete the assignment? Be specific, which features in your weekly assignment did you feel unprepared to complete?

The labs provided a strong foundation in vanilla JavaScript, DOM manipulation, and event handling. However, I felt less prepared for the AI API integration, as the labs didn't cover real-world API calls with authentication headers. The Fisher-Yates shuffle algorithm was also new territory that required additional research. The CSS Grid and Flexbox concepts from labs were extremely helpful for creating the responsive layout.

* If you had more time, what would you have done differently? Would you have added additional features? Changed the way your project responded to a particular event, etc.
  
With more time, I would have added:
1. **LocalStorage persistence** - Save likes and created playlists between sessions
2. **Delete functionality** - Complete the delete stretch feature
3. **Search and filter** - Implement the search functionality stretch feature
4. **Drag-and-drop reordering** - Allow users to reorder songs by dragging
5. **Audio visualization** - Add a visual equalizer to the music player
6. **Dark/Light theme toggle** - Give users a choice of themes
7. **Backend integration** - Connect to a real database instead of JSON file

I might have also implemented a more sophisticated state management pattern to handle the complexity of the create/edit features more elegantly.

* Reflect on your project demo, what went well? Were there things that maybe didn't go as planned? Did you notice something that your peer did that you would like to try next time?

What went well:
- The Spotify-inspired UI received positive feedback
- All core features worked smoothly during the demo
- The music player bonus feature was a hit

What could have gone better:
- Should have tested the AI API with a fresh API key before demo
- The modal scroll behavior on mobile could be smoother
- Loading states for the AI descriptions could be more polished

Peer observations:
- One peer had a really nice loading skeleton animation for playlists
- Another had implemented a toast notification system for user feedback
- I'd like to try implementing web animations API for more performant animations next time

### Open-source libraries used

- **OpenRouter API** - AI-powered playlist descriptions using free Gemma models
- **Google Fonts** (via system fonts) - Typography

### Shout out

Shout out to **the CodePath instructors and TAs** for providing comprehensive documentation and being available for questions throughout the project. Special thanks to **Claude Sonnet 4.5** for pair programming assistance, code reviews, and helping debug the AI integration. Also shout out to my cohort peers who shared their creative approaches to the stretch features during our working sessions!

---

## 🚀 Quick Start

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/BennyNketia/site-unit2-project1-music-playlist-explorer-starter.git
   cd site-unit2-project1-music-playlist-explorer-starter
   ```

2. **Set up API Key (Optional - for AI descriptions)**
   ```bash
   cp music-playlist-creator/config.example.js music-playlist-creator/config.js
   ```
   Edit `config.js` and add your OpenRouter API key from https://openrouter.ai/keys

3. **Open in browser**
   ```bash
   open music-playlist-creator/index.html
   # Or use a local server (recommended)
   cd music-playlist-creator && python3 -m http.server 8000
   ```

### Project Structure

```
music-playlist-creator/
├── index.html              # Main page (All Playlists)
├── featured.html           # Featured page (Random playlist)
├── script.js               # Main JavaScript
├── featured.js             # Featured page JavaScript
├── style.css               # All styles
├── config.example.js       # API config template
├── planning.md             # Complete planning documentation
├── data/
│   └── data.json          # Playlist and song data
└── assets/
    └── img/               # Playlist cover images
```

### Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Flexbox, Grid, Custom Properties, Animations
- **JavaScript (ES6+)** - Async/await, Arrow functions
- **OpenRouter API** - AI-powered descriptions

### Features Implemented

✅ **8/8 Core Requirements** - All completed  
✅ **2/5 Stretch Features** - Add New & Edit Playlists  
🎁 **4 Bonus Features** - Music player, song likes, premium UI

---

**⭐ Star this repo if you found it helpful!**
