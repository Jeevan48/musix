console.log('Welcome to Musix!');

// Variables Initialization
let songindex = 0; //stored index no of current song
let audioElement = new Audio('songs/100.mp3'); //stores the current song
const masterplay = document.getElementById('masterplay'); //the master play button
const progressBarContainer = document.getElementById('progress-bar-container');
const progressBar = document.getElementById('progress-bar'); //song progress bar
// const gif = document.getElementById('gif'); //music play/pause visualizer
let mastersongname = document.getElementById('mastersongname'); //current song name
let playlist = '10'; //stores playlist no

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
	if (audioElement.paused || audioElement.currentTime <= 0) {
		audioElement.play();
		return true;
	} else {
		return false;
	}
}

function pausePlayer() {
	if (audioElement.played && audioElement.currentTime > 0) {
		audioElement.pause();
		return true;
	} else {
		return false;
	}
}

function masterPlayAction() {
	if (playPlayer()) {
		pauseAll();
		let elem = document.getElementById('10' + songindex);
		elem.classList.remove('fa-circle-play');
		elem.classList.add('fa-circle-pause');
	} else {
		pausePlayer();
		pauseAll();
		let elem = document.getElementById('10' + songindex);
		elem.classList.remove('fa-circle-pause');
		elem.classList.add('fa-circle-play');
	}
}

progressBarContainer.addEventListener('click', function (event) {
	const clickPositionX =
		event.clientX - progressBarContainer.getBoundingClientRect().left;
	const containerWidth = progressBarContainer.clientWidth;

	const clickPercentage = (clickPositionX / containerWidth) * 100;
	const newTime = (clickPercentage / 100) * audioElement.duration;

	audioElement.currentTime = newTime;

	progressBar.style.width = clickPercentage + '%';
});

audioElement.addEventListener('ended', function () {
	if (songindex < songs_1.length - 1) {
		nextAction();
	}
});

//automatically update play pause button depending on audio state
audioElement.addEventListener('play', function () {
	masterplay.classList.remove('fa-play-circle');
	masterplay.classList.add('fa-pause-circle');
});
audioElement.addEventListener('pause', function () {
	masterplay.classList.remove('fa-pause-circle');
	masterplay.classList.add('fa-play-circle');
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
});

// audioElement.addEventListener('timeupdate', function ()
function updatePlayerBar() {
	const current_time = audioElement.currentTime;
	const duration_time = audioElement.duration;

	if (!isNaN(duration_time)) {
		const percentage = (current_time / duration_time) * 100;
		progressBar.style.width = percentage + '%';
	} else {
		progressBar.style.width = '0%';
	}
}
const playerBarRepeat = setInterval(updatePlayerBar, 100);

//change all songs CSS to paused
function pauseAll() {
	Array.from(document.getElementsByClassName('songitemplay')).forEach(
		(element) => {
			console.log('pauseAll Called');
			element.classList.remove('fa-circle-pause');
			element.classList.add('fa-circle-play');
		}
	);
}

//song clicked method
function songAction(songID) {
	e = document.getElementById(songID);
	//isAlreadyPlaying
	if (e.classList.contains('fa-circle-pause')) {
		console.log('a song was playing...pausing it...');
		e.classList.remove('fa-circle-pause');
		e.classList.add('fa-circle-play');
		pausePlayer();
	}
	//isPaused
	else {
		pauseAll();
		console.log('a song was paused...playing it...');
		e.classList.remove('fa-circle-play');
		e.classList.add('fa-circle-pause');
		pausePlayer();
		temp_src = audioElement.src;
		temp_time = audioElement.currentTime;
		audioElement.src = 'songs/' + songID + '.mp3';
		if (temp_src == audioElement.src) {
			audioElement.currentTime = temp_time;
		} else {
			progressBar.value = 0;
		}
		songindex = parseInt(songID.charAt(songID.length - 1), 10);
		console.log(songindex);
		mastersongname.innerText = songs_1[songindex].songname;
		playPlayer();
	}
}

//next clicked
function nextAction() {
	if (songindex >= 5) {
		songindex = 0;
	} else {
		songindex += 1;
	}

	progressBar.value = 0;
	pauseAll();
	let elem = document.getElementById('10' + songindex);
	elem.classList.remove('fa-circle-play');
	elem.classList.add('fa-circle-pause');

	pausePlayer();
	audioElement.src = `songs/10${songindex}.mp3`;
	mastersongname.innerText = songs_1[songindex].songname;
	audioElement.currentTime = 0;
	playPlayer();
}

//previous clicked
function previousAction() {
	if (songindex <= 0) {
		songindex = 0;
	} else {
		songindex -= 1;
	}

	progressBar.value = 0;
	pauseAll();
	let elem = document.getElementById('10' + songindex);
	elem.classList.remove('fa-circle-play');
	elem.classList.add('fa-circle-pause');

	pausePlayer();
	audioElement.src = `songs/10${songindex}.mp3`;
	mastersongname.innerText = songs_1[songindex].songname;
	audioElement.currentTime = 0;
	playPlayer();
}

//INIT Calls
window.onload = function () {
	console.log('Website fully loaded');
};
