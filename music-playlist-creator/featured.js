// =============================================================================
// FEATURED PAGE - RANDOM PLAYLIST DISPLAY
// =============================================================================

let playlistsData = [];
let currentFeaturedPlaylist = null;

// =============================================================================
// DATA LOADING
// =============================================================================

/**
 * Load playlist data from data.json
 * Handles errors gracefully and provides user feedback
 */
async function loadPlaylistData() {
    try {
        const response = await fetch('data/data.json');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        playlistsData = data.playlists || [];

        // Initialize likedByUser field for each playlist (defaults to false)
        playlistsData.forEach(playlist => {
            if (!('likedByUser' in playlist)) {
                playlist.likedByUser = false;
            }
        });

        return playlistsData;
    } catch (error) {
        console.error('Error loading playlist data:', error);
        showErrorMessage('Unable to load playlists. Please try again later.');
        return [];
    }
}

// =============================================================================
// RANDOM PLAYLIST SELECTION
// =============================================================================

/**
 * selectRandomPlaylist - Select a random playlist from the loaded data
 *
 * Matches spec from planning.md:
 * - Uses Math.random() to generate random index
 * - Returns different playlist on each page load/refresh
 * - Returns null if no playlists available
 *
 * @returns {Object|null} - Randomly selected playlist object or null if none available
 */
function selectRandomPlaylist() {
    // Check if playlists data exists and has items
    if (!playlistsData || playlistsData.length === 0) {
        console.error('selectRandomPlaylist: No playlists available');
        return null;
    }

    // Generate random index
    const randomIndex = Math.floor(Math.random() * playlistsData.length);

    // Get random playlist
    const randomPlaylist = playlistsData[randomIndex];

    console.log(`Selected random playlist: "${randomPlaylist.title}" (index ${randomIndex} of ${playlistsData.length})`);

    return randomPlaylist;
}

// =============================================================================
// FEATURED PLAYLIST RENDERING
// =============================================================================

/**
 * renderFeaturedPlaylist - Display the selected playlist in Featured page layout
 *
 * Matches spec from planning.md:
 * - Updates cover image, title, creator, stats
 * - Populates song list
 * - Attaches event listeners for like buttons
 *
 * @param {Object} playlist - The playlist object to display
 * @returns {void} - Side effect: updates DOM elements
 */
function renderFeaturedPlaylist(playlist) {
    // Defensive check
    if (!playlist) {
        showErrorMessage('No playlist available to display.');
        return;
    }

    // Store current playlist for like functionality
    currentFeaturedPlaylist = playlist;

    // Update cover image
    const coverImage = document.querySelector('.featured-cover-image');
    if (coverImage) {
        coverImage.src = playlist.coverImage;
        coverImage.alt = `${playlist.title} cover art`;

        // Handle image loading errors
        coverImage.onerror = function() {
            console.warn(`Failed to load image for playlist: ${playlist.title}`);
            this.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        };
    }

    // Update playlist info
    const title = document.querySelector('.featured-playlist-title');
    if (title) title.textContent = playlist.title;

    const creator = document.querySelector('.featured-playlist-creator');
    if (creator) creator.textContent = playlist.creator;

    // Update stats (song count)
    const stats = document.querySelector('.featured-playlist-stats');
    if (stats) {
        const songCount = playlist.songs ? playlist.songs.length : 0;
        stats.textContent = `${songCount} song${songCount !== 1 ? 's' : ''}`;
    }

    // Update like button and count
    const likeButton = document.querySelector('.featured-like-button');
    const likeCount = document.querySelector('.featured-like-count');

    if (likeButton && likeCount) {
        // Set initial state
        if (playlist.likedByUser) {
            likeButton.classList.add('liked');
            likeButton.setAttribute('aria-pressed', 'true');
        } else {
            likeButton.classList.remove('liked');
            likeButton.setAttribute('aria-pressed', 'false');
        }

        likeCount.textContent = formatLikeCount(playlist.likes);

        // Attach event listeners for like functionality
        likeButton.addEventListener('click', () => {
            togglePlaylistLike(playlist.id, likeButton, likeCount);
        });

        likeButton.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                togglePlaylistLike(playlist.id, likeButton, likeCount);
            }
        });
    }

    // Populate songs list
    renderFeaturedSongs(playlist);

    console.log(`Rendered featured playlist: "${playlist.title}"`);
}

/**
 * renderFeaturedSongs - Populate the song list for the featured playlist
 *
 * @param {Object} playlist - Playlist object with songs array
 */
function renderFeaturedSongs(playlist) {
    const songsContainer = document.querySelector('.featured-songs-list');

    if (!songsContainer) {
        console.error('renderFeaturedSongs: Songs container not found');
        return;
    }

    // Clear loading message or previous content
    songsContainer.innerHTML = '';

    // Handle empty songs array
    if (!playlist.songs || playlist.songs.length === 0) {
        songsContainer.innerHTML = '<p class="no-songs">No songs in this playlist yet.</p>';
        return;
    }

    // Create song element for each song
    playlist.songs.forEach(song => {
        const songElement = createSongElement(song);
        songsContainer.appendChild(songElement);
    });
}

/**
 * createSongElement - Create DOM element for a single song
 * Reused from main script.js logic
 *
 * @param {Object} song - Song object from playlist.songs array
 * @returns {HTMLElement} - Article element with song details
 */
