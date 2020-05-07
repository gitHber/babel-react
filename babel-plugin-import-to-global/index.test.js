const fs = require("fs");
const { resolve } = require("path");

const parser = require("@babel/parser");
const babel = require("@babel/core");
const t = require("@babel/types");
const { default: traverse } = require("@babel/traverse");
const { default: generate } = require("@babel/generator");

let code = fs.readFileSync(resolve(__dirname, "./source.js"), {
  encoding: "utf8",
});
let ast = parser.parse(code, { sourceType: "module" });

traverse(ast, {
  ImportDeclaration(path, state) {
    const sourceName = path.get("source").node.value;
    if (sourceName !== "vue") return;
    const varName = path.get("specifiers")[0].get("local").node.name;
    path.replaceWith(
      t.variableDeclaration("const", [
        t.variableDeclarator(
          t.identifier(varName),
          t.memberExpression(t.identifier("window"), t.identifier("vue"))
        ),
      ])
    );
  },
});

code = generate(ast, { comments: false, minified: false }, code);
console.log(code);
