class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(data) {
        this.root = buildTree([...new Set(data.sort((a,b) =>
            a - b))]);
    }
}

// building bst function
function buildTree(data) {
    if(data.length === 0) {
        return null;
    }

    const mid = Math.floor(data.length / 2);
    const root = new Node(data[mid]);

    root.left = buildTree(data.slice(0, mid));
    root.right = buildTree(data.slice(mid + 1));

    return root;
}

function insert(root, value) {
    if (!root) {
        return new Node(value);
    }

    if(value < root.value) {
        root.left = insert(root.left, value);
    } else if (value > root.data) {
        root.right = insert(root.right, value);
    }

    return root;
}

function deleteNode(root,value) {
    if (!root) {
        return null;
    }

    if(value < root.data) {
        root.left = deleteNode(root.left, value);
    } else if (value > root.data) {
        root.right = deleteNode(root.right, value);
    } else {
        if (!root.left) {
            return root.right;
        } else if (!root.right) {
            return root.left;
        }

        root.data = findMinVlue(root.right);
        root.right = deleteNode(root.right, root.data);
    }

    return root;
}

function findMinVlue(node) {
    while (node.left) {
        node = node.left;
    }
    return node.data;
}

function find(root, value) {
    if (!root || root.data === value) {
        return root;
    }

    if (value < root.data) {
        return find(root.left, value);
    } else {
        return find(root.right, value);
    }
}

function levelOrder(root, callback) {
    const result = [];
    const queue = [root];

    while (queue.length > 0) {
        const node = queue.shift();
        result.push(callback ? callback(node) : node.data);

        if (node.left) {
            queue.push(node.left);
        }

        if (node.right) {
            queue.push(node.right);
        }
    }
    return result;
}

function inOrder(root, callback) {
    if (!root) {
        return [];
    }

    return [...inOrder(root.left, callback), 
        callback ? callback(root) : root.data,
        ...inOrder(root.right, callback)];
}

function preOrder(root, callback) {
    if (!root) {
        return [];
    }

    return [callback ? callback(root) : root.data,
         ...preOrder(root.left, callback), ...preOrder
         (root.right, callback)];
}

function postOrder (root,callback) {
    if(!root) {
        return [];
    }

    return [...postOrder(root.left, callback),
           ...postOrder(root.right, callback),
           callback ? callback(root) : root.data];
}

function height(node) {
    if(!node) {
        return -1;
    }

    return 1 + Math.max(height(node.left), height(node.right));
}

function depth(root,node) {
    if (!root || root === node) {
        return 0;
    }

    if (node.data < root.data) {
        return 1 + depth(root.left, node);
    } else {
        return 1 + depth(root.right, node);
    }
}

function isBalanced(root) {
    if(!root) {
        return true;
    }

    const leftHeight = height(root.left);
    const rightHeight = height(root.right);

    return Math.abs(leftHeight - rightHeight) <= 1 && 
    isBalanced (root.right);
}

function rebalance(root) {
    const nodes = inOrder(root);
    return buildTree(nodes);
}

//driver script

function script() {
    // create a binary search tree from an array of random numbers < 100
    const randomNum = Array.from({length: 10}, () => 
    Math.floor(Math.random() * 100));
    const tree = new Tree(randomNum);

    // confirm tree is balanced
    console.log("Is Balanced:", isBalanced(tree.root));

    // print out all
    console.log("Level Order:", levelOrder(tree.root).join(", "));
    console.log("Pre Order:", preOrder(tree.root).join(", "));
    console.log("Post Order:", postOrder(tree.root).join(", "));
    console.log("In Order:", inOrder(tree.root).join(", "));

    // unbalance the tree
    tree.root = insert(tree.root, 120);
    tree.root = insert(tree.root, 140);
    tree.root = insert(tree.root, 150);

    //confirm the unbalance
    console.log("Is Balanced (after unbalancing):", isBalanced(tree.root));

    //rebalance it
    tree.root = rebalance(tree.root);

    // confirm the balance
    console.log("Is Balanced (after rebalancing):", isBalanced(tree.root));

    // print out all
    console.log("Level Order:", levelOrder(tree.root).join(", "));
    console.log("Pre Order:", preOrder(tree.root).join(", "));
    console.log("Post Order:", postOrder(tree.root).join(", "));
    console.log("In Order:", inOrder(tree.root).join(", "));
}

script();