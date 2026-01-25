# EasyKit-NodeAlign-Pro [↙切换中文] 🎨

[![GitHub stars](https://img.shields.io/github/stars/ArtsticH/ComfyUI_EasyKitHT_NodeAlignPro?style=for-the-badge)](https://github.com/ArtsticH/ComfyUI_EasyKitHT_NodeAlignPro/stargazers)  [![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)  [![切换中文](https://img.shields.io/badge/切换中文-README_ZH.md-blue?style=for-the-badge)](README_ZH.md)  [![Switch to English](https://img.shields.io/badge/English-README.md-blue?style=for-the-badge)](README.md)

## 📋 项目简介

**EasyKit-NodeAlign-Pro** 由设计师独立开发(原名称：ComfyUI_EasyKitHT_NodeAlign Pro)：
for omfyUI node 2.0: 用于管理 ComfyUI 中节点布局和配色方案的必备插件，具备专业的对齐功能和实时节点取色器 **已适配ComfyUI Node2.0** 。功能能涵盖对齐分布、实时节点取色器、调色盘、7 种预设颜色、灰度/自定义模式以及一键反向对齐等功能，提供全新对齐工具和专业的节点色彩管理系统。内置对齐工具的布局更符合设业通用的操作逻辑和体验，多种上色模式的上色工具更合理。（原生支持多语言UI界面显示）
原创基于节点的实时预览调色/取色组件，方便快速节点取色/上色。该插件旨在提升ComfyUI用户的工作效率，通过直观的界面和丰富的功能简化节点布局与颜色管理流程。

---

## 🔥 新版v2.1更新说明 (适配Node2.0)
 
**新版v2.0全新适配i18n多语言配置文件，原生支持中文、English等语言（后续视情况还可扩展支持更多诸如俄语、法语等语言），对世界各地的国际友人更友好。**
同样在尽可能保留上一版UI及交互习惯的前提下，微调界面交互逻辑，继续更新迭代UI（详见下图）。

#### ✅ 新版UI界面展示

![NodeAlignPro_v2_UI](docs/images/h_NodeAlignPro_v2__UI.webp)
#### ✅【260125更新】：新增ComfyUI菜单、新增i18n多语言适配 (现以集成到官方菜单页面)👇
![NodeAlignPro_v2_MENU](docs/images/h_NodeAlignPro_v2-1_i18nMenu.webp)

#### 如果觉得还可以，欢迎帮忙点下**⭐Star**，您的鼓励就是我最大的动力~

<details>
  <summary><b>⚠️旧版v1.0.4_rc UI界面...</b></summary>

**旧版v1.0.4_rc**： 只提供基础的节点对齐工具和固定的上色工具：
![NodeAlignPro_v2_UI](docs/images/h_NodeAlignPro_v1__UI.webp)  
</details>

## ✨ 核心功能 (已正式上线)

| 💫Node2.0节点对齐系统    | 💫全新上色系统 | 💫人性化交互设计   | 💫全新取色器(原创设计) |
|---------------------------|---------------------------|---------------------------|---------------------------|
| 🔥 **新版Node2.0节点算法**        | 🖼️ 一键式颜色管理方案     | 🖱️ 悬浮式工具面板         | ✅ **原创实时预览调色/取色组件**     |
| 📐 **原创Alt反向基准对齐算法**        | 🔗 实时联动全屏取色器        | ⚙️ 全新自定义配置       | 🎨 色卡模式: 彩色/灰度/自定义     |
| 📊 两套对齐分布算法        | 🎨 整体上色/仅标题上色模式        | 💾 布局记忆与恢复系统     | 🧩 色卡：随机/收藏/移除/手动    |  
| 🧩 多种对齐分布模式        | 🧩 自定义色卡收藏与恢复系统        | 🌐 原生i18n多语言系统     | 🎨 预置色：色值特调优化    |  

#### 🎯 高级特性
- **i18n多语言**：原生适配i18n多语言系统
- **Node2.0节点**：全新支持ComfyUI Node2.0节点
- **ComfyUI系统菜单集成**：常驻显示或跟随选框自动显示
- **自定义拖动及缩放**：可自由拖拽和缩放的操作面板
- **AcBar联动模式**：与ComfyUI运行按钮联动拖移定位
- **右键菜单**：丰富的设置选项和快捷操作
- **节点批量选择**：多种选择工具和魔棒功能  （开发调试中...）
- **节点批量重命名**：批量重命名节点功能    （开发调试中...）

#### 🎨 颜色管理模块
- **两种上色模式**：仅节点标题上色 / 节点整体上色【v2.0.3_rc新增】
- **七组预设颜色**：快速应用标准颜色到选中节点
- **灰度色板**：按住**Shift键**切换至灰度颜色模式【v2.0.1_rc新增】
- **自定义色板**：按住**Alt键**进入自定义颜色模式【v2.0.1_rc新增】
- **颜色收藏**：**Ctrl+Alt组合**锁定/解锁自定义颜色【v2.0.1_rc新增】
- **随机颜色**：点击随机颜色按钮即可随机一种颜色【v2.0.1_rc新增】
- **超级随机色**：按**Alt键** + **随机颜色按钮**可一次性随机7种颜色，并对选中节点实时随机上色【v2.0.1_rc新增】
- **实时取色器**：内置**全屏实时取色器**【v2.0.1_rc新增】（0依赖，纯原生js+css开发设计）
- **节点调色实时预览组件**：原创基于节点的实时预览调色/取色组件【v2.0.1_rc新增】（0依赖，纯原生js+css开发设计）

#### 🔧 节点对齐模块
- **基础对齐**：左对齐、右对齐、顶部对齐、底部对齐
- **居中分布**：垂直居中和水平居中
- **等距分布**：水平等距分布和垂直等距分布
- **尺寸统一**：等宽和等高调整
- **反基准模式**：按**Alt键** + 点击对应**对齐按钮**可实现反向基准对齐【v2.0.1_rc新增】

---

## 🚀 插件安装

#### 方法一：ComfyUI Manager管理器（推荐）
1. 在 **ComfyUI Manager** 管理器搜索 "**NodeAlign Pro**"（注意"Pro"前空格）
2. 找到`EasyKit-NodeAlign-Pro`，点击安装`(此方式为ComfyUI注册版插件：会自动生成ComfyUI官方标准生态的easykit-node-align目录)`
3. 等待提示重启ComfyUI 即可使用

#### 方法二：Git克隆（推荐）
1. 打开ComfyUI/custom_nodes目录，执行如下命令`(此方式为git版插件：会自动生成ComfyUI_EasyKitHT_NodeAlignPro目录)`：
```
git clone https://github.com/ArtsticH/ComfyUI_EasyKitHT_NodeAlignPro.git
```

- 中国用户及无法访问github的用户请使用gitee镜像源：
```
git clone https://gitee.com/ArtsticH/ComfyUI_EasyKitHT_NodeAlignPro.git
```

3. 重启ComfyUI 即可使用

#### 方法三：comfy install安装
`(此方式为ComfyUI注册版插件：会自动生成ComfyUI官方标准生态的easykit-node-align目录)`
```
comfy node install easykit-node-align
```

#### 方法四：Git手动安装
1. 打开本项目地址：https://github.com/ArtsticH/ComfyUI_EasyKitHT_NodeAlignPro
2. 下载插件压缩包（`<>Code` > `Download ZIP`）
3. 解压到 `ComfyUI/custom_nodes` 目录 （注意正确目录层级应为：`ComfyUI/custom_nodes/ComfyUI_EasyKitHT_NodeAlignPro`）
4. 重启ComfyUI 即可使用



## 🚀 插件更新

#### 方法一：ComfyUI Manager管理器更新（推荐）
1. 在 **ComfyUI Manager** 管理器搜索 "**NodeAlign Pro**"（注意"Pro"前空格）
2. 找到`EasyKit-NodeAlign-Pro`，点击安装`(此方式为ComfyUI注册版插件：会自动生成ComfyUI官方标准生态的easykit-node-align目录)`
3. 等待提示重启ComfyUI 即可使用

#### 方法一：Git更新（需先手动导航至ComfyUI_EasyKitHT_NodeAlignPro目录内）
```
git fetch --all && git reset --hard origin/main
```

---

![插件截图](docs/images/ComfyUI_EasyKitHT_NodeAlignPro_v2.webp)
#### 🚀 快速开始（简要指南）
成功安装NodeAlignPro之后，基础操作(仅供参考)

1. **节点上色**：进入ComfyUI选中任一节点 > 点击NodeAlignPr面板（以下简称NAP面板）内任意**颜色按钮**即可（🔴🟠🟡🟢🔵🟣🟤,`清除颜色` `取色器` `随机颜色`）；
2. **自定义颜色**：选中任一节点 > 点击NAP面板内**取色器按钮**即可；
3. **节点对齐**： 选中任一节点 > 点击NAP面板内任意**对齐按钮**即可；
4. **反向对齐**：选中任一节点 > 按**Alt键** + 点击对应**对齐按钮**可实现反向基准对齐；
    └例：`左对齐` →选中多个节点 > 按`Alt键`+`左对齐按钮`，则以`最右侧节点`为`基准`进行`左对齐`（默认左对齐是以`最左侧节点`为`基准`进行`左对齐`）；
5. **拖动NAP面板**：无需选中任何节点 > 点击NAP面板左右两侧的按钮，出现四向箭头光标（↕↔）即可拖动
5. **重置设置**：无需选中任何节点 > 在NAP面板内 >【鼠标右键】 >【一键重置】 即可；
7. **进阶技巧**：请参阅下面**使用指南**👇。

<details>
  <summary><b>🖥️ 《使用指南》...</b></summary>

#### 基本操作
1. **启动插件**：ComfyUI启动后，插件自动加载
2. **显示/隐藏**：通过右键菜单或快捷键控制显示
3. **拖拽移动**：拖动标题栏或分隔线移动面板
4. **缩放调整**：通过右键菜单调整UI缩放比例

#### 颜色模式切换
| 按键组合 | 模式说明 | 功能描述 |
|---------|---------|---------|
| **无按键** | 默认模式 | 七种预设颜色 |
| **Shift** | 灰度模式 | 黑白灰系列颜色 |
| **Alt** | 自定义模式 | 自定义颜色管理 |
| **Ctrl+Alt** | 锁定模式 | 锁定/解锁自定义颜色 |

#### 对齐操作
1. 在ComfyUI画布上选择2个或更多节点
2. 点击对齐面板上的相应按钮：
   - **左对齐**：所有节点向左对齐
   - **垂直居中**：所有节点垂直居中
   - **右对齐**：所有节点向右对齐
   - **顶部对齐**：所有节点向顶部对齐
   - **水平居中**：所有节点水平居中
   - **底部对齐**：所有节点向底部对齐

#### 高级技巧
- **Alt+对齐按钮**：使用"反向基准"进行对齐
- **双击取色器预览**：切换节点整体/仅标题上色模式
- **右键菜单**：访问完整设置和重置功能
- **容器联动**：将操作面板与运行按钮联动定位

</details>

## 🐛 常见问题
- **Q: 如何切换语言？** 
→A: 直接点击ComfyUI左下角菜单> 🔥 NodeAlignPro> NodeAlignPro基本设置(Basic Settings)> NodeAlignPro UI语言(Language)；

- **Q: 颜色无法应用到节点？** →A: 确保已选中节点，检查节点是否处于锁定状态，尝试刷新页面；

- **Q: 对齐功能无效？** →A: 确保选中2个或更多节点，检查节点选择状态，尝试清除选择后重新选择；

- **Q: 如何重置所有设置？** 
→A: 右键菜单 → "一键重置"，或ComfyUI左下角菜单> 🔥 NodeAlignPro> Z开发人员选项(Developer Options)> ⚠强制重置NodeAlignPro插件；

- **Q: 插件不显示怎么办？** 
→A: 直接点击ComfyUI左下角菜单> 🔥 NodeAlignPro> Z开发人员选项(Developer Options)> ⚠强制重置NodeAlignPro插件。
![强制重置](<https://raw.githubusercontent.com/ArtsticH/h-Readme-res/main/ComfyUI_EasyKitHT_NodeAlignPro/docs/images/hNodeAlignPro_v2__ForceReset.webp>)
```↑若【强制重置】后仍未生效，请使用ComfyUI Manager检查插件是否正确安装，若未安装请搜索"NodeAlign Pro"重新安装，若安装请尝试FIX修复或尝试更新Update。```

---

<details>
  <summary><b>⚙️ 技术特性...</b></summary>

#### 架构设计
- **🌐原生开发**：使用原生JS+CSS从零实现
- **🔒零依赖**：不依赖任何第三方框架/库或现有代码段
- **📴全离线运行**：全本地化运行，不依赖任何网络资源，确保本地化私有部署的安全可靠性
- **📄单文件特性**：核心单文件集中开发，虽整体略显冗长，但方便集中管理，和调试维护
- **🧩模块化设计**：颜色、对齐、UI控制器分离
- **🏷️规范化命名**：自定义了一套自己风格的命名，做明显区分
- **💻响应式布局**：自适应不同屏幕分辨率
- **⚡性能优化**：必要环节的节流和防抖处理
- **💾状态持久化**：对插件的设置自动缓存，下次使用可直接延续上次的设置
- **✅真开源/不混淆**：完整保留必要的注释和变量参数名，不混淆代码进行伪开源

</details>

## 🔄 更新日志

### v2.1.0 (最新2.1版发布)
- 优化ComfyUI菜单、新增i18n多语言适配(集成到官方菜单页面)
- 重构颜色转换逻辑
- 重构屏幕取色功能
- 修订并完善Readme文档
- 修复若干bug

<details>
  <summary><b>📄 历史版本...</b></summary>

##### v2.0.3_rc
- 新增ComfyUI菜单(集成到官方菜单页面)
- 重构颜色转换逻辑
- 重构屏幕取色功能
- 修订并完善Readme文档
- 修复若干bug

##### v2.0.2_rc (2025-12-22)
- 完善新版(v2.0.3_rc)界面提示
- 修复了一些bug
- 重新编些md教程文档(中英双语)

##### v2.0.1_rc (2025-12-22)【2.0版发布】
- 新增Shift/Alt/Ctrl组合键模式
- 改进取色器性能和稳定性
- 添加节点预览功能
- 优化UI交互体验

##### v1.0.4_rc (2025-08-14)
##### v1.0.3_rc (2025-05-01)
##### v1.0.2_rc (2025-04-30)
##### v1.0.1_rc (2025-04-29)【1.0版发布】
- 初始版本发布
- 完整的对齐和颜色功能
- 可拖拽容器系统
- 取色器工具集成

</details>
<details>
  <summary><b>📄 历史更新日志...</b></summary>

```
v2.0.2_rc   8a12160: 🔥NodeAlignPro版本大更新,优化文件结构(全新UI, 更全的节点上色系统)→详见readme文档
----------------
v2.0.1_rc   dd2a09f: 🔥NodeAlignPro版本大更新已发布（全新UI, 更全的节点上色系统）
d90bd02: 🔥Update Preview (A Major Update for the Upcoming Version 😁)→See README for details.🔥重大更新预告(近期版本将会大更新😁)→详见readme文档
----------------
v1.0.4_rc   b77a9d7: FIX README, ht历史记录优化
----------------
v1.0.3_rc   a62e3a6: Fix the ui scaling adaptation issue, The interlocking control function has been newly added.
d067502: remove res, add hPic, FIX README,FIX README_ZH.md
----------------
v1.0.2_rc   b11f325: upload README
cb93ffa-461032d: README修改
4e60dc2: Fixed REEADME, Rename some img, Add README_ZH.md
fac4c81: UPLoad README , Create README_ZH.md
9f1839e: README修改-新增UI缩放适配
ef5735d: 新增UI缩放，修复旧版颜色移除不生效情况
8ac01db: 新增主要功能：对齐分布、节点上色。修改Readme图片显示异常
----------------
v1.0.1_rc   2926b82: README修改
10749c7: ComfyUI_EasyKitHT_NodeAlignPro是一个针对全新开发设计的ComfyUI节点对齐插件、节点上色插件。
    全新视觉UI，相对更符合广大设计师朋友们的一贯操作逻辑。皆为大家提供一个相对美观的使用体验。
    新增主要功能：对齐分布、节点上色。
----------------
ca28236: Initial commit
----------------
/**
 * @Artstich_Example
 * @name         easykit-node-align (ComfyUI Plugin)
 * @description  Professional alignment & real-time node color picker. A must-have plugin for managing node layout and color schemes in ComfyUI. Features a real-time color picker, alignment, 7 preset colors, grayscale/custom modes, and one-click reverse alignment.
 * @author ArtsticH
 * @see https://registry.comfy.org/zh/nodes/easykit-node-align
 * @see https://github.com/ArtsticH/ComfyUI_EasyKitHT_NodeAlignPro
 * @see https://gitee.com/ArtsticH/ComfyUI_EasyKitHT_NodeAlignPro
 * @installCommand comfy node install easykit-node-align
 * @installCommand git clone https://github.com/ArtsticH/ComfyUI_EasyKitHT_NodeAlignPro.git
 * @installCommand git clone https://gitee.com/ArtsticH/ComfyUI_EasyKitHT_NodeAlignPro.git
 * @created 2025-04-29 @date 2025-06-15 @version v2.0.3 @lastUpdated 2026-01-24 @license GPL-3.0
 * @copyright ©2012-2026, All rights reserved. Freely open to use, modify, and distribute in accordance with the GPL-3.0 license.
 */
 ```

</details>

## 🤝 贡献指南

- 欢迎通过以下方式参与改进：  
```提交使用反馈```、`New Issue`、`Discussions`、```改进代码逻辑```、`Fork & PR`、```完善多语言文档```、```分享你的创意节点布局```、```分享你的自定义色卡```

## 📜 许可证

   - 本项目采用 **GPL-3.0** 许可证。详细信息请查看 [LICENSE](LICENSE) 文件。

## 👥 贡献者

- 项目发起人 & 主要开发者: [@ArtsticH](https://github.com/ArtsticH)
- ISISUES & Discussions: [@JGDMGJAPT](https://github.com/jgdmgjapt) 、[@MAOMAOCHONGNE](https://github.com/MAOMAOCHONGNE)、[@aimposer](https://github.com/ArtsticH/ComfyUI_EasyKitHT_NodeAlignPro/issues/3)、[@Rock-suv](https://github.com/ArtsticH/ComfyUI_EasyKitHT_NodeAlignPro/issues/4)、[@BlissiraHQ](https://github.com/BlissiraHQ)...
- 感谢所有提供帮助的设计师、开发者、测试者、ComfyUI用户和反馈者

## 🌐 相关链接

- [源1: Last Releases](https://github.com/ArtsticH/ComfyUI_EasyKitHT_NodeAlignPro/releases)　|　[源2: Comfy registry](https://registry.comfy.org/zh/nodes/easykit-node-align)　|　[源3: Gitee镜像](https://gitee.com/ArtsticH/ComfyUI_EasyKitHT_NodeAlignPro)　|　[问题反馈](https://github.com/ArtsticH/ComfyUI_EasyKitHT_NodeAlignPro/issues)　|　[ComfyUI社区](https://github.com/comfyanonymous/ComfyUI)　|　[ComfyUI-Manager](https://github.com/Comfy-Org/ComfyUI-Manager/tree/main)
- 作者视频教程链接：https://www.bilibili.com/video/BV1V7G9z9EcU （此链接为旧版`v1.0.4_rc`教程，新版v2.1.0待录制）

---

👨💻 设计师业余开发的第一个小项目，欢迎反馈使用问题
⚠️ 可能存在未测试场景的异常，请通过Issues报告（如果觉得还可以，欢迎帮忙**Star⭐**一下，您的鼓励就是我最大的动力~）欢迎有兴趣的小伙伴们一起加入！

<small  style="color:#999">本文档更新于：2026年01月25日 10：24 @[ArtsticH](https://github.com/ArtsticH/ComfyUI_EasyKitHT_NodeAlignPro)·2025</small>