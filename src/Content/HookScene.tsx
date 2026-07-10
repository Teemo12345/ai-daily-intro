import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { theme } from "./theme";
import { ChatBubble } from "./shared/Components";

/**
 * 场景1：开场钩子（6s - 14s，帧 0-240 相对）
 * AI 助手会写代码，但不懂你的业务
 */
export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 问号动画
  const questionScale = spring({
    frame: frame - 180,
    fps,
    config: { damping: 8, stiffness: 80 },
  });
  const questionOpacity = interpolate(frame, [175, 185], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 整体淡出
  const fadeOut = interpolate(frame, [225, 240], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.bgDark,
        opacity: fadeOut,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      {/* 对话区 */}
      <div style={{ width: "100%", maxWidth: 900 }}>
        <ChatBubble
          startFrame={5}
          messages={[
            { role: "user", text: "帮我优化 React 性能", delay: 0 },
            { role: "ai", text: "可以使用 useMemo、useCallback...（泛泛而谈）", delay: 40 },
            { role: "user", text: "帮我做 PR 审查", delay: 90 },
            { role: "ai", text: "我可以帮忙，但不太懂你们团队的规范…", delay: 130 },
          ]}
        />
      </div>

      {/* 问号 + 痛点文字 */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${questionScale})`,
          opacity: questionOpacity,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontWeight: 900,
            color: theme.primary,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          ?
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: theme.textMain,
            fontFamily: "'Inter', sans-serif",
            marginTop: 8,
          }}
        >
          AI 懂代码，但不懂你的业务
        </div>
      </div>
    </AbsoluteFill>
  );
};
