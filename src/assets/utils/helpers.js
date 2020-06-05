function isParentNode(parent, child) {
    let node = child.parentNode;

    while (node != null) {
        if (node == parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

export {isParentNode}