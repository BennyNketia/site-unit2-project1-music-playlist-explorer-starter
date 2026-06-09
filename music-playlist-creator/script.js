// =============================================================================
// DATA LOADING & STATE
// =============================================================================

let playlistsData = [];

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
// PLAYLIST CARD RENDERING
// =============================================================================

/**
 * renderPlaylistCards - Dynamically create and display playlist cards from data
 *
 * Matches spec from planning.md:
 * - Takes array of playlist objects
 * - Creates DOM elements for each playlist
 * - Appends to .playlist-cards container
 * - Handles empty state gracefully
 *
 * @param {Array} playlists - Array of playlist objects from data.json
 * @returns {void} - Side effect: modifies DOM
 */
function renderPlaylistCards(playlists) {
    const container = document.querySelector('.playlist-cards');

    // Defensive check: ensure container exists
    if (!container) {
        console.error('Playlist cards container not found in DOM');
        return;
    }

    // Clear existing content (remove hardcoded placeholder cards)
    container.innerHTML = '';

    // Handle empty state
    if (!playlists || playlists.length === 0) {
        showEmptyState(container);
        return;
    }

    // Create and append card for each playlist
    playlists.forEach(playlist => {
        const card = createPlaylistCard(playlist);
        container.appendChild(card);
    });

    // After rendering, attach event listeners
    attachCardEventListeners();
}

/**
 * createPlaylistCard - Create a single playlist card element
 *
 * Uses fields from playlist schema:
 * - id, title, creator, coverImage, likes
 *
 * @param {Object} playlist - Single playlist object
 * @returns {HTMLElement} - Complete article element with all children
 */
function createPlaylistCard(playlist) {
    // Create card container
    const card = document.createElement('article');
    card.className = 'playlist-card';
    card.setAttribute('role', 'listitem');
    card.setAttribute('tabindex', '0');
    card.setAttribute('data-playlist-id', playlist.id);
    card.setAttribute('aria-label', `Playlist: ${playlist.title} by ${playlist.creator}`);

    // Create image element
    const img = document.createElement('img');
    img.className = 'playlist-image';
    img.src = playlist.coverImage;
    img.alt = '';

    // Handle image loading errors with fallback
    img.onerror = function() {
        console.warn(`Failed to load image for playlist: ${playlist.title}`);
        // Image will show gradient background from CSS
        this.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    };

    // Create info container
    const info = document.createElement('div');
    info.className = 'playlist-info';

    // Create title
    const title = document.createElement('h2');
    title.className = 'playlist-title';
    title.textContent = playlist.title;

    // Create creator
    const creator = document.createElement('p');
    creator.className = 'playlist-creator';
    creator.textContent = playlist.creator;

    // Create likes container
    const likes = document.createElement('div');
    likes.className = 'playlist-likes';

    const likeIcon = document.createElement('span');
    likeIcon.className = 'like-icon';
    likeIcon.setAttribute('role', 'button');
    likeIcon.setAttribute('tabindex', '0');
    likeIcon.setAttribute('aria-label', 'Like this playlist');
    likeIcon.setAttribute('aria-pressed', playlist.likedByUser ? 'true' : 'false');
    likeIcon.textContent = '♥';
    likeIcon.style.cursor = 'pointer';

    // Apply liked state if user has already liked this playlist
    if (playlist.likedByUser) {
        likeIcon.classList.add('liked');
    }

    const likeCount = document.createElement('span');
    likeCount.className = 'like-count';
    likeCount.textContent = formatLikeCount(playlist.likes);

    // Add like toggle event listener
    likeIcon.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent card click event from firing
        togglePlaylistLike(playlist.id, likeIcon, likeCount);
    });

    // Add keyboard support for like icon
    likeIcon.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            e.stopPropagation();
            togglePlaylistLike(playlist.id, likeIcon, likeCount);
        }
    });

    // Assemble the card
    likes.appendChild(likeIcon);
    likes.appendChild(likeCount);

    info.appendChild(title);
    info.appendChild(creator);
    info.appendChild(likes);

    card.appendChild(img);
    card.appendChild(info);

    return card;
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

// =============================================================================
// LIKE FUNCTIONALITY
// =============================================================================

/**
 * togglePlaylistLike - Toggle the liked state of a playlist
 *
 * Matches spec from planning.md:
 * - Branch 1 (Unliked → Liked): Increment likes, add 'liked' class, set likedByUser to true
 * - Branch 2 (Liked → Unliked): Decrement likes, remove 'liked' class, set likedByUser to false
 * - Updates both data model and DOM synchronously
 * - Prevents event propagation to card click handler
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

    // Log for debugging (can be removed in production)
    console.log(`Playlist "${playlist.title}" ${isCurrentlyLiked ? 'unliked' : 'liked'}. New count: ${playlist.likes}`);
}

/**
 * showEmptyState - Display message when no playlists available
 *
 * @param {HTMLElement} container - The playlist cards container
 */
