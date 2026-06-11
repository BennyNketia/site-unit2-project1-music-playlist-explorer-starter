# Edit Playlist Feature - Visual Flow Diagram

## 🎨 User Interface Flow

```
┌─────────────────────────────────────────────────────────────┐
│                     PLAYLIST CARDS VIEW                       │
│                                                               │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐                │
│  │           │  │     ✎     │  │           │  ← Edit button │
│  │  [Image]  │  │  [Image]  │  │  [Image]  │    appears on  │
│  │           │  │           │  │           │    hover       │
│  │  Title    │  │  Title    │  │  Title    │                │
│  │  Creator  │  │  Creator  │  │  Creator  │                │
│  │  ♥ 1.2k   │  │  ♥ 856    │  │  ♥ 2.3k   │                │
│  └───────────┘  └───────────┘  └───────────┘                │
│       ↓              ↓ Click edit button                     │
└───────┼──────────────┼───────────────────────────────────────┘
        │              │
        │ Click card   │ Click ✎ button
        │              │
        ↓              ↓
┌───────────────┐  ┌──────────────────────────────────────────┐
│ Detail Modal  │  │        EDIT PLAYLIST MODAL               │
│               │  │                                 [X Close] │
│ [Large Image] │  │  ┌────────────────────────────────────┐  │
│               │  │  │ Playlist Details                   │  │
│ Title         │  │  │                                    │  │
│ Creator       │  │  │ Playlist Name: [Summer Vibes  ]    │  │
│               │  │  │ Creator Name:  [DJ Cool       ]    │  │
│ Songs:        │  │  └────────────────────────────────────┘  │
│ 1. Song 1     │  │                                          │
│ 2. Song 2     │  │  ┌────────────────────────────────────┐  │
│ 3. Song 3     │  │  │ Songs                  [+ Add Song]│  │
│               │  │  │                                    │  │
│ [🔀 Shuffle]  │  │  │ ── Song 1 ──────────── [Remove]  │  │
│               │  │  │ Title:    [Sunset Dreams      ]    │  │
└───────────────┘  │  │ Artist:   [The Wavelengths    ]    │  │
                   │  │ Album:    [Coastal Nights     ]    │  │
                   │  │ Duration: [3:45               ]    │  │
                   │  │                                    │  │
                   │  │ ── Song 2 ──────────── [Remove]  │  │
                   │  │ Title:    [Coffee Shop Jazz   ]    │  │
                   │  │ Artist:   [Urban Trio         ]    │  │
                   │  │ Album:    [Morning Brew       ]    │  │
                   │  │ Duration: [4:12               ]    │  │
                   │  └────────────────────────────────────┘  │
                   │                                          │
                   │              [Cancel] [Update Playlist]  │
                   └──────────────────────────────────────────┘
                                        ↓ Submit
                   ┌──────────────────────────────────────────┐
                   │  ✓ Playlist "Summer Vibes" updated!      │
                   └──────────────────────────────────────────┘
                                        ↓
                   ┌──────────────────────────────────────────┐
                   │  Cards re-render with updated data       │
                   └──────────────────────────────────────────┘
```

---

## 🔄 State Machine Diagram

```
                    ┌─────────────────┐
                    │  Page Loaded    │
                    │  (Initial State)│
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │ Viewing Cards   │
                    │ (Normal State)  │
                    └────┬───────┬────┘
                         │       │
         Click card body │       │ Hover + Click Edit ✎
                         │       │
                ┌────────▼───┐   │
                │  Detail    │   │
                │  Modal     │   │
                │  (View)    │   │
                └────────────┘   │
                                 │
                        ┌────────▼────────────┐
                        │ Edit Modal Opening  │
                        │ currentEditPlaylistId = id
                        │ updateModalMode('edit')
                        └────────┬────────────┘
                                 │
                        ┌────────▼────────────┐
                        │   Edit Modal        │
                        │   (Editing State)   │
                        │   - Form populated  │
                        │   - Can modify data │
                        └──┬──────────┬───────┘
                           │          │
                    Cancel │          │ Submit
                           │          │
                  ┌────────▼───┐  ┌───▼──────────┐
                  │ Close      │  │ Validate     │
                  │ Modal      │  │ Form Data    │
                  │ (Discard)  │  └───┬──────────┘
                  └────────────┘      │
                           │          │ Valid
                           │      ┌───▼──────────────┐
                           │      │ updatePlaylist() │
                           │      │ - Preserve ID    │
                           │      │ - Update fields  │
                           │      │ - Keep metadata  │
                           │      └───┬──────────────┘
                           │          │
                           │      ┌───▼──────────────┐
                           │      │ Re-render Cards  │
                           │      │ Show Success     │
                           │      └───┬──────────────┘
                           │          │
                           └──────────▼──────────────┐
                                   Viewing Cards     │
                                   (Updated State)   │
                                   └─────────────────┘
```

