import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { theme } from "./theme";
import { FadeCard } from "./shared/Components";

/**
 * 场景2：功能介绍（手机适配放大版）
 */
export const FeatureScene: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [525, 540], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const steps = [
    { icon: "💬", text: "你说要干嘛", delay: 220 },
    { icon: "🔍", text: "AI 搜索技能", delay: 240 },
    { icon: "✅", text: "自动安装", delay: 260 },
    { icon: "🚀", text: "开始使用", delay: 280 },
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
        padding: 50,
      }}
    >
      {/* 类比标题 */}
      <FadeCard startFrame={0}>
        <h2
          style={{
            fontSize: 56,
            fontWeight: 900,
            color: theme.textMain,
            fontFamily: "'Inter'",
            textAlign: "center",
            marginBottom: 36,
          }}
        >
          AI Agent = 手机，Skills = <span style={{ color: theme.primary }}>App</span>
        </h2>
      </FadeCard>

      {/* 类比图 */}
      <FadeCard startFrame={10}>
        <div
          style={{
            display: "flex",
            gap: 70,
            alignItems: "center",
            marginBottom: 44,
          }}
        >
          {/* 手机 */}
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: 130,
                height: 180,
                borderRadius: 20,
                border: `4px solid ${theme.primary}`,
                padding: 14,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 8,
                background: "#FFF",
              }}
            >
              {["⚛️", "🎨", "📝", "📊"].map((emoji, i) => (
                <div
                  key={i}
                  style={{
                    borderRadius: 10,
                    background: theme.primary + "15",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 28,
                  }}
                >
                  {emoji}
                </div>
              ))}
            </div>
            <p style={{ fontSize: 22, color: theme.textDim, marginTop: 12, fontFamily: "'Inter'" }}>
              手机 + App
            </p>
          </div>

          <div style={{ fontSize: 56, fontWeight: 900, color: theme.primary }}>=</div>

          {/* 搜索栏 */}
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: 280,
                height: 72,
                borderRadius: 36,
                background: "#FFF",
                border: `3px solid ${theme.secondary}`,
                display: "flex",
                alignItems: "center",
                paddingLeft: 26,
                fontFamily: "'JetBrains Mono'",
                fontSize: 24,
                color: theme.textDim,
                boxShadow: theme.cardShadow,
              }}
            >
              <span style={{ marginRight: 10 }}>🔍</span>
              App Store 搜索栏
            </div>
            <p style={{ fontSize: 22, color: theme.textDim, marginTop: 12, fontFamily: "'Inter'" }}>
              AI Agent + find-skills
            </p>
          </div>
        </div>
      </FadeCard>

      {/* 工作流程 */}
      <FadeCard startFrame={210}>
        <p
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: theme.textMain,
            fontFamily: "'Inter'",
            textAlign: "center",
            marginBottom: 28,
          }}
        >
          直接说你要干嘛，AI 自动搞定
        </p>
      </FadeCard>

      <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            <FadeCard startFrame={step.delay}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "22px 32px",
                  borderRadius: 16,
                  background: "#FFF",
                  border: `1px solid ${theme.cardBorder}`,
                  boxShadow: theme.cardShadow,
                  minWidth: 180,
                }}
              >
                <div style={{ fontSize: 44, marginBottom: 10 }}>{step.icon}</div>
                <div style={{ fontSize: 24, fontWeight: 600, color: theme.textMain, fontFamily: "'Inter'" }}>
                  {step.text}
                </div>
              </div>
            </FadeCard>
            {i < steps.length - 1 && (
              <FadeCard startFrame={step.delay + 8}>
                <div style={{ fontSize: 32, color: theme.primary }}>→</div>
              </FadeCard>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* 底部强调 */}
      <FadeCard startFrame={320}>
        <div
          style={{
            marginTop: 34,
            padding: "14px 32px",
            borderRadius: 16,
            background: "rgba(255,140,66,0.1)",
            border: `2px solid ${theme.primary}`,
            fontFamily: "'Inter'",
            fontSize: 30,
            color: theme.textMain,
            textAlign: "center",
            fontWeight: 700,
          }}
        >
          💬 不用记命令，<span style={{ color: theme.primary }}>说人话就行</span>
        </div>
      </FadeCard>
    </AbsoluteFill>
  );
};
