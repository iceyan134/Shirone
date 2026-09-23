---
title: Markdown 步骤
published: 2026-08-27
description: 用紧凑的步骤流展示教程、流程和检查清单。
tags: [示例, Markdown, 步骤, Shirone]
category: 教程
lang: zh_CN
draft: false
---

步骤语法适合写教程，让读者按顺序完成操作。

:::steps
1. 修改配置或文章内容。
2. 运行 `npx.cmd astro check`。
3. 预览页面效果。
4. 提交 git。
:::

## 带代码的步骤

:::steps
1. 安装依赖。

   ```powershell
   pnpm.cmd install
   ```

2. 启动开发服务器。

   ```powershell
   pnpm.cmd astro dev --port 4321
   ```

3. 打开 `http://localhost:4321` 查看效果。
:::

步骤不要太长；复杂说明可以放到步骤后的段落。
