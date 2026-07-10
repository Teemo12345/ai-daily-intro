# AI 每日一荐 — 项目交接文档 (HANDOFF)

> 用途:让**新的对话 / 新会话**能无缝接上当前进度。
> 新对话只需 `git clone` 本仓库,读此文件 + `src/` 源码即可。
> 最后更新:Episode 001 (find-skills) V7.3 已完成并推送到 GitHub。

---

## 1. 项目是什么

- **形式**:用 [Remotion](https://www.remotion.dev/)(React 程序化视频)做一个**日更短视频系列**,每天介绍一个 AI 工具 / 网站。
- **第一期选题**:`find-skills` —— Vercel 开发的 AI agent **技能搜索引擎**(搜索 + 安装 AI skills)。
- **当前成品版本**:**V7.3**(历经 V1–V7.3 多次迭代)。

### 成品规格
| 项 | 值 |
|----|----|
| 时长 | 56 秒(1680 帧 @ 30fps) |
| 分辨率 | 1920×1080 |
| 编码 | H.264 + AAC |
| 视觉风格 | **奶油晨光风 (cream morning)**:背景 `#FAF7F2`、主色 `#FF8C42`、辅色 `#FFD23F` |
| 配音 | AI 旁白,edge-tts `zh-CN-XiaoyiNeural`,语速 +5%~+15%(有节奏感) |
| 背景音乐 | 程序合成节奏 BGM,BPM 115,C 小调 `Cm–Ab–Eb–Bb`(kick/snare/hihat/bass/melody) |
| 字幕 | 底部字幕条,按场景同步 5 段 |

### 渲染命令(本机)
```bash
npm install
npx remotion render Episode001 out.mp4 --codec h264
```

---

## 2. 仓库与运行环境

- **GitHub 仓库(代码真相源)**:https://github.com/Teemo12345/ai-daily-intro
- **本地工作目录(沙箱)**:`/workspace/ai-daily-intro`
- **成品视频**:`/workspace/episode-001-v7.3.mp4`(沙箱内,需自行导出;仓库里只有源码+素材,不含渲染后的 mp4)

### 沙箱环境的关键坑(续接时务必知道)
| 现象 | 原因 / 解法 |
|------|------|
| GitHub SSH `github.com:22` 超时 | 沙箱 22 端口出口被封。已配置 `~/.ssh/config` 走 **443 隧道**(`HostName ssh.github.com`, `Port 443`)。 |
| 推 GitHub 报 `read only` | 公钥曾被加成**仓库 Deploy Key(默认只读)**。需在账号级 `Settings → SSH and GPG keys` 添加,或 Deploy Key 勾选 `Allow write access`。 |
| 项目驱动器(tdrive)上传失败 | `file_upload` 的 `file_size` 字段 schema 有 bug(oneOf string/number 校验与 server 的 float64 要求冲突),**无法用工具上传**。 |
| 结果面板无 `.zip` 下载 | 平台结果面板对 zip 不提供下载键;单个文本/二进制文件也未验证可下载。最终改用 GitHub 交付。 |
| 渲染用相对路径输出 | `npx remotion render Episode001 out.mp4` 用相对路径才成功,绝对路径 `/workspace/...` 输出会失败。 |

> 沙箱 SSH key 是独立生成的(`ai-daily-intro-sandbox`,ED25519),与用户本机 key 无关。

---

## 3. 关键文件导览

```
src/
  Root.tsx                 注册 Composition (Episode001 / AIDailyIntro)
  FullEpisode.tsx          整集编排(Sequence + 字幕 + 5 段旁白 + BGM)
  Intro/                   片头:ParticleBurst / GlitchTitle / GradientBackground / Tagline / IntroSequence
  Content/
    theme.ts               Content 区主题(继承 Intro 主题)
    WhatIsScene.tsx        "find-skills 是什么" (7s)
    GitHubScene.tsx        GitHub 截图 + 仿录屏滚动 + Star 弹出 (用 public/images/github-scroll.png)
    HowItWorksScene.tsx    对话演示 + 4 步流程 (14s)
    HowToUseScene.tsx      终端安装命令 + agent 徽章 (12s)
    EndingSceneV7.tsx      开源/免费徽章 + 关注引导 (10s)
    shared/                Terminal / ChatBubble / CountUp / BrowserFrame / SubtitleBar
  Composition.tsx
scripts/
  generate-narration-v73.py  edge-tts 生成 5 段旁白 (改 TTS 模型时主要改这里)
  generate-bgm-v73.py        Python/NumPy/SciPy 合成节奏 BGM
  screenshot-github.js       Playwright 抓取真实 GitHub 页面长图
public/
  images/github-scroll.png   github 整页长图(滚动素材)
  audio/bgm-rhythmic.wav      BGM
  audio/narration-0X-*.mp3   5 段旁白
docs/                         各版大纲、选题调研、抖音可用性评审
```

---

## 4. 已做的关键决策(避免新对话走弯路)

1. **去掉 `skills.sh` 链接** —— 用户认为放官方链接像打广告,已移除。
2. **去掉 "skill = app/手机应用" 类比** —— 聚焦讲 `find-skills` 本身,不绕弯子。
3. **旁白要"有节奏感、快一点"** —— 从默认语速改为 +5%~+15%,句间停顿压到 200ms,并叠加 BPM 115 节奏 BGM。
4. **移动端优先排版** —— 横版 1920×1080,但中心内容放大 40%~50%(多数用户在手机看)。
5. **GitHub 场景用真实截图 + 仿录屏滚动**,不用低仿模拟(要求与线上页面一致)。
6. **片头用 `intro-jingle` 版本**(用户试听 4 种风格后选定)。

---

## 5. 待办 / 如何继续

### 高优先
- [ ] **配置用户自己的模型做 TTS 旁白**(替代 edge-tts)
  - 改 `scripts/generate-narration-v73.py`:把 `edge_tts.Communicate()` 换成用户模型的 TTS API(如 OpenAI 兼容 `/v1/audio/speech`,或用户自有 endpoint)。
  - 输入文本在脚本里的分段列表,保持 5 段结构即可复用 `FullEpisode.tsx` 的字幕/时间轴。
- [ ] 规划 **Episode 002** 选题(可复用 `docs/episode-001-*-research.md` 的选题调研方法)。

### 可选
- [ ] 把成品 `episode-001-v7.3.mp4` 也提交进仓库(目前未提交,避免大文件)。
- [ ] 增加竖版(9:16)Composition 适配纯手机场景。
- [ ] 字幕/旁白做多语言版本。

---

## 6. 新对话"接上"的两种用法

**用法 A(推荐)**:新对话里说
> "clone https://github.com/Teemo12345/ai-daily-intro,读 HANDOFF.md 和 src/,继续做 Episode 002 / 配置我自己的 TTS 模型"

**用法 B**:把本文件内容直接贴进新对话作为上下文开场。

---

## 7. 环境复现速查

```bash
# 1. 拿代码
git clone git@github.com:Teemo12345/ai-daily-intro.git
cd ai-daily-intro

# 2. 装依赖(会重装 ~775MB node_modules,已 .gitignore)
npm install

# 3. 如要重建素材(可选,仓库已带成品素材)
pip install numpy scipy edge-tts
python3 scripts/generate-bgm-v73.py
python3 scripts/generate-narration-v73.py
npx playwright install chromium && node scripts/screenshot-github.js

# 4. 渲染
npx remotion render Episode001 out.mp4 --codec h264
```
