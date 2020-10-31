var wRange = w - toolsWidth, rotateMessage, startIdx = 0;

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
            
            assign(this.left, this, 1);
        }
        else { 
            this.left.addNode(n , this , sz);
        }
    }
    else if (n.value > this.value) {
        nodes.push(this);
        directions.push("R");
        if (this.right == null) {
            this.right = n;
            this.right.sz = sz;
            nodes.push(this.right);

            assign(this.right, this, 0);
        }
        else { 
            this.right.addNode(n , this , sz);
        }
    }
}

function assign(cur, parent, flag) { 
    if (flag == 1) 
        cur.x = parent.x - parent.dist / 8;
    else
        cur.x = parent.x + parent.dist / 8;
    
    cur.y = parent.y + cur.sz + 40;
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

    tree.root.calcFactor();
    tree.root.calcTreeFunc();

    console.log("Directions -> ");
    console.log(directions);
    console.log("Node -> ");
    console.log(nodes);
    balanceTree();
}

function balanceTree() { 
    for (let i = nodes.length - 1; i >= 0; --i) { 
        if (nodes[i].factor < -1 || nodes[i].factor > 1) { 
            rotateMessage = "";
            rotateMessage += directions[i];
            rotateMessage += directions[i+1];
            startIdx = i;
            console.log("Start Index - " + startIdx);
           
            if (rotateMessage == "LL") {
                rotateLL();
            } else if (rotateMessage == "RR") {
                rotateRR();
            } else if (rotateMessage == "LR") {
                rotateLR();
            } else { 
                rotateRL();
            }

            tree.root.calcFactor();
            tree.root.calcTreeFunc();
        }
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

Node.prototype.preVisit = function() {
    if (this.left != null) 
        this.left.preVisit();

    console.log(this.value + " " + this.factor);
    
    if (this.right != null) 
        this.right.preVisit();
}

Node.prototype.inVisit = function() {
    console.log(this.value);

    if (this.left != null) { 
        this.left.inVisit();
    }
    
    if (this.right != null) { 
        this.right.inVisit();
    }
}

Node.prototype.postVisit = function() {
    if (this.left != null) { 
        this.left.postVisit();
    }
    
    if (this.right != null) { 
        this.right.postVisit();
    }
    
    console.log(this.value);
}

Node.prototype.search = function(val) {
    if (this.value == val) 
        return this;
    else if (val < this.value && this.left != null) 
        return this.left.search(val);
    else if (val > this.value && this.right != null) 
        return this.right.search(val);
    
    return null;
}

function find(code) { 
    let val = document.querySelector("#findVal").value;
    
    if (val && code == 13) {
        val = parseInt(val);
        let isPresent = tree.search(val);
    
        if (isPresent == null)
            console.log(val + " Not found");
        else
            console.log(val + " Found");
    }
}

function insert(code) { 
    let val = document.querySelector("#insertVal").value;

    if (val && code == 13)
        tree.insertNode(parseInt(val));
}

function del(code) { 
    let val = document.querySelector("#deleteVal").value;

    if (val && code == 13) { 
        let isPresent = tree.search(val);

        if (isPresent == null) {
            // entered element is not present
        } else { 
            // tree.del(val)
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

    if (flag) {
        tree.root = nodes[startIdx + 2];
    } else { 
        if (nodes[startIdx - 1].right.value == nodes[startIdx].value) {
            nodes[startIdx - 1].right = nodes[startIdx + 2];
        } else { 
            nodes[startIdx - 1].left = nodes[startIdx + 2];
        }
    }
}