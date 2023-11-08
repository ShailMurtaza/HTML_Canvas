const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth - 35;
canvas.height = window.innerHeight - 35;

var c = canvas.getContext("2d");

var radius = 23
var x = radius
var y = radius
var dx = 6.42
var dy = 6
//var dx = 7
//var dy = 8
//var dx = 10
//var dy = 10

var global_color = [{c: 0, i:2}, {c: 0, i:2}, {c: 50, i:20}] // colors
var global_color_ic = 0

class Circle {
    constructor(x, y, radius, fillColor, strokeColor) {
        this.x = x
        this.y = y
        this.fillColor = fillColor
        this.strokeColor = strokeColor
        this.radius = radius
    }


    // DRAW the circle according to new X and Y coordinates
    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false)
        c.fillStyle = this.fillColor
        c.fill()
        c.stroke()
    }

    // Move/change Circle's coordinates according to given parameters
    // When ever mouse move this function will be called
    // Meant to be just for Pointer Circle
    move (x, y) {
        this.x = x
        this.y = y
    }

    resize(radius) {
        this.radius = radius
    }
}

function ball_sound() {
    var audio = new Audio('ball.mp3');
    audio.play();
}


const ball = new Circle(0, 0, radius, "rgba(0, 0, 0, 0)", "black")

function Animate() {
    requestAnimationFrame(Animate)
    ball.fillColor = `rgba(${global_color[0].c}, ${global_color[1].c}, ${global_color[2].c}, 1)`
    ball.move(x, y)
    ball.draw()

    x += dx
    y += dy

    // Bounce
    if( x + radius > canvas.width || x < radius) {
        dx = -dx
        ball_sound()
    }
    if( y + radius > canvas.height || y < radius) {
        dy = -dy
        ball_sound()
    }


    // Change colors
    let my_color = global_color[global_color_ic]
    let new_color = my_color.c + my_color.i
    if (new_color > 255 || new_color < 0) {
        my_color.i *= -1
        new_color = my_color.c + my_color.i
        global_color_ic = (global_color_ic+1) % 3
    }
    my_color.c = new_color
    // console.log(global_color[0].c, global_color[1].c, global_color[2].c, global_color_ic)
}

 Animate()


