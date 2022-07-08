//Sends alert message on page redirect to apple music.
function sendAlert(track_href) {
    if(confirm("You are about to be redirected to Apple Music.")) {
        location = track_href;
        redirect = true;
    }
}

//Music Player from https://codepen.io/markhillard/pen/Hjcwu
jQuery(function ($) {
    'use strict'
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        // initialize plyr
        var player = new Plyr('#audio1', {
            controls: [
                'restart',
                'play',
                'progress',
                'current-time',
                'duration',
                'mute',
                'volume',
            ]
        });
        // initialize playlist and controls
        var index = 0,
            playing = false,
            mediaPath = 'music/',
            extension = '',
            tracks = [{
                "track": 1,
                "name": "Realize (Artist: KJ Kaliente)",
                "duration": "2:49",
                "file": "Realize_Khalil",
                "href": "https://music.apple.com/us/album/realize/1493853454?i=1493853578"
            }, {
                "track": 2,
                "name": "No Mo (Artist: KJ Kaleiente)",
                "duration": "2:47",
                "file": "NoMo_Khalil",
                "href": "https://music.apple.com/us/album/no-no/1495813101?i=1495813102"
            }];

        //Changes Album Image Depending on Index
        function setAlbumImg() {
            if (index == 0) {
                $('#album-img-index').attr("src", 'img/realize-img.jpg');
            } else {
                $('#album-img-index').attr("src", 'img/nomo-img.jpg');
            }
        }
        var buildPlaylist = $.each(tracks, function (key, value) {
                var trackNumber = value.track,
                    trackName = value.name,
                    trackDuration = value.duration,
                    track_href = value.href;
                if (trackNumber.toString().length === 1) {
                    trackNumber = '0' + trackNumber;
                }

                $('#plList').append(`<li> 
                    <div class="plItem"> 
                        <span class="plNum">${trackNumber}.</span> 
                        <span class="plTitle">${trackName}</span> 
                        <span class="plLength">${trackDuration}
                        <a href="#" id="apple_link" class="fab fa-apple" onclick='sendAlert("${track_href}")'></a></span> 
                    </div> 
                </li>`);

            }),
            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').on('play', function () {
                playing = true;
                npAction.text('Now Playing...');
            }).on('pause', function () {
                playing = false;
                npAction.text('Paused...');
            }).on('ended', function () {
                npAction.text('Paused...');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = $('#btnPrev').on('click', function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').on('click', function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plList li').on('click', function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(tracks[id].name);
                index = id;
                audio.src = mediaPath + tracks[id].file + extension;
                setAlbumImg();
            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();

            };
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    } else {
        // no audio support
        $('.column').addClass('hidden');
        var noSupport = $('#audio1').text();
        $('.container').append('<p class="no-support">' + noSupport + '</p>');
    }
});