function createSongElement(song) {
    const article = document.createElement('article');
    article.className = 'song-item';

    article.innerHTML = `
        <img class="song-thumbnail" src="${song.coverImage}" alt="">
        <div class="song-details">
            <h3 class="song-title">${song.title}</h3>
            <p class="song-artist">${song.artist}</p>
            <p class="song-album">${song.album}</p>
        </div>
        <span class="song-duration">${song.duration}</span>
        <button class="song-like-button ${song.liked ? 'liked' : ''}"
                aria-label="Like this song"
                data-song-id="${song.id}">♥</button>
    `;

    return article;
}

// =============================================================================
// LIKE FUNCTIONALITY
// =============================================================================

/**
 * formatLikeCount - Format like count for display
 * Converts large numbers to readable format (e.g., 1.2k, 3.5k)
 *
 * @param {number} count - Raw like count
 * @returns {string} - Formatted count string
 */
function formatLikeCount(count) {
    if (count >= 1000) {
        return (count / 1000).toFixed(1) + 'k';
    }
    return count.toString();
}

/**
 * togglePlaylistLike - Toggle the liked state of the featured playlist
 * Same logic as in main script.js
 *
 * @param {string} playlistId - The unique ID of the playlist to toggle
 * @param {HTMLElement} likeIconElement - The heart icon DOM element to update
 * @param {HTMLElement} likeCountElement - The like count DOM element to update
 * @returns {void} - Side effect: modifies playlistsData and DOM
 */
function togglePlaylistLike(playlistId, likeIconElement, likeCountElement) {
    // Defensive checks
    if (!playlistId) {
        console.error('togglePlaylistLike: playlistId is required');
        return;
    }
    if (!likeIconElement || !likeCountElement) {
        console.error('togglePlaylistLike: DOM elements are required');
        return;
    }

    // Find the playlist in the data array
    const playlist = playlistsData.find(p => p.id === playlistId);
    if (!playlist) {
        console.error(`togglePlaylistLike: Playlist with id ${playlistId} not found`);
        return;
    }

    // Branch determination: Check current liked state
    const isCurrentlyLiked = playlist.likedByUser;

    if (!isCurrentlyLiked) {
        // BRANCH 1: Unliked → Liked
        // Data model changes
        playlist.likes += 1;
        playlist.likedByUser = true;

        // DOM changes
        likeIconElement.classList.add('liked');
        likeIconElement.setAttribute('aria-pressed', 'true');
        likeCountElement.textContent = formatLikeCount(playlist.likes);

        // Visual feedback animation
        likeIconElement.style.animation = 'none';
        setTimeout(() => {
            likeIconElement.style.animation = 'likeHeartPulse 0.3s ease';
        }, 10);

    } else {
        // BRANCH 2: Liked → Unliked
        // Data model changes - with boundary protection
        playlist.likes = Math.max(0, playlist.likes - 1); // Cannot go below 0
        playlist.likedByUser = false;

        // DOM changes
        likeIconElement.classList.remove('liked');
        likeIconElement.setAttribute('aria-pressed', 'false');
        likeCountElement.textContent = formatLikeCount(playlist.likes);

        // Visual feedback animation
        likeIconElement.style.animation = 'none';
        setTimeout(() => {
            likeIconElement.style.animation = 'likeHeartPulse 0.3s ease';
        }, 10);
    }

    console.log(`Playlist "${playlist.title}" ${isCurrentlyLiked ? 'unliked' : 'liked'}. New count: ${playlist.likes}`);
}

// =============================================================================
// ERROR HANDLING
// =============================================================================

/**
 * showErrorMessage - Display error message to user
 *
 * @param {string} message - Error message to display
 */
function showErrorMessage(message) {
    const leftColumn = document.querySelector('.featured-left');
    const rightColumn = document.querySelector('.featured-right');

    if (leftColumn) {
        leftColumn.innerHTML = `
            <div class="error-state">
                <p class="error-message">${message}</p>
            </div>
        `;
    }

    if (rightColumn) {
        rightColumn.innerHTML = '';
    }
}

// =============================================================================
// NAVIGATION ACTIVE STATE
// =============================================================================

/**
 * setActiveNavigation - Highlight the current page in navigation
 * Adds .active class to Featured link since we're on featured.html
 */
function setActiveNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        // Check if link points to featured.html
        if (link.getAttribute('href') === 'featured.html') {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        }
    });
}

// =============================================================================
// INITIALIZATION
// =============================================================================

/**
 * init - Initialize the Featured page
 * Loads data, selects random playlist, and renders
 */
async function init() {
    console.log('Initializing Featured Page...');

    // Set active navigation
    setActiveNavigation();

    // Load playlist data
    const playlists = await loadPlaylistData();

    if (playlists.length === 0) {
        showErrorMessage('No playlists available. Check back soon!');
        return;
    }

    // Select a random playlist
    const randomPlaylist = selectRandomPlaylist();

    if (!randomPlaylist) {
        showErrorMessage('Unable to select a playlist. Please refresh the page.');
        return;
    }

    // Render the featured playlist
    renderFeaturedPlaylist(randomPlaylist);

    console.log(`Featured page loaded with ${playlists.length} playlists available`);
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