---

## 🧩 Component Interaction Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      MAIN PAGE (index.html)                  │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Header                                                 │ │
│  │  [Music Playlist Explorer]  [Featured] [All Playlists] │ │
│  │                                     [+ Create Playlist] │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Playlist Cards Container (.playlist-cards)            │ │
│  │                                                         │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐             │ │
│  │  │ Card 1   │  │ Card 2   │  │ Card 3   │             │ │
│  │  │  ┌────┐  │  │  ┌────┐  │  │  ┌────┐  │             │ │
│  │  │  │ ✎  │  │  │  │ ✎  │  │  │  │ ✎  │  │ ← Edit btn │ │
│  │  │  └────┘  │  │  └────┘  │  │  └────┘  │             │ │
│  │  │  [Img]   │  │  [Img]   │  │  [Img]   │             │ │
│  │  │  Title   │  │  Title   │  │  Title   │             │ │
│  │  │  Creator │  │  Creator │  │  Creator │             │ │
│  │  │  ♥ Count │  │  ♥ Count │  │  ♥ Count │             │ │
│  │  └──────────┘  └──────────┘  └──────────┘             │ │
│  │         │             │             │                  │ │
│  │         └─────────────┴─────────────┘                  │ │
│  └────────────────────┬────────────────────────────────────┘ │
│                       │                                       │
└───────────────────────┼───────────────────────────────────────┘
                        │
                        │ onclick → openEditPlaylistModal(id)
                        │
                        ↓
┌─────────────────────────────────────────────────────────────┐
│                    JAVASCRIPT (script.js)                    │
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ State Variables                                          ││
│  │ • playlistsData = [...]                                  ││
│  │ • currentModalPlaylistId = null                          ││
│  │ • currentEditPlaylistId = null ← NEW!                    ││
│  │ • songFieldCounter = 0                                   ││
│  └─────────────────────────────────────────────────────────┘│
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ Edit Functions (NEW)                                     ││
│  │                                                           ││
│  │ openEditPlaylistModal(playlistId)                        ││
│  │   ├─ Set currentEditPlaylistId = playlistId              ││
│  │   ├─ updateModalMode('edit')                             ││
│  │   ├─ resetCreatePlaylistForm()                           ││
│  │   └─ populateEditForm(playlist)                          ││
│  │                                                           ││
│  │ updateModalMode(mode)                                    ││
│  │   ├─ Change modal title                                  ││
│  │   └─ Change submit button text                           ││
│  │                                                           ││
│  │ populateEditForm(playlist)                               ││
│  │   ├─ Fill playlist name input                            ││
│  │   ├─ Fill creator name input                             ││
│  │   └─ For each song: addSongField() + fill inputs         ││
│  │                                                           ││
│  │ updatePlaylist(playlistId, formData)                     ││
│  │   ├─ Find playlist in playlistsData                      ││
│  │   ├─ Update title, creator, songs                        ││
│  │   ├─ Preserve: id, likes, coverImage, metadata          ││
│  │   └─ showSuccessMessage()                                ││
│  └─────────────────────────────────────────────────────────┘│
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ Modified Functions                                       ││
│  │                                                           ││
│  │ createPlaylistCard(playlist)                             ││
│  │   └─ NEW: Add edit button with click handler            ││
│  │                                                           ││
│  │ openCreatePlaylistModal()                                ││
│  │   └─ NEW: Set currentEditPlaylistId = null              ││
│  │                                                           ││
│  │ handleCreatePlaylistSubmit(event)                        ││
│  │   ├─ if (currentEditPlaylistId) → updatePlaylist()      ││
│  │   └─ else → createPlaylist() + push to array            ││
│  │                                                           ││
│  │ closeCreatePlaylistModal()                               ││
│  │   └─ NEW: Clear currentEditPlaylistId = null            ││
│  └─────────────────────────────────────────────────────────┘│
└───────────────────────────────────────────────────────────────┘
                        │
                        │ Shows modal overlay
                        ↓
