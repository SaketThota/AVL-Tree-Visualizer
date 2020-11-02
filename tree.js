function Tree() {
    this.root = null;
}

Tree.prototype.preTraverse = function () { 
    if (tree.root) {
        travs = "";
        this.root.preVisit();
        message.innerText = travs.substring(0, travs.length - 3);
    } else { 
        message.innerText = "Tree is Empty.";
    }
}

Tree.prototype.inTraverse = function () { 
    if (tree.root) {
        travs = "";
        this.root.inVisit();
        message.innerText = travs.substring(0, travs.length - 3);
    } else { 
        message.innerText = "Tree is Empty.";
    }
}

Tree.prototype.postTraverse = function () { 
    if (tree.root) {
        travs = "";
        this.root.postVisit();
        message.innerText = travs.substring(0, travs.length - 3);
    } else { 
        message.innerText = "Tree is Empty.";
    }
}

function assignRoot(cur) { 
    cur.x = (w - toolsWidth) / 2;
    cur.y = (2.1 * calcualteSize(w, h)) / 2;
    cur.sz = calcualteSize(w, h);
    cur.dist = 2*(w - toolsWidth);
    
    fill(150);
    let radius = textWidth(cur.value) + cur.sz + textWidth(cur.value)/5;
    cur.rad = radius;
    ellipse(cur.x, cur.y, cur.rad);
    
    fill(0);
    stroke(10);
    textSize(cur.sz);
    text(cur.value, cur.x, cur.y + radius / 4);
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
        message.innerText = val + " Inserted Successfully.";
    }
    else { 
        this.root.addNode(n, this.root, calcualteSize(w, h));
    }
}

Tree.prototype.searchNode = function(val) {
    var found = null;
    if (tree.root != null) { 
        found = this.root.search(val);
    }
    return found;
}

Tree.prototype.deleteNode = function (nd) { 
    searchPath = [];
    this.root.search(nd.value);
    let isRoot = (tree.root == nd);
    if (searchPath) prev = searchPath[searchPath.length - 1];
    else prev = null;
    
    if (nd.left == null && nd.right == null) {
        if (isRoot) { 
            tree.root = null;
        }
        else if (prev.left && prev.left.value == nd.value) {
            prev.left = null;
        } else { 
            prev.right = null;
        }
    } else if (nd.left == null) {
        let temp = nd.right;
        if (isRoot) { 
            tree.root = temp;
        }
        else if (prev.left && prev.left.value == nd.value) {
            prev.left = temp;
        } else { 
            prev.right = temp;
        }
    } else if (nd.right == null) {
        let temp = nd.left;
        if (isRoot) { 
            tree.root = temp;
        }
        else if (prev.left && prev.left.value == nd.value) {
            prev.left = temp;
        } else { 
            prev.right = temp;
        }
    } else { 
        travs = "";
        this.root.inVisit();
        let temp = travs.split(" , ").map(e => parseInt(e)), pred;

        for (let i = 0; i < temp.length; ++i) { 
            if (temp[i] == nd.value) { 
                pred = temp[i - 1];
                break;
            }
        }

        let nd1 = this.root.search(pred);
        prev = searchPath[searchPath.length - 1];

        nd.value = nd1.value;

        if (prev.right && prev.right.value == nd1.value) {
            prev.right = null;
        } else { 
            prev.left = null;
        }
    }
    
    background(0);
    assignRoot(tree.root);
    tree.root.reAssign(tree.root);
}

function calcualteSize(w, h) {
    
    if (w <= 375 && h <= 570) return 13;
    else if (w <= 768) return 18;
    else if (w <= 1024) return 23;
    else return 28;
}

let findVal = document.querySelector("#findVal");
findVal.addEventListener("keyup", function keyHelper(event) { find(event.keyCode); });

let insertVal = document.querySelector("#insertVal");
insertVal.addEventListener("keyup", function keyHelper(event) { insert(event.keyCode); });

let deleteVal = document.querySelector("#deleteVal");
deleteVal.addEventListener("keyup", function keyHelper(event) { del(event.keyCode); });