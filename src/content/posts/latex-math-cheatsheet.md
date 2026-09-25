---
title: LaTeX 从入门到写报告：模板、宏包、图片、代码与公式
published: 2026-09-25
updated: 2026-09-25
description: 一份面向中文实验报告的 LaTeX 速查，覆盖独立 tex 文档、常用宏包、图表、代码、交叉引用、文献和博客公式。
tags: [LaTeX, XeLaTeX, 科研写作, 速查]
category: 博客教程
pinned: true
---

我之前把 LaTeX 只写成了公式速查，范围太窄。这次按**写一份完整的中文实验报告**来整理：从 `main.tex` 开始，逐步加入章节、图、表、代码和文献。最后单独说明哪些公式可以直接写进这个博客。需要 Markdown 基础写法时，可以看 [Markdown 写作速查](/posts/markdown-cheatsheet/)。

## 先分清两种使用场景

| 要做的事 | 写在哪里 | 由谁渲染 |
| --- | --- | --- |
| 完整实验报告、论文、PDF | 独立的 `.tex` 工程 | XeLaTeX 等编译器 |
| 在博客文章中插入数学公式 | `.md` 正文里的 `$...$` 或 `$$...$$` | 本站的 KaTeX |

博客文章不能直接执行 `\documentclass`、`\usepackage` 或 `\includegraphics`。这些属于独立 LaTeX 文档。博客插图用 Markdown 的 `![说明](图片路径)`；写完整 PDF 时才用下面的 LaTeX 图文命令。

## 第一个可编译的中文文档

新建文件夹，里面放 `main.tex`。先复制下面这份最小模板：

````tex
\documentclass[UTF8,a4paper,11pt]{ctexart}
\usepackage{amsmath}
\usepackage{graphicx}
\usepackage{booktabs}
\usepackage{listings}
\usepackage{hyperref}

\title{NPC1L1 项目实验记录}
\author{霜折}
\date{\today}

\begin{document}
\maketitle
\tableofcontents

\section{研究问题}
这里写研究目的和假设。

\subsection{实验设计}
这里写对照、处理和测量方法。

\section{结果}
这里写观察到的事实，避免把推测当成结论。

\section{讨论}
这里写解释、限制和下一步计划。
\end{document}
````

在该文件夹的终端运行 `xelatex main.tex`。包含目录或交叉引用时，再运行一次，让页码和编号更新。Windows 上可以用 TeX Live + TeXworks/VS Code，也可以用其他能调用 XeLaTeX 的编辑器。`ctexart` 适合中文短报告；更长的报告可以考虑 `ctexrep`。英文文档常从 `article` 类开始。

LaTeX 里，`%` 后面是注释，`\` 开头是命令，`{...}` 是命令参数，`[...]` 往往是可选参数。一个空行表示另起一段；单个回车通常只是源码换行。特殊字符如 `# $ % & _ { }` 要在正文中写成 `\# \$ \% \& \_ \{ \}`；反斜杠本身可用 `\textbackslash` 表示。

## 常用宏包怎么选

宏包写在 `\begin{document}` 之前，按实际需要加载即可：

| 宏包/类 | 用途 | 常见命令 |
| --- | --- | --- |
| `ctexart` | 中文文章类 | `\documentclass{ctexart}` |
| `amsmath` | 多行公式、对齐等 | `align`、`\text{}` |
| `graphicx` | 插入和缩放图片 | `\includegraphics` |
| `booktabs` | 简洁的三线表 | `\toprule`、`\midrule`、`\bottomrule` |
| `geometry` | 页边距 | `\usepackage[margin=2.5cm]{geometry}` |
| `hyperref` | PDF 超链接和可点击引用 | `\href`、`\url` |
| `listings` | 直接排版代码 | `lstlisting`、`\lstinputlisting` |
| `siunitx` | 数字、单位及表格数字列 | `\num`、`\qty` |
| `biblatex` | 管理引用和参考文献 | `\autocite`、`\printbibliography` |

