import { configure } from "queryparams";

export const { params: PARAMS } = configure<{
  id: string;
  interval: number;
  mode: "display" | "overview";
}>({
  id: "49ee7cb3-a05a-463b-9ebb-5c1b59787d1b",
  interval: 1800000,
  mode: "display",
});

const DOM = {
  root: <HTMLDivElement>document.getElementById("root"),
  frame: <HTMLIFrameElement>document.getElementById("frame"),
};

export const QUERIES: { [K in typeof PARAMS.mode]: string } = {
  overview: `{
    collection: object {
      ... on Collection {
        contents(per: 50) {
          link: entity {
            ... on Link {
              name
              url
            }
          }
        }
      }
    }
  }`,
  display: `{
    collection: object {
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
  }`,
};

export const request = (id: string, query: string) =>
  fetch(`https://atlas.auspic.es/graph/${id}`, {
    method: "POST",
    body: JSON.stringify({ query }),
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  }).then((res) => res.json());

const init = async () => {
  const { data, errors } = await request(PARAMS.id, QUERIES[PARAMS.mode]);

  if (errors) {
    throw errors[0];
  }

  switch (PARAMS.mode) {
    case "display":
      const {
        collection: {
          content: [{ link }],
        },
      } = data;

      DOM.frame.src = link.url;
      document.title = link.name;

      setTimeout(init, PARAMS.interval);
      break;

    default:
      const {
        collection: { contents },
      } = data;

      DOM.root.innerHTML = contents
        .map(({ link }) => {
          return `<a href="${link.url}" target="_blank">${link.url}</a>`;
        })
        .join("");
      break;
  }
};

init();
