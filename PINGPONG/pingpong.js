var canvas = document.getElementById("canvas")
var score = document.getElementById("score")
canvas.height = window.innerHeight - 15;
canvas.width = window.innerWidth - 15;
var ctx = canvas.getContext("2d")




class Ball {
	constructor(pos, radius, speed, color) {
		this.pos = pos
		this.radius = radius
		this.speed = speed
		this.color = color
	}
	draw() {
		ctx.beginPath()
		ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2*Math.PI, false)
		ctx.fillStyle = this.color
		ctx.fill()
	}

	move(x, y) {
		this.pos.x = x
		this.pos.y = y
		this.update()
	}

	update() {
		this.pos.x += this.speed.x
		this.pos.y += this.speed.y

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

class Paddle {
	constructor(pos, w, h, color, pointer=false) {
		this.x = pos.x
		this.y = pos.y
		this.h = h
		this.w = w
		this.color = color
		this.pointer = pointer
	}

	draw() {
		if (this.pointer) ctx.strokeRect(this.x, this.y, this.w, this.h)
		else {
			ctx.fillStyle = this.color
			ctx.fillRect(this.x, this.y, this.w, this.h)
		}
	}

	move(x) {
		this.x = x
		this.update()
	}

	update() {
		if (this.x + this.w >= canvas.width || this.x < 0)
			this.dx *= -1
		if (this.y + this.h >= canvas.height || this.y < 0)
			this.dy *= -1
		if (this.x + this.w > canvas.width)
			this.x = canvas.width - this.w
		else if (this.x < 0) this.x = 0

		if (this.y + this.h > canvas.height)
			this.y = canvas.height - this.h
		else if (this.y < 0) this.y = 0
		this.draw()
	}
}

class Game {
	constructor() {
		var paddle_height = 30
		var paddle_width = canvas.width / 7
		var paddle_x = (canvas.width - paddle_width) / 2
		var paddle_y = (canvas.height - paddle_height)
		var paddle_speed = canvas.width * 0.0048828125

		var ball_radius = canvas.width * 0.009765625
		var ball_speed = {x: canvas.width * 0.0029296875, y: canvas.width * 0.0048828125}

		if (ball_radius < 5) ball_radius = 5
		if (ball_speed.x < 2) ball_speed.x = 2
		if (ball_speed.y < 3) ball_speed.y = 3

		console.log(ball_radius, ball_speed)

		var ball = new Ball({x:100, y:200}, ball_radius, {x: ball_speed.x, y: ball_speed.y}, "grey")
		var paddle = new Paddle({x: paddle_x, y:paddle_y}, paddle_width, paddle_height, "red")

		this.ball = ball
		this.ball_speed = ball_speed
		this.paddle = paddle
		this.paddle_speed = paddle_speed
		this.key_right = false
		this.key_left = false
		this.score = 0
	}

	restart() {
		this.ball.pos.x = 100
		this.ball.pos.y = 100
		this.ball.speed = {x: this.ball_speed.x, y: this.ball_speed.y}
		this.ball.pos.y = 5
		this.paddle_speed = 5

		this.key_right = false
		this.key_left = false
	}
	
	check() {
		if (
			this.ball.pos.y + this.ball.radius >= canvas.height - this.paddle.h && 
			this.ball.pos.x - this.ball.radius >= this.paddle.x - 2*this.ball.radius &&
			this.ball.pos.x - this.ball.radius <= this.paddle.x + this.paddle.w
		) {
			this.ball.speed.y *= -1
			this.ball.pos.y = canvas.height - this.paddle.h - this.ball.radius
			this.update_score(true)
		}
		else if (this.ball.pos.y + this.ball.radius > canvas.height - this.paddle.h) {
			// alert("Game Over")
			this.update_score(false)
			this.restart()
		}
	}

	update() {
		if (this.key_left) {
			this.paddle.move(this.paddle.x - this.paddle_speed)
		}
		if (this.key_right) {
			this.paddle.move(this.paddle.x + this.paddle_speed)
		}
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		this.check()
		this.ball.update()
		this.paddle.update()
		this.inc_speed()
	}

	inc_speed() {
		this.ball.speed.x += this.ball.speed.x * 0.001
		this.ball.speed.y += this.ball.speed.y * 0.001
		this.paddle_speed += this.paddle_speed * 0.001
	}

	update_score(game) {
		if (game) {
			this.score++
		}
		else
			this.score = 0
		score.innerText = this.score
	}
}

var game = new Game()

function animate() {
	game.update()
	requestAnimationFrame(animate)
}


requestAnimationFrame(animate)

document.onkeydown = (e)=> {
	let key = e.key
	if (key == "ArrowLeft") {
		game.key_left = true
	}
	else if (key == "ArrowRight") {
		game.key_right = true
	}
}

document.onkeyup = (e)=> {
	let key = e.key
	if (key == "ArrowRight") {
		game.key_right = false
	}
	else if (key == "ArrowLeft") {
		game.key_left = false
	}
}
// setInterval(animate, 1000)
