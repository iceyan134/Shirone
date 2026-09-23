import type { AnnouncementConfig } from "@/types/announcementConfig";
import { withUserConfig } from "../utils/config-overlay.ts";

/**
 * 公告栏配置。
 * 组件显示由 sidebarConfig 统一控制。
 */
export const announcementConfig: AnnouncementConfig = withUserConfig(
	"announcement",
	{
		title: "今晚的整理",
		content:
			"这里是霜折的个人角落：霜蓝色的背景、慢一点的音乐、技术笔记和生活碎片会一起长出来。",
		closable: true,
		link: {
			enable: true,
			text: "查看个性化说明",
			url: "/posts/blog-customization-guide/",
			external: false,
		},
	},
);