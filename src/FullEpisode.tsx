import React from "react";
import { AbsoluteFill, Sequence, Audio, staticFile } from "remotion";
import { IntroSequence } from "./Intro/IntroSequence";
import { WhatIsScene } from "./Content/WhatIsScene";
import { GitHubScene } from "./Content/GitHubScene";
import { HowItWorksScene } from "./Content/HowItWorksScene";
import { HowToUseScene } from "./Content/HowToUseScene";
import { EndingSceneV7 } from "./Content/EndingSceneV7";
import { SubtitleManager } from "./Content/shared/SubtitleBar";

/**
 * V7.3 — 语速+10% + 句间200ms停顿 + BPM115 强节奏 BGM
 *
 * 时间线 (30fps, 1680帧 = 56秒):
 *
 * 片头        0-120      (4.0s)   IntroSequence + Jingle
 * 是什么      120-330    (7.0s)   WhatIsScene + 旁白1(6.7s)
 * GitHub      330-600    (9.0s)   GitHubScene + 旁白2(8.3s)
 * 怎么工作    600-1020   (14.0s)  HowItWorksScene + 旁白3(13.6s)
 * 怎么用      1020-1380  (12.0s)  HowToUseScene + 旁白4(11.2s)
 * 结尾        1380-1680  (10.0s)  EndingSceneV7 + 旁白5(9.8s)
 */

const subtitles = [
  { text: "find-skills — 帮你搜索和安装 AI 技能的工具", start: 120, end: 330 },
  { text: "GitHub 2.5 万人收藏 · 安装 230 万次", start: 330, end: 600 },
  { text: "你说要干嘛 → 自动搜索 → 一键安装 → 直接用", start: 600, end: 1020 },
  { text: "一行命令安装 · 72 种 AI 工具都能用", start: 1020, end: 1380 },
  { text: "免费 · 开源 · 你最想找什么 AI 技能？", start: 1380, end: 1680 },
];

export const FullEpisode: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#FAF7F2" }}>
      {/* 背景音乐（全程，BPM115 强节奏） */}
      <Audio src={staticFile("audio/bgm-rhythmic.wav")} volume={0.15} />

      <Sequence from={0} durationInFrames={120} name="片头">
        <IntroSequence audioTrack="soundtrack-jingle" />
      </Sequence>

      <Sequence from={120} durationInFrames={210} name="是什么">
        <WhatIsScene />
        <Audio src={staticFile("audio/narration-01-what.mp3")} />
      </Sequence>

      <Sequence from={330} durationInFrames={270} name="GitHub录屏">
        <GitHubScene />
        <Audio src={staticFile("audio/narration-02-github.mp3")} />
      </Sequence>

      <Sequence from={600} durationInFrames={420} name="怎么工作">
        <HowItWorksScene />
        <Audio src={staticFile("audio/narration-03-how.mp3")} />
      </Sequence>

      <Sequence from={1020} durationInFrames={360} name="怎么用">
        <HowToUseScene />
        <Audio src={staticFile("audio/narration-04-install.mp3")} />
      </Sequence>

      <Sequence from={1380} durationInFrames={300} name="结尾">
        <EndingSceneV7 />
        <Audio src={staticFile("audio/narration-05-end.mp3")} />
      </Sequence>

      <SubtitleManager subtitles={subtitles} />
    </AbsoluteFill>
  );
}
