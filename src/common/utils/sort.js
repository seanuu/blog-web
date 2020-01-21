export function sort(root, compare) {
    let node, nodes;
    let children, i;

    nodes = Array.isArray(root) ? root : [root];

    while ((node = nodes.pop())) {
        (function(node) {
            if (node.children) {
                node.children.sort(compare);
            }
        })(node);

        children = node.children;

        if (children) {
            for (i = children.length - 1; i >= 0; --i) {
                nodes.push(children[i]);
            }
        }
    }
}
