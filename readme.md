# YouTube Remaining Time Extension

This is a simple browser extension that adds the remaining time of a YouTube video next to the current playback time. This helps you quickly determine how much time is left in the video you are watching.

## Installation

There are two ways you can install this extension:

### Chrome Web Store

This extension is available on the Chrome Web Store.

1. Navigate to the Chrome Web Store listing for this extension at [this placeholder link](https://chat.openai.com/?model=gpt-4#TBR).
2. Click on the "Add to Chrome" button.
3. Confirm the installation by clicking "Add extension" in the pop-up window.

_Please note that the link to the Chrome Web Store listing is a placeholder and will be updated upon release._

### Manual Installation

If you want to install this extension manually, follow these steps:

1. Download or clone this repository to your local machine.
2. Open the Extension Management page by navigating to `chrome://extensions` in your Chrome address bar.
3. Enable Developer Mode by clicking the toggle switch next to "Developer mode".
4. Click the "Load unpacked" button and select the extension directory (where you downloaded or cloned this repository to).

## How it Works

This extension works by using a content script that is injected into YouTube web pages. This content script finds the elements displaying the current time and total duration of the video, and adds a new element to display the remaining time.

The extension uses a MutationObserver to monitor changes to the current time, and updates the remaining time accordingly.

## Files

- `manifest.json` - The manifest file contains important information about the extension like its name, version, permissions it requires, and scripts it uses.
- `contentScript.js` - The main logic of the extension is contained within this script. It runs on every YouTube page and adds the remaining time display functionality.