┌─────────────────────────────────────────────────────────────┐
│                  CREATE/EDIT MODAL (index.html)              │
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ .create-modal-overlay                           [X]     ││
│  │                                                          ││
│  │  <h2 id="create-modal-title">                           ││
│  │    "Create New Playlist" OR "Edit Playlist"             ││
│  │  </h2>                                                   ││
│  │                                                          ││
│  │  <form id="create-playlist-form">                       ││
│  │    [Playlist Name Input]                                ││
│  │    [Creator Name Input]                                 ││
│  │                                                          ││
│  │    <div id="songs-container">                           ││
│  │      <!-- Dynamically generated song fields -->         ││
│  │      [Song 1: Title, Artist, Album, Duration]           ││
│  │      [Song 2: Title, Artist, Album, Duration]           ││
│  │      ...                                                 ││
│  │    </div>                                                ││
│  │                                                          ││
│  │    [+ Add Song Button]                                  ││
│  │                                                          ││
│  │    <button class="submit-button">                       ││
│  │      "Create Playlist" OR "Update Playlist"             ││
│  │    </button>                                             ││
│  │  </form>                                                 ││
│  └─────────────────────────────────────────────────────────┘│
└───────────────────────────────────────────────────────────────┘
```

---

## 🔀 Data Flow Diagram

```
┌──────────────────────────────────────────────────────────────┐
│                        DATA FLOW                              │
└──────────────────────────────────────────────────────────────┘

1. LOAD DATA
   ┌─────────────┐
   │ data.json   │
   └──────┬──────┘
          │ fetch()
          ↓
   ┌──────────────────┐
   │ playlistsData[]  │ ← In-memory array
   └──────┬───────────┘
          │
          ↓
   ┌──────────────────┐
   │ renderCards()    │ ← Create DOM elements
   └──────────────────┘

2. EDIT FLOW
   ┌──────────────────┐
   │ User clicks ✎    │
   └──────┬───────────┘
          │ playlistId
          ↓
   ┌────────────────────────────┐
   │ openEditPlaylistModal(id)  │
   └──────┬─────────────────────┘
          │
          ├─ Find playlist in playlistsData
          │
          ├─ Set currentEditPlaylistId = id
          │
          └─ populateEditForm(playlist)
                    │
                    ↓
          ┌─────────────────────┐
          │ Form Inputs         │
          │ [Playlist Name]     │
          │ [Creator Name]      │
          │ [Songs...]          │
          └──────┬──────────────┘
                 │ User edits
                 ↓
          ┌─────────────────────┐
          │ User clicks Submit  │
          └──────┬──────────────┘
                 │
                 ↓
   ┌───────────────────────────────┐
   │ handleCreatePlaylistSubmit()  │
   └──────┬────────────────────────┘
          │
          ├─ gatherFormData()
          │      ↓
          ├─ validateForm()
          │      ↓
          └─ if (currentEditPlaylistId)
                    ↓
          ┌─────────────────────────┐
          │ updatePlaylist()        │
          │                         │
          │ 1. Find in array        │
          │ 2. Update fields        │
          │ 3. Preserve metadata    │
          └──────┬──────────────────┘
                 │
                 ↓
          ┌─────────────────────────┐
          │ playlistsData[]         │ ← Updated in-place
          └──────┬──────────────────┘
                 │
                 ↓
          ┌─────────────────────────┐
          │ renderPlaylistCards()   │ ← Re-render all cards
          └──────┬──────────────────┘
                 │
                 ↓
          ┌─────────────────────────┐
          │ DOM Updated             │ ← User sees changes
          └─────────────────────────┘

