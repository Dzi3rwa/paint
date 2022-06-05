const canvas = document.getElementById("canvas")
canvas.width = window.innerWidth - 60
canvas.height = 400

let context = canvas.getContext("2d")
let start_background_color = "white"
context.fillStyle = start_background_color
context.fillRect(0, 0, canvas.width, canvas.height)

let draw_color = "black"
let draw_width = document.getElementById("range").value
let is_drawing = false

let restore_array = [];
let index = -1;

function change_color(element) {
    draw_color = element.style.backgroundColor
}

function clear_canvas() {
    context.fillStyle = start_background_color
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.fillRect(0, 0, canvas.width, canvas.height)

    restore_array = [];
    index = -1;
}

function undo_last() {
    if (index <= 0) {
        clear_canvas()
    } else {
        index -= 1
        restore_array.pop()
        context.putImageData(restore_array[index], 0, 0)
    }
}

document.getElementById("download").addEventListener("click", () => {
    const link = document.createElement('a');
    link.download = 'paint.png';
    link.href = canvas.toDataURL();
    link.click();
    link.delete;
})

//pen
let penKlik = 0
document.getElementById("pen").addEventListener("click", () => {
    if (penKlik % 2 == 0) {
        document.getElementById("square").disabled = true
        document.getElementById("circle").disabled = true
        document.getElementById("line").disabled = true
        document.getElementById("pen").style.background = "green"
        canvas.addEventListener("touchstart", start, false)
        canvas.addEventListener("touchmove", draw, false)
        canvas.addEventListener("mousedown", start, false)
        canvas.addEventListener("mousemove", draw, false)
        canvas.addEventListener("touchend", stop, false)
        canvas.addEventListener("mouseup", stop, false)
        canvas.addEventListener("mouseout", stop, false)
    } else {
        document.getElementById("square").disabled = false
        document.getElementById("circle").disabled = false
        document.getElementById("line").disabled = false
        document.getElementById("pen").style.background = "black"
        canvas.removeEventListener("touchstart", start)
        canvas.removeEventListener("touchmove", draw)
        canvas.removeEventListener("mousedown", start)
        canvas.removeEventListener("mousemove", draw)
        canvas.removeEventListener("touchend", stop)
        canvas.removeEventListener("mouseup", stop)
        canvas.removeEventListener("mouseout", stop)
    }
    penKlik += 1
})

function start(event) {
    is_drawing = true
    context.beginPath()
    context.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop)
    event.preventDefault()
}

function draw(event) {
    if (is_drawing) {
        context.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop)
        context.strokeStyle = draw_color
        context.lineWidth = draw_width
        context.lineCap = "round"
        context.lineJoin = "round"
        context.stroke()
    }
    event.preventDefault()
}

function stop(event) {
    if (is_drawing) {
        context.stroke()
        context.closePath()
        is_drawing = false
    }
    event.preventDefault()

    if (event.type != "mouseout") {
        restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height))
        index += 1
    }
}


//rectangle
let rectangleKlik = 0
document.getElementById("square").addEventListener("click", () => {
    if (rectangleKlik % 2 == 0) {
        document.getElementById("pen").disabled = true
        document.getElementById("circle").disabled = true
        document.getElementById("line").disabled = true
        document.getElementById("square").style.background = "green"
        canvas.addEventListener("touchstart", startSquare, false)
        canvas.addEventListener("touchmove", drawSquare, false)
        canvas.addEventListener("mousedown", startSquare, false)
        canvas.addEventListener("mousemove", drawSquare, false)
        canvas.addEventListener("touchend", stopSquare, false)
        canvas.addEventListener("mouseup", stopSquare, false)
        canvas.addEventListener("mouseout", stopSquare, false)
    } else {
        document.getElementById("pen").disabled = false
        document.getElementById("circle").disabled = false
        document.getElementById("line").disabled = false
        document.getElementById("square").style.background = "black"
        canvas.removeEventListener("touchstart", startSquare)
        canvas.removeEventListener("touchmove", drawSquare)
        canvas.removeEventListener("mousedown", startSquare)
        canvas.removeEventListener("mousemove", drawSquare)
        canvas.removeEventListener("touchend", stopSquare)
        canvas.removeEventListener("mouseup", stopSquare)
        canvas.removeEventListener("mouseout", stopSquare)
    }
    rectangleKlik += 1
})

let klik = false
let tab = []
let tab2 = []
let checkbox1 = document.getElementById("inputCheckbox1").checked
let checkbox2 = document.getElementById("inputCheckbox2").checked

