import throttle from "lodash.throttle";
// 2
const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

player.on('play', function() {
    console.log('played the video!');
});

player.getVideoTitle().then(function(title) {
    console.log('title:', title);
});

// 3
let timeUpdate = 0;
const onPlay = function(data) {
    console.log(data);
    // data is an object containing properties specific to that event

    timeUpdate = data.seconds;
    localStorage.setItem('videoplayer-current-time', timeUpdate);
};

player.on('timeupdate', throttle(onPlay, 1000));

// 5
const storageTime = localStorage.getItem('videoplayer-current-time');

player.setCurrentTime(storageTime).then(function(seconds) {
    // seconds = the actual time that the player seeked to
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
});