module.exports = function ({ types: t }) {
  return {
    inherits: require("@babel/plugin-syntax-jsx").default,
    visitor: {
      JSXElement(path, state) {
        console.log("jsxelement", path.get("children")[0].node);
        path.replaceWith(
          t.expressionStatement(
            t.callExpression(
              t.memberExpression(
                t.identifier("React"),
                t.identifier("createElement"),
                false
              ),
              [t.stringLiteral(path.get("children")[0].node.value)]
            )
          )

        );
      }
    }
  };
};
