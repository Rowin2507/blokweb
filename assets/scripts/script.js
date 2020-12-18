var body = document.querySelector("body");

// CHECK IF BODY HAS CLASS (HOME)
if (body.classList.contains("home")) {
    // HEADER (HOME) FADE OUT ON SCROLL ----------------------
    // https://webdesign.tutsplus.com/tutorials/simple-fade-effect-on-scroll--cms-35166
    function headerHomeScroll() {
        var headerHome = document.querySelector("header");
        var main = document.querySelector("main");
        const checkpoint = 75;

        main.addEventListener("scroll", () => {
            const currentScroll = main.scrollTop;
            if (currentScroll <= checkpoint) {
                opacity = 1 - currentScroll / checkpoint;
                headerHome.classList.remove("hidden");
            } else {
                opacity = 0;
                headerHome.classList.add("hidden");
            }
            headerHome.style.opacity = opacity;
            // console.log("Scrolled in main: " + main.scrollTop + "px");
        });
    }
    headerHomeScroll();
 }



// CHECK IF BODY HAS CLASS (PLAYLIST) ----------------------
if (body.classList.contains("playlist")) {
    // HEADER (PLAYLIST) FADE IN ON SCROLL
    function headerPlaylistScroll() {
        var playlistTitleOffsetTop = document.querySelector("main section > h2").offsetTop;
        var headerPlaylist = document.querySelector("header");
        var main = document.querySelector("main");
        const checkpoint = playlistTitleOffsetTop - 55;

        main.addEventListener("scroll", () => {
            // FADE IN HEADER
            const currentScroll = main.scrollTop;
            if (currentScroll <= checkpoint) {
                headerPlaylist.classList.remove("scrolled");
            } else {
                headerPlaylist.classList.add("scrolled");
            }

            // FADE OUT SEARCH INPUT & BUTTON
            var playlistSearch = document.querySelector("body.playlist main section > section:nth-of-type(1)");
            var CoverArtOffsetTop = document.querySelector("body.playlist main section > img").offsetTop - 55;
            if (currentScroll <= CoverArtOffsetTop) {
                opacity = 1 - currentScroll / CoverArtOffsetTop;
            } else {
                opacity = 0;
            }
            playlistSearch.style.opacity = opacity;

            // MAKE PLAY BUTTON STICKY
            // var playlistSearch = document.querySelector("body.playlist main section > section:nth-of-type(1)");
            var PlayButton = document.querySelector("body.playlist main section > section:nth-of-type(2) > ul li:last-of-type");
            var PlayButtonOffsetTop = PlayButton.offsetTop;
            console.log(PlayButtonOffsetTop + " px");
            if (currentScroll <= PlayButtonOffsetTop - 48) {
                PlayButton.classList.remove("scrolled");
            } else {
                PlayButton.classList.add("scrolled");
            }
        });
    }
    headerPlaylistScroll();

    // SCROLL TO COVER ART 
    var CoverArtPlaylist = document.querySelector("body.playlist main section > section:nth-of-type(2)").scrollIntoView();

    
}



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
var nowPlayingAlbum = document.querySelector("footer .now-playing-overlay li.now-playing img");
function nowPlayingOverlayImage() {
    nowPlayingAlbum.scrollIntoView();
    // var nowPlayingBackgroundColor = nowPlayingAlbum.getAttribute("album-color"); // https://stackoverflow.com/questions/33760520/get-data-attributes-in-javascript-code
    // nowPlayingOverlay.style.backgroundColor = nowPlayingBackgroundColor;
    // console.log(nowPlayingBackgroundColor);
}
nowPlayingOverlayImage();

// NOW PLAYING OVERLAY SCROLL VALUES & FUNCTIONS
var viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
console.log("Viewport breedte: " + viewportWidth + "px");

var nowPlayingOverlayAlbumList = document.querySelector("footer .now-playing-overlay ol");
nowPlayingOverlayAlbumList.addEventListener("scroll", () => {
    var nowPlayingOverlayVisibleAlbumItem = (nowPlayingOverlayAlbumList.scrollLeft / viewportWidth) + 1;
    
    // CHECK IF SCROLL VALUE IS INTEGER
    if (nowPlayingOverlayVisibleAlbumItem % 1 === 0) { // https://stackoverflow.com/questions/14636536/how-to-check-if-a-variable-is-an-integer-in-javascript
        nowPlayingOverlayVisibleListItems = document.querySelectorAll("footer .now-playing-overlay ol li");
        nowPlayingOverlayVisibleListItem = document.querySelector("footer .now-playing-overlay ol li:nth-of-type(" + nowPlayingOverlayVisibleAlbumItem + ")");
        nowPlayingOverlayVisibleAlbum = document.querySelector("footer .now-playing-overlay ol li:nth-of-type(" + nowPlayingOverlayVisibleAlbumItem + ") img");
        
        // REMOVE & ADD CLASS TO ELEMENT(S)
        // https://stackoverflow.com/questions/46175432/add-active-class-to-current-element-with-js-not-jquery
        var nowPlayingOverlayActiveAlbum = document.querySelector('.now-playing');
        nowPlayingOverlayActiveAlbum.className = nowPlayingOverlayActiveAlbum.className.replace("now-playing", "");
        nowPlayingOverlayVisibleListItem.className += "now-playing";

        // CHANGE BG COLOR PER ALBUM
        var nowPlayingBackgroundColor = nowPlayingOverlayVisibleAlbum.getAttribute("album-color"); // https://stackoverflow.com/questions/33760520/get-data-attributes-in-javascript-code
        nowPlayingOverlay.style.backgroundColor = nowPlayingBackgroundColor;
        console.log("Kleur: " + nowPlayingBackgroundColor);
        console.log(nowPlayingOverlayVisibleAlbumItem);

        // ADD "NOW-PLAYING" CLASS TO LIST ITEM (CURRENT ALBUM)
        


        

        
        // var nowPlayingOverlayAlbums = document.querySelectorAll("footer .now-playing-overlay ol li");
        // for (var i = 0; i < nowPlayingOverlayAlbums.length; i++) {
        //     nowPlayingOverlayAlbums[i].addEventListener('click', function() {
        //       var selectedItem = document.querySelectorAll('.schedule-item.selected');
        //       selectedItem[0].className = selectedItem[0].className.replace(' selected', '');
        //       this.className += ' selected';
        //     });
        // }

        
    }
//   console.log("Scrolled album: " + nowPlayingOverlayAlbumList.scrollLeft + "px");
});


// https://stackoverflow.com/questions/14636536/how-to-check-if-a-variable-is-an-integer-in-javascript








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