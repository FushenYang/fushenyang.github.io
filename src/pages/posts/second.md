---
layout: ../../layouts/MarkdownPostLayout.astro
title: '第二篇文章'
pubDate: 2024-5-3
description: '两篇文章尝试构建动态路由'
author: 'fushenyang'
image:
    url: 'https://docs.astro.build/assets/full-logo-light.png'
    alt: 'The full Astro logo.'
tags: ["astro", "blogging", "learning in public"]
---

## 说明

这是第二篇文章的内容

## 我准备做什么

至少完成astro网站的教程。

``` bash
location /login {
    proxy_pass http://app;
    proxy_set_header Host $http_host;
    proxy_set_header Referer $http_referer;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Accept-Encoding "";
    sub_filter 'A.png' 'B.png';
    sub_filter_once off;
    sub_filter_types *;
}

location / {
    proxy_pass http://app;
    proxy_set_header Host $http_host;
    proxy_set_header Referer $http_referer;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Accept-Encoding "";
    sub_filter 'A.png' 'C.png'; # 1
    sub_filter_once off; # 2
    sub_filter_types *; # 3
}
```
