const logTree = require("console-log-tree");

//read up on trees

class TreeNode {
  constructor(key, value = key, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.children = [];
  }

  get isLeaf() {
    return this.children.length === 0;
  }

  get hasChildren() {
    return !this.isLeaf;
  }
}

class Tree {
  constructor(key, value = key) {
    this.root = new TreeNode(key, value);
  }

  *preOrderTraversal(node = this.root) {
    yield node;
    if (node.children.length) {
      for (let child of node.children) {
        yield* this.preOrderTraversal(child);
      }
    }
  }

  *postOrderTraversal(node = this.root) {
    if (node.children.length) {
      for (let child of node.children) {
        yield* this.postOrderTraversal(child);
      }
    }
    yield node;
  }

  insert(parentNodeKey, key, value = key) {
    for (let node of this.preOrderTraversal()) {
      if (node.key === parentNodeKey) {
        node.children.push(new TreeNode(key, value, node));
        return true;
      }
    }
    return false;
  }

  remove(key) {
    for (let node of this.preOrderTraversal()) {
      const filtered = node.children.filter((c) => c.key !== key);
      if (filtered.length !== node.children.length) {
        node.children = filtered;
        return true;
      }
    }
    return false;
  }

  find(key) {
    for (let node of this.preOrderTraversal()) {
      if (node.key === key) return node;
    }
    return undefined;
  }
}

const tree1 = [
  {
    name: "photos",
    children: [
      {
        name: "summer",
        children: [
          {
            name: "june",
            children: [
              {
                name: "windsurf.jpg",
              },
            ],
          },
        ],
      },
      {
        name: "winter",
        children: [
          {
            name: "january",
            children: [
              {
                name: "ski.png",
              },
              {
                name: "snowboard.jpg",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "doc",
  },
];

const tree = new Tree(1, "AB");

tree.insert(1, 11, "AC");
tree.insert(1, 12, "BC");
tree.insert(12, 121, "BG");

const treeStr = logTree.parse(tree);
console.log(treeStr);
console.log(tree1);
