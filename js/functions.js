//getting songs list from json file
import songs from '../database/songs.json' assert { type: 'json' };
const songs_1 = JSON.parse(JSON.stringify(songs));

// // Getting Elements
const AudioElement = new Audio('database/songs/SONG_0.mp3'); //stores the current song
const PreviousButton = document.getElementById('prev-btn'); //previous button
const NextButton = document.getElementById('next-btn'); //previous button
const ProgressBar = document.getElementById('progress-bar'); //song progress bar
const ProgressBarContainer = document.getElementById('progress-bar-container'); //song progress bar
let MasterSongName = document.getElementById('master-song-name'); //current song name
let songDurationPassed = document.querySelector('#duration-passed');
let ToggleRepeatButton = document.getElementById('toggle-repeat-btn'); //toggle repeat button
const MasterPlayButton = document.querySelector('#master-play-btn');

//player parameters object (works as state of the player)
export let Player = {
	playlistNo: 0, //playlist no
	currentSongIndex: 0, //index no of current song
	repeatMode: 2, //0=rep off, 1=rep one, 2=rep all
	shuffleMode: 0, //0=shuffle off, 1=shuffle on
	audio: AudioElement, //Audio Element
	PrevBtn: PreviousButton, //Previous Button
	MasterBtn: MasterPlayButton, //Master Play Button
	NextBtn: NextButton, //Next Button
	ToggleRepeatBtn: ToggleRepeatButton, //Toggle Repeat Button
	ProgressBarContainer: ProgressBarContainer, //Progress Bar Container
};

//for testing purposes
export function inspectionMethod() {
	console.log(AudioElement.currentTime);
}

