
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// noise.seed(Math.random());
var simplex = new SimplexNoise(Math.random());
var hue = 0;
var size = 20;
var noiseZ = 0;

var columns = Math.floor(width / size) + 1;
var rows = Math.floor(height / size) + 1;

/*
var particles = [];
for (var y = 0; y < height; y += 5) {
particles.push({
    x: width / 2,
    y: y,
    vx: 0,
    vy: 0
})
};
*/

var particles = [];
for (var x = 0; x < 20; x += 5) {
    particles.push({
        x: x,
        y: height / 2,
        vx: 0,
        vy: 0
    })
};

const count = 20;
const points = Array.from(new Array(count)).map(() => resetPoints());
// const points = newArray(count).map(() => resetPoints());

function resetPoints(p) {
    p = p || {};
    var dpr = 1;
    var maxRadius = 10;
    var startArea = 0.5;
    var scale = Math.min(width, height) / 2;
    var r = Math.random() * 2.0 * Math.PI;

    p.x = Math.cos(r) * scale * startArea;
    p.y = Math.sin(r) * scale * startArea;
    p.x += width / 2;
    p.y += height / 2;

    p.vx = 0;
    p.vy = 0;

    p.radius = getRandomInt(0.01, maxRadius);
    p.duration = getRandomInt(1, 500);
    p.time = getRandomInt(0, p.duration);
    p.velocity = [getRandomInt(-1, 1), getRandomInt(-1, 1)];
    p.speed = getRandomInt(0.5, 2) * dpr;

    return p;
}
console.log(points);
/*
var points = [];
for (let i = 0; i < count; i++) {

    var scale = Math.min(width, height) / 2;
    var startArea = 0.5;
    var r = Math.random() * 2.0 * Math.PI;
    x += width / 2;
    points.push({
        x: Math.cos(r) * scale,
        y: Math.sin(r) * scale,
    })

};
console.log(points);
*/
context.fillStyle = "black";
context.fillRect(0, 0, width, height);
function draw() {
    requestAnimationFrame(draw);
    // calculateField();
    noiseZ += 0.005;
    // clear();
    //drawField();
    drawParticles();
}
function drawBitmapFont() {

    var draw = function () {
        // context.fillStyle = backgroundColor;
        // context.fillRect(0, 0, canvas.width, canvas.height);

        // Draw a section of bitmap font using each of the colors
        for (var i = 0, j = colors.length; i < j; ++i) {

            bufferCtx.save();

            // Draw mask to buffer
            bufferCtx.clearRect(0, 0, buffer.width, buffer.height);
            bufferCtx.drawImage(font, 0, 0, 256, 64, 0, 0, 256, 64);
            // bufferCtx.drawImage(font, 0, 0, width, height);

            // Draw the color only where the mask exists (using source-in)
            bufferCtx.fillStyle = colors[i];
            bufferCtx.globalCompositeOperation = "source-out";
            bufferCtx.fillRect(0, 0, 256, 64);

            bufferCtx.restore();

            // Draw the buffered text to the visible canvas
            context.drawImage(buffer, 0, 0, 256, 64, 0, i * 64, 256, 64);

        }
    };
    var font = new Image();
    font.onload = draw;
    font.src = "font.png";
}
function clear() {
    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
function drawFontA() { // draw anti-clockwise
    // Inner circle
    // context.beginPath();
    // context.arc(width / 2, height / 2, 100, 0, 2 * Math.PI, false);
    // context.fill();

    // Add a letter instead of a circle?
    // context.textAlign = 'center';
    // context.font = "150px Times";
    // context.fillText("A", width / 2, height / 2 + 40);

    // context.translate(width / 2, height / 2);
    // context.rotate(180 * Math.PI / 180);
    // context.translate(width / 2, height / 2);

    context.beginPath();
    context.moveTo(937, 272);
    context.lineTo(456, 272);
    context.lineTo(372, 0);
    context.lineTo(-3, 0);
    context.lineTo(531, 1456);
    context.lineTo(861, 1456);
    context.lineTo(1399, 0);
    context.lineTo(1022, 0);
    context.lineTo(937, 272);
    context.moveTo(540, 543);
    context.lineTo(853, 543);
    context.lineTo(696, 1048);
    context.lineTo(540, 543);
    context.stroke();
    // context.fill();
    context.clip();
}
function drawFont() {

    balls = [];
    var i, radius = 3, data32;
    context.font = "bold 55px arial";
    context.fillText("Hello World", 50, 150);
    context.clearRect(0, 0, width, height);

    data32 = new Uint32Array(context.getImageData(0, 0, width, height).data.buffer);

    // loop through each pixel. We will only store the ones with alpha = 255
    for (i = 0; i < data32.length; i++) {
        if (data32[i] & 0xff000000) {                       // check alpha mask
            balls.push({                                    // add new ball if a solid pixel
                x: (i % width) * radius * 1 + radius,       // use position and radius to
                y: ((i / width) | 0) * radius * 1 + radius, // pre-calc final position and size
                radius: radius,
                // a: (Math.random() * 250) | 0                // just to demo animation capability
                a: 0
            });
        }
    }
    console.log('balls:', balls);
    // context.clearRect(0, 0, width, height);
    context.beginPath();
    for (var i = 0, ball; ball = balls[i]; i++) {
        var dx = Math.sin(ball.a) + ball.radius,   // do something funky
            dy = Math.cos(ball.a++) + ball.radius;
        context.moveTo(ball.x + ball.radius + dx, ball.y + dy);
        // context.arc(ball.x + dx, ball.y + dy, ball.radius, 0, 2 * Math.PI);
        context.rect(ball.x + dx, ball.y + dy, ball.radius, ball.radius)
        context.closePath();
    }
    context.fill();
    // context.clip();

}
function drawField() {
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
            let angle = getAngle(x, y);
            let length = getLength(x, y);
            context.save();
            context.translate(x * size, y * size);
            context.rotate(angle);
            context.strokeStyle = "white";
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(0, size * length);
            context.stroke();
            context.restore();
        }
    }
}
function drawParticles() {
    // does the same as in draw();
    // context.fillStyle = "black";
    // context.fillRect(0, 0, width, height);

    hue += 0.5;
    // context.beginPath();
    // context.strokeStyle = `hsla(${hue}, 50%, 50%, 1)`;
    context.fillStyle = `hsla(${hue}, 50%, 50%, 1)`;
    // context.lineWidth = 10;
    // context.lineCap = 'round' || 'square';
    // context.lineJoin = 'round' || 'square';

    points.forEach((p, i) => {
        var x = p.x;
        var y = p.y;

        var angle = getAngle(x, y);
        p.vx += Math.cos(angle) * 0.1;
        p.vy += Math.sin(angle) * 0.1;
        // console.log(angle);

        context.beginPath();
        // context.arc(x, y, 20, 0, Math.PI * 2);

        // Randomly deform the radius of the circle at this point
        var deformation = simplex.noise3D(x * 2.15, y * 2.15, Math.random()) + 1;
        const radius = 10 * (1 + 0.500 * deformation);
        deformation *= lerp(0.01, 1.0, height / 255);

        context.lineTo(x, y);
        context.lineTo(p.x, p.y);

        // add velocity to position and line to new position
        p.x += p.vx;
        p.y += p.vy;

        context.lineWidth = deformation * (p.time / p.duration) * 10;
        context.lineCap = 'square';
        context.lineJoin = 'square';

        // context.strokeStyle = "red";
        context.strokeStyle = `hsla(${hue}, 50%, 50%, 1)`;
        context.globalAlpha = 0.5;
        context.stroke();

        // apply some friction so point doesn't speed up too much
        p.vx *= 0.9;
        p.vy *= 0.9;

        if (p.x > width) p.x = 0;
        if (p.y > height) p.y = 0;
        if (p.x < 0) p.x = width;
        if (p.y < 0) p.y = height;
        /*
        var angle = getAngle(p.x, p.y);
        p.vx += Math.cos(angle) * 0.1;
        p.vy += Math.sin(angle) * 0.1;

        // move to current position
        context.beginPath();
        context.moveTo(p.x, p.y);

        // add velocity to position and line to new position
        p.x += p.vx;
        p.y += p.vy;
        // context.lineTo(p.x, p.y);
        context.arc(p.x, p.y, 10, 0, Math.PI * 2);
        context.globalAlpha = 1;

        // context.stroke();
        context.fill();

        // apply some friction so point doesn't speed up too much
        p.vx *= 0.9;
        p.vy *= 0.9;

        // wrap around edges of screen
        if (p.x > width) p.x = 0;
        if (p.y > height) p.y = 0;
        if (p.x < 0) p.x = width;
        if (p.y < 0) p.y = height;
        */
    });
}
function getAngle(x, y) {
    var scale = 0.004;
    // return simplex.noise3D(x * scale, y * scale, noiseZ) * Math.PI * 2;
    return simplex.noise3D(x / 50, y / 50, noiseZ) * Math.PI * 2;
}
function getLength(x, y) {
    // return simplex.noise3D(x * scale, y * scale, noiseZ);
    return simplex.noise3D(x / 100 + 40000, y / 100 + 40000, noiseZ);
}
function getValue(x, y) {
    var scale = 0.01;
    return simplex.noise2D(x * scale, y * scale) * Math.PI * 2;
}
function newArray(n, value) {
    n = n || 0
    var array = new Array(n)
    for (var i = 0; i < n; i++) {
        array[i] = value
    }
    return array
}
function clamp(value, min, max) {
    return min < max
        ? (value < min ? min : value > max ? max : value)
        : (value < max ? max : value > min ? min : value)
}
function lerp(v0, v1, t) {
    return v0 * (1 - t) + v1 * t
}
draw();
