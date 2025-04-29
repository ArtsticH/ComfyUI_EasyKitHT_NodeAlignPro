# ComfyUI EasyKitHT NodeAlign Pro 🎨

[![GitHub stars](https://img.shields.io/github/stars/ArtsticH/ComfyUI_EasyKitHT_NodeAlignPro?style=for-the-badge)](https://github.com/ArtsticH/ComfyUI_EasyKitHT_NodeAlignPro/stargazers)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

全新视觉设计的 ComfyUI 节点对齐与上色插件，为设计师打造更符合直觉的操作体验

The brand-new visual design of the ComfyUI node alignment and coloring plugin creates a more intuitive operation experience for designers

---

## ✨ 核心功能

| 智能对齐系统              | 增强工作流                | 高效交互设计              |
|---------------------------|---------------------------|---------------------------|
| ✅ 8种基础对齐模式         | 🎨 一键式颜色管理方案      | 🖱️ 悬浮式工具面板         |
| 📐 动态间距分布算法        | 📏 可视化布局辅助线        | ⌨️ 快捷键自定义配置       |
| 👥 多节点组协同操作        | 👁️ 实时预览调整效果        | 💾 布局记忆与恢复系统     |

---

## 🖼️ 效果演示

![UI重绘_线稿](https://raw.githubusercontent.com/ArtsticH/ComfyUI_EasyKitHT_NodeAlignPro/main/Example/res/HT20250429-Snipaste_t172802_ArtsticH_Comfyui%E8%8A%82%E7%82%B9%E5%AF%B9%E9%BD%90%E6%8F%92%E4%BB%B6%E4%BC%98%E5%8C%96UI%E9%87%8D%E7%BB%98.webp)
![UI重绘_上色稿](https://raw.githubusercontent.com/ArtsticH/ComfyUI_EasyKitHT_NodeAlignPro/main/Example/res/HT20250429-Snipaste_t172819_ArtsticH_Comfyui%E8%8A%82%E7%82%B9%E5%AF%B9%E9%BD%90%E6%8F%92%E4%BB%B6%E4%BC%98%E5%8C%96UI%E9%87%8D%E7%BB%98.webp)
![操作演示](https://raw.githubusercontent.com/ArtsticH/ComfyUI_EasyKitHT_NodeAlignPro/main/Example/NodeAlignPro_demo_S.webp)


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

### 📌 功能详解
- **节点对齐**  

|**左对齐 / 右对齐 / 顶对齐 / 底对齐**|**水平居中 / 垂直居中**|**智能间距分布**|
| ---- | ---- | ---- |
|Left/Right/Top/Bottom Alignment |Horizontal/Vertical Centering |Smart Spacing Distribution |

- **节点上色**  

|**预设7色系：**红、橙、黄、绿、青、蓝、紫|**自定义取色器**|**快速清除颜色**|
| ---- | ---- | ---- |
|7 Preset Color Schemes: orange, yellow, green, cyan, blue, purple |Custom Color Picker |One-click Reset |


### 🤝 贡献指南
- 欢迎通过以下方式参与改进：  
`提交使用反馈`、`New Issue`、`改进代码逻辑`、`Fork & PR`、`完善多语言文档`、`分享创意工作流`

### 📜 许可协议
- 本项目采用 MIT License，开发思路基于`ComfyUI-Align`、`ComfyUI-NodeAligner`二次开发。  
- 主要重构了代码，并重写了UI，从而开发了`ComfyUI_EasyKitHT_NodeAlignPro`这款轻量级`ComfyUI插件`。  
- 核心功能为：`节点对齐`与`节点上色`。


👨💻 设计师业余开发项目，欢迎反馈使用问题
⚠️ 可能存在未测试场景的异常，请通过Issues报告