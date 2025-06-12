'use strict';

let gameSpeed = 100; //in milliseconds

//player initialization variables
let fullHealth = 10;
let startX = 4;
let startY = 4;
let startSize = 0;
let startSpeed = 1;

//player object
let player = {
  symbol: ralph,
  size: startSize,
  speed: startSpeed,
  x: startX,
  y: startY,
  health: fullHealth,
};

//game data storage lists
let bennyList = [];
let healthBar = []; //displyed below game
let shotPlain = [];

let removedOneItem;

let bennyCanMove = false;
let bennyMoveTickCounter = 0;

let playerImmune = false;
let playerImmuneTickCounter = 0;

let topBar = howTo; //display above game

let bennySpawnHP = 1;

//store level layouts
let newLayout;
let currentLayout;

let movePlain = [] //game matrix
movePlain.x = 10;
movePlain.y = 10;
movePlain.FillMat(spot, movePlain.x, movePlain.y);