function showEmptyState(container) {
    const emptyMessage = document.createElement('div');
    emptyMessage.className = 'empty-state';
    emptyMessage.innerHTML = `
        <p class="empty-state-message">No playlists found</p>
        <p class="empty-state-subtitle">Check back later for new music!</p>
    `;
    container.appendChild(emptyMessage);
}

/**
 * showErrorMessage - Display error message to user
 *
 * @param {string} message - Error message to display
 */
function showErrorMessage(message) {
    const container = document.querySelector('.playlist-cards');
    if (container) {
        container.innerHTML = `
            <div class="error-state">
                <p class="error-message">${message}</p>
            </div>
        `;
    }
}

// =============================================================================
// MODAL FUNCTIONALITY
// =============================================================================

/**
 * attachCardEventListeners - Attach click handlers to all playlist cards
 * Called after cards are rendered to ensure listeners are on dynamic content
 */
function attachCardEventListeners() {
    const cards = document.querySelectorAll('.playlist-card');

    cards.forEach(card => {
        // Click event
        card.addEventListener('click', handleCardClick);

        // Keyboard event (Enter or Space)
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleCardClick.call(card);
            }
        });
    });
}

/**
 * handleCardClick - Handle click on playlist card
 * Opens modal and populates with playlist data
 */
function handleCardClick() {
    const playlistId = this.getAttribute('data-playlist-id');
    const playlist = playlistsData.find(p => p.id === playlistId);

    if (playlist) {
        openModal(playlist);
    }
}

/**
 * openModal - Open modal and populate with playlist data
 *
 * @param {Object} playlist - Playlist object to display
 */
function openModal(playlist) {
    const modalOverlay = document.querySelector('.modal-overlay');

    // Track current playlist ID for shuffle functionality
    currentModalPlaylistId = playlist.id;

    // Populate modal with playlist data
    populateModalContent(playlist);

    // Reset and setup AI description UI
    resetDescriptionUI();
    setupDescriptionButton();

    // Show modal
    modalOverlay.style.display = 'flex';

    // Focus trap: focus on close button
    setTimeout(() => {
        const closeButton = document.querySelector('.modal-close');
        if (closeButton) closeButton.focus();
    }, 100);
}

/**
 * populateModalContent - Fill modal with playlist details
 *
 * @param {Object} playlist - Playlist object with songs array
 */
function populateModalContent(playlist) {
    // Update playlist header
    const modalImage = document.querySelector('.modal-playlist-image');
    const modalTitle = document.querySelector('.modal-playlist-title');
    const modalCreator = document.querySelector('.modal-playlist-creator');

    if (modalImage) modalImage.src = playlist.coverImage;
    if (modalTitle) modalTitle.textContent = playlist.title;
    if (modalCreator) modalCreator.textContent = playlist.creator;

    // Populate songs list (separated for reuse in shuffle)
    populateModalSongList(playlist);
}

/**
 * populateModalSongList - Render the song list in the modal
 * Separated from populateModalContent to allow re-rendering after shuffle
 *
 * @param {Object} playlist - Playlist object with songs array
 */
function populateModalSongList(playlist) {
    const songsContainer = document.querySelector('.modal-songs');
    if (!songsContainer) {
        console.error('populateModalSongList: Songs container not found');
        return;
    }

    songsContainer.innerHTML = '';

    if (playlist.songs && playlist.songs.length > 0) {
        playlist.songs.forEach(song => {
            const songElement = createSongElement(song);
            songsContainer.appendChild(songElement);
        });
    } else {
        songsContainer.innerHTML = '<p class="no-songs">No songs in this playlist yet.</p>';
    }

    // Scroll to top of song list after rendering
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

// Modal close handlers
function setupModalHandlers() {
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalClose = document.querySelector('.modal-close');
    const modalContent = document.querySelector('.modal-content');

    // Close button
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Click outside modal
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    // Prevent clicks inside modal content from closing
    if (modalContent) {
        modalContent.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modal = document.querySelector('.modal-overlay');
            if (modal && modal.style.display === 'flex') {
                closeModal();
            }
        }
    });

    // Shuffle button listener
    const shuffleButton = document.querySelector('.shuffle-button');
    if (shuffleButton) {
        shuffleButton.addEventListener('click', handleShuffleClick);
    }
}

/**
 * closeModal - Close the modal overlay
 */
