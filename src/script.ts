import { configure } from "queryparams";
import { request, QUERIES } from "./index";

const init = async () => {
  const script = <HTMLScriptElement>document.getElementById("kiosk");
  const search = script.src.replace(/^[^\?]+\??/, "");

  const {
    params: { id, interval },
  } = configure(
    { id: "49ee7cb3-a05a-463b-9ebb-5c1b59787d1b", interval: 1800000 },
    search
  );

  const { data, errors } = await request(id, QUERIES.display);

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
