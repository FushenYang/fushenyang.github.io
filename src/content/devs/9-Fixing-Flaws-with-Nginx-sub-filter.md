---

title: nginx的sub_filter调试笔记
description: ''
pubDate: '2024-04-20 21:54:28'
tags: ["Programming","Operations"]
path: Fixing-Flaws-with-Nginx-sub-filter
author: 'Fushen YANG'

---

## 前言

nginx的配置一直是我个人比较头疼的地方，几乎是我的小小心理阴影，很多配置方式能够使用但是很少能配置的好。也就是因为这份不自信，因此很多时候即使不是nginx原因，我也容易陷在调试nginx上，也从一定角度形成了恶性循环。今天记录一下最近调试"sub_filter"命令的笔记。

## 需求调研

由于目标应用已经是容器的方式发布了，我对其一些更新就准备在nginx上动手。有这样一个需求，希望首页的某张图片更换为另外一张，而不改动代码。

在解决问题的这天之前的晚上，我花了很晚的时间研究了一下cloudflare的workers能不能实现这个效果，希望网页在引用的图片不是静态图片而是一个worker，这样在图片被送到客户端之前还可以写一些逻辑。这个方案最终失败了，因为希望“首页”和“应用内部页面”引用同一个地址的时候返回不同图片，这样的需求需要根据referer字段判断，但是这个字段只保留了域名没有引用图片的path。这个方案就宣告失败了。

这样可行的方案就剩下了一个，使用nginx来替换最终首页显示的字符串。

## 问题重现

sub_filter需要原始网页不能压缩，不然压缩过之后就无法替换，这是使用这个命令比较重要的一点。实际如果想要使用这个命令需要安装对应的模块，幸运的是默认的nginx docker镜像中已经安装了对应的模块。然后，在实际配置中碰到了非常诡异的错误。

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

以上配置方式在实际网站中出现了非常诡异的一点，本来不需要的1-3行发挥了真正的替代作用。而匹配到的/login根本没有发挥作用。这就非常诡异了。访问/login也没得时候，页面上本来应该存在的A.png被替换为了C.png，而不是B.png。

其实sub_filter开始完全不发挥作用，让我一度以为这个命令没有恰当运行(也是因为nginx不自信)，可是非常偶然的出现了1-3这三行生效的情况，这就非常有意思了。到底是什么原因呢？

## 谜题解答

答案其实不是在nginx，nginx正确的发挥了应该发挥的作用。问题在于应用本身，应用是“js运行时”渲染的。对于/login路径，返回的仅仅是js文件的引用，没有任何内容。真正获取内容的网址是/api/info，这样实际上数据"A.png"这个字符串所在的数据流匹配的当然就是`location /`规则，也是因此出现的诡异的一幕。

发现问题的关键在于：不要只看浏览器的source页面，这个页面实际是渲染后的页面，查看network选项卡，可以看到实际下载的原始信息和原始请求，这里可以获得最关键的信息。

## 小结

这个事情困扰了我一天多时间，整个一天多不太开心，但是最后还是合理解决了，“百折不挠”还是很有必要的，另外， 在这个过程中咨询了一写人，学会获取帮助也是很有必要的。
