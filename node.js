var wRange = w - toolsWidth, rotateMessage, startIdx = 0, travs;
const message = document.querySelector(".message");
var searchPath = [], prev;

var img = document.querySelector('#img'),
    welcome = document.querySelector('#welcome');

function Node(val, x, y, sz, dist, factor, leftSize, rightSize) {
    this.value = val;
    this.left = null;
    this.right = null;
    this.x = x;
    this.y = y;
    this.factor = 0;
    this.leftSize = 0;
    this.rightSize = 0;
}

Node.prototype.addNode = function (n, parent, sz) {
    if (n.value < this.value) {
        nodes.push(this);
        directions.push("L");
        if (this.left == null) {
            this.left = n;
            this.left.sz = sz;
            nodes.push(this.left);
            
            message.innerText = n.value + " Inserted Successfully. ";
            assign(this.left, this, 1, 0);
        }
        else {
            this.left.addNode(n, this, sz);
        }
    }
    else if (n.value > this.value) {
        nodes.push(this);
        directions.push("R");
        if (this.right == null) {
            this.right = n;
            this.right.sz = sz;
            nodes.push(this.right);
            
            message.innerText = n.value + " Inserted Successfully.";
            assign(this.right, this, 0, 0);
        }
        else {
            this.right.addNode(n, this, sz);
        }
    } else { 
        message.innerText = n.value + " Already Exist.";
    }
}

function assign(cur, parent, flag, visit) { 
    if (flag == 1) 
        cur.x = parent.x - parent.dist / 8;
    else
        cur.x = parent.x + parent.dist / 8;
    
    cur.y = parent.y + cur.sz + 40 + cur.sz/2;
    cur.dist = parent.dist / 1.8;
    
    fill(150);
    noStroke();
    let radius = textWidth(cur.value) + cur.sz;
    cur.rad = radius;
    ellipse(cur.x, cur.y, radius);
    
    fill(0);
    stroke(10);
    textSize(cur.sz);
    text(cur.value, cur.x, cur.y + (cur.sz / 4.5));
    
    stroke(150);
    x1 = parent.x;
    y1 = parent.y;
    x2 = cur.x;
    y2 = cur.y;
    
    y1 += (parent.rad) / 2.2;
    if (flag) {
        x1 -= (parent.rad) / 6;
        x2 += (cur.rad) / 4.5;
        y2 -= (cur.rad) / 6;
    }
    else { 
        x1 += (parent.rad) / 5;
        x2 -= (cur.rad) / 4.5;
        y2 -= (cur.rad) / 6;
    }
    
    line(x1, y1, x2, y2);   
    
    noStroke();
    fill(255, 195, 31);
    textSize(cur.sz/2);
    text(cur.factor, cur.x - cur.rad + (cur.sz / 3), cur.y + 6 - cur.sz/2);

    tree.root.calcFactor();
    tree.root.calcTreeFunc();
    background(0);
    assignRoot(tree.root);
    tree.root.reAssign(tree.root);
    balanceTree();
}

function balanceTree() { 
    for (let i = nodes.length - 1; i >= 0; --i) { 
        if (nodes[i].factor < -1 || nodes[i].factor > 1) { 
            rotateMessage = "";
            rotateMessage += directions[i];
            rotateMessage += directions[i+1];
            startIdx = i;
           
            if (rotateMessage == "LL") {
                rotateLL();
                message.innerText = "Applied LL Rotation.";
            }
            else if (rotateMessage == "RR") {
                rotateRR();
                message.innerText = "Applied RR Rotation.";
            }
            else if (rotateMessage == "LR") {
                rotateLR();
                message.innerText = "Applied LR Rotation.";
            }
            else { 
                rotateRL();
                message.innerText = "Applied RL Rotation.";
            }

            tree.root.calcFactor();
            tree.root.calcTreeFunc();
            background(0);
            assignRoot(tree.root);
            tree.root.reAssign(tree.root);
        }
    }
}

function assign2(cur, parent, flag) { 
    cur.sz = calculateSize(w, h, 0);

    if (flag == 1) 
        cur.x = parent.x - parent.dist / 8;
    else
        cur.x = parent.x + parent.dist / 8;
    
    cur.y = parent.y + cur.sz + 40 + cur.sz/2;
    cur.dist = parent.dist / 1.8;
    
    fill(150);
    noStroke();
    let radius = textWidth(cur.value) + cur.sz;
    cur.rad = radius;
    ellipse(cur.x, cur.y, radius);
    
    fill(0);
    stroke(10);
    textSize(cur.sz);
    text(cur.value, cur.x, cur.y + (cur.sz / 4.5));
    text(cur.factor, cur.x - cur.rad + (cur.sz / 3), cur.y + 6 - cur.sz/2);
    
    stroke(150);
    x1 = parent.x;
    y1 = parent.y;
    x2 = cur.x;
    y2 = cur.y;
    
    y1 += (parent.rad) / 2.2;
    if (flag) {
        x1 -= (parent.rad) / 6;
        x2 += (cur.rad) / 4.5;
        y2 -= (cur.rad) / 6;
    }
    else { 
        x1 += (parent.rad) / 5;
        x2 -= (cur.rad) / 4.5;
        y2 -= (cur.rad) / 6;
    }
    
    line(x1, y1, x2, y2);   
    
    noStroke();
    fill(255, 195, 31);
    textSize(cur.sz/2);
    text(cur.factor, cur.x - cur.rad + (cur.sz/3), cur.y + 10);
}

