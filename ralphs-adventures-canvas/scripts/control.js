"use strict";
let playerShots = [];

//map html key strings to game inputs
let controls = {
  up: "w",
  down: "s",
  left: "a",
  right: "d",
  shotUp: "ArrowUp",
  shotDown: "ArrowDown",
  shotLeft: "ArrowLeft",
  shotRight: "ArrowRight",
  reset: "r",
};

//store the press state of game inputs
let keyDown = new Map([
  [controls.up, false],
  [controls.down, false],
  [controls.left, false],
  [controls.right, false],
  [controls.shotUp, false],
  [controls.shotDown, false],
  [controls.shotLeft, false],
  [controls.shotRight, false],
  [controls.reset, false],
]);

//update player position for key presses
function movePlayer(mat, player, keyTracker, sucConArr) {
  if (keyTracker.get(controls.up))
    moveY(mat, player, -player.speed, sucConArr);
  if (keyTracker.get(controls.down))
    moveY(mat, player, player.speed, sucConArr);
  if (keyTracker.get(controls.left))
    moveX(mat, player, -player.speed, sucConArr);
  if (keyTracker.get(controls.right))
    moveX(mat, player, player.speed, sucConArr);
}

//fireShot: create a player projectile object with a speed and direction based on the key pressed
function fireShot(mat, pointObj, keyTracker, sucConArr) {
  let shot = new Proj(pointObj.x, pointObj.y, '', 1);
  if (keyTracker.get(controls.shotUp)) {
    shot.dir = 'y';
    shot.speed = -shot.speed;
    playerShots.push(shot);
  }
  else if (keyTracker.get(controls.shotDown)) {
    shot.dir = 'y';
    playerShots.push(shot);
  }
  else if (keyTracker.get(controls.shotLeft)) {
    shot.dir = 'x';
    shot.speed = -shot.speed;
    playerShots.push(shot);
  }
  else if (keyTracker.get(controls.shotRight)) {
    shot.dir = 'x';
    playerShots.push(shot);
  }
}

//updateKey: on a key pressed event, update a cooresponding data-key in keyMap with a status as its value
function updateKey(eKey, keyMap, status) {
  if (keyMap.has(eKey)) keyMap.set(eKey, status);
  else if (keyMap.has(eKey.toLowerCase()))
    keyMap.set(eKey.toLowerCase(), status);
  else return;
}