function startSquare() {
    klik = true
}
function stopSquare(e) {
    if (klik) {
        const position = { x: e.clientX - 30, y: e.clientY - 30 }
        tab.push(position)
        context.beginPath()
        context.lineWidth = 2
        if (checkbox2) {
            if (checkbox1) {
                context.fillStyle = draw_color
                context.fillRect(tab[0].x, tab[0].y, position.x - tab[0].x, position.x - tab[0].x)
            } else {
                context.strokeStyle = draw_color
                context.rect(tab[0].x, tab[0].y, position.x - tab[0].x, position.x - tab[0].x)
            }
        } else {
            if (checkbox1) {
                context.fillStyle = draw_color
                context.fillRect(tab[0].x, tab[0].y, position.x - tab[0].x, position.y - tab[0].y)
            } else {
                context.strokeStyle = draw_color
                context.rect(tab[0].x, tab[0].y, position.x - tab[0].x, position.y - tab[0].y)
            }
        }
        context.stroke();
    }
    if (e.type != "mouseout") {
        restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height))
        index += 1
    }
    klik = false
    tab.length = 0
    tab2.length = 0
}
function drawSquare(e) {
    if (klik) {
        checkbox1 = document.getElementById("inputCheckbox1").checked
        checkbox2 = document.getElementById("inputCheckbox2").checked
        const position = { x: e.clientX - 30, y: e.clientY - 30 }
        tab.push(position)
        if (tab2.length < 2) {
            context.beginPath()
            context.lineWidth = 2
            if (checkbox2) {
                if (checkbox1) {
                    context.fillStyle = draw_color
                    context.fillRect(tab[0].x, tab[0].y, position.x - tab[0].x, position.x - tab[0].x)
                } else {
                    context.strokeStyle = draw_color
                    context.rect(tab[0].x, tab[0].y, position.x - tab[0].x, position.x - tab[0].x)
                }
            } else {
                if (checkbox1) {
                    context.fillStyle = draw_color
                    context.fillRect(tab[0].x, tab[0].y, position.x - tab[0].x, position.y - tab[0].y)
                } else {
                    context.strokeStyle = draw_color
                    context.rect(tab[0].x, tab[0].y, position.x - tab[0].x, position.y - tab[0].y)
                }
            }
            context.stroke();
            tab2.push(context.getImageData(0, 0, canvas.width, canvas.height))
        } else {
            context.putImageData(tab2[tab2.length - 2], 0, 0)
            tab2.pop()
        }
    }
}

//circle
let circleKlik = 0
document.getElementById("circle").addEventListener("click", () => {
    if (circleKlik % 2 == 0) {
        document.getElementById("pen").disabled = true
        document.getElementById("square").disabled = true
        document.getElementById("line").disabled = true
        document.getElementById("circle").style.background = "green"
        canvas.addEventListener("touchstart", startCircle, false)
        canvas.addEventListener("touchmove", drawCircle, false)
        canvas.addEventListener("mousedown", startCircle, false)
        canvas.addEventListener("mousemove", drawCircle, false)
        canvas.addEventListener("touchend", stopCircle, false)
        canvas.addEventListener("mouseup", stopCircle, false)
        canvas.addEventListener("mouseout", stopCircle, false)
    } else {
        document.getElementById("pen").disabled = false
        document.getElementById("square").disabled = false
        document.getElementById("line").disabled = false
        document.getElementById("circle").style.background = "black"
        canvas.removeEventListener("touchstart", startCircle)
        canvas.removeEventListener("touchmove", drawCircle)
        canvas.removeEventListener("mousedown", startCircle)
        canvas.removeEventListener("mousemove", drawCircle)
        canvas.removeEventListener("touchend", stopCircle)
        canvas.removeEventListener("mouseup", stopCircle)
        canvas.removeEventListener("mouseout", stopCircle)
    }
    circleKlik += 1
})

function startCircle() {
    klik = true
}
function stopCircle(e) {
    if (klik) {
        const position = { x: e.clientX - 30, y: e.clientY - 30 }
        tab.push(position)
        context.beginPath()
        context.lineWidth = 2
        if (checkbox2) {
            if (checkbox1) {
                context.fillStyle = draw_color
                context.strokeStyle = draw_color
                context.arc(tab[0].x, tab[0].y, position.x - tab[0].x, 0, 2 * Math.PI)
                context.fill()
            } else {
                context.strokeStyle = draw_color
                context.strokeStyle = draw_color
                context.arc(tab[0].x, tab[0].y, position.x - tab[0].x, 0, 2 * Math.PI)
            }
        } else {
            if (checkbox1) {
                context.fillStyle = draw_color
                context.strokeStyle = draw_color
                drawOval(tab[0].x, tab[0].y, position.x - tab[0].x, position.y - tab[0].y, 1000, draw_color);
                context.fill()
            } else {
                context.strokeStyle = draw_color
                context.strokeStyle = draw_color
                drawOval(tab[0].x, tab[0].y, position.x - tab[0].x, position.y - tab[0].y, 1000, draw_color);
            }
        }
        context.stroke();
    }
    if (e.type != "mouseout") {
        restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height))
        index += 1
    }
    klik = false
    tab.length = 0
    tab2.length = 0
}

