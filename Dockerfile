FROM denoland/deno:alpine AS builder

WORKDIR /piquel.fr

COPY package.json .

RUN deno install

COPY . .

RUN deno task build

FROM denoland/deno:alpine

WORKDIR /piquel.fr

COPY --from=builder /piquel.fr/build .
CMD deno run --allow-env --allow-read --allow-net index.js
