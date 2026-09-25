---
title: Markdown 参数字段卡片
published: 2026-08-27
description: 用字段卡片记录 API、组件参数或配置项。
tags: [Markdown, 字段, 文档, 示例]
category: 博客教程
lang: zh_CN
draft: false
---

字段卡片适合写配置说明、组件 props 或 API 参数，比普通表格更适合逐项解释。

:::field{name="title" type="string" required=true}
文章标题。会显示在文章页、列表卡片和浏览器标题里。
:::

:::field{name="published" type="Date" required=true}
发布日期，格式为 `YYYY-MM-DD`。
:::

:::field{name="draft" type="boolean" default="false"}
是否为草稿。生产构建时草稿不会发布。
:::

## 写法

```markdown
:::field{name="title" type="string" required=true}
字段说明。
:::
```

如果字段很多，也可以改用普通 Markdown 表格。
