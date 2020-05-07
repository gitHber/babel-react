[English](./README.md) | 简体中文

<div align="center">
<h1>babel-plugin-import-to-global</h1>
将import语句转换成全局变量赋值语句
</div>

## 安装

```shell
npm i -D babel-plugin-import-to-global
// or
yarn add -D babel-plugin-import-to-global
```

## 配置

`.babelrc`

```shell
{
  plugins: ['babel-plugin-import-to-global', {
    moduleName: 'A', // 模块名
    globalName: 'window', // 环境变量名(默认window)
    globalAttr: 'a' // 属性名(默认moduleName)
  }]
}
```

## 示例

```js
import AM from "A";
```

输出：

```js
const AM = window.a;
```
