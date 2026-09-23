import { createServer } from "node:http";
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import {
	mkdir,
	readdir,
	readFile,
	stat,
	writeFile,
} from "node:fs/promises";
import { basename, dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const host = "127.0.0.1";
const port = Number(process.env.SHIRONE_CONSOLE_PORT || 17346);
const isWindows = process.platform === "win32";

const contentRoot = join(root, "src", "content");
const postsDir = join(contentRoot, "posts");
const momentsDir = join(contentRoot, "moments");

function send(res, status, body, type = "application/json; charset=utf-8") {
	res.writeHead(status, {
		"content-type": type,
		"cache-control": "no-store",
	});
	res.end(typeof body === "string" ? body : JSON.stringify(body));
}

async function readJson(req) {
	const chunks = [];
	for await (const chunk of req) chunks.push(chunk);
	const raw = Buffer.concat(chunks).toString("utf-8");
	return raw ? JSON.parse(raw) : {};
}

function slugify(input) {
	const base = String(input || "")
		.trim()
		.toLowerCase()
		.replace(/[^\p{L}\p{N}]+/gu, "-")
		.replace(/^-+|-+$/g, "");
	return base || `note-${Date.now()}`;
}

function today() {
	const now = new Date();
	const formatter = new Intl.DateTimeFormat("en-CA", {
		timeZone: "Asia/Shanghai",
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	});
	return formatter.format(now);
}

function nowInShanghai() {
	const now = new Date();
	const date = new Intl.DateTimeFormat("en-CA", {
		timeZone: "Asia/Shanghai",
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	}).format(now);
	const time = new Intl.DateTimeFormat("en-GB", {
		timeZone: "Asia/Shanghai",
		hour12: false,
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	}).format(now);
	return `${date}T${time}+08:00`;
}

async function listMarkdown(dir, limit = 8) {
	if (!existsSync(dir)) return [];
	const names = await readdir(dir, { withFileTypes: true });
	const files = [];
	for (const entry of names) {
		if (entry.isDirectory()) {
			const indexPath = join(dir, entry.name, "index.md");
			if (existsSync(indexPath)) files.push(indexPath);
			continue;
		}
		if (entry.isFile() && entry.name.endsWith(".md")) files.push(join(dir, entry.name));
	}
	const rows = await Promise.all(
		files.map(async (file) => {
			const text = await readFile(file, "utf-8");
			const title =
				text.match(/^title:\s*(.+)$/m)?.[1]?.trim() ||
				text.match(/^#\s+(.+)$/m)?.[1]?.trim() ||
				basename(file);
			const published =
				text.match(/^published:\s*(.+)$/m)?.[1]?.trim() ||
				text.match(/^publishedAt:\s*(.+)$/m)?.[1]?.trim() ||
				"";
			const info = await stat(file);
			return {
				title: title.replace(/^["']|["']$/g, ""),
				published,
				path: relative(root, file).replaceAll("\\", "/"),
				mtime: info.mtimeMs,
			};
		}),
	);
	return rows.sort((a, b) => b.mtime - a.mtime).slice(0, limit);
}

function run(command, args, { timeout = 120_000 } = {}) {
	return new Promise((resolve) => {
		const child = spawn(command, args, {
			cwd: root,
			shell: false,
			windowsHide: true,
		});
		let stdout = "";
		let stderr = "";
		const timer = setTimeout(() => {
			child.kill();
			stderr += "\n[local-console] command timed out";
		}, timeout);
		child.stdout.on("data", (chunk) => {
			stdout += chunk.toString();
		});
		child.stderr.on("data", (chunk) => {
			stderr += chunk.toString();
		});
		child.on("close", (code) => {
			clearTimeout(timer);
			resolve({ code, stdout, stderr });
		});
		child.on("error", (error) => {
			clearTimeout(timer);
			resolve({ code: 1, stdout, stderr: error.message });
		});
	});
}

async function gitStatus() {
	const result = await run("git", ["status", "--short"], { timeout: 30_000 });
	return result.stdout.trim();
}

async function siteSummary() {
	const [siteConfig, profileConfig, musicConfig] = await Promise.all([
		readFile(join(root, "src", "config", "siteConfig.ts"), "utf-8"),
		readFile(join(root, "src", "config", "profileConfig.ts"), "utf-8"),
		readFile(join(root, "src", "config", "musicConfig.ts"), "utf-8"),
	]);
	const uncommentedMusicConfig = musicConfig.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^[ \t]*\/\/.*$/gm, "");
	const metingBlock = uncommentedMusicConfig.match(/meting:\s*\{([\s\S]*?)\n\s*\}/)?.[1] || "";
	return {
		title: siteConfig.match(/title:\s*"([^"]+)"/)?.[1] || "Shirone",
		site: siteConfig.match(/site:\s*"([^"]+)"/)?.[1] || "",
		hue: siteConfig.match(/hue:\s*(\d+)/)?.[1] || "",
		author: profileConfig.match(/name:\s*"([^"]+)"/)?.[1] || "",
		music:
			metingBlock.match(/id:\s*"([^"]+)"/)?.[1] ||
			musicConfig.match(/title:\s*"([^"]+)"/)?.[1] ||
			"",
	};
}

