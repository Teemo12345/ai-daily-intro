import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

/**
 * 底部持续字幕条 — 全程显示当前旁白文字
 */
type SubtitleBarProps = {
  text: string;
  startFrame: number;
  endFrame: number;
};

export const SubtitleBar: React.FC<SubtitleBarProps> = ({
  text,
  startFrame,
  endFrame,
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [startFrame, startFrame + 5, endFrame - 5, endFrame],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <div
      style={{
        position: "absolute",
        bottom: 40,
        left: "50%",
        transform: `translateX(-50%)`,
        opacity,
        background: "rgba(0, 0, 0, 0.75)",
        borderRadius: 12,
        padding: "14px 36px",
        maxWidth: "80%",
        zIndex: 200,
      }}
    >
      <span
        style={{
          color: "#FFFFFF",
          fontSize: 36,
          fontWeight: 600,
          fontFamily: "'Inter', 'Noto Sans SC', sans-serif",
          textAlign: "center",
          lineHeight: 1.4,
        }}
      >
        {text}
      </span>
    </div>
  );
};

/**
 * 字幕条管理器 — 根据帧数自动切换字幕
 */
type SubtitleEntry = {
  text: string;
  start: number;
  end: number;
};

type SubtitleManagerProps = {
  subtitles: SubtitleEntry[];
};

export const SubtitleManager: React.FC<SubtitleManagerProps> = ({
  subtitles,
}) => {
  const frame = useCurrentFrame();

  const current = subtitles.find(
    (s) => frame >= s.start && frame < s.end
  );

  if (!current) return null;

  return (
    <SubtitleBar
      text={current.text}
      startFrame={current.start}
      endFrame={current.end}
    />
  );
};
