const canvas = document.getElementById('canvas');
canvas.height = window.innerHeight - 15;
canvas.width = window.innerWidth - 15;
const ctx = canvas.getContext('2d');
const length = 10

class Node {
    constructor(x, y, color) {
        this.x = x
        this.y = y
        this.color = color
    }
}

function create_nodes() {
    let space = 3
    ctx.strokeStyle = "black"
    ctx.fillStyle = "red"
    ctx.lineWidth = 0

    cols = Math.floor(canvas.width / (length+space))
    rows = Math.floor(canvas.height / (length+space))
    //cols = 3
    // rows = 2
    let nodes = Array()
    for (let i=0;i<rows;i++) {
        let node_row = Array()
        for (let j=0;j<cols;j++) {
            let x = space + (space + length) * j
            let y =  space + (space + length) * i
            let node = new Node(x, y, "white")
            node_row.push(node)
        }
        nodes.push(node_row)
    }
    return nodes
}

function draw_nodes() {
    ctx.strokeStyle = "black"
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i=0;i<nodes.length;i++) {
        for (let j=0;j<nodes[i].length;j++) {
            let node = nodes[i][j]
            ctx.fillStyle = node.color
            ctx.strokeRect(node.x+0.50, node.y+0.50, length, length)
            ctx.fillRect(node.x+1, node.y+1, length-1, length-1)
        }
    }
    requestAnimationFrame(draw_nodes)
}

function get_node(x, y) {
    for (let i=0;i<nodes.length;i++) {
        for (let j=0;j<nodes[i].length;j++) {
            let node = nodes[i][j]
            if (
                x >= node.x && x <= node.x + length + 3 &&
                y >= node.y && y <= node.y + length + 3) {
                return node
            }
        }
    }
    return false
}

function select_node(x, y) {
    const rect = canvas.getBoundingClientRect();
    x = x - rect.left
    y = y - rect.top
    node = get_node(x, y)
    if (node != false) {
        node.color = "red"
    }
}


function handle_mouse_move(event) {
    select_node(event.clientX, event.clientY)
}

function handle_mouse_down(event) {
    select_node(event.clientX, event.clientY)
    canvas.addEventListener('mousemove', handle_mouse_move);
}

var nodes = create_nodes()
draw_nodes(nodes)
canvas.addEventListener('mousedown', handle_mouse_down);
canvas.addEventListener('mouseup', ()=>{canvas.removeEventListener('mousemove', handle_mouse_move)});
canvas.addEventListener('mouseout', ()=>{canvas.removeEventListener('mousemove', handle_mouse_move)});

