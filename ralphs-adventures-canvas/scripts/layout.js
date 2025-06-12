'use strict';

//functions to create level layouts

const layoutRivets = () => {
  drawRect(movePlain, waller, {x:0, y:4}, {x:9, y:5});
  drawRect(movePlain, spot, {x:4, y:4}, {x:5, y:5});
  drawRect(movePlain, spot, {x:7, y:4}, {x:8, y:5});
  drawRect(movePlain, spot, {x:1, y:4}, {x:2, y:5});
  drawRect(movePlain, waller, {x:2, y:8}, {x:3, y:8});
  drawRect(movePlain, waller, {x:2, y:1}, {x:3, y:1});
  drawRect(movePlain, waller, {x:6, y:8}, {x:7, y:8});
  drawRect(movePlain, waller, {x:6, y:1}, {x:7, y:1});
}

const layoutFourSquare = () => {
  drawRect(movePlain, waller, {x:4, y:1}, {x:5, y:8});
  drawRect(movePlain, waller, {x:1, y:4}, {x:8, y:5});
  drawRect(movePlain, spot, {x:3, y:3}, {x:6, y:6});
}

const layoutNineBlock = () => {
  drawRect(movePlain, waller, {x:1, y:1}, {x:3, y:3});
  drawRect(movePlain, waller, {x:6, y:1}, {x:8, y:3});
  drawRect(movePlain, waller, {x:1, y:6}, {x:3, y:8});
  drawRect(movePlain, waller, {x:6, y:6}, {x:8, y:8});
}


// list of layouts
let layoutList = [
  layoutRivets,
  layoutFourSquare,
  layoutNineBlock,
];
