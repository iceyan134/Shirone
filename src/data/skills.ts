/**
 * 技能页数据源（纯内容）。
 * 页面展示与筛选规则由 src/config/skillsConfig.ts 控制。
 */
import type { SkillItem } from "@/types/skillsConfig";

export const skillsData: SkillItem[] = [
	{
		name: "Astro",
		description: "用来搭建这个博客的核心框架，适合写文章、做静态站和组织内容。",
		icon: "simple-icons:astro",
		category: "frontend",
		level: "advanced",
	},
	{
		name: "Svelte",
		description: "负责站点里的交互组件，让设置面板、侧栏和动效更轻巧。",
		icon: "simple-icons:svelte",
		category: "frontend",
		level: "advanced",
	},
	{
		name: "TypeScript",
		description: "给配置、数据和组件加上类型边界，减少改博客时的隐性错误。",
		icon: "simple-icons:typescript",
		category: "frontend",
		level: "advanced",
	},
	{
		name: "Tailwind CSS",
		description: "快速调整界面间距、布局和响应式状态，适合做视觉细节打磨。",
		icon: "simple-icons:tailwindcss",
		category: "frontend",
		level: "advanced",
	},
	{
		name: "Material 3 Expressive",
		description: "当前站点的视觉语言：圆角、动态配色、卡片层级和状态反馈都围绕它展开。",
		icon: "material-symbols:palette-outline-rounded",
		category: "frontend",
		level: "intermediate",
	},
	{
		name: "Markdown / MDX",
		description: "用文章语法沉淀教程、清单、代码块、折叠面板和图片网格。",
		icon: "material-symbols:article-outline-rounded",
		category: "writing",
		level: "advanced",
	},
	{
		name: "Git",
		description: "每次改动都留下提交记录，方便回看、回滚和部署。",
		icon: "simple-icons:git",
		category: "tooling",
		level: "advanced",
	},
	{
		name: "Node.js",
		description: "运行构建脚本、内容同步、图标生成和站点检查。",
		icon: "simple-icons:nodedotjs",
		category: "tooling",
		level: "intermediate",
	},
	{
		name: "PowerShell",
		description: "Windows 环境下整理文件、运行脚本和处理部署前检查。",
		icon: "simple-icons:powershell",
		category: "tooling",
		level: "intermediate",
	},
	{
		name: "内容整理",
		description: "把零散想法变成可检索的文章、动态、项目和时间线。",
		icon: "material-symbols:edit-note-outline-rounded",
		category: "writing",
		level: "advanced",
	},
];

/** 获取所有技能数据列表 */
export function getSkillsList(): SkillItem[] {
	return skillsData;
}