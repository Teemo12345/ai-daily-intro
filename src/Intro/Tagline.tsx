import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { theme } from "./theme";

/**
 * 镜头5 (4.2s - 5.5s)
 * 底部标语 - 奶油晨光风
 */
export const Tagline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const startFrame = 126;

  const part1Opacity = interpolate(frame, [startFrame, startFrame + 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const part1Y = interpolate(frame, [startFrame, startFrame + 8], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const part2Opacity = interpolate(
    frame,
    [startFrame + 6, startFrame + 14],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const part2Y = interpolate(frame, [startFrame + 6, startFrame + 14], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const lineWidth = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: 60,
        left: "50%",
        transform: "translateX(-50%)",
        textAlign: "center",
        width: "80%",
      }}
    >
      <div
        style={{
          width: `${lineWidth * 120}px`,
          height: 1,
          background: `linear-gradient(90deg, transparent, ${theme.lineColor}, transparent)`,
          margin: "0 auto 16px",
        }}
      />
      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 28,
          color: theme.textDim,
          margin: 0,
          lineHeight: 1.6,
        }}
      >
        <span style={{ opacity: part1Opacity, display: "inline-block", transform: `translateY(${part1Y}px)` }}>
          每天一个 <span style={{ color: theme.primary, fontWeight: 700 }}>AI 工具</span>
        </span>
        <br />
        <span style={{ opacity: part2Opacity, display: "inline-block", transform: `translateY(${part2Y}px)` }}>
          带你发现<span style={{ color: theme.textMain, fontWeight: 700 }}>效率新大陆</span>
        </span>
      </p>
    </div>
  );
};

/**
 * 镜头5: 整体缩放定格效果
 * 奶油底：边缘极淡暖色渐暗
 */
export const FinalZoom: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = interpolate(frame, [150, 180], [1, 0.92], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  const shadowScale = spring({
    frame: frame - 150,
    fps,
    config: { damping: 20, stiffness: 60 },
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        transform: `scale(${scale})`,
      }}
    >
      {/* 边缘极淡暖色渐暗 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          boxShadow: `inset 0 0 ${80 + shadowScale * 40}px rgba(107, 52, 16, 0.1)`,
          pointerEvents: "none",
          zIndex: 100,
        }}
      />
      {children}
    </div>
  );
};
