import playlist from "./playlist.json";
import { mapCursorToMax } from "map-cursor-to-max";

const FRAME = <HTMLIFrameElement>document.getElementById("frame");
const STATE = { cursor: -1 };

const init = () => {
  STATE.cursor++;

  const index = mapCursorToMax(STATE.cursor, playlist.length);
  const work = playlist[index];

  FRAME.src = work.url;
  document.title = work.title;

  setTimeout(init, work.duration * 1000);
};

init();
