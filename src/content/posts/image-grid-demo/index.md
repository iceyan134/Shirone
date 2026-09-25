---
title: "图片网格：语法与完整示例"
published: 2026-07-13
description: "图片网格语法、参数、裁切、响应式、标题和灯箱导航的中文示例。"
tags: [Markdown, 图片网格, 图集, 示例]
category: 博客教程
lang: zh_CN
draft: false
---

`:::grid` 是 Shirone 的图片网格容器。它会把普通 Markdown 图片排成响应式网格，并自动启用灯箱查看。

## 最小写法

````markdown
:::grid
![图片说明](./landscape-1.webp)

![图片说明](./landscape-2.webp)
:::
````

每张图片独占一个段落，图片之间保留空行。

:::grid
![最小语法示例 1](./landscape-1.webp)

![最小语法示例 2](./landscape-2.webp)
:::

## 参数

```markdown
:::grid{columns="3" aspect="16/9" fit="cover"}
![第一张](./image-1.webp "标题 1")

![第二张](./image-2.webp "标题 2")
:::
```

| 参数 | 可选值 | 默认值 | 作用 |
| --- | --- | --- | --- |
| `columns` | `1` 到 `6` | `3` | 桌面端列数 |
| `aspect` | `16/9`、`3/4`、`1/1` 等 | `16/10` | 卡片显示比例 |
| `fit` | `cover`、`contain` | `cover` | 裁切或完整显示 |

:::grid{columns="3" aspect="16/9" fit="cover"}
![横图 1](./landscape-1.webp "横图标题 1")

![横图 2](./landscape-2.webp "横图标题 2")

![横图 3](./landscape-3.webp "横图标题 3")
:::

## 方形图

:::grid{columns="4" aspect="1/1" fit="cover"}
![方图 1](./square-1.webp)

![方图 2](./square-2.webp)

![方图 3](./square-3.webp)

![方图 4](./square-4.webp)
:::

## 竖图

:::grid{columns="3" aspect="3/4" fit="cover"}
![竖图 1](./portrait-1.webp)

![竖图 2](./portrait-2.webp)

![竖图 3](./portrait-3.webp)
:::

## 完整显示

`fit="contain"` 会保留完整图片，适合截图或不希望被裁切的作品。

:::grid{columns="3" aspect="16/9" fit="contain"}
![完整显示 1](./mixed-square-1.webp)

![完整显示 2](./mixed-square-2.webp)

![完整显示 3](./mixed-square-3.webp)
:::
