import { PARAMS, request } from "./index";

const init = async () => {
  const { data, errors } = await request();

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
  }, PARAMS.interval);
};

init();
