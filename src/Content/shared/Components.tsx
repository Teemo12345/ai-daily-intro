import React from "react";
import { interpolate, useCurrentFrame, spring, useVideoConfig, Easing } from "remotion";
import { theme } from "../theme";

/**
 * 对话气泡组件 — 用户/AI 对话（手机适配放大版）
 */
type Message = {
  role: "user" | "ai";
  text: string;
  delay?: number;
};

type ChatBubbleProps = {
  messages: Message[];
  startFrame?: number;
  typeSpeed?: number;
};

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  messages,
  startFrame = 0,
  typeSpeed = 1.2,
}) => {
  const frame = useCurrentFrame();

  let cumulativeFrame = startFrame;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18, width: "90%" }}>
      {messages.map((msg, i) => {
        const lineStart = cumulativeFrame;
        const textLength = msg.text.length;
        const lineEnd = lineStart + textLength * typeSpeed;
        cumulativeFrame = lineEnd + 8;

        const notStarted = frame < lineStart;
        const isTyping = frame >= lineStart && frame < lineEnd;
        const isDone = frame >= lineEnd;

        let visibleText = "";
        if (isTyping) {
          const charsShown = Math.floor((frame - lineStart) / typeSpeed);
          visibleText = msg.text.slice(0, charsShown);
        } else if (isDone) {
          visibleText = msg.text;
        }

        const isUser = msg.role === "user";

        return (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: isUser ? "flex-end" : "flex-start",
              opacity: notStarted ? 0 : 1,
              transform: `translateY(${notStarted ? 10 : 0}px)`,
              transition: "all 0.3s",
            }}
          >
            <div
              style={{
                maxWidth: "78%",
                padding: "20px 30px",
                borderRadius: isUser ? "24px 24px 6px 24px" : "24px 24px 24px 6px",
                background: isUser ? theme.bubbleUser : "#FFFFFF",
                color: isUser ? "#FFFFFF" : theme.bubbleAIText,
                fontSize: 32,
                lineHeight: 1.6,
                fontFamily: "'Inter', sans-serif",
                boxShadow: isUser ? "none" : theme.cardShadow,
                border: isUser ? "none" : `1px solid ${theme.cardBorder}`,
                whiteSpace: "pre-wrap",
              }}
            >
              {!isUser && (
                <div
                  style={{
                    fontSize: 18,
                    color: theme.primary,
                    fontWeight: 700,
                    marginBottom: 6,
                  }}
                >
                  AI
                </div>
              )}
              {visibleText}
              {isTyping && (
                <span
                  style={{
                    opacity: Math.floor(frame / 3) % 2 === 0 ? 1 : 0,
                    color: isUser ? "#FFF" : theme.primary,
                  }}
                >
                  ▋
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

/**
 * 数字计数动画组件
 */
type CountUpProps = {
  from?: number;
  to: number;
  startFrame?: number;
  durationFrames?: number;
  suffix?: string;
  prefix?: string;
};

export const CountUp: React.FC<CountUpProps> = ({
  from = 0,
  to,
  startFrame = 0,
  durationFrames = 45,
  suffix = "",
  prefix = "",
}) => {
  const frame = useCurrentFrame();

  const progress = interpolate(
    frame,
    [startFrame, startFrame + durationFrames],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  const value = Math.floor(from + (to - from) * progress);
  const formatted = value.toLocaleString("en-US");

  return (
    <span>
      {prefix}{formatted}{suffix}
    </span>
  );
};

/**
 * 通用淡入卡片
 */
type FadeCardProps = {
  children: React.ReactNode;
  startFrame?: number;
  delay?: number;
};

export const FadeCard: React.FC<FadeCardProps> = ({
  children,
  startFrame = 0,
  delay = 0,
}) => {
  const frame = useCurrentFrame();

  const start = startFrame + delay;
  const opacity = interpolate(frame, [start, start + 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(frame, [start, start + 8], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div style={{ opacity, transform: `translateY(${translateY}px)` }}>{children}</div>
  );
};

/**
 * 标签徽章
 */
type BadgeProps = {
  text: string;
  color?: string;
  bg?: string;
  startFrame?: number;
  delay?: number;
};

export const Badge: React.FC<BadgeProps> = ({
  text,
  color = "#FFFFFF",
  bg = theme.primary,
  startFrame = 0,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const start = startFrame + delay;
  const scale = spring({
    frame: frame - start,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  return (
    <div
      style={{
        display: "inline-block",
        padding: "10px 26px",
        borderRadius: 24,
        background: bg,
        color,
        fontSize: 28,
        fontWeight: 700,
        fontFamily: "'Inter', sans-serif",
        transform: `scale(${Math.max(0, scale)})`,
        boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
      }}
    >
      {text}
    </div>
  );
};
