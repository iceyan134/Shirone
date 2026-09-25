---
title: Markdown 折叠面板
published: 2026-08-27
description: 使用可访问的折叠面板收纳较长的补充内容、答案或配置说明。
tags: [示例, Markdown, 折叠面板, Shirone]
category: 博客教程
lang: zh_CN
draft: false
---

折叠面板适合放“想看再展开”的内容，例如详细命令、答案解析、长日志或备用配置。

:::details[展开查看命令]
```powershell
npx.cmd astro check
pnpm.cmd build
```
:::

:::details 故障排查建议
如果你改了 Markdown 插件但页面没有变化，可以清理 `.astro/data-store.json` 后重启开发服务器。
:::

## 写法

```markdown
:::details[标题]
这里是折叠内容。
:::

:::details 空格标题也可以
内容支持 Markdown、列表和代码块。
:::
```

折叠内容在 SSR 阶段输出，不依赖客户端框架才能阅读。
