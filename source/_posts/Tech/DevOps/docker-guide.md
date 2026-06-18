---
title: Docker 使用指南
date: 2025-07-10 10:00:00
tags: [devops, docker]
---

## Docker 使用指南

Docker 是一个容器化平台。

### 核心概念

- 镜像 (Image) — 容器的模板
- 容器 (Container) — 运行的实例
- Dockerfile — 构建镜像的脚本

### 常用命令

```bash
docker build -t my-app .
docker run -p 3000:3000 my-app
docker-compose up -d
```
