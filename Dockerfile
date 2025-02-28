FROM denoland/deno:alpine AS builder

WORKDIR /piquel.fr

ARG API

COPY package.json .

RUN deno install

COPY . .

ENV PUBLIC_API=${API}

RUN deno task build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /piquel.fr/build /usr/share/nginx/html
