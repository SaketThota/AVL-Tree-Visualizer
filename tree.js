function Tree() {
    this.root = null;
}

Tree.prototype.preTraverse = function () { 
    console.log("pre Trav");
    this.root.preVisit();
}

Tree.prototype.inTraverse = function () { 
    console.log("In Trav");
    this.root.inVisit();
}

Tree.prototype.postTraverse = function () { 
    console.log("POST Trav");
    this.root.postVisit();
}

Tree.prototype.search = function(val) {
    var found = this.root.search(val);
    return found;
}

function assignRoot(cur) { 
    cur.x = (w - toolsWidth) / 2;
    cur.y = (2.1 * calcualteSize(w, h)) / 2;
    cur.sz = calcualteSize(w, h);
    cur.dist = 2*(w - toolsWidth);
    
    fill(150);
    let radius = textWidth(cur.value) + cur.sz + textWidth(cur.value)/2;
    cur.rad = radius;
    ellipse(cur.x, cur.y, cur.rad);
    
    fill(0);
    stroke(10);
    textSize(cur.sz);
    text(cur.value, cur.x, cur.y - 3 + radius / 4);
}

Tree.prototype.insertNode = function(val) {
    var n = new Node(val);
    directions = [];
    nodes = [];

    if (this.root == null) {
        this.root = n;
        this.root.rightSize = 0;
        this.root.leftSize = 0;
        this.root.factor = 0;
        assignRoot(tree.root);
    }
    else { 
        this.root.addNode(n, this.root, calcualteSize(w, h));
    }
};

function calcualteSize(w, h) {
    
    if (w <= 375 && h <= 570) return 13;
    else if (w <= 768) return 18;
    else if (w <= 1024) return 23;
    else return 28;
}

let findVal = document.querySelector("#findVal");
findVal.addEventListener("keyup", function keyHelper(event) { find(event.keyCode); });

let insertVal = document.querySelector("#insertVal");
insertVal.addEventListener("keyup", function keyHelper(event) { insert(event.keyCode);});

let deleteVal = document.querySelector("#deleteVal");
deleteVal.addEventListener("keyup", function keyHelper(event) { del(event.keyCode); });