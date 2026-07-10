import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { theme } from "./theme";

/**
 * 镜头1 (0s - 0.8s) + 镜头2 (0.8s - 1.8s)
 * 粒子从中心爆发 → 汇聚成 AI 图标 + 脉冲圆圈
 * 奶油晨光风：浅底用橙金粒子，淡发光，渐变图标
 */
export const ParticleBurst: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const centerX = width / 2;
  const centerY = height / 2;

  // ===== 阶段1: 粒子爆发 =====
  const burstProgress = interpolate(frame, [0, 24], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const burstDistance = interpolate(burstProgress, [0, 1], [0, 400], {
    easing: Easing.out(Easing.cubic),
  });

  const burstOpacity = interpolate(frame, [0, 6, 24], [0, 1, 0.35], {
    extrapolateRight: "clamp",
  });

  const particles = Array.from({ length: 24 }, (_, i) => {
    const angle = (i / 24) * Math.PI * 2;
    const x = centerX + Math.cos(angle) * burstDistance;
    const y = centerY + Math.sin(angle) * burstDistance;
    const size = interpolate(burstProgress, [0, 1], [8, 2]);
    return { x, y, size, angle };
  });

  // 连线
  const lineOpacity = interpolate(frame, [8, 18, 30], [0, 0.3, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ===== 阶段2: 粒子汇聚 =====
  const convergeProgress = interpolate(frame, [24, 54], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  const convergedParticles = particles.map((p, i) => {
    const radius = interpolate(convergeProgress, [0, 1], [200, 60 + (i % 3) * 15]);
    const rotationSpeed = 0.02;
    const angle = p.angle + frame * rotationSpeed;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    const size = interpolate(convergeProgress, [0, 1], [2, 4]);
    return { x, y, size };
  });

  const iconScale = spring({
    frame: frame - 30,
    fps,
    config: { damping: 12, stiffness: 100, mass: 0.8 },
  });

  const iconOpacity = interpolate(frame, [30, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 脉冲圆圈
  const pulseProgress = interpolate(frame, [40, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pulseRadius = interpolate(pulseProgress, [0, 1], [40, 180]);
  const pulseOpacity = interpolate(pulseProgress, [0, 0.3, 1], [0.7, 0.35, 0]);

  const fadeOut = interpolate(frame, [54, 66], [1, 0], {
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
        opacity: fadeOut,
      }}
    >
      <svg
        width={width}
        height={height}
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        {/* 连线 */}
        {lineOpacity > 0 &&
          particles.map((p1, i) =>
            particles.slice(i + 1).map((p2, j) => {
              const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
              if (dist > 150) return null;
              return (
                <line
                  key={`line-${i}-${j}`}
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke={theme.primary}
                  strokeWidth={1}
                  opacity={lineOpacity}
                />
              );
            })
          )}

        {/* 爆发粒子 - 橙金交替 */}
        {burstOpacity > 0 &&
          particles.map((p, i) => (
            <circle
              key={`burst-${i}`}
              cx={p.x}
              cy={p.y}
              r={p.size}
              fill={i % 2 === 0 ? theme.primary : theme.secondary}
              opacity={burstOpacity}
            />
          ))}

        {/* 汇聚粒子 */}
        {convergeProgress > 0 &&
          convergedParticles.map((p, i) => (
            <circle
              key={`conv-${i}`}
              cx={p.x}
              cy={p.y}
              r={p.size}
              fill={i % 2 === 0 ? theme.primary : theme.secondary}
              opacity={convergeProgress}
            />
          ))}

        {/* 脉冲圆圈 */}
        {pulseOpacity > 0 && (
          <>
            <circle
              cx={centerX}
              cy={centerY}
              r={pulseRadius}
              fill="none"
              stroke={theme.primary}
              strokeWidth={1.5}
              opacity={pulseOpacity}
            />
            <circle
              cx={centerX}
              cy={centerY}
              r={pulseRadius * 0.6}
              fill="none"
              stroke={theme.secondary}
              strokeWidth={1.2}
              opacity={pulseOpacity * 0.6}
            />
          </>
        )}
      </svg>

      {/* AI 图标 */}
      {iconOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) scale(${iconScale})`,
            opacity: iconOpacity,
          }}
        >
          <SparkIcon />
        </div>
      )}
    </div>
  );
};

/** AI 火花图标 - 橙金渐变 + 淡发光（浅底适配） */
const SparkIcon: React.FC = () => {
  return (
    <svg width={120} height={120} viewBox="0 0 120 120">
      <defs>
        <linearGradient id="sparkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={theme.primary} />
          <stop offset="100%" stopColor={theme.secondary} />
        </linearGradient>
        {/* 浅底用低强度发光 */}
        <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d="M60 10 L72 48 L110 60 L72 72 L60 110 L48 72 L10 60 L48 48 Z"
        fill="url(#sparkGrad)"
        filter="url(#glow)"
      />
      {/* 中心圆 - 奶油色镂空 + 深棕小点 */}
      <circle cx={60} cy={60} r={12} fill={theme.warmWhite} />
      <circle cx={60} cy={60} r={5} fill={theme.textMain} />
    </svg>
  );
};
