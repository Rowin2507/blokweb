




document.getElementById("play-pause").onclick = function() {
    togglePlay();
};


var nowPlaying = document.getElementById("now-playing-mp3");
// var nowPlayingDuration = nowPlaying.duration;
// var nowPlayingDurationPercentage = (nowPlaying.duration / 100); 
// console.log(nowPlayingDurationPercentage);



// https://www.geeksforgeeks.org/create-a-music-player-using-javascript/


// PLAY / PAUSE BUTTON TOGGLE (MP3)
function togglePlay() {
    if (nowPlaying.paused) {
        nowPlaying.play();
    }
    else {
        nowPlaying.pause();
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