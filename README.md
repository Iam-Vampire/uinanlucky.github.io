# WikiWarm

融合 Wikitten（Wiki 结构）和 Warmpaper（温暖视觉）的 Hexo 主题。

## 快速开始

### 创建文章

```bash
hexo new post "文章标题"
```

### 按目录分类（核心功能）

将文章放在 `source/_posts/` 的子文件夹中，自动按路径归类：

```
source/_posts/
├── index.md              ← Wiki 首页（可选）
├── 编程/
│   ├── 前端/
│   │   ├── react入门.md  → 分类：编程 > 前端
│   │   └── vue入门.md    → 分类：编程 > 前端
│   └── 后端/
│       └── nodejs.md     → 分类：编程 > 后端
├── 设计/
│   └── ui设计.md           → 分类：设计
```

无需在 front-matter 写 `categories`，脚本自动从目录路径注入分类。

### Wiki 首页

如果 `source/_posts/index.md` 存在，首页会显示它的内容而不是文章列表。把这个文件当作你的 wiki 欢迎页。

### 文章 Front-matter

```yaml
---
title: 文章标题
date: 2025-01-01 10:00:00
tags: [标签1, 标签2]
---
```

## 主题配置

编辑 `themes/wikiwarm/_config.yml`：

```yaml
# 导航菜单
menu:
  首页: /
  归档: /archives
  分类: /categories
  标签: /tags
  关于: /about

# Wiki 侧边栏设置
wiki:
  default_index_file: index.md   # 首页显示指定的 wiki 文章
  category_perExpand: false      # 是否默认展开所有分类
  sidebar: left                  # 侧边栏位置

# TOC 目录
toc:
  enable: true
  max_depth: 3
  min_depth: 2

# 个人信息
profile:
  avatar: /images/avatar.png
  description: "个人简介"
  links:
    - name: GitHub
      url: https://github.com/yourname
      icon: github
```

## 功能

| 功能 | 说明 |
|------|------|
| 多级分类侧边栏 | 支持 N 层嵌套，点击展开/收起 |
| 自动分类 | 按文件目录自动归类，无需手写 categories |
| 搜索 | 顶部搜索图标，搜索文章标题和内容 |
| 深色模式 | 自动跟随系统 + 手动切换 |
| TOC 目录 | 文章右侧目录，滚动高亮 |
| 响应式 | 移动端侧边栏滑出 |
| 代码高亮 | 支持多种语言语法高亮 |

## 构建与部署

```bash
# 本地预览
hexo clean && hexo server

# 构建静态文件
hexo clean && hexo generate

# 部署到 GitHub Pages
# 1. 安装 git 部署插件
npm install hexo-deployer-git --save
# 2. 在 _config.yml 配置 deploy
# 3. 执行部署
hexo clean && hexo deploy
```
