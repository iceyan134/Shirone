---
title: Markdown 提示块
published: 2026-08-27
description: 使用 Shirone 的 M3E 提示容器展示备注、提醒、警告和可展开内容。
tags: [示例, Markdown, 提示块, Shirone]
category: 教程
lang: zh_CN
draft: false
---

提示块适合放补充信息，让正文节奏保持清楚。Shirone 会在构建时把这些语法渲染成统一的 M3E 样式。

## 语义类型

::: note 部署上下文
带空格的写法可以直接提供中文标题，也兼容常见 Markdown 容器语法。
:::

:::info
信息块适合写中性的背景说明，帮助读者理解上下文。
:::

:::tip[支持 **Markdown** 的标题]
方括号标题仍然可用，标题里可以包含加粗、代码等行内 Markdown。
:::

> [!IMPORTANT]
> GitHub Alert 语法也会进入同一套渲染器，迁移旧文章时不用重写全部内容。

:::warning
生产构建前请检查环境变量和部署配置。
:::

:::caution
示例文章里不要公开真实密钥、令牌、本地配置或隐私信息。
:::

## 可展开详情

::: details 查看完整命令
详情块默认收起，使用浏览器原生语义，键盘也能操作。

```powershell
npx.cmd astro check
pnpm.cmd build
```

- 初始状态是关闭的。
- 长代码会在代码块内部滚动。
- 窄屏下仍然保持在文章宽度内。
:::

## 作者写法

```markdown
:::note[方括号标题]
内容
:::

::: warning 空格标题写法
内容
:::

> [!TIP]
> GitHub Alert 语法

::: details 可选内容
读者展开后才看到。
:::
```
