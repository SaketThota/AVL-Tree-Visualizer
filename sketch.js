var w = window.innerWidth,
    h = window.innerHeight,
    toolsWidth = document.querySelector(".tools-wrapper").offsetWidth,
    toolsHeight = document.querySelector(".tools-wrapper").offsetHeight;

var tree, inputs = [10, 5, 15, 20, 25, 33, 2];
 
function setup() { 
    let canvas = createCanvas(w-toolsWidth , Math.max(h,toolsHeight));   
    canvas.parent('canvas');
    canvas.style('display', 'block');
    background(100);
    
    tree = new Tree();  

    for (let i = 1; i < 10; ++i)
        tree.insert(inputs[i]);
        
    // console.log("pre Trav");
    // tree.traversePreOrder();

    console.log("in Trav");
    tree.traverseInOrder();

    tree.find(25);

    // console.log("post Trav");
    // tree.traversePostOrder();
}

function windowResized() {
    w = window.innerWidth;
    h = window.innerHeight;  
    resizeCanvas(w-toolsWidth, Math.max(h,toolsHeight));
}