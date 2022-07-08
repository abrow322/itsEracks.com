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
            page = window.location.pathname.split("/").pop(),
            tracks = [{
                "track": 1,
                "name": "Halloween",
                "duration": "BPM: 75",
                "file": "halloween_trimmed",
                "id": "beat1"
            }, {
                "track": 2,
                "name": "Hisoka",
                "duration": "BPM: 140",
                "file": "hisoka_trimmed",
                "id": "beat2"
            }, {
                "track": 3,
                "name": "Love Hurts",
                "duration": "BPM: 70",
                "file": "ian_dior_trimmed",
                "id": "beat3"
            }, {
                "track": 4,
                "name": "Inspire Me",
                "duration": "BPM: 123",
                "file": "Inspire_ME_123bpm",
                "id": "beat4"
            }, {
                "track": 5,
                "name": "STOOPID",
                "duration": "BPM: 150",
                "file": "STOOPID_150bpm",
                "id": "beat5"
            }, {
                "track": 6,
                "name": "Horizon",
                "duration": "BPM: 140",
                "file": "Horizon_140bpm",
                "id": "beat6"
            }];


        //Changes Album Image Depending on Index
        function setAlbumImg() {
            switch (index) {
                case 0:
                    $('#album-img-previews').attr("src", 'img/cat.jpg');
                    break;
                case 1:
                    $('#album-img-previews').attr("src", 'img/hisoka.jpg');
                    break;
                case 2:
                    $('#album-img-previews').attr("src", 'img/heart.jpg');
                    break;
                case 3:
                    $('#album-img-previews').attr("src", 'img/sky.jpg');
                    break;
                case 4:
                    $('#album-img-previews').attr("src", 'img/stoopid.jpg');
                    break;
                case 5:
                    $('#album-img-previews').attr("src", 'img/horizon.jpg');
                    break;

            }
        }

        var buildPlaylist = $.each(tracks, function (key, value) {
                var trackNumber = value.track,
                    trackName = value.name,
                    trackDuration = value.duration,
                    track_id = value.id;
                if (trackNumber.toString().length === 1) {
                    trackNumber = '0' + trackNumber;
                }

                $('#plList').append('<li> \
                   <div class="plItem"> \
                       <span class="plNum">' + trackNumber + '.</span> \
                       <span class="plTitle">' + trackName + '</span> \
                       <span class="plLength">' + trackDuration + ' \
                       <a href="#" id=' + track_id + ' class="fas fa-envelope-open-text"></a></span> \
                   </div> \
                </li>');

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

//onclick redirects to contact page, changing the href to selected beat
$(function () {
    $('#beat1').on("click", function () {
        window.location.href = "contact.html?beat1";
    });
    $('#beat2').on("click", function () {
        window.location.href = "contact.html?beat2";
    });
    $('#beat3').on("click", function () {
        window.location.href = "contact.html?beat3";
    });
    $('#beat4').on("click", function () {
        window.location.href = "contact.html?beat4";
    });
    $('#beat5').on("click", function () {
        window.location.href = "contact.html?beat5";
    });
    $('#beat6').on("click", function () {
        window.location.href = "contact.html?beat6";
    });
});