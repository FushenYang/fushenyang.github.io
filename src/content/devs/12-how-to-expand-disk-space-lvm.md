---
title: LVM磁盘扩容
pubDate: 2024-06-24T00:23:36
tags:
  - "lvm"
path: "how-to-expand-disk-space-lvm"
author: Fushen YANG
type: default
---

## 前言

偶然看到我的pve虚拟机，磁盘快满了,这才想起上一次这个主机死机的事情，可能又是磁盘问题。这倒让我想起了之前看书的时候，好多篇章都在讲磁盘满了怎么办，当时的我不理解，“磁盘那么容易满吗？”，现在发现最近要处理的问题都是如此。

![磁盘要满了](12/disk-info.png)

这次记录下来，也算是学习lvm的过程，下次可以参考这个教程。

## 如何处理

首先，我面临的是虚拟机的问题，因为第一步是在pve平台中给磁盘扩大容量，这一步可以通过GUI完成。然后就是复杂的，如何把扩大的容量给到需要的地方。这里我使用GPT辅助来完成了第一步，使用`fdisk`把空白的磁盘容量通过分区修改先给到了vda2分区。`sudo fdisk /dev/vda`然后通过`p`查看分区表，依次通过d,2,n,p,2,w来修改分区（起始扇区号相同，结尾扇区保持默认）。最后`sudo partprobe /dev/vda`。

最常用的两个命令是`lsblk`和`du -hT`这两个命令可以查看磁盘容量。

``` bash
$ df -hT
Filesystem          Type      Size  Used Avail Use% Mounted on
devtmpfs            devtmpfs  4.0M     0  4.0M   0% /dev
tmpfs               tmpfs     1.8G     0  1.8G   0% /dev/shm
tmpfs               tmpfs     730M   67M  663M  10% /run
/dev/mapper/rl-root xfs        28G   26G  2.4G  92% /
/dev/vda1           xfs       960M  305M  656M  32% /boot
tmpfs               tmpfs     365M     0  365M   0% /run/user/1000

$ lsblk
NAME        MAJ:MIN RM  SIZE RO TYPE MOUNTPOINTS
sr0          11:0    1  1.6G  0 rom
vda         252:0    0   52G  0 disk
├─vda1      252:1    0    1G  0 part /boot
└─vda2      252:2    0   51G  0 part
  ├─rl-root 253:0    0 27.8G  0 lvm  /
  └─rl-swap 253:1    0  3.2G  0 lvm  [SWAP]
```

vda2已经有足够的空间了，而/rl-root太小了，需要扩容一下。

``` bash
$ sudo vgdisplay
  --- Volume group ---
  VG Name               rl
  System ID
  Format                lvm2
  Metadata Areas        1
  Metadata Sequence No  6
  VG Access             read/write
  VG Status             resizable
  MAX LV                0
  Cur LV                2
  Open LV               2
  Max PV                0
  Cur PV                1
  Act PV                1
  VG Size               <51.00 GiB
  PE Size               4.00 MiB
  Total PE              13055
  Alloc PE / Size       7935 / <31.00 GiB
  Free  PE / Size       5120 / 20.00 GiB
  VG UUID               KpIiEf-e7nH-gEda-c1Q8-K9GQ-8cZD-iLjhFw
```

通过`vgdisplay`可以看到，扩容的20G被添加进来了，可以使用这些空间扩容分区，分区情况如下：

``` bash
$ sudo lvdisplay
  --- Logical volume ---
  LV Path                /dev/rl/swap
  LV Name                swap
  VG Name                rl
  LV UUID                KRLJNx-MqFn-BBum-C1SL-0qmw-GsOl-6p5gUM
  LV Write Access        read/write
  LV Creation host, time localhost.localdomain, 2024-01-14 16:08:22 +0800
  LV Status              available
  # open                 2
  LV Size                3.20 GiB
  Current LE             820
  Segments               1
  Allocation             inherit
  Read ahead sectors     auto
  - currently set to     256
  Block device           253:1

  --- Logical volume ---
  LV Path                /dev/rl/root
  LV Name                root
  VG Name                rl
  LV UUID                RqpCfQ-m6K8-XeiG-bYc6-ulve-2VwU-DJICEW
  LV Write Access        read/write
  LV Creation host, time localhost.localdomain, 2024-01-14 16:08:23 +0800
  LV Status              available
  # open                 1
  LV Size                27.79 GiB
  Current LE             7115
  Segments               1
  Allocation             inherit
  Read ahead sectors     auto
  - currently set to     256
  Block device           253:0
```

然后可以通过`lvextend`命令进行扩容。

``` bash
$ sudo lvextend -L +10G /dev/mapper/rl-root
  Size of logical volume rl/root changed from 27.79 GiB (7115 extents) to 37.79 GiB (9675 extents).
  Logical volume rl/root successfully resized.

$ df -hT
Filesystem          Type      Size  Used Avail Use% Mounted on
devtmpfs            devtmpfs  4.0M     0  4.0M   0% /dev
tmpfs               tmpfs     1.8G     0  1.8G   0% /dev/shm
tmpfs               tmpfs     730M   67M  663M  10% /run
/dev/mapper/rl-root xfs        28G   26G  2.4G  92% /
/dev/vda1           xfs       960M  305M  656M  32% /boot
tmpfs               tmpfs     365M     0  365M   0% /run/user/1000

$ sudo xfs_growfs /dev/mapper/rl-root
meta-data=/dev/mapper/rl-root    isize=512    agcount=4, agsize=1821440 blks
         =                       sectsz=512   attr=2, projid32bit=1
         =                       crc=1        finobt=1, sparse=1, rmapbt=0
         =                       reflink=1    bigtime=1 inobtcount=1 nrext64=0
data     =                       bsize=4096   blocks=7285760, imaxpct=25
         =                       sunit=0      swidth=0 blks
naming   =version 2              bsize=4096   ascii-ci=0, ftype=1
log      =internal log           bsize=4096   blocks=16384, version=2
         =                       sectsz=512   sunit=0 blks, lazy-count=1
realtime =none                   extsz=4096   blocks=0, rtextents=0
data blocks changed from 7285760 to 9907200

$ df -hT
Filesystem          Type      Size  Used Avail Use% Mounted on
devtmpfs            devtmpfs  4.0M     0  4.0M   0% /dev
tmpfs               tmpfs     1.8G     0  1.8G   0% /dev/shm
tmpfs               tmpfs     730M   67M  663M  10% /run
/dev/mapper/rl-root xfs        38G   26G   13G  68% /
/dev/vda1           xfs       960M  305M  656M  32% /boot
tmpfs               tmpfs     365M     0  365M   0% /run/user/1000
```

轻松完成扩容～
（扩容的语法非常方便，另外扩容的挂载点目录可以从`df -hT`命令中获取）

## 结尾

![硬盘空间充足了](12/disk-has-enough-space.png)

另外有一条命令可以看到磁盘结尾的空白空间`sudo parted /dev/vda 'unit s print' free`,用起来也是非常方便。
