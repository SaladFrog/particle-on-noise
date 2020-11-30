
var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;

// noise.seed(Math.random());
var simplex = new SimplexNoise(Math.random());
var hue = 0;
var noiseZ = 0;



var particles = [];
for (var y = 0; y < height; y += 5) {
    particles.push({
        x: width / 2,
        y: y,
        vx: 0,
        vy: 0
    })
};

function draw() {
    requestAnimationFrame(draw);

    noiseZ += 0.001;
    // drawBackground();

    // drawFlowField();
    drawParticles();

}

function drawBackground() {
    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);
}
function drawFlowField() {
    // context.clearRect(0, 0, width, height);
    context.lineWidth = 0.5;
    var res = 10;
    for (var x = 0; x < width; x += res) {
        for (var y = 0; y < height; y += res) {
            var angle = getAngle(x, y);
            context.save();
            context.translate(x, y);
            context.rotate(angle);
            context.strokeStyle = "black";
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(res * 1.5, 0);
            context.stroke();
            context.restore();
        }
    }
}
context.fillStyle = "black";
context.fillRect(0, 0, width, height);
function drawParticles() {

    hue += 0.5;
    context.strokeStyle = `hsla(${hue}, 50%, 50%, 1)`;
    context.lineWidth = 0.50;
    context.lineCap = 'round' || 'square';
    context.lineJoin = 'round' || 'square';

    particles.forEach(p => {
        var value = getValue(p.x, p.y);
        p.vx += Math.cos(value) * 0.1;
        p.vy += Math.sin(value) * 0.1;

        // context.strokeStyle = "red";

        // move to current position
        context.beginPath();
        context.moveTo(p.x, p.y);

        // add velocity to position and line to new position
        p.x += p.vx;
        p.y += p.vy;
        context.lineTo(p.x, p.y);
        context.globalAlpha = 0.5;
        context.stroke();

        // apply some friction so point doesn't speed up too much
        p.vx *= 0.99;
        p.vy *= 0.99;

        // wrap around edges of screen
        if (p.x > width) p.x = 0;
        if (p.y > height) p.y = 0;
        if (p.x < 0) p.x = width;
        if (p.y < 0) p.y = height;
    });
}

function getAngle(x, y) {
    var scale = 0.004;
    return simplex.noise3D(x * scale, y * scale, noiseZ) * Math.PI * 2;
    // return simplex.noise3D(x / 50, y / 50, noiseZ) * Math.PI * 2;
}
function getValue(x, y) {
    var scale = 0.01;
    return simplex.noise2D(x * scale, y * scale) * Math.PI * 2;
}

draw();
