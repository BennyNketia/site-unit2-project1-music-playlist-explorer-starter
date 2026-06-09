// =============================================================================
// FEATURED PAGE - Random Playlist Display
// =============================================================================

let playlistsData = [];
let currentFeaturedPlaylist = null;

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
 * selectRandomPlaylist - Select a random playlist from the data
 *
 * Matches spec from planning.md:
 * - Takes no parameters (uses global playlistsData)
 * - Returns a single random playlist object
 * - Runs on page load/refresh
 * - Uses Math.random() and Math.floor() for random selection
 *
 * @returns {Object|null} - Random playlist object or null if none available
 */
function selectRandomPlaylist() {
    // Defensive check: ensure data exists
    if (!playlistsData || playlistsData.length === 0) {
        console.warn('selectRandomPlaylist: No playlists available');
        return null;
    }

    // Generate random index between 0 and length-1
    const randomIndex = Math.floor(Math.random() * playlistsData.length);

    // Return the playlist at that index
    const selectedPlaylist = playlistsData[randomIndex];

    console.log(`Selected random playlist: "${selectedPlaylist.title}" (index ${randomIndex} of ${playlistsData.length})`);

    return selectedPlaylist;
}

// =============================================================================
// FEATURED PAGE RENDERING
// =============================================================================

/**
 * renderFeaturedPlaylist - Display the random playlist on the featured page
 *
 * @param {Object} playlist - The playlist object to display
 */
function renderFeaturedPlaylist(playlist) {
    if (!playlist) {
        showErrorMessage('No playlist could be selected');
        return;
    }

    // Store current playlist for shuffle functionality
    currentFeaturedPlaylist = playlist;

    // Update playlist image
    const imageElement = document.querySelector('.featured-playlist-image');
    if (imageElement) {
        imageElement.src = playlist.coverImage;
        imageElement.alt = `Cover art for ${playlist.title}`;
    }

    // Update playlist info
    const titleElement = document.querySelector('.featured-playlist-title');
    if (titleElement) {
        titleElement.textContent = playlist.title;
    }

    const creatorElement = document.querySelector('.featured-playlist-creator');
    if (creatorElement) {
        creatorElement.textContent = `By ${playlist.creator}`;
    }

    // Update like icon and count
    const likeIcon = document.querySelector('.featured-likes .like-icon');
    const likeCount = document.querySelector('.featured-likes .like-count');

    if (likeIcon && likeCount) {
        // Apply liked state
        if (playlist.likedByUser) {
            likeIcon.classList.add('liked');
            likeIcon.setAttribute('aria-pressed', 'true');
        } else {
            likeIcon.classList.remove('liked');
            likeIcon.setAttribute('aria-pressed', 'false');
        }

        likeCount.textContent = formatLikeCount(playlist.likes);

        // Add like toggle event listener
        likeIcon.addEventListener('click', () => {
            togglePlaylistLike(playlist.id);
        });

        // Keyboard support
        likeIcon.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                togglePlaylistLike(playlist.id);
            }
        });
    }

    // Update song count
    const songCountElement = document.querySelector('.song-count-number');
    if (songCountElement) {
        songCountElement.textContent = playlist.songs ? playlist.songs.length : 0;
    }

    // Render songs
    renderFeaturedSongs(playlist);
}

/**
 * renderFeaturedSongs - Render the song list for the featured playlist
 *
 * @param {Object} playlist - Playlist object with songs array
 */
function renderFeaturedSongs(playlist) {
    const songsContainer = document.querySelector('.featured-songs');
    if (!songsContainer) {
        console.error('renderFeaturedSongs: Songs container not found');
        return;
    }

    songsContainer.innerHTML = '';

    if (!playlist.songs || playlist.songs.length === 0) {
        songsContainer.innerHTML = '<p class="no-songs">No songs in this playlist yet.</p>';
        return;
    }

    // Create song elements
    playlist.songs.forEach(song => {
        const songElement = createSongElement(song);
        songsContainer.appendChild(songElement);
    });

    // Scroll to top
    songsContainer.scrollTop = 0;
}

/**
 * createSongElement - Create DOM element for a single song
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
 * showErrorMessage - Display error message to user
 *
 * @param {string} message - Error message to display
 */
function showErrorMessage(message) {
    const songsContainer = document.querySelector('.featured-songs');
    if (songsContainer) {
        songsContainer.innerHTML = `
            <div class="error-state">
                <p class="error-message">${message}</p>
            </div>
        `;
    }

    const titleElement = document.querySelector('.featured-playlist-title');
    if (titleElement) {
        titleElement.textContent = 'Error';
    }
}

// =============================================================================
// LIKE FUNCTIONALITY
// =============================================================================

/**
 * togglePlaylistLike - Toggle the liked state of the featured playlist
 *
 * Matches spec from planning.md:
 * - Branch 1 (Unliked → Liked): Increment likes, add 'liked' class, set likedByUser to true
 * - Branch 2 (Liked → Unliked): Decrement likes, remove 'liked' class, set likedByUser to false
 *
 * @param {string} playlistId - The unique ID of the playlist to toggle
 */
