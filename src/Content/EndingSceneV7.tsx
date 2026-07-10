import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { theme } from "./theme";
import { FadeCard } from "./shared/Components";

/**
 * 段落6：结尾（12 秒）
 * 免费/开源 + 互动 + 关注
 */
export const EndingSceneV7: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pulseScale = 1 + Math.sin(frame * 0.12) * 0.03;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.bgDark,
        opacity: fadeIn,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      {/* 免费/开源 */}
      <FadeCard startFrame={0}>
        <div style={{ display: "flex", gap: 16, marginBottom: 36 }}>
          <span style={{ padding: "8px 22px", borderRadius: 20, background: "rgba(166,227,161,0.2)", color: "#4a9d3f", fontSize: 28, fontWeight: 700, fontFamily: "'Inter'" }}>
            ✅ 免费
          </span>
          <span style={{ padding: "8px 22px", borderRadius: 20, background: "rgba(89,140,238,0.15)", color: "#598eee", fontSize: 28, fontWeight: 700, fontFamily: "'Inter'" }}>
            🔓 开源
          </span>
        </div>
      </FadeCard>

      {/* 互动问题 */}
      <FadeCard startFrame={20}>
        <p
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: theme.textMain,
            fontFamily: "'Inter', 'Noto Sans SC', sans-serif",
            textAlign: "center",
            marginBottom: 30,
          }}
        >
          你最想找什么<span style={{ color: theme.primary }}>AI 技能</span>？
        </p>
      </FadeCard>

      <FadeCard startFrame={35}>
        <p
          style={{
            fontSize: 26,
            color: theme.textDim,
            fontFamily: "'Inter', 'Noto Sans SC', sans-serif",
            textAlign: "center",
            marginBottom: 30,
          }}
        >
          评论区告诉我
        </p>
      </FadeCard>

      {/* 关注按钮 */}
      <FadeCard startFrame={60}>
        <div
          style={{
            padding: "18px 52px",
            borderRadius: 36,
            background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
            color: "#FFF",
            fontSize: 36,
            fontWeight: 700,
            fontFamily: "'Inter', 'Noto Sans SC', sans-serif",
            transform: `scale(${pulseScale})`,
            boxShadow: `0 8px 32px ${theme.glow}`,
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <span>👆</span>
          <span>关注我，明天见</span>
        </div>
      </FadeCard>

      {/* 期号 */}
      <FadeCard startFrame={75}>
        <div style={{ marginTop: 24, fontSize: 22, color: theme.textMuted, fontFamily: "'JetBrains Mono'" }}>
          AI 每日一荐 · 第 001 期
        </div>
      </FadeCard>
    </AbsoluteFill>
  );
};
