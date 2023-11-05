<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- <link rel="stylesheet" href="./css/style.css"> -->
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');

        :root {
            --blackish: rgba(0, 0, 0, 0.5);
            --font-primary: whitesmoke;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            color: var(--font-primary);
            font-family: 'Varela Round', sans-serif;
            font-weight: 600;
        }

        body {
            object-fit: cover;
            background-color: var(--blackish);
            height: 100vh;
            width: 100vw;
        }

        /* =================================================================================== */

        a {
            text-decoration: none;
            color: var(--font-primary);
            width: 100%;
            height: 100%;
        }

        /* Works on Chrome, Edge, and Safari */
        *::-webkit-scrollbar {
            width: 12px;
        }

        *::-webkit-scrollbar-track {
            background: black;
        }

        *::-webkit-scrollbar-thumb {
            background-color: rgb(255, 255, 255, 0.1);
            border-radius: 20px;
            border: 3px solid black;
        }

        *::-webkit-scrollbar-thumb:hover {
            cursor: pointer;
            background-color: whitesmoke;
        }

        i:hover {
            text-shadow: 2px 2px 4px white;
        }

        /* =================================================================================== */

        .container {
            min-height: 65vh;
            display: flex;
            flex-direction: column;
            width: 100vw;
            border-radius: 12px;
        }

        .background {
            display: flex;
            position: absolute;
            z-index: -1;
            height: 100vh;
            width: 100vw;
        }

        .background>img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            backdrop-filter: contrast(50%);
        }

        nav {
            width: 100vw;
            height: 10vh;
            background-color: var(--blackish);
            display: flex;
            align-items: center;
        }

        nav ul {
            display: flex;
            align-items: center;
            list-style-type: none;
            height: 55px;
            color: white;
        }

        .nav-item {
            cursor: pointer;
            padding: 5px 12px;
        }

        .nav-item:hover {
            scale: 1.1;
            transition: scale 0.2s ease;
        }

        .brand>img {
            width: 44px;
            border-radius: 50%;
        }

        .brand {
            display: flex;
            align-items: center;
            font-weight: bolder;
            font-size: 1.3rem;
        }

        /* ---------------------------------------------------------------------------- */

        .mid-body {
            background-color: var(--blackish);
            width: 40vw;
            height: 66vh;
            padding: 20px;
            border-radius: 25px;
            margin-left: 40px;
            margin-top: 30px;
            overflow: scroll;
        }

        /* ---------------------------------------------------------------------------- */

        .songitem {
            display: flex;
            height: 50px;
            width: 100%;
            margin: 12px 0;

            background-color: rgb(0, 0, 0, 0.8);
            color: rgb(255, 255, 255);

            font-size: medium;

            justify-content: space-between;
            align-items: center;
            border-radius: 30px;
        }

        .song-li:hover {
            cursor: pointer;
            box-shadow: 0 0 5px 1px blue;
        }

        .songitem img {
            margin: 0 2px;
            width: 45px;
            border-radius: 50%;
        }

        .song-metadata {
            padding-right: 10px;
        }

        .song-metadata>i {
            cursor: pointer;
        }

        .bottom {
            color: white;
            background-color: rgb(0, 0, 0, 0.5);
            width: 100%;
            height: 17vh;
            position: fixed;
            bottom: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        #myprogressbar {
            width: 80vw;
            cursor: pointer;
        }

        .icons {
            margin-top: 15px;
        }

        .icons i {
            cursor: pointer;
            scale: 1.3;
            margin: 0 10px;
        }

        .songinfo {
            position: absolute;
            left: 10vw;
            font-family: 'Bricolage Grotesque', sans-serif;
        }

        .songinfo img {
            opacity: 0;
            transition: opacity 0.4s ease-in;
        }

        /* -------------------------------------- */

        .about-heading {
            font-size: xxx-large;
        }

        .about-para {
            padding: 5px 0px;
            font-size: larger;
            font-weight: 500;
        }

        .first-para {
            padding-top: 8px;
        }
    </style>
    <title>Musix | Your music buddy!</title>
</head>

