import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { theme } from "./theme";
import { Terminal } from "./shared/Terminal";
import { FadeCard } from "./shared/Components";

/**
 * 场景4：安装方式（手机适配放大版）
 */
export const InstallScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [345, 360], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const internationalAgents = ["Claude Code", "Cursor", "Codex", "Copilot", "Windsurf", "Gemini CLI"];
  const domesticAgents = ["Trae", "CodeBuddy", "Kimi Code", "Qoder", "Cline", "通义千问"];

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
      <FadeCard startFrame={0}>
        <h2
          style={{
            fontSize: 54,
            fontWeight: 900,
            color: theme.textMain,
            fontFamily: "'Inter'",
            textAlign: "center",
            marginBottom: 24,
          }}
        >
          安装只需 <span style={{ color: theme.primary }}>一行命令</span>
        </h2>
      </FadeCard>

      {/* 终端 */}
      <FadeCard startFrame={5}>
        <div style={{ width: 900, marginBottom: 28 }}>
          <Terminal
            startFrame={10}
            typeSpeed={2}
            lines={[
              { type: "prompt", text: "npx skills add vercel-labs/skills --skill find-skills", delay: 0 },
              { type: "comment", text: "# 自动检测你的 AI Agent…", delay: 65 },
              { type: "success", text: "✓ 安装成功！", delay: 100 },
            ]}
          />
        </div>
      </FadeCard>

      {/* 国际 Agent */}
      <FadeCard startFrame={130}>
        <div style={{ marginBottom: 14 }}>
          <span style={{ fontSize: 24, color: theme.textDim, fontFamily: "'Inter'", fontWeight: 600 }}>
            国际主流
          </span>
        </div>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", maxWidth: 850, marginBottom: 24 }}>
          {internationalAgents.map((agent, i) => {
            const scale = spring({
              frame: frame - 135 - i * 3,
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
        </div>
      </FadeCard>

      {/* 国内 Agent */}
      <FadeCard startFrame={170}>
        <div style={{ marginBottom: 14 }}>
          <span style={{ fontSize: 24, color: theme.primary, fontFamily: "'Inter'", fontWeight: 600 }}>
            国内 Agent
          </span>
        </div>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", maxWidth: 850, marginBottom: 24 }}>
          {domesticAgents.map((agent, i) => {
            const scale = spring({
              frame: frame - 175 - i * 3,
              fps,
              config: { damping: 10, stiffness: 100 },
            });
            return (
              <div
                key={i}
                style={{
                  padding: "12px 24px",
                  borderRadius: 12,
                  background: theme.primary + "12",
                  border: `1px solid ${theme.primary}44`,
                  transform: `scale(${Math.max(0, scale)})`,
                  fontSize: 24,
                  fontWeight: 600,
                  color: theme.primary,
                  fontFamily: "'Inter'",
                }}
              >
                {agent}
              </div>
            );
          })}
        </div>
      </FadeCard>

      {/* 底部强调 */}
      <FadeCard startFrame={230}>
        <div
          style={{
            padding: "14px 36px",
            borderRadius: 18,
            background: "rgba(255,140,66,0.1)",
            border: `2px solid ${theme.primary}`,
            fontFamily: "'Inter'",
            fontSize: 28,
            color: theme.textMain,
            textAlign: "center",
            fontWeight: 700,
          }}
        >
          72+ Agent，<span style={{ color: theme.primary }}>装法完全一样</span>
        </div>
      </FadeCard>
    </AbsoluteFill>
  );
};
