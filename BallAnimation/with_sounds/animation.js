const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth - 35;
canvas.height = window.innerHeight - 35;

var c = canvas.getContext("2d");

var radius = 10
var x = radius
var y = radius
var dx = 6.42
var dy = 15
//dx = 5
//dy = 5
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

function ball_sound(balance) {
    const audio = new Audio('ball.mp3')
    const audioCtx = new AudioContext()
    const track = audioCtx.createMediaElementSource(audio)
    const stereoNode = new StereoPannerNode(audioCtx, { pan: balance })
    track.connect(stereoNode).connect(audioCtx.destination)
    audio.play();
}


const global_ball = new Circle(0, 0, radius, "rgba(0, 0, 0, 0)", "black")

function Animate() {
    requestAnimationFrame(Animate)
    global_ball.fillColor = `rgba(${global_color[0].c}, ${global_color[1].c}, ${global_color[2].c}, 1)`
    global_ball.move(x, y)
    global_ball.draw()

    x += dx
    y += dy

    // Bounce
    let collision = false
    if( x + radius > canvas.width || x < radius) {
        dx = -dx
        collision = true
    }
    if( y + radius > canvas.height || y < radius) {
        dy = -dy
        collision = true
    }
    if (collision) {
        let balance = calc_balance()
        ball_sound(balance)
    }


    // Change colors
    ch_color()
    // console.log(global_color[0].c, global_color[1].c, global_color[2].c, global_color_ic)
}


function ch_color() {
    let my_color = global_color[global_color_ic]
    let new_color = my_color.c + my_color.i
    if (new_color > 255 || new_color < 0) {
        my_color.i *= -1
        new_color = my_color.c + my_color.i
        global_color_ic = (global_color_ic+1) % 3
    }
    my_color.c = new_color
}


function calc_balance() {
    let full_width = canvas.width
    // Left side of balance is not properly measured because radius is being added in x position.
    // But is is good enough for now.
    let balance = ((global_ball.x+global_ball.radius) * 2/full_width) - 1
    return balance
}


document.body.addEventListener("click", Animate,{once:true})

