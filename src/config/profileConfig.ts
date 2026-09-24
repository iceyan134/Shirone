import type { ProfileConfig } from "@/types/config";
import { withUserConfig } from "../utils/config-overlay.ts";

/**
 * 博主资料：头像 / 名称 / 简介 / 社交链接。
 * 侧栏 Profile 卡片、页脚和 RSS 作者信息会消费这里的配置。
 */
export const profileConfig: ProfileConfig = withUserConfig("profile", {
	avatar: "assets/images/shuangzhe-avatar.png",
	name: "霜折",
	bio: "在霜色与星光里，记录技术、阅读与生活的片段。",
	links: [
		{
			name: "QQ",
			icon: "simple-icons:qq",
			url: "https://wpa.qq.com/msgrd?v=3&uin=1813518668&site=qq&menu=yes",
		},
		{
			name: "Steam",
			icon: "simple-icons:steam",
			url: "https://steamcommunity.com/profiles/76561198984829274/",
		},
		{
			name: "Bilibili",
			icon: "simple-icons:bilibili",
			url: "https://space.bilibili.com/71259129",
		},
	],
});
