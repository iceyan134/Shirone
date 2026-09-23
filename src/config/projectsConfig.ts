import type { ProjectsConfig } from "@/types/projectsConfig";
import { withUserConfig } from "../utils/config-overlay.ts";

/** 项目页行为与展示配置。 */
export const projectsConfig: ProjectsConfig = withUserConfig("projects", {
	enable: true,
	title: "正在折腾",
	description: "这里放霜折的站点改造、内容整理和视觉实验。",
	categories: [
		{
			key: "site",
			label: "站点",
			icon: "material-symbols:language-rounded",
		},
		{
			key: "writing",
			label: "写作",
			icon: "material-symbols:edit-note-outline-rounded",
		},
		{
			key: "design",
			label: "视觉",
			icon: "material-symbols:palette-outline-rounded",
		},
	],
});