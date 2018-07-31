/*
 *	Dusk.space
 *
 *	elements:
 *	1. Dusk
 *	2. Dome
 *	3. Stars
 *	4. Grass
 *	5. Fireflies
 *
 *	could be nice to use geodesic dome code from: https://www.openprocessing.org/sketch/379549
 */

var scaleFactor;

function setup() {
  // createCanvas(375,667, WEBGL);// simulate screen size
  createCanvas(windowWidth, windowHeight, WEBGL);
  scaleFactor = windowWidth / 375;
}

function draw() {
  background(0);

  // update an ambient background lighting
  pointLight(127, 0, 255, scaleFactor * 250 * cos(millis() / 10000), scaleFactor * 250 * sin(millis() / 10000), 250);
  pointLight(0, 64, 127, scaleFactor * 250 * cos(-millis() / 10000), scaleFactor * 250 * sin(-millis() / 10000), 250);

  // ambient background surface
  ambientMaterial(250);
  push();
  translate(0, 0, -scaleFactor * 800);
  sphere(scaleFactor * 810, 64);
  pop();

  // geodesic dome rotating
  fill(0, 0);
  stroke(255);
  strokeWeight(1);
  push();
  rotateZ(millis() / 5000);
  rotateY(millis() / 5000);
  sphere(scaleFactor * 100, 16, 9);
  pop();

  // stars
  // instance ~10 stars that oscillate their glow
  // drawStar(x, y, size, period, shift)
  drawStar(-100, -100, 10.0, 2000, 0);
  drawStar(75, -150, 20.0, 5000, 0);
  drawStar(-50, -150, 8.0, 10000, 0);
  drawStar(-90, -200, 8.0, 10000, 3000);
  drawStar(20, -240, 15.0, 7500, 0);

  // occasional shooting star w/ trail

  // fireflies
  // kind of like the stars but a little larger, greener and move :)
  // firefly.update();
  // firefly.display();

  // grass
  // variable sway in the wind
  // use the rotation of the sphere as a guide for wind direction
  // grass.update();
  // grass.display();
}

var drawStar = function(x, y, size, period, phaseShift) {
  push();
  translate(0, 0, 50);
  fill(255, 10);
  noStroke();
  for (var i = 1; i <= 10; i++) {
    fill(255, 10 * i);
    ellipse(x * scaleFactor, y * scaleFactor, scaleFactor * cos((phaseShift + millis()) / period) * size / float(i), scaleFactor * cos((phaseShift + millis()) / period) * size / float(i));
  }
  pop();

}

/* prevents the mobile browser from processing some default
 * touch events, like swiping left for "back" or scrolling
 * the page.
 */
document.ontouchmove = function(event) {
  event.preventDefault();
};