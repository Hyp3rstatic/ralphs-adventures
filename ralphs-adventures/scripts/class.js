'use strict';

//Player Projectile Class
class Proj {
  constructor(x, y, dir, speed) {
    this.symbol = pew;
    this.dir = dir;
    this.size = 0;
    this.speed = speed;
    this.x = x;
    this.y = y;
  }
};

//Enemy Class
class Enemy {
  constructor(x, y, hp) {
    this.x = x;
    this.y = y;
    this.symbol = benny;
    this.size = 0;
    this.health = hp;
    this.alive = true;
    this.hasMoved = false;
  }
}