# ComfyUI_EasyKitHT_NodeAlign Pro 🎨

[![GitHub stars](https://img.shields.io/github/stars/ArtsticH/ComfyUI_EasyKitHT_NodeAlignPro?style=for-the-badge)](https://github.com/ArtsticH/ComfyUI_EasyKitHT_NodeAlignPro/stargazers)  [![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)  [![切换中文](https://img.shields.io/badge/切换中文-README_ZH.md-blue?style=for-the-badge)](README_ZH.md)  [![English](https://img.shields.io/badge/English-README.md-blue?style=for-the-badge)](README.md)

全新设计的ComfyUI节点对齐与上色插件，完整重新设计开发了新的UI图标和布局。对齐工具的布局更符合设计行业通用的操作逻辑和体验，上色工具位置更合理，方便快速上色。

## 🔥<font color=#22ee00> [+] </font>更新预告 (近期版本将会大更新😁)↓↓↓↓
<font color=#22ee00> [+] </font>基础代码和构思已于今年6-7月份基本完成，由于本人近期较忙，搁置了挺久迟迟没有更新，还请大家耐心等待，争取国庆节前上线大更新版本(详见下图👇)。感谢各位支持和理解！
![更新预告](【更新预告】HT20250627-Snipaste_t011207_ArtsticH_NodeAlignPro_v2.png)


## ✨ 核心功能 (即将上线)

| 💫智能对齐系统    | <font color=#22ee00> [+]</font>💫全新上色系统 | <font color=#22ee00> [+]</font>💫人性化交互设计   | <font color=#22ee00> [+]</font>💫全新取色器(原创设计) |
|---------------------------|---------------------------|---------------------------|---------------------------|
| ✅ 8种基础对齐模式         | <font color=#22ee00> [+]</font>🖼️ 一键式颜色管理方案     | 🖱️ 悬浮式工具面板         | <font color=#22ee00> [+]</font>✅ 原生JS/CSS实现全新取色系统     |
| 📐 动态间距分布算法        | <font color=#22ee00> [+]</font>🔗 实时联动显示取色效果        | <font color=#22ee00> [+]</font>🧩 全新自定义配置       | <font color=#22ee00> [+]</font>🎨 色卡模式: 彩色/灰度/自定义     |
| 👥 多节点组协同操作        | <font color=#22ee00> [+]</font>💾 自定义色卡收藏与恢复系统        | <font color=#22ee00> [+]</font>💾 布局记忆与恢复系统     | <font color=#22ee00> [+]</font>👏 色卡：随机/收藏/移除/以及手动添加    |  

⚠️注：`HT20250430-新增UI缩放适配`  (有轻微bug导致`全局缩放过大导致显示不全`，但`不影响基础使用`，后续会修复。  
因此目前你可以**放心的使用基础UI缩放**，即**直接点击“UI缩放”按钮**)。  
⚠️<font color=#22ee00> [+] </font>注：`💫全新上色系统` `💫人性化交互设计` `💫全新取色器(原创设计)` 这三大板块均进行了不同程度的重构，且尽可能保留了`v1.0.4_rc版`的基础操作逻辑，大家`**耐心等待近期更新**`即可。  

## 🖼️ 效果演示

![操作演示](HT20250501-ArtsticH_NodeAlignPro_demo.webp) 

## ✅ 更新功能记录 

![UI_联动【运行按钮】](Example/hPic/HT20250501-联动【运行按钮】_右键菜单适配_ArtsticH_NodeAlignPro.webp) 
![UI_联动【运行按钮】](Example/hPic/HT20250501-联动【运行按钮】_ArtsticH_NodeAlignPro.webp)  
![UI_件优化UI重绘_新增UI缩放适配](Example/hPic/HT20250430-件优化UI重绘_新增UI缩放适配_ArtsticH_NodeAlignPro.webp)  
![ArtsticH_原创设计_基础线稿](Example/hPic/HT20250429-优化UI重绘_元素_渲染_ArtsticH_NodeAlignPro_对比.webp)  

<video src="https://player.bilibili.com/player.html?isOutside=true&aid=114426065716534&bvid=BV1V7G9z9EcU&cid=29714745695&p=1" controls="controls" width="500" height="300"></video>  
<video src="https://www.bilibili.com/video/BV1V7G9z9EcU/" controls="controls" width="500" height="300"></video>   
---

## 🛠️ 安装指南

### 手动安装
1. [下载最新Release](https://github.com/ArtsticH/ComfyUI_EasyKitHT_NodeAlignPro/releases)
2. 解压到 `ComfyUI/custom_nodes/` 目录
3. 重启ComfyUI服务

### Git安装
```bash
git clone https://github.com/ArtsticH/ComfyUI_EasyKitHT_NodeAlignPro.git custom_nodes/ComfyUI_EasyKitHT_NodeAlignPro
```
### Git更新（需先手动导航至ComfyUI_EasyKitHT_NodeAlignPro目录内）
```bash
git fetch --all
```
### 🚀 快速开始
示例工作流配置(仅供参考)
```python
{
    "nodes": [
        {
            "type": "ComfyUI_EasyKitHT_NodeAlignPro/AlignGroup",
            "params": {
                "alignment_mode": "vertical_center",
                "spacing": 50,
                "color_scheme": "cyan"
            }
        }
    ]
}
```

## 📌 功能详解
- **节点对齐**  
**左对齐 / 右对齐 / 顶对齐 / 底对齐**、**水平居中 / 垂直居中**、**智能间距分布**

- **节点上色**  
**预设7色系：红、橙、黄、绿、青、蓝、紫**、**自定义取色器**、**快速清除颜色**


## 🤝 贡献指南
- 欢迎通过以下方式参与改进：  
`提交使用反馈`、`New Issue`、`改进代码逻辑`、`Fork & PR`、`完善多语言文档`、`分享创意工作流`

## 📜 许可协议
- 本项目采用 MIT License，开发思路基于[ComfyUI-NodeAligner](https://github.com/Tenney95/ComfyUI-NodeAligner) 和 [ComfyUI-Align](https://github.com/Moooonet/ComfyUI-Align) 二次开发。  
- 主要重构了代码，并重写了UI，从而开发了[ComfyUI_EasyKitHT_NodeAlignPro](https://github.com/Tenney95/ComfyUI-NodeAligner)这款轻量级`ComfyUI插件`。  
- 核心功能为：`节点对齐`与`节点上色`。


👨💻 设计师业余开发项目，欢迎反馈使用问题
⚠️ 可能存在未测试场景的异常，请通过Issues报告