# Music Playlist Explorer - Project Context

## 👤 Your Role

You are a **senior software engineer** working on a music playlist explorer web application. You have extensive experience building user interfaces with vanilla HTML, CSS, and JavaScript. You write clean, maintainable code following industry best practices.

---

## 🎯 Project Overview

Building a **Spotify-inspired playlist explorer** that allows users to:
- Browse music playlists in a responsive grid layout
- View detailed playlist information in a modal
- Like/unlike playlists with visual feedback
- Shuffle songs using the Fisher-Yates algorithm
- Experience smooth animations and transitions

**Tech Stack:**
- Pure HTML5 (semantic markup)
- Pure CSS3 (Flexbox, Grid, custom properties)
- Vanilla JavaScript (ES6+, no frameworks)
- JSON for data storage

---

## 📐 CSS Flexbox Guide

### What is Flexbox?

Flexbox (Flexible Box Layout) is a CSS layout model for arranging items in **one dimension** (row OR column). It makes alignment, spacing, and responsive design much easier.

### Key Concepts

#### 1. **Flex Container** (Parent)
```css
.container {
    display: flex;              /* Turns element into flex container */
    flex-direction: row;        /* row | column | row-reverse | column-reverse */
    justify-content: center;    /* Main axis alignment */
    align-items: center;        /* Cross axis alignment */
    gap: 16px;                  /* Space between items */
    flex-wrap: wrap;            /* Allow items to wrap to next line */
}
```

#### 2. **Flex Items** (Children)
```css
.item {
    flex: 1;                    /* Grow to fill space */
    flex-shrink: 0;             /* Don't shrink smaller than content */
    align-self: flex-start;     /* Override parent's align-items */
}
```

### Common Flexbox Patterns

#### Center Anything
```css
.center-me {
    display: flex;
    justify-content: center;    /* Horizontal center */
    align-items: center;        /* Vertical center */
}
```

#### Space Between Items
```css
.navbar {
    display: flex;
    justify-content: space-between;  /* Items at edges, space in middle */
}
```

#### Equal Width Columns
```css
.columns {
    display: flex;
}

.column {
    flex: 1;  /* All children grow equally */
}
```

#### Vertical Stack
```css
.stack {
    display: flex;
    flex-direction: column;     /* Stack vertically */
    gap: 12px;                  /* Space between items */
}
```

### Flexbox Properties Reference

**Container Properties:**
- `display: flex` - Enables flexbox
- `flex-direction` - Main axis direction (row/column)
- `justify-content` - Main axis alignment (start/center/end/space-between/space-around)
- `align-items` - Cross axis alignment (start/center/end/stretch)
- `flex-wrap` - Allow wrapping (nowrap/wrap)
- `gap` - Space between items (modern, replaces margins)

**Item Properties:**
- `flex-grow` - How much to grow relative to siblings
- `flex-shrink` - How much to shrink if needed
- `flex-basis` - Starting size before growing/shrinking
- `flex` - Shorthand for grow/shrink/basis
- `align-self` - Override container's align-items for this item

### Examples from This Project

#### Header Layout
```css
.header-container {
    display: flex;
    justify-content: space-between;  /* Title left, nav right */
    align-items: center;             /* Vertically centered */
    gap: 24px;                       /* Space between */
}
```

#### Modal Centering
```css
.modal-overlay {
    display: flex;
    justify-content: center;  /* Horizontal center */
    align-items: center;      /* Vertical center */
}
```

#### Song Item Layout
```css
.song-item {
    display: flex;
    align-items: center;      /* Vertically align thumbnail/text/duration */
    gap: 16px;                /* Space between elements */
}

.song-details {
    flex: 1;                  /* Takes remaining space */
}
```

### Flexbox vs Grid - When to Use What?

**Use Flexbox when:**
- Layout is one-dimensional (row OR column)
- You want items to wrap naturally
- Content size should determine layout
- Example: Navigation bar, song item row

**Use Grid when:**
- Layout is two-dimensional (rows AND columns)
- You want precise control over placement
- Layout should determine content size
- Example: Playlist cards grid (4 columns)

---

## 💻 JavaScript Basics Guide

### Variables & Data Types

#### Declaring Variables
```javascript
// Modern way (use these)
let count = 0;              // Can change
const name = "Playlist";    // Cannot change (prefer this)

// Old way (avoid)
var oldWay = "Don't use";   // Function-scoped, confusing
```

