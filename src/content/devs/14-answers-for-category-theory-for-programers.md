---
title: 《面向程序员的范畴论》课后习题参考
pubDate: 2025-02-07T02:30:16.122Z
tags:
  - fp
  - haskell
  - Category Theory
slug: Category-Theory-for-Programers-Homework-Answers-cn
author: Fushen YANG
description: Explore exercises and resources from 'Category Theory for Programmers' to deepen your understanding of programming concepts and Monad.
---

## 前言

非常有幸的利用假期时间阅读《Category Theory for Programers》，并且非常幸运的找到了一个非常棒的中文翻译，虽然只有第一部分,但是依然让我有了非常好的切入视角。看完了（第一部分）第一遍之后，我找到了原作者的视频，并尝试看翻译的第二遍，为了加深学习并做好记录，也许在不久的将来，我可以更加深入的理解Monad，并且可以写出更好的程序。也借用这里好好地记录整理一下相关链接。

## 相关资源

首先是[原始博客](https://bartoszmilewski.com/2014/10/28/category-theory-for-programmers-the-preface/)，这个是作者原文，然后就是我参考学习的中文翻译汇总：

- [<译> 写给程序猿的范畴论 · 序](https://segmentfault.com/a/1190000003882331)
- [<译> 范畴：复合的本质](https://segmentfault.com/a/1190000003883257)
- [<译> 类型与函数](https://segmentfault.com/a/1190000003888544)
- [<译> 范畴，可大可小](https://segmentfault.com/a/1190000003894116)
- [<译> Kleisli 范畴](https://segmentfault.com/a/1190000003898795)
- [<译> 积与余积](https://segmentfault.com/a/1190000003913079)
- [<译> 简单的代数数据类型](https://segmentfault.com/a/1190000003943687)
- [<译> 函子](https://segmentfault.com/a/1190000003954370)
- [<译> 函子性](https://segmentfault.com/a/1190000003993662)
- [<译> 函数类型](https://segmentfault.com/a/1190000004631638)
- [<译> 自然变换](https://segmentfault.com/a/1190000012381561)

感谢[garfileo](https://segmentfault.com/u/garfileo)的翻译，至少第一部分可以有非常精良的翻译，我把链接放在这里，作为一个目录索引方便学习查阅。

---

## 课后挑战部分

提示：*这些答案是我自己的学习记录，不保证正确哦*

### 范畴：复合的本质

>1.用你最喜欢的语言（如果你最喜欢的是 Haskell，那么用你第二喜欢的语言）尽力实现一个恒等函数。

```Rust
fn id<T>(x:T) -> T {x}
```

>2.用你最喜欢的语言实现函数的复合，它接受两个函数作为参数值，返回一个它们的复合函数。

```Rust
fn compose<A,B,F,G,T>(f: F, g: G) -> impl Fn(A) -> T
where
    F: Fn(B) -> T,
    G: Fn(A) -> B,
{
    move |x| f(g(x))
}
```

>3.写一个程序，测试你写的可以复合函数的函数是否能支持恒等函数。

```Rust
fn main() {
    fn add_one(x: i32) -> i32 {x + 1}
    let f = compose(add_one, id);
    assert_eq!(6, f(5));
}
```

>4.互联网是范畴吗？链接是态射吗？

很棒的问题，第一反应:"是的",文章是对象，链接是态射,从一篇文章跳转到另外一篇文章。但是仔细思考发现问题不对，一个链接并没有包含起点信息，只是可以指向一个终点，一篇文章包含链接可以理解为他是起点吗？换个角度思考，链接可以复合吗？感觉链接不能复合，两个链接的复合一定是后一个链接指向的内容，那么这个复合操作是个很奇怪操作，倒是复合结合律……如果把整个互联网想象成一个对象，那么这些链接是不是态射呢？感觉也不太对……总结，感觉不是范畴，或者说不是某种一般的范畴，如果是，也应该是某种特殊的范畴吧。

>5.脸书是一个以人为对象，以朋友关系为态射的范畴吗？

不是。朋友关系不能复合，朋友的朋友可以不认识。

>6.一个有向图，在什么情况下是一个范畴？

任意两个对象都两两联通的情况应该是一个范畴了，当然，每个节点还有个环指向自己。