async function statusPayload() {
	const [summary, posts, moments, status] = await Promise.all([
		siteSummary(),
		listMarkdown(postsDir),
		listMarkdown(momentsDir),
		gitStatus(),
	]);
	return { summary, posts, moments, gitStatus: status };
}

async function createPost(payload) {
	const title = String(payload.title || "").trim();
	if (!title) throw new Error("文章标题不能为空");
	const slug = slugify(payload.slug || title);
	const file = join(postsDir, `${slug}.md`);
	if (existsSync(file)) throw new Error(`文章已存在：${slug}.md`);
	const tags = Array.isArray(payload.tags)
		? payload.tags
		: String(payload.tags || "")
				.split(",")
				.map((tag) => tag.trim())
				.filter(Boolean);
	const body = String(payload.body || "这里写正文。").trim();
	const text = `---\ntitle: ${title}\npublished: ${today()}\npublishedAt: ${nowInShanghai()}\ndescription: ${String(payload.description || "霜折的新文章。").trim()}\ntags: [${tags.join(", ")}]\ncategory: ${String(payload.category || "随笔").trim()}\ndraft: ${payload.draft ? "true" : "false"}\n---\n\n${body}\n`;
	await writeFile(file, text, "utf-8");
	return { path: relative(root, file).replaceAll("\\", "/") };
}

async function createMoment(payload) {
	const body = String(payload.body || "").trim();
	if (!body) throw new Error("动态内容不能为空");
	const slug = slugify(payload.slug || body.slice(0, 24));
	const file = join(momentsDir, `${today()}-${slug}.md`);
	if (existsSync(file)) throw new Error(`动态已存在：${basename(file)}`);
	const tags = Array.isArray(payload.tags)
		? payload.tags
		: String(payload.tags || "")
				.split(",")
				.map((tag) => tag.trim())
				.filter(Boolean);
	const text = `---\npublished: ${nowInShanghai()}\nmood: ${String(payload.mood || "material-symbols:edit-note-outline-rounded").trim()}\ntags: [${tags.join(", ")}]\n---\n\n${body}\n`;
	await writeFile(file, text, "utf-8");
	return { path: relative(root, file).replaceAll("\\", "/") };
}

const tasks = {
	"git-status": () => run("git", ["status", "-sb"], { timeout: 30_000 }),
	"astro-check": () =>
		run(isWindows ? "npx.cmd" : "npx", ["astro", "check"], {
			timeout: 180_000,
		}),
	build: () =>
		run(isWindows ? "pnpm.cmd" : "pnpm", ["run", "build"], {
			timeout: 300_000,
		}),
	push: () => run("git", ["push", "-u", "origin", "master"], { timeout: 120_000 }),
};

async function handleApi(req, res, path) {
	try {
		if (req.method === "GET" && path === "/api/status") {
			send(res, 200, await statusPayload());
			return;
		}
		if (req.method === "POST" && path === "/api/run") {
			const { task } = await readJson(req);
			if (!tasks[task]) throw new Error(`未知任务：${task}`);
			send(res, 200, await tasks[task]());
			return;
		}
		if (req.method === "POST" && path === "/api/post") {
			send(res, 200, { success: true, ...(await createPost(await readJson(req))) });
			return;
		}
		if (req.method === "POST" && path === "/api/moment") {
			send(res, 200, {
				success: true,
				...(await createMoment(await readJson(req))),
			});
			return;
		}
		send(res, 404, { error: "not found" });
	} catch (error) {
		send(res, 500, { success: false, error: error.message });
	}
}

