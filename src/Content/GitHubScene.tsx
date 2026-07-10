import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
  Easing,
  Img,
  staticFile,
} from "remotion";
import { theme } from "./theme";
import { BrowserFrame } from "./shared/BrowserFrame";
import { CountUp } from "./shared/Components";

/**
 * GitHub 录屏滑动效果（10 秒 = 300 帧）
 *
 * ① 0-30帧      浏览器弹出
 * ② 30-80帧     页面顶部，Stars 按钮可见
 * ③ 80-130帧    星数弹出放大
 * ④ 130-150帧   星数缩回
 * ⑤ 150-210帧   向下滚动到安装命令
 * ⑥ 210-260帧   显示安装命令
 * ⑦ 260-300帧   继续滚动 + 淡出
 */
export const GitHubScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const browserScale = spring({
    frame: frame - 3,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  const fadeIn = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [255, 270], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scrollY = interpolate(
    frame,
    [0, 130, 180, 230, 270],
    [0, 0, -1100, -1700, -1900],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    }
  );

  const starPopStart = 70;
  const starPopScale = spring({
    frame: frame - starPopStart,
    fps,
    config: { damping: 10, stiffness: 70 },
  });
  const starPopOpacity = interpolate(frame, [starPopStart, starPopStart + 10, 115, 130], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const overlayOpacity = interpolate(frame, [starPopStart, starPopStart + 10, 115, 130], [0, 0.5, 0.5, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.bgDark,
        opacity: fadeIn * fadeOut,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ transform: `scale(${Math.max(0, browserScale)})` }}>
        <BrowserFrame url="github.com/vercel-labs/skills">
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              transform: `translateY(${scrollY}px)`,
            }}
          >
            <Img
              src={staticFile("images/github-scroll.png")}
              style={{ width: "100%", display: "block" }}
            />
          </div>

          {overlayOpacity > 0 && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "#000",
                opacity: overlayOpacity,
                pointerEvents: "none",
              }}
            />
          )}

          {starPopOpacity > 0 && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: `translate(-50%, -50%) scale(${starPopScale})`,
                opacity: starPopOpacity,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                zIndex: 10,
              }}
            >
              <div style={{ fontSize: 50, marginBottom: 8 }}>⭐</div>
              <div
                style={{
                  fontSize: 120,
                  fontWeight: 900,
                  fontFamily: "'Inter'",
                  color: "#FFFFFF",
                  textShadow: "0 4px 32px rgba(0,0,0,0.3)",
                  lineHeight: 1,
                }}
              >
                <CountUp to={25.6} startFrame={starPopStart + 5} durationFrames={35} suffix="K" />
              </div>
              <div
                style={{
                  fontSize: 36,
                  fontWeight: 700,
                  fontFamily: "'Inter'",
                  color: theme.secondary,
                  marginTop: 8,
                }}
              >
                GitHub Stars
              </div>
              <div
                style={{
                  marginTop: 16,
                  padding: "8px 24px",
                  borderRadius: 20,
                  background: "rgba(255,255,255,0.15)",
                  color: "#FFFFFF",
                  fontSize: 24,
                  fontFamily: "'Inter'",
                }}
              >
                🔒 Fork 2.1k · 357 Commits
              </div>
            </div>
          )}
        </BrowserFrame>
      </div>
    </AbsoluteFill>
  );
}
