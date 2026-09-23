/**
 * 项目页数据源（纯内容）。
 * 页面展示与筛选规则由 src/config/projectsConfig.ts 控制。
 */
import type { ProjectItem } from "@/types/projectsConfig";

export const projectsData: ProjectItem[] = [
	{
		key: "shuangzhe-blog",
		title: "霜折的博客",
		summary:
			"以 Shirone 为底座改造的个人站：霜蓝横幅、生成头像、中文内容、音乐侧栏和可继续扩展的数据页。",
		category: "site",
		phase: "building",
		technologies: ["Astro", "Svelte", "TypeScript", "M3E"],
		icon: "material-symbols:ac_unit-rounded",
		cover: "/assets/projects/shirone.webp",
		coverAlt: "霜折博客主页预览",
		featured: true,
		website: "https://blog.173469.xyz/",
		repository: "https://github.com/iceyan134/Shirone",
		year: "2026",
	},
	{
		key: "night-notes",
		title: "夜间笔记系统",
		summary:
			"把教程、碎片、项目想法和配置说明整理成可长期维护的中文笔记，减少每次重新摸索的成本。",
		category: "writing",
		phase: "exploring",
		technologies: ["Markdown", "MDX", "Pagefind"],
		icon: "material-symbols:nightlight-outline-rounded",
		featured: true,
		year: "2026",
	},
	{
		key: "theme-lab",
		title: "霜蓝主题实验室",
		summary:
			"围绕同一张背景图调整 HCT 色相、遮罩、纹理、卡片层级和头像风格，让整站气质保持一致。",
		category: "design",
		phase: "building",
		technologies: ["Material 3", "CSS Tokens", "ImageGen"],
		icon: "material-symbols:palette-outline-rounded",
		year: "2026",
	},
	{
		key: "deploy-checklist",
		title: "博客部署检查清单",
		summary:
			"记录从本地修改、Astro 检查、Git 提交、推送到线上验证的流程，避免‘本地改了线上没变’。",
		category: "site",
		phase: "shipped",
		technologies: ["Git", "GitHub", "Astro Check"],
		icon: "material-symbols:checklist-rounded",
		year: "2026",
	},
];

/** 获取所有项目数据列表 */
export function getProjectsList(): ProjectItem[] {
	return projectsData;
}