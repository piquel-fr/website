FROM denoland/deno:alpine AS builder

WORKDIR /piquel.fr

ARG API
ARG DOCS_API
ARG ORIGIN

COPY package.json .

RUN deno install

COPY . .

ENV NODE_ENV=production
ENV PUBLIC_API=${API}
ENV PUBLIC_DOCS_API=${DOCS_API}

RUN deno task build

FROM denoland/deno:alpine

ENV ORIGIN=${ORIGIN}

WORKDIR /piquel.fr
COPY --from=builder /piquel.fr/build .

CMD deno run --allow-env --allow-read --allow-net index.js
