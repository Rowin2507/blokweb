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

    // PLAYLIST SHUFFLE BUTTON (HEADER)
    var playlistShuffleButton = document.querySelector("body.playlist main section > section:nth-of-type(2) > ul li:last-of-type button");
    playlistShuffleButton.addEventListener("click", nextTrack);
}



// NOW PLAYING BAR ----------------------
var nowPlayingBar = document.querySelector("footer .now-playing-bar");
window.addEventListener('load', function() {
    nowPlayingBar.classList.add("visible");
});


// NOW PLAYING OVERLAY TOGGLE - (DIS)APPEAR
var nowPlayingBarIMG = document.querySelector("footer .now-playing-bar-content img");
var nowPlayingBarSpan = document.querySelector("footer .now-playing-bar-content .now-playing-bar-info");
var nowPlayingOverlay = document.querySelector("footer .now-playing-overlay");
var nowPlayingOverlayClose = document.querySelector("footer .now-playing-overlay > ul li:first-of-type");
var footer = document.querySelector("footer");

nowPlayingBarIMG.addEventListener("click", nowPlayingToggleOverlay);
nowPlayingBarSpan.addEventListener("click", nowPlayingToggleOverlay);
nowPlayingOverlayClose.addEventListener("click", nowPlayingHideOverlay);

function nowPlayingToggleOverlay() {
    nowPlayingOverlay.classList.add("visible");
    footer.classList.add("hidden");
    // body.classList.add("overlay-visible");
}
function nowPlayingHideOverlay() {
    nowPlayingOverlay.classList.remove("visible");
    footer.classList.remove("hidden");
    // body.classList.remove("overlay-visible");
}

// NOW PLAYING OVERLAY TOGGLE - (DIS)APPEAR WITH ENTER KEY
// https://developer.mozilla.org/en-US/docs/Web/API/Document/keydown_event
nowPlayingBarSpan.addEventListener("keydown", event => {
    if (event.isComposing || event.keyCode === 13) {
        nowPlayingToggleOverlay();
        return;
    }
});
nowPlayingOverlayClose.addEventListener("keydown", event => {
    if (event.isComposing || event.keyCode === 13) {
        nowPlayingHideOverlay();
        return;
    }
});

// PLAY / PAUSE BUTTON TOGGLE (MP3)
var nowPlayingPlayPause = document.getElementById("play-pause");
nowPlayingPlayPause.addEventListener("click", playpauseTrack);



// NOW PLAYING OVERLAY ----------------------
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
        var nowPlayingOverlayActiveAlbum = document.querySelector('footer .now-playing-overlay ol li.now-playing');
        nowPlayingOverlayActiveAlbum.className = nowPlayingOverlayActiveAlbum.className.replace("now-playing", "");
        nowPlayingOverlayVisibleListItem.className += "now-playing";

    }
//   console.log("Scrolled album: " + nowPlayingOverlayAlbumList.scrollLeft + "px");
});



// MUSIC PLAYER (OVERLAY) ----------------------
// https://www.geeksforgeeks.org/create-a-music-player-using-javascript/
let track_name = document.querySelector("footer .now-playing-overlay > section h3");
let track_artist = document.querySelector("footer .now-playing-overlay > section p");
let playlistAlbums = document.querySelector("footer .now-playing-overlay ol");

let playpause_btn = document.querySelector("footer .now-playing-overlay > section ul li:nth-of-type(3) button");
let nextButton = document.querySelector("footer .now-playing-overlay > section ul li:nth-of-type(4) button");
let previousButton = document.querySelector("footer .now-playing-overlay > section ul li:nth-of-type(2) button");

let seek_slider = document.querySelector("footer .now-playing-overlay > section .now-playing-overlay-slider input[type=range]");
let seek_slider_before = document.querySelector("footer .now-playing-overlay > section .now-playing-overlay-slider div");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 1;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement('audio');
curr_track.volume = 0.5;

