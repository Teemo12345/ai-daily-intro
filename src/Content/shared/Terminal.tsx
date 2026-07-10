import React from "react";
import { useCurrentFrame } from "remotion";
import { theme } from "../theme";

/**
 * 终端组件 — 深色代码块，支持打字机效果（手机适配放大版）
 */
type TerminalLine = {
  type: "prompt" | "output" | "success" | "comment";
  text: string;
  delay?: number;
};

type TerminalProps = {
  lines: TerminalLine[];
  startFrame?: number;
  typeSpeed?: number;
  width?: number | string;
  height?: number | string;
};

export const Terminal: React.FC<TerminalProps> = ({
  lines,
  startFrame = 0,
  typeSpeed = 1.5,
  width = "85%",
  height = "auto",
}) => {
  const frame = useCurrentFrame();

  let cumulativeFrame = startFrame;
  const renderedLines = lines.map((line, i) => {
    const lineStart = cumulativeFrame;
    const textLength = line.text.length;
    const lineEnd = lineStart + textLength * typeSpeed;
    cumulativeFrame = lineEnd + 3;

    const isTyping = frame >= lineStart && frame < lineEnd;
    const isDone = frame >= lineEnd;
    const notStarted = frame < lineStart;

    let visibleText = "";
    if (notStarted) {
      visibleText = "";
    } else if (isTyping) {
      const charsShown = Math.floor((frame - lineStart) / typeSpeed);
      visibleText = line.text.slice(0, charsShown);
    } else {
      visibleText = line.text;
    }

    return { ...line, visibleText, isTyping, isDone, showCursor: isTyping };
  });

  const colors = {
    prompt: theme.terminalPrompt,
    output: theme.terminalText,
    success: theme.terminalSuccess,
    comment: "rgba(224, 222, 244, 0.4)",
  };

  return (
    <div
      style={{
        width,
        height,
        background: theme.terminalBg,
        borderRadius: 16,
        padding: "28px 36px",
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        fontSize: 28,
        lineHeight: 2,
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 10,
          marginBottom: 16,
          paddingBottom: 14,
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div style={{ width: 16, height: 16, borderRadius: 8, background: "#FF5F57" }} />
        <div style={{ width: 16, height: 16, borderRadius: 8, background: "#FEBC2E" }} />
        <div style={{ width: 16, height: 16, borderRadius: 8, background: "#28C840" }} />
      </div>
      {renderedLines.map((line, i) => (
        <div key={i} style={{ color: colors[line.type], minHeight: 48 }}>
          {line.type === "prompt" && <span style={{ marginRight: 12 }}>$</span>}
          <span>{line.visibleText}</span>
          {line.showCursor && (
            <span
              style={{
                opacity: Math.floor(frame / 3) % 2 === 0 ? 1 : 0,
                color: theme.terminalHighlight,
              }}
            >
              ▋
            </span>
          )}
        </div>
      ))}
    </div>
  );
};
