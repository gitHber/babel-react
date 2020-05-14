const { getOptions } = require("loader-utils");
const { parse, types: t, traverse } = require("@babel/core");
const { default: generate } = require("@babel/generator");

function traverseJSX(source) {
  const ast = parse(source, {
    sourceType: "module",
    plugins: ["@babel/plugin-syntax-jsx"],
  });

  traverse(ast, {
    JSXElement(path, state) {
      if (!path.node.openingElement) {
        return;
      }
      let tag = path.get("openingElement").node.name.name;
      let isFunction = tag.charCodeAt() >= 65 && tag.charCodeAt() <= 90;
      let children = path.get("children");
      for (let i = 0; i < children.length; i++) {
        if (t.isJSXText(children[i])) {
          children[i] = t.stringLiteral(children[i].node.value);
        } else if (t.isJSXElement(children[i])) {
          children[i] = children[i].node;
        }
      }
      path.replaceWith(
        t.callExpression(
          t.memberExpression(
            t.identifier("React"),
            t.identifier("createElement")
          ),
          [
            isFunction ? t.identifier(tag) : t.stringLiteral(tag),
            t.objectExpression([]),
            ...children,
          ]
        )
      );
    },
  });

  return generate(ast, {}, source).code;
}

module.exports = function (source) {
  const options = getOptions(this);
  let s = traverseJSX(source);
  console.log(s);
  return s;
};
