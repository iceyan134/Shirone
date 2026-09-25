---
title: Markdown 选项组
published: 2026-08-27
description: 用紧凑的 M3E 选项组展示多个相关版本、方案或示例。
tags: [示例, Markdown, 选项组, Shirone]
category: 博客教程
lang: zh_CN
draft: false
---

选项组适合展示“同一主题的多个版本”，例如不同框架、不同命令或不同写法。

::::options
:::option{label="pnpm"}
```powershell
pnpm.cmd build
```
:::
:::option{label="npm"}
```powershell
npm.cmd run build
```
:::
::::

## 写法

```markdown
::::options
:::option{label="方案 A"}
内容 A
:::
:::option{label="方案 B"}
内容 B
:::
::::
```

如果两个内容完全无关，改用普通小标题会更清楚。
