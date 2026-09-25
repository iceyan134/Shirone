---
title: "音频朗读：日系片段示例"
published: 2026-08-29
description: 使用 Audio Reader 在文章中按需播放短音频，不会在页面加载时直接请求所有声音。
tags: [示例, 音频朗读]
series: media-embeds
seriesOrder: 2
category: 博客教程
lang: zh_CN
draft: false
---

Audio Reader 适合放短语音、朗读片段、提示音或作品引用。按钮被点击前不会播放音频，能减少首屏负担。

```markdown
:audio-reader[片段标题]{src="/assets/audio/filename.wav"}
```

## 片段示例

- **Baka**：:audio-reader[语音片段 Baka]{src="/assets/audio/Baka.wav"}
- **Ciallo**：:audio-reader[语音片段 Ciallo]{src="/assets/audio/Ciallo.wav"}
- **Ehe**：:audio-reader[轻笑片段]{src="/assets/audio/Ehe.wav"}
- **Imoi**：:audio-reader[语音片段 Imoi]{src="/assets/audio/Imoi.wav"}
- **Zako**：:audio-reader[语音片段 Zako]{src="/assets/audio/Zako.wav"}

`src` 需要使用站点根路径或 HTTPS 地址，标签文本不能为空。写法不完整时会保留为普通 Markdown，不会加载音频资源。
