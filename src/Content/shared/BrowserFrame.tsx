import React from "react";

/**
 * 浏览器窗口外壳组件
 * 模拟浏览器窗口（地址栏 + 内容区）
 */
type BrowserFrameProps = {
  children: React.ReactNode;
  url?: string;
  scale?: number;
};

export const BrowserFrame: React.FC<BrowserFrameProps> = ({
  children,
  url = "github.com/vercel-labs/skills",
  scale = 1,
}) => {
  return (
    <div
      style={{
        width: 1300,
        height: 760,
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 24px 80px rgba(0, 0, 0, 0.25), 0 8px 32px rgba(0, 0, 0, 0.15)",
        background: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        transform: `scale(${scale})`,
      }}
    >
      {/* 浏览器顶栏 */}
      <div
        style={{
          height: 56,
          background: "#ECECEC",
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          gap: 12,
          flexShrink: 0,
          borderBottom: "1px solid #D8D8D8",
        }}
      >
        {/* 三个圆点 */}
        <div style={{ width: 14, height: 14, borderRadius: 7, background: "#FF5F57" }} />
        <div style={{ width: 14, height: 14, borderRadius: 7, background: "#FEBC2E" }} />
        <div style={{ width: 14, height: 14, borderRadius: 7, background: "#28C840" }} />

        {/* 地址栏 */}
        <div
          style={{
            flex: 1,
            height: 36,
            background: "#FFFFFF",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            paddingLeft: 16,
            marginLeft: 12,
            fontFamily: "'Inter', sans-serif",
            fontSize: 18,
            color: "#666",
            border: "1px solid #D8D8D8",
          }}
        >
          <span style={{ marginRight: 8, fontSize: 16 }}>🔒</span>
          {url}
        </div>
      </div>

      {/* 内容区 */}
      <div
        style={{
          flex: 1,
          overflow: "hidden",
          position: "relative",
          background: "#FFFFFF",
        }}
      >
        {children}
      </div>
    </div>
  );
};
