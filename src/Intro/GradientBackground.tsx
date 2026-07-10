import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";
import { theme } from "./theme";

/**
 * 渐变背景 - 奶油晨光风
 * 奶油白底 + 淡橙金光晕，温暖明亮
 */
export const GradientBackground: React.FC = () => {
  const frame = useCurrentFrame();

  const gradientShift = (frame * 0.5) % 360;

  const intensity = interpolate(frame, [90, 110], [0.6, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: `
          radial-gradient(ellipse at ${20 + Math.sin((gradientShift * Math.PI) / 180) * 15}% ${30 + Math.cos((gradientShift * Math.PI) / 180) * 10}%, 
            rgba(255, 140, 66, ${0.1 * intensity}) 0%, 
            transparent 50%),
          radial-gradient(ellipse at ${80 - Math.cos((gradientShift * Math.PI) / 180) * 15}% ${70 - Math.sin((gradientShift * Math.PI) / 180) * 10}%, 
            rgba(255, 210, 63, ${0.08 * intensity}) 0%, 
            transparent 50%),
          radial-gradient(ellipse at ${50 + Math.sin((gradientShift * Math.PI) / 90) * 10}% ${50}%, 
            rgba(255, 107, 107, ${0.05 * intensity}) 0%, 
            transparent 60%),
          linear-gradient(135deg, ${theme.bgDark} 0%, ${theme.bgMid} 50%, ${theme.bgDark} 100%)
        `,
      }}
    />
  );
};

/**
 * 动态网格背景 - 暖棕色极淡线
 */
export const GridOverlay: React.FC = () => {
  const frame = useCurrentFrame();

  const offset = (frame * 0.3) % 60;

  const opacity = interpolate(frame, [0, 15], [0, 0.1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        opacity,
        backgroundImage: `
          linear-gradient(rgba(107, 52, 16, 0.4) 1px, transparent 1px),
          linear-gradient(90deg, rgba(107, 52, 16, 0.4) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        backgroundPosition: `${offset}px ${offset}px`,
        maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
      }}
    />
  );
};

/**
 * 日期标签
 */
export const DateLabel: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [96, 108], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(frame, [96, 108], [15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const today = new Date();
  const dateStr = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, "0")}.${String(today.getDate()).padStart(2, "0")}`;

  return (
    <div
      style={{
        position: "absolute",
        top: "calc(50% + 80px)",
        left: "50%",
        transform: `translateX(-50%) translateY(${translateY}px)`,
        opacity,
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <div
        style={{
          width: 40,
          height: 1.5,
          background: `linear-gradient(90deg, transparent, ${theme.primary})`,
        }}
      />
      <span
        style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 22,
          color: theme.primary,
          letterSpacing: "0.15em",
          fontWeight: 700,
        }}
      >
        {dateStr}
      </span>
      <div
        style={{
          width: 40,
          height: 1.5,
          background: `linear-gradient(90deg, ${theme.primary}, transparent)`,
        }}
      />
    </div>
  );
};
