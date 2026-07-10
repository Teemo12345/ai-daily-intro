# AI 每日一荐 · Skill 选题调研报告

> 数据来源：skills.sh（Vercel 官方）Trending 24h + All Time 榜单
> 辅助来源：掘金、CSDN、腾讯云、公众号热度文章

---

## 一、skills.sh 平台概览

> skills.sh 由 Vercel 创建，是「AI Agent 的技能商店」（类似 npm for AI），汇集 **3.5 万+** 技能包，支持 Claude Code、Cursor、Windsurf 等 **27+** AI 编程工具一键安装。累计安装量 **91.8 万+**。

---

## 二、热度数据汇总

### All Time 安装量 TOP10

| 排名 | Skill | 作者 | 安装量 | 一句话功能 |
|:---:|-------|------|:------:|-----------|
| 1 | **find-skills** | Vercel Labs | 1.2M | 技能界的 Google，搜索发现其他技能 |
| 2 | **vercel-react-best-practices** | Vercel | 357K | React/Next.js 性能优化 57 条规则 |
| 3 | **frontend-design** | Anthropic | 348K | 让 AI 生成的前端告别「AI 味」 |
| 4 | soultrace | soultrace-ai | 319K | AI 人格化性格助手 |
| 5 | **web-design-guidelines** | Vercel Labs | 284K | UI 设计审查，100+ 条规范检查 |
| 6 | **remotion-best-practices** | Remotion | 274K | 用 React 代码写视频的最佳实践 |
| 7 | microsoft-foundry | Microsoft | 267K | 微软 AI 代理开发工具箱 |
| 8 | azure-ai | Microsoft | 257K | Azure AI 服务编程向导 |
| 9 | azure-deploy | Microsoft | 257K | 一键部署到 Azure 云 |
| 10 | azure-prepare | Microsoft | 257K | 部署前环境就绪检查 |

### Trending 24h 热门（本周增长最快）

| 排名 | Skill | 作者 | 24h安装 | 亮点 |
|:---:|-------|------|:-------:|------|
| 1 | **ai-video-generation** | 101-skills | 21.3K | 🔥 当前最热，AI 视频生成 |
| 2 | **find-skills** | Vercel Labs | 17.7K | 持续热门 |
| 3 | **grill-me** | mattpocock | 13.6K | AI 审问式代码审查 |
| 4 | **lark-approval** | 飞书 | 7.2K | 飞书审批自动化 |
| 5 | design-an-interface | mattpocock | 5.3K | 界面设计指导 |
| 6 | lark-doc / lark-wiki / lark-base | 飞书 | 5.2K×3 | 飞书全家桶技能 |
| 7 | **hyperframes** | HeyGen | 4.6K | HeyGen 数字人视频 |
| 8 | **agent-browser** | Vercel Labs | 4.3K | AI 自动操作浏览器 |
| 9 | **frontend-design** | Anthropic | 4.2K | 去AI味设计 |
| 10 | **faceless-explainer** | HeyGen | 4.1K | 无脸解说视频生成 |

### 中文圈高热度 Skill（掘金/公众号刷屏）

| Skill | 安装量 | 热度来源 | 亮点 |
|-------|:------:|----------|------|
| **frontend-design** | 45.5K | 掘金 4.6万阅读 | 「去AI味」话题刷屏 |
| **agent-browser** | 24.1K | 掘金/公众号 | 「AI帮你点点点」 |
| **seo-audit** | 13K | 掘金推荐 | 运营向，非程序员也能用 |
| **baoyu-skills**（宝玉老师） | ~1K×8 | 公众号/X | 小红书图片/发微信/漫画生成 |
| **marketingskills**（23合1） | — | 掘金推荐 | 营销全套：文案/定价/投放 |

---

## 三、候选选题分析

### 🥇 候选 1：frontend-design（Anthropic 官方）

| 维度 | 分析 |
|------|------|
| **热度** | All Time #3（348K）+ 24h Trending + 掘金 4.6万阅读刷屏 |
| **出品方** | Anthropic 官方（Claude 的公司），权威性最高 |
| **核心功能** | 指导 AI 生成有设计感的前端界面，告别千篇一律的「AI 味」 |
| **wow 效果** | ⭐⭐⭐⭐⭐ 对比展示：没装 skill 的 AI 页面 vs 装了 skill 的页面，反差极大 |
| **受众面** | 开发者 + 设计师 + 产品经理 — 广 |
| **视频展示优势** | 左右分屏对比「AI味 vs 有设计感」，视觉冲击直接 |
| **话题性** | 「AI做的网站一眼假？这个skill治好了」— 自带传播点 |
| **安装命令** | `npx skills add anthropics/skills --skill frontend-design` |

