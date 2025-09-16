const pane_body = document.querySelector(".pane-body");
const monaco_list_rows = pane_body.querySelectorAll(".monaco-list-rows>.monaco-list-row");

const qoder_items = [ ];

for (let i = 0; i < monaco_list_rows.length; i++) {
  const monaco_list_row = monaco_list_rows[i];
  const label = monaco_list_row.getAttribute("aria-label").trim();
  const level = Number(monaco_list_row.getAttribute("aria-level"));
  qoder_items.push({ label, level });
}

// 改成树形结构
function buildTree(items) {
  const root = [];
  const stack = [];

  items.forEach(item => {
    const node = { ...item, children: [], parent: null };

    while (stack.length > 0 && stack[stack.length - 1].level >= node.level) {
      stack.pop();
    }

    if (stack.length === 0) {
      root.push(node);
    } else {
      stack[stack.length - 1].children.push(node);
    }
    
    node.parent = stack.length > 0 ? stack[stack.length - 1] : null;

    stack.push(node);
  });

  return root;
}

const tree = buildTree(qoder_items);

// 递归这个树形结构, 改写成 { text, link, items: [] } 形式, 如果没有子节点, 则不加 items 属性
// link 则是类似 /repowiki/deno/技术栈详解/后端技术栈/Deno运行时, 为 树形结构的路径, 用 / 连接
function transformTree(nodes, parentPath = "/repowiki/deno") {
  const nodes2 = [ ];
  for (const node of nodes) {
    let path = `${parentPath}/${node.label}`;
    const transformedNode = {
      text: node.label,
      collapsed: true,
      link: path,
    };
    if (node.children.length > 0) {
      transformedNode.link += `/${node.label}`;
      transformedNode.items = transformTree(node.children, path);
    }
    nodes2.push(transformedNode);
  }
  return nodes2;
}

const finalItems = transformTree(tree);
console.log(finalItems);
