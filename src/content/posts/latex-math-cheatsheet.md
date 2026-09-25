---
title: LaTeX 公式速查：在博客里写数学与生物数据
published: 2026-09-25
description: 用 KaTeX 在 Markdown 文章中写行内公式、独立公式、上下标、希腊字母和常见实验表达式。
tags: [LaTeX, KaTeX, 数学公式, 写作]
category: 博客教程
pinned: true
---

本博客用 **KaTeX 渲染 Markdown 中的数学公式**。写行内公式时用一对 `$`，写独立公式时用两行 `$$`。例如，“样本量为 $n=3$”是行内公式；下面是独立公式：

$$
\bar{x}=\frac{1}{n}\sum_{i=1}^{n}x_i
$$

这里的 LaTeX 指**数学公式语法**，不包含完整 `.tex` 文档的 `\documentclass`、章节排版或宏包管理。

## 最常用的符号

| 想写什么 | 输入 | 显示 |
| --- | --- | --- |
| 上标、下标 | `$x^2$`、`$x_i$` | $x^2$、$x_i$ |
| 多字符上下标 | `$x_{i+1}^{(2)}$` | $x_{i+1}^{(2)}$ |
| 分数 | `$\frac{a}{b}$` | $\frac{a}{b}$ |
| 平方根 | `$\sqrt{x}$` | $\sqrt{x}$ |
| 乘号与点乘 | `$a\times b$`、`$a\cdot b$` | $a\times b$、$a\cdot b$ |
| 约等于、不等于 | `$a\approx b$`、`$a\ne b$` | $a\approx b$、$a\ne b$ |
| 小于等于、大于等于 | `$x\le y$`、`$x\ge y$` | $x\le y$、$x\ge y$ |
| 正负号、无穷大 | `$\pm$`、`$\infty$` | $\pm$、$\infty$ |

希腊字母由反斜杠加英文名称组成：$\alpha$ (`\alpha`)、$\beta$ (`\beta`)、$\gamma$ (`\gamma`)、$\mu$ (`\mu`)、$\Delta$ (`\Delta`)。大小写不同，显示也不同。

## 括号、文字和单位

用 `\left`、`\right` 让括号随内容变高：

````md
$$
\left(\frac{a+b}{c}\right)^2
$$
````

显示效果：

$$
\left(\frac{a+b}{c}\right)^2
$$

公式中的普通词语用 `\text{...}`，单位用 `\mathrm{...}`。例如 `$c=10\,\mathrm{\mu M}$` 显示为 $c=10\,\mathrm{\mu M}$。不要把整句中文塞进公式；中文解释写在公式前后会更清楚。这里的 `\,` 是一个小空格。

## 求和、均值和不确定度

复制下面的写法，可以快速写统计量：

````md
$$
\bar{x}=\frac{1}{n}\sum_{i=1}^{n}x_i
$$

$$
s=\sqrt{\frac{1}{n-1}\sum_{i=1}^{n}(x_i-\bar{x})^2}
$$
````

对应的样本标准差为：

$$
s=\sqrt{\frac{1}{n-1}\sum_{i=1}^{n}(x_i-\bar{x})^2}
$$

在正文中写“$\bar{x}\pm s$，$n=3$”时，也要交代 $n$ 指独立生物重复还是技术重复。

## 适合实验记录的表达式

相对对照组的变化可以写成：

$$
R=\frac{F_{\mathrm{treated}}}{F_{\mathrm{control}}}
$$

若要表达百分比变化，可写：

$$
\Delta F(\%)=\frac{F_{\mathrm{treated}}-F_{\mathrm{control}}}{F_{\mathrm{control}}}\times100\%
$$

这里的 $F$ 只是示例变量。真正写文章时，应说明信号如何测量、是否扣背景、怎样归一化，以及误差条表示什么。公式排版不会替代实验方法说明。

## 常见排错

- `$` 必须成对；独立公式的 `$$` 各占一行，前后留空行。
- 命令从反斜杠开始，例如 `\frac`，不要漏掉 `\`。
- 多字符上下标需要花括号：写 `x_{control}`，不要写 `x_control`。
- 想展示源码而不渲染，就放进带 `md` 标签的代码块。
- 页面不显示公式时，先检查定界符与括号是否闭合；KaTeX 只支持它实现的 LaTeX 数学命令。

要继续写文章结构、图片和表格，可回到 [Markdown 写作速查](/posts/markdown-cheatsheet/)。
