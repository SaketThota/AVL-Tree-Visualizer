var sz = 23,flag = 0;

function Tree() {
    this.root = null;
}

Tree.prototype.preTraverse = function () { 
    if (tree.root) {
        travs = "Pre-Order : ";
        this.root.preVisit();
        message.innerText = travs.substring(0, travs.length - 3);
    } else { 
        message.innerText = "Tree is Empty.";
    }
}

Tree.prototype.inTraverse = function () { 
    if (tree.root) {
        travs = "In-Order : ";
        this.root.inVisit();
        message.innerText = travs.substring(0, travs.length - 3);
    } else { 
        message.innerText = "Tree is Empty.";
    }
}

Tree.prototype.postTraverse = function () { 
    if (tree.root) {
        travs = "Post-Order : ";
        this.root.postVisit();
        message.innerText = travs.substring(0, travs.length - 3);
    } else { 
        message.innerText = "Tree is Empty.";
    }
}

function assignRoot(cur) { 
    cur.x = (w - toolsWidth) / 2;
    cur.y = (2.1 * calculateSize(w, h)) / 2;
    cur.sz = calculateSize(w, h);
    cur.dist = 2*(w - toolsWidth);
    
    fill(150);
    let radius = textWidth(cur.value) + cur.sz;
    cur.rad = radius;
    ellipse(cur.x, cur.y, cur.rad);
    
    fill(0);
    stroke(10);
    textSize(cur.sz);
    text(cur.value, cur.x, cur.y + radius / 5);
    text(cur.factor, cur.x - cur.rad + (cur.sz / 3), cur.y + 10);

    noStroke();
    fill(255, 195, 31);
    textSize(cur.sz/2);
    text(cur.factor, cur.x - cur.rad + (cur.sz / 2.2), cur.y + 10);
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
        this.root.addNode(n, this.root, calculateSize(w, h));
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
    let isRoot = (tree.root == nd), prev;
    
    if (searchPath.length>0) prev = searchPath[searchPath.length - 1];
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
            prev.right = nd1.right;
        } else { 
            prev.left = nd1.left;
        }
    }
    
    background(0);
    assignRoot(tree.root);
    tree.root.reAssign(tree.root);
    tree.root.calcFactor();
    tree.root.calcTreeFunc();
    background(0);
    assignRoot(tree.root);
    tree.root.reAssign(tree.root);
    balanceTree();
}

inc.addEventListener('click',() => change(1));
dec.addEventListener('click',() => change(-1));

function change(val) { 
    calculateSize(w, h, val);
    background(0);
    if (tree.root != null) { 
        assignRoot(tree.root);
        tree.root.reAssign(tree.root);
    }
}

function calculateSize(w, h , flag) {
    
    if (flag == 1) {
        sz++;
    } else if (flag == -1) {
        sz--;
    } 
    
    if (w <= 375 && h <= 570) {
        if(sz<6 || sz>18) message.innerText = "Valid Size range (6, 18)";
        sz = Math.max(sz, 6);
        sz = Math.min(sz, 18);
    } else if (w <= 768) {
        if(sz<10 || sz>25) message.innerText = "Valid Size range (10, 25)";
        sz = Math.max(sz, 10);
        sz = Math.min(sz, 25);
    }
    else if (w <= 1024) {
        if(sz<15 || sz>32) message.innerText = "Valid Size range (15, 32)";
        sz = Math.max(sz, 15);
        sz = Math.min(sz, 32);
    }
    else { 
        if(sz<18 || sz>45) message.innerText = "Valid Size range (18, 45)";
        sz = Math.max(sz, 18);
        sz = Math.min(sz, 45);
    }
    
    szHead.value = sz;
    return sz;
}

szHead.addEventListener("keyup", function keyHelper(event) {
    if (event.keyCode == 13) { 
        sz = parseInt(szHead.value);
        change(0);
    }
});

let findVal = document.querySelector("#findVal");
findVal.addEventListener("keyup", function keyHelper(event) { find(event.keyCode); });

let insertVal = document.querySelector("#insertVal");
insertVal.addEventListener("keyup", function keyHelper(event) { insert(event.keyCode); });

let deleteVal = document.querySelector("#deleteVal");
deleteVal.addEventListener("keyup", function keyHelper(event) { del(event.keyCode); });