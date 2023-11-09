---
title: 写给自己的博客使用笔记
date: 2020-04-24
tags: 说明
---

## 博客管理

本博客为个人博客，联系方式见首页。

本文章记录一下博客的管理使用说明，防止每次都忘记。

### 添加文章

``` bash
npx hexo new "about ts type not in runtime" # please run this command in project Folder
```

执行以上命令可以添加文章，然后就可以撰写文章了。

### 生成并发布网站

``` bash
npx hexo g -d
```

执行该命令可以直接生成并重新发布网站。（提醒一下，记得关注网络状态）。

### 修改文章之后本地预览网站

``` bash
npx hexo g #生成网站
npx hexo s #生成预览服务器
```

## 官方教程如下

### Create a new post

``` bash
hexo new "My New Post"
```

More info: [Writing](https://hexo.io/docs/writing.html)

### Run server

``` bash
hexo server
```

More info: [Server](https://hexo.io/docs/server.html)

### Generate static files

``` bash
hexo generate
```

More info: [Generating](https://hexo.io/docs/generating.html)

### Deploy to remote sites

2023-11-9更新：使用了github的workflow自动部署了，这样就不用这样的方式了，git提交之后，就可以自动更新。

``` bash
hexo deploy
```

More info: [Deployment](https://hexo.io/docs/one-command-deployment.html)
