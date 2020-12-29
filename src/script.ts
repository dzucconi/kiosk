import { configure } from "queryparams";
import { request, QUERIES } from "./index";

const init = async () => {
  const script = <HTMLScriptElement>document.getElementById("kiosk");
  const search = script.src.replace(/^[^\?]+\??/, "");

  const {
    params: { interval },
  } = configure({ interval: 1800000 }, search);

  const { data, errors } = await request(QUERIES.display);

  if (errors) {
    throw errors[0];
  }
  const {
    collection: {
      content: [{ link }],
    },
  } = data;

  setTimeout(() => {
    window.location.assign(link.url);
  }, interval);
};

init();
