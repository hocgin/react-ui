/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import OriginVideo, { VideoOption } from './Video';

type VideoType = typeof OriginVideo & {
  defaultOption: VideoOption;
};

const Video = OriginVideo as VideoType;
Video.defaultOption = {
  autoMini: true,
  hotkey: true,
  pip: true,
  flip: true,
  screenshot: true,
  miniProgressBar: true,
  fullscreen: true,
  setting: true,
  autoOrientation: true,
  fastForward: true,
  playbackRate: true,
  aspectRatio: true,
  lock: true,
};

export default Video;
