console.log("Welcome to spotify clone");
//initialization
let songindex=0;
let audioElement = new Audio('songs/1.mp3');
let masterplay = document.getElementById('masterplay');
let myprogressbar= document.getElementById('myprogressbar');
let gif=document.getElementById('gif');
let mastersongname=document.getElementById('mastersongname');
let songitems=Array.from(document.getElementsByClassName('songitem'));

let songs = [
    { songname: "Kantara", filepath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songname: "Dil Nu", filepath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songname: "Tere Hawale", filepath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songname: "Kahani Suno", filepath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songname: "Heeriye", filepath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songname: "Udd ja kaale kawan", filepath: "songs/6.mp3", coverPath: "covers/6.jpg" },
   
]

songitems.forEach((element, i)=>{
    //console.log(element, i);
    element.getElementsByTagName("img")[0].src= songs[i].coverPath;
    element.getElementsByClassName("songname")[0].innerText=songs[i].songname;
})

//audioElement.play();
//handle play/pause
masterplay.addEventListener('click', ()=>{
    if(audioElement.paused|| audioElement.currentTime<=0)
    {
        audioElement.play();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterplay.classList.remove('fa-pause-circle');
        masterplay.classList.add('fa-play-circle');
        gif.style.opacity=0;
        
    }
})

//listen to events
audioElement.addEventListener('timeupdate', ()=>{
    
    //seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)* 100);
   
    myprogressbar.value=progress;
})

myprogressbar.addEventListener('change',()=>{
    // audioElement.currentTime=myprogressbar.value*audioElement.duration/100;
    audioElement.currentTime = myprogressbar.value * audioElement.duration/100;
})

const makeallplays=()=>{
    //e.target.classList.add('fa-circle-pause fa-xl');
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{

        element.classList.remove('fa-circle-pause fa-xl');
        element.classList.add('fa-circle-play fa-xl');
    })
}
Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        //console.log(e.target);
        makeallplays();
        songindex=parseInt(e.target.id);
        
        e.target.classList.remove('fa-circle-play fa-xl');
        e.target.classList.add('fa-circle-pause fa-xl');
        //audioElement.src ='songs/${index+1}.mp3';
        audioElement.src = `songs/${songindex+1}.mp3`;
        mastersongname.innerText=songs[songindex].songname;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterplay.classList.remove('fa-circle-play fa-xl');
        masterplay.classList.add('fa-circle-pause fa-xl');
    })

    
})

document.getElementById('next').addEventListener('click',()=>{
    if(songindex>=5){
        songindex=0;
    }
    else{
        songindex+=1;
    }
    audioElement.src = `songs/${songindex+1}.mp3`;
    mastersongname.innerText=songs[songindex].songname;
        audioElement.currentTime=0;
        audioElement.play();
        //gif.style.opacity=1;
        masterplay.classList.remove('fa-circle-play fa-xl');
        masterplay.classList.add('fa-circle-pause fa-xl');
    
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songindex<=0){
        songindex=0;
    }
    else{
        songindex-=1;
    }
    audioElement.src = `songs/${songindex+1}.mp3`;
    mastersongname.innerText=songs[songindex].songname;
        audioElement.currentTime=0;
        audioElement.play();
        //gif.style.opacity=1;
        masterplay.classList.remove('fa-circle-play fa-xl');
        masterplay.classList.add('fa-circle-pause fa-xl');
    
})