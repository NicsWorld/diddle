let isDrawing = false;
let x = 0;
let y = 0;
let globalAlphaValue = 1.0;
if (document.readyState === "complete" || document.readyState === "interactive") {
    makeCanvas();
}
function makeCanvas() {
    let canvas = document.createElement("canvas");
    canvas.setAttribute("id", "drawingcanvas");
    canvas.style.position = "fixed";
    canvas.style.transition = '1.5s ease-in-out';
    canvas.setAttribute('width', 0);
    canvas.setAttribute('height', 0);
    document.body.insertBefore(canvas, document.body.firstChild);
}

function handleMove(e) {
    let existingCanvas = document.getElementById("drawingcanvas");
    let context = existingCanvas.getContext('2d');
       if (isDrawing) {
           drawLine(context, x, y, e.offsetX, e.offsetY);
           x = e.offsetX;
           y = e.offsetY;
       } 
}

window.onmousedown = (event) => {
    if (event.which === 2 && event.ctrlKey) {
        let canvas = document.getElementById("drawingcanvas");
        let imgURL = chrome.extension.getURL("images/lizardFinal.gif");
        console.log(imgURL);
        x = event.offsetX;
        y = event.pagoffsetYeY;
        isDrawing = true;
        canvas.style.opacity = 1;
        canvas.style.zIndex = "1000000000";
        canvas.style.overflow = "hidden";
        canvas.setAttribute('width', screen.width);
        canvas.setAttribute('height', screen.height);
        window.addEventListener("mousemove", handleMove);
    }
}
window.addEventListener('mouseup', e => {
    window.removeEventListener("mousemove", handleMove);
    let existingCanvas = document.getElementById("drawingcanvas");
    let context = existingCanvas.getContext('2d');

    handleAlphaChange();
    if (isDrawing === true) {
      drawLine(context, x, y, e.offsetX, e.offsetY);
      x = 0;
      y = 0;
      isDrawing = false;
    }
  });

  function drawLine(context, x1, y1, x2, y2) {
    context.beginPath();
    
    context.globalAlpha = 1;
    context.strokeStyle = "rgb(0,200,127)";
    context.lineWidth = 16;
    context.lineCap = "round"; 
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
  }

  function handleAlphaChange() {
    let existingCanvas = document.getElementById("drawingcanvas");
    existingCanvas.style.opacity = 0;
    console.log("we should have set it!", existingCanvas.style.opacity); 
    setTimeout(() => {
        existingCanvas.setAttribute('width', 0);
        existingCanvas.setAttribute('height', 0);
        existingCanvas.style.zIndex = "-100000000";
    }, 1500);
  }