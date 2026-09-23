---
title: Expressive Code 代码块示例
published: 2026-08-25
description: 展示 Shirone 中代码块的标题、行号、高亮、终端窗口和折叠效果。
tags: [示例, 代码高亮, Markdown]
category: 教程
lang: zh_CN
draft: false
---

Shirone 使用 Expressive Code 渲染代码块。它适合写技术笔记、配置教程和命令行记录。

## 基础代码块

```ts
export function greet(name: string) {
	return `Hello, ${name}`;
}
```

## 带标题

```ts title="src/utils/example.ts"
export const siteName = "霜折";
```

## 行高亮

```ts {2}
const enabled = true;
const theme = "frost-blue";
console.log(enabled, theme);
```

## 终端命令

```powershell frame="terminal"
npx.cmd astro check
pnpm.cmd build
```

## 建议

- 教程文章尽量给代码块写语言名。
- 文件示例可以加 `title`。
- 命令行示例使用 `powershell`，符合当前 Windows 开发环境。
