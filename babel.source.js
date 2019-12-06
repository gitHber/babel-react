const babylon = require("babylon"); // 解析
const traverse = require("babel-traverse"); // 转换
const t = require("babel-types"); // 工具
const generator = require("babel-generator"); // 生成器
const template = require("babel-template");

const code = `
  function square(n) {
    return n * n;
  }
`;
const ast = babylon.parse(code);
traverse.default(ast, {
  enter(path) {
    if (t.isIdentifier(path.node, { name: "n" })) {
      path.node.name = "x";
    }
  }
});

generator.default(
  ast,
  {
    retainLines: false,
    compact: "auto",
    concise: false,
    quotes: "double"
  },
  code
);
// babel-template
const buildRequire = template(`
  var IMPORT_NAME = require(SOURCE)
`);
const tAst = buildRequire({
  IMPORT_NAME: t.identifier("myModule"),
  SOURCE: t.stringLiteral("my-module")
});
console.log(generator.default(tAst).code);
