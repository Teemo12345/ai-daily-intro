# 开场场景优化方案 — GitHub 录屏滑动效果

## 核心创意

把当前"Logo + 数据卡片"的开场，改为**模拟浏览器打开 GitHub 仓库页面的录屏效果**——浏览器窗口弹出 → 页面上下滑动 → 关键数据（星数）放大高亮，像在手机上刷 GitHub 一样。

---

## 当前方案 vs 新方案

| 维度 | 当前（V5） | 新方案 |
|------|-----------|--------|
| **视觉** | Logo + 三张数据卡片 | 模拟浏览器 + GitHub 页面滚动 |
| **真实感** | 抽象设计感 | 像真实录屏，观众代入感强 |
| **星数展示** | 小卡片里一个数字 | 从页面中弹出放大，冲击力强 |
| **时长** | 8 秒 | 8 秒（不变） |

---

## 时间线规划（8 秒 = 240 帧）

| 阶段 | 时间 | 帧范围 | 内容 | 动画 |
|------|------|--------|------|------|
| ① 浏览器弹出 | 0-1s | 0-30 | 浏览器窗口从中心放大弹出，地址栏显示 `github.com/vercel-labs/skills` | spring 弹出 |
| ② 页面顶部 | 1-2.5s | 30-75 | 显示 GitHub 仓库标题栏，能看到 `vercel-labs / skills` + `⭐ Star` 按钮 | 静止 0.5s 后星数开始闪烁高亮 |
| ③ 星数放大 | 2.5-4s | 75-120 | Stars 数字从按钮位置"跳出来"，放大到屏幕中央，显示 `⭐ 24K Stars` | scale 放大 + 数字 0→24 计数 + 背景轻微暗化 |
| ④ 星数收回 | 4-4.5s | 120-135 | 放大的星数缩回原位，背景恢复 | scale 缩小 |
| ⑤ 向下滚动 | 4.5-6s | 135-180 | 页面向上滚动，经过 README 标题区、项目简介 | translateY 平滑滚动 |
| ⑥ 显示安装命令 | 6-7s | 180-210 | 滚动到安装命令区域，命令高亮闪烁 | 滚动停止 + 命令高亮 |
| ⑦ 继续滚动到底部 | 7-8s | 210-240 | 快速滚动到底部，淡出过渡到下一场景 | 快速滚动 + 淡出 |

---

## 技术实现方案

### 1. 新建 BrowserFrame 组件

模拟浏览器窗口外壳：

```
┌─────────────────────────────────────────┐
│ 🔴 🟡 🟢   github.com/vercel-labs/skills │  ← 地址栏
├─────────────────────────────────────────┤
│                                         │
│         GitHub 页面内容区               │  ← 可滚动内容
│         (overflow: hidden)              │
│                                         │
└─────────────────────────────────────────┘
```

- 顶部：三个圆点 + 地址栏（灰色背景 + URL）
- 内容区：白色背景，`overflow: hidden`，内容超出部分隐藏
- 尺寸：宽 1200px，高 700px（留出周围空间）

### 2. 新建 GitHub 页面模拟内容

用 React/CSS 高仿 GitHub 仓库页面，从上到下排列：

```
┌─ GitHub 仓库标题栏 ──────────────────────┐
│  vercel-labs / skills        ⭐ Star 24k │  ← Stars 按钮（关键！）
│  The CLI for the open agent...           │
├─ 文件列表 ───────────────────────────────┤
│  📁 .github    📁 .husky    📁 bin      │
│  📁 scripts    📁 skills    📁 src      │
│  📄 README.md  📄 package.json          │
├─ README 内容 ────────────────────────────┤
│  # skills                                │
│  The CLI for the open agent skills...   │
│  ## Install a Skill                      │
│  $ npx skills add vercel-labs/agent-skills │
│  ## Supported Agents                     │
│  Claude Code · Cursor · Codex · ...      │
│  (72+ agents)                            │
└──────────────────────────────────────────┘
```

**关键元素精确位置**（用于滚动定位）：
- Stars 按钮：距顶部约 80px
- README 标题：距顶部约 400px
- 安装命令：距顶部约 550px
- Agent 列表：距顶部约 800px
- 总内容高度：约 1200px（视口高 700px，可滚动 500px）

### 3. 滚动动画实现

```tsx
// 根据帧数计算滚动位置
const scrollY = interpolate(frame, [135, 180, 210, 240], [0, -200, -350, -500], {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
  easing: Easing.inOut(Easing.cubic),
});

// 应用到内容容器
<div style={{ transform: `translateY(${scrollY}px)` }}>
  {/* GitHub 页面内容 */}
</div>
```

### 4. 星数放大效果实现

```tsx
// 星数放大阶段（75-120帧）
const starScale = spring({
  frame: frame - 75,
  fps,
  config: { damping: 10, stiffness: 80 },
});

const starOpacity = interpolate(frame, [75, 85, 120, 135], [0, 1, 1, 0]);

// 放大的星数浮层（覆盖在浏览器窗口上方）
{starOpacity > 0 && (
  <div style={{
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: `translate(-50%, -50%) scale(${starScale})`,
    fontSize: 120,
    opacity: starOpacity,
    // ... 样式
  }}>
    ⭐ 24K Stars
  </div>
)}

// 背景暗化
const overlayOpacity = interpolate(frame, [75, 85, 120, 135], [0, 0.4, 0.4, 0]);
```

---

## 修改范围

| 文件 | 改动 |
|------|------|
| `Content/GitHubScene.tsx` | **新建** — 替换当前 IntroScene.tsx |
| `Content/shared/BrowserFrame.tsx` | **新建** — 浏览器窗口外壳组件 |
| `FullEpisode.tsx` | **微调** — 引入 GitHubScene 替换 IntroScene |

其他场景（FeatureScene、UsageScene、InstallScene、EndingScene）**不变**。

---

## 效果预期

观众看到的效果：
1. 一个浏览器窗口从中心弹出
2. 地址栏显示 `github.com/vercel-labs/skills`
3. 页面顶部显示仓库标题 + `⭐ Star 24k` 按钮
4. 星数突然放大到屏幕中央，数字从 0 滚到 24K
5. 星数缩回，页面开始向下滑动
6. 滑过 README、安装命令、Agent 列表
7. 淡出，进入下一场景

**优势**：
- 真实感强 — 像在手机上刷 GitHub
- 数据有冲击力 — 星数从页面中"跳出来"
- 信息密度高 — 一个场景展示了仓库主页 + 星数 + 安装命令 + Agent 支持
- 观众代入感 — "这就是我去 GitHub 看的页面"
