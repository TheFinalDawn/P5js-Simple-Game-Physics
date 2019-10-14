var framerate = 60; // Amount of refreshes per second. Standard is 60.
function setup() {
  frameRate(framerate);
  createCanvas(windowWidth, windowHeight); // Feel free to change these values.
}
/* PLAY WITH THESE VALUES */
var jumpAmount = 20; // how many jumps you can perform midair
var jumpCombo = 0; // How many jumps the player has made since touching the ground
var mvLeft = false; // Is the player moving left?
var mvRight = false; // Is the player moving right?
var moveSpeed = 5; // how fast you move when pressing right or left
var x = 100; // pixels between the left side of the box and screen. See y.
var y = 100; // how many pixels from the top the box starts. Note this number is the top of the box.
var fallspeed = 0; // how fast the player is falling
var gravity = 9.8; // Simple limiter on the down speed of the cube.
var accel = 1; // don't suggest increasing this above 1. This number is added to fallspeed every frame.
var jumpPower = 20; // the force of the jump, in pixels.
var doubleJump = false; // Whether or not the box can jump midair.
function draw() {
  background(220);
  rect(x, y, 100, 100);
  if (fallspeed === 0) {
    text("Falling/Upward Speed: " + fallspeed, 50, 50);
  } else if (fallspeed > 0) {
    text("Falling Speed: " + fallspeed, 50, 50);
  } else if (fallspeed < 0) {
    text("Upward Speed: " + -fallspeed, 50, 50);
  } else {
    text("Speed broke. Value:" + fallspeed, 50, 50);
  }
  text("Y: " + y, 50, 60);
  text("X: " + x, 50, 70);
  if (jumpCombo >= jumpAmount) {
    text("Jump Combo: " + jumpCombo + "!", 50, 80);
  } else if (jumpCombo < 0) {
    text("Jump Combo: " + jumpCombo + "?", 50, 80);
  } else {
    text("Jump Combo: " + jumpCombo, 50, 80);
  }
  text(width, 50, 100);
  text("FPS: " + framerate, 50, 90);
  if (y <= height - 102) {
    fallspeed += accel;
    y += fallspeed;
  } else {
    fallspeed = 0;
    y = height - 100;
    doubleJump = false;
    jumpCombo = 0;
  }
  if (fallspeed >= 2 * gravity) {
    fallspeed = 2 * gravity;
  }
  if (mvLeft) {
    x -= moveSpeed;
  }
  if (mvRight) {
    x += moveSpeed;
  }
  if (jumpCombo >= jumpAmount) {
    doubleJump = true;
  }
  if (x <= 0) {
    x = 0;
  } else if (x >= width - 100) {
    x = width - 100;
  }
  if (y <= 0) {
    var inv = fallspeed;
    y = 0;
    fallspeed = -inv / 2;
  }
}
function keyPressed() {
  if (keyCode === 32 || keyCode === 87 || keyCode === 38) {
    if (y === height - 100) {
      fallspeed = -jumpPower;
      y += fallspeed;
      jumpCombo++;
    } else {
      if (doubleJump === false) {
        fallspeed = -jumpPower;
        y += fallspeed;
        jumpCombo++;
      }
    }
  }
  if (keyCode === 65 || keyCode === 37) {
    mvLeft = true;
    mvRight = false;
  }
  if (keyCode === 68 || keyCode === 39) {
    mvRight = true;
    mvLeft = false;
  }
  return false;
}

function keyReleased() {
  if (keyCode !== 32 && keyCode !== 87 && keyCode !== 38) {
    if (keyCode === 68 || keyCode === 39) {
      mvRight = false;
    } else if (keyCode === 65 || keyCode === 37) {
      mvLeft = false;
    }
  }
  return false;
}