function closeModal() {
    const modalOverlay = document.querySelector('.modal-overlay');
    if (modalOverlay) {
        modalOverlay.style.display = 'none';
    }
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

// Track current playlist ID being displayed in modal
let currentModalPlaylistId = null;

/**
 * handleShuffleClick - Handle click on shuffle button
 * Delegates to shufflePlaylistSongs with current playlist ID
 */
function handleShuffleClick() {
    if (!currentModalPlaylistId) {
        console.warn('handleShuffleClick: No playlist currently displayed in modal');
        return;
    }

    shufflePlaylistSongs(currentModalPlaylistId);
}

/**
 * shufflePlaylistSongs - Shuffle the order of songs in a playlist
 *
 * Matches spec from planning.md:
 * - Preserves original order on first shuffle (in playlist.originalSongOrder)
 * - Uses Fisher-Yates algorithm for unbiased randomness
 * - Updates playlist.songs array in place
 * - Re-renders modal song list to show new order
 * - Each click produces new random order (not cycling)
 * - Handles edge cases (0 songs, 1 song)
 *
 * @param {string} playlistId - The unique ID of the playlist to shuffle
 * @returns {void} - Side effect: modifies playlistsData and re-renders modal
 */
function shufflePlaylistSongs(playlistId) {
    // Input validation
    if (!playlistId) {
        console.error('shufflePlaylistSongs: playlistId is required');
        return;
    }

    // Find playlist in data array
    const playlist = playlistsData.find(p => p.id === playlistId);
    if (!playlist) {
        console.error(`shufflePlaylistSongs: Playlist with id ${playlistId} not found`);
        return;
    }

    // Edge case: No songs or only 1 song
    if (!playlist.songs || playlist.songs.length < 2) {
        console.warn('shufflePlaylistSongs: Need at least 2 songs to shuffle');
        // Could show user message here if desired
        return;
    }

    // Preserve original order (only on first shuffle)
    if (!playlist.originalSongOrder) {
        // Deep copy to prevent mutations
        playlist.originalSongOrder = JSON.parse(JSON.stringify(playlist.songs));
        console.log(`Saved original order for playlist "${playlist.title}"`);
    }

    // Shuffle the songs array
    playlist.songs = shuffleArray(playlist.songs);

    // Re-render the song list in modal
    populateModalSongList(playlist);

    // Visual feedback on button
    const shuffleButton = document.querySelector('.shuffle-button');
    if (shuffleButton) {
        shuffleButton.classList.add('shuffled');
        setTimeout(() => {
            shuffleButton.classList.remove('shuffled');
        }, 300);
    }

    console.log(`Shuffled playlist "${playlist.title}" (${playlist.songs.length} songs)`);
}

// =============================================================================
// AI PLAYLIST DESCRIPTION
// =============================================================================

/**
 * getPlaylistDescription - Generate AI description for a playlist
 *
 * Matches spec from planning.md:
 * - Uses OpenRouter API with free Gemma or Llama model
 * - Creates prompt from playlist title, creator, and song list
 * - Returns 2-3 sentence description
 * - Handles errors gracefully
 *
 * @param {Object} playlist - Playlist object with title, creator, songs
 * @returns {Promise<string>} - Generated description text
 * @throws {Error} - On API error, network error, or timeout
 */
async function getPlaylistDescription(playlist) {
    // Validate input
    if (!playlist || !playlist.title || !playlist.songs) {
        throw new Error('Invalid playlist data');
    }

    // Check if API key is configured
    if (!CONFIG || !CONFIG.OPENROUTER_API_KEY || CONFIG.OPENROUTER_API_KEY === 'YOUR_OPENROUTER_API_KEY_HERE') {
        throw new Error('OpenRouter API key not configured. Please add your API key to config.js');
    }

    // Build song list for prompt (limit to first 10 songs for token efficiency)
    const songList = playlist.songs.slice(0, 10).map(song =>
        `- ${song.title} by ${song.artist}`
    ).join('\n');

    // Construct the prompt
    const userPrompt = `Generate a 2-3 sentence description for this playlist:

Playlist: ${playlist.title}
Curator: ${playlist.creator}
Songs in this playlist:
${songList}

Guidelines:
- Capture the mood, vibe, and theme
- Describe the musical style
- Focus on the listening experience
- Do NOT list individual songs
- Keep it to 2-3 sentences
- Use sensory and emotional language

Description:`;

    // Prepare API request
    const requestBody = {
        model: CONFIG.MODEL,
        max_tokens: CONFIG.MAX_TOKENS,
        messages: [
            {
                role: 'system',
                content: 'You are a music curator writing engaging playlist descriptions.'
            },
            {
                role: 'user',
                content: userPrompt
            }
        ]
    };

    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), CONFIG.TIMEOUT_MS);

    try {
        // Log request details for debugging
        console.log('Making API request to:', CONFIG.OPENROUTER_API_URL);
        console.log('Using model:', CONFIG.MODEL);
        console.log('Request body:', requestBody);

        // Make API call
        const response = await fetch(CONFIG.OPENROUTER_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${CONFIG.OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': window.location.origin,
                'X-Title': 'Music Playlist Explorer'
            },
            body: JSON.stringify(requestBody),
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        console.log('Response status:', response.status);
        console.log('Response headers:', Object.fromEntries(response.headers.entries()));

        // Check response status
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('API error details:', {
                status: response.status,
                statusText: response.statusText,
                errorData: errorData
            });

            if (response.status === 401) {
                throw new Error('Invalid API key. Please check your config.js');
            } else if (response.status === 429) {
                throw new Error('Rate limit exceeded. Please try again later');
            } else {
                throw new Error('Unable to generate description');
            }
        }

        // Parse response
        const data = await response.json();
        console.log('API response data:', data);

        // Validate response structure
        if (!data.choices || !data.choices[0] || !data.choices[0].message || !data.choices[0].message.content) {
            console.error('Invalid API response structure:', data);
            throw new Error('Received invalid description format');
        }

        // Extract and return description
        const description = data.choices[0].message.content.trim();

        console.log(`Generated description for "${playlist.title}":`, description);

        return description;

    } catch (error) {
        clearTimeout(timeoutId);

        // Handle specific error types
        if (error.name === 'AbortError') {
            console.error('Description request timed out');
            throw new Error('Description request timed out');
        }

        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
            console.error('Network error fetching playlist description:', error);
            throw new Error('Unable to connect to description service');
        }

        // Re-throw other errors
        throw error;
    }
}