// Define the tracks that have to be played
let track_list = [
    {
    name: "Don't Stand So Close To Me",
    artist: "The Police",
    image: "./assets/images/albums/Zenyatta-Mondatta.jpeg",
    path: "./assets/songs/The_Police_-_Don't_Stand_So_Close_To_Me.mp3",
    color: "#C17B0C"
    },
    {
    name: "Nowhere To Go",
    artist: "Hayden James, NAATIONS",
    image: "./assets/images/albums/Between-Us.jpeg",
    path: "./assets/songs/Hayden_James_-_Nowhere_To_Go.mp3",
    color: "#0B2142"
    },
    {
    name: "Stayin' Alive - Serban Mix",
    artist: "Bee Gees",
    image: "./assets/images/albums/Saturday-Night-Fever.jpeg",
    path: "./assets/songs/Bee_Gees_-_Stayin’_Alive_-_Serban_Mix.mp3",
    color: "#1F7684"
    },
    {
    name: "get well soon",
    artist: "Ariana Grande",
    image: "./assets/images/albums/Sweetener.jpeg",
    path: "./assets/songs/Ariana_Grande_-_get_well_soon.mp3",
    color: "#BFA07F"
    },
    {
    name: "Work from Home",
    artist: "Fifth Harmony, Ty Dolla $ign",
    image: "./assets/images/albums/7:27-deluxe.jpeg",
    path: "./assets/songs/Fifth Harmony_-_Work_from_Home.mp3",
    color: "#1C86B5"
    },
    {
    name: "Take My Breath Away",
    artist: "Berlin",
    image: "./assets/images/albums/Take-My-Breath-Away.jpeg",
    path: "./assets/songs/Berlin_-_Take_My_Breath_Away.mp3",
    color: "#D8192F"
    },
    {
    name: "SICKO MODE",
    artist: "Travis Scott",
    image: "./assets/images/albums/ASTROWORLD.jpeg",
    path: "./assets/songs/Travis_Scott_-_SICKO_MODE.mp3",
    color: "#562F0C"
    },
    {
    name: "You Sound Like You're Sick",
    artist: "Ramones",
    image: "./assets/images/albums/Pleasant-Dreams.jpeg",
    path: "./assets/songs/Ramones_-_You_Sound_Like_Youre_Sick.mp3",
    color: "#C40000"
    },
    {
    name: "In My Room",
    artist: "Frank Ocean",
    image: "./assets/images/albums/In-My-Room.jpeg",
    path: "./assets/songs/Frank_Ocean_-_In_My_Room.mp3",
    color: "#0299C1"
    },
    {
    name: "Supalonely",
    artist: "BENEE, Gus Dapperton",
    image: "./assets/images/albums/STELLA-&-STEVE.jpeg",
    path: "./assets/songs/BENEE_-_Supalonely.mp3",
    color: "#6B7F49"
    },
    {
    name: "Mask Off",
    artist: "Future",
    image: "./assets/images/albums/FUTURE.jpeg",
    path: "./assets/songs/Future_-_Mask_Off.mp3",
    color: "#C1A52F"
    },
    {
    name: "Unnatural Selection",
    artist: "Muse",
    image: "./assets/images/albums/The-Resistance.jpeg",
    path: "./assets/songs/Muse_-_Unnatural_Selection.mp3",
    color: "#BF8530"
    },
    {
    name: "Harder To Breathe",
    artist: "Maroon 5",
    image: "./assets/images/albums/Songs-About-Jane.jpeg",
    path: "./assets/songs/Maroon5_-_Harder_To_Breathe.mp3",
    color: "#890909"
    },
    {
    name: "Die Young",
    artist: "Kesha",
    image: "./assets/images/albums/Warrior.jpeg",
    path: "./assets/songs/Kesha_-_Die_Young.mp3",
    color: "#962929"
    },
    {
    name: "Still Breathing",
    artist: "Green Day",
    image: "./assets/images/albums/Revolution-Radio.jpeg",
    path: "./assets/songs/Green_Day_-_Still_Breathing.mp3",
    color: "#A34B0F"
    },
    {
    name: "Dead",
    artist: "Madison Beer",
    image: "./assets/images/albums/As-She-Pleases.jpeg",
    path: "./assets/songs/Madison_Beer_-_Dead.mp3",
    color: "#846973"
    }
];

// CREATE ALBUMS (IMG) IN OVERLAY
function loadAlbums(track_index) {

    for (var i = 0; i < track_list.length; i++) {
        // OVERLAY - DEFINE ELEMENT (ALBUM)
        // https://stackoverflow.com/questions/12622465/creating-a-div-element-inside-a-div-element-in-javascript
        var overlayAlbum = document.createElement("li");
        var overlayAlbumImg = document.createElement("img");
        overlayAlbum.setAttribute("album-order", (i + 1));
        overlayAlbumImg.src = track_list[i].image; 
        overlayAlbumImg.alt = track_list[i].name + " - " + track_list[i].artist; 
        
        // OVERLAY - SCROLL TO ACTIVE ALBUM
        overlayAlbumAttribute = overlayAlbum.getAttribute("album-order");
        console.log(overlayAlbumAttribute);
        if (overlayAlbumAttribute == 2) {
            overlayAlbum.classList.add("now-playing");
        }

        // OVERLAY - CREATE ELEMENTS (ALBUMS)
        playlistAlbums.appendChild(overlayAlbum);
        overlayAlbum.appendChild(overlayAlbumImg);
    }

    // SCROLL TO ACTIVE ALBUM & SONG
    var overlayAlbumPlaying = document.querySelector("footer .now-playing-overlay li.now-playing");
    setTimeout(function() {
        // https://stackoverflow.com/questions/68165/javascript-to-scroll-long-page-to-div
        overlayAlbumPlaying.scrollIntoView();
    }, 500);
}
loadAlbums(track_index);

