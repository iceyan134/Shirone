/**
 * 时间线页数据源（纯内容）。
 * 页面展示与筛选规则由 src/config/timelineConfig.ts 控制。
 */
import type { TimelineItem } from "@/types/timelineConfig";

export const timelineData: TimelineItem[] = [
	{
		title: "霜折博客完成第一轮个性化",
		date: "2026.09",
		category: "milestone",
		subtitle: "站点改造",
		description:
			"站点更换为 blog.173469.xyz，首页横幅、头像、主题色、音乐和中文内容全部围绕‘霜折’重新整理。",
		highlights: [
			"横幅使用霜蓝月光风格图片，并调整遮罩与动态配色",
			"头像替换为同风格生成图，侧栏资料改为中文个人介绍",
			"把通用英文教程改成中文说明，并新增可定制项总结",
		],
		tags: ["Astro", "Shirone", "个性化", "霜蓝主题"],
		links: [
			{
				label: "访问博客",
				url: "https://blog.173469.xyz/",
				icon: "material-symbols:open-in-new-rounded",
			},
		],
		icon: "material-symbols:ac_unit-rounded",
		featured: true,
	},
	{
		title: "建立部署检查习惯",
		date: "2026.09",
		category: "workflow",
		subtitle: "Git 与发布",
		description:
			"把每次修改后的检查、提交和推送串成固定流程，减少线上缓存、未部署和本地未推送带来的误判。",
		highlights: [
			"每次内容改动后运行 Astro 检查",
			"提交使用 conventional commits，方便回看改动意图",
			"推送后再检查部署平台是否完成构建",
		],
		tags: ["Git", "Deploy", "Checklist"],
		icon: "material-symbols:task-alt-rounded",
		featured: true,
	},
	{
		title: "开始把博客当作个人工作台",
		date: "2026.09",
		category: "life",
		subtitle: "内容整理",
		description:
			"不只放文章，也放项目、技能、时间线、设备、动态和常用链接，让站点成为一个能长期生长的个人索引。",
		highlights: [
			"首页展示近况，文章沉淀完整内容",
			"项目页记录正在折腾的方向",
			"时间线保留阶段性节点，方便以后复盘",
		],
		tags: ["Blog", "Writing", "Personal Site"],
		icon: "material-symbols:edit-note-rounded",
	},
	{
		title: "把霜蓝色作为站点主视觉",
		date: "2026.09",
		category: "design",
		subtitle: "视觉实验",
		description:
			"以背景图的冷色、月光和安静氛围为基准，统一按钮、卡片、标签、侧栏与顶部栏的色彩倾向。",
		highlights: [
			"用 HCT 色相带动全站语义色",
			"用横幅遮罩保证首页文字可读",
			"用纹理透明度保留轻微空气感",
		],
		tags: ["M3E", "Theme", "Visual"],
		icon: "material-symbols:palette-outline-rounded",
	},
];

/** 获取所有时间线数据列表 */
export function getTimelineList(): TimelineItem[] {
	return timelineData;
}