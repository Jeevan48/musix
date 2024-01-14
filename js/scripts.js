import {
	loadSongsFromJson,
	nextAction,
	previousAction,
	songAction,
	masterPlayAction,
	updatePlayerBar,
	updateInterface,
	addInitialData,
	toggleRepeat,
	Player,
	inspectionMethod,
} from './functions.js';

//Testing Here----------------------

// console.log(Player.audio.currentTime);
// Player.audio.currentTime = 1;
// inspectionMethod();

// ---------------------------------

// Getting Elements
const midBody = document.querySelector('ul.songitemcontainer');

//It's required to keep this line here
loadSongsFromJson();
let songList = document.querySelectorAll('.song-item');

Array.from(songList).forEach((elem) => {
	let songID = elem.getAttribute('id');
	let songIcon = document.querySelector(`#song-icon-${songID}`);
	elem.addEventListener('click', () => {
		songAction(songID);
	});
});

/* EVENT LISTENERS */
Player.PrevBtn.addEventListener('click', previousAction);
Player.MasterBtn.addEventListener('click', masterPlayAction);
Player.NextBtn.addEventListener('click', nextAction);
Player.ToggleRepeatBtn.addEventListener('click', toggleRepeat);

//Progress Bar Click Event
Player.ProgressBarContainer.addEventListener('click', function (event) {
	const clickPositionX =
		event.clientX -
		Player.ProgressBarContainer.getBoundingClientRect().left;
	const containerWidth = Player.ProgressBarContainer.clientWidth;

	const clickPercentage = (clickPositionX / containerWidth) * 100;
	const newTime = (clickPercentage / 100) * Player.audio.duration;

	Player.audio.currentTime = newTime;
});

//Audio Play Pause Events
Player.audio.addEventListener('play', function () {
	updateInterface();
});
Player.audio.addEventListener('pause', function () {
	updateInterface();
});

//Audio End Event
Player.audio.addEventListener('ended', function () {
	if (Player['repeatMode'] == 1) {
		if (Player['repeatMode'] == 1) {
			Player.audio.currentTime = 0;
			playPlayer();
		} else if (Player['repeatMode'] == 2) {
			nextAction();
		} else {
			console.error('Error while playing next song automatically');
		}
	}
	updateInterface();
});

//Keyboard Controls
document.addEventListener('keydown', function (event) {
	if (
		event.code === 'MediaPlayPause' ||
		event.code === 'Space' ||
		event.code === 'KeyK'
	) {
		event.preventDefault();
		masterPlayAction();
	} else if (event.code === 'MediaTrackPrevious' || event.code === 'KeyJ') {
		event.preventDefault();
		previousAction();
	} else if (event.code === 'MediaTrackNext' || event.code === 'KeyL') {
		event.preventDefault();
		nextAction();
	} else if (event.code == 'KeyR') {
		event.preventDefault();
		toggleRepeat();
	}
});

//Executed when window is loaded
window.addEventListener('load', () => {
	const playerBarRepeatInterval = setInterval(updatePlayerBar, 100);
	addInitialData();
	updateInterface();
	console.log('Website fully loaded');
});
