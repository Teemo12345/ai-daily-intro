import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { theme } from "./theme";
import { ChatBubble, FadeCard } from "./shared/Components";

/**
 * 场景4：实战演示（36s - 60s，帧 0-720 相对）
 *
 * 重新规划：不展示终端命令，而是展示自然语言对话
 * 安装 find-skills 后，直接跟 AI 对话就能搜索和安装技能
 *
 * 3 个案例，每个 240 帧（8秒）：
 * 1. React 性能优化
 * 2. PR 审查自动化
 * 3. Changelog 自动生成
 */
export const DemoScene: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [705, 720], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const currentCase = Math.min(2, Math.floor(frame / 240));

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.bgDark,
        opacity: fadeIn * fadeOut,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
      }}
    >
      {/* 案例标签 */}
      <div style={{ display: "flex", gap: 16, marginBottom: 30 }}>
        {["React 性能优化", "PR 审查自动化", "Changelog 生成"].map((label, i) => {
          const isActive = i === currentCase;
          return (
            <div
              key={i}
              style={{
                padding: "8px 20px",
                borderRadius: 20,
                background: isActive ? theme.primary : "rgba(61,40,23,0.08)",
                color: isActive ? "#FFF" : theme.textDim,
                fontSize: 18,
                fontWeight: 700,
                fontFamily: "'Inter'",
                transition: "all 0.3s",
              }}
            >
              {label}
            </div>
          );
        })}
      </div>

      {/* 提示文字 */}
      <FadeCard startFrame={0}>
        <p
          style={{
            fontSize: 22,
            color: theme.textDim,
            fontFamily: "'Inter'",
            textAlign: "center",
            marginBottom: 24,
          }}
        >
          装好 find-skills 后，<b style={{ color: theme.primary }}>直接用自然语言对话</b>就行
        </p>
      </FadeCard>

      {/* 案例内容：左对话 + 右效果 */}
      <div style={{ width: "90%", display: "flex", gap: 40, alignItems: "flex-start" }}>
        {/* 左侧：对话界面 */}
        <div style={{ flex: 1.2 }}>
          {currentCase === 0 && <ReactChat frame={frame % 240} />}
          {currentCase === 1 && <PRChat frame={frame % 240} />}
          {currentCase === 2 && <ChangelogChat frame={frame % 240} />}
        </div>

        {/* 右侧：效果对比 */}
        <div style={{ flex: 0.8, paddingTop: 20 }}>
          {currentCase === 0 && <ReactResult frame={frame % 240} />}
          {currentCase === 1 && <PRResult frame={frame % 240} />}
          {currentCase === 2 && <ChangelogResult frame={frame % 240} />}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ========== 案例1：React 性能优化 ==========
const ReactChat: React.FC<{ frame: number }> = ({ frame }) => {
  return (
    <ChatBubble
      startFrame={5}
      typeSpeed={1.2}
      messages={[
        { role: "user", text: "帮我优化 React 性能", delay: 0 },
        { role: "ai", text: "🔍 搜索到 vercel-react-best-practices\n57 条优化规则 · 357K 安装\n正在为您安装…", delay: 35 },
        { role: "ai", text: "✅ 已安装！正在审查你的代码…", delay: 120 },
        { role: "ai", text: "发现 3 个性能问题，建议优化渲染瀑布流", delay: 165 },
      ]}
    />
  );
};

const ReactResult: React.FC<{ frame: number }> = ({ frame }) => {
  return (
    <FadeCard startFrame={180}>
      <div
        style={{
          background: "#FFF",
          borderRadius: 16,
          padding: 28,
          boxShadow: theme.cardShadow,
          border: `1px solid ${theme.cardBorder}`,
        }}
      >
        <h3 style={{ fontSize: 22, fontWeight: 700, color: theme.textMain, fontFamily: "'Inter'", marginBottom: 20 }}>
          首屏加载速度
        </h3>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 44, fontWeight: 900, color: "#F38BA8", fontFamily: "'Inter'" }}>3.2s</div>
            <div style={{ fontSize: 14, color: theme.textDim }}>优化前</div>
          </div>
          <div style={{ fontSize: 28, color: theme.primary }}>→</div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 44, fontWeight: 900, color: "#A6E3A1", fontFamily: "'Inter'" }}>1.8s</div>
            <div style={{ fontSize: 14, color: theme.textDim }}>优化后</div>
          </div>
        </div>
        <div style={{ marginTop: 14, padding: "6px 14px", borderRadius: 8, background: "#A6E3A122", color: "#4a9d3f", fontSize: 16, fontWeight: 700, textAlign: "center" }}>
          ⚡ 提升 44%
        </div>
      </div>
    </FadeCard>
  );
};

