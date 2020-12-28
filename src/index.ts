import { configure } from "queryparams";

const { params: PARAMS } = configure({
  id: "49ee7cb3-a05a-463b-9ebb-5c1b59787d1b",
  interval: 10000,
});

const FRAME = <HTMLIFrameElement>document.getElementById("frame");
const ENDPOINT = `https://atlas.auspic.es/graph/${PARAMS.id}`;
const QUERY = `{
  mistral: object {
    ... on Collection {
      content: sample(amount: 1) {
        link: entity {
          ... on Link {
            name
            url
          }
        }
      }
    }
  }
}`;

const request = () =>
  fetch(ENDPOINT, {
    method: "POST",
    body: JSON.stringify({ query: QUERY }),
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  }).then((res) => res.json());

const init = async () => {
  const { data, errors } = await request();

  if (errors) {
    throw errors[0];
  }

  const {
    mistral: {
      content: [{ link }],
    },
  } = data;

  FRAME.src = link.url;
  document.title = link.name;

  setTimeout(init, PARAMS.interval);
};

init();
