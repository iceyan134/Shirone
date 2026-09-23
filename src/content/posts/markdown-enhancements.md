---
title: Shirone Markdown 增强语法
published: 2026-08-26
description: 了解 Shirone 自带的 Markdown 扩展、表达式组件和作者语法。
tags: [示例, Markdown, 扩展, 主题, Shirone]
category: 教程
lang: zh_CN
draft: false
---

Shirone 在普通 Markdown 上加入了一组适合博客写作的扩展语法。它们大多在构建时渲染，尽量不增加客户端负担。

## 提示块

:::tip
提示块适合放阅读建议、注意事项和补充说明。
:::

## 文件树

::::file-tree{title="Shirone 内容结构"}
:::file src/content/posts/
文章目录
:::
:::file src/config/
站点配置
:::
:::file src/data/
数据页内容
:::
::::

## 步骤

:::steps
1. 修改配置或文章。
2. 运行 `npx.cmd astro check`。
3. 通过后提交 git。
:::

## 代码树

::::code-tree{title="组件示例" height="260px" entry="src/Button.svelte"}
:::file src/Button.svelte
```svelte
<button>按钮</button>
```
:::
::::

## 建议

写正式文章时优先保持语法简单。只有当提示、步骤、图集或代码树能明显提高可读性时再使用扩展语法。
