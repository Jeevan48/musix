// Getting Elements
const AudioElement = new Audio('songs/100.mp3'); //stores the current song
const MasterPlayButton = document.getElementById('master-play-btn'); //the master play button
const PreviousButton = document.getElementById('prev-btn'); //previous button
const NextButton = document.getElementById('next-btn'); //previous button
const ProgressBarContainer = document.getElementById('progress-bar-container');
const ProgressBar = document.getElementById('progress-bar'); //song progress bar
let MasterSongName = document.getElementById('master-song-name'); //current song name
let ToggleRepeatButton = document.getElementById('toggle-repeat-btn'); //toggle repeat button

//player parameters
const playlist = '10'; //stores playlist no
let currentSongIndex = 0; //stored index no of current song
let repeatMode = 2; //0=repeat off, 1=repeat one, 2=repeat all
let shuffleMode = 0; //0=shuffle off, 1=shuffle on
let autoplayMode = true; //to control if next song should play automatically or not

let songs_1 = [
	{
		songname: 'Kantara',
		filepath: 'songs/1.mp3',
		coverPath: 'media/covers/1.jpg',
	},
	{
		songname: 'Dil Nu',
		filepath: 'songs/2.mp3',
		coverPath: 'media/covers/2.jpg',
	},
	{
		songname: 'Tere Hawale',
		filepath: 'songs/3.mp3',
		coverPath: 'media/covers/3.jpg',
	},
	{
		songname: 'Kahani Suno',
		filepath: 'songs/4.mp3',
		coverPath: 'media/covers/4.jpg',
	},
	{
		songname: 'Heeriye',
		filepath: 'songs/5.mp3',
		coverPath: 'media/covers/5.jpg',
	},
	{
		songname: 'Udd Ja Kaale Kawan',
		filepath: 'songs/6.mp3',
		coverPath: 'media/covers/6.jpg',
	},
];

function loadHTML(className, fileName) {
	console.log('Div id: ' + className + ', filename: ' + fileName);

	let xhttp;
	const element = document.querySelectorAll('.' + className);
	console.log(element.length);
	let file = fileName;

	if (file) {
		element.forEach((elem) => {
			xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function () {
				if (this.readyState == 4) {
					if ((this.status = 200)) {
						var importText = this.responseText;
						elem.innerHTML = importText;
						console.log(
							'Successfully imported ' + file + ' ' + elem.id
						);

						//now running javascript of the imported file
						const parser = new DOMParser();
						var importDoc = this.responseText;
						var importHTML = parser.parseFromString(
							importDoc,
							'text/html'
						);
						var importScripts =
							importHTML.querySelectorAll('script');
						importScripts.forEach((importScript) => {
							var script = document.createElement('script');
							script.textContent = importScript.textContent;
							elem.appendChild(script);
						});
					} else if ((this.status = 404)) {
						console.log('Requested file not found');
						elem.innerHTML = '<h1>Requested file not found</h1>';
					}
				}
			};
			xhttp.open('GET', './html/' + file, true);
			xhttp.send();
			return;
		});
	}
}

//Play Pause methods
function playPlayer() {
	if (AudioElement.paused || AudioElement.currentTime <= 0) {
		AudioElement.play();
		return true;
	} else {
		return false;
	}
}

function pausePlayer() {
	if (AudioElement.played && AudioElement.currentTime > 0) {
		AudioElement.pause();
		return true;
	} else {
		return false;
	}
}

//change all songs CSS to show as 'paused'
function resetList() {
	Array.from(document.getElementsByClassName('songitemplay')).forEach(
		(element) => {
			// console.log('resetList Called');
			element.classList.remove('fa-circle-pause');
			element.classList.add('fa-circle-play');
		}
	);
}

//change the specific song's CSS from list to show as 'playing'
function showPlayingInList(songIndexIn) {
	resetList();
	let elem = document.getElementById('10' + songIndexIn);
	elem.classList.remove('fa-circle-play');
	elem.classList.add('fa-circle-pause');
}

//when master play button clicked
function masterPlayAction() {
	if (playPlayer()) {
		showPlayingInList(currentSongIndex);
	} else {
		pausePlayer();
		resetList();
	}
}

// AudioElement.addEventListener('timeupdate', function ()
function updatePlayerBar() {
	const current_time = AudioElement.currentTime;
	const duration_time = AudioElement.duration;

	if (!isNaN(duration_time)) {
		const percentage = (current_time / duration_time) * 100;
		ProgressBar.style.width = percentage + '%';
	} else {
		ProgressBar.style.width = '0%';
	}
}

//song clicked method
function songAction(songID) {
	// console.log(`songAction called on song ${songID}`);
	e = document.getElementById(songID);
	// console.log(e);
	//isAlreadyPlaying
	if (e.classList.contains('fa-circle-pause')) {
		// console.log('a song was playing...pausing it...');
		resetList();
		// e.classList.remove('fa-circle-pause');
		// e.classList.add('fa-circle-play');
		pausePlayer();
	} else {
		// resetList();
		// console.log('that song was not playing...playing it...');
		// e.classList.remove('fa-circle-play');
		// e.classList.add('fa-circle-pause');
		pausePlayer();
		let indexIn = parseInt(songID.charAt(songID.length - 1), 10);
		// console.log(indexIn);
		updateSong(indexIn);
		showPlayingInList(indexIn);
		playPlayer();
		// updateIcons();
	}
}

