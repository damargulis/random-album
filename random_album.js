function playAlbum() {
    const timerId = setInterval(() => {
        const playButton = document.getElementById('playButton');
        if (playButton) {
            clearInterval(timerId);
            playButton.click();
        }
    }, 100);
}

function nextAlbum() {
    if (playlist[currentlyPlaying+1]) {
        currentlyPlaying++;
        window.location.href = playlist[currentlyPlaying];
        playAlbum();
    } else {
        window.location.href = "https://play.google.com/music/listen#/albums";
        const shuffleButton = document.querySelector('[data-id="shuffle-my-library"]')
        shuffleButton.click();
        const albumDetails = document.getElementsByClassName("player-album");
        albumDetails[0].click();
        playAlbum();
        playlist.push(window.location.href);
        currentlyPlaying++;
    }
}

function prevAlbum() {
    if (playlist[currentlyPlaying-1]) {
        currentlyPlaying--;
        window.location.href = playlist[currentlyPlaying];
        playAlbum();
    } else {
        console.log('No previous album');
    }
}

const playlist = [];
let currentlyPlaying = -1;
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.type) {
        case 'next-album':
            nextAlbum();
            break;
        case 'prev-album':
            prevAlbum();
            break;
        default:
            console.log("Message not recoginzed");
    }
});
