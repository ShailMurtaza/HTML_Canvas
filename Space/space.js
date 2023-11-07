var canvas = document.getElementById("canvas")
canvas.style.backgroundColor = "black"
canvas.height = window.innerHeight - 15;
canvas.width = window.innerWidth - 15;
var ctx = canvas.getContext("2d")
const RADIUS = 2
const TWO_PI = 2*Math.PI



class Star {
	constructor(pos, radius, speed) {
		this.pos = pos
		this.const_pos = {x: pos.x, y: pos.y, z: pos.z}
		this.radius = radius * random(2)
		
		if (speed.x < 1) {
			speed.x += 1
		}

		this.speed = speed
		this.color = "rgba(255, 255, 255, 0.3)"
		this.opacity = 0
	}
	draw() {
		ctx.beginPath()
		let radius = this.radius / this.pos.z * 500
		ctx.arc(this.pos.x, this.pos.y, radius, 0, TWO_PI, false)
		ctx.fillStyle = this.color
		ctx.fill()
	}

	move(x, y, z) {
		this.pos.x = x
		this.pos.y = y
		this.pos.z = z
	}

	reset() {
		this.pos.x = random(canvas.width) / 1
		this.pos.y = random(canvas.height) / 1
		this.pos.z = this.const_pos.z
	}

	update() {
		this.opacity = random(1) * random(1)
		this.color = `rgba(255, 255, 255, ${this.opacity})`
		this.pos.x += this.speed.x
		this.pos.y += this.speed.y
		this.pos.z /= 1.001
		// this.pos.z -= this.speed.z
		

		if (this.pos.x >= canvas.width + this.radius)
			this.reset()
		if (this.pos.y >= canvas.height + this.radius)
			this.reset()
		if (this.pos.z < 2)
			this.reset()

		this.draw()
	}
}
var h = canvas.height
class Space {
	constructor() {
		let num_stars = canvas.width
		this.stars = []
		for (let i=0;i<num_stars;i++) {
			let x = random(canvas.width / 100)
			let y = random(canvas.height / 50)
			let z = 1024
			let star = new Star({x: x, y:y, z:z}, RADIUS, {x: random(4), y: random(3), z: random(0.03)})
			this.stars.push(star)
		}
	}

	draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		this.stars.forEach((star)=> {
			star.update()
		})
	}
}

function random(val) {
	return Math.random() * (val + 1)
}

var space = new Space()


function animate() {
	space.draw()
	requestAnimationFrame(animate)
}

requestAnimationFrame(animate)

// bi723263

