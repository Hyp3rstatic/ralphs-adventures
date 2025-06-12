"use strict";

setupGame();

//Listen for key presses
addEventListener("keydown", (e) => {
  updateKey(e.key, keyDown, true);
});

//Listen for key releases
addEventListener("keyup", (e) => {
  updateKey(e.key, keyDown, false);
});

//updatePlayer: update the player object on a single frame
function updatePlayer(mat, player, keyTracker) {
  drawSqr(mat, spot, player.size, { x: player.x, y: player.y });
  movePlayer(mat, player, keyTracker, [spot, pew]);
  drawSqr(mat, player.symbol, player.size, { x: player.x, y: player.y });
}

//popDraw: draw space at popped list element's position on mat
function popDraw(mat, space, list) {
  if (list.length > 0) {
    let poppedElem = list.pop();
    drawSqr(mat, space, poppedElem.size, { x: poppedElem.x, y: poppedElem.y });
    return true;
  }
  return false;
}

//updateProj: runs through each shot in the projectile list, and handles it during the next frame
function updateProj(projList) {
  projList.map((i, index) => {
    //draw over old shot position on game matrix
    if (movePlain[i.y][i.x] !== player.symbol && movePlain[i.y][i.x] !== benny)
      drawSqr(movePlain, spot, i.size, { x: i.x, y: i.y });
    let projHasMoved = false;
    //move shot accordingly based on direction, y or x
    if (i.dir === "y") {
      projHasMoved = moveY(movePlain, i, i.speed, [spot, benny]);
    }
    if (i.dir === "x") {
      projHasMoved = moveX(movePlain, i, i.speed, [spot, benny]);
    }
    //more checks after bullet moves
    if (projHasMoved) {
      //check if a bullet has hit an enemy
      if (movePlain[i.y][i.x] === benny) {
        i.dir = "remove";
        shotPlain[i.y][i.x] = "HIT"; //add a hit to the shot plain for an enemy to know its been hit
      } else drawSqr(movePlain, i.symbol, i.size, { x: i.x, y: i.y }); //draw shot in new position
    }
    //if a shot doesn't move, update its status and remove any traces of it
    else {
      if (
        movePlain[i.y][i.x] !== player.symbol &&
        movePlain[i.y][i.x] !== benny
      )
        drawSqr(movePlain, spot, i.size, { x: i.x, y: i.y });
      i.dir = "remove";
    }
  });
  playerShots = playerShots.filter((x) => x.dir !== "remove"); //remove terminated shots from list
}

//updateProj: runs through each enemy in the enemy list, and handles it during the next frame
function updateEnemy(enemyList, enemyCanMove) {
  enemyList.map((enemy) => {
    //update enemy sprite if its hit
    if (enemy.symbol === hit) enemy.symbol = benny;
    //handle if an enemy is on a HIT spot in the shotPlain
    if (shotPlain[enemy.y][enemy.x] === "HIT") {
      shotPlain[enemy.y][enemy.x] = "SAFE";
      enemy.symbol = hit;
      enemy.health--;
    }
    //handle enemy death
    if (enemy.health === 0) {
      enemy.alive = false;
      drawSqr(movePlain, enemy.symbol, enemy.size, { x: enemy.x, y: enemy.y });
    }
    //update enemy if its allowed to move
    if (enemyCanMove) {
      //check if the player is adjacent to the enemy
      if (
        (movePlain[enemy.y.keepInRange(0, 8) + 1][enemy.x] === player.symbol ||
          movePlain[enemy.y.keepInRange(1, 9) - 1][enemy.x] === player.symbol ||
          movePlain[enemy.y][enemy.x.keepInRange(0, 8) + 1] === player.symbol ||
          movePlain[enemy.y][enemy.x.keepInRange(1, 9) - 1] ===
            player.symbol) &&
        playerImmune
      ) {
        player.health--;
        healthBar[player.health] = hurt;
        playerImmune = false;
        player.symbol = vulnerable;
      }
      //move the enemy closer to the player by updating is position on the game matrix
      drawSqr(movePlain, spot, enemy.size, { x: enemy.x, y: enemy.y });
      if (enemy.x > player.x) moveX(movePlain, enemy, -1, [spot, pew]);
      else if (enemy.x < player.x) moveX(movePlain, enemy, 1, [spot, pew]);
      if (enemy.y > player.y) moveY(movePlain, enemy, -1, [spot, pew]);
      else if (enemy.y < player.y) moveY(movePlain, enemy, 1, [spot, pew]);
    }
    if (enemy.alive)
      drawSqr(movePlain, enemy.symbol, enemy.size, { x: enemy.x, y: enemy.y });
    else drawSqr(movePlain, spot, enemy.size, { x: enemy.x, y: enemy.y });
  });
}

