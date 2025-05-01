# ComfyUI_EasyKitHT_NodeAlign Pro 🎨

[![GitHub stars](https://img.shields.io/github/stars/ArtsticH/ComfyUI_EasyKitHT_NodeAlignPro?style=for-the-badge)](https://github.com/ArtsticH/ComfyUI_EasyKitHT_NodeAlignPro/stargazers)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![切换中文](https://img.shields.io/badge/切换中文-README_ZH.md-blue?style=for-the-badge)](README_ZH.md)
[![English](https://img.shields.io/badge/English-README.md-blue?style=for-the-badge)](README_ZH.md)


The newly designed ComfyUI node alignment and coloring plugin has completely redesigned and developed new UI icons and layouts. The layout of the alignment tool is more in line with the common operation logic and experience in the design industry. The position of the coloring tool is more reasonable, facilitating quick coloring.


## ✨ Core Features

| Intelligent Alignment System            | Enhanced Workflow               | 	Efficient Interaction Design             | 🔆 New UI Zoom Adaptation              |
|---------------------------|---------------------------|---------------------------|---------------------------|
| ✅ 8 Basic Alignment Modes        | 🎨 One-click Color Management Scheme      | 🖱️  Floating Tool Panel      | ✅ Added UI Zoom Button in the Right-click Menu     |
| 📐 Dynamic Spacing Distribution Algorithm        | 📏 Visual Layout Guide Lines       | ⌨️ Custom Shortcut Key Configuration       | 😁By default, clicking the "UI Zoom" button only</br>　 zooms the plugin components     |
| 👥 Multi-node Group Collaborative Operation        | 👁️ Real-time Preview of Adjustment Effects        | 💾 Layout Memory and Restoration System     | ❕Click the "UI Zoom" button with Ctrl to globally</br>　 zoom the page    |  

⚠️Note:`HT20250430-New UI Zoom Adaptation`  ((There is a slight bug causing "Incomplete display due to excessive global zoom", but "It does not affect basic usage" and will be fixed in the future. Therefore, you can currently use the basic UI zoom with confidence, that is, **directly click the "UI Zoom" button**).  

## 🖼️ Effect Demonstration

![Operation_Demonstration](HT20250501-ArtsticH_NodeAlignPro_demo.webp)  
<video src="https://player.bilibili.com/player.html?isOutside=true&aid=114426065716534&bvid=BV1V7G9z9EcU&cid=29714745695&p=1" controls="controls" width="500" height="300"></video>  
<video src="https://www.bilibili.com/video/BV1V7G9z9EcU/" controls="controls" width="500" height="300"></video>  

Function Update Records  

![UI_Linkage-button](Example/hPic/HT20250501-联动【运行按钮】_右键菜单适配_ArtsticH_NodeAlignPro.webp) 
![UI_Linkage-button-ContextMenu](Example/hPic/HT20250501-联动【运行按钮】_ArtsticH_NodeAlignPro.webp)  
![UI_Element-zoomButton](Example/hPic/HT20250430-件优化UI重绘_新增UI缩放适配_ArtsticH_NodeAlignPro.webp)  
![UI_Redrawing-Rendering](Example/hPic/HT20250429-优化UI重绘_元素_渲染_ArtsticH_NodeAlignPro.webp)     ![UI_Redrawing-Linedrawing](Example/hPic/HT20250429-优化UI重绘_元素_线稿_ArtsticH_NodeAlignPro.webp)    
![ArtsticH_Originaldesign_Line-drawing](Example/hPic/HT20250429-优化UI重绘_元素_渲染_ArtsticH_NodeAlignPro_对比.webp)  

---

## 🛠️ Installation Guide

### Manual Installation
1. [Download the Latest Release](https://github.com/ArtsticH/ComfyUI_EasyKitHT_NodeAlignPro/releases)
2. Unzip it to the `ComfyUI/custom_nodes/` directory
3. Restart the ComfyUI service

### Git Installation
```bash
git clone https://github.com/ArtsticH/ComfyUI_EasyKitHT_NodeAlignPro.git custom_nodes/ComfyUI_EasyKitHT_NodeAlignPro
```
### 🚀 Quick Start
Example Workflow Configuration (for reference only)
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

## 📌 Function Details
- **Node Alignment**  
Left/Right/Top/Bottom Alignment, Horizontal/Vertical Centering, Smart Spacing Distribution

- **Node Coloring**  
7 Preset Color Schemes: orange, yellow, green, cyan, blue, purple, Custom Color Picker, One-click Reset


## 🤝 Contribution Guide
- Welcome to participate in the improvement in the following ways:  
`Submit Usage Feedback`、`New Issue`、`Improve Code Logic`、`Fork & PR`、`Complete Multilingual Documents`、`Share Creative Workflows`

## 📜 License Agreement
- This project uses the MIT License. The development idea is based on the secondary development of[ComfyUI-NodeAligner](https://github.com/Tenney95/ComfyUI-NodeAligner) and [ComfyUI-Align](https://github.com/Moooonet/ComfyUI-Align).  
- It mainly refactored the code and rewrote the UI, thus developing the lightweight[ComfyUI_EasyKitHT_NodeAlignPro](https://github.com/Tenney95/ComfyUI-NodeAligner)named`ComfyUI plugin`.  
- The core functions are: `Node Alignment`and`Node Coloring`.

👨💻 This is a project developed by a designer in his spare time. Welcome to feedback on usage issues.
⚠️ There may be exceptions in untested scenarios. Please report them through Issues.