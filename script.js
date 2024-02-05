console.log("Welcome to spotify");

let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songIndex = 0;
let songs = [
    {songName:"Guitar beat" , filePath: "songs/1.mp3"},
    {songName:"Cill Music" , filePath: "songs/2.mp3"},
    {songName:"Relaxing" , filePath: "songs/3.mp3"},
    {songName:"Driving Mood" , filePath: "songs/4.mp3"},
    {songName:"Lofi Beats" , filePath: "songs/5.mp3"},
    {songName:"Refreshing" , filePath: "songs/6.mp3"},
];
 
songItems.forEach((element,i) => {
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
});

let audioElement = new Audio('songs/1.mp3');
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

audioElement.addEventListener('timeupdate', ()=>{
    progress = parseInt(audioElement.currentTime/audioElement.duration*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = songs[songIndex].filePath;   
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click',() =>{
    if(songIndex==5){
        songIndex=0;
    }
    else{
        songIndex++;
    }
    audioElement.src = songs[songIndex].filePath;   
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
document.getElementById('previous').addEventListener('click',() =>{
    if(songIndex==0){
        songIndex=5;
    }
    else{
        songIndex--;
    }
    audioElement.src = songs[songIndex].filePath;   
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})