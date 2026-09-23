import type { SkillsConfig } from "@/types/skillsConfig";
import { withUserConfig } from "../utils/config-overlay.ts";

/** 技能页行为与展示配置。 */
export const skillsConfig: SkillsConfig = withUserConfig("skills", {
	enable: true,
	title: "工具箱",
	description: "霜折常用的写作、建站与折腾工具。",
	categories: [
		{
			key: "frontend",
			label: "界面与体验",
			icon: "material-symbols:web-rounded",
		},
		{
			key: "writing",
			label: "写作与整理",
			icon: "material-symbols:edit-note-outline-rounded",
		},
		{
			key: "tooling",
			label: "工具链",
			icon: "material-symbols:construction-rounded",
		},
	],
});