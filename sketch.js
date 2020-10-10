var w = window.innerWidth,
    h = window.innerHeight,
    tools = document.querySelector(".tools-wrapper").offsetWidth;

function setup() { 
    let canvas = createCanvas(w-tools , h);   

    canvas.parent('canvas');
    canvas.style('display', 'block');
    background(100);
}

window.onresize = function () {
    w = window.innerWidth;
    h = window.innerHeight;  
    canvas.size(w-tools, h);
}

function draw() { 
    
}