//every gameSpeed milliseconds run through this function
setInterval(() => {
  //main game loop while player is alive
  if (player.symbol !== grave) {
    //handle player immunity state
    if (!playerImmune) {
      playerImmuneTickCounter++;
      if (playerImmuneTickCounter === 3) {
        playerImmuneTickCounter = 0;
        player.symbol = ralph;
        playerImmune = true;
      }
    }

    //check if the player is alive
    if (player.health <= 0) {
      player.symbol = grave;
      topBar = reset;
    }

    //update player
    updatePlayer(movePlain, player, keyDown);

    //update projectiles
    fireShot(movePlain, player, keyDown, [spot, benny]);
    updateProj(playerShots);
    bennyMoveTickCounter++;
    if (bennyMoveTickCounter === 4) {
      bennyCanMove = true;
      bennyMoveTickCounter = 0;
    }

    //update enemies
    updateEnemy(bennyList, bennyCanMove);
    bennyCanMove = false;
    bennyList = bennyList.filter((x) => x.alive);

    //once all current enemies are defeated spawn more and update the level layout
    if (bennyList.length === 0) {
      //clear previous level date
      playerShots = [];
      shotPlain.FillMat("SAFE", movePlain.x, movePlain.y);
      drawSqr(movePlain, spot, player.size, { x: player.x, y: player.y });
      player.x = startX;
      player.y = startY;

      //white-out game matrix
      movePlain.map((y, idxY) => {
        y.map((x, idxX) => {
          drawSqr(movePlain, spot, 0, { x: idxX, y: idxY });
        });
      });

      //generate new layout
      while (newLayout === currentLayout) {
        newLayout = Math.floor(Math.random() * layoutList.length);
      }
      currentLayout = newLayout;

      //load new layout
      layoutList[newLayout]();

      //set player health bar and health to full
      for (let i = player.health - 1; i < healthBar.length; i++) {
        healthBar[i] = heart;
      }
      player.health = healthBar.length;
      bennySpawnHP++;
      spawn(bennySpawnHP);
    }
  }
  //loop once player is dead
  else {
    //remove every shot and enemy one frame at a time
    let removedOneItem = popDraw(movePlain, spot, playerShots); //enemy first
    if (!removedOneItem) removedOneItem = popDraw(movePlain, spot, bennyList); //shots second

    //reset game if r is pressed
    if (keyDown.get(controls.reset)) setupGame();
  }
  /*
  // create html text for the game
  gameWindow.innerHTML = `
  <div style="text-align: center;"><p>${topBar}</p></div>
  <div style="text-align: center;"><p>${matF(movePlain, "")}</p></div>
  <div style="text-align: center;"><p>${arrF(healthBar, "")}</p></div>
  `;
*/
  game.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
  movePlain.map((list, i) => {
    list.map((imageRef, j) => {
      let img = new Image();
      let iSrc = imageRef.replaceAll('<img src="', "");
      img.src = iSrc.replaceAll('" width="50" height="50">', "");
      //img.src = imageRef
      game.drawImage(img, j * scale + 50, i * scale + 50, scale, scale);
    });
  });
  healthBar.map((imageRef, i) => {
    let sizeDown = 2;
    let img = new Image();
    let iSrc = imageRef.replaceAll('<img src="', "");
    img.src = iSrc.replaceAll('" width="50" height="50">', "");
    if (i < 5) {
      game.drawImage(img, i * scale + 550 + 50, 25 + 50, scale, scale);
    } else if (i > 4) {
      game.drawImage(
        img,
        (i - 5) * scale + 550 + 50,
        scale + 25 + 50,
        scale,
        scale,
      );
    }
  });
  for (let i = 0; i < 1; i++) {
    let img = new Image();
    let iSrc = topBar.replaceAll('<img src="', "");
    img.src = iSrc.replaceAll('" width="500" height="50">', "");
    //game.drawImage(img, 550, 150, (scale * 10) / 2, scale /2);
    game.drawImage(img, 550 + 50, 125 + 50, (scale * 10) / 2, scale / 2);
  }
  game.font = "50px 'Comic Sans MS";
  game.fillText("Round", 625, 550);
  game.fillText(bennySpawnHP, 800, 550);

  for (let i = 0; i < 1; i++) {
    let img = new Image();
    let iSrc = player.symbol.replaceAll('<img src="', "");
    img.src = iSrc.replaceAll('" width="50" height="50">', "");
    //game.drawImage(img, 550, 150, (scale * 10) / 2, scale /2);
    game.drawImage(img, 550 + 50, 190 + 50, scale*5, scale*5);
  }

  //game.drawImage(playerImg, player.x * 50, player.y * 50, 50, 50);
}, gameSpeed);