/**
 * handleGetDescriptionClick - Handle click on "Get Description" button
 * Shows loading state, calls API, displays result or error
 */
async function handleGetDescriptionClick() {
    const button = document.querySelector('.get-description-button');
    const descriptionElement = document.querySelector('.playlist-description');

    if (!button || !descriptionElement) {
        console.error('Description UI elements not found');
        return;
    }

    if (!currentModalPlaylistId) {
        console.error('No playlist currently displayed');
        return;
    }

    const playlist = playlistsData.find(p => p.id === currentModalPlaylistId);
    if (!playlist) {
        console.error('Playlist not found');
        return;
    }

    // Show loading state
    button.disabled = true;
    button.textContent = '✨ Generating...';
    descriptionElement.style.display = 'block';
    descriptionElement.textContent = 'Loading...';
    descriptionElement.className = 'playlist-description loading';

    try {
        console.log('Attempting to get description for playlist:', playlist.title);

        // Get AI description
        const description = await getPlaylistDescription(playlist);

        console.log('Successfully received description:', description);

        // Display success
        descriptionElement.textContent = description;
        descriptionElement.className = 'playlist-description';

        // Hide button after successful generation
        button.style.display = 'none';

        // Store description in playlist object (optional, for caching)
        playlist.aiDescription = description;

    } catch (error) {
        console.error('Failed to get description - Full error:', error);
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);

        // Display error message
        descriptionElement.textContent = error.message || 'Unable to generate description. Please try again.';
        descriptionElement.className = 'playlist-description error';

        // Re-enable button for retry
        button.disabled = false;
        button.textContent = '✨ Get AI Description';
    }
}

/**
 * setupDescriptionButton - Attach event listener to description button
 * Called when modal opens to ensure fresh listener
 */
function setupDescriptionButton() {
    const button = document.querySelector('.get-description-button');

    if (button) {
        // Remove old listener if exists
        button.replaceWith(button.cloneNode(true));

        // Get fresh reference and add listener
        const newButton = document.querySelector('.get-description-button');
        newButton.addEventListener('click', handleGetDescriptionClick);
    }
}

/**
 * resetDescriptionUI - Reset description section when modal opens
 * Clears previous description and shows button
 */
function resetDescriptionUI() {
    const button = document.querySelector('.get-description-button');
    const descriptionElement = document.querySelector('.playlist-description');

    if (button) {
        button.style.display = 'block';
        button.disabled = false;
        button.textContent = '✨ Get AI Description';
    }

    if (descriptionElement) {
        descriptionElement.style.display = 'none';
        descriptionElement.textContent = '';
        descriptionElement.className = 'playlist-description';
    }
}

// =============================================================================
// INITIALIZATION
// =============================================================================

/**
 * init - Initialize the application
 * Loads data and renders initial view
 */
async function init() {
    console.log('Initializing Music Playlist Explorer...');

    // Load playlist data
    const playlists = await loadPlaylistData();

    // Render playlist cards
    renderPlaylistCards(playlists);

    // Setup modal handlers
    setupModalHandlers();

    console.log(`Loaded ${playlists.length} playlists`);
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