例如要统一页边距和实验单位，可在导言区加入：

````tex
\usepackage[margin=2.5cm]{geometry}
\usepackage{siunitx}
````

正文写 `\qty{10}{\micro\mole\per\litre}`，比手动敲数字、空格和单位更统一。具体模板或期刊可能自带页面设置，投稿时先遵守它们的要求。

## 章节、强调、列表与超链接

````tex
\section{材料与方法}
\subsection{细胞处理}
\subsubsection{对照设置}

\textbf{重点}、\emph{强调}。

\begin{itemize}
  \item 阴性对照
  \item 阳性对照
\end{itemize}

\begin{enumerate}
  \item 明确实验问题
  \item 设置对照
  \item 分析结果
\end{enumerate}

项目地址：\url{https://blog.173469.xyz/}
或写成 \href{https://blog.173469.xyz/}{霜折的博客}。
````

章节编号由文档类管理，不必手敲“第 1 章”。只想换行可用 `\\`，但不要拿它代替分段或增加空白。

## 插入图片与图注

把图片放在 `figures/` 下，例如 `figures/npc1l1.png`：

````tex
\begin{figure}[htbp]
  \centering
  \includegraphics[width=0.7\linewidth]{figures/npc1l1.png}
  \caption{NPC1L1 的结构示意图。}
  \label{fig:npc1l1}
\end{figure}

如图~\ref{fig:npc1l1} 所示，……
````

`width=0.7\linewidth` 表示占当前行宽的 70%；`htbp` 给出当前位置、页顶、页底和浮动页的排版偏好，并非强制固定位置。`\label` 放在 `\caption` 后面，用 `\ref` 引用编号。自己的图注应写明样本、处理条件和所展示的量；引用他人图片时还需注明来源与使用许可。

本地常用 PNG、JPG、PDF 图片。若找不到图片，先检查文件名大小写、路径是否相对 `main.tex` 所在位置，以及图片是否真的存在。多张子图可再查 `subcaption` 宏包，初学时先把单图用熟。

## 表格与三线表

````tex
\begin{table}[htbp]
  \centering
  \caption{不同处理组的观察项目}
  \label{tab:groups}
  \begin{tabular}{lll}
    \toprule
    组别 & 处理 & 观察项目 \\
    \midrule
    对照组 & 溶剂 & 基线信号 \\
    处理组 & 候选肽 & 定位变化 \\
    \bottomrule
  \end{tabular}
\end{table}

见表~\ref{tab:groups}。
````

`tabular` 中的 `lll` 表示三列左对齐，也可用 `c` 居中、`r` 右对齐。`&` 分隔单元格，`\\` 结束一行。`booktabs` 的三线表通常比每格都画边框更易读。大表或长表可以再考虑 `tabularx`、`longtable`。

## 在 PDF 中放代码

少量行内代码可以用 `\verb|print(1)|`。多行代码可用 `listings`：

````tex
\lstset{
  basicstyle=\ttfamily\small,
  numbers=left,
  frame=single,
  breaklines=true
}

\begin{lstlisting}[language=Python,caption={计算组均值}]
values = [0.48, 0.51, 0.49]
mean_value = sum(values) / len(values)
print(mean_value)
\end{lstlisting}
````

若代码已经存在 `analysis.py`，可用 `\lstinputlisting[language=Python]{analysis.py}` 直接从文件插入，减少文档与脚本不一致的问题。`listings` 对 Unicode/中文源码的处理可能需要额外配置；报告里优先保持代码片段简短，复杂脚本作为独立附件或仓库文件管理。

## 公式、编号和交叉引用

行内公式使用 `$n=3$`。独立且需要编号的公式用 `equation`：

````tex
\begin{equation}
  \bar{x}=\frac{1}{n}\sum_{i=1}^{n}x_i
  \label{eq:mean}
\end{equation}

均值按式~\eqref{eq:mean} 计算。
````

不需要编号时，用 `\[ ... \]` 或 `equation*`。对齐多行公式用 `amsmath` 的 `align` 环境：

````tex
\begin{align}
  R &= \frac{F_{\mathrm{treated}}}{F_{\mathrm{control}}} \\
  \Delta F &= F_{\mathrm{treated}}-F_{\mathrm{control}}
\end{align}
````

常见命令有 `^` 上标、`_` 下标、`\frac{a}{b}` 分数、`\sqrt{x}` 根号、`\alpha` 和 `\mu` 希腊字母、`\left( ... \right)` 可伸缩括号。多字符上下标要写花括号，例如 `x_{\mathrm{control}}`。公式里的普通词用 `\text{...}`，变量与单位不要混成一串斜体字母。

## 参考文献：BibLaTeX + Biber

需要管理多篇论文时，在导言区加：

````tex
\usepackage[backend=biber,style=numeric]{biblatex}
\addbibresource{references.bib}
````

正文引用 `\autocite{example2026}`，文末在 `\end{document}` 前放 `\printbibliography`。同文件夹的 `references.bib` 用 BibTeX 格式记录条目，例如下面这条**占位示例**，正式写作时必须换成真实论文信息：

````bibtex
@article{example2026,
  author  = {Example, Alice},
  title   = {Replace with the real article title},
  journal = {Replace with the real journal},
  year    = {2026}
}
````

编译顺序通常是 `xelatex main.tex` → `biber main` → `xelatex main.tex` → `xelatex main.tex`。`biber` 接收文件主名 `main`，不要写成 `main.tex`。如果学校或期刊模板已经规定 BibTeX、`natbib` 或其他流程，以模板为准。

## 文件夹怎么整理

````text
my-report/
├── main.tex
├── references.bib
├── figures/
│   └── npc1l1.png
└── analysis.py
````

正文变长后，可以把章节拆成 `sections/methods.tex`，在 `main.tex` 里用 `\input{sections/methods}` 引入。图片和代码尽量保留可追溯的原始文件；生成的 PDF、辅助文件与源数据分开管理。

## 回到博客：只写数学公式

这篇文章本身就是 Markdown。本站用 KaTeX 显示数学：行内写 `$n=3$`，块级写下面的源码；`$$` 各占一行，前后留空行。

````md
$$
s=\sqrt{\frac{1}{n-1}\sum_{i=1}^{n}(x_i-\bar{x})^2}
$$
````

显示效果：

$$
s=\sqrt{\frac{1}{n-1}\sum_{i=1}^{n}(x_i-\bar{x})^2}
$$

博客里不能加载 `amsmath`、`graphicx` 或 `biblatex`；KaTeX 只实现其支持的数学命令。要展示 LaTeX 源码而不渲染，就像上面一样放进 `tex` 代码块。

## 遇到错误先看哪里

- `Undefined control sequence`：检查命令拼写、反斜杠和需要的宏包。
- `File ... not found`：检查图片、`.bib` 或 `\input` 文件路径。
- `Missing $ inserted`：检查数学模式定界符，以及正文里是否忘了写 `\_`、`\%` 等转义。
- 目录、图号或文献仍是问号：检查 `\label` / `\ref` 名称，按需再编译，并确认 Biber 已运行。
- 中文显示异常：确认使用支持中文的文档类与 XeLaTeX，查看编译日志中的字体信息。

进一步查阅宏包原文档：[LaTeX 官方文档](https://www.latex-project.org/help/documentation/)、[CTeX](https://ctan.org/pkg/ctex)、[graphicx](https://ctan.org/pkg/latex-graphics)、[amsmath](https://ctan.org/pkg/amsmath)、[booktabs](https://ctan.org/pkg/booktabs)、[listings](https://ctan.org/pkg/listings)、[biblatex](https://ctan.org/pkg/biblatex)、[siunitx](https://ctan.org/pkg/siunitx)。
