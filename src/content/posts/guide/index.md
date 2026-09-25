---
title: "Shirone 写作与使用指南"
published: 2026-08-26
updated: 2026-08-26
pinned: true
description: "一份中文指南：如何创建文章、填写 frontmatter、使用 Markdown 扩展、加密、媒体和 MDX。"
image: "./cover.jpeg"
tags: ["Shirone", "指南", "Markdown", "M3E", "博客"]
category: 博客教程
lang: zh_CN
draft: false
---

这篇文章是 Shirone 博客的中文写作指南。你可以把它当作以后写文章时的速查表。

:::tip
Shirone 优先服务端渲染内容。站内导航由 Swup 接管，主内容会替换，外层壳和音乐播放器可以保持连续。
:::

## 创建新文章

```powershell
pnpm.cmd new-post my-first-post
pnpm.cmd new-post guides/getting-started
```

文章会创建在 `src/content/posts/` 下。

## Frontmatter 常用字段

```yaml
---
title: "文章标题"
published: 2026-09-24
publishedAt: 2026-09-24T20:30:00+08:00
updated: 2026-09-25
description: "文章摘要"
image: "./cover.webp"
tags: [M3E, 博客, 前端]
category: 博客教程
pinned: false
draft: false
comment: true
lang: zh_CN
---
```

| 字段 | 作用 |
| --- | --- |
| `title` | 文章标题，必填 |
| `published` | 发布日期，必填 |
| `publishedAt` | 同一天多篇文章时用于精确排序 |
| `updated` / `updatedAt` | 显示最后更新提示 |
| `description` | 首页卡片、搜索和 OpenGraph 摘要 |
| `image` | 封面图，支持相对路径、public 路径或远程 URL |
| `tags` | 标签页和标签云 |
| `category` | 分类页 |
| `pinned` | 置顶文章 |
| `draft` | 草稿，生产构建中隐藏 |
| `comment` | 单篇文章评论开关 |
| `lang` | 覆盖站点默认语言 |

## Markdown 扩展

Shirone 支持提示块、折叠面板、步骤、选项组、字段卡片、标记高亮、Mermaid、数学公式、图片网格、音视频和 include。

```markdown
:::tip
提示内容
:::

:::steps
1. 第一步
2. 第二步
:::
```

## 加密文章

```yaml
encrypted: true
password: "your-password"
passwordHint: "提示文字"
hideHomeContent: true
```

适合半公开内容。公开仓库里不要提交真实敏感密码。

## 媒体与图片

文章同目录可以放图片，然后用相对路径引用：

```markdown
![封面说明](./cover.webp)
```

图片很多时使用 `:::grid`，视频用 `::youtube`、`::bilibili` 等媒体指令。

## 发布前检查

```powershell
npx.cmd astro check
pnpm.cmd build
```

至少确保 `astro check` 是 0 errors、0 warnings，再提交。