function loadTrack(track_index) {
    clearInterval(updateTimer);
    resetValues();

    // Load a new track
    curr_track.src = track_list[track_index].path;
    curr_track.load();

    // Update details of the track
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;

    // APPLY BACKGROUND COLOR
    nowPlayingOverlay.style.backgroundColor = track_list[track_index].color;
    console.log("Overlay-color: " + track_list[track_index].color);

    // Set an interval of 1000 milliseconds for updating the seek slider
    updateTimer = setInterval(seekUpdate, 1000);

    // NOW PLAYING BAR - CHANGE CURRENT SONG INFO
    var nowPlayingBarH5 = document.querySelector("footer .now-playing-bar-content .now-playing-bar-info h5");
    var nowPlayingBarP = document.querySelector("footer .now-playing-bar-content .now-playing-bar-info p");
    var nowPlayingBarImg = document.querySelector("footer .now-playing-bar-content img");
    nowPlayingBarH5.textContent = track_list[track_index].name;
    nowPlayingBarP.textContent = track_list[track_index].artist;
    nowPlayingBarImg.src = track_list[track_index].image; 
    nowPlayingBarImg.alt = track_list[track_index].name + " - " + track_list[track_index].artist; 

    // Move to the next track if the current one finishes playing
    curr_track.addEventListener("ended", nextTrack);

}

// Reset Values
function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
    seek_slider_before.style.width = "0%";
}

function playpauseTrack() {
    if (!isPlaying) playTrack();
    else pauseTrack();
}

function playTrack() {
    curr_track.play();
    isPlaying = true;
    
    playpause_btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 111.87 111.87"><defs><style>.cls-1{fill:#fff;}</style></defs><g id="Laag_2" data-name="Laag 2"><g id="Laag_1-2" data-name="Laag 1"><path class="cls-1" d="M55.94,0a55.94,55.94,0,1,0,55.93,55.94A55.93,55.93,0,0,0,55.94,0ZM48.87,74.69a1.75,1.75,0,0,1-1.75,1.75h-6.6a1.75,1.75,0,0,1-1.75-1.75V37.92a1.75,1.75,0,0,1,1.75-1.75h6.6a1.75,1.75,0,0,1,1.75,1.75Zm24.23,0a1.75,1.75,0,0,1-1.75,1.75h-6.6A1.75,1.75,0,0,1,63,74.69V37.92a1.75,1.75,0,0,1,1.75-1.75h6.6a1.75,1.75,0,0,1,1.75,1.75Z"/></g></g></svg>';
    nowPlayingPlayPause.innerHTML = '<svg viewBox="0 0 24 24"><path d="M5 3h4v18H5V3zm10 0h4v18h-4V3z" fill="currentColor"></path></svg>';
    document.querySelector("footer .now-playing-bar-content ul li:nth-of-type(3) button").innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 111.87 111.87"><defs><style>.cls-1{fill:#fff;}</style></defs><g id="Laag_2" data-name="Laag 2"><g id="Laag_1-2" data-name="Laag 1"><path class="cls-1" d="M55.94,0a55.94,55.94,0,1,0,55.93,55.94A55.93,55.93,0,0,0,55.94,0ZM48.87,74.69a1.75,1.75,0,0,1-1.75,1.75h-6.6a1.75,1.75,0,0,1-1.75-1.75V37.92a1.75,1.75,0,0,1,1.75-1.75h6.6a1.75,1.75,0,0,1,1.75,1.75Zm24.23,0a1.75,1.75,0,0,1-1.75,1.75h-6.6A1.75,1.75,0,0,1,63,74.69V37.92a1.75,1.75,0,0,1,1.75-1.75h6.6a1.75,1.75,0,0,1,1.75,1.75Z"/></g></g></svg>';
    console.log("Hudig album: " + track_index);
}

