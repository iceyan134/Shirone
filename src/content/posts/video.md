---
title: 在文章中嵌入视频
published: 2023-08-01
description: 演示如何在博客文章中嵌入 YouTube、Bilibili、AcFun 和普通视频播放器。
tags: [示例, 视频]
series: media-embeds
seriesOrder: 1
category: 示例
lang: zh_CN
draft: false
---

视频可以用专门的媒体指令嵌入，也可以直接写平台提供的 iframe。优先使用内置指令，写法更短，也方便统一样式。

## YouTube

::youtube{id="5gIf0_xpFPI" title="YouTube 视频" preload="auto"}

## Bilibili

::bilibili{bvid="BV1fK4y1s7Qf" title="Bilibili 视频" p=1 preload="auto"}

## AcFun

::acfun{acid="ac48649632" title="AcFun 视频" preload="auto"}

## ArtPlayer

::artplayer{src="https://www.pexels.com/download/video/38538991/" title="Sintel 预告片" preload="auto"}

## 写法

```markdown
::youtube{id="视频 ID" title="视频标题" preload="auto"}
::bilibili{bvid="BV 号" title="视频标题" p=1 preload="auto"}
```
