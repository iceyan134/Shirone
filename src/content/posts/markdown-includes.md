---
title: "Markdown 文件包含"
published: 2026-08-28
description: "在构建时包含本地 Markdown 文件或指定行片段。"
tags: [Markdown, Shirone, Include]
category: 教程
lang: zh_CN
draft: false
---

Shirone 可以在构建时把一个本地 Markdown 文件或其中一段插入当前文章。

<!-- @include: src/content/snippets/include-example.md#public-api -->

也支持完整文件和行号范围：

```markdown
<!-- @include: src/content/snippets/include-example.md -->
<!-- @include: src/content/snippets/include-example.md{1-4} -->
<!-- @include: src/content/snippets/include-example.md{5-} -->
<!-- @include: src/content/snippets/include-example.md{-4} -->
```

代码块里的 include 注释会保持原样，不会被执行。
