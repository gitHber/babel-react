English | [简体中文](./README_zh-CN.md)

<div align="center">
<h1>babel-plugin-import-to-global</h1>
traverse import to global expression
</div>

## install

```shell
npm i -D babel-plugin-import-to-global
// or
yarn add -D babel-plugin-import-to-global
```

## config

`.babelrc`

```shell
{
  plugins: ['babel-plugin-import-to-global', {
    moduleName: 'A', // moudule name
    globalName: 'window', // global var name(default window)
    globalAttr: 'a' // global attr name(default moduleName)
  }]
}
```

## example

```js
import AM from "A";
```

output：

```js
const AM = window.a;
```
