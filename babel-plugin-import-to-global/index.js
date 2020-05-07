module.exports = function ({ types: t }) {
  return {
    visitor: {
      ImportDeclaration(path, state) {
        const { moduleName, globalName = "window", globalAttr } = state.opts;
        if (!moduleName)
          throw path.buildCodeFrameError(
            "babel config moduleName is required!"
          );
        const sourceName = path.get("source").node.value;
        if (sourceName !== moduleName) return;
        const varName = path.get("specifiers")[0].get("local").node.name;
        path.replaceWith(
          t.variableDeclaration("const", [
            t.variableDeclarator(
              t.identifier(varName),
              t.memberExpression(
                t.identifier(globalName),
                t.identifier(globalAttr || moduleName)
              )
            ),
          ])
        );
      },
    },
  };
};
