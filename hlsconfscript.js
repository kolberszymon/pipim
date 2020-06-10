var hls = "";
var parkourUrl = "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8";

function hlsInit() {
    if (Hls.isSupported()) {
        
        var video = document.getElementById('video');
        hls = new Hls();
        hls.loadSource(parkourUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function() {
            console.log("SIEMANO");
            hls.currentLevel = 0;
            var levels = hls.levels;
            for (i = 0; i < levels.length; i++) {
                appendButton(i, hls.levels[i].bitrate);
            }
            displayVideoInformation();
        });
    }
};

function appendButton(index, resolution) {
    $("#currentLevelControl").append('<button class="q' + index +'" type="button" onclick="changeQuality(this)" value=' + index + '>' + index + ' ' + resolution + ' bitrates</button>');
}

function changeQuality(button) {
    displayVideoInformation();
    hls.currentLevel = button.value;
    
}

function clearButtons() {
    $("#currentLevelControl").empty();
}

function displayVideoInformation() {
    var currentLevel = hls.currentLevel;
    
    if (currentLevel == -1) {
        $(".videoInformation").empty();
        $(".videoInformation").append('Video Information <br> Bitrate: auto <br> Choose properties to see full props');
    } else {
        var level = hls.levels[currentLevel];
        var bitrate = level.bitrate;
        var height = level.height;
        var width = level.width;
        var video_codec = level.audioCodec;
        var audio_codec = level.videoCodec;
        $(".videoInformation").empty();
        $(".videoInformation").append('Video Information <br> Bitrate: ' + bitrate + '<br> Height: ' + height + '<br> Width: ' + width + '<br> Video codec: ' + video_codec + '<br> Audio codec:' + audio_codec);
    }
    
    
}

function changeFilm(film_url) {
    if (Hls.isSupported()) {
        
        var video = document.getElementById('video');
        hls.destroy();
        hls = new Hls();
        hls.loadSource(film_url);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function() {
            clearButtons();
            var levels = hls.levels;
            for (i = 0; i < levels.length; i++) {
                appendButton(i, hls.levels[i].bitrate);
            }
            displayVideoInformation();
        });
    }
}

$(document).ready(function() {

    hlsInit();
    
    $("#films").change(function() {
        changeFilm(this.value);    
    });
    
});
