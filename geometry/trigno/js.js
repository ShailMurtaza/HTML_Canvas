var canvas = document.getElementById("canvas")
var interval_count = document.getElementById("interval_count")
var border_width = 2
var height = document.body.clientHeight - 15
var width = document.body.clientWidth - 10

canvas.style.border = border_width + "px solid red"
canvas.height = height
canvas.width = width

var colors = ["red", "green", "blue"]
var color_index = 0

var ctx = /** @type {HTMLCanvasElement} */ canvas.getContext('2d')

function line(ctx, x1, y1, x2, y2, color, line_width=2) {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.strokeStyle = color
    ctx.lineWidth = line_width + 0.5
    ctx.stroke()
}

function draw_axis() {
    let line_width = 5
    line(ctx, width, height/2, 0, height/2, "black", line_width)
    line(ctx, width/2, height, width/2, 0, "black", line_width)
}

var prev = {x: width/2, y:height/2}
function graph(t=0) {
    
    let x1 = prev.x
    let y1 = prev.y

    let x2 = width/2 + t - width/2
    // if (x2 > width) stop()
    let y2 = height/2 - Math.sin(t*Math.PI/180*3)*100
    prev.x = x2
    prev.y = y2

    // console.log(x2 - width/2, y2 + width/2)
    // console.log("LINE LENGTH: ", Math.sqrt(Math.pow((x1-x2), 2) + Math.pow((y2-y1), 2)))
    let angle = t%360
    console.log(`SIN(${angle}): ${Math.sin(t*Math.PI/180)} X2: ${x2}`)
    //if (t%360 == 270 || t%360 == 90) {
    //    stop()
    //}
    let color = colors[color_index++%colors.length]
    /*
    if (angle <= 45 && angle >= 0) {
        color = "rgba(255, 0, 0, 1)"
    }
    if (angle > 45 && angle <= 90) {
        color = "rgba(0, 0, 255, 1)"
    }
    if (angle > 90 && angle <= 135)
    {
        color = "rgba(0, 255, 0 ,1)"
    }
    if (angle > 135 && angle <= 180) {
        color = "rgba(130, 100, 50, 1)"
    }
    if (angle > 180 && angle <= 225) {
        color = "rgba(130, 100, 50, 1)"
    }
    */
    line(ctx, x1, y1, x2, y2, color)
}

draw_axis()
function clear_plane() {
    ctx.clearRect(0, 0, width, height)
    draw_axis()
}
function reset_plane() {
    while(intervals.length) { stop() }
    prev.x  = width/2
    prev.y  = height/2
    t = 0
    clear_plane()
}
var t = 0;

function update_graph() {
    graph(t)
    t += 5
    // requestAnimationFrame(update_graph)
}

var intervals = []

function start() {
    intervals.push(setInterval(update_graph, 2000/60))
    interval_count_update()
}

function stop() {
    if (intervals.length) {
        clearInterval(intervals.pop())
        interval_count_update()
    }
}

function interval_count_update() {
    interval_count.innerText = intervals.length
}
