/**
 * 个人整合包与模组体验清单。游玩时长、评分等未提供的数据不作推测。
 * Steam playtime data is limited to the 20 most-played titles.
 */
import type { GameItem } from "@/types/gamesConfig";
import steamGamesSnapshot from "./steam-games.json";

const minecraftCover = "assets/games/minecraft-hero.jpg";
const terrariaCover =
	"https://cdn.akamai.steamstatic.com/steam/apps/105600/header.jpg";

const personalExperiences: GameItem[] = [
	{
		id: "minecraft-atm9",
		name: "All the Mods 9（ATM9）",
		developer: "ATMTeam",
		category: "minecraft-modpack",
		status: "played",
		cover: minecraftCover,
		icon: "material-symbols:widgets-rounded",
		platform: "Minecraft · Forge",
		tags: ["大型整合包", "科技与魔法", "任务线"],
		description:
			"内容庞大的综合型整合包，把科技、魔法、探索和任务串在一起，终局目标是合成 ATM 星。",
		link: "https://www.curseforge.com/minecraft/modpacks/all-the-mods-9",
	},
	{
		id: "minecraft-cobblemon-chibai-zhenxing",
		name: "方可梦：炽白真形",
		developer: "社区整合包",
		category: "minecraft-modpack",
		status: "played",
		cover: minecraftCover,
		icon: "material-symbols:catching-pokemon-rounded",
		platform: "Minecraft · Cobblemon",
		tags: ["方块宝可梦", "剧情 RPG", "沉浸体验"],
		description:
			"以方块宝可梦为核心的剧情向整合包，把宝可梦冒险和 Minecraft 世界探索结合起来。",
		link: "https://search.bilibili.com/all?keyword=%E6%96%B9%E5%8F%AF%E6%A2%A6%EF%BC%9A%E7%82%BD%E7%99%BD%E7%9C%9F%E5%BD%A2",
	},
	{
		id: "minecraft-deceasedcraft",
		name: "亡者世界（DeceasedCraft）",
		developer: "TqLxQuanZ",
		category: "minecraft-modpack",
		status: "played",
		cover: minecraftCover,
		icon: "material-symbols:warning-outline-rounded",
		platform: "Minecraft · Forge",
		tags: ["丧尸末日", "搜刮生存", "科技成长"],
		description:
			"在感染者占据的城市里探索、搜刮并求生，再通过科技成长和装备准备挑战更危险的区域。",
		link: "https://www.curseforge.com/minecraft/modpacks/deceasedcraft",
	},
	{
		id: "minecraft-create-above-and-beyond",
		name: "机械动力：永无止境（Create: Above and Beyond）",
		developer: "simibubi",
		category: "minecraft-modpack",
		status: "played",
		cover: minecraftCover,
		icon: "material-symbols:settings-outline-rounded",
		platform: "Minecraft · Forge",
		tags: ["机械动力", "自动化", "挑战任务"],
		description:
			"以机械动力为核心的挑战型整合包，通过层层递进的任务与配方，逐步搭起自动化生产链。",
		link: "https://www.curseforge.com/minecraft/modpacks/create-above-and-beyond",
	},
	{
		id: "terraria-calamity",
		name: "泰拉瑞亚：灾厄（Calamity）",
		developer: "Calamity Mod Team",
		category: "terraria-mod",
		status: "played",
		cover: terrariaCover,
		icon: "material-symbols:swords-outline-rounded",
		platform: "Terraria · tModLoader",
		tags: ["大型内容模组", "Boss 挑战", "装备成长"],
		description:
			"为泰拉瑞亚扩展首领、敌人、装备和阶段内容的一次大型模组流程体验。",
		link: "https://calamitymod.wiki.gg/",
	},
	{
		id: "terraria-story-of-red-cloud",
		name: "泰拉瑞亚：红云物语（Story of Red Cloud）",
		developer: "红云物语模组作者",
		category: "terraria-mod",
		status: "played",
		cover: terrariaCover,
		icon: "material-symbols:cloud-outline-rounded",
		platform: "Terraria · tModLoader",
		tags: ["魂类灵感", "自定义地图", "冒险流程"],
		description:
			"受魂类游戏启发，以定制地图、模组和音乐构成完整冒险流程；它和灾厄是两段分开的体验。",
		link: "https://steamcommunity.com/sharedfiles/filedetails/?id=2824879484&l=schinese",
	},
];

const steamLibrary: GameItem[] = steamGamesSnapshot.map((game) => ({
	id: `steam-${game.appid}`,
	name: game.name,
	developer: "Steam 游戏库",
	category: "steam-library",
	status: game.hours > 0 ? "played" : "backlog",
	cover: `https://cdn.akamai.steamstatic.com/steam/apps/${game.appid}/header.jpg`,
	icon: "material-symbols:sports-esports-outline-rounded",
	hours: game.hours,
	platform: "Steam",
	description: "来自 Steam 常玩游戏列表的游玩记录。",
	link: `https://store.steampowered.com/app/${game.appid}/`,
}));

export const gamesData: GameItem[] = [...personalExperiences, ...steamLibrary];
