---
title: typescript的类型在运行时就没有了
date: 2022-10-13 15:08:34
tags:
---

## 最近开发碰到一点点坑

typescript在运行时的类型已经不存在了。所以，虽然我在request.params中可以很好的推断获得number，但是当在prisma的where中进行调用的时候还是会出现类型错误。这个坑浪费了我1个小时。
