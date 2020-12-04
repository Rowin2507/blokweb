// HEADER FADE OUT ON SCROLL ----------------------
// https://webdesign.tutsplus.com/tutorials/simple-fade-effect-on-scroll--cms-35166
var header = document.querySelector("header");
var main = document.querySelector("main");
const checkpoint = 75;

main.addEventListener("scroll", () => {
  const currentScroll = main.scrollTop;
  if (currentScroll <= checkpoint) {
    opacity = 1 - currentScroll / checkpoint;
    header.classList.remove("hidden");
  } else {
    opacity = 0;
    header.classList.add("hidden");
  }
  header.style.opacity = opacity;
  console.log("Scrolled in main: " + main.scrollTop + "px");
});



// NOW PLAYING BAR ----------------------
var nowPlayingBar = document.querySelector("footer .now-playing-bar");
window.addEventListener('load', function() {
    nowPlayingBar.classList.add("visible");
});

// SCROLL TO ACTIVE SONG INFORMATION (NOW PLAYING)
// https://stackoverflow.com/questions/68165/javascript-to-scroll-long-page-to-div
document.querySelector('footer .now-playing-bar-info li.current-song').scrollIntoView();

// NOW PLAYING OVERLAY TOGGLE - (DIS)APPEAR
var nowPlayingBarIMG = document.querySelector("footer .now-playing-bar-content img");
var nowPlayingBarUL = document.querySelector("footer .now-playing-bar-content ul");
var nowPlayingOverlay = document.querySelector("footer .now-playing-overlay");
var nowPlayingOverlayClose = document.querySelector("footer .now-playing-overlay > ul li:first-of-type");
var footer = document.querySelector("footer");

nowPlayingBarIMG.addEventListener("click", nowPlayingToggleOverlay);
nowPlayingBarUL.addEventListener("click", nowPlayingToggleOverlay);
nowPlayingOverlayClose.addEventListener("click", nowPlayingHideOverlay);

function nowPlayingToggleOverlay() {
    nowPlayingOverlay.classList.add("visible");
    footer.classList.add("hidden");
}
function nowPlayingHideOverlay() {
    nowPlayingOverlay.classList.remove("visible");
    footer.classList.remove("hidden");
}

// PLAY / PAUSE BUTTON TOGGLE (MP3)
var nowPlayingPlayPause = document.getElementById("play-pause");
nowPlayingPlayPause.addEventListener("click", togglePlay);

var nowPlayingSong = document.getElementById("now-playing-mp3");
nowPlayingSong.volume = 0.5;
var nowPlayingPlayPause = document.getElementById("play-pause");

function togglePlay() {
    if (nowPlayingSong.paused) {
        nowPlayingSong.play();
        nowPlayingPlayPause.innerHTML = '<svg viewBox="0 0 24 24"><path d="M5 3h4v18H5V3zm10 0h4v18h-4V3z" fill="currentColor"></path></svg>';
    }
    else {
        nowPlayingSong.pause();
        nowPlayingPlayPause.innerHTML = '<svg viewBox="0 0 24 24"><path d="M4 21l15.589-9L4 3z" fill="currentColor"></path></svg>';
    }
};



// NOW PLAYING OVERLAY ----------------------

// NOW PLAYING OVERLAY ALBUM BG-COLOR
var nowPlayingOverlay = document.querySelector("footer .now-playing-overlay");
var nowPlayingAlbum = document.querySelector("footer .now-playing-overlay img.active-album");
function nowPlayingOverlayImage() {
    var nowPlayingBackgroundColor = nowPlayingAlbum.getAttribute("album-color"); // https://stackoverflow.com/questions/33760520/get-data-attributes-in-javascript-code
    nowPlayingOverlay.style.backgroundColor = nowPlayingBackgroundColor;
    console.log(nowPlayingBackgroundColor);
}
nowPlayingOverlayImage();











// // GEST MOST DOMINANT COLOR OF IMAGE
// var rgb = getAverageRGB(document.getElementById('test'));
// document.body.style.backgroundColor = 'rgb('+rgb.r+','+rgb.g+','+rgb.b+')';

// function getAverageRGB(imgEl) {

// var blockSize = 5, // only visit every 5 pixels
//     defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
//     canvas = document.createElement('canvas'),
//     context = canvas.getContext && canvas.getContext('2d'),
//     data, width, height,
//     i = -4,
//     length,
//     rgb = {r:0,g:0,b:0},
//     count = 0;
    
// if (!context) {
//     return defaultRGB;
// }

// height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
// width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

// context.drawImage(imgEl, 0, 0);

// try {
//     data = context.getImageData(0, 0, width, height);
// } catch(e) {
//     /* security error, img on diff domain */alert('x');
//     return defaultRGB;
// }

// length = data.data.length;

// while ( (i += blockSize * 4) < length ) {
//     ++count;
//     rgb.r += data.data[i];
//     rgb.g += data.data[i+1];
//     rgb.b += data.data[i+2];
// }

// // ~~ used to floor values
// rgb.r = ~~(rgb.r/count);
// rgb.g = ~~(rgb.g/count);
// rgb.b = ~~(rgb.b/count);

// console.log(test);
// return rgb;

// }





















// ...
// function getCarouselPositions() {
//     carouselPositions = [];
//     document.querySelectorAll('footer .now-playing-bar-info li').forEach(function(div) {
//       carouselPositions.push([div.offsetLeft, div.offsetLeft + div.offsetWidth]); // add to array the positions information
//     })
//     halfContainer = document.querySelector('#container').offsetWidth/2;
//     console.log(halfContainer);
//   }
  
//   getCarouselPositions(); // call it once









// var nowPlayingDuration = nowPlaying.duration;
// var nowPlayingDurationPercentage = (nowPlaying.duration / 100); 
// console.log(nowPlayingDurationPercentage);



// https://www.geeksforgeeks.org/create-a-music-player-using-javascript/










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