// Quick test to verify Featured page random selection logic
// This can be run in browser console on featured.html

console.log("=== Featured Page Test Suite ===\n");

// Test 1: Verify selectRandomPlaylist function exists
console.log("Test 1: Function Existence");
if (typeof selectRandomPlaylist === 'function') {
    console.log("✓ selectRandomPlaylist() function exists");
} else {
    console.log("✗ selectRandomPlaylist() function not found");
}

// Test 2: Verify random selection works
console.log("\nTest 2: Random Selection");
setTimeout(() => {
    if (playlistsData && playlistsData.length > 0) {
        console.log(`✓ Loaded ${playlistsData.length} playlists`);

        // Test multiple selections to verify randomness
        const selections = [];
        for (let i = 0; i < 10; i++) {
            const playlist = selectRandomPlaylist();
            if (playlist) {
                selections.push(playlist.id);
            }
        }

        const uniqueSelections = new Set(selections);
        console.log(`Selected ${selections.length} playlists, ${uniqueSelections.size} unique`);

        if (uniqueSelections.size > 1 || playlistsData.length === 1) {
            console.log("✓ Random selection producing different results");
        } else {
            console.log("⚠ Random selection may not be working (or only 1 playlist)");
        }
    } else {
        console.log("✗ No playlist data loaded");
    }
}, 1000);

// Test 3: Verify current featured playlist is displayed
console.log("\nTest 3: Playlist Display");
setTimeout(() => {
    const title = document.querySelector('.featured-playlist-title');
    const creator = document.querySelector('.featured-playlist-creator');
    const coverImage = document.querySelector('.featured-cover-image');
    const songsList = document.querySelector('.featured-songs-list');

    if (title && title.textContent !== 'Loading...') {
        console.log(`✓ Playlist title displayed: "${title.textContent}"`);
    } else {
        console.log("✗ Playlist title not displayed or still loading");
    }

    if (creator && creator.textContent) {
        console.log(`✓ Creator displayed: "${creator.textContent}"`);
    } else {
        console.log("✗ Creator not displayed");
    }

    if (coverImage && coverImage.src && !coverImage.src.includes('placeholder')) {
        console.log(`✓ Cover image loaded`);
    } else {
        console.log("✗ Cover image not loaded or using placeholder");
    }

    const songs = songsList.querySelectorAll('.song-item');
    if (songs.length > 0) {
        console.log(`✓ Song list displayed with ${songs.length} songs`);
    } else {
        console.log("✗ No songs displayed");
    }
}, 1500);

// Test 4: Verify navigation links
console.log("\nTest 4: Navigation");
setTimeout(() => {
    const navLinks = document.querySelectorAll('.nav-link');
    const activeLinks = document.querySelectorAll('.nav-link.active');

    if (navLinks.length === 2) {
        console.log(`✓ Navigation has 2 links`);
    } else {
        console.log(`✗ Expected 2 navigation links, found ${navLinks.length}`);
    }

    if (activeLinks.length === 1) {
        const activeLink = activeLinks[0];
        if (activeLink.getAttribute('href') === 'featured.html') {
            console.log(`✓ Featured link is active (correct page)`);
        } else {
            console.log(`✗ Wrong link is active: ${activeLink.getAttribute('href')}`);
        }
    } else {
        console.log(`✗ Expected 1 active link, found ${activeLinks.length}`);
    }
}, 500);

// Test 5: Verify like functionality
console.log("\nTest 5: Like Functionality");
setTimeout(() => {
    const likeButton = document.querySelector('.featured-like-button');
    const likeCount = document.querySelector('.featured-like-count');

    if (likeButton && likeCount) {
        console.log(`✓ Like button and count elements exist`);

        const initialCount = parseInt(likeCount.textContent.replace('k', '000'));
        const isLiked = likeButton.classList.contains('liked');

        console.log(`  Initial state: ${isLiked ? 'liked' : 'not liked'}, count: ${likeCount.textContent}`);

        // Simulate click
        likeButton.click();

        setTimeout(() => {
            const newIsLiked = likeButton.classList.contains('liked');
            const newCount = likeCount.textContent;

            if (newIsLiked !== isLiked) {
                console.log(`✓ Like state toggled to: ${newIsLiked ? 'liked' : 'not liked'}`);
            } else {
                console.log(`✗ Like state did not toggle`);
            }

            console.log(`  New count: ${newCount}`);
        }, 100);
    } else {
        console.log("✗ Like button or count element not found");
    }
}, 2000);

console.log("\n=== Test suite will complete in ~3 seconds ===");
console.log("Watch for results above.\n");
