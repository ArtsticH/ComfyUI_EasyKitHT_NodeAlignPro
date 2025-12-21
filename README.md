# ComfyUI_EasyKitHT_NodeAlign Pro 🎨

[![GitHub stars](https://img.shields.io/github/stars/ArtsticH/ComfyUI_EasyKitHT_NodeAlignPro?style=for-the-badge)](https://github.com/ArtsticH/ComfyUI_EasyKitHT_NodeAlignPro/stargazers)  [![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)  [![切换中文](https://img.shields.io/badge/切换中文-README_ZH.md-blue?style=for-the-badge)](README_ZH.md)  [![English](https://img.shields.io/badge/English-README.md-blue?style=for-the-badge)](README_ZH.md)


Completely reconstructed ComfyUI Node Alignment and Coloring Plugin, featuring brand-new UI icons and interface interaction logic. The layout of the alignment tool is more in line with the universal operational logic and experience in the design industry, and the position of the coloring tool is more reasonable, facilitating quick coloring operations.

## 🔥<font color=#22ee00> [+] </font>The major version update is here😁↓↓↓↓
The basic code and concept were basically completed as early as June-July this year, but due to my busy schedule recently, I have put it aside for a long time and have not updated it;

<font color=#22ee00> [+] </font>I took time out to update it these two days. On the premise of retaining the UI and interaction habits of the previous version as much as possible, I redesigned the relevant UI, and basically reconstructed all the relevant logic (see the figure below👇).
![Update Preview](Example/hPic/H20251222-全新节点对齐与上色UI实操演示.png)

## ✨ Core Features (Officially Launched)

| 💫Intelligent Alignment System | <font color=#22ee00> [+]</font>💫New Coloring System | <font color=#22ee00> [+]</font>💫User-Friendly Interaction Design | <font color=#22ee00> [+]</font>💫New Color Picker (Original Design) |
|---------------------------|---------------------------|---------------------------|---------------------------|
| ✅ 8 Basic Alignment Modes | <font color=#22ee00> [+]</font>🖼️ One-Click Color Management Solution | 🖱️ Floating Tool Panel | <font color=#22ee00> [+]</font>✅ New Color Picking System Implemented with Native JS/CSS |
| 📐 Dynamic Spacing Distribution Algorithm | <font color=#22ee00> [+]</font>🔗 Real-Time Linked Display of Color Picking Effect | <font color=#22ee00> [+]</font>🧩 New Custom Configuration | <font color=#22ee00> [+]</font>🎨 Color Card Modes: Color/Gray Scale/Custom |
| 👥 Collaborative Operation of Multiple Node Groups | <font color=#22ee00> [+]</font>💾 Custom Color Card Collection and Restoration System | <font color=#22ee00> [+]</font>💾 Layout Memory and Restoration System | <font color=#22ee00> [+]</font>👏 Color Cards: Random/Collect/Remove/Manual Addition |  


## ✅ New Version Effect Demo🖼️

![Operation_Demonstration](Example/hPic/H20251222-NodeAlignPro全新节点对齐与上色插件.png)  
⚠️ Note: Regarding multiple alignment modes, you can `try Alt key + Alignment Button` to experience the `new alignment methods` in the new `easter egg feature`.

(Note: The alignment-related functions of the `new Node2.0 Beta version` are not yet stable, and there are cumulative offset issues due to various conversion errors. Reproduction: You can repeatedly enable/disable the native Node2.0 Beta switch in ComfyUI, and you will find that nodes accumulate errors, and their sizes and coordinates will continue to shift. Therefore, adaptation is temporarily not provided (although Node2.0 adaptation has been completed, the `logic for adapting to Node2.0 is temporarily removed` and `will be updated back when it is more stable`))

⚠️<font color=#22ee00> [+] </font> Note: The three major modules - `💫Brand New Coloring System`, `💫User-Friendly Interaction Design`, and `💫New Color Picker (Original Design)` - have all been refactored to varying degrees, while retaining the basic operation logic of the `v1.0.4_rc version` as much as possible. Due to being busy in daily life and developing as a hobbyist (not a professional programmer), `there may inevitably be many bugs in this hasty update`. Please help test it, and feel free to submit Issue feedback. Thank you for your support and understanding!

## ❌ Old Version Interface Comparison 

![UI_Linkage-button](Example/hPic/HT20250501-联动【运行按钮】_右键菜单适配_ArtsticH_NodeAlignPro.webp) 
![UI_Linkage-button-ContextMenu](Example/hPic/HT20250501-联动【运行按钮】_ArtsticH_NodeAlignPro.webp)  
![UI_Element-zoomButton](Example/hPic/HT20250430-件优化UI重绘_新增UI缩放适配_ArtsticH_NodeAlignPro.webp)  
![ArtsticH_Originaldesign_Line-drawing](Example/hPic/HT20250429-优化UI重绘_元素_渲染_ArtsticH_NodeAlignPro_对比.webp)  
<video src="https://player.bilibili.com/player.html?isOutside=true&aid=114426065716534&bvid=BV1V7G9z9EcU&cid=29714745695&p=1" controls="controls" width="500" height="300"></video>  
<video src="https://www.bilibili.com/video/BV1V7G9z9EcU/" controls="controls" width="500" height="300"></video>  

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
### Git update (Manual navigation to the ComfyUI_EasyKitHT_NodeAlignPro directory is required first)
```bash
git fetch --all
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