#### Data Types
```javascript
// Primitives
const number = 42;
const string = "Hello";
const boolean = true;
const nothing = null;
const notDefined = undefined;

// Objects
const playlist = {
    id: "pl-001",
    title: "Chill Vibes",
    likes: 1247
};

// Arrays
const songs = ["Song 1", "Song 2", "Song 3"];
```

### Functions

#### Function Declaration
```javascript
function greet(name) {
    return `Hello, ${name}!`;
}
```

#### Arrow Function (Modern)
```javascript
const greet = (name) => {
    return `Hello, ${name}!`;
};

// Shorter version
const greet = (name) => `Hello, ${name}!`;
```

#### Async Function (for loading data)
```javascript
async function loadData() {
    const response = await fetch('data.json');
    const data = await response.json();
    return data;
}
```

### Working with Arrays

#### forEach - Loop through items
```javascript
playlists.forEach(playlist => {
    console.log(playlist.title);
});
```

#### map - Transform items
```javascript
const titles = playlists.map(p => p.title);
// ["Chill Vibes", "Workout Energy", ...]
```

#### filter - Keep some items
```javascript
const featured = playlists.filter(p => p.featured === true);
```

#### find - Get first matching item
```javascript
const playlist = playlists.find(p => p.id === "pl-001");
```

#### reduce - Combine items
```javascript
const totalLikes = playlists.reduce((sum, p) => sum + p.likes, 0);
```

### DOM Manipulation

#### Selecting Elements
```javascript
// Single element
const element = document.querySelector('.class-name');
const byId = document.getElementById('my-id');

// Multiple elements
const elements = document.querySelectorAll('.class-name');
```

#### Creating Elements
```javascript
const div = document.createElement('div');
div.className = 'playlist-card';
div.textContent = 'Hello World';
div.setAttribute('data-id', '123');
```

#### Modifying Elements
```javascript
// Change content
element.textContent = 'New text';
element.innerHTML = '<span>HTML content</span>';

// Change attributes
element.src = 'image.jpg';
element.setAttribute('aria-label', 'Close');

// Change classes
element.classList.add('active');
element.classList.remove('hidden');
element.classList.toggle('open');

// Change styles
element.style.display = 'flex';
element.style.color = '#1DB954';
```

#### Adding to DOM
```javascript
// Append to end
parent.appendChild(child);

// Insert at specific position
parent.insertBefore(child, referenceNode);

// Remove from DOM
element.remove();
```

### Event Handling

#### Adding Event Listeners
```javascript
button.addEventListener('click', () => {
    console.log('Button clicked!');
});

// With event object
button.addEventListener('click', (event) => {
    event.preventDefault();       // Stop default behavior
    event.stopPropagation();      // Stop event bubbling
    console.log(event.target);    // Element that was clicked
});
```

#### Common Events
- `click` - Mouse click
- `keydown` / `keyup` - Keyboard
- `submit` - Form submission
- `input` - Input value changes
- `mouseover` / `mouseout` - Mouse hover

### Working with Objects

#### Creating Objects
```javascript
const playlist = {
    id: "pl-001",
    title: "Chill Vibes",
    songs: []
};
```

#### Accessing Properties
```javascript
// Dot notation
playlist.title

// Bracket notation (when property name is dynamic)
const prop = 'title';
playlist[prop]
```

#### Adding/Changing Properties
```javascript
playlist.creator = "DJ Smooth";
playlist.likes = 1247;
```

#### Object Destructuring
```javascript
const { title, creator } = playlist;
// Same as:
// const title = playlist.title;
// const creator = playlist.creator;
```

### Template Literals

#### String Interpolation
```javascript
const name = "World";
const greeting = `Hello, ${name}!`;  // "Hello, World!"

// Multi-line
const html = `
    <div class="card">
        <h2>${title}</h2>
        <p>${description}</p>
    </div>
`;
```

### Error Handling

#### Try-Catch
```javascript
try {
    const data = await fetch('data.json');
    console.log('Success!');
} catch (error) {
    console.error('Error:', error);
} finally {
    console.log('Always runs');
}
```

### Async/Await

#### Loading Data
```javascript
async function loadPlaylists() {
    // Wait for fetch to complete
    const response = await fetch('data/playlists.json');
    
    // Wait for JSON parsing
    const data = await response.json();
    
    return data;
}
```