function page() {
	return `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>霜折本地控制台</title>
<style>
:root{color-scheme:dark;--bg:#0f1224;--panel:rgba(28,32,58,.74);--panel2:rgba(43,48,84,.68);--line:rgba(210,216,255,.18);--text:#eef1ff;--muted:#aeb8e6;--primary:#9fb2ff;--accent:#c7d5ff;--good:#8ee8c0;--warn:#ffd48a;--bad:#ff9aa8}
*{box-sizing:border-box}body{margin:0;min-height:100vh;font-family:Inter,ui-sans-serif,system-ui,"Microsoft YaHei",sans-serif;background:radial-gradient(circle at 15% 10%,rgba(121,154,255,.32),transparent 28rem),radial-gradient(circle at 86% 18%,rgba(179,215,255,.18),transparent 24rem),linear-gradient(135deg,#0c1022,#151a33 42%,#101527);color:var(--text)}
button,input,textarea{font:inherit}button{border:0;cursor:pointer}.shell{width:min(1500px,calc(100% - 32px));margin:0 auto;padding:28px 0;display:grid;grid-template-columns:280px 1fr;gap:22px}.card{background:var(--panel);border:1px solid var(--line);border-radius:28px;box-shadow:0 24px 80px rgba(0,0,0,.28);backdrop-filter:blur(24px)}.side{padding:22px;height:calc(100vh - 56px);position:sticky;top:28px}.brand{display:grid;place-items:center;text-align:center;padding:18px 8px 24px}.avatar{width:76px;height:76px;border-radius:28px;background:linear-gradient(135deg,#7d98ff,#d6e4ff);display:grid;place-items:center;font-size:38px;box-shadow:0 0 40px rgba(127,154,255,.38)}h1,h2,h3,p{margin:0}.brand h1{margin-top:14px;font-size:24px}.brand p{margin-top:8px;color:var(--muted);font-size:13px;line-height:1.6}.nav{display:grid;gap:10px}.nav button,.action{width:100%;display:flex;align-items:center;gap:10px;padding:13px 14px;border-radius:18px;background:transparent;color:var(--muted);transition:.2s}.nav button.active,.nav button:hover,.action:hover{background:rgba(159,178,255,.14);color:var(--text);transform:translateX(4px)}main{display:grid;gap:22px}.top{padding:22px 24px;display:flex;justify-content:space-between;align-items:center}.top h2{font-size:28px}.pill{border:1px solid var(--line);background:rgba(255,255,255,.06);color:var(--muted);border-radius:999px;padding:7px 12px;font-size:12px}.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}.metric{padding:20px}.metric b{display:block;font-size:28px;margin-top:10px}.metric span{color:var(--muted);font-size:13px}.section{padding:24px}.split{display:grid;grid-template-columns:1fr 1fr;gap:18px}.list{display:grid;gap:10px;margin-top:16px}.item{padding:14px 16px;background:rgba(255,255,255,.055);border:1px solid var(--line);border-radius:18px}.item strong{display:block}.item small{color:var(--muted)}.buttons{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:16px}.primary{background:linear-gradient(135deg,#7892ff,#c2d2ff);color:#10152c;font-weight:800;border-radius:16px;padding:13px 16px}.ghost{background:rgba(255,255,255,.08);color:var(--text);border:1px solid var(--line);border-radius:16px;padding:13px 16px}form{display:grid;gap:12px;margin-top:16px}input,textarea{width:100%;border:1px solid var(--line);background:rgba(255,255,255,.07);color:var(--text);border-radius:16px;padding:13px 14px}textarea{min-height:160px;resize:vertical}.tabs{display:none}.tabs.active{display:block}pre{white-space:pre-wrap;word-break:break-word;background:#080b16;border:1px solid var(--line);border-radius:18px;padding:16px;max-height:360px;overflow:auto;color:#dbe3ff}.status-clean{color:var(--good)}.status-dirty{color:var(--warn)}@media(max-width:900px){.shell{grid-template-columns:1fr}.side{position:static;height:auto}.grid,.split,.buttons{grid-template-columns:1fr}.top{align-items:flex-start;gap:12px;flex-direction:column}}
</style>
</head>
<body>
<div class="shell">
<aside class="card side">
<div class="brand"><div class="avatar">霜</div><h1>霜折控制台</h1><p>只运行在本机 127.0.0.1<br/>管理 Shirone 内容与部署检查</p></div>
<div class="nav">
<button class="active" data-tab="dashboard">🌙 总览仪表盘</button>
<button data-tab="writer">📝 文章与动态</button>
<button data-tab="ops">🚀 检查与部署</button>
</div>
</aside>
<main>
<header class="card top"><div><h2 id="title">总览仪表盘</h2><p style="color:var(--muted);margin-top:8px">本地控制台不会进入正式博客构建产物。</p></div><span class="pill" id="site">Loading…</span></header>
<section id="dashboard" class="tabs active">
<div class="grid">
<div class="card metric"><span>站点名</span><b id="m-title">-</b></div>
<div class="card metric"><span>博主</span><b id="m-author">-</b></div>
<div class="card metric"><span>主题色相</span><b id="m-hue">-</b></div>
<div class="card metric"><span>音乐 ID</span><b id="m-music">-</b></div>
</div>
<div class="split" style="margin-top:18px">
<div class="card section"><h3>最近文章</h3><div id="posts" class="list"></div></div>
<div class="card section"><h3>最近动态</h3><div id="moments" class="list"></div></div>
</div>
</section>
<section id="writer" class="tabs">
<div class="split">
<div class="card section"><h3>新建文章</h3><form id="post-form"><input name="title" placeholder="标题" required><input name="description" placeholder="摘要"><input name="tags" placeholder="标签，用英文逗号分隔"><textarea name="body" placeholder="正文 Markdown"></textarea><button class="primary">保存文章</button></form></div>
<div class="card section"><h3>新建动态</h3><form id="moment-form"><textarea name="body" placeholder="今天想记录什么？" required></textarea><input name="tags" placeholder="标签，用英文逗号分隔"><button class="primary">保存动态</button></form></div>
</div>
</section>
<section id="ops" class="tabs">
<div class="card section"><h3>本地操作</h3><div class="buttons"><button class="ghost" data-run="git-status">Git 状态</button><button class="ghost" data-run="astro-check">Astro 检查</button><button class="ghost" data-run="build">生产构建</button><button class="primary" data-run="push">推送 GitHub</button></div><pre id="output">等待操作…</pre></div>
<div class="card section" style="margin-top:18px"><h3>当前 Git 状态</h3><pre id="git-status">Loading…</pre></div>
</section>
</main>
</div>
<script>
const tabs=[...document.querySelectorAll('[data-tab]')];
tabs.forEach(btn=>btn.onclick=()=>{tabs.forEach(b=>b.classList.remove('active'));btn.classList.add('active');document.querySelectorAll('.tabs').forEach(t=>t.classList.remove('active'));document.getElementById(btn.dataset.tab).classList.add('active');document.getElementById('title').textContent=btn.textContent.trim();});
async function api(path, options){const res=await fetch(path,{headers:{'content-type':'application/json'},...options});return res.json();}
function item(row){return '<div class="item"><strong>'+escapeHtml(row.title)+'</strong><small>'+escapeHtml(row.published||'')+' · '+escapeHtml(row.path)+'</small></div>'}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
async function refresh(){const data=await api('/api/status');document.getElementById('site').textContent=data.summary.site;document.getElementById('m-title').textContent=data.summary.title;document.getElementById('m-author').textContent=data.summary.author;document.getElementById('m-hue').textContent=data.summary.hue;document.getElementById('m-music').textContent=data.summary.music||'local';document.getElementById('posts').innerHTML=data.posts.map(item).join('')||'<div class="item">暂无文章</div>';document.getElementById('moments').innerHTML=data.moments.map(item).join('')||'<div class="item">暂无动态</div>';const gs=data.gitStatus||'working tree clean';const el=document.getElementById('git-status');el.textContent=gs;el.className=gs==='working tree clean'?'status-clean':'status-dirty';}
document.querySelectorAll('[data-run]').forEach(btn=>btn.onclick=async()=>{const out=document.getElementById('output');out.textContent='运行中：'+btn.textContent+'…';const data=await api('/api/run',{method:'POST',body:JSON.stringify({task:btn.dataset.run})});out.textContent=(data.stdout||'')+(data.stderr?'\\n'+data.stderr:'')+'\\nExit code: '+data.code;refresh();});
document.getElementById('post-form').onsubmit=async(e)=>{e.preventDefault();const data=Object.fromEntries(new FormData(e.target));const res=await api('/api/post',{method:'POST',body:JSON.stringify(data)});alert(res.success?'已保存：'+res.path:res.error);e.target.reset();refresh();};
document.getElementById('moment-form').onsubmit=async(e)=>{e.preventDefault();const data=Object.fromEntries(new FormData(e.target));const res=await api('/api/moment',{method:'POST',body:JSON.stringify(data)});alert(res.success?'已保存：'+res.path:res.error);e.target.reset();refresh();};
refresh();
</script>
</body>
</html>`;
}

await mkdir(postsDir, { recursive: true });
await mkdir(momentsDir, { recursive: true });

createServer((req, res) => {
	const url = new URL(req.url || "/", `http://${host}:${port}`);
	if (url.pathname.startsWith("/api/")) {
		handleApi(req, res, url.pathname);
		return;
	}
	send(res, 200, page(), "text/html; charset=utf-8");
}).listen(port, host, () => {
	console.log(`Shirone local console: http://${host}:${port}`);
});
