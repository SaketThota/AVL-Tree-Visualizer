var w = window.innerWidth,
    h = window.innerHeight,
    toolsWidth = document.querySelector(".tools-wrapper").offsetWidth,
    toolsHeight = document.querySelector(".tools-wrapper").offsetHeight;

var tree, inputs = new Array(15), directions = [], nodes = [];
 
function setup() { 
    let canvas = createCanvas(w-toolsWidth , Math.max(h,toolsHeight));   
    canvas.parent('canvas');
    canvas.style('display', 'block');
    textFont('Helvetica');
    textStyle(BOLD);
    textAlign(CENTER);
    background(0);
    
    tree = new Tree();
}

function windowResized() {
    w = window.innerWidth;
    h = window.innerHeight;  
    resizeCanvas(w-toolsWidth, Math.max(h,toolsHeight));
}