Node.prototype.reAssign = function (parent) { 
    if (this.left != null) { 
        assign2(this.left, this, 1);
        this.left.reAssign(this);
    }

    if (this.right != null) { 
        assign2(this.right, this, 0);
        this.right.reAssign(this);
    }
}

Node.prototype.calcTreeFunc = function () { 
    if (this.left != null) 
        this.left.calcTreeFunc();

    if (this.right != null) 
        this.right.calcTreeFunc();

    this.calcFactor();
}

Node.prototype.calcFactor = function () {
    let lSize = 0, rSize = 0;

    if (this.left != null) { 
        lSize = this.left.getHeight(this.left) + 1;
        this.leftSize = lSize;
    }

    if (this.right != null) { 
        rSize = this.right.getHeight(this.right) + 1;
        this.rightSize = rSize;
    }
    this.factor = lSize - rSize;
}

Node.prototype.getHeight = function (cur) {
    let height = 0;

    if (cur === null || typeof cur == "undefined")
        height = -1;
    else
        height = Math.max(this.getHeight(cur.left), this.getHeight(cur.right)) + 1;
    
    return height;
}

Node.prototype.preVisit = function () {
    travs += this.value.toString() + " , ";

    if (this.left != null) 
        this.left.preVisit();
    
    if (this.right != null) 
        this.right.preVisit();
}

Node.prototype.inVisit = function() {
    if (this.left != null) { 
        this.left.inVisit();
    }

    travs += this.value.toString() + " , ";
    
    if (this.right != null) { 
        this.right.inVisit();
    }
}

Node.prototype.postVisit = function () {
    if (this.left != null) { 
        this.left.postVisit();
    }
    
    if (this.right != null) { 
        this.right.postVisit();
    }
    
    travs += this.value.toString() + " , ";
}

Node.prototype.search = function(val) {
    if (this.value == val) {
        return this;
    }
    else if (val < this.value && this.left != null) {
        searchPath.push(this);
        return this.left.search(val);
    }
    else if (val > this.value && this.right != null) { 
        searchPath.push(this);
        return this.right.search(val);
    }
    
    return null;
}

function find(code) { 
    let val = document.querySelector("#findVal").value;
    
    if (val && code == 13) {
        val = parseInt(val);
        let isPresent = tree.searchNode(val);
    
        if (isPresent == null) 
            message.innerText = val + " Not found.";
        else
            message.innerText = val + " found.";
    }
}

function insert(code) { 
    img.style.display = 'none';
    welcome.style.display = 'none';

    let val = document.querySelector("#insertVal").value;
    let flag = true;

    for (let i = 0; i < val.length; ++i) {
        let code = val[i].charCodeAt(0);
        if (code >= 48 && code <= 57) continue;
        flag = false;
    }

    if (val && code == 13 && flag == false) 
        message.innerText = "Only Non-negative Intergers are allowed.";
    else if (val && code == 13)
        tree.insertNode(parseInt(val));
}

function del(code) { 
    let val = document.querySelector("#deleteVal").value;

    if (val && code == 13) { 
        let isPresent = tree.searchNode(val);

        if (isPresent == null) {
            message.innerText =  val + " is not present."   
        } else { 
            tree.deleteNode(isPresent);
            message.innerText = val + " is deleted successfully.";
        }
    }
}

function rotateLL() { 
    let flag = (nodes[startIdx] == tree.root);
    let Br = nodes[startIdx + 1].right;
    nodes[startIdx + 1].right = nodes[startIdx];
    nodes[startIdx].left = Br;

    if (flag) 
        tree.root = nodes[startIdx + 1];
    else  
        nodes[startIdx - 1].left = nodes[startIdx + 1];
}

function rotateRR() { 
    let flag = (nodes[startIdx] == tree.root);
    let Bl = nodes[startIdx + 1].left;
    nodes[startIdx + 1].left = nodes[startIdx];
    nodes[startIdx].right = Bl;

    if (flag)
        tree.root = nodes[startIdx + 1];
    else
        nodes[startIdx - 1].right = nodes[startIdx + 1];
}

function rotateRL() { 
    let flag = (tree.root == nodes[startIdx]);

    nodes[startIdx].right = nodes[startIdx + 2].left;
    nodes[startIdx + 1].left = nodes[startIdx + 2].right;
    nodes[startIdx + 2].left = nodes[startIdx];
    nodes[startIdx + 2].right = nodes[startIdx + 1];

    if (flag)
        tree.root = nodes[startIdx + 2];
    else { 
        if (nodes[startIdx - 1].right.value == nodes[startIdx].value) {
            nodes[startIdx - 1].right = nodes[startIdx + 2];
        } else { 
            nodes[startIdx - 1].left = nodes[startIdx + 2];
        }
    }        
}

function rotateLR() { 
    let flag = (tree.root == nodes[startIdx]);

    nodes[startIdx].left = nodes[startIdx + 2].right;
    nodes[startIdx + 1].right = nodes[startIdx + 2].left;
    nodes[startIdx + 2].right = nodes[startIdx];
    nodes[startIdx + 2].left = nodes[startIdx + 1];

    if (flag) 
        tree.root = nodes[startIdx + 2];
    else { 
        if (nodes[startIdx - 1].right.value == nodes[startIdx].value) {
            nodes[startIdx - 1].right = nodes[startIdx + 2];
        } else { 
            nodes[startIdx - 1].left = nodes[startIdx + 2];
        }
    }
}