# ComfyUI_EasyKitHT_NodeAlign Pro 🎨

[![GitHub stars](https://img.shields.io/github/stars/ArtsticH/ComfyUI_EasyKitHT_NodeAlignPro?style=for-the-badge)](https://github.com/ArtsticH/ComfyUI_EasyKitHT_NodeAlignPro/stargazers)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![切换中文](https://img.shields.io/badge/切换中文-README_ZH.md-blue?style=for-the-badge)](README_ZH.md)
[![English](https://img.shields.io/badge/English-README.md-blue?style=for-the-badge)](README.md)
[![参考项目](https://img.shields.io/badge/参考项目-ComfyUI-NodeAligner-blue?style=for-the-badge)](https://github.com/Tenney95/ComfyUI-NodeAligner)
[![参考项目](https://img.shields.io/badge/参考项目-ComfyUI-Align-blue?style=for-the-badge)](https://github.com/Moooonet/ComfyUI-Align)

全新设计的ComfyUI节点对齐与上色插件，完整重新设计开发了新的UI图标和布局。对齐工具的布局更符合设计行业通用的操作逻辑和体验，上色工具位置更合理，方便快速上色。


## ✨ 核心功能

| 智能对齐系统              | 增强工作流                | 高效交互设计              | 🔆新增UI缩放适配               |
|---------------------------|---------------------------|---------------------------|---------------------------|
| ✅ 8种基础对齐模式         | 🎨 一键式颜色管理方案      | 🖱️ 悬浮式工具面板         | ✅右键菜单新增UI缩放按钮     |
| 📐 动态间距分布算法        | 📏 可视化布局辅助线        | ⌨️ 快捷键自定义配置       | 😁默认点击“UI缩放”按钮</br>　 仅缩放插件组件     |
| 👥 多节点组协同操作        | 👁️ 实时预览调整效果        | 💾 布局记忆与恢复系统     | ❕按Ctrl点击“UI缩放”按钮</br>　 页面全局缩放    |  

⚠️注：`HT20250430-新增UI缩放适配`  (有轻微bug导致`全局缩放过大导致显示不全`，但`不影响基础使用`，后续会修复。  
因此目前你可以**放心的使用基础UI缩放**，即**直接点击“UI缩放”按钮**)。  

## 🖼️ 效果演示

![操作演示](Example/NodeAlignPro_demo_Work.webp)  
<video src="//player.bilibili.com/player.html?isOutside=true&aid=114426065716534&bvid=BV1V7G9z9EcU&cid=29714745695&p=1" controls="controls" width="500" height="300"></video>  


更新功能记录 

![UI重绘_线稿](Example/res/优化UI重绘_元素_线稿.webp)
![UI重绘_渲染](Example/res/优化UI重绘_元素_渲染.webp)    
![新增_UI缩放适配](Example/res/新增UI缩放适配.webp)  

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
- 本项目采用 MIT License，开发思路基于`ComfyUI-Align`、`ComfyUI-NodeAligner`二次开发。  
- 主要重构了代码，并重写了UI，从而开发了`ComfyUI_EasyKitHT_NodeAlignPro`这款轻量级`ComfyUI插件`。  
- 核心功能为：`节点对齐`与`节点上色`。


👨💻 设计师业余开发项目，欢迎反馈使用问题
⚠️ 可能存在未测试场景的异常，请通过Issues报告