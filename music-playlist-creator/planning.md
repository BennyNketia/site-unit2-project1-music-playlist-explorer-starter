# Music Playlist Explorer - Planning Document

## Data Schema

### Playlist Object
- `id` (string) — unique identifier for the playlist, used to track which one the user clicks on
- `title` (string) — the name of the playlist that shows up on the card
- `creator` (string) — person or account that made the playlist
- `coverImage` (string) — path to the image file for the playlist cover
- `likes` (number) — how many people have liked this playlist
- `featured` (boolean) — tells us if this playlist should show up in the featured filter or not
- `songs` (array of song objects) — list of all the songs in this playlist

### Song Object
- `id` (string) — unique identifier for each song
- `title` (string) — the song name
- `artist` (string) — who performs the song
- `album` (string) — which album the song is from
- `duration` (string) — how long the song is, formatted like "3:45"
- `coverImage` (string) — path to the album art image
- `liked` (boolean) — whether the user has liked this specific song

## UI and Interaction Rules

### What are the main sections of the homepage?

The homepage has a header with the title and filter buttons at the top, then the main content area which is a grid of playlist cards. Each card shows the playlist cover image, title, creator name, and like count. There's also a footer at the bottom.

### What happens when a user clicks a playlist card?

When you click on a card, a modal pops up over the page showing all the details about that playlist. The modal shows the playlist cover image (bigger this time), the title, creator, and then a full list of all the songs. Each song shows its thumbnail, title, artist, album name, duration, and a heart icon to like it. At the bottom there's a shuffle button.

### What happens when a user clicks outside the modal?

The modal closes and you go back to viewing the grid of playlist cards. Basically clicking the dark area around the modal or the X button in the corner will close it.

### What happens when a user clicks the like icon?

The heart icon changes color to green (#1DB954) and the like count goes up by one. If you click it again when it's already liked, it goes back to gray and the count goes down by one. The like state is stored in the data so it remembers whether you liked it or not (at least until you refresh the page).

### What does the shuffle button do?

The shuffle button randomizes the order of songs in the playlist. When you click it, all the songs get rearranged in a random order inside the modal. You can click it multiple times and it'll keep shuffling to different random orders.

## Like Functionality Details

### What happens when a previously unliked playlist is liked?

**Data Model Changes:**
- The playlist's `likes` number increases by 1
- A new field `likedByUser` gets set to `true` on that playlist object

**DOM Changes:**
- The heart icon gets the class `liked` added to it
- The heart turns green
- The number next to the heart updates to show the new count
- There's a little pulse animation on the heart

### What happens when a previously liked playlist is unliked?

**Data Model Changes:**
- The playlist's `likes` number decreases by 1
- The `likedByUser` field gets set back to `false`

**DOM Changes:**
- The `liked` class gets removed from the heart icon
- The heart turns back to gray
- The like count number updates to the lower value
- Same pulse animation happens

### What constraint ensures a user can only like a playlist once at a time?

The `likedByUser` boolean field can only be true or false, not both. When you click the heart, it checks if `likedByUser` is currently true or false, then does the opposite. So you can't like something twice - if it's already liked, clicking again will unlike it instead.

## Shuffle Function Spec

### What does this function take in?

The shuffle function takes in a `playlistId` (string) which tells it which playlist's songs to shuffle.

### What does it return?

It doesn't return anything (void function). Instead it modifies the playlist data directly and re-renders the song list in the modal.

### Should the original song order be preserved anywhere, and if so, how?

Yes, the original order is saved the first time you shuffle. It creates a new property called `originalSongOrder` on the playlist object and stores a copy of the songs array before shuffling. That way if we wanted to add an "unshuffle" button later, we could restore the original order.

### What does the UI look like after shuffling?

The songs in the modal rearrange themselves into a new random order. Everything else stays the same - same thumbnails, titles, info, just different order. The shuffle button might have a quick animation to show it worked.

### What should happen when the user clicks shuffle multiple times?

Every time you click shuffle, it generates a brand new random order. It doesn't just toggle between two orders or anything - each click is completely random. You can click it as many times as you want and keep getting different arrangements.
