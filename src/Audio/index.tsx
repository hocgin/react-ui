/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import OriginAudio, { AudioOption } from './Audio';


type AudioType = typeof OriginAudio & {
  defaultOption: AudioOption;
};

const Audio = OriginAudio as AudioType;
Audio.defaultOption = {
  mini: false,
  autoplay: false,
  loop: 'all',
  order: 'random',
  preload: 'auto',
  volume: 0.7,
  mutex: true,
  listFolded: false,
  listMaxHeight: 90,
  lrcType: 3,
};

export default Audio;
