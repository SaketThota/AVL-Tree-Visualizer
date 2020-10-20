function node(val) { 
    this.value = val;
    this.left = null;
    this.right = null;
}

node.prototype.addNode = function (n) { 
    if (n.value > this.value) {
        if (this.right)
            this.right.addNode(n);
        else 
            this.right = n;
        
    } else if (n.value < this.value) {
        if(this.left) 
            this.left.addNode(n);
        else 
            this.left = n;
    }
}

//PreOrder
node.prototype.preVisit = function () { 
    console.log(this.value); 
    if (this.left) this.left.preVisit();
    if (this.right) this.right.preVisit();
}

//InOrder
node.prototype.inVisit = function () { 
    if (this.left) this.left.inVisit();
    console.log(this.value);
    if (this.right) this.right.inVisit();
}

//PostOrder
node.prototype.postVisit = function () { 
    if (this.left) this.left.postVisit();
    if (this.right) this.right.postVisit();
    console.log(this.value);
}

node.prototype.find = function () { 
    if (this.root == null) return false;

    if (this.value == this.val) return true;
    
    if (this.val < this.value) {
        if (this.left != null)
            this.root = this.left.find(val);
        else
            return false;
    }
    else { 
        if (this.right != null) 
            this.root = this.right.find(val);
        else
            return false;
    }
}

// R-R

// L-L

// R-L

// L-R