3. PRESERVED DATA
   When updating, these fields are KEPT:
   ✓ playlist.id
   ✓ playlist.coverImage
   ✓ playlist.likes
   ✓ playlist.likedByUser
   ✓ playlist.featured
   ✓ playlist.originalSongOrder (if exists)
   ✓ playlist.aiDescription (if exists)
   ✓ song.id (where possible)
   ✓ song.liked (for existing songs)

   These fields are UPDATED:
   ✎ playlist.title
   ✎ playlist.creator
   ✎ playlist.songs (array)
   ✎ song.title, artist, album, duration
```

---

## 🎯 Event Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      EVENT FLOW                              │
└─────────────────────────────────────────────────────────────┘

User Action                    Event Handler                Result
─────────────────────────────────────────────────────────────────

1. Page Load
   [Page loads]    →    init()                   →    [Cards render]
                         ├─ loadPlaylistData()
                         ├─ renderPlaylistCards()
                         ├─ setupModalHandlers()
                         └─ setupCreatePlaylistHandlers()

2. Hover Over Card
   [Mouse over]    →    :hover (CSS)             →    [Edit ✎ appears]
                         • opacity: 0 → 1
                         • transform: translateY()

3. Click Edit Button
   [Click ✎]       →    edit button listener     →    [Edit modal opens]
                         └─ openEditPlaylistModal(id)
                              ├─ currentEditPlaylistId = id
                              ├─ updateModalMode('edit')
                              ├─ resetForm()
                              └─ populateEditForm()

4. Modify Form Fields
   [Type in input] →    input events (native)    →    [Form updates]
                         • value changes
                         • validation on blur

5. Click Add Song
   [Click + Add]   →    addSongField()           →    [New song field]
                         • songFieldCounter++
                         • Create new field div
                         • Append to container

6. Click Remove Song
   [Click Remove]  →    removeSongField(index)   →    [Song field gone]
                         • Check if > 1 song
                         • Remove from DOM
                         • (No re-indexing needed)

7. Click Cancel
   [Click Cancel]  →    closeCreatePlaylistModal() →  [Modal closes]
                         ├─ modal.display = 'none'
                         ├─ resetForm()
                         └─ currentEditPlaylistId = null

8. Click Update Playlist
   [Click Update]  →    handleCreatePlaylistSubmit() → [Save & close]
                         ├─ event.preventDefault()
                         ├─ gatherFormData()
                         ├─ validateForm()
                         │   └─ if errors: showFormErrors()
                         │       └─ STOP
                         ├─ if (currentEditPlaylistId):
                         │   └─ updatePlaylist(id, data)
                         │        ├─ Find playlist
                         │        ├─ Update fields
                         │        └─ showSuccessMessage()
                         ├─ renderPlaylistCards()
                         └─ closeCreatePlaylistModal()

9. Press Escape
   [Press Esc]     →    keydown listener         →    [Modal closes]
                         └─ if (e.key === 'Escape')
                              └─ closeModal()

10. Click Outside Modal
   [Click overlay] →    overlay click listener   →    [Modal closes]
                         └─ if (e.target === overlay)
                              └─ closeModal()
```

---

## 📊 Decision Tree

```
User wants to modify a playlist...

                    ┌────────────────────┐
                    │ Hover over card    │
                    └──────┬─────────────┘
                           │
            ┌──────────────┴──────────────┐
            │                             │
       Click card                    Click ✎ button
            │                             │
            ↓                             ↓
    ┌──────────────┐          ┌──────────────────┐
    │ Detail Modal │          │ Edit Modal Opens │
    │ (View only)  │          │ (Edit mode)      │
    └──────────────┘          └──────┬───────────┘
                                     │
                    ┌────────────────┼────────────────┐
                    │                │                │
                    ↓                ↓                ↓
             Change fields    Add songs      Remove songs
                    │                │                │
                    └────────────────┴────────────────┘
                                     │
                    ┌────────────────┴────────────────┐
                    │                                 │
                    ↓                                 ↓
              Click Cancel                    Click Update
                    │                                 │
                    ↓                                 ↓
          ┌──────────────────┐           ┌──────────────────┐
          │ No changes saved │           │ Validate form    │
          │ Modal closes     │           └──────┬───────────┘
          └──────────────────┘                  │
                                   ┌────────────┴────────────┐
                                   │                         │
                            Validation fails          Validation passes
                                   │                         │
                                   ↓                         ↓
                        ┌──────────────────┐     ┌──────────────────┐
                        │ Show errors      │     │ Update playlist  │
                        │ Stay in form     │     │ Re-render cards  │
                        └──────────────────┘     │ Show success     │
                                                 │ Close modal      │
                                                 └──────────────────┘
```