function togglePlaylistLike(playlistId) {
    // Find the playlist in the data array
    const playlist = playlistsData.find(p => p.id === playlistId);
    if (!playlist) {
        console.error(`togglePlaylistLike: Playlist with id ${playlistId} not found`);
        return;
    }

    const likeIcon = document.querySelector('.featured-likes .like-icon');
    const likeCountElement = document.querySelector('.featured-likes .like-count');

    if (!likeIcon || !likeCountElement) {
        console.error('togglePlaylistLike: Like elements not found');
        return;
    }

    // Branch determination: Check current liked state
    const isCurrentlyLiked = playlist.likedByUser;

    if (!isCurrentlyLiked) {
        // BRANCH 1: Unliked → Liked
        playlist.likes += 1;
        playlist.likedByUser = true;

        likeIcon.classList.add('liked');
        likeIcon.setAttribute('aria-pressed', 'true');
        likeCountElement.textContent = formatLikeCount(playlist.likes);

        // Animation
        likeIcon.style.animation = 'none';
        setTimeout(() => {
            likeIcon.style.animation = 'likeHeartPulse 0.3s ease';
        }, 10);

    } else {
        // BRANCH 2: Liked → Unliked
        playlist.likes = Math.max(0, playlist.likes - 1);
        playlist.likedByUser = false;

        likeIcon.classList.remove('liked');
        likeIcon.setAttribute('aria-pressed', 'false');
        likeCountElement.textContent = formatLikeCount(playlist.likes);

        // Animation
        likeIcon.style.animation = 'none';
        setTimeout(() => {
            likeIcon.style.animation = 'likeHeartPulse 0.3s ease';
        }, 10);
    }

    console.log(`Playlist "${playlist.title}" ${isCurrentlyLiked ? 'unliked' : 'liked'}. New count: ${playlist.likes}`);
}

// =============================================================================
// SHUFFLE FUNCTIONALITY
// =============================================================================

/**
 * shuffleArray - Shuffle an array using Fisher-Yates algorithm
 *
 * Returns a NEW shuffled array (doesn't mutate original)
 * Uses unbiased Fisher-Yates algorithm for true randomness
 *
 * @param {Array} array - The array to shuffle
 * @returns {Array} - New array with elements in random order
 */
function shuffleArray(array) {
    // Create a copy to avoid mutating original
    const shuffled = [...array];

    // Fisher-Yates shuffle algorithm
    for (let i = shuffled.length - 1; i > 0; i--) {
        // Pick random index from 0 to i
        const j = Math.floor(Math.random() * (i + 1));

        // Swap elements at i and j
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
}

/**
 * handleShuffleClick - Handle click on shuffle button
 */
function handleShuffleClick() {
    if (!currentFeaturedPlaylist) {
        console.warn('handleShuffleClick: No playlist currently displayed');
        return;
    }

    // Edge case: No songs or only 1 song
    if (!currentFeaturedPlaylist.songs || currentFeaturedPlaylist.songs.length < 2) {
        console.warn('handleShuffleClick: Need at least 2 songs to shuffle');
        return;
    }

    // Preserve original order (only on first shuffle)
    if (!currentFeaturedPlaylist.originalSongOrder) {
        currentFeaturedPlaylist.originalSongOrder = JSON.parse(JSON.stringify(currentFeaturedPlaylist.songs));
        console.log(`Saved original order for playlist "${currentFeaturedPlaylist.title}"`);
    }

    // Shuffle the songs
    currentFeaturedPlaylist.songs = shuffleArray(currentFeaturedPlaylist.songs);

    // Re-render the song list
    renderFeaturedSongs(currentFeaturedPlaylist);

    // Visual feedback on button
    const shuffleButton = document.querySelector('.shuffle-button-featured');
    if (shuffleButton) {
        shuffleButton.classList.add('shuffled');
        setTimeout(() => {
            shuffleButton.classList.remove('shuffled');
        }, 300);
    }

    console.log(`Shuffled playlist "${currentFeaturedPlaylist.title}" (${currentFeaturedPlaylist.songs.length} songs)`);
}

/**
 * setupShuffleButton - Attach event listener to shuffle button
 */
function setupShuffleButton() {
    const shuffleButton = document.querySelector('.shuffle-button-featured');
    if (shuffleButton) {
        shuffleButton.addEventListener('click', handleShuffleClick);
    }
}

// =============================================================================
// INITIALIZATION
// =============================================================================

/**
 * init - Initialize the featured page
 * Loads data, selects random playlist, and renders
 */
async function init() {
    console.log('Initializing Featured Page...');

    // Load playlist data
    const playlists = await loadPlaylistData();

    if (playlists.length === 0) {
        showErrorMessage('No playlists available');
        return;
    }

    // Select a random playlist
    const randomPlaylist = selectRandomPlaylist();

    // Render the featured playlist
    renderFeaturedPlaylist(randomPlaylist);

    // Setup shuffle button
    setupShuffleButton();

    console.log(`Featured page initialized with "${randomPlaylist?.title}"`);
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
