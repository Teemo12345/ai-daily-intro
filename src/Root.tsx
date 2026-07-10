import "./index.css";
import { Composition } from "remotion";
import { IntroSequence } from "./Intro/IntroSequence";
import { FullEpisode } from "./FullEpisode";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Episode001"
        component={FullEpisode}
        durationInFrames={1680}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="AIDailyIntro"
        component={IntroSequence}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ audioTrack: "soundtrack-jingle" }}
      />
    </>
  );
}
