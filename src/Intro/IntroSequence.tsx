import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { useFonts } from "./useFonts";
import { ParticleBurst } from "./ParticleBurst";
import { GlitchTitle } from "./GlitchTitle";
import {
  GradientBackground,
  GridOverlay,
  DateLabel,
} from "./GradientBackground";
import { Tagline, FinalZoom } from "./Tagline";
import { theme } from "./theme";

type Props = {
  audioTrack?: string;
};

/**
 * AI 每日一荐 - 片头主序列（定版）
 *
 * 配色：奶油晨光风
 * 音效：品牌 Jingle 风（C5-E5-G5-C6 四音符上升琶音）
 */
export const IntroSequence: React.FC<Props> = ({
  audioTrack = "soundtrack-jingle",
}) => {
  useFonts();

  return (
    <FinalZoom>
      <AbsoluteFill style={{ backgroundColor: theme.bgDark }}>
        <GradientBackground />
        <GridOverlay />
        <ParticleBurst />
        <GlitchTitle />
        <DateLabel />
        <Tagline />
      </AbsoluteFill>

      <Audio src={staticFile(`audio/${audioTrack}.wav`)} />
    </FinalZoom>
  );
};
