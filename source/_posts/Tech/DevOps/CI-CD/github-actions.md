---
title: GitHub Actions 自动化部署
date: 2025-07-15 10:00:00
tags: [devops, ci-cd]
---

## GitHub Actions 自动化部署

GitHub Actions 是 GitHub 提供的 CI/CD 平台。

### 工作流配置

```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm install && npm run build
```

### 触发器类型

- `push` — 推送代码时触发
- `pull_request` — PR 时触发
- `schedule` — 定时触发
