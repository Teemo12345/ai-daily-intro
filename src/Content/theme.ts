import { theme as introTheme } from "../Intro/theme";

/**
 * 内容区主题 — 复用奶油晨光风配色
 */
export const theme = {
  ...introTheme,

  // 终端配色（深色对比块）
  terminalBg: "#1E1E2E",
  terminalText: "#E0DEF4",
  terminalPrompt: "#FF8C42",
  terminalHighlight: "#FFD23F",
  terminalSuccess: "#A6E3A1",
  terminalError: "#F38BA8",

  // 对话气泡
  bubbleUser: "#FF8C42",
  bubbleAIText: "#3D2817",

  // 卡片
  cardBg: "rgba(255, 255, 255, 0.85)",
  cardBorder: "rgba(61, 40, 23, 0.12)",
  cardShadow: "0 4px 24px rgba(107, 52, 16, 0.08)",
} as const;
