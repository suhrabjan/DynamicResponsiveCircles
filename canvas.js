const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

const mouse = {
    x: undefined,
    y: undefined
}

const maxRadius = 50;
const randColors = ['#020F6E', '#1261B2', '#B6D6F2', '#E5E5E5', '#BA292D'];

window.addEventListener('mousemove', function(e){
    mouse.x = e.x;
    mouse.y = e.y;
})

document.addEventListener('touchstart', function(e){
    mouse.x = e.x;
    mouse.y = e.y;
})

document.addEventListener('touchend', function(e){
    mouse.x = e.x;
    mouse.y = e.y;
})

document.addEventListener('touchcancel', function(e){
    mouse.x = e.x;
    mouse.y = e.y;
})

document.addEventListener('touchmove', function(e){
    mouse.x = e.x;
    mouse.y = e.y;
})

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

function Circle(x, y, dx, dy, radius, randColors) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = randColors[Math.floor(Math.random() * randColors.length)];

    this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    this.update = function() {
        if (this.x > innerWidth - this.radius || this.x < this.radius) {
            this.dx = -this.dx;
        }
        if (this.y > innerHeight - this.radius || this.y < this.radius) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        if (Math.abs(mouse.x - this.x) < 50 && Math.abs(mouse.y - this.y) < 50 && this.radius < maxRadius) {
            this.radius += 1.7;
        } else if (this.radius > this.minRadius){
            this.radius -= 1.7;
        }
    }
}

let arr = [];
function init(){
    arr = [];
    for (let i=0; i<900; i++) {
        let radius = Math.random() * 3 + 2;
        let x = Math.random() * (innerWidth - 2 * radius) + radius;
        let y = Math.random() * (innerHeight - 2 * radius) + radius;
        let dx = (Math.random() - 0.5) * 2;
        let dy = (Math.random() - 0.5) * 2;
        arr.push(new Circle(x, y, dx, dy, radius, randColors));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let item of arr) {
        item.draw();
        item.update();
    }
}
init();
animate();
