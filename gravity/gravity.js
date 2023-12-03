var canvas = document.getElementById("canvas")
var score = document.getElementById("score")
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
	constructor(pos, radius, speed, color) {
		this.pos = pos
		this.radius = radius
		this.speed = speed
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
			// ctx.stroke()
		}// 717246
	}


	move(x, y) {
		if (x>0) this.pos.x = x
		if (y>0) this.pos.y = y
		this.update()
	}

	update() {
		let angle = 0 * Math.PI/180 * -1
		this.pos.x += this.speed.x * Math.cos(angle)
		// this.pos.y += this.speed.y * Math.sin(angle)
		if (!this.pointer) {
			// this.pos.x += this.speed.x
			this.pos.y += this.speed.y
			this.speed.y += 0.1
			// this.speed.x /= 1.006
		}
		if (this.pos.x + this.radius >= canvas.width) {
			this.speed.x *= -1
			this.pos.x = canvas.width - this.radius
		}
		else if (this.pos.x <= this.radius) {
			this.speed.x *= -1
			this.pos.x = this.radius
		}

		if (this.pos.y + this.radius >= canvas.height) {
			this.speed.y *= -1
			this.pos.y = canvas.height - this.radius
		}
		else if (this.pos.y <= this.radius) {
			this.speed.y *= -1
			this.pos.y = this.radius
		}
		this.draw()
	}
}

class Gravity {
	constructor(objects, g) {
		this.objects = objects
		this.g = g
	}

	update() {
		this.objects.forEach(
			(obj)=> {
				obj.move(-1, obj.pos.y + this.g)
				obj.update()
			}
		)
	}
}

function newBall(coor, radius, speed, color) {
		let ball =  new Ball(coor, radius, speed, color)
		ball_array.push(ball)
	}
	
function mouseMove(event) {
	let x = event.clientX
	let y = event.clientY
	pointer.move(x, y)
}

function mouseClick(event) {
	let color = getColor()
	let coor = {x: pointer.pos.x, y:pointer.pos.y}
	let speed = {x: 5, y: 1}
	newBall(coor, pointer.radius, speed, color)
}

function getColor() {
	i++;
	i = i % (colors.length - 1)
	return colors[i]
}

var pointer = new Ball({x: canvas.width/2, y: canvas.height/2}, 20, {x: 0, y: 0}, "grey")
pointer.pointer = true
pointer.draw()
var gravity = new Gravity(ball_array, 1)

canvas.onmousemove = mouseMove
canvas.onclick = mouseClick

function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	//ball_array.forEach((ball)=> {
	//	ball.update()
	//})
	gravity.update()
	pointer.update()
	requestAnimationFrame(animate)
}
animate()
