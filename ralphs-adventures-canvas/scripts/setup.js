'use strict';

//function container for spawning enemies in set formation, takes an hp value for enemies
function spawn(hp) {
  bennyList.push(
    new Enemy(0, 0, hp),
    new Enemy(0, 9, hp),
    new Enemy(9, 0, hp),
    new Enemy(9, 9, hp),
  );
}

//setup: setupGame before running game loop
function setupGame() {

  //reset player variable
  player = {
    symbol: ralph,
    size: startSize,
    speed: startSpeed,
    x: startX,
    y: startY,
    health: fullHealth,
  };

  //reset enemy list
  bennyList = [];
  bennySpawnHP = 1;
  spawn(bennySpawnHP);

  //reset 
  bennyCanMove = false;
  bennyMoveTickCounter = 0;
  playerImmune = true;
  playerImmuneTickCounter = 0;

  //reset game matrix
  movePlain = [];
  movePlain.x = 10;
  movePlain.y = 10;
  movePlain.FillMat(spot, movePlain.x, movePlain.y);

  //set the new layout
  newLayout = Math.floor(Math.random() * layoutList.length);
  currentLayout = newLayout;
  layoutList[newLayout]();

  //reset healthbar display
  healthBar = [];
  healthBar.Fill(heart, player.health);

  //reset player shot detection plain
  shotPlain = [];
  shotPlain.FillMat("SAFE", movePlain.x, movePlain.y);

  //reset player shots list
  playerShots = [];

  //reset topbar display
  topBar = howTo;
  
}
