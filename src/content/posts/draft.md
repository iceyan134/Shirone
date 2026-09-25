---
title: 草稿示例
published: 2026-08-27
description: 这篇文章展示 draft 字段的作用。
tags: [草稿, 示例]
category: 博客教程
lang: zh_CN
draft: true
---

# 这是一篇草稿

`draft: true` 的文章不会出现在生产构建里，适合保存未完成内容。

如果想发布，把 frontmatter 改成：

```yaml
draft: false
```

建议写正式文章时先保持草稿状态，确认标题、摘要、标签、封面和正文都准备好后再发布。
