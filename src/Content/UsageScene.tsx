import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { theme } from "./theme";
import { ChatBubble, FadeCard } from "./shared/Components";

/**
 * 场景3：使用方式（手机适配放大版）
 * 两个非编程案例对话演示
 */
export const UsageScene: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [405, 420], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const currentCase = Math.min(1, Math.floor(frame / 210));

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.bgDark,
        opacity: fadeIn * fadeOut,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
      }}
    >
      {/* 案例标签 */}
      <div style={{ display: "flex", gap: 20, marginBottom: 24 }}>
        {["做一个 PPT", "写营销文案"].map((label, i) => {
          const isActive = i === currentCase;
          return (
            <div
              key={i}
              style={{
                padding: "10px 28px",
                borderRadius: 24,
                background: isActive ? theme.primary : "rgba(61,40,23,0.08)",
                color: isActive ? "#FFF" : theme.textDim,
                fontSize: 26,
                fontWeight: 700,
                fontFamily: "'Inter'",
              }}
            >
              {label}
            </div>
          );
        })}
      </div>

      {/* 对话区域 */}
      <div style={{ width: "85%" }}>
        {currentCase === 0 && <PPTChat />}
        {currentCase === 1 && <CopyChat />}
      </div>
    </AbsoluteFill>
  );
};

const PPTChat: React.FC = () => {
  return (
    <>
      <ChatBubble
        startFrame={5}
        typeSpeed={1.2}
        messages={[
          { role: "user", text: "帮我做一个 PPT", delay: 0 },
          { role: "ai", text: "🔍 搜索到 pptx 技能\n自动生成幻灯片 · Anthropic 官方\n正在安装…", delay: 30 },
          { role: "ai", text: "✅ 已安装！告诉我你的主题，我帮你生成", delay: 110 },
        ]}
      />
      <FadeCard startFrame={160}>
        <div
          style={{
            marginTop: 24,
            background: "#FFF",
            borderRadius: 14,
            padding: 24,
            boxShadow: theme.cardShadow,
            border: `1px solid ${theme.cardBorder}`,
            display: "flex",
            gap: 20,
          }}
        >
          {["📊", "📈", "🎯"].map((emoji, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: 100,
                borderRadius: 10,
                background: `linear-gradient(135deg, ${[theme.primary, theme.secondary, theme.accent][i]}33, ${[theme.secondary, theme.accent, theme.primary][i]}33)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 40,
              }}
            >
              {emoji}
            </div>
          ))}
        </div>
      </FadeCard>
    </>
  );
};

const CopyChat: React.FC = () => {
  return (
    <>
      <ChatBubble
        startFrame={5}
        typeSpeed={1.2}
        messages={[
          { role: "user", text: "帮我写营销文案", delay: 0 },
          { role: "ai", text: "🔍 搜索到 copywriting 技能\n专业营销文案 · 13K 安装\n正在安装…", delay: 30 },
          { role: "ai", text: "✅ 已安装！说下你的产品，我来帮你写", delay: 110 },
        ]}
      />
      <FadeCard startFrame={160}>
        <div
          style={{
            marginTop: 24,
            background: "#FFF",
            borderRadius: 14,
            padding: 28,
            boxShadow: theme.cardShadow,
            border: `1px solid ${theme.cardBorder}`,
            fontFamily: "'Inter'",
          }}
        >
          <div style={{ fontSize: 22, color: theme.textDim, marginBottom: 10 }}>✨ 生成文案示例</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: theme.textMain, lineHeight: 1.6 }}>
            「不再为写文案头疼。<span style={{ color: theme.primary }}>AI 帮你一句话生成</span>营销文案、社媒内容、产品介绍。」
          </div>
        </div>
      </FadeCard>
    </>
  );
};
