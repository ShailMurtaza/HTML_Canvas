class Canvas {
    #canvas
    #height
    #width
    #ctx
    constructor (canvas_id) {
        this.#canvas = document.getElementById(canvas_id)
        this.#height = document.body.clientHeight - 17
        this.#width = document.body.clientWidth - 14
        this.#canvas.height = this.#height
        this.#canvas.width = this.#width
        this.#ctx = /** @type {HTMLCanvasElement} */ this.#canvas.getContext('2d')
    }

    w() {
        return this.#width
    }

    h() {
        return this.#height
    }

    line(x1, y1, x2, y2, color="black", line_width=2) {
        this.#ctx.beginPath()
        this.#ctx.moveTo(x1, y1)
        this.#ctx.lineTo(x2, y2)
        this.#ctx.strokeStyle = color
        this.#ctx.lineWidth = line_width
        this.#ctx.stroke()
    }
    write(text, x, y, font, color) {
        this.#ctx.fillStyle = color
        this.#ctx.font = font
        this.#ctx.fillText(text, x, y)
    }

    clear() {
        this.#ctx.clearRect(0, 0, this.#width, this.#height)
    }
}

class Plane extends Canvas {
    #unit = 50
    #unit_point = 1
    #origin
    constructor(canvas_id) {
        super(canvas_id)
        this.#origin = {x: this.w()/2, y: this.h()/2}
        this.draw_axis()
        this.draw_points()
    }

    draw_axis(color="black") {
        const line_width = 3
        const width = this.w()
        const height = this.h()
        const o = this.#origin
        this.line(o.x, 0, o.x, height, color, line_width) // x-axis
        this.line(0, o.y, width, o.y, color, line_width) // y-axis
    }

    draw_points() {
        const o = this.#origin
        const length = 5 // length of each line(point)
        const font = "13px Arial"

        const n_x = (Math.floor(o.x/this.#unit) + 1)
        const y = o.y
        let pos = o.x - (n_x*this.#unit)
        for (let i=0;i<n_x*2;i++) {
            this.line(pos, y-length, pos, y+length)
            let n = i-n_x
            if (n != 0) this.write(n, pos-4, y+length+13, font, "black")
            pos += this.#unit
        }

        const n_y = (Math.floor(o.y/this.#unit) + 1)
        const x = o.x
        pos = o.y - (n_y*this.#unit)
        for (let i=0;i<n_y*2;i++) {
            this.line(x-length, pos, x+length, pos)
            let n = i-n_y
            if (n != 0) this.write(n, x+length+5, pos+5, font, "black")
            pos += this.#unit
        }
    }
}

const plane = new Plane("canvas")