### 🥈 候选 2：agent-browser（Vercel Labs）

| 维度 | 分析 |
|------|------|
| **热度** | 24h Trending #8 + 掘金 24.1K 安装 |
| **出品方** | Vercel Labs（Next.js 的公司） |
| **核心功能** | AI 自动操作浏览器：打开网页、点击按钮、填表单、批量截图、自动登录 |
| **wow 效果** | ⭐⭐⭐⭐⭐ AI 自动帮你操作浏览器完成重复工作，画面感极强 |
| **受众面** | 所有人 — 最广 |
| **视频展示优势** | 录屏 AI 自动操作浏览器，「看 AI 帮你点点点」非常有感染力 |
| **话题性** | 「AI帮你自动填表/截图/登录」— 打工人痛点 |
| **安装命令** | `npx skills add vercel-labs/agent-browser --skill agent-browser` |

### 🥉 候选 3：ai-video-generation（当前 Trending #1）

| 维度 | 分析 |
|------|------|
| **热度** | 🔥 24h Trending 第一名（21.3K） |
| **核心功能** | AI 视频生成最佳实践技能 |
| **wow 效果** | ⭐⭐⭐⭐ 用 AI agent 生成视频，最新最热 |
| **受众面** | 创作者 |
| **视频展示优势** | 生成的视频本身就是素材 |
| **话题性** | 当前最热，但内容可能偏技术 |

### 候选 4：find-skills（All Time #1，1.2M 安装）

| 维度 | 分析 |
|------|------|
| **热度** | All Time 第一（1.2M）+ 24h 持续 Trending |
| **核心功能** | 技能界的 Google，用自然语言搜索和安装其他技能 |
| **wow 效果** | ⭐⭐⭐⭐ 概念新颖，「给 AI 装 App Store」 |
| **受众面** | 所有 AI agent 用户 |
| **视频展示优势** | 适合作为系列第一期，「入门钥匙」定位 |
| **话题性** | 「AI 也有 App Store 了」— 概念传播力强 |
| **风险** | 偏 meta，展示效果不如 frontend-design 直观 |

### 候选 5：remotion-best-practices（274K 安装）

| 维度 | 分析 |
|------|------|
| **热度** | All Time #6（274K），每周 65K 安装 |
| **核心功能** | 用 React 代码写视频的最佳实践 |
| **wow 效果** | ⭐⭐⭐⭐ 「用代码做视频」本身就很酷 |
| **受众面** | 开发者 — 偏窄 |
| **视频展示优势** | 正好跟我们的项目相关！可以用我们做的片头作为展示案例 |
| **话题性** | 「程序员用代码写视频」 |
| **风险** | 受众面偏窄，非开发者无感 |

---

## 四、推荐排名

| 排名 | Skill | 核心理由 |
|:---:|-------|----------|
| **1** | **frontend-design** | 热度最高 + 对比展示效果最炸裂 + Anthropic官方 + 「去AI味」自带传播话题 |
| **2** | **agent-browser** | 受众最广 + 画面感最强 + 打工人痛点 |
| **3** | **find-skills** | 1.2M安装 + 适合做第一期入门 + 「AI的App Store」概念新颖 |
| **4** | **ai-video-generation** | 当前Trending #1 + 最新最热 |
| **5** | **remotion-best-practices** | 跟项目相关 + 「用代码做视频」很酷 |

---

## 五、第一期选题建议

### 🏆 强烈推荐：frontend-design

**推荐理由**：

1. **对比展示效果炸裂** — 左屏「没装skill的AI页面（千篇一律紫渐变）」 vs 右屏「装了skill的页面（有设计感）」，视觉反差极大，一看就懂
2. **热度最高** — All Time 348K + 掘金 4.6 万阅读刷屏 + 24h 仍在 Trending
3. **Anthropic 官方出品** — 权威性背书，不是野鸡技能
4. **话题性强** — 「AI做的网站一眼假？」「告别AI味」自带传播基因
5. **受众面广** — 开发者、设计师、产品经理都能用上
6. **系列延展好** — 第二期 agent-browser（自动化）→ 第三期 find-skills（入门）→ 第四期 remotion（做视频）

### 备选

- 如果想要受众更广 → **agent-browser**（所有人都能用）
- 如果想做「入门概念」 → **find-skills**（AI的App Store）
- 如果想跟项目联动 → **remotion-best-practices**（用我们的片头做案例）
