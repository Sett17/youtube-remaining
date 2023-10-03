function waitForElement(selector, callback) {
    if (document.querySelector(selector)) {
        callback();
    } else {
        setTimeout(() => {
            waitForElement(selector, callback);
        }, 500);
    }
}

function durationToSeconds(duration) {
    const parts = duration.split(':').map(part => parseInt(part, 10));
    let seconds = 0;

    if (parts.length === 3) {
        seconds += parts[0] * 3600;
        seconds += parts[1] * 60;
        seconds += parts[2];
    } else if (parts.length === 2) {
        seconds += parts[0] * 60;
        seconds += parts[1];
    }

    return seconds;
}

function secondsToDuration(seconds) {
    seconds = Math.floor(seconds);
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    let duration = "";

    if (hrs > 0) {
        duration += String(hrs).padStart(2, '0') + ":";
    }

    duration += String(mins).padStart(2, '0') + ":";
    duration += String(secs).padStart(2, '0');

    return duration;
}

waitForElement('.ytp-time-current', () => {
    const currentTimeElement = document.querySelector('.ytp-time-current');
    const durationElement = document.querySelector('.ytp-time-duration');
    const videoElement = document.querySelector('video');

    const parentElement = currentTimeElement.parentElement;

    const newSeparator = document.createElement('span');
    newSeparator.classList.add('ytp-time-separator');
    newSeparator.textContent = ' / ';

    const remainingTimeElement = document.createElement('span');
    remainingTimeElement.classList.add('ytp-time-remaining');
    remainingTimeElement.textContent = '-' + durationElement.textContent;

    parentElement.appendChild(newSeparator);
    parentElement.appendChild(remainingTimeElement);

    const onChangeFunction = function() {
        const totalDuration = durationToSeconds(durationElement.textContent);
        const currentTime = durationToSeconds(currentTimeElement.textContent);
        let remainingTime = totalDuration - currentTime;

        remainingTime /= videoElement.playbackRate; 

        remainingTimeElement.textContent = '-' + secondsToDuration(remainingTime);

        if (videoElement.playbackRate !== 1) {
            remainingTimeElement.textContent += ` (x${videoElement.playbackRate})`
        }
    };

    const observer = new MutationObserver(onChangeFunction);
    observer.observe(currentTimeElement, { childList: true, characterData: true, subtree: true });

    videoElement.addEventListener('ratechange', onChangeFunction);
})
