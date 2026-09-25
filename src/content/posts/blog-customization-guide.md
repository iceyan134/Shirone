---
title: 霜折博客可配置项总览
published: 2026-09-24
publishedAt: 2026-09-24T20:30:00+08:00
description: 总结这个博客可以从身份、视觉、内容、侧栏、页面、评论、统计、音乐和部署等方向做哪些调整。
tags: [博客配置, Shirone, 站点定制]
category: 站点记录
lang: zh_CN
draft: false
---

这篇文章整理当前博客最常改的地方，以及每类改动会带来的效果。以后你想调整站点时，可以先从这里判断该改配置、数据还是文章内容。

## 站点身份

主要文件：`src/config/siteConfig.ts`、`src/config/profileConfig.ts`。

可以修改站点域名、标题、副标题、语言、时区、头像、个人简介和社交链接。改完后会影响浏览器标题、SEO 元数据、RSS 作者信息、侧栏资料卡、首页横幅文字和站内链接。

## 视觉风格

主要文件：`src/config/siteConfig.ts`、`DESIGN.md`、`src/styles/variables.styl`。

最常改的是 `themeColor.hue`、配色风格、背景图、横幅遮罩、背景纹理和 favicon。Shirone 会用 HCT 动态配色把种子色扩展到按钮、卡片、导航、FAB、标签、进度条和侧栏组件，所以改一个色相就能让全站统一换气质。

## 首页横幅

主要文件：`src/config/siteConfig.ts`，图片放在 `src/assets/images/banner/`。

可以换桌面和移动端横幅、设置裁切位置、开关轮播、调暗遮罩、修改首页主标题和打字机副标题。适合塑造第一眼印象。

## 内容文章

主要目录：`src/content/posts/`、`src/content/series/`、`src/content/moments/`。

文章可以设置标题、发布日期、封面、摘要、标签、分类、系列、置顶、草稿、评论开关、语言和加密。改这些会影响首页列表、归档、分类、标签、搜索、RSS、站内推荐和文章页展示。

## 侧栏与组件

主要文件：`src/config/sidebarConfig.ts`。

可以控制资料卡、音乐、公告、分类、标签、统计、日历、目录等组件是否显示、显示顺序、出现在哪些页面。它决定博客阅读时的辅助信息密度。

## 数据页

主要文件：`src/config/*Config.ts` 与 `src/data/*.ts`。

项目、技能、设备、游戏、时间线、友链、罗盘、番剧等页面都由配置和数据共同驱动。配置决定页面是否开启、分类和排序；数据决定实际展示内容。

## 音乐

主要文件：`src/config/musicConfig.ts`、`src/data/music.ts`。

可以使用本地音乐、远程 Meting 歌单、单曲、专辑或混合模式。开启后侧栏会显示播放器；关闭或配置不完整时不会输出多余 DOM 和请求。

## 评论与统计

主要文件：`src/config/commentConfig.ts`、`src/config/umamiConfig.ts`。

评论可以接 Twikoo 或 Giscus；统计可以接 Umami。它们都是可选功能，关闭时不会产生外部请求，适合按需启用。

## 相册与媒体

主要目录：`public/images/albums/`、文章同目录图片、`public/assets/`。

相册适合放长期图片集合；文章图片适合放教程截图、作品展示和生活记录。Markdown 里还支持图片网格、视频、音频和文件 include。

## 部署与校验

常用命令：

```powershell
npx.cmd astro check
pnpm.cmd build
pnpm.cmd check:manifest
```

每次改完配置或内容，至少跑 `npx.cmd astro check`。它能提前发现 frontmatter、类型、路径和配置问题。
