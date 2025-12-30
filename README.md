# ComfyUI_EasyKitHT_NodeAlign Pro 🎨

[![GitHub stars](https://img.shields.io/github/stars/ArtsticH/ComfyUI_EasyKitHT_NodeAlignPro?style=for-the-badge)](https://github.com/ArtsticH/ComfyUI_EasyKitHT_NodeAlignPro/stargazers)  [![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)  [![切换中文](https://img.shields.io/badge/Switch_to_Chinese-README_ZH.md-blue?style=for-the-badge)](README_ZH.md)  [![Switch to English](https://img.shields.io/badge/English-README.md-blue?style=for-the-badge)](README.md)

## 📋 Project Introduction

**ComfyUI_EasyKitHT_NodeAlignPro** is a powerful ComfyUI plugin independently developed by a designer, offering a brand-new alignment toolset and a professional node color management system. The built-in alignment tool layout follows the common operational logic and experience of the design industry. The coloring tool with multiple modes is more reasonable, and a new real-time color picker has been added for quick coloring. This plugin aims to enhance the workflow efficiency of ComfyUI users by simplifying node layout and color management through an intuitive interface and rich features.

---

## 🔥 What's New in v2.0 ?

The **New Version v2.0** has completely refactored the old v1.0.4_rc UI and underlying logic, rewritten from scratch with a brand-new UI icon set and interface interaction logic.
The foundational code and concepts were largely completed back in June-July of this year. Due to recent busy schedules, the update was delayed for quite some time. I managed to find some time recently to update it, redesigning the relevant UI while preserving as much of the previous version's interface and interaction habits as possible. Essentially, all related logic has been reconstructed (see image below).

#### ✅ New Version Demo

![NodeAlignPro_v2_UI](docs/images/h_NodeAlignPro_v2__UI.webp)
![Operation Demo](docs/images/ComfyUI_EasyKitHT_NodeAlignPro_v2.webp)
#### If you like it, please consider giving it a **⭐Star**. Your encouragement is my greatest motivation!
<details>
  <summary><b>⚠️ about ComfyUI Node 2.0...</b></summary>

⚠️ Note: Regarding the multiple alignment modes, you can ```try holding the Alt key + clicking the alignment button``` to experience the new ```Easter Egg Feature``` with its ```brand-new alignment methods```.
(Note: The alignment-related functions in the ```new Node2.0 Beta``` are currently not very stable, suffering from cumulative offset issues due to various calculation errors (Reproduction: repeatedly enabling/disabling ComfyUI's native Node2.0 Beta switch will cause nodes to accumulate errors, with sizes and coordinates constantly shifting. Therefore, compatibility is temporarily withheld (even though adaptation for Node2.0 is already done, the ```logic for Node2.0 compatibility is temporarily removed``` and will be ```updated back once it stabilizes a bit more```)))

⚠️ Note: The three major sections — ```💫 Brand-new Coloring System```, ```💫 User-friendly Interaction Design```, and ```💫 Brand-new Color Picker (Original Design)``` — have undergone varying degrees of refactoring, while尽可能 retaining the basic operation logic of the ```v1.0.4_rc version```. As development is done in spare time by a non-professional programmer, ```rushed updates may inevitably contain bugs```. We appreciate your help in testing and welcome Issue submissions for feedback. Thank you for your support and understanding!
</details>

<details>
  <summary><b>⚠️ Legacy v1.0.4_rc UI...</b></summary>

**Legacy v1.0.4_rc**: Only provided basic node alignment tools and fixed coloring tools:
![NodeAlignPro_v2_UI](docs/images/h_NodeAlignPro_v1__UI.webp) 

</details>

## ✨ Core Features (Officially Released)

| 💫 Intelligent Alignment System | 💫 Brand-new Coloring System | 💫 User-friendly Interaction Design | 💫 Brand-new Color Picker (Original Design) |
|---------------------------|---------------------------|---------------------------|---------------------------|
| ✅ Multiple Alignment Modes | 🖼️ One-click Color Management | 🖱️ Floating Tool Panel | ✅ Native JS/CSS New Color Picking System |
| 📐 Dynamic Spacing Distribution Algorithm | 🔗 Real-time Linked Color Preview | 🧩 New Custom Configuration | 🎨 Color Palette Modes: Color/Grayscale/Custom |
| 👥 Multi-Node Group Coordination | 💾 Custom Palette Saving & Restoring System | 💾 Layout Memory & Restore System | 👏 Palette: Random/Favorite/Remove/Manual Add |

### 🎨 Color Management Module
- **Two Coloring Modes**: Title-only / Full-node 【v2.0.3_rc New】
- **Seven Preset Colors**: Quickly apply standard colors to selected nodes.
- **Grayscale Palette**: Hold the **Shift key** to switch to grayscale color mode. 【v2.0.1_rc New】
- **Custom Palette**: Hold the **Alt key** to enter custom color mode. 【v2.0.1_rc New】
- **Color Favorites**: Use **Ctrl+Alt combo** to lock/unlock custom colors. 【v2.0.1_rc New】
- **Random Color**: Click the random color button for a random color. 【v2.0.1_rc New】
- **Super Random Colors**: Press **Alt key** + **Random Color Button** to generate 7 random colors at once and apply them in real-time to selected nodes. 【v2.0.2_rc New】
- **Smart Color Picker**: Built-in **HSB/RGB real-time color picker** adapted for ComfyUI nodes. 【v2.0.2_rc New】 (Zero dependencies, pure native JS+CSS development & design.)
- **Real-time Node Color Preview**: Real-time preview of color effects applied to nodes. 【v2.0.2_rc New】 (Zero dependencies, pure native JS+CSS development & design.)

### 🔧 Node Alignment Tools
- **Basic Alignment**: Left align, Right align, Top align, Bottom align.
- **Center Distribution**: Vertical center and Horizontal center.
- **Even Spacing**: Horizontal even distribution and Vertical even distribution.
- **Uniform Sizing**: Equal width and Equal height adjustment.
- **Smart Mode**: Press **Alt key** + click corresponding **Alignment Button** for reverse reference alignment. 【v2.0.2_rc New】

### 🎯 Advanced Features
- **Draggable Container**: Freely draggable and scalable operation panel.
- **Linkage Mode**: Position linked with ComfyUI's Run button.
- **Display Mode**: Always visible or auto-show upon selection.
- **Right-click Menu**: Rich settings options and quick actions.
- **Node Selection**: Multiple selection tools and Magic Wand functionality. *(In development and debugging...)*
- **Rename Tool**: Batch rename nodes functionality. *(In development and debugging...)*

---

## 🚀 Installation Methods

### Method 1: Git Clone (Recommended)
```
cd ComfyUI/custom_nodes
git clone https://github.com/ArtsticH/ComfyUI_EasyKitHT_NodeAlignPro.git
```

### Method 2: Manual Installation
1. Open the project address: https://github.com/ArtsticH/ComfyUI_EasyKitHT_NodeAlignPro
2. Download the plugin ZIP (```<>Code``` > ```Download ZIP```).
3. Extract to the ```ComfyUI/custom_nodes``` directory (Ensure correct directory hierarchy: ```ComfyUI/custom_nodes/ComfyUI_EasyKitHT_NodeAlignPro```).
4. Restart ComfyUI.

### Method 3: ComfyUI Manager
1. Search for "NodeAlignPro" in the ComfyUI Manager (if not installed, install ComfyUI Manager first).
2. Find ```ComfyUI_EasyKitHT_NodeAlignPro```, click Install.
3. Restart ComfyUI.

### Supplementary: Git Update (First navigate to the ComfyUI_EasyKitHT_NodeAlignPro directory manually)
```
git fetch --all
```

---

### 🚀 Quick Start (Brief Guide)
After successfully installing NodeAlignPro, basic operations (for reference).

1. **Node Coloring**: In ComfyUI, select any node > Click any **color button** in the NodeAlignPro panel (hereafter NAP panel) (🔴🟠🟡🟢🔵🟣🟤, ```Clear Color```, ```Color Picker```, ```Random Color```).
2. **Custom Color**: Select any node > Click the **color picker button** in the NAP panel.
3. **Node Alignment**: Select any node > Click any **alignment button** in the NAP panel.
4. **Reverse Alignment**: Select any node > Press **Alt key** + click the corresponding **alignment button** for reverse reference alignment.
    └ Example: ```Left Align``` → Select multiple nodes > Press ```Alt key``` + ```Left Align Button```, then alignment uses the ```rightmost node``` as the ```reference``` for ```left alignment``` (Default left alignment uses the leftmost node as reference).
5. **Dragging the NAP Panel**: Without selecting any node > Click the buttons on the left/right sides of the NAP panel, a four-way arrow cursor (↕↔) appears, then drag.
6. **Reset Settings**: Without selecting any node > In the NAP panel > 【Mouse Right-click】 > 【One-click Reset】.
7. **Advanced Techniques**: Please refer to the **User Guide** below 👇.

<details>
  <summary><b>🖥️ User Guide...</b></summary>

### Basic Operations
1. **Start Plugin**: The plugin loads automatically after ComfyUI starts.
2. **Show/Hide**: Control visibility via right-click menu or hotkeys.
3. **Drag to Move**: Drag the title bar or separator line to move the panel.
4. **Scale Adjustment**: Adjust UI scaling via the right-click menu.

### Color Mode Switching
| Key Combination | Mode Description | Function Description |
|---------|---------|---------|
| **No Key** | Default Mode | Seven preset colors |
| **Shift** | Grayscale Mode | Black/white/gray series colors |
| **Alt** | Custom Mode | Custom color management |
| **Ctrl+Alt** | Lock Mode | Lock/Unlock custom colors |

### Alignment Operations
1. Select 2 or more nodes on the ComfyUI canvas.
2. Click the corresponding button on the alignment panel:
   - **Left Align**: Align all nodes to the left.
   - **Vertical Center**: Vertically center all nodes.
   - **Right Align**: Align all nodes to the right.
   - **Top Align**: Align all nodes to the top.
   - **Horizontal Center**: Horizontally center all nodes.
   - **Bottom Align**: Align all nodes to the bottom.

### Advanced Techniques
- **Alt + Alignment Button**: Use "reverse reference" for alignment.
- **Double-click Color Picker Preview**: Toggle between whole node / title-only coloring mode.
- **Right-click Menu**: Access full settings and reset functions.
- **Container Linkage**: Link the operation panel position with the Run button.

</details>

## 🐛 Frequently Asked Questions

   - **Q: What if the plugin doesn't show up?** →A: Check if installed correctly in the custom_nodes directory, restart ComfyUI, check the browser console for errors.  Advanced users can also enter the following command directly in the console:
   ```
   // Clear NodeAlignPro plugin-related data and force a reload
clear();const keysToRemove = ['NodeAlignProPosition', 'NodeAlignProRunButtonLink'];keysToRemove.forEach(key => localStorage.removeItem(key));console.log('NodeAlignPro has been reloaded');window.location.reload(true);
   ```

   - **Q: Colors cannot be applied to nodes?** →A: Ensure nodes are selected, check if nodes are locked, try refreshing the page.
   - **Q: Alignment function doesn't work?** →A: Ensure 2 or more nodes are selected, check node selection status, try clearing selection and reselecting.
   - **Q: How to reset all settings?** →A: Right-click menu → "One-click Reset", or clear browser localStorage.
   - **Q: How to display plugin operation logs?** →A: Execute the following console command: ``` document.getElementById('hDebugInfo_V2')?.style.setProperty('display', 'block', 'important'); ```

---

## ⚙️ Technical Features

### Architecture Design
- **🌐 Native Development**: Implemented from scratch using only native JS+CSS.
- **🔒 Zero Dependencies**: No reliance on any third-party frameworks/libraries or existing code snippets.<small  style="color:#999"> (Only imports the necessary Python built-in OS module in __init__.py) </small>
- **📴 Fully Offline Operation**: Runs entirely locally, no dependence on any network resources, ensuring security and reliability for local private deployment.
- **📄 Single File Characteristic**: Centralized development in a single file. While slightly lengthy overall, it facilitates centralized management and debugging/maintenance.<small  style="color:#999"> (Even using Windows Notepad; in fact, many minor adjustments were tested by tweaking directly with Notepad.) </small>
- **🧩 Modular Design**: Separation of color, alignment, and UI controllers.<small  style="color:#999"> (Achieves module separation on a single-file basis, facilitating future development to some extent.) </small>
- **🏷️ Standardized Naming**: Customized a personal naming style for clear distinction.
- **💻 Responsive Layout**: Adapts to different screen resolutions.
- **⚡ Performance Optimization**: Throttling and debouncing in necessary sections.
- **💾 State Persistence**: Saves user settings to local storage.
- **✅ Truly Open Source / No Obfuscation**: Complete retention of necessary comments and variable/parameter names, no code obfuscation for pseudo-open source.

### Color System
- **HSB/RGB/HEX**: Full color space support.
- **Real-time Preview**: Node SVG preview updates in real-time.
- **Intelligent Distribution**: Multi-node color intelligent distribution algorithm.
- **CSS Variables**: Unified theme color management.

### UI Components
- **Draggable Container**: Supports boundary detection and elastic bounce-back.
- **Dropdown Menu**: Smooth animations and hover interactions.
- **Slider Control**: Precise color value adjustment.
- **Icon System**: SVG vector icon rendering.


<details>
  <summary><b>🖥️ Display Settings...</b></summary>

```
// Display Mode
- Always Show: Operation panel always visible.
- Follow Selection: Auto-show when 2 or more nodes are selected.

// UI Scaling
- 0.5x, 0.75x, 1x, 1.25x, 1.5x, 2x
```

</details>

<details>
  <summary><b>📁Modes Settings...</b></summary>

```
// Drag Method
- Decoupled: Independent dragging of operation panel.
- Linked: Position linked with the Run button.

// Working Mode
- Alignment Mode: Basic alignment functions.
- Professional Mode: Advanced selection tools.
```

</details>

<details>
  <summary><b>📁 File Structure of NodeAlignPro...</b></summary>

```
ComfyUI_EasyKitHT_NodeAlignPro/
├── __init__.py
├── README.md            # English Documentation
├── README_ZH.md         # 中文说明文档
├── LICENSE              # License File
├── pyproject.toml
└── ArtsticH/            # Project Files
    ├── hNodeAlignPro.js   # Main Program File
└── Example/
    ├── NodeAlignPro_demo.json  # Test Workflow
    └── NodeAlignPro_demo.png   # Example Image (contains test workflow)
```

</details>

## 🔄 Changelog
### v2.0.3_rc (Latest Release)
- Refactored color conversion logic
- Refactored screen color picker functionality
- Revised and improved the README documentation
- Fixed various bugs


<details>
  <summary><b>📄 Release History...</b></summary>

##### v2.0.2_rc (2025-12-22)
- Improve UI prompts for the new version (v2.0.3_rc)
- Fix several bugs
- Rewrite MD tutorial documentation (Chinese-English bilingual)

##### v2.0.1_rc (2025-12-24Latest Release) [v2.0 Release]
- Added Shift/Alt/Ctrl combo key modes.
- Improved color picker performance and stability.
- Added node preview functionality.
- Optimized UI interaction experience.

##### v1.0.4_rc (2025-08-14)
##### v1.0.3_rc (2025-05-01)
##### v1.0.2_rc (2025-04-30)
##### v1.0.1_rc (2025-04-29) [v1.0 Release]
- Initial release version.
- Complete alignment and color functions.
- Draggable container system.
- Integrated color picker tool.

</details>
<details>
  <summary><b>📄 Release History...</b></summary>

```
v2.0.2_rc   8a12160: 🔥NodeAlignPro Major Version Update, Optimized File Structure (New UI, More Complete Node Coloring System)→See readme for details.
----------------
v2.0.1_rc   dd2a09f: 🔥NodeAlignPro Major Version Update Released (New UI, More Complete Node Coloring System)
d90bd02: 🔥Update Preview (A Major Update for the Upcoming Version 😁)→See README for details.
----------------
v1.0.4_rc   b77a9d7: FIX README, ht History Optimization.
----------------
v1.0.3_rc   a62e3a6: Fix the ui scaling adaptation issue, The interlocking control function has been newly added.
d067502: remove res, add hPic, FIX README,FIX README_ZH.md
----------------
v1.0.2_rc   b11f325: upload README
cb93ffa-461032d: README Modifications
4e60dc2: Fixed REEADME, Rename some img, Add README_ZH.md
fac4c81: UPLoad README , Create README_ZH.md
9f1839e: README Modifications - Added UI Scaling Adaptation
ef5735d: Added UI Scaling, Fixed issue where old version color removal didn't work.
8ac01db: Added Main Features: Alignment Distribution, Node Coloring. Fixed Readme image display issues.
----------------
v1.0.1_rc   2926b82: README Modifications
10749c7: ComfyUI_EasyKitHT_NodeAlignPro is a newly developed ComfyUI node alignment plugin and node coloring plugin.
    New visual UI, relatively more aligned with the common operational logic of designers.
    Aiming to provide a relatively aesthetic user experience for everyone.
    Added main features: Alignment distribution, Node coloring.
----------------
ca28236: Initial commit
----------------
# @Artstich_Example
# @name         ComfyUI_EasyKitHT_NodeAlignPro (ComfyUI Plugin)
# @description  ComfyUI_EasyKitHT_NodeAlignPro is a lightweight ComfyUI node alignment and node coloring tool
#               for refactoring and rewriting the UI based on the open-source projects Comfyui-Align and Comfyui-Nodealigner.
# @author Artstich  @date 2025-06-15  @version v2.0.2_rc  @license GPL-3.0
# @see https://github.com/ArtsticH/ComfyUI_EasyKitHT_NodeAlignPro
```

</details>
## 🤝 Contribution Guidelines

- Welcome participation through the following ways:
```Submit usage feedback```, ```New Issue```, ```Improve code logic```, ```Fork & PR```, ```Improve multilingual documentation```, ```Share your creative node layouts```, ```Share your custom color palettes```

## 📜 License

   - This project is licensed under the **GPL-3.0** License. For details, please see the [LICENSE](LICENSE) file.

## 👥 Contributors

- [ArtsticH](https://github.com/ArtsticH) - Project creator and main developer.
- ISISUES: [@JGDMGJAPT](https://github.com/jgdmgjapt) 、[@MAOMAOCHONGNE](https://github.com/MAOMAOCHONGNE)、[@aimposer](https://github.com/ArtsticH/ComfyUI_EasyKitHT_NodeAlignPro/issues/3)、[@Rock-suv](https://github.com/ArtsticH/ComfyUI_EasyKitHT_NodeAlignPro/issues/4)...
- Thanks to all designers, developers, testers, ComfyUI users, and feedback providers who helped.

## 🌐 Related Links

- [GitHub Repository](https://github.com/ArtsticH/ComfyUI_EasyKitHT_NodeAlignPro) | [Issue Feedback](https://github.com/ArtsticH/ComfyUI_EasyKitHT_NodeAlignPro/issues) | [ComfyUI Community](https://github.com/comfyanonymous/ComfyUI) | [ComfyUI-Manager](https://github.com/Comfy-Org/ComfyUI-Manager/tree/main)
- Author's video tutorial link: https://www.bilibili.com/video/BV1V7G9z9EcU (This link is for the `v1.0.4_rc` old version tutorial; v2.0.2_rc new version tutorial待录制)

---

👨💻 The first small project developed by a designer in spare time. Welcome to report usage issues.
⚠️ There may be untested scenarios causing anomalies. Please report via Issues. (If you like it, please consider giving it a **Star⭐**. Your encouragement is my greatest motivation!) Welcome interested friends to join!

<small  style="color:#999">This document was last updated: 2025-12-24 01:51 @[ArtsticH](https://github.com/ArtsticH/ComfyUI_EasyKitHT_NodeAlignPro)·2025</small>