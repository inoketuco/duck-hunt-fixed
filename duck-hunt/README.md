# Shoot the Duck to Win!

A browser-based Duck Hunt game controlled with hand tracking. MediaPipe Hands
detects the player's hand through the webcam and turns a finger-gun pose into
an arcade-style on-screen blaster.

## Features

- Hand-controlled aiming with the index finger.
- Thumb-down trigger: lower the thumb to fire once, then lift it to reload.
- Muzzle-aligned bullet trail and hit-impact animation.
- Animated duck with wings, movement, hit animation, and defeat sound.
- Animated bomb obstacles with fuses and warning pulses.
- Easy, Medium, and Hard difficulty levels.
- Difficulty changes duck speed and obstacle population:
	- Easy: slow duck and 3 obstacles.
	- Medium: normal duck and 6 obstacles.
	- Hard: fast duck and 9 obstacles.
- Four game modes:
	- Classic: shoot ducks without obstacles.
	- Obstacle: shoot ducks while avoiding penalty bombs.
	- Timed: score for 60 seconds with obstacles.
	- Practice: visible bombs are harmless; there is no timer or obstacle penalty.
- Three-second countdown before every round.
- Current score and persistent best score.
- Synthesized gunfire, duck defeat sound, and quiet background ambience.
- No build step or package installation is required.

## Controls

1. Allow camera access when the browser asks.
2. Aim by pointing your index finger.
3. Make the relaxed finger-gun pose.
4. Move your thumb down to fire one shot.
5. Lift your thumb to reload before firing again.

### Hands-free selection

- Pinch the thumb and index finger together in the upper half of the screen to
	select a game mode.
- Move left or right across the mode bar and hold briefly to confirm.
- Pinch in the lower half of the screen to select difficulty.
- Release the pinch before playing.

## Scoring

- Duck hit: `+10` points.
- Bomb hit: `-5` points in Obstacle and Timed modes.
- Score cannot go below zero.
- The best score is stored in browser `localStorage` on that device and browser.

## Running locally

From this folder, start any static web server. For example:

```text
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/index.html
```

Localhost is allowed to use the webcam without HTTPS.

## Deployment

Deploy the contents of this folder, including:

- `index.html`
- `fingerGunClassifier.js`
- The complete `mediapipe-hands` folder

The `mediapipe-hands` folder must retain all of its JavaScript, WebAssembly,
model, graph, and data files. Do not upload only `hands.js`.

The deployed site must use HTTPS because browsers require a secure origin for
webcam access. No build command is needed.

For Netlify, use this folder as the publish directory. For GitHub Pages, put
these files at the selected Pages root. Do not deploy the outer ZIP folder as
the site root.

## Browser requirements

- A modern browser with webcam and WebAssembly support.
- Chrome or Edge is recommended for the first deployment test.
- Safari on recent macOS versions may also be used.
- Camera permission must be enabled for the deployed site.
- Audio begins after the first click, key press, or game interaction because
	browsers block autoplay audio.

## Troubleshooting

- **Camera error:** Confirm HTTPS, camera permission, and system camera access.
- **Runtime or WebAssembly error:** Confirm that the complete
	`mediapipe-hands` folder was uploaded without mixing files from different
	MediaPipe versions.
- **No hand detected:** Improve lighting, keep the hand inside the camera view,
	and use a relaxed finger-gun pose.
- **No sound:** Interact with the page once and check the browser/device volume.
- **Old interface after redeployment:** Hard-refresh the page to clear cached
	JavaScript.
