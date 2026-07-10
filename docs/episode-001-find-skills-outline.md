# AI 每日一荐 · 第 001 期

## find-skills — AI Agent 的 App Store，一行命令给 AI 装技能

> 选题：skills.sh 安装量第一（1.2M），Vercel 出品
> 定位：系列第一期，「入门钥匙」角色

---

## 一、素材整理

### find-skills 核心信息卡

| 维度 | 内容 |
|------|------|
| **名称** | find-skills |
| **作者** | Vercel Labs |
| **安装量** | All Time 1.2M（skills.sh 第一），每周 94.1K |
| **定位** | 元技能（Meta-skill）— 搜索、发现、安装其他技能 |
| **一句话** | AI Agent 的 App Store，技能界的 Google |
| **安装命令** | `npx skills add vercel-labs/skills --skill find-skills` |
| **搜索命令** | `npx skills find [关键词]` |
| **支持平台** | 72+ AI Agent（Claude Code、Cursor、Codex、GitHub Copilot 等） |
| **官网** | skills.sh |

### 核心概念类比

| 概念 | 类比 |
|------|------|
| AI Agent（Claude Code/Cursor） | 操作系统（iPhone） |
| Skills | App |
| find-skills | App Store 搜索栏 |
| skills.sh | App Store 商店页面 |
| `npx skills find` | 搜索 App |
| `npx skills add` | 安装 App |

### 3 个实战案例（视频演示用）

**案例 1：React 性能优化**
```
输入：npx skills find react performance
结果：找到 vercel-react-best-practices（57条优化规则）
效果：首屏加载 3.2s → 1.8s
```

**案例 2：PR 审查自动化**
```
输入：npx skills find pr review
结果：找到 review-implementing（自动审查代码质量）
效果：PR 审查时间减半（30分钟 → 10分钟）
```

**案例 3：Changelog 自动生成**
```
输入：npx skills find changelog
结果：找到 changelog-generator（根据 git 提交自动生成）
效果：一个命令生成更新日志
```

### 6 大触发场景

1. 用户问「如何做 X」→ 自动搜索相关技能
2. 用户说「找 X 的 skill」→ 精准匹配
3. 用户问「能否做 X」→ 返回推荐
4. 想扩展 Agent 能力时
5. 搜索工具/模板/工作流
6. 特定领域辅助（设计/测试/部署）

---

## 二、视频整体结构

| 段落 | 时长 | 时间节点 | 内容 |
|------|------|----------|------|
| 片头 | 6s | 0:00 - 0:06 | 「AI 每日一荐」片头（奶油晨光风 + Jingle） |
| 开场钩子 | 8s | 0:06 - 0:14 | 痛点：AI助手会写代码，但不懂你的业务 |
| 概念引入 | 12s | 0:14 - 0:26 | 什么是 Skills？AI 的 App Store |
| 工具介绍 | 10s | 0:26 - 0:36 | find-skills：技能界的 Google，1.2M 安装 |
| 实战演示 | 24s | 0:36 - 1:00 | 3 个案例：React优化/PR审查/Changelog |
| 安装教程 | 10s | 1:00 - 1:10 | 一行命令搞定，支持 72+ Agent |
| 结尾引导 | 10s | 1:10 - 1:20 | 总结 + 关注引导 |
| **总时长** | **80s** | | |

---

## 三、详细分镜脚本

### 🎬 片头（0:00 - 0:06）

> 已完成，奶油晨光风 + Jingle 音效

---

### 🎣 开场钩子（0:06 - 0:14）

**画面**：一个人对 Claude Code 说「帮我优化 React 性能」，AI 回答很泛泛。换一个问题「帮我做 PR 审查」，AI 说「我可���帮忙但不太懂你们团队的规范」

**字幕**：
> 你的 AI 助手会写代码，但它真的懂你的业务吗？

**旁白**：
> 你的 AI 助手会写代码，但问到 React 性能优化、PR 审查规范，它就开始泛泛而谈了。要是能给 AI 装上专业技能呢？

**视觉建议**：
- 模拟对话界面，AI 回答打字机效果
- 回答文字逐渐变灰/模糊，表示「不够专业」
- 弹出问号动画

---

### 💡 概念引入（0:14 - 0:26）

**画面**：iPhone App Store 打开动画 → 变成 skills.sh 页面 → 技能图标像 App 一样排列

**字幕**：
> Skills = AI 的 App
> 给 AI Agent 装上专业技能，秒变领域专家

**旁白**：
> 先说个概念。你的 AI Agent 就像一部手机，Skills 就是 App。装上 React 最佳实践，它就是前端专家；装上 PR 审查技能，它就是代码审查员。而今天推荐的，就是 AI 的 App Store。

**视觉建议**：
- 左侧：手机 + App Store 图标
- 右侧：电脑 + skills.sh 页面
- 中间用「=」连接，类比关系
- 技能图标网格弹出动画（复用片头交错入场）

---

### 📢 工具介绍（0:26 - 0:36）

**画面**：find-skills Logo + 安装量数字滚动（0 → 1,200,000）+ Vercel Logo

**字幕**：
> find-skills
> Vercel 出品 · 1.2M 安装量 · skills.sh 第一名
> 一行命令搜索，一行命令安装

**旁白**：
> find-skills，Vercel 出品，skills.sh 安装量第一名，120 万次安装。它就干一件事：帮你搜索和安装技能。技能界的 Google，说的就是它。

**视觉建议**：
- 数字 0 → 1,200,000 滚动动画（复用片头数字计数效果）
- 三个标签依次弹出：`Vercel出品` `120万安装` `排名第一`
- 底部命令行浮现：`npx skills find [关键词]`

---

### ⭐ 实战演示（0:36 - 1:00）

#### 案例 1：React 性能优化（0:36 - 0:44）

