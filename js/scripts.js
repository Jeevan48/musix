import {
	loadSongsFromJson,
	loadHTML,
	nextAction,
	previousAction,
	songAction,
	AudioElement,
	masterPlayAction,
	updatePlayerBar,
	updateIcons,
	addInitialData,
	toggleRepeat,
} from './functions.js';

const NavLogo = document.getElementById('nav-logo');
const NavExplore = document.getElementById('nav-explore');
const NavPlayer = document.getElementById('nav-player');
const NavAbout = document.getElementById('nav-about');

// Getting Elements
// const AudioElement = new Audio('songs/100.mp3'); //stores the current song
const midBody = document.querySelector('ul.songitemcontainer');
console.log(midBody);

const PreviousButton = document.getElementById('prev-btn'); //previous button
const MasterPlayButton = document.getElementById('master-play-btn'); //the master play button
const NextButton = document.getElementById('next-btn'); //previous button

let ToggleRepeatButton = document.getElementById('toggle-repeat-btn'); //toggle repeat button

const ProgressBarContainer = document.getElementById('progress-bar-container');
const ProgressBar = document.getElementById('progress-bar'); //song progress bar
let MasterSongName = document.getElementById('master-song-name'); //current song name

// loadHTML('mid-body', 'home.html');
loadSongsFromJson();

let songList = document.querySelectorAll('.song-item');
console.log(songList);

Array.from(songList).forEach((elem) => {
	let songID = elem.getAttribute('id');
	// console.log(`song ID is ${songID}`);
	let songIcon = document.querySelector(`#song-icon-${songID}`);
	elem.addEventListener('click', () => {
		songAction(songIcon, songID);
		console.log(`Clicked on ${songID}`);
	});
	// console.log('Event listener added for ', elem);
});

NavLogo.addEventListener('click', () => loadHTML('mid-body', 'home.html'));
NavExplore.addEventListener('click', () =>
	loadHTML('mid-body', 'explore.html')
);
NavPlayer.addEventListener('click', () => loadHTML('mid-body', 'home.html'));
NavAbout.addEventListener('click', () => loadHTML('mid-body', 'about.html'));

PreviousButton.addEventListener('click', previousAction);
MasterPlayButton.addEventListener('click', masterPlayAction);
NextButton.addEventListener('click', nextAction);

ToggleRepeatButton.addEventListener('click', toggleRepeat);

//Progress Bar Click Event
ProgressBarContainer.addEventListener('click', function (event) {
	const clickPositionX =
		event.clientX - ProgressBarContainer.getBoundingClientRect().left;
	const containerWidth = ProgressBarContainer.clientWidth;

	const clickPercentage = (clickPositionX / containerWidth) * 100;
	const newTime = (clickPercentage / 100) * AudioElement.duration;

	AudioElement.currentTime = newTime;

	ProgressBar.style.width = clickPercentage + '%';
});

/* EVENT LISTENERS */

//Audio Play Event
AudioElement.addEventListener('play', function () {
	MasterPlayButton.classList.remove('fa-play-circle');
	MasterPlayButton.classList.add('fa-pause-circle');
	updateIcons();
});

//Audio Pause Event
AudioElement.addEventListener('pause', function () {
	MasterPlayButton.classList.remove('fa-pause-circle');
	MasterPlayButton.classList.add('fa-play-circle');
	updateIcons();
});

//Audio End Event
AudioElement.addEventListener('ended', function () {
	if (autoplayMode && repeatMode != 0) {
		if (repeatMode == 1) {
			AudioElement.currentTime = 0;
			playPlayer();
		} else if (repeatMode == 2) {
			nextAction();
		} else {
			console.error('Error while playing next song automatically');
		}
	}
	updateIcons();
});

//Keyboard Controls
document.addEventListener('keydown', function (event) {
	if (
		event.code === 'MediaPlayPause' ||
		event.code === 'Space' ||
		event.code === 'KeyK'
	) {
		event.preventDefault();
		console.log('Play/Pause button pressed');
		masterPlayAction();
	} else if (event.code === 'MediaTrackPrevious' || event.code === 'KeyJ') {
		event.preventDefault();
		console.log('Previous button pressed');
		previousAction();
	} else if (event.code === 'MediaTrackNext' || event.code === 'KeyL') {
		event.preventDefault();
		console.log('Next button pressed');
		nextAction();
	} else if (event.code == 'KeyR') {
		event.preventDefault();
		console.log('Toggle Repeat Clicked');
		toggleRepeat();
	}
	console.log(event.code);
});

//Executed when window is loaded
window.addEventListener('load', () => {
	console.log('Website fully loaded');
	const playerBarRepeat = setInterval(updatePlayerBar, 100);
	updateIcons();
	addInitialData();
});