function pauseTrack() {
    curr_track.pause();
    isPlaying = false;

    playpause_btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 111.87 111.87"><defs><style>.cls-1{fill:#fff;}</style></defs><g id="Laag_2" data-name="Laag 2"><g id="Laag_1-2" data-name="Laag 1"><path class="cls-1" d="M55.94,0a55.94,55.94,0,1,0,55.93,55.94A55.93,55.93,0,0,0,55.94,0ZM75.71,57.51,44.87,75.34a1.82,1.82,0,0,1-2.73-1.58V38.11a1.82,1.82,0,0,1,2.73-1.58L75.71,54.36A1.82,1.82,0,0,1,75.71,57.51Z"/></g></g></svg>';
    nowPlayingPlayPause.innerHTML = '<svg viewBox="0 0 24 24"><path d="M4 21l15.589-9L4 3z" fill="currentColor"></path></svg>';
    document.querySelector("footer .now-playing-bar-content ul li:nth-of-type(3) button").innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 111.87 111.87"><defs><style>.cls-1{fill:#fff;}</style></defs><g id="Laag_2" data-name="Laag 2"><g id="Laag_1-2" data-name="Laag 1"><path class="cls-1" d="M55.94,0a55.94,55.94,0,1,0,55.93,55.94A55.93,55.93,0,0,0,55.94,0ZM75.71,57.51,44.87,75.34a1.82,1.82,0,0,1-2.73-1.58V38.11a1.82,1.82,0,0,1,2.73-1.58L75.71,54.36A1.82,1.82,0,0,1,75.71,57.51Z"/></g></g></svg>';
}

function nextTrack() {
    if (track_index < track_list.length - 1) {
        track_index += 1;
        // SHOW ACTIVE ALBUM (SCROLL)
        playlistAlbums.scrollLeft += viewportWidth;
    }
    else {
        track_index = 1;
        // nextButton.disabled = true;
    }
    loadTrack(track_index);
    playTrack();
}

function prevTrack() {
    if (track_index > 0) {
        track_index -= 1;
        // SHOW ACTIVE ALBUM (SCROLL)
        playlistAlbums.scrollLeft -= viewportWidth;
    }
    else {
        track_index = track_list.length;
        // previousButton.disabled = true;
    }
    loadTrack(track_index);
    playTrack();
}

function seekTo() {
    seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}

function setVolume() {
    curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
    let seekPosition = 0;

    // Check if the current track duration is a legible number
    if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;

    // Calculate the time left and the total duration
    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    // Adding a zero to the single digit time values
    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }

    // PROGRESS BAR WIDTH
    seek_slider_before.style.width = seekPosition + "%"; 
    var nowPlayingBarLine = document.querySelector("footer .now-playing-bar.visible .now-playing-bar-progress div");
    nowPlayingBarLine.style.width = seekPosition + "%"; 
    var nowPlayingBarSlider = document.querySelector("footer .now-playing-bar-content .now-playing-bar-controls > span > span");
    nowPlayingBarSlider.style.width = seekPosition + "%"; 
}

// Load the first track in the tracklist
loadTrack(track_index);

// PLAY TOGGLE WITH ENTER KEY (ON FOCUS PROGRESS BAR)
// https://developer.mozilla.org/en-US/docs/Web/API/Document/keydown_event
seek_slider.addEventListener("keydown", event => {
    if (event.isComposing || event.keyCode === 13) {
        playpauseTrack();
        return;
    }
});

// OVERLAY CONTROL BUTTONS
var overlayButtonPlayPause = document.querySelector("footer .now-playing-overlay > section ul li:nth-of-type(3) button");
var overlayButtonPrevious = document.querySelector("footer .now-playing-overlay > section ul li:nth-of-type(2) button");
var overlayButtonNext = document.querySelector("footer .now-playing-overlay > section ul li:nth-of-type(4) button");
var overlayButtonSeek = document.querySelector("footer .now-playing-overlay > section .now-playing-overlay-slider input[type='range']");
overlayButtonPlayPause.addEventListener("click", playpauseTrack);
overlayButtonPrevious.addEventListener("click", prevTrack);
overlayButtonNext.addEventListener("click", nextTrack);
overlayButtonSeek.addEventListener("change", seekTo);

// NOW PLAYING BAR CONTROL BUTTONS (TABLET AND LARGER)
var nowPlayingBarButtonPlayPause = document.querySelector("footer .now-playing-bar-content ul li:nth-of-type(3) button");
var nowPlayingBarButtonPrevious = document.querySelector("footer .now-playing-bar-content ul li:nth-of-type(2) button");
var nowPlayingBarButtonNext = document.querySelector("footer .now-playing-bar-content ul li:nth-of-type(4) button");
nowPlayingBarButtonPlayPause.addEventListener("click", playpauseTrack);
nowPlayingBarButtonPrevious.addEventListener("click", prevTrack);
nowPlayingBarButtonNext.addEventListener("click", nextTrack);
