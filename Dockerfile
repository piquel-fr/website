FROM denoland/deno:alpine AS builder

WORKDIR /piquel.fr

COPY package.json .

RUN deno install

COPY . .

ARG API
ENV PUBLIC_API=${API}
ARG DOCS_API
ENV PUBLIC_DOCS_API=${DOCS_API}

ENV NODE_ENV=production

RUN deno task build

FROM denoland/deno:alpine

ARG ORIGIN
ENV ORIGIN=${ORIGIN}

WORKDIR /piquel.fr
COPY --from=builder /piquel.fr/build .

CMD ["ORIGIN=${ORIGIN}", "deno", "run", "--allow-env", "--allow-read", "--allow-net", "index.js"]
