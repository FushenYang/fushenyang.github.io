---
title:  FTP文件扫描脚本
description: ''
pubDate: 2023-06-05T15:03:57
tags: ["DevelopmentNotes"]
path: find-how-many-files-on-ftp-server-with-script
author: 'Fushen YANG'
---

## 背景情况

公司有个FTP，里面是一些共享文件：研发、行政等等都会往里面放东西。作为一个共享文件服务它足够简单，作为一个内网应用，也足够好用。用了很久了之后，现在要做一些改进，所以，希望知道目前一共有多少文件，这样也可以估算一下未来准备多少硬件。从安全角度考虑，我还没有拿到这个FTP系统的访问权限（拿到了我也不想贸然登录服务器，服务一切正常的时候尽量不要乱动）。统计文件的工作项目在我的“待办列表”里待了很久很久，终于在一个阳光明媚的上午，我准备把它处理好。

## 过程故事

开始我把这个问题想简单了，我美滋滋的把这个任务丢给opencat(powered by gpt),结果，因为没有任何上下文的情况下，她给我回了一个shell脚本，用bash直接驱动lftp命令。

![猫猫不开心](2-find-how-many-files-on-ftp-server-with-script/unhappy_cat.png)

我隐约感觉不太对，直接的第一反应就是python。然后就开始了折腾，中间故事不表了，只说结果：我进坑了。ftplib是默认的库，运行效率特别低会卡死，考虑到有大量文件，默认的库可能确实性能不太好也可以理解（并不能……），我尝试更换了ftputil，结果中文支持不好。

最终回到了了bash+lftp的组合，值得庆幸的是，我很喜欢这个组合。并且也知道了，不要随便用python，ftp是那个年代的东西，就应该搭配同年代的工具

## 幕间休息

![中午吃了一些好吃的😋](2-find-how-many-files-on-ftp-server-with-script/lunch.png)

## 抓取数据

和之前抓取数据不同，这次我并没有记录抓取进度，而是根据根目录下的文件夹，一个个抓取的。想起了上次抓取数据的经验，抓取过程肯定会断掉：所以断点重连和进度保存看似麻烦却实际上是必要的。这次让我惊喜的是，lftp自己有断点重连功能！！现在回头看看，不能太喜新厌旧。
当然也有一些坑：比如文件名中可能有“空格”，这个被我考虑到了，但是问题出在存在“双空格”的情况，然后ls输出本来是多空格过滤为单空格:也就不能用awk了。改用用sed，然后发现macos的sed并不标准，准确的说，sed支持的正则表达式就不标准。文件名中的“&”这些就更不用说了。再比如，日期字段并不规范，如果是去年及以前的文件，就会用年月日，而当年的文件就会显示具体时间。好在，这些小的细节gpt就可以帮忙了。

## 结果

我拿到了所有的数据列表，截止6月5号的文件快照有了一份～可以作为后来分析扩容的基础了。更加开心的事情是，我的待办列表可以清除一项了。

## 最终代码

``` bash
# this script (maybe) only working on mac
# FTP server credentials
FTP_USERNAME="username"
FTP_PASSWORD="password"
FTP_SERVER="257.257.257.257"

#change this ^_^
now="/firstdir"
OUTPUT="./output/now.txt"

#the function
function getFiles() {
    local path="$1"
    if [[ ${path: -1} != "/" ]]; then
        path="${path}/"
    fi
    local scriptpath=$(echo "$path" | sed 's/ /\\ /g' | sed 's/&/\\&/g')
    local output=$OUTPUT
    local remote_files
    local size line
    local filename
    local first
    lftp -u "$FTP_USERNAME","$FTP_PASSWORD" "$FTP_SERVER" <<EOF
    cd $scriptpath
    ls > /tmp/files.txt  # list all files and directories and save to a temporary file
    bye
EOF
    while read line; do
        filename=$(echo "$line" | sed -n -r 's/^.*[Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec]{3} [0-9]{2}[[:space:]]+([0-9]{4}|[0-9]{2}:[0-9]{2}) (.*)$/\2/p')
        echo $line >> "${output}"
        first=${line:0:1}
        if [[ $first == 'd' ]] ; then
            echo "$path$filename"
            getFiles "$path$filename"
        fi
    done < /tmp/files.txt
}
getFiles "$now"

```

## 小结

这个代码写完花了整整4个小时，一个上午的时间都在写，写的过程中想着还有其他的事情要处理。总之，并不是个很开心的工作，原因是心态问题，我一开始忘记了这个工作中肯定会出现各种“细节”需要不断调试，如果一开始就知道的话，心态能好很多。开心面对自己喜欢的工作应该是非常幸福的事情。
