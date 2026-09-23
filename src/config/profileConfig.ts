import type { ProfileConfig } from "@/types/config";
import { withUserConfig } from "../utils/config-overlay.ts";

/**
 * 博主资料：头像 / 名称 / 简介 / 社交链接（侧栏 Profile 卡片、页脚、RSS 作者等消费）。
 * 类型见 src/types/config.ts。
 */
export const profileConfig: ProfileConfig = withUserConfig("profile", {
	avatar: "assets/images/shuangzhe-avatar.png", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
	name: "霜折",
	bio: "在霜色与星光里，记录技术、阅读与生活的片段。",
	links: [
		{
			name: "Blog",
			icon: "material-symbols:language",
			url: "https://blog.173469.xyz/",
		},
	],
});