---

## 💾 Memory State Diagram

```
Application State Throughout Edit Flow
───────────────────────────────────────

INITIAL STATE (Page Load)
┌────────────────────────────────────────┐
│ playlistsData = [pl1, pl2, pl3, ...]  │
│ currentModalPlaylistId = null          │
│ currentEditPlaylistId = null           │
│ songFieldCounter = 0                   │
└────────────────────────────────────────┘

↓ User clicks edit button on "Chill Vibes"

EDIT MODE ACTIVE
┌────────────────────────────────────────┐
│ playlistsData = [pl1, pl2, pl3, ...]  │
│ currentModalPlaylistId = null          │
│ currentEditPlaylistId = "pl-001" ←───  │ Set!
│ songFieldCounter = 3                   │ 3 song fields added
└────────────────────────────────────────┘

↓ User modifies form (in memory only)

FORM MODIFIED (Not Saved Yet)
┌────────────────────────────────────────┐
│ playlistsData = [pl1, pl2, pl3, ...]  │ ← Unchanged
│ currentEditPlaylistId = "pl-001"       │
│ songFieldCounter = 4                   │ User added a song
│                                        │
│ Form State (DOM):                      │
│   Playlist Name: "Ultimate Chill" ←─── │ Changed
│   Creator: "DJ Smooth"                 │
│   Song 1: "New Song" ←───────────────  │ Changed
│   Song 2: ...                          │
│   Song 3: ...                          │
│   Song 4: "Added Song" ←───────────── │ Added
└────────────────────────────────────────┘

↓ User clicks "Update Playlist"

VALIDATION PHASE
┌────────────────────────────────────────┐
│ 1. gatherFormData()                    │
│    └─ Extract all form values          │
│ 2. validatePlaylistForm(data)          │
│    └─ Check required fields            │
│    └─ Check length limits              │
│    └─ Check duration format            │
│                                        │
│ If errors: showFormErrors() → STOP    │
│ If valid: continue...                  │
└────────────────────────────────────────┘

↓ Validation passed

UPDATE PLAYLIST DATA
┌────────────────────────────────────────┐
│ updatePlaylist("pl-001", formData)     │
│                                        │
│ 1. Find: pl1 = playlistsData.find(...) │
│                                        │
│ 2. Update fields:                      │
│    pl1.title = "Ultimate Chill" ←───  │ Updated
│    pl1.creator = "DJ Smooth"           │
│    pl1.songs = [...] ←─────────────── │ Updated (4 songs now)
│                                        │
│ 3. Preserve metadata:                  │
│    pl1.id = "pl-001" ←──────────────  │ Kept
│    pl1.likes = 1247 ←─────────────── │ Kept
│    pl1.likedByUser = false ←──────── │ Kept
│    pl1.featured = true ←────────────  │ Kept
│                                        │
└────────────────────────────────────────┘

↓ Data updated in memory

FINAL STATE
┌────────────────────────────────────────┐
│ playlistsData = [                      │
│   {                                    │
│     id: "pl-001",                      │
│     title: "Ultimate Chill", ←──────  │ Changed!
│     creator: "DJ Smooth",              │
│     likes: 1247, ←──────────────────  │ Preserved!
│     songs: [4 songs] ←──────────────  │ Changed!
│     ...metadata preserved              │
│   },                                   │
│   pl2, pl3, ...                        │
│ ]                                      │
│                                        │
│ currentEditPlaylistId = null ←──────  │ Cleared!
│ songFieldCounter = 0 ←───────────────  │ Reset!
└────────────────────────────────────────┘

↓ renderPlaylistCards() called

DOM UPDATED
┌────────────────────────────────────────┐
│ All cards re-render                    │
│ "Chill Vibes" → "Ultimate Chill" ←── │ Visible!
│ Card shows 4 songs now                 │
│ Like count still 1247 ←──────────────  │ Preserved!
└────────────────────────────────────────┘
```

---

This diagram shows the complete user journey, state management, and data flow for the Edit Playlist feature! 🎉
