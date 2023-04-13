# 这是博客的使用手册

Hexo 项目本身是用github管理的，如果编辑完文章，可以提交保存。

``` bash
git add .
git commit -m '这次修改的信息'
git push
```

添加和发布一篇文章，用以下命令：

``` bash
npx hexo new "the title of new page" # 添加一篇文章
npx hexo g -d # 生成网站并发布到服务器
```

虽然可能用不到，还有其他命令控制这个网站：

``` bash
hexo server
hexo generate
hexo deploy
```
