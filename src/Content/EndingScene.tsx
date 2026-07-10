import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { theme } from "./theme";
import { FadeCard } from "./shared/Components";

/**
 * 场景5：结尾引导（手机适配放大版）
 */
export const EndingScene: React.FC = () => {
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
      {/* 网址 */}
      <FadeCard startFrame={0}>
        <div
          style={{
            fontSize: 84,
            fontWeight: 900,
            fontFamily: "'JetBrains Mono'",
            color: theme.textMain,
            marginBottom: 16,
          }}
        >
          skills<span style={{ color: theme.primary }}>.sh</span>
        </div>
      </FadeCard>

      {/* 标签 */}
      <FadeCard startFrame={5}>
        <div style={{ display: "flex", gap: 16, marginBottom: 36 }}>
          <span style={{ padding: "8px 22px", borderRadius: 20, background: "rgba(166,227,161,0.2)", color: "#4a9d3f", fontSize: 26, fontWeight: 700, fontFamily: "'Inter'" }}>
            ✅ 免费
          </span>
          <span style={{ padding: "8px 22px", borderRadius: 20, background: "rgba(89,140,238,0.15)", color: "#598eee", fontSize: 26, fontWeight: 700, fontFamily: "'Inter'" }}>
            🔓 开源
          </span>
        </div>
      </FadeCard>

      {/* 关注按钮 */}
      <FadeCard startFrame={15}>
        <div
          style={{
            padding: "18px 52px",
            borderRadius: 36,
            background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
            color: "#FFF",
            fontSize: 36,
            fontWeight: 700,
            fontFamily: "'Inter'",
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
      <FadeCard startFrame={30}>
        <div style={{ marginTop: 24, fontSize: 22, color: theme.textMuted, fontFamily: "'JetBrains Mono'" }}>
          AI 每日一荐 · 第 001 期
        </div>
      </FadeCard>
    </AbsoluteFill>
  );
};
