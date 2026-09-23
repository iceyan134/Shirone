---
title: 加密文章与密码保护示例
published: 2026-08-26
description: 演示 Shirone 的文章加密、会话记忆和解密后的阅读体验。
tags: [示例, 加密, Markdown, Shirone]
category: 教程
lang: zh_CN
encrypted: true
password: shirone
passwordHint: 输入 shirone 查看示例内容
draft: false
---

# 密码保护文章

这篇文章演示 Shirone 的客户端加密功能。生产构建时，正文不会以明文直接输出；读者输入正确密码后，浏览器会在本地解密并渲染内容。

:::tip
示例密码是 `shirone`。真实站点不要把重要隐私只依赖前端加密保护，公开仓库也不要提交真实密码。
:::

## 适合的场景

- 私密日记或半公开笔记。
- 只想给朋友看的内容。
- 临时保护的草稿资料。

## Frontmatter 写法

```yaml
encrypted: true
password: shirone
passwordHint: 输入 shirone 查看示例内容
hideHomeContent: true
```

`hideHomeContent` 可以让首页列表不展示加密内容片段。密码提示应该足够友好，但不要直接泄露真实密码。

## 验证命令

```powershell
npx.cmd astro check
pnpm.cmd build
```

构建和类型检查通过后，再确认文章页、刷新、站内导航和返回列表都能正常工作。
