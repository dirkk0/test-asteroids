"use strict";

const s = function(p5) {
  let asteroids = [];
  //   let a = 1;
  let numAsteroids = 10;
  let canvasWidth = 400;

  let ship;

  function Thing(s, t) {
    this.x = s;
    this.y = t;
    this.vx = 0 // 2 * p5.random() - 1;
    this.vy = 0 // 2 * p5.random() - 1;
    this.radius = 20 // 30 * p5.random() + 10;
    this.color = p5.color(
      p5.random() * 255,
      p5.random() * 255,
      p5.random() * 255
    );
    this.shapeString = "ellipse";
    // this.shape = p5.ellipse
    this.friction = 1;

    this.draw = function() {
      this.vx = this.vx * this.friction;
      this.vy = this.vy * this.friction;
      this.x += this.vx;
      this.y += this.vy;

      p5.fill(this.color);
      //   this.shape(this.x, this.y, 10, 10)

      if (this.shapeString === "ellipse") {
        // console.log(this.x, this.y, this.radius, this.radius)
        p5.ellipse(this.x, this.y, this.radius, this.radius);
      } else {
        p5.rect(this.x - this.radius/2, this.y - this.radius/2, this.radius, this.radius);
        // p5.ellipse(this.x, this.y, this.radius, this.radius);
      }
      //   p5.fill(255);
      //   p5.rect(this.x, this.y-10, 10, 10);
      if (this.x > p5.width) {
        this.x = 0;
      }
      if (this.y > p5.height) {
        this.y = 0;
      }
      if (this.x < 0) {
        this.x = p5.width;
      }
      if (this.y < 0) {
        this.y = p5.height;
      }
    };
  }

  //   let a = new Thing(10, 10);
  //   let b = new Thing(20, 20);

  for (let i = 0; i < numAsteroids; i++) {
    let temp = new Thing(canvasWidth * p5.random(), canvasWidth * p5.random());
    // let temp = new Thing(200, 200);
    temp.radius = 20;
    console.log(temp);
    asteroids.push(temp);
  }
  console.log(asteroids);

  ship = new Thing(canvasWidth * p5.random(), canvasWidth * p5.random());
  // ship = new Thing(200, 200);
  ship.shapeString = "bla";
  ship.vx = 0;
  ship.vy = 0;
  ship.radius = 25
  ship.friction = 0.99;

  //   console.log(a, b);

  p5.setup = function() {
    p5.createCanvas(canvasWidth, canvasWidth);
    // p5.frameRate(10)
  };

  p5.draw = function() {
    p5.background(200);

    if (p5.keyIsDown(p5.LEFT_ARROW)) {
      ship.vx -= 0.1;
    }
    if (p5.keyIsDown(p5.RIGHT_ARROW)) {
      ship.vx += 0.1;
    }
    if (p5.keyIsDown(p5.UP_ARROW)) {
      ship.vy -= 0.1;
    }
    if (p5.keyIsDown(p5.DOWN_ARROW)) {
      ship.vy += 0.1;
    }

    for (let i = 0; i < numAsteroids; i++) {
      // console.log(asteroids[0].radius)
      asteroids[i].draw();
      let dx = asteroids[i].x - ship.x;
      let dy = asteroids[i].y - ship.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < (asteroids[i].radius/2 + ship.radius/2)) {
        console.log("ouch", distance);
      }
    }
    ship.draw();
  };
}
let myp5 = new p5(s);
