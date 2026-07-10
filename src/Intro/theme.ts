/**
 * 「AI 每日一荐」片头主题配置
 *
 * 当前方案：奶油晨光风
 * - 奶油白背景，温暖明亮，像晨光洒在纸面
 * - 橙金渐变主色，深棕文字（不用纯黑，更柔和）
 * - 浅色但有温度，介于暖橙活力与极简纸白之间
 */
export const theme = {
  // 背景
  bgDark: "#FAF7F2", // 奶油白
  bgMid: "#F5EFE6", // 暖米色（渐变中段）

  // 主色（橙金渐变）
  primary: "#FF8C42", // 橙
  secondary: "#FFD23F", // 金

  // 强调色
  accent: "#FF6B6B", // 珊瑚红

  // 文字（深棕色系，比纯黑柔和）
  textMain: "#3D2817", // 深咖
  textDim: "rgba(61, 40, 23, 0.72)",
  textMuted: "rgba(61, 40, 23, 0.45)",

  // 辅助
  warmWhite: "#FAF7F2",

  // 渐变定义
  gradient: "linear-gradient(135deg, #FF8C42 0%, #FFD23F 100%)",

  // 故障色差双色（浅底可见的深暖色系）
  glitchA: "#FF6B6B", // 珊瑚红
  glitchB: "#6B3410", // 深焦糖棕

  // 发光色（浅底用淡暖色阴影）
  glow: "rgba(255, 140, 66, 0.25)",

  // 装饰线颜色
  lineColor: "rgba(255, 140, 66, 0.4)",
} as const;
