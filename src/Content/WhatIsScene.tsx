import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { theme } from "./theme";
import { FadeCard } from "./shared/Components";

/**
 * 段落2：find-skills 是什么（4 秒）
 * 一句话说清：帮你搜索和安装 AI 技能的工具
 */
export const WhatIsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [200, 210], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const logoScale = spring({
    frame: frame - 5,
    fps,
    config: { damping: 10, stiffness: 80 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.bgDark,
        opacity: fadeIn * fadeOut,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      {/* Logo */}
      <div
        style={{
          transform: `scale(${Math.max(0, logoScale)})`,
          marginBottom: 28,
          display: "flex",
          alignItems: "center",
          gap: 18,
        }}
      >
        <div
          style={{
            width: 84,
            height: 84,
            borderRadius: 20,
            background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 42,
            boxShadow: `0 8px 32px ${theme.glow}`,
          }}
        >
          🔍
        </div>
        <h2
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: theme.textMain,
            fontFamily: "'Inter'",
            margin: 0,
          }}
        >
          find-skills
        </h2>
      </div>

      {/* 一句话定义 */}
      <FadeCard startFrame={25}>
        <p
          style={{
            fontSize: 44,
            fontWeight: 700,
            color: theme.textMain,
            fontFamily: "'Inter', 'Noto Sans SC', sans-serif",
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          帮你<span style={{ color: theme.primary }}>搜索</span>和
          <span style={{ color: theme.secondary }}>安装</span> AI 技能的工具
        </p>
      </FadeCard>

      {/* by Vercel */}
      <FadeCard startFrame={45}>
        <p
          style={{
            fontSize: 26,
            color: theme.textDim,
            fontFamily: "'JetBrains Mono'",
            marginTop: 16,
          }}
        >
          by Vercel
        </p>
      </FadeCard>
    </AbsoluteFill>
  );
};
