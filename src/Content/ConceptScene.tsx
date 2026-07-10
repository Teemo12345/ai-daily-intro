import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { theme } from "./theme";
import { FadeCard } from "./shared/Components";

/**
 * 场景2：概念引入（14s - 26s，帧 0-360 相对）
 * Skills = AI 的 App Store
 */
export const ConceptScene: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [345, 360], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // App 图标交错入场
  const appIcons = [
    { emoji: "⚛️", label: "React", color: "#61DAFB" },
    { emoji: "🎨", label: "设计", color: "#FF6B6B" },
    { emoji: "🔍", label: "PR审查", color: "#A6E3A1" },
    { emoji: "📦", label: "部署", color: "#89B4FA" },
    { emoji: "📊", label: "分析", color: "#FAB387" },
    { emoji: "📝", label: "文档", color: "#F9E2AF" },
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
      {/* 标题 */}
      <FadeCard startFrame={0}>
        <h2
          style={{
            fontSize: 48,
            fontWeight: 900,
            color: theme.textMain,
            fontFamily: "'Inter', sans-serif",
            textAlign: "center",
            marginBottom: 12,
          }}
        >
          Skills = AI 的 <span style={{ color: theme.primary }}>App</span>
        </h2>
      </FadeCard>

      <FadeCard startFrame={0} delay={8}>
        <p
          style={{
            fontSize: 24,
            color: theme.textDim,
            textAlign: "center",
            marginBottom: 40,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          给 AI Agent 装上专业技能，秒变领域专家
        </p>
      </FadeCard>

      {/* 类比图：手机 = 电脑 */}
      <div
        style={{
          display: "flex",
          gap: 80,
          alignItems: "center",
          marginBottom: 40,
        }}
      >
        {/* 左：手机 + App */}
        <FadeCard startFrame={15}>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: 140,
                height: 200,
                borderRadius: 20,
                border: `3px solid ${theme.primary}`,
                padding: 16,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 8,
                background: "#FFF",
              }}
            >
              {appIcons.slice(0, 4).map((app, i) => (
                <div
                  key={i}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: app.color + "33",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                  }}
                >
                  {app.emoji}
                </div>
              ))}
            </div>
            <p style={{ fontSize: 20, color: theme.textDim, marginTop: 12, fontFamily: "'Inter'" }}>
              iPhone + App
            </p>
          </div>
        </FadeCard>

        {/* 等号 */}
        <FadeCard startFrame={25}>
          <div
            style={{
              fontSize: 60,
              fontWeight: 900,
              color: theme.primary,
              fontFamily: "'Inter'",
            }}
          >
            =
          </div>
        </FadeCard>

        {/* 右：电脑 + Skills */}
        <FadeCard startFrame={20}>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: 200,
                height: 200,
                borderRadius: 12,
                border: `3px solid ${theme.secondary}`,
                padding: 16,
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 6,
                background: "#FFF",
              }}
            >
              {appIcons.map((app, i) => (
                <div
                  key={i}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background: app.color + "33",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                  }}
                >
                  {app.emoji}
                </div>
              ))}
            </div>
            <p style={{ fontSize: 20, color: theme.textDim, marginTop: 12, fontFamily: "'Inter'" }}>
              AI Agent + Skills
            </p>
          </div>
        </FadeCard>
      </div>

      {/* 底部说明 */}
      <FadeCard startFrame={40}>
        <div
          style={{
            display: "flex",
            gap: 24,
            fontFamily: "'Inter'",
          }}
        >
          <span style={{ fontSize: 22, color: theme.textDim }}>
            装 React 技能 → <b style={{ color: theme.primary }}>前端专家</b>
          </span>
          <span style={{ fontSize: 22, color: theme.textDim }}>
            装 PR 审查 → <b style={{ color: theme.primary }}>代码审查员</b>
          </span>
        </div>
      </FadeCard>
    </AbsoluteFill>
  );
};