#### Using Async Functions
```javascript
// Must use await inside async function
async function init() {
    const playlists = await loadPlaylists();
    renderCards(playlists);
}

// Or use .then()
loadPlaylists().then(playlists => {
    renderCards(playlists);
});
```

### Modern JavaScript Features

#### Spread Operator (...)
```javascript
// Copy array
const copy = [...originalArray];

// Combine arrays
const combined = [...array1, ...array2];

// Copy object
const copy = { ...originalObject };
```

#### Destructuring Assignment
```javascript
// Swap variables
[a, b] = [b, a];

// Extract array values
const [first, second, ...rest] = [1, 2, 3, 4, 5];
```

#### Optional Chaining (?.)
```javascript
// Safe property access
const name = user?.profile?.name;
// Returns undefined if user or profile is null/undefined
```

#### Nullish Coalescing (??)
```javascript
const value = maybeNull ?? 'default';
// Use 'default' only if maybeNull is null/undefined
// (not if it's 0, false, or '')
```

### Common Patterns in This Project

#### Loading Data
```javascript
async function loadPlaylistData() {
    try {
        const response = await fetch('data/data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.playlists || [];
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}
```

#### Creating Elements
```javascript
function createPlaylistCard(playlist) {
    const card = document.createElement('article');
    card.className = 'playlist-card';
    card.setAttribute('data-id', playlist.id);
    
    const title = document.createElement('h2');
    title.textContent = playlist.title;
    
    card.appendChild(title);
    return card;
}
```

#### Event Delegation
```javascript
// Attach one listener to parent instead of many to children
container.addEventListener('click', (event) => {
    if (event.target.classList.contains('like-icon')) {
        const id = event.target.closest('.card').dataset.id;
        toggleLike(id);
    }
});
```

#### Toggling States
```javascript
function togglePlaylistLike(playlistId) {
    const playlist = playlists.find(p => p.id === playlistId);
    
    if (!playlist.likedByUser) {
        // Branch 1: Like it
        playlist.likes += 1;
        playlist.likedByUser = true;
    } else {
        // Branch 2: Unlike it
        playlist.likes -= 1;
        playlist.likedByUser = false;
    }
    
    updateUI(playlist);
}
```

---

## 🎨 Project-Specific Patterns

### Modal State Management
```javascript
// Track current playlist
let currentModalPlaylistId = null;

// Open modal
function openModal(playlist) {
    currentModalPlaylistId = playlist.id;  // Remember which playlist
    populateModalContent(playlist);
    modalOverlay.style.display = 'flex';
}

// Shuffle uses tracked ID
function handleShuffleClick() {
    if (currentModalPlaylistId) {
        shufflePlaylistSongs(currentModalPlaylistId);
    }
}
```

### Like Toggle Pattern
```javascript
// Branch-based logic
const isCurrentlyLiked = playlist.likedByUser;

if (!isCurrentlyLiked) {
    // Branch 1: Unlike → Like
    playlist.likes += 1;
    playlist.likedByUser = true;
    icon.classList.add('liked');
} else {
    // Branch 2: Like → Unlike
    playlist.likes = Math.max(0, playlist.likes - 1);
    playlist.likedByUser = false;
    icon.classList.remove('liked');
}
```

### Fisher-Yates Shuffle
```javascript
function shuffleArray(array) {
    const shuffled = [...array];  // Copy first
    
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled;
}
```

### Deep Copy for State Preservation
```javascript
// Shallow copy (WRONG - shares reference)
const copy = playlist.songs;

// Deep copy (CORRECT - independent copy)
const copy = JSON.parse(JSON.stringify(playlist.songs));
```

---

## 🛠️ Development Workflow

### Code Organization Principles

1. **Separation of Concerns**
   - HTML = Structure (what)
   - CSS = Presentation (how it looks)
   - JavaScript = Behavior (what it does)

2. **Single Responsibility**
   - Each function does ONE thing
   - `createCard()` creates, doesn't render
   - `renderCards()` renders, doesn't create

