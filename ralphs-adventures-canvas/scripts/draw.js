'use strict';

//Array.Fill: fill an array with val until index-1
Array.prototype.Fill = function (val, end) {
  for (let i = 0; i < end; i++) {
    this[i] = val;
  }
}

//Array.FillMat: fill an array until endY-1 with arrays filled with val until endX-1
Array.prototype.FillMat = function (val, endX, endY) {
  for (let i = 0; i < endY; i++) {
    this[i] = [];
    this[i].Fill(val, endX);
  }
}

//arrF: Format an array to be rendered as html text
const arrF = (arr, join) => arr.join(join);

//matF: Format a matrix to be rendered as html text
const matF = (mat, join) => mat.map((line) => line.join(join).concat('<br>')).join('');

//drawRect: create a rectangle made of val in matrix from corners p1 to p2
function drawRect(mat, val, p1, p2) {for(let i = p1.y; i < p2.y+1; i++) mat[i].fill(val, p1.x, p2.x+1)};

//drawSqr: create a square of val in matrix with an origin of p, expanding outwards rad spaces
const drawSqr = (mat, val, rad, p) => drawRect(mat, val, {x: p.x-rad, y:p.y-rad}, {x: p.x+rad, y:p.y+rad});