function drawCircle(e) {
    if (klik) {
        checkbox1 = document.getElementById("inputCheckbox1").checked
        checkbox2 = document.getElementById("inputCheckbox2").checked
        const position = { x: e.clientX - 30, y: e.clientY - 30 }
        tab.push(position)
        if (tab2.length < 2) {
            context.beginPath()
            context.lineWidth = 2
            if (checkbox2) {
                if (checkbox1) {
                    context.fillStyle = draw_color
                    context.strokeStyle = draw_color
                    context.arc(tab[0].x, tab[0].y, position.x - tab[0].x, 0, 2 * Math.PI)
                    context.fill()
                } else {
                    context.strokeStyle = draw_color
                    context.strokeStyle = draw_color
                    context.arc(tab[0].x, tab[0].y, position.x - tab[0].x, 0, 2 * Math.PI)
                }
            } else {
                if (checkbox1) {
                    context.fillStyle = draw_color
                    context.strokeStyle = draw_color
                    drawOval(tab[0].x, tab[0].y, position.x - tab[0].x, position.y - tab[0].y, 1000, draw_color);
                    context.fill()
                } else {
                    context.strokeStyle = draw_color
                    drawOval(tab[0].x, tab[0].y, position.x - tab[0].x, position.y - tab[0].y, 1000, draw_color);
                }
            }
            context.stroke();
            tab2.push(context.getImageData(0, 0, canvas.width, canvas.height))
        } else {
            context.putImageData(tab2[tab2.length - 2], 0, 0)
            tab2.pop()
        }
    }
}
const drawOval = function (x, y, w, h, liczbaPunktow, strokeStyle) {
    const a = w / 2
    const b = h / 2
    context.save()
    context.beginPath();
    context.strokeStyle = strokeStyle
    context.translate(x + a, y + b)
    let x2
    let y2
    for (let i = 0; i < liczbaPunktow; i++) {
        const t = i * Math.PI / 360
        x2 = a * Math.cos(t)
        y2 = b * Math.sin(t)
        context.lineTo(Math.floor(x2), Math.floor(y2))
    }
    context.stroke();
    context.restore();
}

//line
let lineKlik = 0
document.getElementById("line").addEventListener("click", () => {
    if (lineKlik % 2 == 0) {
        document.getElementById("square").disabled = true
        document.getElementById("circle").disabled = true
        document.getElementById("pen").disabled = true
        document.getElementById("line").style.background = "green"
        canvas.addEventListener("touchstart", startLine, false)
        canvas.addEventListener("touchmove", drawLine, false)
        canvas.addEventListener("mousedown", startLine, false)
        canvas.addEventListener("mousemove", drawLine, false)
        canvas.addEventListener("touchend", stopLine, false)
        canvas.addEventListener("mouseup", stopLine, false)
        canvas.addEventListener("mouseout", stopLine, false)
    } else {
        document.getElementById("square").disabled = false
        document.getElementById("circle").disabled = false
        document.getElementById("pen").disabled = false
        document.getElementById("line").style.background = "black"
        canvas.removeEventListener("touchstart", startLine)
        canvas.removeEventListener("touchmove", drawLine)
        canvas.removeEventListener("mousedown", startLine)
        canvas.removeEventListener("mousemove", drawLine)
        canvas.removeEventListener("touchend", stopLine)
        canvas.removeEventListener("mouseup", stopLine)
        canvas.removeEventListener("mouseout", stopLine)
    }
    lineKlik += 1
})

function startLine() {
    klik = true
}
function stopLine(e) {
    if (klik) {
        const position = { x: e.clientX, y: e.clientY }
        tab.push(position)
        context.beginPath()
        context.strokeStyle = draw_color
        context.lineWidth = draw_width
        context.moveTo(tab[0].x - 30, tab[0].y - 30)
        context.lineTo(position.x - 30, position.y - 30)
        context.stroke();
    }
    if (e.type != "mouseout") {
        restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height))
        index += 1
    }
    console.log(tab[0])
    klik = false
    tab.length = 0
    tab2.length = 0
}
function drawLine(e) {
    if (klik) {
        const position = { x: e.clientX, y: e.clientY }
        tab.push(position)
        if (tab2.length < 2) {
            context.beginPath()
            context.strokeStyle = draw_color
            context.lineWidth = draw_width
            context.moveTo(tab[0].x - 30, tab[0].y - 30)
            context.lineTo(position.x - 30, position.y - 30)
            context.stroke();
            tab2.push(context.getImageData(0, 0, canvas.width, canvas.height))
        } else {
            context.putImageData(tab2[tab2.length - 2], 0, 0)
            tab2.pop()
        }
    }
}

