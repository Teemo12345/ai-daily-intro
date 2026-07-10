import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { theme } from "./theme";
import { ChatBubble, FadeCard } from "./shared/Components";

/**
 * find-skills 怎么工作（12.5 秒 = 375 帧）
 * 旁白 12.0s，对齐：
 * "它怎么工作？你说'帮我做个PPT'，它会自动搜索，
 *  找到最合适的技能，一键装好，直接能用。不用自己找，不用记命令。"
 */
export const HowItWorksScene: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [410, 420], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const steps = [
    { icon: "💬", text: "你说要干嘛", delay: 230 },
    { icon: "🔍", text: "自动搜索技能", delay: 255 },
    { icon: "📦", text: "一键安装", delay: 280 },
    { icon: "✅", text: "直接使用", delay: 305 },
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
        padding: 40,
      }}
    >
      {/* 标题 */}
      <FadeCard startFrame={0}>
        <h2
          style={{
            fontSize: 48,
            fontWeight: 900,
            color: theme.textMain,
            fontFamily: "'Inter', 'Noto Sans SC', sans-serif",
            textAlign: "center",
            marginBottom: 30,
          }}
        >
          它怎么<span style={{ color: theme.primary }}>工作</span>？
        </h2>
      </FadeCard>

      {/* 对话演示 */}
      <div style={{ width: "80%", marginBottom: 30 }}>
        <ChatBubble
          startFrame={15}
          typeSpeed={1.2}
          messages={[
            { role: "user", text: "帮我做一个 PPT", delay: 0 },
            { role: "ai", text: "🔍 搜索到 pptx 技能\n自动生成幻灯片 · 已安装！", delay: 40 },
            { role: "ai", text: "✅ 告诉我你的主题，我帮你生成", delay: 130 },
          ]}
        />
      </div>

      {/* 四步流程 */}
      <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            <FadeCard startFrame={step.delay}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "20px 28px",
                  borderRadius: 16,
                  background: "#FFF",
                  border: `1px solid ${theme.cardBorder}`,
                  boxShadow: theme.cardShadow,
                  minWidth: 170,
                }}
              >
                <div style={{ fontSize: 40, marginBottom: 10 }}>{step.icon}</div>
                <div style={{ fontSize: 24, fontWeight: 600, color: theme.textMain, fontFamily: "'Inter', 'Noto Sans SC'" }}>
                  {step.text}
                </div>
              </div>
            </FadeCard>
            {i < steps.length - 1 && (
              <FadeCard startFrame={step.delay + 8}>
                <div style={{ fontSize: 28, color: theme.primary }}>→</div>
              </FadeCard>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* 底部强调 */}
      <FadeCard startFrame={350}>
        <div
          style={{
            marginTop: 30,
            padding: "14px 32px",
            borderRadius: 16,
            background: "rgba(255,140,66,0.1)",
            border: `2px solid ${theme.primary}`,
            fontFamily: "'Inter', 'Noto Sans SC', sans-serif",
            fontSize: 30,
            color: theme.textMain,
            textAlign: "center",
            fontWeight: 700,
          }}
        >
          不用自己找，<span style={{ color: theme.primary }}>不用记命令</span>
        </div>
      </FadeCard>
    </AbsoluteFill>
  );
};
