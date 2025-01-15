---
title: symfony的学习笔记
description: ''
pubDate: 2020-07-02T08:08:43
tags: ["Programming","Tutorials"]
path: symfony
author: 'Fushen YANG'
---

开始新的crud学习，拒绝浮躁，静心修炼，争取喜欢现在的自己。
特别说明：本篇依然是流水账日记。

早起给机器添加了内存，拆了隔壁电脑的两条内存，这样我就有8g内存可以用了，很开心说不上，资源是利用起来了。开始学习symfony的crud，争取今天做点什么东西出来。
[symfony的安装教程](https://symfony.com/doc/current/setup.html)

开始顺着教程走。

``` bash
php composer.phar create-project symfony/website-skeleton AccessControl
 ```

先建立个项目看看，运行之后发现检查依赖没有通过，果然还是下载symfony的二级制版本吧。检查php依赖好好把php配置好。二进制的软件去github下载了，休息休息吧。

```symfony check:requirements```
之后产生了报告，修改时区，安装依赖，

``` bash
apt-cache search php-dom
apt install
php --ini
```

检查配置文件修复时区问题。chongqing php不认识呢,修改php的timezone，让symfony完全通过吧。

使用命令行工具建立项目。时间还是超级长，原因就是symfony使用了自己自带了composer.phar这个是没有任何的代理加持的。还是应该把整个composer全局化，并配置镜像代理。

``` bash
sudo mv composer.phar /usr/local/bin/composer
composer config -g repo.packagist composer https://packagist.phpcomposer.com
```

全局的代理配置好，然后重新用symfony建立项目。配置好这些之后依然exit status 128，我怀疑，其实项目已经建立好了。毕竟这个是git的报错，看着报错信息好像是我没有指定正确的用户名和邮箱，这个放一下，继续后续开发学习。
建立demo项目的命令失败了。git被拒绝，看来还是要把git配置好才行。
[git加速教程](https://juejin.im/post/5cfe66406fb9a07edb393c56)
按照这个教程配置git。希望一条命令可以解决问题。如果不行还是要调试一下git，毕竟后续还要下载好多安装包。正确的设置方式可以参考这里这里。设置好之后，github速度快很多了。如果下次碰到问题，再重新设置一次。（clash的支持很有必要）
继续安装demo项目，项目自带了sqlite3数据库，这样看着就好多了。重新安装php对sqlite3的支持库，然后继续更新。突发奇想，要不我就不用mysql了？目前没有看到sqlite3有什么不好，如果并发数不是那么多的话，如果没有事务要求的话……先看看吧，再犹豫一下比较好。
status 中128的错误还是在报错，简单设置一下吧。

``` bash
git config --global user.email "test@mail.com"
git config --global user.name "MyName"
```

设置好之后以后再报错就再说。
刚刚就是上午的工作了，进行了午餐，之后继续下午的工作。
一抬手就发现根本无法使用demo项目，并不了解程序的运行逻辑和入口。这个就放一边，先把入门的hello world写好再说。
路由模块找不到对应的方法，也就是说，我的apache应该没有配置好或者模块哪里有问题。自带的symfony服务器工具非常好用和方便。

我发现一个问题，利用apache的子目录来进行测试，是因为我太喜欢80端口了。这个习惯不好。另外，symfony本身这个命令建立的网站就是独立网站了，最好能有一个独立虚拟目录给他，这样才是便于测试和理解的。

继续调整了配置后发现，在这个框架下，public才是网站应该指向的地址，这样逻辑就顺了，symfony new project_name 中的name原来是最顶级的名字，把他理解为自模块应该是我在mvc.net中学到的不好的习惯。

虽然现在访问起来依然是index.php/lucky/number。不过网站是可以访问了。根据开发建议使用symfony自带的服务器这一点，我觉得还是忽视这个问题比较好。[解决问题的教程在这里](https://symfony.com/doc/current/setup/web_server_configuration.html)

完成了create pages的教学，下一步看from模块，争取一个模块一个模块的看过去，完成symfony的学习和使用。

form模块就很复杂了，休息了一下，把form模块的代码实践完。label写好了，中文也能改，这不就是把我昨天做二维码界面的工作重构了吗？感觉还是挺好的。虽然，我记忆中，mvc耦合文件图片等等事情的时候，我还是没有怎么搞懂……至少是没有找到最佳实践。

看完了form模块，从数据库和模板里面我选择模板，哈哈，虽然每个都很麻烦，但是，数据库可以再等等嘛~……等等，我刚刚应该是调用task_success失败了，虽然解决了也大致知道怎么回事儿了。还是按照文档的顺序来看吧（打下这句话的时候，我已经看完了）。

## 稍事休息，继续学习

昨日和宇视科技的技术人员了解硬件信息因此断更，今天继续我的symfony流水账学习。昨天突然想到我的应用可能一开始就要处理1对多关系，想想有点头疼呀。

早起集中精力先看controler文档。看文档发现的心得，虽然我在用php，但是当我因为一个文本没有编辑好，结果整个项目无法访问时，当我看到type hint给contrler传入一个接口，结果这个接口直接可以用时（肯定用了依赖注入把）。我就想，我是不是只是用php语法去实现了某个东西，好多都是静态语言的特性。只是因为用了php就想php扮演的多大的角色（当然，php也很重要），肯定是不合适的。

流水笔记有个好处，就是当我想向别人输出的时候，重定向到这里，感觉能轻松很多，也有所收获和积累。

[中国企业的求生欲，藏在微信里](https://www.huxiu.com/article/366281.html) 有点累，读一下水文，放松放松。
放松好了，集中宝贵的经历，看教程，毕竟，后续还想安排通读DEMO教程呢。

模板看完了。继续看配置模块。配置看完了，要看数据库访问了。

午餐时间，吃了点东西，然后继续配置我的开发环境，把最近的文档整理一下，另外，看看能不能给机器搞个双显卡。^_^，日常折腾呢。

服务器资源访问不到。这个感觉问题更大一点，虽然目前还不是太重要就是了。

中午折腾机器，发现安装独立显卡后，集成显卡没有输出了。这是硬件特性吗？暂时不管了，继续看数据库访问吧。今天周五，周六放假等着我呢。
数据库也看完了。这样最基本常用的模块我就都看过了。虽然部署，配置等等也有很多模糊和需要学习的地方，bundle也没有看，ajax也没有看到，用户验证部分也没有看到……哈哈，总之，我先把demo模块读一次吧。

这次是读代码了，仔细想想，我没怎么好好看过代码，经常是自己摸索出奇奇怪怪的套路，这次好好看一下是个不错的机会。

……打开代码，vs提示要我配置git和php……又开始折腾了，我是真的喜欢折腾静不下心来啊。
看了一小下demo的代码，感觉……没有太大感觉，还是自己上手至少先把qr编辑器做好吧。

启动apache2，开始建立我的qr配置部分，然后慢慢的就把各个部分都做好。
```php bin/console make:controller qrConfigController```
生成控制器。

引入bootstrap部分我就迷茫了……哈哈，没有那么简单的事情呢。
```{{ encore_entry_link_tags('app') }}```
这个总是报错。

原来我终于到了需要先把css编译才能使用的这一步。安装yarn还安装错了。哈哈。Google一下我发现我遇到的是wsl的bug……暂时放弃webpack把，这个功能感觉过于先进了。
```curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -```
这个命令出错了。

下班回到家然后，工作上感觉还是在推进一下比较好，因为稍稍有点危机感。打开电脑，配置好代理，命令敲完，发现借助现代的工具配置项目果然还是简单呢。

``` bash
export https_proxy=http://127.0.0.1:6152;
export http_proxy=http://127.0.0.1:6152;
export all_proxy=socks5://127.0.0.1:6153
```

代理帮了大忙了。

建立一个新项目吧。
crud还是要学习一下的。
brew services start mysql
[Homebrew 都能管理服务了……真是变化大啊](https://apple.stackexchange.com/questions/12322/how-to-create-new-mysql-user-db-in-mac-os-x)
放个9年前的帖子，不知道还能不能用，至少mysql -uroot可以直接访问数据库是真的。

可以用，直接建立好数据库了。
[php总是调用3.7版本，是环境变量的问题](https://stackoverflow.com/questions/15726467/setting-zsh-path-not-producing-desired-order)
原来是zsh的问题……真是各种坑等着你啊。
……仔细思考了一下，并不是这样的！！
环境变量的顺序没有错，/usr/local/bin确实是在最前面，问题可能是我刚刚才安装php到local，而没用重启，我怀疑zsh缓存了每个环境变量下的目录，所以找不到我的PHP。重启一下terminal看看；

果然啊！！居然是和上一次一样的错误。就是安装php扩展后，命令行可以正确执行gd图像生成，可是apache2不行。