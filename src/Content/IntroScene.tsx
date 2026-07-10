import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { theme } from "./theme";
import { CountUp, FadeCard } from "./shared/Components";

/**
 * 场景1：开场直入（手机适配放大��）
 */
export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [225, 240], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const logoScale = spring({
    frame: frame - 5,
    fps,
    config: { damping: 10, stiffness: 80 },
  });

  const stats = [
    { icon: "⭐", value: 24, suffix: "K", label: "GitHub Stars", delay: 40 },
    { icon: "📦", value: 2.3, suffix: "M", label: "累计安装", delay: 55, decimals: true },
    { icon: "🤖", value: 72, suffix: "+", label: "支持 Agent", delay: 70 },
  ];

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
          marginBottom: 36,
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: 22,
            background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 48,
            boxShadow: `0 8px 32px ${theme.glow}`,
          }}
        >
          🔍
        </div>
        <div>
          <h2
            style={{
              fontSize: 72,
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
              fontSize: 26,
              color: theme.primary,
              fontFamily: "'JetBrains Mono'",
              margin: "4px 0 0",
              fontWeight: 700,
            }}
          >
            by Vercel
          </p>
        </div>
      </div>

      {/* 副标题 */}
      <FadeCard startFrame={30}>
        <p
          style={{
            fontSize: 38,
            fontWeight: 700,
            color: theme.textMain,
            fontFamily: "'Inter'",
            textAlign: "center",
            marginBottom: 40,
          }}
        >
          AI Agent 的<span style={{ color: theme.primary }}>技能搜索引擎</span>
        </p>
      </FadeCard>

      {/* 三组数据卡片 */}
      <div style={{ display: "flex", gap: 40 }}>
        {stats.map((stat, i) => (
          <FadeCard key={i} startFrame={stat.delay}>
            <div
              style={{
                background: "#FFF",
                borderRadius: 20,
                padding: "32px 48px",
                textAlign: "center",
                boxShadow: theme.cardShadow,
                border: `1px solid ${theme.cardBorder}`,
                minWidth: 240,
              }}
            >
              <div style={{ fontSize: 44, marginBottom: 10 }}>{stat.icon}</div>
              <div
                style={{
                  fontSize: 68,
                  fontWeight: 900,
                  color: theme.textMain,
                  fontFamily: "'Inter'",
                }}
              >
                {stat.decimals ? stat.value : <CountUp to={stat.value} startFrame={stat.delay + 5} durationFrames={40} />}
                {stat.suffix}
              </div>
              <div
                style={{
                  fontSize: 22,
                  color: theme.textDim,
                  fontFamily: "'Inter'",
                  marginTop: 6,
                }}
              >
                {stat.label}
              </div>
            </div>
          </FadeCard>
        ))}
      </div>

      {/* 排名标识 */}
      <FadeCard startFrame={90}>
        <div
          style={{
            marginTop: 28,
            padding: "8px 28px",
            borderRadius: 24,
            background: "rgba(255,140,66,0.12)",
            color: theme.primary,
            fontSize: 26,
            fontWeight: 700,
            fontFamily: "'Inter'",
          }}
        >
          🏆 skills.sh 安装量排名第一
        </div>
      </FadeCard>
    </AbsoluteFill>
  );
};
