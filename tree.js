function Tree() { 
    this.root = null; 
}

Tree.prototype.insert = function (val) { 
    let n = new node(val); 

    if (this.root == null)
        this.root = n;
    else 
        this.root.addNode(n);
}

Tree.prototype.traversePreOrder = function () { 
    this.root.preVisit();
}

Tree.prototype.traverseInOrder = function () { 
    this.root.inVisit();
}

Tree.prototype.traversePostOrder = function () { 
    this.root.postVisit();
}

Tree.prototype.find = function(val){ 
    if (this.root.find(val))
        console.log("FOUND " + val);
    else 
        console.log("NOT FOUND " + val);
}