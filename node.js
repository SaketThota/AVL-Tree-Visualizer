var wRange = w-toolsWidth;

function Node(val, x, y, sz, dist, factor, leftSize, rightSize) {
    this.value = val;
    this.left = null;
    this.right = null;
    this.x = x;
    this.y = y;
    this.sz = sz;
    this.dist = dist;
    this.factor = factor;
    this.leftSize = 0;
    this.rightSize = 0;
}

Node.prototype.addNode = function (n, parent, sz) {
    if (n.value < this.value) {
        if (this.left == null) {
            this.left = n;
            this.left.sz = sz;

            assign(this.left, this, 1);
        }
        else
            this.left.addNode(n , this , sz);
    }
    else if (n.value > this.value) {
        if (this.right == null) {
            this.right = n;
            this.right.sz = sz;

            assign(this.right, this, 0);
        }
        else
        this.right.addNode(n , this , sz);
    }
};

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

    tree.root.calcFactor(cur);
}

Node.prototype.calcFactor = function (cur) {
    cur.factor = this.getHeight(cur.left) - this.getHeight(cur.right);
    return this.factor;
}

Node.prototype.getHeight = function (cur) {
    let height = 0;

    if (cur === null || typeof cur == "undefined") {
        height = -1;
    } else {
        height = Math.max(this.getHeight(cur.left), this.getHeight(cur.right))+1;
    }

    return height;
}

Node.prototype.preVisit = function() {
    if (this.left != null) 
        this.left.preVisit();

    console.log(this.value +" "+ this.factor);

    if (this.right != null) 
        this.right.preVisit();
};

Node.prototype.inVisit = function() {
    console.log(this.value);

    if (this.left != null) { 
        this.left.inVisit();
    }
    
    if (this.right != null) { 
        this.right.inVisit();
    }
};

Node.prototype.postVisit = function() {
    if (this.left != null) { 
        this.left.postVisit();
    }
    
    if (this.right != null) { 
        this.right.postVisit();
    }
    
    console.log(this.value);
};

Node.prototype.search = function(val) {
    if (this.value == val) 
        return this;
    else if (val < this.value && this.left != null) 
        return this.left.search(val);
    else if (val > this.value && this.right != null) 
        return this.right.search(val);
    
    return null;
};


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