//load dynamic page content
export function loadHTML(className, fileName) {
	console.log('Div id: ' + className + ', filename: ' + fileName);
	let xhttp;
	const element = document.querySelectorAll('.' + className);
	let file = fileName;

	if (file) {
		element.forEach((elem) => {
			xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function () {
				if (this.readyState == 4) {
					if (this.status == 200) {
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

//load songs list from json file
export function loadSongsFromJson() {
	const element = document.querySelector('ul.songitemcontainer');
	let htmlContent = '';
	Array.from(songs_1).forEach((songItem) => {
		const songID = songItem.id;
		const songName = songItem.song;
		const songDuration = songItem.duration;
		const coverPath = songItem.coverPath;

		htmlContent += `
		<li class="song-item song-li clickable clickable-box" id="${songID}">
			<img alt="Song Image" src="./${coverPath}">
			<span class="songname">${songName}</span>
			<span class="songlistplay song-metadata">
				<span class="timestamp">${songDuration}</span>
				<i id="song-icon-${songID}" class="song-icon fa-regular songitemplay fa-circle-play fa-xl"></i>
			</span>
		</li>`;
	});
	element.innerHTML = htmlContent;
}
//Play Media
export function playPlayer() {
	if (AudioElement.paused || AudioElement.currentTime <= 0) {
		AudioElement.play();
		updateInterface();
		return true;
	} else {
		updateInterface();
		return false;
	}
}

//Pause Media
export function pausePlayer() {
	if (AudioElement.played && AudioElement.currentTime > 0) {
		AudioElement.pause();
		updateInterface();
		return true;
	} else {
		updateInterface();
		return false;
	}
}

//change all songs CSS to show as 'paused'
// export function resetList() {
// 	Array.from(document.getElementsByClassName('songitemplay')).forEach(
// 		(element) => {
// 			element.classList.remove('fa-circle-pause');
// 			element.classList.add('fa-circle-play');
// 		}
// 	);
// }

// //change the specific song's CSS from list to show as 'playing'
// export function showPlayingInList(songIndexIn) {
// 	resetList();
// 	let elem = document.getElementById(`song-icon-10${songIndexIn}`);
// 	elem.classList.remove('fa-circle-play');
// 	elem.classList.add('fa-circle-pause');
// }

//when master play button clicked
export function masterPlayAction() {
	if (!playPlayer()) {
		pausePlayer();
	}
	updateInterface();
}

//song clicked method
export function songAction(songIDIn) {
	let e = document.querySelector(`#song-icon-${songIDIn}`);
	//isAlreadyPlaying
	if (e.classList.contains('fa-circle-pause')) {
		pausePlayer();
	} else {
		pausePlayer();
		let indexIn = parseInt(songIDIn, 10);
		if (Player.currentSongIndex != indexIn) {
			Player.currentSongIndex = indexIn;
			let newSrc = songs_1[Player.currentSongIndex].filePath;
			AudioElement.src = newSrc;
			AudioElement.currentTime = 0;
			// ProgressBar.value = 0;
			// MasterSongName.innerText = songs_1[Player.currentSongIndex].song;
			// songDurationPassed.innerText =
			// 	songs_1[Player.currentSongIndex].duration;
		}
		playPlayer();
	}
	updateInterface();
}

export function replayCurrentSong() {
	pausePlayer();
	AudioElement.currentTime = 0;
	playPlayer();
}

//update audio source
// export function updateSong(indexIn) {
// 	if (Player.currentSongIndex != indexIn) {
// 		Player.currentSongIndex = indexIn;
// 		let newSrc = `songs/10${Player.currentSongIndex}.mp3`;
// 		AudioElement.src = newSrc;
// 		AudioElement.currentTime = 0;
// 		ProgressBar.value = 0;
// 		MasterSongName.innerText = songs_1[Player.currentSongIndex].song;
// 		songDurationPassed.innerText =
// 			songs_1[Player.currentSongIndex].duration;
// 	}
// }

//next button click actions
export function nextAction() {
	let tempIndex = Player.currentSongIndex;
	if (Player.repeatMode == 1) {
		replayCurrentSong();
		updateInterface();
		return;
	} else if (Player.repeatMode == 2 && tempIndex == songs_1.length - 1) {
		tempIndex = 0;
	} else if (tempIndex < songs_1.length - 1) {
		tempIndex += 1;
	} else {
		updateInterface();
		return;
	}
	// ProgressBar.value = 0;
	pausePlayer();
	songAction(tempIndex);
	playPlayer();

	updateInterface();
}

export function previousAction() {
	let tempIndex = Player.currentSongIndex;
	if (Player.repeatMode == 1) {
		replayCurrentSong();
		updateInterface();
		return;
	} else if (Player.repeatMode == 2 && tempIndex == 0) {
		tempIndex = songs_1.length - 1;
	} else if (tempIndex > 0) {
		tempIndex -= 1;
	} else {
		updateInterface();
		return;
	}
	// ProgressBar.value = 0;
	pausePlayer();
	songAction(tempIndex);
	playPlayer();

	updateInterface();
}

//toggle Repeat Mode to a specific mode
export function toggleRepeatTo(newRepeat) {
	Player.repeatMode = newRepeat % 3;
	updateInterface();
}

//toggle Repeat Mode
export function toggleRepeat() {
	toggleRepeatTo(Player.repeatMode + 1);
}

//Initial Data for player
export function addInitialData() {
	MasterSongName.innerHTML = songs_1[Player.currentSongIndex].song;
	songDurationPassed.innerText = songs_1[Player.currentSongIndex].duration;
}

export function updatePlayerBar() {
	const current_time = AudioElement.currentTime;
	const duration_time = AudioElement.duration;

	if (!isNaN(duration_time)) {
		const percentage = (current_time / duration_time) * 100;
		ProgressBar.style.width = percentage + '%';
	} else {
		ProgressBar.style.width = '0%';
	}
}

//disable an element (no click no hover)
export function disableItem(Item) {
	Item.classList.add('disabled');

	Item.classList.remove('active-item');
	Item.classList.add('inactive-item');

	Item.classList.remove('clickable');
	Item.classList.remove('clickable-text');
	Item.classList.remove('clickable-box');
}

//enable an element (clickable and hoverable)
export function enableItem(Item) {
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

//update content on page (that depend on state of the player)
export function updateInterface() {
	//MASTER PLAY BUTTON UPDATE
	if (AudioElement.paused) {
		MasterPlayButton.classList.remove('fa-pause-circle');
		MasterPlayButton.classList.add('fa-play-circle');
	} else {
		MasterPlayButton.classList.add('fa-pause-circle');
		MasterPlayButton.classList.remove('fa-play-circle');
	}

	//PREVIOUS BUTTON UPDATE
	if (Player.currentSongIndex == 0 && Player.repeatMode == 0) {
		disableItem(PreviousButton);
	} else {
		enableItem(PreviousButton);
	}
	//NEXT BUTTON UPDATE
	if (
		Player.currentSongIndex == songs_1.length - 1 &&
		Player.repeatMode == 0
	) {
		disableItem(NextButton);
	} else {
		enableItem(NextButton);
	}

	//REPEAT MODE ICON UPDATE
	if (Player.repeatMode == 0) {
		ToggleRepeatButton.classList.remove('active-item');
		ToggleRepeatButton.classList.add('inactive-item');
		ToggleRepeatButton.innerText = '';
	} else if (Player.repeatMode == 1 || Player.repeatMode == 2) {
		ToggleRepeatButton.classList.remove('inactive-item');
		ToggleRepeatButton.classList.add('active-item');
		if (Player.repeatMode == 1) {
			ToggleRepeatButton.innerText = '1';
		} else if (Player.repeatMode == 2) {
			ToggleRepeatButton.innerText = '';
		}
	} else {
		console.error('Error in Switching Repeat Mode.');
	}

	//SONG LIST UPDATE
	// console.log('Updating list...');
	Array.from(document.getElementsByClassName('songitemplay')).forEach(
		(element) => {
			const elemID =
				element.parentElement.parentElement.getAttribute('id');
			// console.log(elemID);
			// console.log(Player.currentSongIndex);
			if (
				!AudioElement.paused &&
				parseInt(elemID, 10) == Player.currentSongIndex
			) {
				element.classList.remove('fa-circle-play');
				element.classList.add('fa-circle-pause');
			} else {
				element.classList.remove('fa-circle-pause');
				element.classList.add('fa-circle-play');
			}
		}
	);

	//MASTER SONG INFO UPDATE
	MasterSongName.innerText = songs_1[Player.currentSongIndex].song;
	songDurationPassed.innerText = songs_1[Player.currentSongIndex].duration;
}