// ========== 案例2：PR 审查自动化 ==========
const PRChat: React.FC<{ frame: number }> = ({ frame }) => {
  return (
    <ChatBubble
      startFrame={5}
      typeSpeed={1.2}
      messages={[
        { role: "user", text: "团队需要 PR 审查规范", delay: 0 },
        { role: "ai", text: "🔍 搜索到 review-implementing\n自动审查代码质量 · 284K 安装\n正在为您安装…", delay: 35 },
        { role: "ai", text: "✅ 已安装！现在可以自动检查 PR 了", delay: 120 },
        { role: "ai", text: "我会检查代码质量、潜在 bug、最佳实践", delay: 160 },
      ]}
    />
  );
};

const PRResult: React.FC<{ frame: number }> = ({ frame }) => {
  return (
    <FadeCard startFrame={180}>
      <div
        style={{
          background: "#FFF",
          borderRadius: 16,
          padding: 28,
          boxShadow: theme.cardShadow,
          border: `1px solid ${theme.cardBorder}`,
        }}
      >
        <h3 style={{ fontSize: 22, fontWeight: 700, color: theme.textMain, fontFamily: "'Inter'", marginBottom: 20 }}>
          PR 审查时间
        </h3>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 44, fontWeight: 900, color: "#F38BA8", fontFamily: "'Inter'" }}>30min</div>
            <div style={{ fontSize: 14, color: theme.textDim }}>手动审查</div>
          </div>
          <div style={{ fontSize: 28, color: theme.primary }}>→</div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 44, fontWeight: 900, color: "#A6E3A1", fontFamily: "'Inter'" }}>10min</div>
            <div style={{ fontSize: 14, color: theme.textDim }}>AI 辅助</div>
          </div>
        </div>
        <div style={{ marginTop: 14, padding: "6px 14px", borderRadius: 8, background: "#A6E3A122", color: "#4a9d3f", fontSize: 16, fontWeight: 700, textAlign: "center" }}>
          ⏱ 效率提升 3 倍
        </div>
      </div>
    </FadeCard>
  );
};

// ========== 案例3：Changelog 生成 ==========
const ChangelogChat: React.FC<{ frame: number }> = ({ frame }) => {
  return (
    <ChatBubble
      startFrame={5}
      typeSpeed={1.2}
      messages={[
        { role: "user", text: "每次发版手写 changelog 太麻烦", delay: 0 },
        { role: "ai", text: "🔍 搜索到 changelog-generator\n根据 git 记录自动生成\n正在为您安装…", delay: 35 },
        { role: "ai", text: "✅ 已安装！一个命令自动生成更新日志", delay: 120 },
      ]}
    />
  );
};

const ChangelogResult: React.FC<{ frame: number }> = ({ frame }) => {
  return (
    <FadeCard startFrame={150}>
      <div
        style={{
          background: "#FFF",
          borderRadius: 16,
          padding: 24,
          boxShadow: theme.cardShadow,
          border: `1px solid ${theme.cardBorder}`,
          fontFamily: "'JetBrains Mono'",
        }}
      >
        <h3 style={{ fontSize: 22, fontWeight: 700, color: theme.textMain, fontFamily: "'Inter'", marginBottom: 14 }}>
          自动生成 Changelog
        </h3>
        <div style={{ fontSize: 14, lineHeight: 2, color: theme.textDim }}>
          <div style={{ color: theme.primary, fontWeight: 700 }}>## v2.1.0</div>
          <div>✨ feat: 新增用户认证</div>
          <div>🐛 fix: 修复登录超时</div>
          <div>📝 docs: 更新 API 文档</div>
          <div>⚡ perf: 优化首屏加载</div>
        </div>
        <div style={{ marginTop: 12, padding: "6px 14px", borderRadius: 8, background: theme.secondary + "22", color: theme.primary, fontSize: 16, fontWeight: 700, textAlign: "center", fontFamily: "'Inter'" }}>
          ✅ 自动搞定
        </div>
      </div>
    </FadeCard>
  );
};
