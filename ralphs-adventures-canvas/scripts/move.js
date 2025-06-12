'use strict';

//Number.setIfLess: set number to n if less than n
Number.prototype.setIfLess = function (n) {
  let v = this;
  if (v < n) {
    return n;
  }
  return v;
}

//Number.setIfMore: set number to n if more than n
Number.prototype.setIfMore = function (n) {
  let v = this;
  if (this > n) {
    return n;
  }
  return v;
}

//Number.keepInRange: keep number between nStart and nEnd, inclusively
Number.prototype.keepInRange = function (nStart, nEnd) {
  let v = this;
  v = v.setIfLess(nStart);
  v = v.setIfMore(nEnd);
  return v;
}

//canMoveX: check if an object can be moved to a new X position by checking if the new X contains an item in the success Condition Array
function canMoveX(mat, obj, sucConArr, newX) {
  if(newX >= mat.x || newX < 0)
    return false;
  for(let i = -obj.size; i <= obj.size; i++)
    if(!sucConArr.some((con) => con === mat[obj.y+i][newX]))
      return false;
  return true;
}

//canMoveY: check if an object can be moved to a new Y position by checking if the new Y contains an item in the success condition array
function canMoveY(mat, obj, sucConArr, newY) {
  if(newY >= mat.y || newY < 0)
    return false;
  for(let i = -obj.size; i <= obj.size; i++)
    if(!sucConArr.some((con) => con === mat[newY][obj.x+i]))
       return false;
  return true;
}

//moveY: move an object across a matrix vertically as much of a distance as possible while only passing through items in the success condition array
function moveY(mat, obj, distance, sucConArr) {
  for(let i = 1; i <= Math.abs(distance); i++) {
    if(canMoveY(mat, obj, sucConArr, obj.y+(Math.sign(distance)*(i+obj.size))))
      obj.y += Math.sign(distance);
    else
      return false;
  }
  return true;
}

//moveX: move an object across a matrix horizontally as much of a distance as possible while only passing through items in the success condition array
function moveX(mat, obj, distance, sucConArr) {
  for(let i = 1; i <= Math.abs(distance); i++) {
    if(canMoveX(mat, obj, sucConArr, obj.x+(Math.sign(distance)*(i+obj.size))))
      obj.x += Math.sign(distance);
    else
      return false;
  }
  return true;
}
