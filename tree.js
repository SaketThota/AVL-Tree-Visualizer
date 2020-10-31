function Tree() {
    this.root = null;
}

Tree.prototype.preTraverse = function () { 
    console.log("pre Trav");
    this.root.preVisit();
}

function preTravBtn() { 
    tree.preTraverse();
}

Tree.prototype.inTraverse = function() { 
    this.root.inVisit();
}

function inTravBtn() { 
    tree.inTraverse();
}

Tree.prototype.postTraverse = function() { 
    this.root.postVisit();
}

function postTravBtn() { 
    tree.postTraverse();
}

Tree.prototype.search = function(val) {
    var found = this.root.search(val);
    return found;
};

Tree.prototype.insertNode = function(val) {
    var n = new Node(val);

    if (this.root == null) {
        this.root = n;
        this.root.x = (w - toolsWidth) / 2;
        this.root.y = (2.1 * calcualteSize(w, h)) / 2;
        this.root.sz = calcualteSize(w, h);
        this.root.dist = w - toolsWidth + (w - toolsWidth);
        
        fill(150);
        let radius = textWidth(this.root.value) + this.root.sz + textWidth(this.root.value)/3;
        this.root.rad = radius;
        ellipse(this.root.x, this.root.y, this.root.rad);
        
        fill(0);
        stroke(10);
        textSize(this.root.sz);
        text(this.root.value, this.root.x, this.root.y-3 + radius / 4);
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