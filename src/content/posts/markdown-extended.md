---
title: Markdown 扩展功能
published: 2023-10-20
description: 介绍常用扩展语法：提示、代码块、表格、图片和数学公式。
tags: [Markdown, 扩展, 示例]
category: 教程
lang: zh_CN
draft: false
---

这篇文章汇总一些比基础 Markdown 更进一步的写法。

## 提示

:::note
这是一个备注。
:::

:::warning
这是一个警告。
:::

## 数学

行内公式：$E = mc^2$。

块级公式：

$$
\int_0^1 x^2 dx = \frac{1}{3}
$$

## 代码标题

```ts title="example.ts"
export const enabled = true;
```

## 图片

```markdown
![图片说明](./cover.webp)
```

扩展语法适合教程文章，但不要为了装饰而过度使用。
