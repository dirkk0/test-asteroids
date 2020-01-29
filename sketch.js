"use strict";

const s = function(p5) {
  let asteroids = [];
  //   let a = 1;
  let numAsteroids = 5;
  let canvasWidth = 400;

  let ship;

  //   function Atest (x) {
  //       console.log("I was called")
  //       let a = x
  //   }

  //   let test = new Atest(5)
  //   console.log(test.a)

  function Thing(s, t) {
    this.x = s;
    this.y = t;
    this.vx = 2 * p5.random() - 1;
    this.vy = 2 * p5.random() - 1;
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
        p5.ellipse(this.x, this.y, this.radius, this.radius);
      } else {
        p5.rect(this.x, this.y, this.radius, this.radius);
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
    console.log(temp);
    asteroids.push(temp);
  }
  console.log(asteroids);

  ship = new Thing(canvasWidth * p5.random(), canvasWidth * p5.random());
  ship.shapeString = "bla";
  ship.vx = 0;
  ship.vy = 0;
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
      // console.log(asteroids[3].radius)
      asteroids[i].draw();
      let dx = asteroids[i].x + asteroids[i].radius/2 - ship.x + ship.radius/2;
      let dy = asteroids[i].y + asteroids[i].radius/2 - ship.y + ship.radius/2;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < asteroids[i].radius + ship.radius) {
        console.log("ouch");
      }
    }
    ship.draw();
  };

  //     let asteroid;
  //   let x, y, vx, vy;
  //   p5.setup = function() {
  //     p5.createCanvas(200, 200);
  //     // p5.createCanvas(p5.windowWidth, p5.windowHeight);
  //     x = 100;
  //     y = 100;
  //     vx = 2 * p5.random() - 1;
  //     vy = 2 * p5.random() - 1;
  //     console.log(vy, vx);
  //   };
  //   p5.draw = function() {
  //     p5.background(p5.color(10, 10, 10));
  //     p5.ellipse(x, y, 10, 10);

  //     x = x + vx;
  //     y = y + vy;
  //     if (x > p5.width) {
  //       x = 0;
  //     }
  //     if (y > p5.height) {
  //       y = 0;
  //     }
  //     if (x < 0) {
  //       x = p5.width;
  //     }
  //     if (y < 0) {
  //       y = p5.height;
  //     }
  //     // if (p5.mouseIsPressed) {
  //     //   p5.fill(0);
  //     // } else {
  //     //   p5.fill("#00ff00");
  //     // }
  //     // p5.ellipse(p5.mouseX, p5.mouseY, 80, 80);
  //   };
};

let myp5 = new p5(s);