**画面**：终端界面 — 输入命令 → 搜索结果弹出 → 安装 → AI 自动审查代码

**字幕**：
> 案例 1：React 性能优化
> `npx skills find react performance` → 找到 57 条优化规则
> 首屏加载 3.2s → 1.8s

**旁白**：
> 第一个案例。React 应用太慢？输入 npx skills find react performance，立刻找到 Vercel 官方的 React 最佳实践，57 条优化规则。装上之后，AI 自动审查你的代码，首屏加载从 3.2 秒降到 1.8 秒。

**视觉建议**：
- 终端打字效果（复用片头打字机组件）
- 搜索结果高亮弹出
- 性能数字对比：3.2s（红）→ 1.8s（绿）

#### 案例 2：PR 审查自动化（0:44 - 0:52）

**画面**：GitHub PR 界面 → AI 自动标注代码问题

**字幕**：
> 案例 2：PR 审查自动化
> `npx skills find pr review` → 自动审查代码质量
> 审查时间 30min → 10min

**旁白**：
> 第二个案例。团队每天几十个 PR 看不过来？搜 pr review，找到审查技能，装上后 AI 自动检查代码质量、潜在 bug。审查时间直接砍半。

**视觉建议**：
- PR 界面模拟
- AI 标注气泡弹出（代码行号 + 问题说明）
- 时间对比：30min → 10min

#### 案例 3：Changelog 自动生成（0:52 - 1:00）

**画面**：git 提交记录 → 一行命令 → 自动生成格式化的 Changelog

**字幕**：
> 案例 3：Changelog 自动生成
> `npx skills find changelog` → 根据 git 记录自动生成
> 一个命令搞定更新日志

**旁白**：
> 第三个案例。每次发版本都要手写更新日志？搜 changelog，找到生成器技能，根据 git 提交记录自动生成，一个命令搞定。

**视觉建议**：
- 左侧：git commit 列表滚动
- 中间：命令执行动画
- 右侧：格式化的 Changelog 文档展开

---

### 🔧 安装教程（1:00 - 1:10）

**画面**：终端界面 + 支持的 Agent Logo 矩阵

**字幕**：
> 安装只需一行命令
> `npx skills add vercel-labs/skills --skill find-skills`
> 支持 72+ AI Agent：Claude Code · Cursor · Codex · Copilot…

**旁白**：
> 安装只要一行命令。不管你用 Claude Code、Cursor 还是 Codex，72 种 AI Agent 全支持。装完之后，直接用自然语言跟 AI 说「帮我找个 XX 技能」，它就自动帮你搜。

**视觉建议**：
- 命令行高亮 + 复制按钮动画
- Agent Logo 矩阵依次亮起（Claude Code/Cursor/Codex/Copilot 等）
- 底部自然语言对话气泡：「帮我找个 React 性能优化的技能」

---

### 🏁 结尾引导（1:10 - 1:20）

**画面**：find-skills 网址 + 系列结尾板

**字幕**：
> 📌 skills.sh（免费 · 开源）
> 每天一个 AI 工具，带你发现效率新大陆
> 👆 关注我，明天见

**旁白**：
> find-skills 完全免费开源，网址 skills.sh。如果你也有好用的技能，评论区分享。关注我，明天带你发现下一个效率神器。

**视觉建议**：
- skills.sh 大字 + 二维码
- 底部「AI 每日一荐」Logo + 「第 001 期」
- 关注按钮动画 + 「明天见」文字弹出

---

## 四、旁白总稿（约 240 字）

> 你的 AI 助手��写代码，但问到 React 性能优化、PR 审查规范，它就开始泛泛而谈了。要是能给 AI 装上专业技能呢？
>
> 先说个概念。你的 AI Agent 就像一部手机，Skills 就是 App。装上 React 最佳实践，它就是前端专家；装上 PR 审查技能，它就是代码审查员。而今天推荐的，就是 AI 的 App Store。
>
> find-skills，Vercel 出品，skills.sh 安装量第一名，120 万次安装。它就干一件事：帮你搜索和安装技能。技能界的 Google，说的就是它。
>
> 第一个案例。React 应用太慢？一行命令搜索，立刻找到 Vercel 官方的 57 条优化规则。装上后首屏从 3.2 秒降到 1.8 秒。
>
> 第二个案例。PR 看不过来？搜一下，找到审查技能，AI 自动检查代码质量，审查时间直接砍半。
>
> 第三个案例。手写更新日志？搜 changelog，根据 git 记录自动生成，一个命令搞定。
>
> 安装只要一行命令，72 种 AI Agent 全支持。装完直接用自然语言说「帮我找个技能」，它就自动帮你搜。
>
> 完全免费开源，网址 skills.sh。关注我，明天见。

---

## 五、Remotion 可复用动画

| 动画 | 来源组件 | 用在哪 |
|------|----------|--------|
| 打字机效果 | GlitchTitle | 终端命令输入 |
| 粒子爆发 | ParticleBurst | 概念引入转场 |
| 数字计数 | 新建组件 | 安装量 0→1.2M |
| 交错入场 | Tagline | Agent Logo 矩阵 |
| spring 弹出 | 片头组件 | 搜索结果弹出 |
| 淡入淡出 | 通用 | 段落转场 |

---

## 六、需要准备的素材

| 素材 | 来源 | 用途 |
|------|------|------|
| find-skills Logo | skills.sh | 工具介绍段 |
| Vercel Logo | 官网 | 出品方标识 |
| skills.sh 截图 | skills.sh | 概念引入段 |
| 终端操作录屏 ×3 | 自己录 | 三个实战案例 |
| Agent Logo 矩阵 | 各官网 | 安装教程段 |
| GitHub PR 界面 | GitHub | 案例 2 展示 |