<body>
    <div class="background">
        <img src="./media/background1.jpg" alt="">
    </div>

    <div class="container">
        <nav>
            <ul>
                <li class="brand nav-item"><img src="media/logo2.png" alt="Musix" title="Does nothing for now">Musix
                </li>
                <li class="nav-item" title="Does nothing for now">Explore</li>
                <li class="nav-item" title="Does nothing for now">Player</li>
                <li class="nav-item" title="Does nothing for now">About Us</li>
            </ul>
        </nav>
        <div class="mid-body">
            <ul class="songitemcontainer">
                <?php
                /* Connect to MySQL and select the database. */
                $connection = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD);

                if (mysqli_connect_errno()) echo "Failed to connect to MySQL: " . mysqli_connect_error();

                $database = mysqli_select_db($connection, DB_DATABASE);

                /* Ensure that the EMPLOYEES table exists. */
                //VerifySongsTable($connection, DB_DATABASE);


                $result = mysqli_query($connection, "SELECT * FROM SONGS");
                $count = 100;
                while ($query_data = mysqli_fetch_row($result)) {
                    $expression = "songAction('$count')";
                    echo "<li class='songitem song-li' onclick=\"$expression\">";
                    echo "<img alt='$count' src='./media/covers/$count.jpg'>",
                    "<span class='songname'>$query_data[1]</span>",
                    "<span class='songlistplay song-metadata'>",
                    "<span class='timestamp'>$query_data[2]</span>",
                    "<i id='$count' class='fa-regular songitemplay fa-circle-play fa-xl'></i>",
                    "</span>",
                    "</li>";

                    $count++;
                }
                mysqli_free_result($result);
                mysqli_close($connection);

                ?>
            </ul>
        </div>
    </div>
    <div class="bottom">
        <input type="range" name="range" id="myprogressbar" min="0" value="0" max="100">
        <div class="icons">
            <i class="fa-solid fa-backward fa-xl" id="previous" onclick="previousAction()"></i>
            <i class="fa-regular fa-circle-play fa-xl" id="masterplay" onclick="masterPlayAction()"></i>
            <i class="fa-solid fa-forward fa-xl" id="next" onclick="nextAction()"></i>
        </div>
        <div class="songinfo">
            <img src="./media/music.gif" width="55px" height="20px" id="gif"> <span id="mastersongname">Kantara</span>
        </div>
    </div>
    <script src="https://kit.fontawesome.com/c461deb085.js" crossorigin="anonymous"></script>
    <script>
        console.log('Welcome to Musix!');

        // Variables Initialization
        let songindex = 0; //stored index no of current song
        let audioElement = new Audio('songs/100.mp3'); //stores the current song
        let masterplay = document.getElementById('masterplay'); //the master play button
        let myprogressbar = document.getElementById('myprogressbar'); //song progress bar
        let gif = document.getElementById('gif'); //music play/pause visualizer
        let mastersongname = document.getElementById('mastersongname'); //current song name
        let playlist = '10'; //stores playlist no

        let songs_1 = [{
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

        //Play Pause methods
        function playPlayer() {
            if (audioElement.paused || audioElement.currentTime <= 0) {
                masterplay.classList.remove('fa-play-circle');
                masterplay.classList.add('fa-pause-circle');
                audioElement.play();
                gif.style.opacity = 1;
            }
        }

        function pausePlayer() {
            if (audioElement.played && audioElement.currentTime > 0) {
                audioElement.pause();
                masterplay.classList.remove('fa-pause-circle');
                masterplay.classList.add('fa-play-circle');
                gif.style.opacity = 0;
            }
        }

        function masterPlayAction() {
            if (audioElement.paused || audioElement.currentTime <= 0) {
                masterplay.classList.remove('fa-play-circle');
                masterplay.classList.add('fa-pause-circle');
                audioElement.play();
                gif.style.opacity = 1;

                pauseAll();
                let elem = document.getElementById('10' + songindex);
                elem.classList.remove('fa-circle-play');
                elem.classList.add('fa-circle-pause');
            } else {
                audioElement.pause();
                masterplay.classList.remove('fa-pause-circle');
                masterplay.classList.add('fa-play-circle');
                gif.style.opacity = 0;

                pauseAll();
                let elem = document.getElementById('10' + songindex);
                elem.classList.remove('fa-circle-pause');
                elem.classList.add('fa-circle-play');
            }
        }

        //Progress Bar Click Action
        myprogressbar.addEventListener('change', () => {
            audioElement.currentTime =
                (myprogressbar.value * audioElement.duration) / 100;
        });

        audioElement.addEventListener('timeupdate', function() {
            const current_time = audioElement.currentTime;
            const duration_time = audioElement.duration;

            if (!isNaN(duration_time)) {
                const percentage = current_time / duration_time / 100;
                myprogressbar.value = percentage;
            }
        });

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
                    myprogressbar.value = 0;
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

            myprogressbar.value = 0;
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

            myprogressbar.value = 0;
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
        window.onload = function() {
            console.log('Website fully loaded');
        };
    </script>
</body>

</html>