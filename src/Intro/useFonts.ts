import { useEffect, useState } from "react";
import { continueRender, delayRender, useCurrentFrame } from "remotion";

/**
 * 载入外部 Google 字体的 hook。
 * 会阻塞渲染直到字体下载完成，确保渲染视频时字体不闪烁。
 */
export const useFonts = () => {
  const [handle] = useState(() =>
    delayRender("Loading fonts", {
      timeoutInMilliseconds: 30000,
    })
  );

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=JetBrains+Mono:wght@400;700&display=swap";
    link.onload = () => continueRender(handle);
    link.onerror = () => continueRender(handle);
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [handle]);

  useCurrentFrame(); // 确保组件在帧变化时重新渲染
};
