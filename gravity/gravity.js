var canvas = document.getElementById("canvas")
canvas.height = window.innerHeight - 15;
canvas.width = window.innerWidth - 15;
var ctx = canvas.getContext("2d")
var ball_array = []
var i = 0
var colors = [
    "rgba(150, 255, 00, 1)",
    "rgba(0, 130, 255, 1)",
    "rgba(255, 10, 255, 1)",
    "rgba(175, 100, 255, 1)",
    "rgba(40,  255, 230, 1)"
]


class Ball {
    constructor(pos, radius, speed, force, color) {
        this.pos = pos
        this.radius = radius
        this.speed = speed
        this.force = force
        this.color = color
        this.pointer = false
    }
    draw() {
        ctx.beginPath()
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2*Math.PI, false)
        if (!this.pointer) {
            ctx.fillStyle = this.color
            ctx.fill()
        }
        else {
            ctx.stroke()
        }
    }


    move(x, y) {
        if (x>=0) this.pos.x = x
        if (y>=0) this.pos.y = y
    }

    update() {
        let collision = {x: false, y: false}
        if (this.pos.x + this.radius >= canvas.width) {
            this.pos.x = canvas.width - this.radius
            collision.x = true
        }
        else if (this.pos.x <= this.radius) {
            this.pos.x = this.radius
            collision.x = true
        }


        if (this.pos.y + this.radius >= canvas.height) {
            this.pos.y = canvas.height - this.radius
            collision.y = true
        }
        else if (this.pos.y <= this.radius) {
            this.pos.y = this.radius
            collision.y = true
        }
        this.draw()
        return collision
    }
}

function deg_to_rad(a) {
    return a * Math.PI/180 * -1
}

class Gravity {
    constructor(objects, g) {
        this.objects = objects
        this.g = g
    }

    update() {
        this.objects.forEach(
            (obj)=> {
                let force_dir_1 = {x: Math.cos(deg_to_rad(270)), y: Math.sin(deg_to_rad(270))}
                let force_dir_2 = {x: Math.cos(deg_to_rad(150)), y: Math.sin(deg_to_rad(150))}
                let pos_x = obj.pos.x + obj.speed.x * force_dir_1.x + ( obj.force.x * force_dir_2.x )
                let pos_y = obj.pos.y + obj.speed.y * force_dir_1.y + ( obj.force.y * force_dir_2.y )
                obj.move(pos_x, pos_y)
                let coll = obj.update()
                if  (coll.y) {
                    obj.speed.y *= -0.7
                    obj.force.y *= -0.9
                }
                if (coll.x) {
                    obj.speed.y *= 0.99
                    obj.force.x *= -0.7
                }
                obj.speed.y += this.g
                obj.force.y *= 0.9
                obj.force.x *= 0.99
            }
        )
    }
}

function newBall(coor, radius, speed, force, color) {
    let ball =  new Ball(coor, radius, speed, force, color)
    ball_array.push(ball)
}

function mouseMove(event) {
    let x = event.clientX
    let y = event.clientY
    pointer.move(x, y)
}

function mouseClick() {
    let color = getColor()
    let coor = {x: pointer.pos.x, y:pointer.pos.y}
    let speed = {x: 0, y: 10}
    let force = {x: 10, y: 50}
    newBall(coor, pointer.radius, speed, force, color)
}

function getColor() {
    i++;
    i = i % (colors.length - 1)
    return colors[i]
}

var pointer = new Ball({x: canvas.width/2, y: canvas.height/2}, 20, {x: 0, y: 0}, "grey")
pointer.pointer = true
pointer.draw()
var gravity = new Gravity(ball_array, .7)

canvas.onmousemove = mouseMove
canvas.onclick = mouseClick

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    gravity.update()
    pointer.update()
    requestAnimationFrame(animate)
}
animate()

