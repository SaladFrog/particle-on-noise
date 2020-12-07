class Particle {
  constructor(x, y) {
    // this.pos = new Vector(x, y);
    this.pos = { x: x, y: y };
    // function vec(x, y) {
    //   return {
    //     x: x,
    //     y: y
    //   };
    // }
    // this.vel = new Vector(Math.random() * 2 - 1, Math.random() * 2 - 1);
    // this.vel = vec(Math.random() - 0.5, Math.random() - 0.5);
    this.vel = { x: Math.random() - 0.5, y: Math.random() - 0.5 };
    // this.acc = new Vector(0, 0);
    // this.acc = vec(0, 0);
    this.acc = { x: 0, y: 0 };
    this.size = 2;
  }
  move(acc) {
    if (acc) {
      //this.acc.addTo(acc);
      this.acc.x += acc.x;
      this.acc.y += acc.y;
    }

    // apply some friction so point doesn't speed up to much
    // this.vel.addTo(this.acc);
    this.vel.x += this.acc.x;
    this.vel.y += this.acc.y;

    // add velocity to position and line to new position
    // this.pos.addTo(this.vel);
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;

    let length = Math.sqrt(this.vel.x * this.vel.x + this.vel.y * this.vel.y);
    // if (this.vel.getLength() > 2) {
    if (length > 2) {
      // this.vel.setLength(2);
      // var angle = Math.sqrt(this.vel.x * this.vel.x + this.vel.y * this.vel.y);
      let angle = Math.atan2(this.vel.y, this.vel.x);
      this.vel.x = Math.cos(angle) * 2;
      this.vel.y = Math.sin(angle) * 2;
    }
    // this.acc.setLength(0);
    let angle = Math.atan2(this.acc.y, this.acc.x);
    this.acc.x = Math.cos(angle) * 0;
    this.acc.y = Math.sin(angle) * 0;
  }
  // draw() {
  //   ctx.fillRect(this.pos.x, this.pos.y, this.size, this.size);
  // }
  wrap() {
    if (this.pos.x > w) {
      this.pos.x = 0;
    } else if (this.pos.x < -this.size) {
      this.pos.x = w - 1;
    }
    if (this.pos.y > h) {
      this.pos.y = 0;
    } else if (this.pos.y < -this.size) {
      this.pos.y = h - 1;
    }
  }
}

let canvas, ctx, field, w, h, size, columns, rows, noiseZ, particle;
// let ctx;
// let field;
// let w, h;
// let size;
// let columns;
// let rows;
// let noiseZ;
// let particles;

function setup() {
  size = 12;
  noiseZ = 0;
  noise = new SimplexNoise(Math.random());
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");
  reset();
  window.addEventListener("resize", reset);
}
function reset() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  columns = Math.round(w / size) + 1;
  rows = Math.round(h / size) + 1;
  drawBackground(1);
  initParticles();
}
function initParticles() {
  particles = [];
  let numberOfParticles = (w * h) / 1000;
  for (let i = 0; i < numberOfParticles; i++) {
    let particle = new Particle(Math.random() * w, Math.random() * h);
    particles.push(particle);
  }
}
function draw() {
  requestAnimationFrame(draw);
  calculateField();
  noiseZ += 0.002;
  drawParticles();
  drawParticles();
}
function calculateField() {
  field = new Array(columns);
  for (let x = 0; x < columns; x++) {
    field[x] = new Array(columns);
    for (let y = 0; y < rows; y++) {
      let angle = noise.noise3D(x / 20, y / 20, noiseZ) * Math.PI * 2;
      let length = noise.noise3D(x / 50 + 40000, y / 50 + 40000, noiseZ) * 0.3;
      // let v = new Vector(0, length);
      // v.setAngle(angle);

      let v = vec2(0, length);
      function vec2(x, y) {
        return {
          x: x,
          y: y
        };
      }
      // let angle = Math.sqrt(v.x * v.x + v.y * v.y);
      v.x = Math.cos(angle) * length;
      v.y = Math.sin(angle) * length;

      field[x][y] = v;
    }
  }
}
function drawBackground(alpha) {
  ctx.fillStyle = `rgba(0, 0, 0, ${alpha || 0.07})`;
  ctx.fillRect(0, 0, w, h);
}
function drawParticles() {
  let hue = Math.sin(noiseZ) * 50;
  ctx.fillStyle = `hsla(${hue}, 50%, 50%, 0.1)`;
  particles.forEach(p => {
    // p.draw();
    ctx.fillRect(p.pos.x, p.pos.y, p.size, p.size);
    // let pos = p.pos.div(size);
    // let pos = divi(p.pos.x, p.pos.y, 15);
    // function divi(x, y, size) {
    //   return {
    //     x: x / size,
    //     y: y / size
    //   };
    // }
    let pos = { x: p.pos.x / size, y: p.pos.y / size };
    let v;
    if (pos.x >= 0 && pos.x < columns && pos.y >= 0 && pos.y < rows) {
      v = field[Math.floor(pos.x)][Math.floor(pos.y)];
    }
    p.move(v); // move particle
    p.wrap(); // reset particle if outside canvas
  });
}
setup();
draw();
