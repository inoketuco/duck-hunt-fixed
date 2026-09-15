// fingerGunClassifier.js

/**
 * Returns true if the hand looks like a "finger gun":
 * - Index finger extended
 * - Thumb extended
 * - Middle, ring, pinky folded
 *
 * landmarks: array of 21 {x,y,z} in normalized coords [0..1]
 * handedness: "Left" or "Right" (from MediaPipe result.handedness)
 */
export function isFingerGun(landmarks, handedness) {
  if (!landmarks || landmarks.length !== 21) return false;

  const lm = landmarks;

  const distance = (a, b) => {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const palmSize = Math.max(distance(lm[0], lm[9]), 0.001);

  const indexTip = lm[8];
  const isExtended = (mcp, pip, tip) =>
    distance(lm[tip], lm[mcp]) > distance(lm[pip], lm[mcp]) * 1.2;
  const isFolded = (mcp, pip, tip) =>
    distance(lm[tip], lm[mcp]) < distance(lm[pip], lm[mcp]) * 1.55;
  const indexExtended = isExtended(5, 6, 8);

  const middleFolded = isFolded(9, 10, 12);
  const ringFolded = isFolded(13, 14, 16);
  const pinkyFolded = isFolded(17, 18, 20);

  // A relaxed thumb is enough; requiring a fully extended thumb made the pose tiring.
  const thumbTip = lm[4];
  const thumbComfortablySeparated = distance(thumbTip, indexTip) > palmSize * 0.2;
  const foldedFingerCount = [middleFolded, ringFolded, pinkyFolded]
    .filter(Boolean).length;

  return (
    indexExtended &&
    foldedFingerCount >= 2 &&
    thumbComfortablySeparated
  );
}

/**
 * Aim direction from wrist (0) to index tip (8)
 * Returns {x, y} unit vector in normalized coords.
 */
export function getAimVector(landmarks) {
  if (!landmarks || landmarks.length !== 21) return { x: 0, y: 0 };
  const wrist = landmarks[0];
  const indexTip = landmarks[8];
  const dx = indexTip.x - wrist.x;
  const dy = indexTip.y - wrist.y;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  return { x: dx / len, y: dy / len };
}
