import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig, Easing } from "remotion";
import { theme } from "./theme";
import { CountUp, Badge, FadeCard } from "./shared/Components";

/**
 * 场景3：工具介绍（26s - 36s，帧 0-300 相对）
 * find-skills，1.2M 安装，技能界的 Google
 */
export const ToolIntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [285, 300], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Logo 弹出
  const logoScale = spring({
    frame: frame - 5,
    fps,
    config: { damping: 10, stiffness: 80 },
  });

  // 搜索栏动画
  const searchBarWidth = interpolate(frame, [60, 90], [0, 500], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
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
      {/* Logo 区 */}
      <div
        style={{
          transform: `scale(${Math.max(0, logoScale)})`,
          marginBottom: 20,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        {/* 搜索图标 */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 40,
            boxShadow: `0 8px 32px ${theme.glow}`,
          }}
        >
          🔍
        </div>
        <div>
          <h2
            style={{
              fontSize: 56,
              fontWeight: 900,
              color: theme.textMain,
              fontFamily: "'Inter'",
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            find-skills
          </h2>
          <p
            style={{
              fontSize: 20,
              color: theme.primary,
              fontFamily: "'JetBrains Mono'",
              margin: "4px 0 0",
              fontWeight: 700,
            }}
          >
            by Vercel Labs
          </p>
        </div>
      </div>

      {/* 安装量计数 */}
      <FadeCard startFrame={30}>
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 900,
              fontFamily: "'Inter'",
              color: theme.textMain,
            }}
          >
            <CountUp to={1200000} startFrame={35} durationFrames={50} />
          </div>
          <p
            style={{
              fontSize: 22,
              color: theme.textDim,
              fontFamily: "'Inter'",
              margin: "4px 0 0",
            }}
          >
            安装量 · skills.sh 排名第一
          </p>
        </div>
      </FadeCard>

      {/* 标签 */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        <Badge text="Vercel 出品" startFrame={90} />
        <Badge text="120万安装" bg={theme.secondary} color={theme.textMain} startFrame={90} delay={5} />
        <Badge text="排名第一" bg={theme.accent} startFrame={90} delay={10} />
      </div>

      {/* 搜索栏示意 */}
      <FadeCard startFrame={60}>
        <div
          style={{
            width: Math.max(searchBarWidth, 0),
            height: 56,
            borderRadius: 28,
            background: "#FFF",
            border: `2px solid ${theme.primary}`,
            display: "flex",
            alignItems: "center",
            paddingLeft: 24,
            fontFamily: "'JetBrains Mono'",
            fontSize: 22,
            color: theme.textDim,
            boxShadow: theme.cardShadow,
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ marginRight: 12 }}>🔍</span>
          <span style={{ opacity: searchBarWidth > 300 ? 1 : 0, transition: "opacity 0.3s" }}>
            npx skills find [关键词]
          </span>
          <span
            style={{
              opacity: frame > 100 && Math.floor(frame / 8) % 2 === 0 ? 1 : 0,
              color: theme.primary,
              marginLeft: 4,
            }}
          >
            |
          </span>
        </div>
      </FadeCard>

      {/* 一句话定位 */}
      <FadeCard startFrame={120}>
        <p
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: theme.textMain,
            fontFamily: "'Inter'",
            marginTop: 24,
            textAlign: "center",
          }}
        >
          技能界的 <span style={{ color: theme.primary }}>Google</span>，一行命令搜索安装
        </p>
      </FadeCard>
    </AbsoluteFill>
  );
};