3. **DRY (Don't Repeat Yourself)**
   - Extract repeated code into functions
   - Use helper functions like `formatLikeCount()`

4. **Defensive Programming**
   - Check if elements exist before using
   - Validate inputs at function start
   - Handle errors gracefully

### Debugging Tips

```javascript
// Log values
console.log('Playlist:', playlist);

// Log with label
console.log('Songs count:', playlist.songs.length);

// Log errors
console.error('Failed to load:', error);

// Inspect objects
console.table(playlists);  // Pretty table view

// Check conditions
console.assert(playlist.songs.length > 0, 'Playlist is empty!');
```

---

## 📚 Key Algorithms Used

### 1. Fisher-Yates Shuffle
**Purpose**: Unbiased random array shuffling  
**Time Complexity**: O(n)  
**Space Complexity**: O(n) with array copy  

### 2. Array Find
**Purpose**: Search for first matching element  
**Time Complexity**: O(n) worst case  

### 3. Event Delegation
**Purpose**: Efficient event handling for dynamic elements  
**Benefit**: One listener instead of many  

---

## 🎯 Coding Best Practices

### Naming Conventions
```javascript
// Variables: camelCase
let playlistCount = 0;

// Functions: camelCase, verb-based
function renderPlaylistCards() {}
function togglePlaylistLike() {}

// Constants: UPPER_SNAKE_CASE (optional)
const MAX_PLAYLISTS = 100;

// Classes: PascalCase
class PlaylistManager {}

// Private variables: prefix with _
let _internalState = {};
```

### Comments
```javascript
// Good: Explain WHY, not WHAT
// Save original order for future unshuffle feature
playlist.originalSongOrder = [...playlist.songs];

// Bad: Explains obvious WHAT
// Set the title
element.textContent = title;
```

### Modern JavaScript
```javascript
// ✅ Use const/let, not var
const config = {};
let count = 0;

// ✅ Use arrow functions
const double = (x) => x * 2;

// ✅ Use template literals
const message = `Hello, ${name}!`;

// ✅ Use async/await, not callbacks
async function load() {
    const data = await fetch(url);
}

// ✅ Use destructuring
const { title, creator } = playlist;

// ✅ Use spread operator
const copy = [...original];
```

---

## 🚀 Performance Tips

### Efficient DOM Manipulation
```javascript
// ❌ Bad: Multiple reflows
for (let item of items) {
    container.appendChild(createCard(item));
}

// ✅ Good: One reflow
const fragment = document.createDocumentFragment();
for (let item of items) {
    fragment.appendChild(createCard(item));
}
container.appendChild(fragment);
```

### Event Listener Management
```javascript
// ❌ Bad: Many listeners
cards.forEach(card => {
    card.addEventListener('click', handleClick);
});

// ✅ Good: One listener (event delegation)
container.addEventListener('click', (e) => {
    if (e.target.matches('.card')) {
        handleClick(e);
    }
});
```

---

## 📖 Additional Resources

### CSS Flexbox
- [CSS-Tricks: Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Flexbox Froggy](https://flexboxfroggy.com/) - Interactive game
- [MDN: Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout)

### JavaScript
- [JavaScript.info](https://javascript.info/) - Complete modern JavaScript
- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - Reference
- [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS) - Deep dive

### Algorithms
- [Fisher-Yates Shuffle](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)
- [JavaScript Array Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

---

## 🎓 Project Achievements

As a senior engineer, this project demonstrates:

- ✅ **Clean Architecture** - Separation of concerns (HTML/CSS/JS)
- ✅ **Modern JavaScript** - ES6+, async/await, arrow functions
- ✅ **Responsive Design** - Flexbox, Grid, media queries
- ✅ **User Experience** - Smooth animations, immediate feedback
- ✅ **Accessibility** - ARIA labels, keyboard navigation
- ✅ **Algorithms** - Fisher-Yates shuffle for unbiased randomization
- ✅ **State Management** - Track likes and current modal
- ✅ **Error Handling** - Defensive programming, try-catch
- ✅ **Code Quality** - DRY, single responsibility, readable
- ✅ **Performance** - Efficient DOM manipulation

---

## 💡 Remember

When coding as a senior engineer:
1. **Plan before coding** - Write specs first
2. **Code defensively** - Check for errors
3. **Think about users** - Smooth UX, accessibility
4. **Keep it simple** - Don't over-engineer
5. **Document well** - Clear comments and READMEs
6. **Test thoroughly** - Edge cases, error states
7. **Review your work** - Refactor for clarity
8. **Stay current** - Use modern best practices

---

## 🎵 This Project

You're building a **production-ready music playlist explorer** with industry-standard code quality. Every line serves a purpose, every function has a clear responsibility, and every user interaction provides smooth feedback.

**Keep building great software!** 🚀
