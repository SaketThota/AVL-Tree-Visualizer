var w = window.innerWidth,
    h = window.innerHeight,
    toolsWidth = document.querySelector(".tools-wrapper").offsetWidth,
    toolsHeight = document.querySelector(".tools-wrapper").offsetHeight;

var tree, inputs = new Array(10), directions = [], nodes = [];
 
function setup() { 
    let canvas = createCanvas(w-toolsWidth , Math.max(h,toolsHeight));   
    canvas.parent('canvas');
    canvas.style('display', 'block');
    textFont('Helvetica');
    textStyle(BOLD);
    textAlign(CENTER);
    background(0);
    
    tree = new Tree();

    for (let i = 0; i < inputs.length; ++i) { 
        inputs[i] = Math.round(random(1, 50));
        tree.insertNode(inputs[i]);
    }
}

function windowResized() {
    w = window.innerWidth;
    h = window.innerHeight;  
    resizeCanvas(w-toolsWidth, Math.max(h,toolsHeight));
}
