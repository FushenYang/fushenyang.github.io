---
title: 我的typescript学习笔记
description: ''
pubDate: '2022-10-13 15:08:34'
tags: ["Programming","Tutorials"]
path: learn-typescript
author: 'Fushen YANG'
---

## 前言

"typescript在运行时的类型已经不存在了。所以，虽然我在request.params中可以很好的推断获得number，但是当在prisma的where中进行调用的时候还是会出现类型错误。这个坑浪费了我1个小时。" 以上是我在某个时间点写下的一段笔记，现在看来我已经看不懂了^_^，不过还是以这句话来开头，这样可以让我好好记录一下我的typescript学习，回顾我在.net技术栈上学习的经历，进入新的学习过程。

## 谓词保护

我在静下心来看一个项目的代码的时候，看到了这样一个函数。

``` typescript
export default function isVoid(data: unknown): data is null | undefined {
    return data === null || data === undefined
}
```

函数非常简单，用途也非常明确，一眼就看懂了。不过"data is null | undefined"这个返回值类型让我非常意外，我其实在细节上并没有看懂。这个时候我的深究之魂，其实[教程](https://www.jianshu.com/p/57df3cb66d3d#)和容易找到。

## 看项目源码

最近在看remix.run2.8的教程视频，结合之前看的篇博客教程，感觉非常的有意思。[remix官方通讯录应用教程产品](https://github.com/FushenYang/remix.run.tutorial)和[Remix入门实战小册子](https://remix.lutaonan.com)这两个示例代码非常干净，基于他们可以开始直接启动我的项目，一步一个脚印的开始我的边缘计算环境应用的开发了。给自己的小目标是先只考虑用cf提供的东西，确定有需要的情况再引入复杂的组件。

## 开启了新的项目，在项目中学习

为了学好这个唯一的前后端统一框架，开了一个新的项目用来学习。依然是一个CMS类网站开始，但是这次尝试使用边缘计算的框架构建一个稳定的运行的网站。首先第一步，是克服之前的短板，通过tailwind先把界面做的好看一些，别太心急的解决后端问题。

## 未完待续