function replayCurrentSong() {
	pausePlayer();
	AudioElement.currentTime = 0;
	playPlayer();
}

//update audio source
function updateSong(indexIn) {
	if (currentSongIndex != indexIn) {
		currentSongIndex = indexIn;
		let newSrc = `songs/10${currentSongIndex}.mp3`;
		AudioElement.src = newSrc;
		AudioElement.currentTime = 0;
		ProgressBar.value = 0;
		MasterSongName.innerText = songs_1[currentSongIndex].songname;
	}
}

//disable an element (no click no hover)
function disableItem(Item) {
	Item.classList.add('disabled');

	Item.classList.remove('active-item');
	Item.classList.add('inactive-item');

	Item.classList.remove('clickable');
	Item.classList.remove('clickable-text');
	Item.classList.remove('clickable-box');
}

//enable an element (clickable and hoverable)
function enableItem(Item) {
	Item.classList.remove('disabled');

	Item.classList.remove('inactive-item');
	Item.classList.add('active-item');

	Item.classList.add('clickable');
	if (Item.classList.contains('text')) {
		Item.classList.add('clickable-text');
	}
	if (Item.classList.contains('box')) {
		Item.classList.add('clickable-box');
	}
}

function updateIcons() {
	if (currentSongIndex == 0 && repeatMode == 0) {
		disableItem(PreviousButton);
	} else {
		enableItem(PreviousButton);
	}
	if (currentSongIndex == songs_1.length - 1 && repeatMode == 0) {
		disableItem(NextButton);
	} else {
		enableItem(NextButton);
	}

	//changing repeat mode icon
	if (repeatMode == 0) {
		ToggleRepeatButton.classList.remove('active-item');
		ToggleRepeatButton.classList.add('inactive-item');
		ToggleRepeatButton.innerText = '';
		console.log('Repeat Off');
	} else if (repeatMode == 1 || repeatMode == 2) {
		ToggleRepeatButton.classList.remove('inactive-item');
		ToggleRepeatButton.classList.add('active-item');
		if (repeatMode == 1) {
			ToggleRepeatButton.innerText = '1';
			console.log('Repeat One');
		} else if (repeatMode == 2) {
			ToggleRepeatButton.innerText = '';
			console.log('Repeat All');
		}
	} else {
		console.error('Error in Switching Repeat Mode.');
	}
}

//next clicked
function nextAction() {
	console.log('nextAction Called...');
	let tempIndex = currentSongIndex;
	if (repeatMode == 1) {
		replayCurrentSong();
		return;
	} else if (repeatMode == 2 && tempIndex == songs_1.length - 1) {
		tempIndex = 0;
	} else if (tempIndex < songs_1.length - 1) {
		tempIndex += 1;
	} else {
		return;
	}
	ProgressBar.value = 0;

	pausePlayer();
	updateSong(tempIndex);
	playPlayer();

	resetList();
	showPlayingInList(tempIndex);

	// updateIcons();
}

//previous clicked
function previousAction() {
	let tempIndex = currentSongIndex;
	console.log('previousAction Called...');
	if (repeatMode == 1) {
		replayCurrentSong();
		return;
	} else if (repeatMode == 2 && tempIndex == 0) {
		tempIndex = songs_1.length - 1;
	} else if (tempIndex > 0) {
		tempIndex -= 1;
	} else {
		return;
	}
	ProgressBar.value = 0;

	pausePlayer();
	updateSong(tempIndex);
	playPlayer();

	resetList();
	showPlayingInList(tempIndex);
}

function toggleRepeatTo(newRepeat) {
	repeatMode = newRepeat % 3;
	updateIcons();
}

function toggleRepeat() {
	toggleRepeatTo(repeatMode + 1);
}

ProgressBarContainer.addEventListener('click', function (event) {
	const clickPositionX =
		event.clientX - ProgressBarContainer.getBoundingClientRect().left;
	const containerWidth = ProgressBarContainer.clientWidth;

	const clickPercentage = (clickPositionX / containerWidth) * 100;
	const newTime = (clickPercentage / 100) * AudioElement.duration;

	AudioElement.currentTime = newTime;

	ProgressBar.style.width = clickPercentage + '%';
});

//automatically update play pause button depending on audio state
AudioElement.addEventListener('play', function () {
	MasterPlayButton.classList.remove('fa-play-circle');
	MasterPlayButton.classList.add('fa-pause-circle');
	updateIcons();
});

AudioElement.addEventListener('pause', function () {
	MasterPlayButton.classList.remove('fa-pause-circle');
	MasterPlayButton.classList.add('fa-play-circle');
	updateIcons();
});

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
});

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
	}
	//ISSUE
	// else if (
	// 	(event.code =
	// 		'KeyR' && event.code != 'altLeft' && event.code != 'altRight')
	// ) {
	// 	event.preventDefault();
	// 	console.log('Toggle Repeat Clicked');
	// 	toggleRepeat();
	// }
});

//INIT Calls
window.onload = function () {
	console.log('Website fully loaded');
	const playerBarRepeat = setInterval(updatePlayerBar, 100);
	updateIcons();
};
