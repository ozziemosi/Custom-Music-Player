// script.js

// Variables
const audioPlayer = document.getElementById('audio-player');
const playPauseButton = document.getElementById('play-pause');
const loopButton = document.getElementById('loop');
const shuffleButton = document.getElementById('shuffle');
const seekBar = document.getElementById('seek-bar');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');
const volumeBar = document.getElementById('volume-bar');
const speedBar = document.getElementById('speed-bar');
const playlist = document.getElementById('playlist');
const downloadButton = document.getElementById('download-track');
let draggingElement = null;
let isLooping = false;
let isShuffling = false;

// Play/Pause Functionality
playPauseButton.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseButton.textContent = 'Pause';
    } else {
        audioPlayer.pause();
        playPauseButton.textContent = 'Play';
    }
});

// Loop Toggle
loopButton.addEventListener('click', () => {
    isLooping = !isLooping;
    audioPlayer.loop = isLooping;
    loopButton.textContent = isLooping ? 'Looping' : 'Loop';
});

// Shuffle Toggle
shuffleButton.addEventListener('click', () => {
    isShuffling = !isShuffling;
    shuffleButton.textContent = isShuffling ? 'Shuffling' : 'Shuffle';
});

// Update Seek Bar and Time Display
audioPlayer.addEventListener('timeupdate', () => {
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration;

    seekBar.value = (currentTime / duration) * 100;

    currentTimeDisplay.textContent = formatTime(currentTime);
    durationDisplay.textContent = formatTime(duration);
});

seekBar.addEventListener('input', () => {
    const seekTime = (seekBar.value / 100) * audioPlayer.duration;
    audioPlayer.currentTime = seekTime;
});

// Volume Control
volumeBar.addEventListener('input', () => {
    audioPlayer.volume = volumeBar.value / 100;
});

// Playback Speed Control
speedBar.addEventListener('change', () => {
    audioPlayer.playbackRate = speedBar.value;
});

// Drag-and-Drop Playlist Reordering
playlist.addEventListener('dragstart', (e) => {
    draggingElement = e.target;
    e.target.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
});

playlist.addEventListener('dragend', (e) => {
    e.target.classList.remove('dragging');
    draggingElement = null;
});

playlist.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';

    const target = e.target;
    if (target && target !== draggingElement && target.nodeName === 'LI') {
        const bounding = target.getBoundingClientRect();
        const offset = bounding.y + (bounding.height / 2);
        if (e.clientY - offset > 0) {
            target.insertAdjacentElement('afterend', draggingElement);
        } else {
            target.insertAdjacentElement('beforebegin', draggingElement);
        }
    }
});

// Track Selection from Playlist
playlist.addEventListener('click', (e) => {
    if (e.target && e.target.nodeName === 'LI') {
        const trackSrc = e.target.getAttribute('data-track');
        const trackTitle = e.target.getAttribute('data-title');

        audioPlayer.src = trackSrc;
        audioPlayer.play();
        playPauseButton.textContent = 'Pause';

        // Update download button link
        downloadButton.href = trackSrc;
        downloadButton.download = trackTitle;
    }
});

// Track Download
downloadButton.addEventListener('click', () => {
    const trackSrc = audioPlayer.src;
    const trackTitle = audioPlayer.getAttribute('data-title');
    downloadButton.href = trackSrc;
    downloadButton.download = trackTitle;
});

// Format Time
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Implement additional functionalities (e.g., lyrics, equalizer) here...

