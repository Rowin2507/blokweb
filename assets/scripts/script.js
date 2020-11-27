




document.getElementById("play-pause").onclick = function() {
    togglePlay();
};


var nowPlaying = document.getElementById("now-playing-mp3");
var nowPlayingPlayPause = document.getElementById("play-pause");
// var nowPlayingDuration = nowPlaying.duration;
// var nowPlayingDurationPercentage = (nowPlaying.duration / 100); 
// console.log(nowPlayingDurationPercentage);



// https://www.geeksforgeeks.org/create-a-music-player-using-javascript/


// PLAY / PAUSE BUTTON TOGGLE (MP3)
function togglePlay() {
    if (nowPlaying.paused) {
        nowPlaying.play();
        nowPlayingPlayPause.innerHTML = '<svg viewBox="0 0 24 24"><path d="M5 3h4v18H5V3zm10 0h4v18h-4V3z" fill="currentColor"></path></svg>';
    }
    else {
        nowPlaying.pause();
        nowPlayingPlayPause.innerHTML = '<svg viewBox="0 0 24 24"><path d="M4 21l15.589-9L4 3z" fill="currentColor"></path></svg>';
    }
};







// https://stackoverflow.com/questions/47561065/can-i-transition-the-volume-of-an-audio-element-using-javascript
// var myAudio = document.getElementsByTagName('audio')[0];
// var myAudioVolume = 1.0;
// var myAudioDuration;
// var myAudioPlayInterval;
// var myAudioCheckInterval;
// var myAudioDuration1Percent;
// var myAudioFadeStart = 30; // The percentage of playback before the fade starts


// setTimeout(function(){
//     myAudioDuration = myAudio.duration;
//     myAudioDuration1Percent = (myAudio.duration / 100); 
// }, 200);


// function myAudioFadeVolume() {

//     myAudioFader = setInterval(function(){
//         myAudioVolume = myAudio.volume;

//         myAudioVolume = myAudioVolume - (1 / myAudioFadeStart);
//         console.log('myAudio volume is now ' + myAudioVolume);
//         myAudio.volume = myAudioVolume;

//         if (myAudioVolume < 0.05) {
            
//             myAudio.volume = 0;
//             clearInterval(myAudioFader);
//         }

//     }, (myAudioDuration1Percent * 1000));
// }

// function myAudioFindFadeStart() {

//     myAudioCheckInterval = setInterval(function(){

//         if (myAudio.currentTime > (myAudioDuration1Percent * myAudioFadeStart)) {

//             myAudioFadeVolume();
//             clearInterval(myAudioCheckInterval);
//         }
//     }, 10);
// }

// setTimeout(function(){
//     myAudio.play();
//     myAudioFindFadeStart();
// }, 1500);