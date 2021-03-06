# Onmyoji Simulator

## 概述&预览

### 概述

本项目旨在通过实现阴阳师整体机制，以及式神逻辑以及AI，可以实现对局模拟，机制测试，对弈竞猜胜率预测的功能

### Github Page

~~提供在线预览，版本不定期更新，可能会稍稍落后于代码版本~~ 目前已经支持自动更新  
[预览](http://120.25.26.193/)  
[预览(Github Pages)](https://anzerwall.github.io/)  

## 功能

### 设置队伍

要使用功能，需要先设置队伍，设置完队伍后可以切换页面，初始现在会是随机式神，暂不会保存你的选择，请不要刷新页面  
~~目前暂时不支持自定义属性。~~   目前支持

### 对战模拟

用于验证式神逻辑，支持步进

【反馈】如果你发现有式神实现与实际表现不同，请向我反馈，页面提供dump，请附带信息截图以及你觉得有问题的地方  
【邮箱】anzerwall{at}gmail.com   {at}替换成@  
【Q群】 在百鬼研究中心(284220173) 联系 【小鸟游远】  

### 对战胜率预测

可以预测指定的队伍的胜率  
【注意】 现在的该功能因为式神逻辑未全部完成，不能代表真实对局结果，可用的式神参见【式神列表页】   
【以后】 就算所有式神完工，理论上除非一方近乎100%胜率，不然就算整体完成，官方依然可以不着痕迹地操控结果（只要展示胜利的一次即可）。     

## 源码

### 运行环境

[node.js](https://nodejs.org)  
[vue.js](https://vuejs.org)  

### 安装node

从[官网](https://nodejs.org)根据平台下载安装包

### 安装依赖

在项目跟目录下执行：

```shell
npm i
```

### 运行

在项目跟目录下执行：

```shell
npm run serve
```

## 想要参与

### 式神制作

接受式神技能制作或者AI的pr

### 意见以及建议

如果你有什么好的建议或者有啥需要提前制作的式神，请告诉我理由

## TODOs

### 当前

目前准备往魂十一测试工具方向进行制作

- [ ] 御魂系统
- [ ] 御魂: 火灵
- [ ] 御魂: 破势
- [ ] 御魂: 心眼
- [ ] 御魂: 狂骨
- [ ] 御魂: 鬼灵歌姬
- [ ] 御魂: 荒骷髅
- [ ] 回目机制
- [ ] 常见式神: sp玉藻前
- [ ] 常见式神: sp酒吞
- [ ] 常见式神: 薰
- [ ] 常见式神: 童男
- [ ] 御魂: 地震鲶
- [ ] 魂十一怪物: 清姬
- [ ] 魂十一怪物: 络新妇
- [ ] 魂十一怪物: 雪女
- [ ] 魂十一怪物: 首无
- [ ] 魂十一怪物: 巫女大蛇
- [ ] 魂十一怪物: 黑晴明
- [ ] 魂十一怪物: 鬼切
- [ ] 魂十一御魂: 雪幽魂
- [ ] 魂十一御魂: 蝠翼
- [ ] 魂十一御魂: 轮入道
- [ ] 魂十一御魂: 涅槃之火
- [ ] 魂十一御魂: 针女
- [ ] 常见式神: 食发鬼
- [ ] 常见式神: sp茨木
- [ ] 常见式神: 玉藻前
- [ ] 常见式神: 白狼
- [ ] 常见式神: 座敷童子
- [ ] 常见式神: 八岐大兔
- [ ] 常见式神: 丑女
- [ ] 御魂: 土蜘蛛
- [ ] 御魂: 青女房
- [ ] 御魂: 镇墓
- [ ] 常见式神: 云外镜

[数据参考](https://ngabbs.com/read.php?tid=16641284&rand=53)

### 杂项

- [ ] 对战调试页重构
- [ ] [Buff关联图标](https://bbs.nga.cn/read.php?tid=14455689&rand=14)
- [ ]  HP + 1问题
- [x] buff冲突覆盖机制
- [x] 整理输出和代码
- [x] 全局增加Player用于存储全局buff 结界等
- [x] 全局buff区分队伍
- [x] 事件机制完善（支持反馈处理结果）
- [x] 技能事件完善 (优化代码逻辑)
- [x] AI机制实现
- [x] 伪回合
- [ ] 额外回合
- [x] 场上位置
- [x] 死亡
- [ ] 复活
- [x] 治疗计算，减疗 增疗
- [ ] 召唤物
- [x] 间接伤害处理
- [ ] 设置队伍页支持自定义属性
- [ ] 设置队伍页支持自定义御魂
- [ ] 最大生命值减少时影响生命
- [ ] 技能去重以及覆盖机制
- [ ] 跨回目机制探究（需要帮助）

### 核心

- [x] UI-式神数据页
- [x] UI-队伍录入页
- [x] UI-对战调试页(基础)
- [ ] UI-对战调试页(2/3d版)
- [x] UI-对弈竞猜预测页(对战模拟法)
- [ ] UI-对弈竞猜预测页(机器学习法)
- [x] Mana(鬼火机制)
- [x] Runway(行动条)  
- [x] Team(队伍)
- [ ] Equipment(基础御魂)
- [x] Buff(buff机制)
- [x] Skill(技能机智)
- [x] Entity(实体)
- [x] Hero(式神)
- [x] Event(事件机制)

### 呱

呱(0 / 14)

### N

N (11 / 12)

- [x] 赤舌
- [x] 天邪鬼红
- [x] 天邪鬼青
- [x] 天邪鬼黄
- [x] 提灯小僧
- [x] 盗墓小鬼
- [x] 帚神
- [x] 唐伞纸妖
- [x] 寄生灵
- [x] 涂壁
- [ ] 灯笼鬼

### R

R(0 / 35)

### SR

SR(0 / 54)

### SSR

SSR(2 / 28)

- [x] 大天狗
- [x] 酒吞童子
- [ ] 荒川之主
- [ ] 阎魔
- [ ] 两面佛
- [ ] 小鹿男
- [ ] 茨木童子
- [ ] 青行灯
- [ ] 妖刀姬
- [ ] 一目连
- [ ] 花鸟卷
- [ ] 辉夜姬
- [ ] 荒
- [ ] 彼岸花
- [ ] 雪童子
- [ ] 山风
- [ ] 玉藻前
- [x] 御馔津
- [ ] 面灵气
- [ ] 鬼切
- [ ] 白藏主
- [ ] 八岐大蛇
- [ ] 大岳丸
- [ ] 云外镜
- [ ] 鬼童丸
- [ ] 缘结神

### SP

SP(0/ 11)

### 其他

## 鸣谢

[六星满级面板数据](https://nga.178.com/read.php?tid=14788831)

[头像整理](https://bbs.nga.cn/read.php?tid=19007353)

[阴阳师式神AI全解](https://bbs.nga.cn/read.php?tid=16541728)

[buff图标整理](https://bbs.nga.cn/read.php?tid=14455689)

阴阳师百鬼研究中心(Q群:284220173)的热心群友

- 回合结算过程3.0.docx
- 阴阳师式神信息表3.2.1.xlsx
