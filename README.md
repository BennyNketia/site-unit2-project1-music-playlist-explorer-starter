# 🎵 Music Playlist Explorer

A beautiful, Spotify-inspired music playlist explorer web application built with vanilla HTML, CSS, and JavaScript. Browse playlists, shuffle songs, and get AI-generated descriptions!

![Project Preview](https://img.shields.io/badge/Status-Complete-success)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

### Core Features
- 🎨 **Responsive Grid Layout** - Browse playlists in a beautiful 4-column grid (adapts to screen size)
- 🔍 **Playlist Details Modal** - View full playlist information with song lists
- ❤️ **Like/Unlike System** - Like your favorite playlists with visual feedback
- 🔀 **Fisher-Yates Shuffle** - Randomly shuffle songs within playlists
- ⭐ **Featured Page** - Discover a random playlist on every visit
- 🧠 **AI Descriptions** - Get AI-generated playlist descriptions powered by OpenRouter API

### Stretch Features (Bonus!)
- ➕ **Create Playlists** - Add new playlists with custom songs
- ✏️ **Edit Playlists** - Modify existing playlists
- 🎵 **Music Player** - Built-in player with play/pause, prev/next controls
- 📊 **Progress Bar** - Visual playback progress with seek functionality
- 💖 **Song Likes** - Like individual songs within playlists

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd site-unit2-project1-music-playlist-explorer-starter
```

### 2. Set Up API Key (Optional - for AI descriptions)

The AI description feature requires a free OpenRouter API key:

1. Get a free API key from [OpenRouter](https://openrouter.ai/keys)
2. Copy the example config:
   ```bash
   cp music-playlist-creator/config.example.js music-playlist-creator/config.js
   ```
3. Edit `music-playlist-creator/config.js` and replace `YOUR_OPENROUTER_API_KEY_HERE` with your actual key

**Note:** All features except AI descriptions work without an API key!

### 3. Open in Browser

Simply open `music-playlist-creator/index.html` in your browser:

```bash
# On macOS:
open music-playlist-creator/index.html

# On Windows:
start music-playlist-creator/index.html

# On Linux:
xdg-open music-playlist-creator/index.html
```

Or use a local server (recommended):

```bash
# With Python 3:
cd music-playlist-creator
python3 -m http.server 8000

# Then visit: http://localhost:8000
```

## 📁 Project Structure

```
music-playlist-creator/
├── index.html              # Main page (All Playlists)
├── featured.html           # Featured page (Random playlist)
├── script.js               # Main JavaScript (index.html)
├── featured.js             # Featured page JavaScript
├── style.css               # All styles
├── config.example.js       # API config template (commit this)
├── config.js               # Your actual API key (gitignored)
├── planning.md             # Complete planning documentation
├── data/
│   └── data.json          # Playlist and song data
├── assets/
│   └── img/               # Playlist cover images
└── [docs]                 # Feature documentation files
```

## 🎯 Usage

### Browse Playlists
- View all playlists in grid view on the home page
- Click any playlist card to see details

### Interact with Playlists
- **Like:** Click the heart icon to like/unlike
- **View Details:** Click a card to open the modal
- **Shuffle Songs:** Click "Shuffle Playlist" in the modal
- **Get AI Description:** Click "Get AI Description" button (requires API key)

### Create & Edit
- **Create:** Click "Create Playlist" button in header
- **Edit:** Hover over a playlist card and click the edit icon

### Music Player
- **Play Song:** Click any song in the playlist modal
- **Controls:** Use play/pause, previous, next buttons
- **Seek:** Click anywhere on the progress bar

### Featured Page
- Click "Featured" in the navigation
- Refresh the page to see a different random playlist

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Flexbox, Grid, Custom Properties, Animations
- **JavaScript (ES6+)** - Async/await, Arrow functions, Modules
- **OpenRouter API** - AI-powered playlist descriptions
- **JSON** - Data storage

## 📚 Documentation

The project includes comprehensive documentation:

- **[planning.md](music-playlist-creator/planning.md)** - Complete project planning
- **[CLAUDE.md](music-playlist-creator/CLAUDE.md)** - Development context and guides
- **[PROJECT_COMPLETE.md](music-playlist-creator/PROJECT_COMPLETE.md)** - Final audit
- **Feature docs** - Individual feature documentation files

## 🎨 Design Features

- **Spotify-Inspired UI** - Dark theme with green accents (#1DB954)
- **Smooth Animations** - Cubic-bezier easing for natural motion
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Accessibility** - ARIA labels, keyboard navigation
- **Glassmorphism** - Modern frosted glass effects

## 🧪 Testing

All features have been thoroughly tested:

- ✅ Grid layout displays 6+ playlists
- ✅ Modal shows complete playlist details
- ✅ Like functionality works (increment/decrement)
- ✅ Shuffle randomizes song order
- ✅ Featured page shows random playlist
- ✅ Create/Edit features work correctly
- ✅ Music player plays songs
- ✅ AI descriptions generate successfully

See [TESTING_GUIDE.md](music-playlist-creator/TESTING_GUIDE.md) for detailed test cases.

## 🔒 Security

- **API Key Protection:** `config.js` is gitignored
- **Template Available:** `config.example.js` shows structure
- **No Secrets in Code:** All sensitive data externalized

## 📝 License

This project is for educational purposes as part of the CodePath Web Development course.

## 🙏 Acknowledgments

- **CodePath** - Project specifications and curriculum
- **OpenRouter** - Free AI API access
- **Spotify** - Design inspiration

## 👤 Author

**Bnketia**
- GitHub: [@bnketia](https://github.com/bnketia)

## 📧 Support

If you have questions or issues:
1. Check the documentation files
2. Review [TROUBLESHOOTING.md](music-playlist-creator/TROUBLESHOOTING.md)
3. Open an issue on GitHub

---

**⭐ Star this repo if you found it helpful!**
