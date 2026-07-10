import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { theme } from "./theme";
import { Terminal } from "./shared/Terminal";
import { FadeCard } from "./shared/Components";

/**
 * 怎么用（11.5 秒 = 345 帧）
 * 旁白 11.1s：
 * "安装只需要一行命令。Claude Code、Cursor、Trae，
 *  72 种 AI 工具都能装。装完说人话就行。"
 */
export const HowToUseScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [350, 360], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const agents = ["Claude Code", "Cursor", "Trae"];

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
      {/* 终端 */}
      <FadeCard startFrame={0}>
        <div style={{ width: 900, marginBottom: 28 }}>
          <Terminal
            startFrame={5}
            typeSpeed={2}
            lines={[
              { type: "prompt", text: "npx skills add vercel-labs/skills --skill find-skills", delay: 0 },
              { type: "comment", text: "# 自动检测你的 AI 工具…", delay: 65 },
              { type: "success", text: "✓ 安装成功！", delay: 100 },
            ]}
          />
        </div>
      </FadeCard>

      {/* Agent 标签 */}
      <FadeCard startFrame={160}>
        <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
          {agents.map((agent, i) => {
            const scale = spring({
              frame: frame - 145 - i * 4,
              fps,
              config: { damping: 10, stiffness: 100 },
            });
            return (
              <div
                key={i}
                style={{
                  padding: "12px 24px",
                  borderRadius: 12,
                  background: "#FFF",
                  border: `1px solid ${theme.cardBorder}`,
                  boxShadow: theme.cardShadow,
                  transform: `scale(${Math.max(0, scale)})`,
                  fontSize: 24,
                  fontWeight: 600,
                  color: theme.textMain,
                  fontFamily: "'Inter'",
                }}
              >
                {agent}
              </div>
            );
          })}
          <div
            style={{
              padding: "12px 24px",
              borderRadius: 12,
              background: theme.primary + "12",
              border: `1px solid ${theme.primary}44`,
              fontSize: 24,
              fontWeight: 600,
              color: theme.primary,
              fontFamily: "'Inter'",
              display: "flex",
              alignItems: "center",
            }}
          >
            等 72 种
          </div>
        </div>
      </FadeCard>

      {/* 底部强调 */}
      <FadeCard startFrame={240}>
        <div
          style={{
            padding: "14px 36px",
            borderRadius: 18,
            background: "rgba(255,140,66,0.1)",
            border: `2px solid ${theme.primary}`,
            fontFamily: "'Inter', 'Noto Sans SC', sans-serif",
            fontSize: 30,
            color: theme.textMain,
            textAlign: "center",
            fontWeight: 700,
          }}
        >
          装完直接说人话就行
        </div>
      </FadeCard>
    </AbsoluteFill>
  );
};
