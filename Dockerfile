FROM node:24-bookworm-slim

RUN corepack enable && corepack prepare pnpm@10.28.0 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc tsconfig.json tsconfig.base.json ./
COPY artifacts ./artifacts
COPY lib ./lib
COPY scripts ./scripts

RUN pnpm install --frozen-lockfile
RUN pnpm run build:deploy

ENV NODE_ENV=production
ENV SERVE_STATIC=1
ENV PORT=8080

EXPOSE 8080

CMD ["node", "--enable-source-maps", "artifacts/api-server/dist/index.mjs"]
