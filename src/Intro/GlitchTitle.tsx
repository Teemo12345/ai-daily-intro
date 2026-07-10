import React from "react";
import {
  interpolate,
  useCurrentFrame,
  Easing,
  random,
} from "remotion";
import { theme } from "./theme";

/**
 * 镜头3 (1.8s - 3.0s)
 * 故障文字 → 打字机效果
 * 奶油晨光风：深棕文字，故障色差用珊瑚红+深焦糖棕
 */
export const GlitchTitle: React.FC = () => {
  const frame = useCurrentFrame();
  const title = "AI 每日一荐";

  const startFrame = 54;

  const glitchPhase = interpolate(
    frame,
    [startFrame, startFrame + 12],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const typeStart = startFrame + 6;
  const typeEnd = startFrame + 30;
  const charsToShow = Math.floor(
    interpolate(frame, [typeStart, typeEnd], [0, title.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  const opacity = interpolate(frame, [startFrame, startFrame + 4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = interpolate(frame, [startFrame, startFrame + 10], [0.3, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.5)),
  });

  const translateY = interpolate(
    frame,
    [startFrame, startFrame + 10],
    [20, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  const glitchIntensity = glitchPhase * 8;
  const glitchOffsetX = random(frame) * glitchIntensity - glitchIntensity / 2;
  const glitchOffsetY = random(frame + 100) * 4 - 2;

  const visibleText = title.slice(0, charsToShow);
  const showCursor = frame > typeStart && frame < typeEnd + 6;

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%) translateY(${translateY}px) scale(${scale})`,
        opacity,
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 96,
          fontWeight: 900,
          letterSpacing: "0.02em",
          margin: 0,
          color: theme.textMain,
          // 浅底：发光改为淡暖色阴影
          textShadow: glitchIntensity > 0
            ? `2px 0 ${theme.glitchA}, -2px 0 ${theme.glitchB}`
            : `0 2px 24px ${theme.glow}`,
          transform:
            glitchIntensity > 0
              ? `translate(${glitchOffsetX}px, ${glitchOffsetY}px)`
              : "none",
          whiteSpace: "nowrap",
        }}
      >
        {glitchIntensity > 0 && (
          <>
            <span
              style={{
                position: "absolute",
                color: theme.glitchA,
                opacity: 0.8,
                transform: `translate(${random(frame + 50) * 6 - 3}px, ${random(frame + 70) * 4 - 2}px)`,
                clipPath: `inset(${random(frame + 30) * 40}% 0 ${random(frame + 60) * 40}% 0)`,
              }}
            >
              {visibleText}
            </span>
            <span
              style={{
                position: "absolute",
                color: theme.glitchB,
                opacity: 0.8,
                transform: `translate(${random(frame + 20) * 6 - 3}px, ${random(frame + 90) * 4 - 2}px)`,
                clipPath: `inset(${random(frame + 10) * 40}% 0 ${random(frame + 40) * 40}% 0)`,
              }}
            >
              {visibleText}
            </span>
          </>
        )}
        {visibleText}
        {showCursor && (
          <span
            style={{
              opacity: Math.floor(frame / 3) % 2 === 0 ? 1 : 0,
              color: theme.primary,
              marginLeft: 4,
            }}
          >
            |
          </span>
        )}
      </h1>
    </div>
  );
};
