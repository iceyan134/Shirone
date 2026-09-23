import type { TimelineConfig } from "@/types/timelineConfig";
import { withUserConfig } from "../utils/config-overlay.ts";

/** 时间线页行为与展示配置。 */
export const timelineConfig: TimelineConfig = withUserConfig("timeline", {
	enable: true,
	title: "折返点",
	description: "记录霜折博客和内容系统的阶段性变化。",
	categories: [
		{
			key: "milestone",
			label: "里程碑",
			icon: "material-symbols:flag-rounded",
		},
		{
			key: "workflow",
			label: "流程",
			icon: "material-symbols:task-alt-rounded",
		},
		{
			key: "design",
			label: "视觉",
			icon: "material-symbols:palette-outline-rounded",
		},
		{
			key: "life",
			label: "记录",
			icon: "material-symbols:favorite-rounded",
		},
	],
	order: "desc",
});