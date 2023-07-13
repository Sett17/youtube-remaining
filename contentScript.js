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
        // Format: hh:mm:ss
        seconds += parts[0] * 3600; // hours
        seconds += parts[1] * 60; // minutes
        seconds += parts[2]; // seconds
    } else if (parts.length === 2) {
        // Format: mm:ss
        seconds += parts[0] * 60; // minutes
        seconds += parts[1]; // seconds
    }

    return seconds;
}

function secondsToDuration(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    let duration = "";

    if (hrs > 0) {
        // Pad to 2 digits
        duration += String(hrs).padStart(2, '0') + ":";
    }

    // Pad to 2 digits
    duration += String(mins).padStart(2, '0') + ":";
    duration += String(secs).padStart(2, '0');

    return duration;
}

waitForElement('.ytp-time-current', () => {
    // Select the elements
    const currentTimeElement = document.querySelector('.ytp-time-current');
    const timeSeparatorElement = document.querySelector('.ytp-time-separator');
    const durationElement = document.querySelector('.ytp-time-duration');

    // Get the parent of one of the elements (as they share the same parent)
    const parentElement = currentTimeElement.parentElement;

    // Create new separator and remaining time span
    const newSeparator = document.createElement('span');
    newSeparator.classList.add('ytp-time-separator');
    newSeparator.textContent = ' / ';

    const remainingTimeElement = document.createElement('span');
    remainingTimeElement.classList.add('ytp-time-remaining');
    remainingTimeElement.textContent = '-' + durationElement.textContent; // Initialize with full duration

    // Insert new elements into the DOM
    parentElement.appendChild(newSeparator);
    parentElement.appendChild(remainingTimeElement);

    // Create a MutationObserver to watch for changes in the textContent of currentTimeElement
    const observer = new MutationObserver(() => {
        // Calculate remaining time
        const totalDuration = durationToSeconds(durationElement.textContent);
        const currentTime = durationToSeconds(currentTimeElement.textContent);
        const remainingTime = totalDuration - currentTime;

        // Update remaining time element
        remainingTimeElement.textContent = '-' + secondsToDuration(remainingTime);
    });

    // Start observing currentTimeElement
    observer.observe(currentTimeElement, { childList: true, characterData: true, subtree: true });
})
