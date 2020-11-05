var w = window.innerWidth,
    h = window.innerHeight,
    toolsWidth = document.querySelector(".tools-wrapper").offsetWidth,
    toolsHeight = document.querySelector(".tools-wrapper").offsetHeight;

var tree, inputs = [100 , 20 ,200 , 10 , 150 ,30 ,   300], directions = [], nodes = [];
 
function setup() { 
    let canvas = createCanvas(w-toolsWidth , Math.max(h,toolsHeight));   
    canvas.parent('canvas');
    canvas.style('display', 'block');
    textFont('Helvetica');
    textStyle(BOLD);
    textAlign(CENTER);
    background(0);
    
    tree = new Tree();

    // for (let i = 0; i < inputs.length; ++i) tree.insertNode(inputs[i]);
}

function windowResized() {
    w = window.innerWidth;
    h = window.innerHeight;  
    resizeCanvas(w-toolsWidth, Math.max(h,toolsHeight));
}