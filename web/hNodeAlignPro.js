/**
 * @Artstich_Example
 * @name         ComfyUI_EasyKitHT_NodeAlignPro (ComfyUI Plugin)
 * @description  ComfyUI_EasyKitHT_NodeAlignPro is a lightweight ComfyUI node alignment and node coloring tool for refactoring and rewriting the UI based on the open-source projects Comfyui-Align and Comfyui-Nodealigner.
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

(function () {
    'use strict';

    // 针对旧版本或分叉环境中缺失辅助函数的安全回退处理
    if (typeof addInputEventListeners === 'undefined') {
        // 使用显式的 window 对象赋值，避免块级作用域的函数声明问题
        window.addInputEventListeners = function () {
            try {
                // 若存在 inputManager 对象，则尝试调用其附加/更新方法
                if (typeof inputManager !== 'undefined' && inputManager && typeof inputManager.updateAllInputs === 'function') {
                    inputManager.updateAllInputs();
                } else if (typeof window.inputManager !== 'undefined' && window.inputManager && typeof window.inputManager.updateAllInputs === 'function') {
                    window.inputManager.updateAllInputs();
                } else {
                    // No-op空操作：保持向后兼容性
                    // console.debug('addInputEventListeners 回退函数：未找到 inputManager');
                }
            } catch (e) {
                console.warn('addInputEventListeners fallback failed:', e);
            }
        };
    }

    // 【== CSS 样式注入 ==】
    const styles = `
.hCMP-SwitchInput, .hAlign-label, .hAlignBtn_Group3, #h0__hApBar0_apBall, #hNAP-Title, #hApBar4__ProH, #hApBar4__ProH__Rename { display: none !important; }
:root {
    /* ↓↓↓全局核心颜色定义，不得修改↓↓↓ */
    --hC_Bg: 24, 24, 27;    /* 原#18181B，基础RGB值 */
    --hC_Bg95: rgba(var(--hC_Bg), 0.95);    /* 基于hC_Bg：#18181B的95%透明度版本 */
    --hC_Border: 61, 61, 67;    /* 原#3D3D43 */
    --hC_hMenu: var(--hC_Border); /* 原#3D3D43 */
    --hC_hBtn_Std: 32, 32, 36;    /* 原#202024 */
    --hC_hBtn_Hover: rgba(var(--hC_BW1_Black), 0.5);    /* 鼠标悬停底色 */
    --hC_hBtn1_Highlight: 55, 55, 126;    /* 原#37377E */
    --hC_hBtn2_Warning: 69, 30, 30;    /* 原#451E1E */
    --hC_hBtn3_WarningHover: 90, 42, 42;    /* 原rgb(90, 42, 42) */
    --hC_hBtn_svg: 107, 107, 112;    /* 原#6B6B70 */
    --hC_hBtn_svg_B: rgb(var(--hC_BW4_Gray));    /* 深色图标，用于浅色背景 */
    --hC_hBtn_svg_W: rgb(var(--hC_BW6_BrightGray));    /* 浅色图标，用于深色背景 */
    --hC_hBarDivider: 39, 39, 43;    /* #27272B */
    --hC_ComfyUIACBar: 112, 163, 243;    /* 原#70A3F3 */

    --hC1_Red: 128, 38, 38;    /* 原#802626 */
    --hC2_Orange: 133, 64, 31;    /* 原#85401F */
    --hC3_Yellow: 130, 93, 30;    /* 原#825D1E */
    --hC4_Green: 37, 87, 37;    /* 原#255725 */
    --hC5_Cyan: 42, 87, 86;    /* 原#2A5756 */
    --hC6_Blue: 28, 78, 105;    /* 原#1C4E69 */
    --hC7_Purple: 55, 55, 125;    /* 原#37377D */

    --hC_BW1_Black: 0, 0, 0;    /* 原#000000 */
    --hC_BW2_DarkGray: 13, 13, 13;    /* 原#0D0D0D */
    --hC_BW3_DeepGray: 26, 26, 26;    /* 原#1A1A1A */
    --hC_BW4_Gray: 38, 38, 38;    /* 原#262626 */
    --hC_BW5_LightGray: 77, 77, 77;    /* 原#4D4D4D */
    --hC_BW6_BrightGray: 204, 204, 204;    /* 原#CCCCCC */
    --hC_BW7_White: 255, 255, 255;    /* 原#FFFFFF */
    /* ↑↑↑全局核心颜色定义，不得修改↑↑↑ */
    
    /* 取色器相关变量 */
    --hC_CPr0__PurpleStd: var(--hC_hBtn1_Highlight);   /* 取色器主色，原#37377e，等效于--hC_hBtn1_Highlight */
    --hC_CPr1__bgDark: 30, 30, 30;       /* 原#1e1e1e，未被引用可移除，已统一引用--hC_Bg */
    --hC_CPr2__bgDarker: 21, 21, 21;     /* 原#151515，未被引用可移除，已统一引用--hC_Bg */
    --hC_CPr3__bgLight: 37, 37, 37;      /* 原#252525，未被引用可移除，已统一引用--hC_BW4_Gray */
    --hC_CPr4__border: --hC_Border;       /* 原51, 51, 51 #333，等效于--hC_Border */
    --hC_CPr5__hNodeDot: 102, 102, 102;  /* 原#666，节点圆点色 */
    --hC_CPr6__hNodeText: 224, 224, 224; /* 原#e0e0e0，节点文本色 */
    --hC_CPr7__hNodeIMG: 100, 181, 246;  /* 原#64b5f6，节点输出色 */
    --hC_CPr8__hNodeLaten: 255, 156, 249;/* 原#ff9cf9，节点输入色 */
    --hC_CPr9__hNodeVAE: 255, 110, 110;  /* 原#ff6e6e，节点输入色 */

    /* 【h彩虹色】基础颜色变量 */
    --hC_Rb01__hR__: #ff0000;
    --hC_Rb02__Orange: #ff9900;
    --hC_Rb03__hYY: #cdff00;
    --hC_Rb04__hG__: #35ff00;
    --hC_Rb05__hG2__: #00ff66;
    --hC_Rb06__hCC: #00ffcc;
    --hC_Rb07__hCC2: #00ccff;
    --hC_Rb08__hB__: #0066ff;
    --hC_Rb09__hB2__: #3300ff;
    --hC_Rb10__Purple: #cc00ff;
    --hC_Rb11__hMM: #ff0099;
    --hC_Rb12__hR__: #ff0000;
    --hC__RbList: #ff0000, #ff9900, #cdff00, #35ff00, #00ff66, #00ffcc, #00ccff, #0066ff, #3300ff, #cc00ff, #ff0099, #ff0000;
    --hC_Rb__Bottom: linear-gradient(to bottom, var(--hC__RbList));
    --hC_Rb__Left: linear-gradient(to left, var(--hC__RbList));
    --hC_Rb__Right: linear-gradient(to right, var(--hC__RbList));
    --hC_Rb__Top: linear-gradient(to top, var(--hC__RbList));

    /* 标准尺寸变量 - 以h32为基准 */
    --h32: 32px;
    --h2: calc(var(--h32) / 16);
    --h3: calc(var(--h32) * 0.09375);
    --h4: calc(var(--h32) / 8);
    --h6: calc(var(--h32) * 0.1875);
    --h8: calc(var(--h32) / 4);
    --h10: calc(var(--h32) / 3.2);
    --h12: calc(var(--h32) * 0.375);
    --h14: calc(var(--h32) * 0.4375);
    --h15: calc(var(--h32) * 0.46875);
    --h16: calc(var(--h32) / 2);
    --h18: calc(var(--h32) * 0.5625);
    --h20: calc(var(--h32) * 0.625);
    --h22: calc(var(--h32) * 0.6875);
    --h24: calc(var(--h32) * 0.75);
    --h26: calc(var(--h32) * 0.8125);
    --h30: calc(var(--h32) * 0.9375);
    --h36: calc(var(--h32) * 1.125);
    --h40: calc(var(--h32) * 1.25);
    --h48: calc(var(--h32) * 1.5);
    --h50: calc(var(--h32) * 1.5625);
    --h58: calc(var(--h32) * 1.8125);
    --h64: calc(var(--h32) * 2);
    --h72: calc(var(--h32) * 2.25);
    --h80: calc(var(--h32) * 2.5);
    --h82: calc(var(--h32) * 2.5625);
    --h96: calc(var(--h32) * 3);
    --h108: calc(var(--h32) * 3.375);
    --h128: calc(var(--h32) * 4);
    --h136: calc(var(--h32) * 4.25);
    --h140: calc(var(--h32) * 4.375);
    --h144: calc(var(--h32) * 4.5);
    --h220: calc(var(--h32) * 6.875);
    --h256: calc(var(--h32) * 8);
    --h288: calc(var(--h32) * 9);
    --h384: calc(var(--h32) * 12);
    --h512: calc(var(--h32) * 16);
    
    /* 尺寸变量 */
    --border-radius: var(--h4);
    --border-width: 1px;
    --title-bar-radius: var(--h6);

    --node-title-height: var(--h40);
    --node-main-height: var(--h80);
    --palette-size: var(--h220);
    --palette-bar-size: var(--h24);
    --hSlider-width: var(--h128);
    --slider-width: var(--h12);
    --slider-height: var(--palette-size);
    --slider-bar-width: var(--h24);
    --slider-bar-height: var(--h12);
    --hsb-height: var(--h8);
    --hsb-bar-width: var(--h8);
    --hsb-bar-height: var(--h16);
    --slider-spacing: var(--h8);
    --hColorPicker__hCPr-width: var(--h384);
    
    /* 动画与交互变量 */
    --hTrans3: 0.3s; 
    --btn-hover-scale: 1.2;
    --rotate-in-duration: 0.35s;
    --rotate-out-duration: 0.25s;
    --rotate-in-angle: 75deg;
    --easing-standard: cubic-bezier(0.34, 1.56, 0.64, 1);
    --easing-out: cubic-bezier(0.22, 1, 0.36, 1);
    .hDebugInfo { display: none; position: fixed; top: -40px; left: 0px; background: rgba(0,0,0,0.7); color: rgb(var(--hC_hBtn_svg)); padding: 8px; border-radius: 8px; font-size: 12px; font-family: monospace; z-index: calc(var(--hZindex) + 10010); }
    .hDebugInfo_V2 { display: none !important; position: fixed !important; top: var(--h108) !important; left: var(--h64) !important; color: rgb(var(--hC_hBtn_svg)) !important; padding: var(--h8) !important; border-radius: var(--h8) !important; font-size: var(--h12) !important; font-family: monospace !important; z-index: var(--h512) !important; transform: none !important; box-sizing: border-box !important; pointer-events: auto !important; will-change: transform !important; isolation: isolate !important; }

    /* Z-index 层级管理 */
    --hZindex: 10001;
    --hZindex__h1__hApBar1_Color: calc(var(--hZindex) + 99);
    --hZindex__h2__hNodeAlignPro: calc(var(--hZindex) + 199);
    --hZindex__hNAP-Title: calc(var(--hZindex) + 3999);
    --hZindex__hApBar2__Align: calc(var(--hZindex) + 999);
    --hZindex__hApBar4__ProH: calc(var(--hZindex) + 1399);
    --hZindex__hApBar4__ProH__Rename: calc(var(--hZindex) + 1799);
    --hZindex__hColorPicker: calc(var(--hZindex) + 3799);
    --hZindex__h6__hMenu: calc(var(--hZindex) + 5999);
    --hZindex__hMenuDropdown: calc(var(--hZindex) + 6000);
    --hZindex__dragging: calc(var(--hZindex) + 10000);
    --hColorPicker__font-size: 8pt;
    
    /* 滑块样式变量 */
    --slider-bg: rgb(var(--hC_Border));
    --slider-handle-bg: rgb(var(--hC_BW6_BrightGray));
    --slider-handle-border: 0px solid rgb(var(--hC_BW7_White));
    --slider-handle-shadow: 0 0 3px rgba(var(--hC_BW1_Black), 0.8);
    --slider-handle-active-bg: rgb(var(--hC_BW7_White));
    --slider-handle-active-size: 14px;
}

.hCMP-SwitchInput, .hAlign-label, .hAlignBtn_Group3,
#h0__hApBar0_apBall, #hNAP-Title, #hApBar4__ProH, #hApBar4__ProH__Rename { display: none !important; }

#hApBar2__Align, #hApBar4__ProH, #hApBar4__ProH__Rename, #h6__hMenu { padding: 0 var(--h8) !important; }
#hNodeAlignKit, #h0__hApBar0_apBall, #h1__hApBar1_Color, #hNAP-Title,
#hNAP-Title__LOGO, #hNAP-Title__Content, #hNAP-Title__Content-Text, #hNAP-Title__Content-ModeSwitch,#hNAP-Title__Context, #hNAP-Title__MenuA,
.hBtnC, .hInput { box-sizing: border-box; }
#hNAP-Title, #hBarMove, #hNAP-Title__LOGOAlign, .hBarDivider, .hCPr__header { cursor: move; }
#h0__hApBar0_apBall, #hNAP-Title__LOGO, #hNAP-Title__Content-ModeSwitch, #hNAP-Title__MenuA,
.hBtnC, .hBtn, .hMenu-btn, .hCMP-hSel__option {cursor: pointer; }

#hNodeAlignKit { z-index: var(--hZindex); position: fixed; margin: 0; border: none; background: none; box-sizing: border-box; }
#h0__hApBar0_apBall { display: flex; width: var(--h32); height: var(--h32); border: none; border-radius: var(--h32); background: rgb(var(--hC_hBtn1_Highlight)); box-sizing: border-box; transition: all var(--hTrans3) ease; align-items: center; justify-content: center; cursor: pointer; position: relative; }
#h0__hApBar0_apBall:hover { background-color: var(--hC_hBtn_Hover); }
#h0__hApBar0_apBall.active {
    width: var(--h64); height: var(--h64); border-radius: var(--h32); background-color: var(--hC_Bg95); border: 2px solid rgb(var(--hC_Border)); z-index: 1001;
    box-shadow: 0 0 var(--h5) rgba(100, 100, 255, 0.5), 0 0 var(--h10) rgba(100, 100, 255, 0.3), 0 0 var(--h15) rgba(100, 100, 255, 0.1);
    animation: breathe 3s infinite ease-in-out;
}
@keyframes breathe {
    0%, 100% {box-shadow: 0 0 5px rgba(100, 100, 255, 0.5), 0 0 10px rgba(100, 100, 255, 0.3), 0 0 15px rgba(100, 100, 255, 0.1);}
    50% {box-shadow: 0 0 10px rgba(100, 100, 255, 0.7), 0 0 20px rgba(100, 100, 255, 0.5), 0 0 30px rgba(100, 100, 255, 0.3);}
}

#h0__hApBar0_apBall #hBtnY_barLOGO { transition: all 0.3s ease; width: 100%; height: 100%; }
#h0__hApBar0_apBall.active #hBtnY_barLOGO { filter: invert(23%) sepia(61%) saturate(1291%) hue-rotate(215deg) brightness(94%) contrast(92%); transition: filter 0.3s ease, width 0.3s ease, height 0.3s ease; width: 52px; height: 52px; }
#h0__hApBar0_apBall #hBtnY_barLOGO { transition: width 0.3s ease, height 0.3s ease; }
#hIcon #hBtnY_barLOGO { width: var(--h48); height: var(--h48); }
#h1__hApBar1_Color { position: relative; display: flex; align-items: center; background-color: transparent; padding: var(--h10); border-radius: var(--h12); border: none; box-sizing: border-box; }
.hBtnC { width: var(--h24); height: var(--h24); padding: 0; border: none; background: none; cursor: pointer; border-radius: 50%; position: relative; transition: all var(--hTrans3) var(--easing-standard); box-sizing: border-box; margin: 0 var(--h2); }

#hClear, #hPick, #hRandom, #hZoom { border-radius: 50% !important; overflow: hidden !important; }
#hClear:hover, #hPick:hover, #hRandom:hover, #hZoom:hover { border-radius: 50% !important; overflow: hidden !important; }
#hClear .hIcon, #hPick .hIcon, #hRandom .hIcon, #hZoom .hIcon { border-radius: 0 !important; overflow: visible !important; }
.hBtnC_7c { border: 1px solid rgb(var(--hC_BW2_DarkGray)); background: rgb(var(--hC_BW1_Black)); }
.hBtnC:hover { transform: scale(var(--btn-hover-scale)); background: rgb(var(--hC_BW1_Black)); box-shadow: 0 0 5px rgba(var(--hC_Border), 0.7); }
.hBtnC_7c:hover { border: 1px solid rgb(var(--hC_BW2_DarkGray)); }
.hIconC { width: 100%; height: 100%; display: block; }
.hIcon { width: 100%; height: 100%; object-fit: contain; pointer-events: none; }

#hClear, #hPick, #hRandom { background-color: rgb(var(--hC_BW1_Black)); }
.hColorA_Clear__Slash { fill: rgb(var(--hC1_Red)); }
#hColorA_Clear, #hColorB_Pick, #hColorC_Random { transition: transform var(--hTrans3) var(--easing-standard); }
#hClear:hover, #hPick:hover, #hRandom:hover, #hZoom:hover { transform: scale(var(--btn-hover-scale)) rotate(var(--rotate-in-angle)); animation: rotateIn var(--rotate-in-duration) var(--easing-out); }
#hClear:not(:hover), #hPick:not(:hover), #hRandom:not(:hover), #hZoom:not(:hover) { animation: rotateOut var(--rotate-out-duration) var(--easing-standard); }

@keyframes rotateIn { 0% { transform: rotate(0deg) scale(var(--btn-hover-scale)); } 100% { transform: rotate(var(--rotate-in-angle)) scale(var(--btn-hover-scale)); } }
@keyframes rotateOut { 0% { transform: rotate(var(--rotate-in-angle)) scale(1); } 100% { transform: rotate(0deg) scale(1); } }
.custom-color-btn { position: relative; }
.love-icon-container { position: absolute; top: 54%; left: 50%; width: 50%; height: 50%; transform: translate(-50%, -50%); z-index: 1; display: flex; align-items: center; justify-content: center; }

.love-icon-container svg { width: 100%; height: 100%; }
.hBtnC.disabled-state { opacity: 0.5 !important; pointer-events: none !important; cursor: not-allowed !important; }
#hClear.disabled-state, #hPick.disabled-state, #hRandom.disabled-state { transform: none !important; animation: none !important; }
.hBtn_svg { fill: currentColor; }
#hNAP-Title { display: flex; align-items: center; height: var(--h24); padding: 0 var(--h8); margin: 0; background-color: rgb(var(--hC_hBtn_Std)); border: none; border-top-left-radius: var(--title-bar-radius); border-top-right-radius: var(--title-bar-radius); box-sizing: border-box; cursor: move; }
#hNAP-Title__LOGO { width: var(--h22); height: var(--h22); padding: 0; margin: 0 var(--h4); border: none; background: none; cursor: pointer; box-sizing: border-box; }
#hNAP-Title__Content { display: flex; align-items: center; width: 264px; height: 24px; padding: 0; margin: 0; background: none; border: none; box-sizing: border-box; }
#hNAP-Title__Content-Text { padding: 0; margin: 0; color: rgb(var(--hC_hBtn_svg)); font-size: var(--h16); text-align: left; white-space: nowrap; width: auto; box-sizing: border-box; }
#hNAP-Title__Content-ModeSwitch { width: var(--h16); height: var(--h16); padding: 0; margin: 0 var(--h4); border: none; background: var(--hC_hBtn2_Warning); cursor: pointer; box-sizing: border-box; }
#hNAP-Title__Context { height: var(--h16); padding: 0 var(--h8); margin: 0 var(--h4); background-color: var(--hC_Bg95); border: none; border-radius: var(--border-radius); color: rgba(var(--hC_hBtn_svg), 0.5); font-size: 10px; text-align: right; white-space: nowrap; width: 100%; box-sizing: border-box; flex: 1; }
#hNAP-Title__MenuA { width: var(--h32); height: var(--h22); padding: 0; margin: 0 var(--h4); border: none; background: none; cursor: pointer; box-sizing: border-box; }

#hIcon__MenuA { width: var(--h32); height: var(--h22); background: rgb(var(--hC_hBtn_Std)); }
#h2__hNodeAlignPro { z-index: var(--hZindex__h2__hNodeAlignPro); padding: 0; margin: 0; border: 1px solid rgb(var(--hC_Border)); border-radius: var(--h8); background: none; background: var(--hC_Bg95); }
#hApBar2__Align { z-index: var(--hZindex__hApBar2__Align); display: flex; align-items: center; }
#hApBar4__ProH { display: flex; align-items: center; }
#hApBar4__ProH__Rename { display: flex; align-items: center; }

[class^="hAlignBtn_Group"], [class^="hSelectBtn_Group"] { display: flex; align-items: center; gap: 0px; padding: 0; }
.hBtn { width: var(--h32); height: var(--h32); padding: 0; border: none; border-radius: var(--border-radius); background: none; cursor: pointer; transition: background-color 0.2s ease; }

.hBtn:hover { background-color: var(--hC_hBtn_Hover); }
.hAlign-label { width: var(--h40); color: rgb(var(--hC_hBtn_svg)); font-size: calc(var(--h32)-4); }
.hAlign-label2 { width: calc(var(--h32)+2); color: rgb(var(--hC_hBtn_svg)); font-size: calc(var(--h32)-4); }
#hBtn-DispMode__hAlways { width: var(--h48); height: var(--h32); border: none; background: rgb(var(--hC_hBtn1_Highlight)); }

.hCMP-SwitchInput { display: flex; align-items: center; width: var(--h82); height: var(--h26); background: rgb(var(--hC_BW1_Black)); border: 1px solid rgb(var(--hC_Border)); border-radius: var(--border-radius); }
.hCMP-Switch { display: flex; flex-direction: column; padding: 0; gap: 0; width: var(--h18); height: var(--h26); background: var(--hC_hBtn2_Warning); }
.hCMP-Switch > * { margin: 0; }
.hCMP-Switch__Btn { height: var(--h12); border: none; border-radius: var(--border-radius); background: none; }
.hCMP-Switch__Btn-SVG { width: var(--h18); }
.hInput { width: var(--h64); height: var(--h26); box-sizing: border-box; padding: 0 var(--h4) 0 var(--h2); text-align: right; border: none; background: none; color: rgb(var(--hC_hBtn_svg)); font-size: var(--h16) px; }
.hAlign-label__RenameAB { display: flex; width: var(--h40); height: var(--h32); align-items: center; justify-content: right; padding: 0 var(--h4) 0 var(--h2); color: rgb(var(--hC_hBtn_svg)); font-size: calc(var(--h32)-4); }
.hBarDivider { width: var(--h2); height: var(--h40); background: rgb(var(--hC_hBarDivider)); margin: 0 var(--h8); border: none; cursor: move; }
#hBarMove { cursor: move; }

#h6__hMenu { position: absolute; background: rgb(var(--hC_hMenu)); border-radius: var(--h8); z-index: var(--hZindex__h6__hMenu); display: grid; grid-template-columns: repeat(4, 1fr); grid-template-rows: auto auto; gap: var(--h8) var(--h4); width: auto; padding: var(--h4) var(--h8) var(--h8) var(--h8) !important; border: 1px solid rgb(var(--hC_Border)); box-sizing: border-box; }
#h6__hMenu > div:last-child { grid-column: 1 / -1; display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--h4); justify-items: center; margin-top: 0; height: var(--h26); position: relative; width: 100%; }
.hMenu-btn { border: none; width: var(--h82); height: var(--h26); border-radius: var(--border-radius); background-color: rgb(var(--hC_hBtn_Std)); color: rgb(var(--hC_BW6_BrightGray)); font-size: var(--h16); cursor: pointer; transition: all var(--hTrans3) ease; display: flex; align-items: center; justify-content: center; position: relative; z-index: 2; box-sizing: border-box; }

.hMenu-btn:hover { background-color: rgb(var(--hC_hBtn1_Highlight)); }
.hMenu-btnReset { background: rgb(var(--hC_hBtn2_Warning)); }
.hMenu-btnReset:hover { background: rgb(var(--hC_hBtn3_WarningHover)); }
#hBugReport { cursor: alias; }
#hGuide { cursor: help; }

.hCMP__hSelKit { display: inline-block; flex-direction: column; gap: var(--h2); width: var(--h82); height: calc(var(--h16) + var(--h26)); position: relative; vertical-align: top; }
.hCMP-hSel, .hCMP-hSel .hMenu-btn { width: var(--h82) !important; box-sizing: border-box; }
.hSelKit-label { display: block; width: var(--h82); height: var(--h14); color: rgb(var(--hC_hBtn_svg)); font-size: var(--h12); margin: 0; padding: 0 0 0 var(--h4); line-height: 14px; text-align: left; box-sizing: border-box; }
.hCMP-hSel { position: relative; width: var(--h82); height: var(--h26); }
.hCMP-hSel::before { content: ''; position: absolute; top: -8px; left: -8px; right: -8px; bottom: -8px; z-index: 1; display: none; }
.hCMP-hSel:hover::before { display: block; }

.hCMP-hSel__options { position: absolute; top: 100%; left: 0; width: var(--h82) !important; background-color: rgb(var(--hC_hBtn_Std)); border: 1px solid rgb(var(--hC_Border)); border-radius: var(--border-radius); margin-top: var(--h2); z-index: var(--hZindex__hMenuDropdown); overflow: hidden; box-shadow: 0 var(--h4) var(--h8) rgba(var(--hC_BW1_Black), 0.2); opacity: 0; visibility: hidden; transform: translateY(-5px); transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s ease; box-sizing: border-box; }
.hCMP-hSel__options.active { opacity: 1; visibility: visible; transform: translateY(0); }
.hCMP-hSel__options.fade-out { opacity: 0; visibility: hidden; transform: translateY(-5px); }
.hCMP-hSel__option { padding: var(--h6) var(--h8); color: rgb(var(--hC_BW6_BrightGray)); cursor: pointer; transition: all var(--hTrans3) ease; text-align: center; display: flex; align-items: center; justify-content: center; font-size: var(--h16); }
.hCMP-hSel__option:hover { background-color: rgb(var(--hC_hBtn1_Highlight)); }
.hCMP-hSel__option.selected { background-color: rgba(var(--hC_hBtn1_Highlight), 0.5); }
#hNAP-Title__LOGOAlign:hover, #hBarMove:hover { background-color: rgb(var(--hC_ComfyUIACBar)); }
#hNodeAlignKit, .hBtnC, .hIconC, #h1__hApBar1_Color, .hCPr__header { user-select: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-drag: none; -webkit-user-drag: none; -khtml-user-drag: none; -moz-user-drag: none; -o-user-drag: none; }
.Artstich_hColorPicker, .Artstich_hColorPicker * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Microsoft YaHei', sans-serif; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; font-size: var(--hColorPicker__font-size); }
.hIcon__LOGO { width: var(--h32); height: var(--h32); }
.Artstich_hColorPicker { position: absolute; z-index: var(--hZindex__hColorPicker); border: 1px solid rgb(var(--hC_Border)); border-radius: var(--h8); background: rgba(var(--hC_Bg), 1); box-shadow: 0 var(--h10) var(--h30) rgba(var(--hC_BW1_Black), 0.5); overflow: hidden; display: flex; flex-direction: column; width: fit-content; }
.Artstich_hColorPicker input { text-align: end; padding-right: 4px; }
#hexInput2 { width: 56px; }
.hCPr__valueG { border-bottom: 1px solid rgb(var(--hC_Border)); }
.hCPr__header { padding: 4px 8px; display: grid; grid-template-columns: repeat(2, auto); justify-content: start; border-bottom: 1px solid rgb(var(--hC_Border)); width: 100%; }
.hCPr__header h2 { font-weight: normal; color: rgb(var(--hC_hBtn_svg)); font-size: calc(var(--hColorPicker__font-size) * 2 + 2pt); }
.hColorPicker__hCPr { width: fit-content; padding: 8px; box-sizing: border-box; display: flex; flex-direction: column; gap: 0px; margin: 0 auto; }
.hColorPicker__ValueCopy { display: flex; justify-content: flex-end; gap: 10px; margin-bottom: 0px; width: 100%; }
.hCPr__main { display: flex; gap: 20px; width: fit-content; }
.hCPr__mainLeft { margin-top: 16px; margin-left: 8px; display: flex; flex-direction: column; gap: 10px; width: fit-content; }
.hCPr__mainRight { display: flex; flex-direction: column; gap: 0px; width: fit-content; }
.hCPr__mainPicker { display: flex; gap: var(--slider-spacing); align-items: center; width: fit-content; }
.hCPr__mainPicker_colorAreaG { position: relative; width: var(--palette-size); height: var(--palette-size); }
.hCPr__mainPicker_colorArea { width: 100%; height: 100%; border-radius: var(--border-radius); overflow: hidden; cursor: crosshair; position: relative; }

#hCPr__mainPicker_colorCanvas { width: 100%; height: 100%; display: block; border-radius: var(--border-radius); }

.hCPr__mainPicker_colorCursor { position: absolute; width: var(--palette-bar-size); height: var(--palette-bar-size); border: 2px solid rgb(var(--hC_BW7_White)); border-radius: 50%; box-shadow: 0 0 3px rgba(var(--hC_BW1_Black), 0.8); transform: translate(-50%, -50%); pointer-events: none; z-index: 10; }
.hCPr__mainPicker_hueSliderG { margin-left: 8px; position: relative; width: var(--slider-width); height: var(--slider-height); }
.hCPr__mainPicker_hueSlider { width: 100%; height: 100%; background: var(--hC_Rb__Bottom); border-radius: var(--border-radius); position: relative; cursor: pointer; }
.hCPr__mainPicker_hueCursor { position: absolute; left: 50%; width: var(--slider-bar-width); height: var(--slider-bar-height); background: rgb(var(--hC_BW7_White)); border: 2px solid rgb(var(--hC_BW7_White)); border-radius: calc(var(--slider-bar-height) / 2); transform: translate(-50%, -50%); pointer-events: none; box-shadow: 0 0 3px rgba(var(--hC_BW1_Black), 0.8); }
.hCPr__nodePreview { border-radius: var(--border-radius); cursor: pointer; margin-top: 10px; display: grid; place-items: center; height: 140px; background: transparent !important; border: none !important; width: fit-content; }

#hPreview__Node { width: 100%; height: 136px; }
#hCPr__nodeSvg { width: 288px; height: auto; }
.hPreview__Node-Main { fill: rgb(var(--hC_BW4_Gray)); rx: 7.25; ry: 7.25; filter: url(#drop-shadow); }
.hPreview__Node-Title { fill: rgb(var(--hC_CPr0__PurpleStd)); }
.hPreview__Node-Divider { stroke: rgb(var(--hC_Bg)); stroke-width: .75px; stroke-miterlimit: 10; }
.hPreview__Node-Txt { fill: rgb(var(--hC_CPr6__hNodeText)); font-family: MicrosoftYaHei,'Microsoft YaHei'; font-size: 12px; }
.hPreview__Node-Dot { stroke-width: 0; }
.hPreview__Node-Dot1 { fill: rgb(var(--hC_CPr5__hNodeDot)); r: 4.62; }
.hPreview__Node-Input1 { fill: rgb(var(--hC_CPr8__hNodeLaten)); r: 3.87; }
.hPreview__Node-Output2 { fill: rgb(var(--hC_CPr7__hNodeIMG)); stroke: rgb(var(--hC_BW1_Black)); stroke-width: .75px; r: 3.87; }
.hPreview__Node-Input2 { fill: rgb(var(--hC_CPr9__hNodeVAE)); r: 3.87; }
.hCPr__hsbBarKit { border-radius: var(--border-radius); padding: 15px; width: 288px; height: 96px; }
.hCPr__hsbBar_sliderG { margin-bottom: 0; display: flex; align-items: center; gap: 0px; height: 24px; }
.hCPr__hsbBar_sliderLabel { width: 50px; color: rgb(var(--hC_CPr6__hNodeText)); white-space: nowrap; }
.hCPr__hsbBar_hsbBarG { display: flex; align-items: center; gap: 8px; flex: 1; }

.slider { flex: 1; height: var(--hsb-height); background: var(--slider-bg); border-radius: calc(var(--hsb-height) / 2); position: relative; cursor: pointer; width: var(--hSlider-width); }
.hCPr__sliderFill { position: absolute; height: 100%; width: 100%; left: 0; top: 0; border-radius: calc(var(--hsb-height) / 2); }
.hCPr__hueSliderFill { background: var(--hC_Rb__Right); height: 100%; border-radius: calc(var(--hsb-height) / 2); }
.slider-handle { position: absolute; width: var(--hsb-bar-width); height: var(--hsb-bar-height); background: var(--slider-handle-bg); border: var(--slider-handle-border); border-radius: calc(var(--hsb-bar-width) / 2); box-shadow: var(--slider-handle-shadow); transform: translate(-50%, -50%); cursor: pointer; z-index: 10; top: 50%; }
.slider-handle:active { background: var(--slider-handle-active-bg); width: var(--slider-handle-active-size); height: 22px; transform: translate(-50%, -50%); }
.hCPr__sliderValue { width: 40px; height: 22px; background: rgb(var(--hC_BW1_Black)); border: 1px solid rgb(var(--hC_Border)); border-radius: var(--border-radius); padding: 0px; color: rgb(var(--hC_hBtn_svg)); text-align: center; }
.hCPr__valueG { display: flex; align-items: center; gap: 0; }
.hCPr__valueLabel { width: 58px; font-size: 12px; color: rgb(var(--hC_CPr6__hNodeText)); height: 16px; line-height: 16px; padding: 0 4px; white-space: nowrap; text-align: right; }
.value-input { height: 22px; background: rgb(var(--hC_BW1_Black)); border: 1px solid rgb(var(--hC_Border)); color: rgb(var(--hC_hBtn_svg)); font-size: 12px; font-weight: bold; padding: 0 4px; line-height: 14px; width: 48px; border-radius: 0; outline: none; }
.value-input:first-of-type { border-radius: var(--border-radius) 0 0 var(--border-radius); border-right: none; }
.rgb-input { width: 32px; border-radius: 0; border-right: none; }
.rgb-input:first-of-type { border-radius: var(--border-radius) 0 0 var(--border-radius); }
.rgb-input:last-of-type { border-right: 1px solid rgb(var(--hC_Border)); border-radius: 0; }
.hCPr__rgbLabel { width: 36px; }

.copy-btn { background: rgb(var(--hC_Border)); color: rgb(var(--hC_hBtn_svg)); border: 1px solid rgb(var(--hC_Border)); height: 22px; width: 22px; padding: 0; display: flex; justify-content: center; align-items: center; cursor: pointer; transition: background 0.2s; border-radius: 0 var(--border-radius) var(--border-radius) 0; position: relative; }
.rgb-copy-btn { border-radius: 0 var(--border-radius) var(--border-radius) 0; margin-left: 0; }
.copy-btn:hover { background: rgb(var(--hC_CPr0__PurpleStd)); }
.hCPr__copyIcon { width: 10px; height: 12px; position: relative; transform: translateX(1px) translateY(-1px); }
.hCPr__copyIcon-front { position: absolute; width: 10px; height: 12px; background: rgb(var(--hC_hBtn_svg)); border: 2px solid rgb(var(--hC_BW1_Black)); border-radius: 1px; top: 3px; left: -3px; }
.hCPr__copyIcon-back { position: absolute; width: 10px; height: 12px; background: rgb(var(--hC_hBtn_svg)); border: 2px solid rgb(var(--hC_BW1_Black)); border-radius: 1px; }
.hCPr__hTips { display: grid; grid-template-columns: repeat(2, auto); justify-content: start; align-items: center; }
#hCPr__nodePreviewTips { color: rgb(var(--hC_CPr6__hNodeText)); font-size: var(--h16); pointer-events: none; display: flex; align-items: center; }
.hCPr__nodeMode { padding: 4px 8px; background: rgb(var(--bar)); border-radius: var(--border-radius); pointer-events: none; color: rgb(var(--hC_CPr6__hNodeText)); font-size: var(--h16); display: flex; align-items: center; margin-left: -8px; }
.slider-touch-area { position: absolute; top: -4px; bottom: -4px; left: -4px; right: -4px; z-index: 2; cursor: pointer; }
.hCPr__mainPicker_hueSlider_touchArea { position: absolute; top: -4px; bottom: -4px; left: -4px; right: -4px; z-index: 2; cursor: pointer; }
#hCPr__HUE_sliderControl { background: none; }
#hCPr__HUE_sliderClip { width: 100% !important; }
.hIcon { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
.hBtn_svg { fill: rgb(var(--hC_hBtn_svg)); }
.hBtn_full { fill: rgb(var(--hC_Bg)); }
.hBtn_stroke { fill: none; stroke: rgb(var(--hC_hBtn_svg)); stroke-miterlimit: 10; }
.hBtn_strokeRound { fill: none; stroke: rgb(var(--hC_hBtn_svg)); stroke-linecap: round; stroke-linejoin: round; }
.hColor1_Red { fill: rgb(var(--hC1_Red)); }
.hColor2_Orange { fill: rgb(var(--hC2_Orange)); }
.hColor3_Yellow { fill: rgb(var(--hC3_Yellow)); }
.hColor4_Green { fill: rgb(var(--hC4_Green)); }
.hColor5_Cyan { fill: rgb(var(--hC5_Cyan)); }
.hColor6_Blue { fill: rgb(var(--hC6_Blue)); }
.hColor7_Purple { fill: rgb(var(--hC7_Purple)); }
#hBtnX_barDivider .hBtn_svg { fill: rgb(var(--hC_hBarDivider));
 }
    `;
    const styleSheet = document.createElement('style'); styleSheet.textContent = styles; document.head.appendChild(styleSheet);

    // 【== 全局颜色转换管理器 ==】
    class __hColorConvert {
        /** 将HSB/HSV颜色转换为RGB对象 @param {number} h - 色相 (0-360) @param {number} s - 饱和度 (0-100) @param {number} b - 亮度/明度 (0-100) @returns {{r: number, g: number, b: number}} RGB对象 */
        static hsbToRgb(h, s, b) {
            s /= 100; b /= 100; let r, g, bv; const i = Math.floor(h / 60), f = h / 60 - i, p = b * (1 - s), q = b * (1 - f * s), t = b * (1 - (1 - f) * s);
            switch (i % 6) { case 0: r = b; g = t; bv = p; break; case 1: r = q; g = b; bv = p; break; case 2: r = p; g = b; bv = t; break; case 3: r = p; g = q; bv = b; break; case 4: r = t; g = p; bv = b; break; case 5: r = b; g = p; bv = q; break; }
            return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(bv * 255) };
        }

        /** 将RGB颜色转换为HSB/HSV对象 @param {number} r - 红色 (0-255) @param {number} g - 绿色 (0-255) @param {number} b - 蓝色 (0-255) @returns {{h: number, s: number, b: number}} HSB对象 */
        static rgbToHsb(r, g, b) {
            (r /= 255), (g /= 255), (b /= 255); const max = Math.max(r, g, b), min = Math.min(r, g, b), delta = max - min, s = max === 0 ? 0 : delta / max, v = max;
            let h = Math.round((max === min ? 0 : max === r ? (g - b) / delta + (g < b ? 6 : 0) : max === g ? (b - r) / delta + 2 : (r - g) / delta + 4) * 60);
            return { h, s: Math.round(s * 100), b: Math.round(v * 100) };
        }

        /** 将HSB/HSV颜色转换为HEX字符串 @param {number} h - 色相 (0-360) @param {number} s - 饱和度 (0-100) @param {number} b - 亮度/明度 (0-100) @returns {string} HEX颜色字符串 (#RRGGBB) */
        static hsbToHex(h, s, b) { const rgb = this.hsbToRgb(h, s, b); return this.rgbToHex(rgb.r, rgb.g, rgb.b); }

        /** 将RGB值转换为HEX字符串 @param {number} r - 红色 (0-255) @param {number} g - 绿色 (0-255) @param {number} b - 蓝色 (0-255) @returns {string} HEX颜色字符串 (#RRGGBB) */
        static rgbToHex(r, g, b) { return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()}`; }

        /** 将HEX颜色字符串转换为RGB对象 @param {string} hex - HEX颜色字符串 (#RGB 或 #RRGGBB) @returns {{r: number, g: number, b: number}} RGB对象 */
        static hexToRgb(hex) {
            hex = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => `#${r}${r}${g}${g}${b}${b}`); const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return !result ? { r: 0, g: 0, b: 0 } : { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) };
        }

        /** 将RGB颜色字符串转换为HEX @param {string} rgb - RGB颜色字符串 (rgb(255,255,255) 或 rgba(255,255,255,1)) @returns {string} HEX颜色字符串 (#RRGGBB) */
        static rgbStringToHex(rgb) { if (!rgb) return '#000000'; if (rgb.startsWith('#')) return rgb; const match = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/); return match ? this.rgbToHex(...match.slice(1, 4).map(Number)) : '#000000'; }

        /** 调整颜色亮度 @param {string} hex - HEX颜色字符串 @param {number} percent - 亮度调整百分比 (-100 到 100) @returns {string} 调整后的HEX颜色 */
        static adjustColorBrightness(hex, percent) {
            hex = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => `#${r}${r}${g}${g}${b}${b}`); const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex); if (!result) return '#000000';
            const amount = Math.round(2.55 * percent), [r, g, b] = result.slice(1, 4).map(val => Math.min(255, Math.max(0, parseInt(val, 16) + amount)));
            return this.rgbToHex(r, g, b);
        }

        /** 解析CSS变量颜色值 @param {string} colorString - 颜色字符串，可能包含CSS变量 @returns {string} 解析后的颜色字符串 */
        static resolveCSSColor(colorString) {
            if (!colorString) return colorString;
            if (colorString.includes('var(')) {
                try {
                    const match = colorString.match(/var\(([^)]+)\)/), varName = match?.[1].trim() || '';
                    if (varName) { const varValue = getComputedStyle(document.documentElement).getPropertyValue(varName).trim(); return varValue ? (/^\d+,\s*\d+,\s*\d+/.test(varValue) ? `rgb(${varValue})` : varValue) : colorString; }
                } catch (error) { hLog.error('解析CSS变量颜色失败:', error, colorString); }
            }
            return colorString;
        }

        /** 计算颜色亮度（加权平均值） @param {string} color - RGB颜色字符串 (rgb(255,255,255)) @returns {number} 亮度值 (0-255) */
        static calculateBrightness(color) { const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/); if (!rgbMatch) return 128; const [r, g, b] = rgbMatch.slice(1, 4).map(Number); return Math.round(0.299 * r + 0.587 * g + 0.114 * b); }

        /** 生成随机RGB颜色 @returns {string} RGB颜色字符串 */
        static getRandomColor() { return 'rgb(' + Array(3).fill(0).map(() => Math.floor(Math.random() * 256)).join(', ') + ')'; }

        /** RGB对象转字符串 @param {{r: number, g: number, b: number}} rgb - RGB对象 @returns {string} RGB颜色字符串 */
        static rgbObjectToString(rgb) { return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`; }
    }

    // 【== 全局上色模式管理器 ==】
    class __hMgr_ColorModeFc {
        constructor() { this.mode = 1; this.loadMode(); } // 1:整体色, 0:仅标题
        setMode(mode) { this.mode = mode; this.saveMode(); return this.mode; }
        toggleMode() { this.mode = this.mode === 0 ? 1 : 0; this.saveMode(); return this.mode; }
        getMode() { return this.mode; }
        getModeText() { try { if (window.hLanguage && typeof window.hLanguage.t === 'function') return window.hLanguage.t(this.mode === 0 ? 'Option_Color_TitleOnly' : 'Option_Color_Whole'); } catch (e) {} return this.mode === 0 ? '仅标题' : '整体色'; }
        saveMode() { localStorage.setItem('NodeAlignPro_ColorApplyMode', this.mode.toString()); }
        loadMode() { const saved = localStorage.getItem('NodeAlignPro_ColorApplyMode'); this.mode = saved !== null ? parseInt(saved) : 1; }
    }
    window.__hMgr_ColorModeFc = new __hMgr_ColorModeFc(); // 创建全局实例

    // 【== 例外颜色管理器 ==】
    class __hMgr_ExceptionColors {
        constructor() { this.exceptionColors = [{ h: 0, s: 0, b: 21, name: '默认色' }]; this.tolerance = { h: 5, s: 5, b: 5 }; } // 例外颜色列表（首个为默认色）& 色相/饱和度/亮度容差
        /** 检查颜色是否为例外颜色 @param {number} h 色相 (0-360) @param {number} s 饱和度 (0-100) @param {number} b 亮度 (0-100) @returns {Object|null} 匹配的例外颜色对象，不匹配返回null */
        isExceptionColor(h, s, b) { for (const excColor of this.exceptionColors) { const hDiff = Math.abs(h - excColor.h), sDiff = Math.abs(s - excColor.s), bDiff = Math.abs(b - excColor.b); if (hDiff <= this.tolerance.h && sDiff <= this.tolerance.s && bDiff <= this.tolerance.b) return excColor; } return null; }
        isExceptionColorFromRgb = (r, g, b) => this.isExceptionColor(...Object.values(__hColorConvert.rgbToHsb(r, g, b))); /** 检查RGB颜色是否为例外颜色 @param {number} r 红色 (0-255) @param {number} g 绿色 (0-255) @param {number} b 蓝色 (0-255) @returns {Object|null} 匹配的例外颜色对象 */
        isExceptionColorFromHex = (hex) => { const rgb = __hColorConvert.hexToRgb(hex); return this.isExceptionColorFromRgb(rgb.r, rgb.g, rgb.b); }; /** 检查HEX颜色是否为例外颜色 @param {string} hex HEX颜色字符串 @returns {Object|null} 匹配的例外颜色对象 */
        addExceptionColor = (color) => (this.exceptionColors.push(color), hLog.info('--@ExceptionColors', `已添加例外颜色: ${color.name} (H:${color.h}, S:${color.s}, B:${color.b})`));  /** 添加例外颜色 @param {Object} color 例外颜色对象 {h, s, b, name} */
        removeExceptionColor = (index) => (index >= 0 && index < this.exceptionColors.length) && (() => { const removed = this.exceptionColors.splice(index, 1)[0]; hLog.info('--@ExceptionColors', `已移除例外颜色: ${removed.name}`); })();  /** 移除例外颜色 @param {number} index 颜色索引 */
        getExceptionColors = () => [...this.exceptionColors]; /** 获取例外颜色列表 @returns {Array} 例外颜色数组 */
        setTolerance = (tolerance) => (this.tolerance = { ...this.tolerance, ...tolerance }, hLog.info('--@ExceptionColors', `容差已更新: H:${this.tolerance.h}, S:${this.tolerance.s}, B:${this.tolerance.b}`));  /** 设置容差 @param {Object} tolerance 容差对象 {h, s, b} */
        getDefaultExceptionColor = () => this.exceptionColors.length > 0 ? this.exceptionColors[0] : null; /** 获取默认例外颜色（第一个）@returns {Object} 默认例外颜色 */
    }
    window.__hMgr_ExceptionColors = new __hMgr_ExceptionColors(); // 创建全局例外颜色管理器实例

    // 【== 全局日志管理器 ==】
    class __hMgr_Log {
        constructor() { this.debugElement = null; this.maxLines = 7; this.lines = []; this.lastLogKey = null; this.repeatCount = 0; this.initDebugElement(); this.bindToWindow(); }
        // 创建新的调试元素
        initDebugElement() { this.debugElement = document.createElement('div'); this.debugElement.id = 'hDebugInfo_V2', this.debugElement.className = 'hDebugInfo_V2', this.debugElement.innerHTML = 'hNodeAlignKit正在初始化...'; document.body.appendChild(this.debugElement); }

        getTimestamp() {
            const now = new Date(), year = now.getFullYear(), month = String(now.getMonth() + 1).padStart(2, '0'), day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0'), minutes = String(now.getMinutes()).padStart(2, '0'), seconds = String(now.getSeconds()).padStart(2, '0');
            return `h${year}${month}${day}_t${hours}${minutes}${seconds}`;
        }

        // 检查参数是否为标识符：支持标识符类型：1. [--@开头+]结尾字符串 2. --@开头字符串 3. 数字（用于简洁标识） 4. Symbol类型
        isIdentifier(arg) { return typeof arg === 'string' ? arg.startsWith('[--@') && arg.endsWith(']') || arg.startsWith('--@') : typeof arg === 'number' || typeof arg === 'symbol'; }
        // 提取标识符和实际消息
        parseLogArgs(args) { let identifier = null, messageArgs = args; args.length > 0 && this.isIdentifier(args[0]) && (identifier = args[0], messageArgs = args.slice(1)); return { identifier, messageArgs }; }

        // 生成日志键（只基于标识符）：如果有标识符，只使用标识符作为键；如果没有标识符，使用级别+时间戳+随机数作为键（确保每条无标识符的日志独立）
        generateLogKey(level, identifier) { if (identifier) return String(identifier); return `${level}:${Date.now()}:${Math.random()}`; }

        formatMessage(level, message, count = 1) {
            const timestamp = this.getTimestamp(), timestampSpan = `<span style="color: rgba(var(--hC_hBtn_svg), 0.5);">${timestamp}</span>`;
            let displayMessage = count > 1 ? `${message} [${count}]` : message, contentSpan = `<span style="color: rgb(var(--hC_hBtn_svg));">${displayMessage}</span>`;
            switch (level) {
                case 'error': contentSpan = `<span style="color: rgb(var(--hC1_Red));">${displayMessage}</span>`; break;
                case 'warn': contentSpan = `<span style="color: rgb(var(--hC3_Yellow));">${displayMessage}</span>`; break;
                case 'info': contentSpan = `<span style="color: rgb(var(--hC4_Green));">${displayMessage}</span>`; break;
            }
            return `${timestampSpan}>_ ${contentSpan}`;
        }

        // 添加日志行（支持重复合并）
        addLine(level, identifier, message, count = 1) {
            const currentKey = this.generateLogKey(level, identifier);
            currentKey === this.lastLogKey
                ? (this.repeatCount++, this.lines.length > 0 && (() => { const lastLine = this.lines[this.lines.length - 1]; lastLine.count = this.repeatCount; lastLine.message = message; lastLine.html = this.formatMessage(level, message, this.repeatCount); })())
                : (this.lastLogKey = currentKey, this.repeatCount = 1, this.lines.push({ level, message, count: 1, html: this.formatMessage(level, message, 1) }), this.lines.length > this.maxLines && this.lines.shift());
            this.updateDisplay();
        }
        // 渐隐日志行
        updateDisplay() {
            if (!this.debugElement) return;
            const totalLines = this.lines.length;
            const displayLines = this.lines.map((line, index) => {
                const opacity = 1.0 - (0.7 * ((totalLines - 1 - index) / (totalLines - 1))); return `<div style="opacity: ${opacity.toFixed(2)};">${line.html}</div>`;
            }).join('');
            this.debugElement.innerHTML = displayLines;
        }

        // 内部日志方法（处理标识符和消息）
        _log(level, ...args) {
            const { identifier, messageArgs } = this.parseLogArgs(args);
            const message = messageArgs.map(arg => typeof arg === 'object' ? (() => { try { return JSON.stringify(arg); } catch { return String(arg); } })() : String(arg)).join(' ');
            this.addLine(level, identifier, message);
        }

        // 公共日志方法
        log(...args) { this._log('log', ...args); }
        error(...args) { this._log('error', ...args); }
        warn(...args) { this._log('warn', ...args); }
        info(...args) { this._log('info', ...args); }
        debug(...args) { this._log('debug', ...args); }

        bindToWindow() { window.hLog = { log: this.log.bind(this), error: this.error.bind(this), warn: this.warn.bind(this), info: this.info.bind(this), debug: this.debug.bind(this) }; }
    }

    // 【== HTML 结构创建 ==】
    function __hCreateHTML() {
        const container = document.createElement('div'); container.id = 'hNodeAlignKit';
        container.innerHTML = `
<div class="hDebugInfo" id="debugInfo" data-i18n="Debug_Tips">v2.0.3_rc新版功能：按Shift、Alt、Ctrl Alt切换不同色卡模式...</br>Alt+对齐按钮：对齐到“反向基准”节点^_^（右键菜单>【新版说明】隐藏本提示）</div>
<div id="h0__hApBar0_apBall">
    <button id="hBarLOGO" class="hBtn"><div class="hIcon" id="hBtnY_barLOGO_ApBall" data-i18n="Menu_LogoTitle" data-i18n-attr="aria-label"></div></button></div>
<div id="h1__hApBar1_Color">
    <button id="hColor1_Red" class="hBtnC hBtnC_7c" data-color-type="default"></button>
    <button id="hColor2_Orange" class="hBtnC hBtnC_7c" data-color-type="default"></button>
    <button id="hColor3_Yellow" class="hBtnC hBtnC_7c" data-color-type="default"></button>
    <button id="hColor4_Green" class="hBtnC hBtnC_7c" data-color-type="default"></button>
    <button id="hColor5_Cyan" class="hBtnC hBtnC_7c" data-color-type="default"></button>
    <button id="hColor6_Blue" class="hBtnC hBtnC_7c" data-color-type="default"></button>
    <button id="hColor7_Purple" class="hBtnC hBtnC_7c" data-color-type="default"></button>
    <button id="hClear" class="hBtnC"><div class="hIcon" id="hColorA_Clear" data-i18n="Aria_ClearColor" data-i18n-attr="aria-label"></div></button>
    <button id="hPick" class="hBtnC"><div class="hIcon" id="hColorB_Pick" data-i18n="Aria_Pick" data-i18n-attr="aria-label"></div></button>
    <button id="hRandom" class="hBtnC"><div class="hIcon" id="hColorC_Random" data-i18n="Aria_RandomColor" data-i18n-attr="aria-label"></div></button>
    <button id="hZoom" class="hBtnC" title="屏幕取色" style="background-color: rgb(var(--hC_BW1_Black)); border: 1px solid rgb(var(--hC_BW5_LightGray));"><div class="hIcon" id="hColorF_Zoom" data-i18n="Aria_ScreenPick" data-i18n-attr="aria-label"></div></button>
    <button id="hColorD_Add" class="hBtnC" style="display: none;"></button>
    <button id="hColorE_Love" class="hBtnC" style="display: none;"></button></div>
<div class="Artstich_hColorPicker" id="Artstich_hColorPicker" style="display:none;">
    <div class="hColorPicker__hCPr">
        <div class="hColorPicker__ValueCopy">
            <div class="hCPr__header" id="hCPr__header">
                <div id="hBtnY_barLOGO_Color" class="hIcon__LOGO" data-i18n="ColorPicker_Title" data-i18n-attr="aria-label"></div>
                <h2>hColorPicker™</h2></div>
            <div class="hCPr__valueG">
                <div class="hCPr__valueLabel" data-i18n="ColorPicker_HexLabel">十六进制:</div>
                <input type="text" class="value-input" id="hexInput2" value="37377D">
                <button class="copy-btn" data-target="hexInput2"> <div  class="hCPr__copyIcon"> <div class="hCPr__copyIcon-back"></div> <div class="hCPr__copyIcon-front"></div></div></button></div>
            <div class="hCPr__valueG">
                <div class="hCPr__valueLabel hCPr__rgbLabel">RGB:</div>
                <input type="text" class="value-input rgb-input" id="hCPr__Input_R" value="55">
                <input type="text" class="value-input rgb-input" id="hCPr__Input_G" value="55">
                <input type="text" class="value-input rgb-input" id="hCPr__Input_B" value="125">
                <button class="copy-btn rgb-copy-btn" data-target="hCPr__Input_RGB"> <div  class="hCPr__copyIcon"> <div class="hCPr__copyIcon-back"></div> <div class="hCPr__copyIcon-front"></div></div></button></div></div>
        <div class="hCPr__main">
            <div class="hCPr__mainLeft">
                <div class="hCPr__mainPicker"> <div  class="hCPr__mainPicker_colorAreaG"> <div class="hCPr__mainPicker_colorArea" id="colorArea">
                            <canvas id="hCPr__mainPicker_colorCanvas"></canvas><div class="hCPr__mainPicker_colorCursor" id="colorCursor"></div></div></div> <div  class="hCPr__mainPicker_hueSliderG"> <div class="hCPr__mainPicker_hueSlider" id="hueSlider"><div class="hCPr__mainPicker_hueSlider_touchArea" id="hueSliderTouchArea"></div><div class="hCPr__mainPicker_hueCursor" id="hueCursor"></div></div></div></div></div>
            <div class="hCPr__mainRight">
                <div class="hCPr__nodePreview" id="hPreview__Node">
                    <svg id="hCPr__nodeSvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 207 84">
                        <defs><filter id="drop-shadow" filterUnits="userSpaceOnUse"><feOffset dx="2" dy="2" /><feGaussianBlur result="blur" stdDeviation="2.5" /><feFlood flood-color="#000" flood-opacity=".3" /><feComposite in2="blur" operator="in" /><feComposite in="SourceGraphic" /></filter></defs>
                        <rect class="hPreview__Node-Main" x="5.5" y="5.5" width="192" height="69" />
                        <path class="hPreview__Node-Title" d="M 12.75,5.5 H 190.25 A 7.25,7.25 0 0 1 197.5,12.75 V 33 H 5.5 V 12.75 A 7.25,7.25 0 0 1 12.75,5.5 Z" />
                        <line class="hPreview__Node-Divider" x1="5.5" y1="33" x2="197.5" y2="33" />
                        <text class="hPreview__Node-Txt" x="32.64" y="23.27"><tspan>ArtsticH_节点预览_t0113</tspan></text>
                        <circle class="hPreview__Node-Dot hPreview__Node-Dot1" cx="19.13" cy="19.12" />
                        <text class="hPreview__Node-Txt" x="23.03" y="50.41"><tspan>Latent</tspan></text>
                        <circle class="hPreview__Node-Dot hPreview__Node-Input1" cx="14.63" cy="45.62" />
                        <text class="hPreview__Node-Txt" x="156.28" y="50.41">图像</text>
                        <circle class="hPreview__Node-Dot hPreview__Node-Output2" cx="189.38" cy="45.62" />
                        <text class="hPreview__Node-Txt" x="23.03" y="68.91"><tspan letter-spacing="-.02em">vae</tspan></text>
                        <circle class="hPreview__Node-Dot hPreview__Node-Input2" cx="14.63" cy="64.12" /></svg> <div  class="hCPr__hTips"> <div id="hCPr__nodePreviewTips" data-i18n="hNodePreview_Tips">👆双击切换上色模式：</div> <span class="hCPr__nodeMode" id="hCPr__nodeMode">整体色</span></div></div>
                <div class="hCPr__hsbBarKit"> <div  class="hCPr__hsbBar_sliderG"> <div class="hCPr__hsbBar_sliderLabel">色相(H):</div> <div class="hCPr__hsbBar_hsbBarG">
                            <div class="slider" id="hCPr__HUE_sliderControl"><div class="hCPr__sliderClip" id="hCPr__HUE_sliderClip"> <div  class="hCPr__sliderFill hCPr__hueSliderFill" id="hCPr__HUE_fill"></div></div><div class="slider-touch-area" id="hueTouchArea"></div><div class="slider-handle" id="hueHandle"></div></div>
                            <input type="text" class="hCPr__sliderValue" id="hCPr__HUE_input" value="240"></div></div> <div  class="hCPr__hsbBar_sliderG"> <div class="hCPr__hsbBar_sliderLabel">饱和(S):</div> <div class="hCPr__hsbBar_hsbBarG">
                            <div class="slider" id="hCPr__S_slider"><div class="hCPr__sliderClip" id="hCPr__S_clipContainer"> <div  class="hCPr__sliderFill" id="hCPr__S_fill"></div></div><div class="slider-touch-area" id="saturationTouchArea"></div><div class="slider-handle" id="hCPr__S_handle"></div></div>
                            <input type="text" class="hCPr__sliderValue" id="hCPr__S_input" value="57"></div></div> <div  class="hCPr__hsbBar_sliderG"> <div class="hCPr__hsbBar_sliderLabel">亮度(B):</div> <div class="hCPr__hsbBar_hsbBarG">
                            <div class="slider" id="hCPr__B_slider"><div class="hCPr__sliderClip" id="hCPr__B_clipContainer"> <div  class="hCPr__sliderFill" id="hCPr__B_fill"></div></div><div class="slider-touch-area" id="brightnessTouchArea"></div><div class="slider-handle" id="hCPr__B_handle"></div></div>
                            <input type="text" class="hCPr__sliderValue" id="hCPr__B_input" value="49"></div></div></div></div></div></div></div>
<div id="h2__hNodeAlignPro" class="hNodeAlignPro">
    <div id="hNAP-Title">
        <button id="hNAP-Title__LOGO">
            <div id="hBtnY_barLOGO_Title" class="hIcon" data-i18n="Menu_LogoTitle" data-i18n-attr="aria-label"></div></button>
        <div id="hNAP-Title__Content">
            <div id="hNAP-Title__Content-Text" data-i18n="NodeAlignPro_Title">Node Align Pro</div>
            <button id="hNAP-Title__Content-ModeSwitch"><div id="hBtnV_modeSwitch" class="hIcon" data-i18n="Aria_ModeSwitch" data-i18n-attr="aria-label"></div></button>
            <button id="hNAP-Title__Context" data-i18n="Title_Search">搜索节点 Github@ArtsticH...</button>
            <button id="hNAP-Title__MenuA"><div id="hBtnV_barMenuA" data-i18n="Aria_Menu" data-i18n-attr="aria-label"></div></button></div></div>
    <div id="hApBar2__Align">
        <button id="hNAP-Title__LOGOAlign" class="hBtn"><div class="hIcon hIcon__LOGO" id="hBtnY_barLOGO" data-i18n="Menu_LogoTitle" data-i18n-attr="aria-label"></div></button>
        <div id="hBarDivider01" class="hBarDivider" data-i18n="Aria_Separator" data-i18n-attr="aria-label"></div>
        <div id="hAlignBtn_Group1" class="hAlignBtn_Group1"><div class="hAlign-label" data-i18n="Label_Align">对齐:</div>
            <button id="hAlignLeft" class="hBtn"><div class="hIcon" id="hBtnA_alignLeft" data-i18n="Btn_LeftAlign" data-i18n-attr="aria-label"></div></button>
            <button id="hAlignCenterV" class="hBtn"><div class="hIcon" id="hBtnB_alignCenterV" data-i18n="Btn_VCenter" data-i18n-attr="aria-label"></div></button>
            <button id="hAlignRight" class="hBtn"><div class="hIcon" id="hBtnC_alignRight" data-i18n="Btn_RightAlign" data-i18n-attr="aria-label"></div></button>
            <div id="hBarDivider02" class="hBarDivider" data-i18n="Aria_Separator" data-i18n-attr="aria-label"></div></div>
        <div id="hAlignBtn_Group2" class="hAlignBtn_Group2">
            <button id="hAlignTop" class="hBtn"><div class="hIcon" id="hBtnD_alignTop" data-i18n="Btn_TopAlign" data-i18n-attr="aria-label"></div></button>
            <button id="hAlignCenterH" class="hBtn"><div class="hIcon" id="hBtnE_alignCenterH" data-i18n="Btn_HCenter" data-i18n-attr="aria-label"></div></button>
            <button id="hAlignBottom" class="hBtn"><div class="hIcon" id="hBtnF_alignButton" data-i18n="Btn_BottomAlign" data-i18n-attr="aria-label"></div></button>
            <div id="hBarDivider03" class="hBarDivider" data-i18n="Aria_Separator" data-i18n-attr="aria-label"></div></div>
        <div class="hAlignBtn_Group3" class="hAlignBtn_Group3"><div class="hAlign-label2" data-i18n="Label_Mode">模式</div>
            <button id="hSelectMode" class="hBtn"><div class="hIcon" id="hBtnK_hSelectMode" data-i18n="Aria_SelectMode" data-i18n-attr="aria-label"></div></button>
            <button id="hGroupMode" class="hBtn"><div class="hIcon" id="hBtnL_hGroupMode" data-i18n="Aria_GroupMode" data-i18n-attr="aria-label"></div></button>
            <div id="hBarDivider04" class="hBarDivider" data-i18n="Aria_Separator" data-i18n-attr="aria-label"></div></div>
        <div id="hAlignBtn_Group4" class="hAlignBtn_Group4"><div class="hAlign-label" data-i18n="Label_Distribute">分布:</div>
            <div id="hCMP-SwitchInput__hDistEven" class="hCMP-SwitchInput">
                <div class="hCMP-Switch">
                    <button class="hCMP-Switch__Btn"> <div id="hBtnV_switchUp" class="hCMP-Switch__Btn-SVG" data-i18n="Aria_Prev" data-i18n-attr="aria-label"></div></button>
                    <button class="hCMP-Switch__Btn"> <div id="hBtnV_switchDown" class="hCMP-Switch__Btn-SVG" data-i18n="Aria_Next" data-i18n-attr="aria-label"></div></button></div>
                <input type="text" class="hInput" value="128px"></div>
            <button id="hDistEvenH" class="hBtn"><div id="hBtnG_distEvenH" class="hIcon" data-i18n="Btn_DistH" data-i18n-attr="aria-label"></div></button>
            <button id="hDistEvenV" class="hBtn"><div id="hBtnH_distEvenV" class="hIcon" data-i18n="Btn_DistV" data-i18n-attr="aria-label"></div></button>
            <div id="hBarDivider05" class="hBarDivider" data-i18n="Aria_Separator" data-i18n-attr="aria-label"></div></div>
        <div id="hAlignBtn_Group5" class="hAlignBtn_Group5"><div class="hAlign-label" data-i18n="Label_Size">尺寸:</div>
            <div id="hCMP-SwitchInput__hEqual" class="hCMP-SwitchInput">
                <div class="hCMP-Switch">
                    <button class="hCMP-Switch__Btn"> <div id="hBtnV_switchUp_1" class="hCMP-Switch__Btn-SVG" data-i18n="Aria_Prev" data-i18n-attr="aria-label"></div></button>
                    <button class="hCMP-Switch__Btn"> <div id="hBtnV_switchDown_1" class="hCMP-Switch__Btn-SVG" data-i18n="Aria_Next" data-i18n-attr="aria-label"></div></button></div>
                <input type="text" class="hInput" value="128px"></div>
            <button id="hEqualWidth" class="hBtn"><div id="hBtnI_equalWidth" class="hIcon" data-i18n="Btn_EqualWidth" data-i18n-attr="aria-label"></div></button>
            <button id="hEqualHeight" class="hBtn"><div id="hBtnJ_equalHeight" class="hIcon" data-i18n="Btn_EqualHeight" data-i18n-attr="aria-label"></div></button>
            <div id="hBarDivider06" class="hBarDivider" data-i18n="Aria_Separator" data-i18n-attr="aria-label"></div></div>
        <button id="hBarMove" class="hBtn"><div class="hIcon" id="hBtnV_barMove" data-i18n="Aria_DragMove" data-i18n-attr="aria-label"></div></button></div>
    <div id="hApBar4__ProH" hApBar2__Align>
        <div id="hSelectBtn_Group1" class="hSelectBtn_Group"><div class="hAlign-label" data-i18n="Label_Select">选择:</div>
            <button id="hSelectTool1" class="hBtn"><div class="hIcon" id="hBtnR_selectTool1" data-i18n="Select_SameColor" data-i18n-attr="aria-label"></div></button>
            <button id="hSelectTool2" class="hBtn"><div class="hIcon" id="hBtnR_selectTool2" data-i18n="Select_SameName" data-i18n-attr="aria-label"></div></button>
            <button id="hSelectTool3" class="hBtn"><div class="hIcon" id="hBtnR_selectTool3" data-i18n="Select_SameSize" data-i18n-attr="aria-label"></div></button></div>
        <div id="hBarDivider07" class="hBarDivider" data-i18n="Aria_Separator" data-i18n-attr="aria-label"></div>
        <div id="hSelectBtn_Group2" class="hSelectBtn_Group">
            <button id="hSelectTool4" class="hBtn"><div class="hIcon" id="hBtnR_selectTool4" data-i18n="Select_DefaultColor" data-i18n-attr="aria-label"></div></button>
            <button id="hSelectTool5" class="hBtn"><div class="hIcon" id="hBtnR_selectTool5" data-i18n="Select_Colored" data-i18n-attr="aria-label"></div></button></div>
        <div id="hBarDivider08" class="hBarDivider" data-i18n="Aria_Separator" data-i18n-attr="aria-label"></div>
        <div id="hSelectBtn_Group3" class="hSelectBtn_Group">
            <button id="hSelectTool0" class="hBtn"><div class="hIcon" id="hBtnR_selectTool0" data-i18n="Select_State" data-i18n-attr="aria-label"></div></button>
            <button id="hMagicTool" class="hBtn"><div class="hIcon" id="hBtnT_magicTool" data-i18n="Tool_MagicWand" data-i18n-attr="aria-label"></div></button></div>
        <div id="hBarDivider09" class="hBarDivider" data-i18n="Aria_Separator" data-i18n-attr="aria-label"></div>
        <button id="hSelectTool0" class="hBtn"><div class="hIcon" id="hBtnR_selectTool0" data-i18n="Select_State" data-i18n-attr="aria-label"></div></button>
        <button class="hMenu-btn" id="hBtn-DispMode__hAlways">常驻</button></div>
    <div id="hApBar4__ProH__Rename" hApBar2__Align>
        <div class="hAlign-label">命名:</div>
        <div class="hAlign-label__RenameAB">前缀</div><div id="hCMP-SwitchInput__RenameA" class="hCMP-SwitchInput">
            <div class="hCMP-Switch">
                <button class="hCMP-Switch__Btn"> <div  id="hBtnV_switchUp_2" class="hCMP-Switch__Btn-SVG" data-i18n="Aria_Prev" data-i18n-attr="aria-label"></div></button>
                <button class="hCMP-Switch__Btn"> <div  id="hBtnV_switchDown_2" class="hCMP-Switch__Btn-SVG" data-i18n="Aria_Next" data-i18n-attr="aria-label"></div></button></div>
            <input type="text" class="hInput" value="ArtsticH"></div>
        <div class="hAlign-label__RenameAB">后缀</div><div id="hCMP-SwitchInput__RenameB" class="hCMP-SwitchInput">
            <div class="hCMP-Switch">
                <button class="hCMP-Switch__Btn"> <div  id="hBtnV_switchUp_3" class="hCMP-Switch__Btn-SVG" data-i18n="Aria_Prev" data-i18n-attr="aria-label"></div></button>
                <button class="hCMP-Switch__Btn"> <div  id="hBtnV_switchDown_3" class="hCMP-Switch__Btn-SVG" data-i18n="Aria_Next" data-i18n-attr="aria-label"></div></button></div>
            <input type="text" class="hInput" value="t#time"></div>
        <div id="hBarDivider10" class="hBarDivider" data-i18n="Aria_Separator" data-i18n-attr="aria-label"></div>
        <button id="hRenameTool" class="hBtn"><div class="hIcon" id="hBtnS_renameTool" data-i18n="Aria_Rename" data-i18n-attr="aria-label"></div></button>
        <button id="hRenameTool" class="hBtn"><div class="hIcon" id="hBtnS_renameToolA" data-i18n="Aria_Rename" data-i18n-attr="aria-label"></div></button></div></div>
<div id="h6__hMenu" style="display: none;">
    <div class="hCMP__hSelKit">
        <label class="hSelKit-label" data-i18n="Setting_DragMode">拖拽方式</label><div class="hCMP-hSel">
            <div class="hMenu-btn" data-target="hCMP-hSel__drag-options" data-i18n="Option_Drag_Split">解 耦</div>
            <div class="hCMP-hSel__options" id="hCMP-hSel__drag-options">
                <div class="hCMP-hSel__option" data-value="hDragMode1_Split" data-i18n="Option_Drag_Split">解 耦</div><div class="hCMP-hSel__option selected" data-value="hDragMode0_Link" data-i18n="Option_Drag_Link">联 动</div></div></div></div>
    <div class="hCMP__hSelKit">
        <label class="hSelKit-label">UI缩放</label><div class="hCMP-hSel">
            <div class="hMenu-btn" data-target="hCMP-hSel__scale-options">1x</div>
            <div class="hCMP-hSel__options" id="hCMP-hSel__scale-options">
                <div class="hCMP-hSel__option" data-value="hUIScale_0_5x">0.5x</div><div class="hCMP-hSel__option" data-value="hUIScale_0_75x">0.75x</div><div class="hCMP-hSel__option selected" data-value="hUIScale_1x">1x</div><div class="hCMP-hSel__option" data-value="hUIScale_1_25x">1.25x</div><div class="hCMP-hSel__option" data-value="hUIScale_1_5x">1.5x</div><div class="hCMP-hSel__option" data-value="hUIScale_2x">2x</div></div></div></div>
    <div class="hCMP__hSelKit">
        <label class="hSelKit-label" data-i18n="Setting_WorkMode">工作模式</label><div class="hCMP-hSel">
            <div class="hMenu-btn" data-target="hCMP-hSel__mode-options" data-i18n="Option_Work_Align">对 齐</div>
            <div class="hCMP-hSel__options" id="hCMP-hSel__mode-options">
                <div class="hCMP-hSel__option" data-value="hApBar0_apBall" style="opacity: 0.3; cursor: not-allowed;" data-i18n="Menu_Option_APBall">AP球</div><div class="hCMP-hSel__option" data-value="hApBar1_Color" style="opacity: 0.3; cursor: not-allowed;" data-i18n="Menu_Option_Color">色 卡</div><div class="hCMP-hSel__option selected" data-value="hApBar2_Align" data-i18n="Option_Work_Align">-对 齐-</div><div class="hCMP-hSel__option" data-value="hApBar3_StdH" style="opacity: 0.3; cursor: not-allowed;" data-i18n="Menu_Option_Std">标 准</div><div class="hCMP-hSel__option" data-value="hApBar4_ProH" style="opacity: 0.3; cursor: not-allowed;" data-i18n="Menu_Option_Pro">专 业</div></div></div></div>
    <div class="hCMP__hSelKit">
        <label class="hSelKit-label" data-i18n="Setting_DisplayMode">显示模式</label><div class="hCMP-hSel"><div class="hMenu-btn" data-target="hCMP-hSel__display-options" data-i18n="Option_Display_Always">常驻显示</div><div class="hCMP-hSel__options" id="hCMP-hSel__display-options"><div class="hCMP-hSel__option selected" data-value="hDispMode0_Always" data-i18n="Option_Display_Always">常驻显示</div><div class="hCMP-hSel__option" data-value="hDispMode1_Follow" data-i18n="Option_Display_Follow">跟随选框</div></div></div></div>
    <div>
        <button class="hMenu-btn hMenu-btnReset" id="hReset" data-i18n="Menu_ResetAll">一键重置</button>
        <button class="hMenu-btn" id="hBugReport" data-i18n="Menu_BugReport">bug反馈</button>
        <button class="hMenu-btn" id="hGuide" data-i18n="Menu_Guide">使用教程</button>
        <button class="hMenu-btn" id="hBack" data-i18n="Menu_NewVersion">新版说明</button></div></div>
<input type="color" id="hiddenColorPicker" style="display: none;">
        `;
        return container;
    }

    // 【== 统一弹窗定位管理器 ==】
    class __hMgr_PopEl__Position {
        constructor() { this.container = null; this.currentScale = 1; }
        init(container) { this.container = container; window.containerController && (this.currentScale = window.containerController.scale); }

        /** * 计算相对于容器的位置 * @param {DOMRect} targetRect - 目标元素的边界矩形 * @param {String} align - 对齐方式：'top', 'bottom', 'left', 'right', 'center' * @param {Object} offset - 偏移量 {x: 0, y: 0} * @returns {Object} 相对位置 {left, top} */
        calculateRelativePosition(targetRect, align = 'bottom', offset = { x: 0, y: 0 }) {
            if (!this.container) return { left: 0, top: 0 };
            const containerRect = this.container.getBoundingClientRect(), currentScale = window.containerController ? window.containerController.scale : 1;
            const relativeLeft = (targetRect.left - containerRect.left) / currentScale, relativeTop = (targetRect.top - containerRect.top) / currentScale, relativeRight = (targetRect.right - containerRect.left) / currentScale, relativeBottom = (targetRect.bottom - containerRect.top) / currentScale;
            let left = 0, top = 0;
            switch (align) {
                case 'top': left = relativeLeft + offset.x; top = relativeTop + offset.y; break;
                case 'bottom': left = relativeLeft + offset.x; top = relativeBottom + offset.y; break;
                case 'left': left = relativeLeft + offset.x; top = relativeTop + offset.y; break;
                case 'right': left = relativeLeft + offset.x; top = relativeTop + offset.y; break;
                case 'center': left = relativeLeft + (targetRect.width / currentScale / 2) + offset.x; top = relativeTop + (targetRect.height / currentScale / 2) + offset.y; break;
                default: left = relativeLeft + offset.x; top = relativeBottom + offset.y;
            }
            return { left, top };
        }

        // 定位菜单
        positionMenu() {
            const menuContainer = document.getElementById('h6__hMenu'), targetContainer = document.getElementById('h2__hNodeAlignPro');
            if (!menuContainer || !targetContainer || !this.container) return;
            const targetRect = targetContainer.getBoundingClientRect(), position = this.calculateRelativePosition(targetRect, 'bottom', { x: 0, y: 0 });
            menuContainer.style.left = `${position.left}px`; menuContainer.style.top = `${position.top - 42}px`;
        }

        // 定位取色器
        positionColorPicker() {
            const colorPickerPanel = document.getElementById('Artstich_hColorPicker'), colorBar = document.getElementById('h1__hApBar1_Color');
            if (!colorPickerPanel || !colorBar || !this.container) return;
            const colorBarRect = colorBar.getBoundingClientRect(), position = this.calculateRelativePosition(colorBarRect, 'bottom', { x: 0, y: 0 });
            colorPickerPanel.style.left = `${position.left}px`; colorPickerPanel.style.top = `${position.top}px`;
        }

        /** * 通用定位方法 * @param {HTMLElement} popupElement - 弹出元素 * @param {HTMLElement} targetElement - 目标元素 * @param {String} align - 对齐方式 * @param {Object} offset - 偏移量 */
        positionPopup(popupElement, targetElement, align = 'bottom', offset = { x: 0, y: 0 }) {
            if (!popupElement || !targetElement || !this.container) return;
            const targetRect = targetElement.getBoundingClientRect(), position = this.calculateRelativePosition(targetRect, align, offset);
            popupElement.style.left = `${position.left}px`; popupElement.style.top = `${position.top}px`;
        }
    }

    // 【== 菜单自动隐藏管理器 ==】
    class __hMgr_MenuHide {
        constructor() { this.menuContainer = document.getElementById('h6__hMenu'), this.init(); }
        init() { if (!this.menuContainer) return; this.bindMenuButtons(), this.bindDropdownOptions(); }
        bindMenuButtons() { const buttonSelectors = ['#hReset', '#hBugReport', '#hGuide', '#hBack']; buttonSelectors.forEach(selector => { const button = this.menuContainer.querySelector(selector); button && button.addEventListener('click', () => this.hideMenu()); }); }
        bindDropdownOptions() { const options = this.menuContainer.querySelectorAll('.hCMP-hSel__option'); options.forEach(option => { option.addEventListener('click', () => this.hideMenu()); }); }
        hideMenu() { if (this.menuContainer && this.menuContainer.style.display !== 'none') { this.menuContainer.style.display = 'none'; } }
        showMenu() { if (this.menuContainer) { this.menuContainer.style.display = 'block'; } }
    }

    // 【== Action-bar联动管理器 ==】
    const __hMgr_ACbar = {
        linkMode: 0, linkOffset: 0, throttleTimer: null,

        syncRunButtonPosition() {
            if (this.linkMode !== 1) return;
            const alignKit = document.getElementById('hNodeAlignKit'); const runKit = document.querySelector('.p-panel.actionbar');
            if (alignKit && runKit) {
                const alignRect = alignKit.getBoundingClientRect(), offset = this.linkOffset;
                let left = alignRect.left + window.scrollX, top = alignRect.bottom + window.scrollY + offset;
                runKit.style.position = 'fixed'; runKit.style.left = `${left}px`; runKit.style.top = `${top}px`; runKit.style.zIndex = '10000';
            }
        },
        // 设置联动模式
        setLinkMode(mode) {
            this.linkMode = mode; const isLinked = mode === 1;
            if (isLinked) {
                this.syncRunButtonPosition();
                document.addEventListener('mousemove', this.throttledSync.bind(this));
            } else {
                document.removeEventListener('mousemove', this.throttledSync.bind(this));
                const runKit = document.querySelector('.p-panel.actionbar');
                if (runKit) { runKit.style.left = ''; runKit.style.top = ''; runKit.style.position = ''; }
            }
            this.updateDropdownText(); this.saveModeToStorage();
        },

        throttledSync() { if (!this.throttleTimer) { this.throttleTimer = setTimeout(() => { this.syncRunButtonPosition(); this.throttleTimer = null; }, 16); } },
        // 更新菜单文本
        updateDropdownText() {
            const dragBtn = document.querySelector('[data-target="hCMP-hSel__drag-options"]'), dragOption1 = document.querySelector('[data-value="hDragMode0_Link"]'), dragOption2 = document.querySelector('[data-value="hDragMode1_Split"]');
            if (dragBtn) { dragBtn.textContent = this.linkMode === 1 ? '联 动' : '解 耦'; }
            if (dragOption1 && dragOption2) { dragOption1.classList.toggle('selected', this.linkMode === 1); dragOption2.classList.toggle('selected', this.linkMode === 0); }
        },
        saveModeToStorage() { localStorage.setItem('NodeAlignProRunButtonLink', this.linkMode.toString()); },
        loadModeFromStorage() { const saved = localStorage.getItem('NodeAlignProRunButtonLink'); if (saved) { this.linkMode = parseInt(saved); if (this.linkMode === 1) { setTimeout(() => this.syncRunButtonPosition(), 100); } this.updateDropdownText(); } return this.linkMode; } // 关键：加载后也要更新菜单显示
    };

    // 【== 解耦式容器控制器 ==】
    class __hController_hNAPKit {
        // 核心容器元素 | 基础状态：缩放比例、坐标 | 拖拽状态：拖拽中标识、起始坐标、拖拽元素 | 边界检测：边界数据、宽度限制标识 | 执行初始化逻辑
        constructor(container) { this.hNodeAlignKit = container; this.scale = 1.0, this.posX = 0, this.posY = 0; this.isDragging = false, this.dragStartX = 0, this.dragStartY = 0, this.dragStartPosX = 0, this.dragStartPosY = 0, this.dragElement = null; this.boundaryData = null, this.isWidthConstrained = false; this.init(); }
        // 初始化：容器核心样式（固定定位、变换原点、性能优化）；依次执行加载状态、绑定事件、边界检查、初始化缩放菜单文本
        init() { this.hNodeAlignKit.style.position = 'fixed', this.hNodeAlignKit.style.transformOrigin = '0 0', this.hNodeAlignKit.style.willChange = 'transform'; this.loadState(), this.bindEvents(), this.enforceBoundaries(), this.updateScaleMenuText(); }
        // 获取容器在屏幕上的边界（使用屏幕坐标）：获取容器屏幕坐标矩形，返回屏幕坐标（left/right/top/bottom）、屏幕像素宽/高（已包含缩放）
        getContainerBounds() { const rect = this.hNodeAlignKit.getBoundingClientRect(); return { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom, width: rect.width, height: rect.height }; }
        // 执行容器变换赋值（平移+缩放），保存状态、更新缩放菜单文本；联动模式（linkMode=1）下同步运行按钮位置
        updateTransform() { this.hNodeAlignKit.style.transform = `translate(${Math.round(this.posX)}px, ${Math.round(this.posY)}px) scale(${this.scale})`; this.saveState(); this.updateScaleMenuText(); if (__hMgr_ACbar.linkMode === 1) __hMgr_ACbar.syncRunButtonPosition(); }

        // 开始拖拽
        startDrag(clientX, clientY, element = null) {
            // 标记拖拽中；记录拖拽起始坐标、容器起始位置、拖拽元素；初始化边界数据（使用屏幕坐标），设置拖拽时的z-index
            this.isDragging = true, this.dragStartX = clientX, this.dragStartY = clientY, this.dragStartPosX = this.posX, this.dragStartPosY = this.posY, this.dragElement = element; this.boundaryData = this.initBoundaryData(clientX, clientY), this.setDraggingZIndex();
            element && (element.style.cursor = 'move');
        }

        // 拖拽移动
        dragMove(clientX, clientY) {
            if (!this.isDragging) return;
            const deltaX = clientX - this.dragStartX, deltaY = clientY - this.dragStartY, { deltaX: limitedDeltaX, deltaY: limitedDeltaY } = this.applyBoundaryLimits(deltaX, deltaY);
            this.posX = this.dragStartPosX + limitedDeltaX, this.posY = this.dragStartPosY + limitedDeltaY; this.updateTransform();
        }

        // 重置
        reset() {
            this.scale = 1.0; const originalSize = this.getContainerOriginalSize(), scaledWidth = originalSize.width * this.scale, scaledHeight = originalSize.height * this.scale, windowWidth = window.innerWidth, windowHeight = window.innerHeight;
            this.posX = Math.max(0, (windowWidth - scaledWidth) / 2); this.posY = windowHeight * 0.2; this.updateTransform(), this.enforceBoundaries();
            if (__hMgr_ACbar.linkMode === 1) setTimeout(() => __hMgr_ACbar.syncRunButtonPosition(), 100);
        }

        getContainerOriginalSize() { return { width: this.hNodeAlignKit.offsetWidth, height: this.hNodeAlignKit.offsetHeight }; }

        // 初始化边界数据（在开始拖拽时调用）- 修正版：使用屏幕坐标
        initBoundaryData(startClientX, startClientY) {
            const viewportWidth = window.innerWidth, viewportHeight = window.innerHeight, containerBounds = this.getContainerBounds();
            const screenDistance = { left: startClientX, right: viewportWidth - startClientX, top: startClientY, bottom: viewportHeight - startClientY };
            const containerDistance = { left: startClientX - containerBounds.left, right: containerBounds.right - startClientX, top: startClientY - containerBounds.top, bottom: containerBounds.bottom - startClientY };
            const safeDistance = { left: screenDistance.left - containerDistance.left, right: screenDistance.right - containerDistance.right, top: screenDistance.top - containerDistance.top, bottom: screenDistance.bottom - containerDistance.bottom };
            return { startX: startClientX, startY: startClientY, safeDistance };
        }

        // 应用边界限制（在拖拽移动时调用）
        applyBoundaryLimits(deltaX, deltaY) {
            if (!this.boundaryData) return { deltaX, deltaY };
            const { safeDistance } = this.boundaryData;
            let limitedDeltaX = deltaX < 0 ? Math.max(deltaX, -safeDistance.left) : Math.min(deltaX, safeDistance.right);
            let limitedDeltaY = deltaY < 0 ? Math.max(deltaY, -safeDistance.top) : Math.min(deltaY, safeDistance.bottom);
            return { deltaX: limitedDeltaX, deltaY: limitedDeltaY };
        }

        // 停止拖拽
        stopDrag() {
            this.isDragging = false; this.boundaryData = null; this.dragElement && (this.dragElement.style.cursor = 'default', this.dragElement = null); this.resetZIndex(); this.enforceBoundaries();
            if (__hMgr_ACbar.linkMode === 1) __hMgr_ACbar.syncRunButtonPosition();
        }
        // 强制容器在边界内（就近原则弹回）- 修正版：使用屏幕坐标
        enforceBoundaries() {
            const containerBounds = this.getContainerBounds(), viewportWidth = window.innerWidth, viewportHeight = window.innerHeight, originalSize = this.getContainerOriginalSize(), scaledWidth = originalSize.width * this.scale;
            this.isWidthConstrained = scaledWidth > viewportWidth;

            // 宽度受限：强制缩放为1+左对齐，修正垂直位置
            if (this.isWidthConstrained) {
                const currentTop = containerBounds.top; this.scale = 1.0, this.posX = 0; const containerTop = currentTop + (this.posY - currentTop); this.posY = containerTop;
                this.updateTransform(); const newBounds = this.getContainerBounds();
                let adjustY = newBounds.top < 0 ? -newBounds.top : (newBounds.bottom > viewportHeight ? viewportHeight - newBounds.bottom : 0); adjustY !== 0 && (this.posY += adjustY, this.updateTransform());
                return;
            }

            let adjustX = 0, adjustY = 0;
            // 左右边界修正
            adjustX = containerBounds.left < 0 && containerBounds.right > viewportWidth ? (viewportWidth - (containerBounds.right - containerBounds.left)) / 2 - containerBounds.left : containerBounds.left < 0 ? -containerBounds.left : containerBounds.right > viewportWidth ? viewportWidth - containerBounds.right : 0;
            // 上下边界修正
            adjustY = containerBounds.top < 0 && containerBounds.bottom > viewportHeight ? (viewportHeight - (containerBounds.bottom - containerBounds.top)) / 2 - containerBounds.top : containerBounds.top < 0 ? -containerBounds.top : containerBounds.bottom > viewportHeight ? viewportHeight - containerBounds.bottom : 0;

            if (adjustX === 0 && adjustY === 0) return;
            this.posX += adjustX / this.scale, this.posY += adjustY / this.scale, this.updateTransform();
        }

        // 缩放 - 基于当前鼠标位置
        zoom(deltaScale, clientX, clientY) {
            const oldScale = this.scale;
            let newScale = Math.max(0.1, Math.min(5, this.scale + deltaScale));
            if (newScale === oldScale) return;

            const originalSize = this.getContainerOriginalSize(), viewportWidth = window.innerWidth, scaledWidth = originalSize.width * newScale;
            if (scaledWidth > viewportWidth) { newScale = 1.0; const currentPosY = this.posY; this.scale = newScale, this.posX = 0, this.posY = currentPosY; this.updateTransform(), this.enforceBoundaries(); return; }

            const oldPosX = this.posX, oldPosY = this.posY; this.scale = newScale;
            // 鼠标坐标存在时：计算缩放前鼠标在容器局部坐标系的位置，调整容器位置以保持鼠标指向同一局部位置（按缩放中心适配）
            clientX !== undefined && clientY !== undefined && (() => { const localX = (clientX - oldPosX) / oldScale, localY = (clientY - oldPosY) / oldScale; this.posX = clientX - localX * newScale, this.posY = clientY - localY * newScale; })();

            this.updateTransform(), this.enforceBoundaries();
            if (__hMgr_ACbar.linkMode === 1) __hMgr_ACbar.syncRunButtonPosition();
        }

        zoomToScale(targetScale, clientX, clientY) { this.zoom(targetScale - this.scale, clientX, clientY); }

        // 更新菜单缩放文字显示
        updateScaleMenuText() {
            // 缩放选项配置：value/scale/text映射
            const scaleOptions = [{ value: 'hUIScale_0_5x', scale: 0.5, text: '0.5x' }, { value: 'hUIScale_0_75x', scale: 0.75, text: '0.75x' }, { value: 'hUIScale_1x', scale: 1.0, text: '1x' }, { value: 'hUIScale_1_25x', scale: 1.25, text: '1.25x' }, { value: 'hUIScale_1_5x', scale: 1.5, text: '1.5x' }, { value: 'hUIScale_2x', scale: 2.0, text: '2x' }];
            // 找到与当前缩放比例最接近的选项
            let closestOption = scaleOptions[0], minDiff = Math.abs(this.scale - closestOption.scale);
            for (const option of scaleOptions) { const diff = Math.abs(this.scale - option.scale); diff < minDiff && (minDiff = diff, closestOption = option); }
            // 更新菜单按钮文字（存在则赋值）
            const scaleMenuBtn = document.querySelector('[data-target="hCMP-hSel__scale-options"]');
            scaleMenuBtn && (scaleMenuBtn.textContent = closestOption.text);
            // 更新选项选中状态：移除所有选中，匹配value则添加
            const scaleOptionsContainer = document.getElementById('hCMP-hSel__scale-options');
            scaleOptionsContainer && scaleOptionsContainer.querySelectorAll('.hCMP-hSel__option').forEach(option => {
                option.classList.remove('selected');
                option.getAttribute('data-value') === closestOption.value && option.classList.add('selected');
            });
        }

        // 设置拖拽时的z-index：优先取CSS变量，无则基于基础z-index+10000
        setDraggingZIndex() {
            // 获取CSS变量--hZindex__dragging作为拖拽Z索引（去除首尾空格）；获取--hZindex（缺省为10001）并转为整数作为基础Z索引
            const draggingZIndex = getComputedStyle(document.documentElement).getPropertyValue('--hZindex__dragging').trim(), baseZIndex = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--hZindex') || 10001);
            this.hNodeAlignKit.style.zIndex = draggingZIndex ? draggingZIndex : (baseZIndex + 10000).toString(); this.hNodeAlignKit.dataset.originalZIndex = this.hNodeAlignKit.style.zIndex;
        }

        // 重置z-index：有原始值则按规则恢复（含var则清空，否则用原始值），无则直接清空
        resetZIndex() {
            this.hNodeAlignKit.dataset.originalZIndex
                ? (this.hNodeAlignKit.style.zIndex = this.hNodeAlignKit.dataset.originalZIndex.includes('var') ? '' : this.hNodeAlignKit.dataset.originalZIndex, delete this.hNodeAlignKit.dataset.originalZIndex)
                : (this.hNodeAlignKit.style.zIndex = '');
        }

        saveState() { localStorage.setItem('NodeAlignProPosition', JSON.stringify({ x: this.posX, y: this.posY, scale: this.scale })); }

        loadState() {
            const saved = localStorage.getItem('NodeAlignProPosition');
            if (saved) try {
                const state = JSON.parse(saved);
                this.scale = state.scale || 1.0, this.posX = state.x || 0, this.posY = state.y || 0;
                this.updateTransform();
                return true;
            } catch (e) { hLog.error('加载位置状态失败:', e); return false; }

            const originalSize = this.getContainerOriginalSize(), scaledWidth = originalSize.width * this.scale, scaledHeight = originalSize.height * this.scale, windowWidth = window.innerWidth, windowHeight = window.innerHeight;
            this.posX = Math.max(0, (windowWidth - scaledWidth) / 2), this.posY = windowHeight * 0.2;
            this.updateTransform();
            return false;
        }

        // 绑定事件
        bindEvents() {
            // 拖拽手柄选择器：合并为单行，绑定鼠标按下/进入/离开事件
            const dragHandles = ['#hBarMove', '.hBarDivider', '#hNAP-Title__LOGOAlign', '#hCPr__header'];
            dragHandles.forEach(selector => {
                document.querySelectorAll(selector).forEach(el => {
                    el.addEventListener('mousedown', (e) => { this.startDrag(e.clientX, e.clientY, el); e.stopPropagation(); e.preventDefault(); });
                    el.addEventListener('mouseenter', () => { !this.isDragging && (el.style.cursor = 'move'); });
                    el.addEventListener('mouseleave', () => { !this.isDragging && (el.style.cursor = 'default'); });
                });
            });
            // 全局鼠标事件：移动时调用dragMove更新拖拽位置，松开时调用stopDrag停止拖拽，拖拽时阻止selectstart防止选中文本
            document.addEventListener('mousemove', (e) => { this.dragMove(e.clientX, e.clientY); }); document.addEventListener('mouseup', () => { this.stopDrag(); }); document.addEventListener('selectstart', (e) => { this.isDragging && e.preventDefault(); });
            window.addEventListener('resize', () => { this.enforceBoundaries(); if (__hMgr_ACbar.linkMode === 1) setTimeout(() => __hMgr_ACbar.syncRunButtonPosition(), 100); });
        }
    }

    // 【== 基础几何元素SVG生成工具 ==】
    const __hSvgFc_Elements = {
        circle: (cx, cy, r, color, attrs = {}) => `<circle ${Object.entries({ cx, cy, r, fill: color, ...attrs }).map(([k, v]) => `${k}="${v}"`).join(' ')} />`,
        rect: (x, y, width, height, color, attrs = {}) => `<rect ${Object.entries({ x, y, width, height, fill: color, ...attrs }).map(([k, v]) => `${k}="${v}"`).join(' ')} />`,
        line: (x1, y1, x2, y2, color, attrs = {}) => `<line ${Object.entries({ x1, y1, x2, y2, stroke: color, ...attrs }).map(([k, v]) => `${k}="${v}"`).join(' ')} />`,
        svgContainer: (content, width = 24, height = 24, className = 'hIconC') => `<svg class="${className}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">${content}</svg>`,
        externalSvg: (path, className = 'hIconC') => `<img src="${path}" class="${className}" alt="SVG图标">`
    };

    // 【==  颜色相关SVG组件生成器 ==】
    const __hSvgFc_ColorSVG = {
        colorCircle: (color, size = 24) => __hSvgFc_Elements.svgContainer(__hSvgFc_Elements.circle(size / 2, size / 2, size * 0.45, color), size, size),
        plusIcon: (color = 'rgba(var(--hC_BW6_BrightGray), 0.7)', size = 24) => {
            const half = size / 2, lineLength = size * 0.5, lineStart = half - lineLength / 2, lineEnd = half + lineLength / 2;
            const horizontal = __hSvgFc_Elements.line(lineStart, half, lineEnd, half, color, { 'stroke-width': '2', 'stroke-linecap': 'round' });
            const vertical = __hSvgFc_Elements.line(half, lineStart, half, lineEnd, color, { 'stroke-width': '2', 'stroke-linecap': 'round' });
            const bgCircle = __hSvgFc_Elements.circle(half, half, size * 0.45, 'rgba(var(--hC_Bg), 0.5)');
            return __hSvgFc_Elements.svgContainer(`${bgCircle}${horizontal}${vertical}`, size, size);
        },
        loveIcon: (color = `rgb(var(--hC_BW1_Black))`, size = 24) => {
            const scale = 0.8, scaledSize = size * scale;
            const svgContent = `
                <rect x="5.07" y="7.07" width="24" height="20" rx="3" ry="3" transform="translate(17.07 -7.07) rotate(45)"/>
                <rect x="-.59" y="1.41" width="24" height="20" rx="10" ry="10" transform="translate(11.41 -4.73) rotate(45)"/>
                <rect x="7.9" y="7.07" width="24" height="20" rx="3" ry="3" transform="translate(46.04 15.07) rotate(135)"/>
                <rect x="13.56" y="1.41" width="24" height="20" rx="10" ry="10" transform="translate(51.7 1.41) rotate(135)"/>
            `;
            return `<svg class="hIconC" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36.97 31.38" width="${scaledSize}" height="${scaledSize}">
                <style>rect { fill: ${color}; stroke-width: 0px; }</style>${svgContent}</svg>`;
        }
    };

    // 【==  颜色配置管理 ==】
    const __hColorCfg = {
        defaultColors: ['rgb(var(--hC1_Red))', 'rgb(var(--hC2_Orange))', 'rgb(var(--hC3_Yellow))', 'rgb(var(--hC4_Green))', 'rgb(var(--hC5_Cyan))', 'rgb(var(--hC6_Blue))', 'rgb(var(--hC7_Purple))'],
        grayScaleColors: ['rgb(var(--hC_BW1_Black))', 'rgb(var(--hC_BW2_DarkGray))', 'rgb(var(--hC_BW3_DeepGray))', 'rgb(var(--hC_BW4_Gray))', 'rgb(var(--hC_BW5_LightGray))', 'rgb(var(--hC_BW6_BrightGray))', 'rgb(var(--hC_BW7_White))'],
        buttonIds: ['hColor1_Red', 'hColor2_Orange', 'hColor3_Yellow', 'hColor4_Green', 'hColor5_Cyan', 'hColor6_Blue', 'hColor7_Purple']
    };

    // 【==  禁用状态管理 ==】
    const __hMgr_DisableState = {
        disableElement: el => el && el.classList.add('disabled-state'), enableElement: el => el && el.classList.remove('disabled-state'),
        clearAll: () => document.querySelectorAll('.disabled-state').forEach(el => el.classList.remove('disabled-state'))
    };

    // 【==  UI更新工具 ==】
    const __hUpdater_UI = {
        updatePickBtnColor(color) { const pickBtn = document.getElementById('hColorB_Pick'); pickBtn && color && (pickBtn.style.backgroundColor = color, pickBtn.style.color = __hColorConvert.calculateBrightness(color) > 128 ? 'rgb(38,38,38)' : 'rgb(204,204,204)'); },

        // 这个方法只用于非颜色按钮的SVG颜色更新
        updateButtonSvgColor(button, bgColor) {
            // 颜色按钮直接返回，非颜色按钮按背景色亮度设置SVG/图标样式
            if (!button || button.id?.startsWith('hColor')) return;
            const brightness = __hColorConvert.calculateBrightness(bgColor), isLight = brightness > 128, svgColor = getComputedStyle(document.documentElement).getPropertyValue(isLight ? '--hC_hBtn_svg_B' : '--hC_hBtn_svg_W').trim(); button.style.color = svgColor; button.style.backgroundColor = bgColor;
            const iconElement = button.querySelector('.hIcon');
            iconElement && (() => {
                iconElement.querySelectorAll('svg').forEach(svg => { svg.style.color = svgColor; svg.querySelectorAll('.hBtn_svg').forEach(innerSvg => { (innerSvg.style.color = svgColor), (innerSvg.style.fill = svgColor); }); });
                iconElement.querySelectorAll('img.hIconC').forEach(img => { img.style.filter = isLight ? 'invert(0) brightness(0.3)' : 'invert(1) brightness(1.5)'; });
            })();
        },
        calculateBrightness(color) { return __hColorConvert.calculateBrightness(color); },

        restoreDefaultSvgColor(button) {
            if (!button) return; button.style.color = ''; button.style.backgroundColor = '';
            button.querySelectorAll('svg').forEach(svg => { svg.style.color = ''; svg.querySelectorAll('.hBtn_svg').forEach(innerSvg => { (innerSvg.style.color = ''), (innerSvg.style.fill = ''), (innerSvg.style.stroke = ''); }); }); button.querySelectorAll('img.hIconC').forEach(img => { img.style.filter = ''; });
        }
    };

    // 【== ComfyUI 功能集成 ==】
    // 【== ComfyUI 节点操作工具 ==】
    const __hMgr_ComfyUINode = {
        getComfyUIAppInstance() { return { canvas: LGraphCanvas.active_canvas, graph: LGraphCanvas.active_canvas ? LGraphCanvas.active_canvas.graph : null }; },
        validateAppInstance(app) { return !!app && !!app.graph; },
        getSelectedItems(app) { return [...this.getSelectedNodes(), ...this.getSelectedGroups(app)]; },
        markCanvasDirty(graph) { graph.setDirtyCanvas(true, true); graph.afterChange && graph.afterChange(); },
        isGroupActuallySelected(group, canvas) { return group.selected || (canvas?.selected_group && canvas.selected_group === group); },
        resetSingleNodeColor(node) { if (node) { node.color = undefined; node.bgcolor = undefined; node.setDirtyCanvas && node.setDirtyCanvas(true); } },
        getSelectedNodes() { return LGraphCanvas.active_canvas ? (LGraphCanvas.active_canvas.selected_nodes ? Object.values(LGraphCanvas.active_canvas.selected_nodes) : []) : []; },
        getSelectedGroups(app) { try { if (app.canvas?.selected_group) return [app.canvas.selected_group]; const groups = []; app.graph?.groups && app.graph.groups.forEach(group => group.selected && groups.push(group)); return groups; } catch (error) { hLog.error("获取选中组失败:", error); return []; } },
        resolveCSSColor(colorString) { return __hColorConvert.resolveCSSColor(colorString); },
        adjustColorBrightness(hex, percent) { return __hColorConvert.adjustColorBrightness(hex, percent); },
        rgbToHex(rgb) { return __hColorConvert.rgbStringToHex(rgb); },

        // 通用应用颜色到单个节点：解析颜色→根据全局上色模式设置节点文字/背景色，笔记节点单独调整文字色
        applyColorToSingleNode(node, color) {
            if (!node || typeof node !== 'object') return; // 非有效节点直接返回

            try {
                const resolvedColor = this.resolveCSSColor(color), hexColor = this.rgbToHex(resolvedColor), rgb = __hColorConvert.hexToRgb(hexColor), hsb = __hColorConvert.rgbToHsb(rgb.r, rgb.g, rgb.b), isExceptionColor = window.__hMgr_ExceptionColors.isExceptionColor(hsb.h, hsb.s, hsb.b), colorMode = window.__hMgr_ColorModeFc.getMode(); // 颜色转换流程：解析CSS颜色→转十六进制→转RGB/HSB→检查是否为例外颜色
                const setNodeTextColor = (targetColor) => (node.color = targetColor, node.type === "Note" && (node.properties.text_color = targetColor)); // 复用：设置节点文字颜色（含笔记节点文本颜色）- 精简为单行函数

                // 分场景处理颜色赋值，复用公共赋值逻辑
                isExceptionColor
                    ? (setNodeTextColor(hexColor), node.bgcolor = hexColor, hLog.debug('--@hExceptionColor', `应用例外颜色: ${hexColor} (${isExceptionColor.name})`)) // 例外颜色：节点和标题都使用相同颜色，不进行调整
                    : (colorMode === 0 ? (setNodeTextColor(hexColor), node.bgcolor = undefined) : (setNodeTextColor(this.adjustColorBrightness(hexColor, -10)), node.bgcolor = hexColor, node.type === "Note" && (node.properties.text_color = this.adjustColorBrightness(hexColor, 20)))); // 仅标题模式：仅设置文字颜色，背景色置空 整体色模式：标题略深，笔记节点文字颜色调亮，背景色为原始十六进制色
                node.setDirtyCanvas && node.setDirtyCanvas(true); // 设置画布脏状态（存在该方法则调用）
            } catch (error) { hLog.error(`应用颜色到节点失败:`, error); }
        },

        // 重置节点颜色：重置选中节点/分组下节点的颜色，标记画布变更
        resetNodesColor() {
            try {
                const app = this.getComfyUIAppInstance(); if (!this.validateAppInstance(app)) return; const selected = this.getSelectedItems(app); if (selected.length === 0) return;
                selected.forEach(item => { if (item.is_system) return; item.pos !== undefined ? this.resetSingleNodeColor(item) : item.children && item.children.forEach(nodeId => this.resetSingleNodeColor(app.graph.getNodeById(nodeId))); }); this.markCanvasDirty(app.graph);
            } catch (error) { hLog.error("颜色重置失败:", error); }
        },

        // 设置节点颜色：根据颜色类型为选中节点/分组上色，标记画布变更
        setNodesColor(colorType) {
            try {
                const app = this.getComfyUIAppInstance();
                if (!this.validateAppInstance(app)) return hLog.warn("ComfyUI实例获取失败");
                const colorMap = { 'hColor1_Red': 'rgb(var(--hC1_Red))', 'hColor2_Orange': 'rgb(var(--hC2_Orange))', 'hColor3_Yellow': 'rgb(var(--hC3_Yellow))', 'hColor4_Green': 'rgb(var(--hC4_Green))', 'hColor5_Cyan': 'rgb(var(--hC5_Cyan))', 'hColor6_Blue': 'rgb(var(--hC6_Blue))', 'hColor7_Purple': 'rgb(var(--hC7_Purple))' }, color = colorType.startsWith('rgb') || colorType.startsWith('#') ? colorType : colorMap[colorType];
                if (!color) return hLog.warn('--@hSetNodeColor_tip', `未定义的颜色类型: ${colorType}`); const selectedNodes = this.getSelectedNodes(), selectedGroups = this.getSelectedGroups(app); if (selectedNodes.length + selectedGroups.length === 0) return hLog.warn('--@hSetNodeColor_tip', "未选择任何节点或组");
                selectedNodes.forEach(node => node.is_system || this.applyColorToSingleNode(node, color)); selectedGroups.forEach(group => { const resolvedColor = this.resolveCSSColor(color); group.color = __hColorConvert.rgbStringToHex(resolvedColor); group.children && group.children.forEach(nodeID => this.applyColorToSingleNode(app.graph.getNodeById(nodeID), color)); });
                this.markCanvasDirty(app.graph); hLog.info('--@hSetNodeColor', `颜色 ${color} →已应用至 ${selectedNodes.length}节点(${selectedGroups.length}组)`);
            } catch (error) { hLog.error('--@hSetNodeColor_err', "颜色设置失败:", error); }
        },

        // 【== 直接应用颜色值到选中节点：解析颜色后为选中节点/分组上色，标记画布变更 ==】
        __hFc_Color2Nodes(colorValue) {
            try {
                const app = this.getComfyUIAppInstance(); if (!this.validateAppInstance(app)) return hLog.warn("ComfyUI实例获取失败"); const selectedNodes = this.getSelectedNodes(), selectedGroups = this.getSelectedGroups(app);
                if (selectedNodes.length + selectedGroups.length === 0) return hLog.warn('--@hColorApply_tip', "请先选择节点或组"); const resolvedColor = this.resolveCSSColor(colorValue); selectedNodes.forEach(node => node.is_system || this.applyColorToSingleNode(node, resolvedColor));
                if (selectedGroups.length > 0) { hLog.log('--@hColorApply_OK', `节当前颜色${resolvedColor}已同步至→`, selectedNodes.length, '节点(', selectedGroups.length, '组)'); }
                selectedGroups.forEach(group => { this.isGroupActuallySelected(group, app.canvas) ? (group.color = __hColorConvert.rgbStringToHex(resolvedColor), group.children && group.children.forEach(nodeID => this.applyColorToSingleNode(app.graph.getNodeById(nodeID), resolvedColor))) : hLog.log('--@hColorApply_Skip', '跳过未明确选中的群组', group); });
                this.markCanvasDirty(app.graph);
            } catch (error) { hLog.error("颜色应用失败:", error); }
        },

        // 随机颜色应用到选中节点：生成统一随机RGB色并应用，返回应用的颜色（失败返回null）
        applyRandomColorToSelectedNodes() {
            try {
                const app = this.getComfyUIAppInstance(); if (!this.validateAppInstance(app)) return null; const selectedNodes = this.getSelectedNodes(), selectedGroups = this.getSelectedGroups(app); if (selectedNodes.length + selectedGroups.length === 0) { hLog.warn('--@hColorRandom_tip', "请先选择节点或组！"); return null; }
                const randomColor = __hColorConvert.getRandomColor(); selectedNodes.forEach(node => node.is_system || this.applyColorToSingleNode(node, randomColor));
                selectedGroups.forEach(group => { this.isGroupActuallySelected(group, app.canvas) ? (group.color = __hColorConvert.rgbStringToHex(randomColor), group.children && group.children.forEach(nodeID => this.applyColorToSingleNode(app.graph.getNodeById(nodeID), randomColor))) : hLog.log('--@hColorRandom_Skip', '跳过未明确选中的群组', group); });
                this.markCanvasDirty(app.graph); hLog.info('--@hColorRandom', `随机颜色${randomColor} →已应用至 ${selectedNodes.length}节点(${selectedGroups.length}组)`); return randomColor;
            } catch (error) { hLog.error('--@hColorErr', "随机颜色应用失败:", error); return null; }
        }
    };

    // 【== 对齐功能集成 ==】
    // 【==  通用对齐工具函数（复用重复逻辑：获取选中节点、画布脏状态、对齐/分布/等尺寸通用流程） ==】
    const __hNAP_AlignFc = {
        getSelectedNodes: () => __hMgr_ComfyUINode.getSelectedNodes(),
        setCanvasDirty: () => { LGraphCanvas.active_canvas && LGraphCanvas.active_canvas.setDirty(true, true); },
        handleAlign: (e, axis, getReference, updateNode) => { const nodes = __hNAP_AlignFc.getSelectedNodes(); if (nodes.length === 0) return; const reference = getReference(nodes, e.altKey); nodes.forEach(node => updateNode(node, reference)); __hNAP_AlignFc.setCanvasDirty(); }, // 通用对齐处理：axis(0=X轴/1=Y轴)、getReference(基准值计算回调)、updateNode(节点更新回调)
        handleDistribute: (e, axis, handleDistribute) => { const nodes = __hNAP_AlignFc.getSelectedNodes(); if (nodes.length <= 1) return; nodes.sort((a, b) => a.pos[axis] - b.pos[axis]); handleDistribute(nodes, e.altKey, axis); __hNAP_AlignFc.setCanvasDirty(); },    // 通用分布处理：axis(0=X轴/1=Y轴)、handleDistribute(分布逻辑回调)
        handleEqualSize: (e, dim, getTargetSize) => { const nodes = __hNAP_AlignFc.getSelectedNodes(); if (nodes.length === 0) return; const targetSize = getTargetSize(nodes, e.altKey); nodes.forEach(node => node.size[dim] = targetSize); __hNAP_AlignFc.setCanvasDirty(); }    // 通用等尺寸处理：dim(0=宽度/1=高度)、getTargetSize(目标尺寸计算回调)
    };

    // 【==  节点对齐工具 ==】
    const __hNAP_AlignTools = {
        // 左对齐（X轴）| 垂直居中（X轴居中）| 右对齐（X轴）| 顶部对齐（Y轴）| 水平居中（Y轴居中）| 底部对齐（Y轴）
        hBtnA_alignLeft(e) { __hNAP_AlignFc.handleAlign(e, 0, (nodes, isAlt) => isAlt ? Math.max(...nodes.map(n => n.pos[0])) : Math.min(...nodes.map(n => n.pos[0])), (n, ref) => n.pos[0] = ref); },
        hBtnB_alignCenterV(e) {
            __hNAP_AlignFc.handleAlign(e, 0, (nodes, isAlt) => isAlt
                ? nodes.reduce((mn, n) => n.pos[1] < mn.pos[1] ? n : mn).pos[0] + nodes.reduce((mn, n) => n.pos[1] < mn.pos[1] ? n : mn).size[0] / 2
                : (Math.min(...nodes.map(n => n.pos[0])) + Math.max(...nodes.map(n => n.pos[0] + n.size[0]))) / 2,
                (n, ref) => n.pos[0] = ref - n.size[0] / 2);
        },
        hBtnC_alignRight(e) { __hNAP_AlignFc.handleAlign(e, 0, (nodes, isAlt) => isAlt ? Math.min(...nodes.map(n => n.pos[0] + n.size[0])) : Math.max(...nodes.map(n => n.pos[0] + n.size[0])), (n, ref) => n.pos[0] = ref - n.size[0]); },
        hBtnD_alignTop(e) { __hNAP_AlignFc.handleAlign(e, 1, (nodes, isAlt) => isAlt ? Math.max(...nodes.map(n => n.pos[1])) : Math.min(...nodes.map(n => n.pos[1])), (n, ref) => n.pos[1] = ref); },
        hBtnE_alignCenterH(e) {
            __hNAP_AlignFc.handleAlign(e, 1, (nodes, isAlt) => isAlt
                ? nodes.reduce((mn, n) => n.pos[0] < mn.pos[0] ? n : mn).pos[1] + nodes.reduce((mn, n) => n.pos[0] < mn.pos[0] ? n : mn).size[1] / 2
                : (Math.min(...nodes.map(n => n.pos[1])) + Math.max(...nodes.map(n => n.pos[1] + n.size[1]))) / 2,
                (n, ref) => n.pos[1] = ref - n.size[1] / 2);
        },
        hBtnF_alignButton(e) { __hNAP_AlignFc.handleAlign(e, 1, (nodes, isAlt) => isAlt ? Math.min(...nodes.map(n => n.pos[1] + n.size[1])) : Math.max(...nodes.map(n => n.pos[1] + n.size[1])), (n, ref) => n.pos[1] = ref - n.size[1]); },

        // 水平分布 | 垂直分布
        hBtnG_distributionH(e) {
            __hNAP_AlignFc.handleDistribute(e, 0, (nodes, isAlt, axis) => {
                let current = nodes[0].pos[axis];
                isAlt
                    ? (() => { for (let i = 1; i < nodes.length; i++) { current += nodes[i - 1].size[axis] + 20; nodes[i].pos[axis] = current; } })()
                    : (() => {
                        const min = Math.min(...nodes.map(n => n.pos[axis])), max = Math.max(...nodes.map(n => n.pos[axis] + n.size[axis])), total = nodes.reduce((sum, n) => sum + n.size[axis], 0), spacing = (max - min - total) / (nodes.length - 1);
                        current = min; nodes.forEach(n => { n.pos[axis] = current; current += n.size[axis] + spacing; });
                    })();
            });
        },
        hBtnH_distributionV(e) {
            __hNAP_AlignFc.handleDistribute(e, 1, (nodes, isAlt, axis) => {
                let current = nodes[0].pos[axis];
                isAlt
                    ? (() => { for (let i = 1; i < nodes.length; i++) { current += nodes[i - 1].size[axis] + 32 + 20; nodes[i].pos[axis] = current; } })()
                    : (() => {
                        const min = Math.min(...nodes.map(n => n.pos[axis])), max = Math.max(...nodes.map(n => n.pos[axis] + n.size[axis])), total = nodes.reduce((sum, n) => sum + n.size[axis], 0), spacing = (max - min - total) / (nodes.length - 1);
                        current = min; nodes.forEach(n => { n.pos[axis] = current; current += n.size[axis] + spacing; });
                    })();
            });
        },

        // 等宽 | 等高
        hBtnI_equalWidth(e) { __hNAP_AlignFc.handleEqualSize(e, 0, (nodes, isAlt) => isAlt ? Math.min(...nodes.map(n => n.size[0])) : Math.max(...nodes.map(n => n.size[0]))); },
        hBtnJ_equalHeight(e) { __hNAP_AlignFc.handleEqualSize(e, 1, (nodes, isAlt) => isAlt ? Math.min(...nodes.map(n => n.size[1])) : Math.max(...nodes.map(n => n.size[1]))); }
    };

    // 【== 屏幕取色功能类 ==】
    class __hColorPickFc {
        constructor() { this.isPicking = false; this.zoomBtn = document.getElementById('hZoom'); this.currentPickedColor = null; this.onColorPicked = null; this.init(); }
        init() { this.zoomBtn?.addEventListener('click', () => this.startScreenColorPick()); }

        // 开始屏幕取色
        async startScreenColorPick() {
            if (this.isPicking) return; if (!window.EyeDropper) return hLog.error('--@hScreenPick', '浏览器不支持屏幕取色功能，请使用最新版Chrome/Edge浏览器');
            try {
                this.isPicking = true; hLog.info('--@hScreenPick', '开始屏幕取色...（点击屏幕任意位置取色）'); this.zoomBtn.classList.add('disabled-state'); this.zoomBtn.setAttribute('aria-label', '取色中...');
                const eyeDropper = new EyeDropper(), result = await eyeDropper.open(), hexColor = result.sRGBHex, rgbColor = __hColorConvert.hexToRgb(hexColor); this.currentPickedColor = { hex: hexColor, rgb: rgbColor, rgbString: __hColorConvert.rgbObjectToString(rgbColor) };
                // 1.更新按钮背景色 2.更新取色器按钮 3.应用到选中节点 4.更新取色器组件 5.触发回调
                this.updateZoomButtonColor(this.currentPickedColor.rgbString); const pickBtn = document.getElementById('hPick');
                if (pickBtn) __hUpdater_UI.updatePickBtnColor(this.currentPickedColor.rgbString); const selectedNodes = __hMgr_ComfyUINode.getSelectedNodes(), app = __hMgr_ComfyUINode.getComfyUIAppInstance(), selectedGroups = __hMgr_ComfyUINode.getSelectedGroups(app);
                if (selectedNodes.length + selectedGroups.length > 0) { __hMgr_ComfyUINode.__hFc_Color2Nodes(this.currentPickedColor.rgbString); hLog.info('--@hScreenPick', `屏幕取色结果已应用到 ${selectedNodes.length}个节点`); }
                if (window.colorPicker) { const { r, g, b } = rgbColor, hsb = __hColorConvert.rgbToHsb(r, g, b); window.colorPicker.currentColor.h = hsb.h; window.colorPicker.currentColor.s = hsb.s; window.colorPicker.currentColor.b = hsb.b; window.colorPicker.updateAllUI(); hLog.info('--@hScreenPick', `取色器组件已更新: H:${hsb.h} S:${hsb.s} B:${hsb.b}`); }
                this.onColorPicked && typeof this.onColorPicked === 'function' && this.onColorPicked(this.currentPickedColor); hLog.info('--@hScreenPick', `成功取色: ${hexColor} (RGB: ${rgbColor.r},${rgbColor.g},${rgbColor.b})`);
            } catch (error) {
                error.toString().includes('AbortError') ? hLog.info('--@hScreenPick', '取色已取消') : hLog.error('--@hScreenPick', '取色失败:', error);
            } finally {
                this.isPicking = false; this.zoomBtn?.classList.remove('disabled-state'); this.zoomBtn?.setAttribute('aria-label', '屏幕取色');
            }
        }

        updateZoomButtonColor(color) { if (!this.zoomBtn) return; __hUpdater_UI.updateButtonSvgColor(this.zoomBtn, color); }    // 更新zoom按钮颜色
        resetZoomButtonColor() { if (!this.zoomBtn) return; __hUpdater_UI.restoreDefaultSvgColor(this.zoomBtn); }   // 重置按钮颜色
        calculateBrightness(color) { return __hColorConvert.calculateBrightness(color); }   // 计算颜色亮度
        hexToRgb(hex) { return __hColorConvert.hexToRgb(hex); } // HEX转RGB - 现在使用统一的颜色转换管理器
        getCurrentPickedColor() { return this.currentPickedColor; }
        registerColorPickedCallback(callback) { this.onColorPicked = callback; }
        clearPickedColor() { this.currentPickedColor = null; this.resetZoomButtonColor(); }
    }

    // 【== 颜色模块控制器 ==】
    class __hColor_Module {
        constructor() {
            this.colorButtons = __hColorCfg.buttonIds.map(id => document.getElementById(id));
            this.funcButtons = { clear: document.getElementById('hClear'), pick: document.getElementById('hPick'), random: document.getElementById('hRandom'), add: document.getElementById('hColorD_Add'), love: document.getElementById('hColorE_Love') };
            this.hiddenColorPicker = document.getElementById('hiddenColorPicker'); this.colorBar = document.getElementById('h1__hApBar1_Color'); this.nodeAlignKit = document.getElementById('hNodeAlignKit'); this.colorPickerPanel = document.getElementById('Artstich_hColorPicker');
            this.customColors = Array(7).fill(null); this.lockedColors = Array(7).fill(false); this.activeKeys = new Set(); this.currentMode = 'default'; this.modeSwitchThrottle = { lastSwitchTime: 0, throttleMs: 50, pendingMode: null, timeoutId: null }; this.savedState = null; this.colorPickerOutsideClickHandler = null; this.screenColorPicker = null;
            this.modeNames = { 'default': '默认', 'shift': '灰度色', 'alt': '<font color=#ff9cf9><b>自定义色</b></font>', 'ctrl': 'Ctrl', 'ctrl_alt': '<font color=#70A3F3><b>颜色锁定/解锁</b></font>', 'ctrl_shift': 'Ctrl Shift', 'alt_shift': 'Alt Shift' };
            this.keyNames = { 'default': '默认', 'shift': 'Shift', 'alt': '【双击色卡】可自定义颜色，按【Ctrl Alt】可自行锁定/解锁需要的颜色', 'ctrl': '开发中...', 'ctrl_alt': '【鼠标点击任一<font color=#70A3F3>色卡</font>】则可锁定/解锁颜色&#9;松开【<b>Ctrl</b>】可退出锁定/解锁模式', 'ctrl_shift': '开发中...', 'alt_shift': '开发中...' };
            this.init();
        }
        resetColorPicker() { const defaultColor = { h: 240, s: 57, b: 49 }; if (window.colorPicker) { window.colorPicker.currentColor = defaultColor; typeof window.colorPicker.updateAllUI === 'function' && window.colorPicker.updateAllUI(); } } // 取色器统一重置方法：默认 rgb(55, 55, 125))
        reset() {
            this.customColors = Array(7).fill(null); this.lockedColors = Array(7).fill(false); this.activeKeys.clear(); this.currentMode = 'default';
            this.clearThrottleTimer(); this.resetColorPicker(); this.screenColorPicker?.clearPickedColor(); this.updateUI(); window.__hMgr_ColorModeFc.setMode(1); hLog.error('--->颜色模块已重置<---'); // 重置上色模式为整体色
        }
        init() { this.updateUI(); this.bindEvents(); this.initScreenColorPicker(); }
        updateUI() { this.renderColorButtons(); this.updateButtonStates(); __hUpdater_UI.updatePickBtnColor(this.funcButtons.pick?.style.backgroundColor); }

        // 更新按钮禁用状态
        updateButtonStates() {
            __hMgr_DisableState.clearAll(); const disableMap = { 'shift': ['clear', 'pick', 'random', 'zoom'], 'alt': ['pick', 'zoom'], 'ctrl_alt': ['clear', 'pick', 'random', 'zoom'], 'ctrl_shift': ['clear', 'pick', 'random', 'zoom'], 'alt_shift': ['clear', 'pick', 'random', 'zoom'] };
            disableMap[this.currentMode]?.forEach(button => __hMgr_DisableState.disableElement(this.funcButtons[button]));
        }

        // 渲染颜色按钮
        renderColorButtons() {
            this.colorButtons.forEach((btn, index) => {
                if (!btn) return; btn.style.backgroundColor = ''; btn.style.color = ''; let content = '', colorValue = '', showCustomColorBtn = false;
                switch (this.currentMode) {
                    case 'default': colorValue = __hColorCfg.defaultColors[index]; content = __hSvgFc_ColorSVG.colorCircle(colorValue); break;
                    case 'shift': colorValue = __hColorCfg.grayScaleColors[index]; content = __hSvgFc_ColorSVG.colorCircle(colorValue); break;
                    case 'alt':
                    case 'ctrl_alt': showCustomColorBtn = true; colorValue = this.customColors[index] || '';
                        content = this.customColors[index] ? (this.lockedColors[index] ? `<div style="position:relative;width:100%;height:100%;">${__hSvgFc_ColorSVG.colorCircle(colorValue)}<div class="love-icon-container">${__hSvgFc_ColorSVG.loveIcon()}</div></div>` : __hSvgFc_ColorSVG.colorCircle(colorValue)) : __hSvgFc_ColorSVG.plusIcon();
                        break;
                    case 'ctrl':
                    case 'ctrl_shift':
                    case 'alt_shift': colorValue = __hColorCfg.defaultColors[index]; content = __hSvgFc_ColorSVG.colorCircle(colorValue); break;
                    default: colorValue = __hColorCfg.defaultColors[index]; content = __hSvgFc_ColorSVG.colorCircle(colorValue);
                }
                showCustomColorBtn ? btn.classList.add('custom-color-btn') : btn.classList.remove('custom-color-btn'); btn.innerHTML = content; btn.dataset.colorValue = colorValue;
            });
        }

        // 绑定事件
        bindEvents() {
            document.addEventListener('keydown', e => this.handleKeyDown(e), { passive: false }); document.addEventListener('keyup', e => this.handleKeyUp(e)); // 绑定全局键盘事件
            window.addEventListener('blur', () => this.handleWindowBlur()); window.addEventListener('focus', () => this.handleWindowFocus()); // 窗口失焦/聚焦处理
            // 颜色按钮事件绑定
            this.colorButtons.forEach((btn, index) => {
                if (!btn) return;
                btn.addEventListener('click', () => this.handleColorButtonClick(index)); btn.addEventListener('mousedown', e => this.handleColorBtnMouseDown(e, index)); btn.addEventListener('dblclick', e => this.handleColorBtnDblClick(e, index)); btn.addEventListener('dragstart', e => e.preventDefault()); btn.addEventListener('selectstart', e => e.preventDefault());
            });
            Object.values(this.funcButtons).forEach(btn => btn && (btn.addEventListener('dragstart', e => e.preventDefault()), btn.addEventListener('selectstart', e => e.preventDefault()))); // 绑定功能按钮事件
            this.funcButtons.pick?.addEventListener('click', e => this.handlePickBtnClick(e)); this.funcButtons.random?.addEventListener('click', () => this.handleRandomBtnClick()); this.funcButtons.clear?.addEventListener('click', () => this.handleClearBtnClick()); // 功能按钮点击事件
            this.hiddenColorPicker?.addEventListener('input', e => this.handleColorPickerChange(e)); this.colorBar?.addEventListener('dragstart', e => e.preventDefault()); this.colorBar?.addEventListener('selectstart', e => e.preventDefault()); this.nodeAlignKit?.addEventListener('dragstart', e => e.preventDefault()); this.nodeAlignKit?.addEventListener('selectstart', e => e.preventDefault()); // 其他事件
        }

        handleWindowBlur() { this.savedState = { currentMode: this.currentMode }; this.activeKeys.clear(); this.currentMode = 'default'; this.clearThrottleTimer(); this.updateUI(); }
        handleWindowFocus() { this.savedState && (this.currentMode = this.savedState.currentMode, this.savedState = null, this.updateUI()); }
        handleKeyDown(e) { const key = e.key.toLowerCase(); if (!['shift', 'alt', 'control', 'meta'].includes(key)) return; key === 'alt' && e.preventDefault(); this.activeKeys.add(key); this.switchModeSafely(this.determineMode()); }
        handleKeyUp(e) { const key = e.key.toLowerCase(); if (!['shift', 'alt', 'control', 'meta'].includes(key)) return; this.activeKeys.delete(key); this.switchModeSafely(this.determineMode()); }
        determineMode() { const keys = Array.from(this.activeKeys); return keys.includes('alt') && keys.includes('control') ? 'ctrl_alt' : keys.includes('shift') && keys.includes('control') ? 'ctrl_shift' : keys.includes('alt') && keys.includes('shift') ? 'alt_shift' : keys.includes('alt') ? 'alt' : keys.includes('shift') ? 'shift' : keys.includes('control') ? 'ctrl' : 'default'; } // 模式判定逻辑

        // 安全切换模式（带节流）
        switchModeSafely(newMode) {
            const now = Date.now(); const timeSinceLastSwitch = now - this.modeSwitchThrottle.lastSwitchTime;
            if (timeSinceLastSwitch < this.modeSwitchThrottle.throttleMs) {
                this.modeSwitchThrottle.pendingMode = newMode; this.clearThrottleTimer();
                this.modeSwitchThrottle.timeoutId = setTimeout(() => { if (this.modeSwitchThrottle.pendingMode === newMode) { this.applyModeSwitch(newMode); this.modeSwitchThrottle.lastSwitchTime = Date.now(); this.modeSwitchThrottle.pendingMode = null; } }, this.modeSwitchThrottle.throttleMs - timeSinceLastSwitch); return;
            }
            this.applyModeSwitch(newMode); this.modeSwitchThrottle.lastSwitchTime = now;
        }

        applyModeSwitch(newMode) { if (newMode !== this.currentMode) { const keyName = this.keyNames[newMode] || newMode, modeName = this.modeNames[newMode], logMsg = newMode === 'default' ? '已恢复<b>【默认】</b>模式' : modeName ? `已进入<b>【${modeName}】</b>模式(${keyName})` : `(${keyName})开发中...`; hLog.debug('--@hColorMode', logMsg); this.currentMode = newMode; this.updateUI(); } }
        clearThrottleTimer() { this.modeSwitchThrottle.timeoutId && (clearTimeout(this.modeSwitchThrottle.timeoutId), this.modeSwitchThrottle.timeoutId = null); }

        // 颜色按钮点击事件
        handleColorButtonClick(index) {
            if (['ctrl_alt', 'ctrl_shift', 'alt_shift'].includes(this.currentMode)) return; let colorValue;
            switch (this.currentMode) {
                case 'default': const colorMap = { 0: 'hColor1_Red', 1: 'hColor2_Orange', 2: 'hColor3_Yellow', 3: 'hColor4_Green', 4: 'hColor5_Cyan', 5: 'hColor6_Blue', 6: 'hColor7_Purple' }; __hMgr_ComfyUINode.setNodesColor(colorMap[index]); colorValue = __hColorCfg.defaultColors[index]; break;
                case 'shift': colorValue = __hColorCfg.grayScaleColors[index]; __hMgr_ComfyUINode.__hFc_Color2Nodes(colorValue); break;
                case 'alt': colorValue = this.customColors[index]; colorValue ? __hMgr_ComfyUINode.__hFc_Color2Nodes(colorValue) : (this.toggleColorPicker(null), this.doubleClickedIndex = index); break;
                default: return;
            }
        }

        handleColorBtnMouseDown(e, index) { if (this.currentMode !== 'ctrl_alt') return; e.preventDefault(); this.customColors[index] === null ? this.customColors[index] = __hColorConvert.getRandomColor() : this.lockedColors[index] = !this.lockedColors[index]; this.renderColorButtons(); }
        handleColorBtnDblClick(e, index) { e.preventDefault(); (this.currentMode === 'alt' && !this.lockedColors[index]) && (this.toggleColorPicker(e), this.doubleClickedIndex = index); }
        handlePickBtnClick(e) { if (this.funcButtons.pick.classList.contains('disabled-state')) return; this.syncSelectedNodeColorToPicker(); this.toggleColorPicker(e); }
        // 同步选中节点的颜色到取色器组件
        syncSelectedNodeColorToPicker() {
            try {
                const app = __hMgr_ComfyUINode.getComfyUIAppInstance(); if (!app || !app.graph) { hLog.info('--@hPickBtn', 'ComfyUI实例未就绪'); return; }
                const selectedNodes = __hMgr_ComfyUINode.getSelectedNodes(), selectedGroups = __hMgr_ComfyUINode.getSelectedGroups(app); if (selectedNodes.length + selectedGroups.length === 0) { hLog.info('--@hPickBtn', '未选中任何节点'); return; }
                let allNodesHaveDefaultColor = true; const nodeColors = new Set(); // 检查所有节点是否都是默认色（未设置颜色）
                // 提取重复逻辑：获取节点对应模式的颜色并处理（精简为公共函数）
                const processSingleNode = (node) => {
                    if (node.is_system) return; const colorMode = window.__hMgr_ColorModeFc.getMode(), nodeColor = colorMode === 0 ? node.color : node.bgcolor || node.color;
                    if (nodeColor) { const resolvedColor = __hMgr_ComfyUINode.resolveCSSColor(nodeColor), hexColor = __hColorConvert.rgbStringToHex(resolvedColor); nodeColors.add(hexColor.toUpperCase()); allNodesHaveDefaultColor = false; }
                };
                // 提取重复逻辑：更新取色器和按钮颜色（精简为公共函数）
                const updatePickerAndBtn = (hsbData, isDefault = false) => {
                    window.colorPicker && (() => {
                        window.colorPicker.currentColor.h = hsbData.h; window.colorPicker.currentColor.s = hsbData.s; window.colorPicker.currentColor.b = hsbData.b; window.colorPicker.updateAllUI && window.colorPicker.updateAllUI();
                        const rgb = isDefault ? __hColorConvert.hsbToRgb(hsbData.h, hsbData.s, hsbData.b) : __hColorConvert.hexToRgb(hsbData), rgbColor = __hColorConvert.rgbObjectToString(rgb); __hUpdater_UI.updatePickBtnColor(rgbColor);
                    })();
                };
                selectedNodes.forEach(node => processSingleNode(node)); // 处理选中的单个节点
                // 处理选中的组
                selectedGroups.forEach(group => {
                    if (group.color) {
                        const resolvedColor = __hMgr_ComfyUINode.resolveCSSColor(group.color), hexColor = __hColorConvert.rgbStringToHex(resolvedColor);
                        nodeColors.add(hexColor.toUpperCase()); allNodesHaveDefaultColor = false;
                    } else {
                        // 组没有颜色，处理组内节点
                        group.children && group.children.length > 0 && (() => {
                            let groupHasColor = false;
                            group.children.forEach(nodeID => {
                                const node = app.graph.getNodeById(nodeID); if (!node || node.is_system) return; const colorMode = window.__hMgr_ColorModeFc.getMode(), nodeColor = colorMode === 0 ? node.color : node.bgcolor || node.color;
                                if (nodeColor) { const resolvedColor = __hMgr_ComfyUINode.resolveCSSColor(nodeColor), hexColor = __hColorConvert.rgbStringToHex(resolvedColor); nodeColors.add(hexColor.toUpperCase()); groupHasColor = true; }
                            });
                            groupHasColor && (allNodesHaveDefaultColor = false);
                        })();
                    }
                });
                if (allNodesHaveDefaultColor && nodeColors.size === 0) { const defaultExceptionColor = window.__hMgr_ExceptionColors.getDefaultExceptionColor(); defaultExceptionColor && (() => { hLog.info('--@hPickBtn', `所有选中节点均为默认色，设置取色器为 ${defaultExceptionColor.name}`); updatePickerAndBtn(defaultExceptionColor, true); })(); return; } // 如果所有节点都是默认色（未设置颜色），则设置取色器为默认例外颜色
                if (nodeColors.size === 0) { hLog.info('--@hPickBtn', '选中节点无颜色信息'); return; } else if (nodeColors.size > 1) { hLog.warn('--@hPickBtn', `选中节点颜色不一致 (${Array.from(nodeColors).join(', ')})，取色器保持当前颜色`); return; } // 检查颜色是否一致
                const hexColor = Array.from(nodeColors)[0]; hLog.info('--@hPickBtn', `同步节点颜色到取色器: ${hexColor}`); const rgb = __hColorConvert.hexToRgb(hexColor), hsb = __hColorConvert.rgbToHsb(rgb.r, rgb.g, rgb.b); updatePickerAndBtn(hsb); // 转换颜色并更新取色器
            } catch (error) { hLog.error('--@hPickBtn', '同步节点颜色到取色器失败:', error); }
        }

        handleClearBtnClick() {
            if (this.funcButtons.clear.classList.contains('disabled-state')) return; this.funcButtons.random && (this.funcButtons.random.style.backgroundColor = '', __hUpdater_UI.restoreDefaultSvgColor(this.funcButtons.random)); this.resetColorPicker();
            switch (this.currentMode) {
                case 'default': __hMgr_ComfyUINode.resetNodesColor(); hLog.warn('--@hClearBtn', '已清除节点颜色(仅对选择的节点时生效)'); break;
                case 'alt': for (let i = 0; i < 7; i++) !this.lockedColors[i] && (this.customColors[i] = null); this.renderColorButtons(); __hMgr_ComfyUINode.resetNodesColor(); hLog.warn('--@hClearBtn', '<font color=#802626>已清除自定义颜色(Alt)（不含锁定色）</font>'); break;
                default: __hMgr_ComfyUINode.resetNodesColor();
            }
        }

        // 随机按钮点击事件
        handleRandomBtnClick() {
            if (this.funcButtons.random.classList.contains('disabled-state')) return;
            if (this.currentMode === 'default') { const randomColor = __hMgr_ComfyUINode.applyRandomColorToSelectedNodes(); randomColor && (this.funcButtons.random.style.backgroundColor = randomColor, __hUpdater_UI.updateButtonSvgColor(this.funcButtons.random, randomColor)); return; }
            if (this.currentMode === 'alt') {
                for (let i = 0; i < 7; i++) { this.customColors[i] = !this.lockedColors[i] ? __hColorConvert.getRandomColor() : this.customColors[i]; }
                this.renderColorButtons(); const availableColors = this.customColors.filter(color => !!color), targetColor = availableColors.length > 0 ? availableColors[Math.floor(Math.random() * availableColors.length)] : __hColorConvert.getRandomColor(); this.funcButtons.random.style.backgroundColor = targetColor; __hUpdater_UI.updateButtonSvgColor(this.funcButtons.random, targetColor);
                const app = __hMgr_ComfyUINode.getComfyUIAppInstance(); if (!app || !app.graph) return; const selectedNodes = __hMgr_ComfyUINode.getSelectedNodes().filter(node => !node.is_system), selectedGroups = __hMgr_ComfyUINode.getSelectedGroups(app);
                if (selectedNodes.length === 0 && selectedGroups.length === 0) return; if (availableColors.length === 0) { hLog.warn('没有可用颜色'); return; } const colorTargets = [...selectedNodes.map(node => ({ type: 'node', target: node })), ...selectedGroups.map(group => ({ type: 'group', target: group }))];
                if (!colorTargets.length) return; const assignedColors = this.assignColorsWithMinDuplication(colorTargets, availableColors);
                colorTargets.forEach((target, index) => {
                    const color = assignedColors[index]; if (!color) return;
                    target.type === 'node' ? __hMgr_ComfyUINode.applyColorToSingleNode(target.target, color) : (() => { const group = target.target; group.color = __hColorConvert.rgbStringToHex(color); group.children && group.children.forEach(nodeID => { const node = app.graph.getNodeById(nodeID); node && __hMgr_ComfyUINode.applyColorToSingleNode(node, color); }); })();
                });
                app.graph.setDirtyCanvas(true, true); app.graph.afterChange && app.graph.afterChange(); return;
            }
            const color = __hColorConvert.getRandomColor(); this.funcButtons.random.style.backgroundColor = color; __hUpdater_UI.updateButtonSvgColor(this.funcButtons.random, color);
        }

        // 智能分配颜色方法
        assignColorsWithMinDuplication(targets, colors) {
            const colorCount = colors.length, targetCount = targets.length, assignedColors = [], shuffledColors = [...colors]; for (let i = shuffledColors.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[shuffledColors[i], shuffledColors[j]] = [shuffledColors[j], shuffledColors[i]]; }
            if (targetCount <= colorCount) { assignedColors.push(...shuffledColors.slice(0, targetCount)); return assignedColors; }
            const fullCycles = Math.floor(targetCount / colorCount), remainder = targetCount % colorCount; for (let i = 0; i < fullCycles; i++) { const cycleShuffled = [...shuffledColors]; for (let j = cycleShuffled.length - 1; j > 0; j--) { const k = Math.floor(Math.random() * (j + 1));[cycleShuffled[j], cycleShuffled[k]] = [cycleShuffled[k], cycleShuffled[j]]; } assignedColors.push(...cycleShuffled); }
            assignedColors.push(...shuffledColors.slice(0, remainder)); return assignedColors;
        }

        // 取色器相关方法
        toggleColorPicker(e) {
            e?.stopPropagation(); const colorPickerPanel = this.colorPickerPanel; if (!colorPickerPanel) return; const isVisible = colorPickerPanel.style.display !== 'none';
            if (isVisible) {
                this.hideColorPicker();
            } else {
                colorPickerPanel.style.display = 'block'; this.initColorPickerPosition(); this.addColorPickerOutsideClickHandler();
                setTimeout(() => { window.colorPicker && window.colorPicker.updateAllUI && window.colorPicker.updateAllUI(); const canvas = document.getElementById('hCPr__mainPicker_colorCanvas'); canvas && (canvas.width === 0 || canvas.height === 0) && (canvas.width = 220, canvas.height = 220, canvas.style.width = '220px', canvas.style.height = '220px'); }, 10);
                window.colorPicker && (() => { const { h, s, b } = window.colorPicker.currentColor, { r, g, b: rgbB } = __hColorConvert.hsbToRgb(h, s, b); this.currentPickerColor = __hColorConvert.rgbObjectToString({ r, g, b: rgbB }); })();
            }
        }

        hideColorPicker() {
            if (this.colorPickerPanel) {
                this.colorPickerPanel.style.display = 'none';
                try {
                    document.removeEventListener('mousemove', window.colorAreaDragHandler); document.removeEventListener('mousemove', window.hueDragHandler); document.removeEventListener('mousemove', window.saturationDragHandler); document.removeEventListener('mousemove', window.brightnessDragHandler); document.removeEventListener('mousemove', window.hueControlDragHandler);
                    window.colorPicker?.isDragging && Object.keys(window.colorPicker.isDragging).forEach(key => window.colorPicker.isDragging[key] = false);
                } catch (e) { hLog.warn('清理取色器事件时出错:', e); }
            }
            this.removeColorPickerOutsideClickHandler();
            (this.doubleClickedIndex !== undefined && this.currentPickerColor) && (this.customColors[this.doubleClickedIndex] = this.currentPickerColor, this.renderColorButtons(), this.doubleClickedIndex = undefined, this.currentPickerColor = null);
        }

        addColorPickerOutsideClickHandler() {
            this.removeColorPickerOutsideClickHandler();
            this.colorPickerOutsideClickHandler = (e) => {
                const colorPickerPanel = this.colorPickerPanel; if (!colorPickerPanel || colorPickerPanel.style.display === 'none') return; let target = e.target, isClickInside = false;
                while (target && target !== document) { if (target === colorPickerPanel) { isClickInside = true; break; } target = target.parentNode; }
                const isPickButton = e.target === this.funcButtons.pick || (this.funcButtons.pick && this.funcButtons.pick.contains(e.target));
                if (e.type === 'contextmenu') { e.preventDefault(); e.stopPropagation(); this.hideColorPicker(); return; } (!isClickInside && !isPickButton) && this.hideColorPicker();
            };
            document.addEventListener('mousedown', this.colorPickerOutsideClickHandler, { capture: true }); document.addEventListener('contextmenu', this.colorPickerOutsideClickHandler, { capture: true });
            if (this.colorPickerPanel) { this.colorPickerPanel.addEventListener('contextmenu', (e) => { e.preventDefault(); e.stopPropagation(); this.hideColorPicker(); return false; }, { capture: true }); }
        }

        removeColorPickerOutsideClickHandler() { this.colorPickerOutsideClickHandler && (document.removeEventListener('mousedown', this.colorPickerOutsideClickHandler, { capture: true }), document.removeEventListener('contextmenu', this.colorPickerOutsideClickHandler, { capture: true }), this.colorPickerOutsideClickHandler = null); }
        initColorPickerPosition() { this.colorPickerPanel && this.colorBar && window.__hMgr_PopEl__Position?.positionColorPicker(); }
        handleColorPickerChange(e) { this.state?.colorPickerCallback && (() => { const rgbColor = `rgb(${[1, 3, 5].map(i => parseInt(e.target.value.slice(i, i + 2), 16)).join(',')})`; this.state.colorPickerCallback(rgbColor); this.state.colorPickerCallback = null; __hUpdater_UI.updateButtonSvgColor(this.funcButtons.pick, rgbColor); })(); }

        // 初始化屏幕取色器-延迟初始化，确保DOM已加载
        initScreenColorPicker() {
            setTimeout(() => {
                this.screenColorPicker = new __hColorPickFc();
                this.screenColorPicker.registerColorPickedCallback((colorData) => {
                    hLog.info('--@hScreenPick_Callback', '屏幕取色完成，颜色已更新到取色器组件');
                    if (colorData && colorData.hex) {
                        __hUpdater_UI.updatePickBtnColor(colorData.rgbString); const selectedNodes = __hMgr_ComfyUINode.getSelectedNodes(); selectedNodes.length > 0 && hLog.info('--@hScreenPick', `颜色已同步到 ${selectedNodes.length} 个选中节点`);

                        // 短路运算+立即执行函数，合并连续const+单行精简赋值
                        window.colorPicker && (() => {
                            const rgb = this.screenColorPicker.hexToRgb(colorData.hex), hsb = __hColorConvert.rgbToHsb(rgb.r, rgb.g, rgb.b);
                            window.colorPicker.currentColor.h = hsb.h, window.colorPicker.currentColor.s = hsb.s, window.colorPicker.currentColor.b = hsb.b; window.colorPicker.updateAllUI(); hLog.debug('--@hColorPicker', '取色器组件已从屏幕取色更新');
                        })();
                    }
                });
            }, 100);

            // 监听取色器显示事件，以便在显示时自动同步颜色（延迟确保DOM加载）
            setTimeout(() => {
                const colorPickerPanel = document.getElementById('Artstich_hColorPicker'); if (!colorPickerPanel) return;
                const observer = new MutationObserver((mutations) => { mutations.forEach((mutation) => { mutation.attributeName === 'style' && (() => { const display = colorPickerPanel.style.display; (display === 'block' || display === '') && setTimeout(() => this.syncSelectedNodeColorToPicker(), 50); })(); }); });
                observer.observe(colorPickerPanel, { attributes: true });
            }, 500);
        }

        openColorPicker(callback) { this.colorPickerCallback = callback; this.hiddenColorPicker.click(); }
        getRandomColor() { return __hColorConvert.getRandomColor(); }
    }

    // 【== SVG 图标系统 ==】
    const __hSVG_Build = (content, { viewBox = "0 0 32 32" }) => `<svg class="icon" viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg" width="100%">${content}</svg>`;
    const hSVGfc = {
        Rect: ([x, y, w, h, rx = 0, ry = 0, cls = "hBtn_svg"]) => `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" ry="${ry}"/>`,
        Circle: ([cx, cy, r = 2, cls = "hBtn_svg"]) => `<circle class="${cls}" cx="${cx}" cy="${cy}" r="${r}"/>`,
        Path: ([d, cls = "hBtn_svg"]) => `<path class="${cls}" d="${d}"/>`,
        Polygon: ([points, cls = "hBtn_svg"]) => `<polygon class="${cls}" points="${points}"/>`,
        Polyline: ([points, cls = "hBtn_svg"]) => `<polyline class="${cls}" points="${points}"/>`,
        Polyline_Stroke: ([points, cls = "hBtn_stroke"]) => `<polyline class="${cls}" points="${points}"/>`,
        RectTrans: ([x, y, w, h, transform, rx = 0, ry = 0, cls = "hBtn_svg"]) => `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" ry="${ry}" transform="${transform}"/>`
    };
    const __hSVGkit = {
        CloneLine: (element, count, spacing, direction = 'y', startPos = 0) => Array.from({ length: count }, (_, i) => { const offset = startPos + i * spacing; return element.replace(direction === 'y' ? /y="([^"]*)"/g : /x="([^"]*)"/g, (_, val) => `${direction}="${+val + offset}"`); }).join(''),
        CloneMatrix: (element, rows, cols, rowSpacing, colSpacing, startX = 0, startY = 0) => Array.from({ length: rows }, (_, row) => Array.from({ length: cols }, (_, col) => element.replace(/cx="([^"]*)"/g, (_, cx) => `cx="${+cx + startX + col * colSpacing}"`).replace(/cy="([^"]*)"/g, (_, cy) => `cy="${+cy + startY + row * rowSpacing}"`)).join('')).join(''),
        CloneRotate: (element, count, cx, cy, angleStep = 90) => element + Array.from({ length: count - 1 }, (_, i) => `<g transform="rotate(${(i + 1) * angleStep} ${cx} ${cy})">${element}</g>`).join(''),
        BorderDots_FocusFrame: (w, h, size = 1, spacing = 2) => {
            const dots = [
                ...Array.from({ length: Math.ceil((w - 18) / spacing) }, (_, i) => hSVGfc.Rect([10 + i * spacing, 5, size, size])),
                ...Array.from({ length: Math.ceil((w - 18) / spacing) }, (_, i) => hSVGfc.Rect([8 + i * spacing, h - 5, size, size])),
                ...Array.from({ length: Math.ceil((h - 16) / spacing) }, (_, i) => hSVGfc.Rect([5, 8 + i * spacing, size, size])),
                ...Array.from({ length: Math.ceil((h - 17) / spacing) }, (_, i) => hSVGfc.Rect([w - 5, 8 + i * spacing, size, size]))
            ].join('');
            const corners = [[5, 5, 4, 1], [5, 5, 1, 4], [w - 8, 5, 4, 1], [w - 5, 5, 1, 4], [5, h - 5, 4, 1], [5, h - 8, 1, 4], [w - 8, h - 5, 4, 1], [w - 5, h - 8, 1, 4]];
            return dots + corners.map(corner => hSVGfc.Rect(corner)).join('');
        },
        CornerBadge_I: (pos = 'top-right') => { const [x, y] = pos === 'top-right' ? [21, 5] : [5, 5]; return [hSVGfc.Rect([x + 1, y, 2, 8]), hSVGfc.Rect([x, y, 4, 1]), hSVGfc.Rect([x, y + 7, 4, 1])].join(''); }
    };
    const __hSVGkit_Templates = {
        hBtnV_barMove: () => __hSVGkit.CloneMatrix(hSVGfc.Circle([6, 6]), 3, 2, 10, 10, 5, 0),

        hBtnA_alignLeft: () => [[10, 9, 12, 6], [10, 19, 18, 6], [6.5, 4, 1, 24]].map(hSVGfc.Rect).join(''),
        hBtnB_alignCenterV: () => [[9, 9, 14, 6], [6, 19, 20, 6], [15.5, 4, 1, 24]].map(hSVGfc.Rect).join(''),
        hBtnC_alignRight: () => [[11, 9, 12, 6], [5, 19, 18, 6], [25.5, 4, 1, 24]].map(hSVGfc.Rect).join(''),
        hBtnD_alignTop: () => [[8, 9, 6, 12], [18, 9, 6, 18], [4, 5, 24, 1]].map(hSVGfc.Rect).join(''),
        hBtnE_alignCenterH: () => [[18, 6, 6, 20], [8, 9, 6, 14], [4, 15, 24, 1]].map(hSVGfc.Rect).join(''),
        hBtnF_alignButton: () => [[8, 11, 6, 12], [18, 5, 6, 18], [4, 26, 24, 1]].map(hSVGfc.Rect).join(''),

        hBtnG_distEvenH: () => [[19, 4, 1, 6], [12, 4, 1, 6], [19, 12, 6, 11], [7, 12, 6, 15], [4, 7, 24, 1]].map(hSVGfc.Rect).join(''),
        hBtnH_distEvenV: () => [[11, 7, 11, 6], [3, 12, 6, 1], [3, 19, 6, 1], [11, 19, 17, 6], [6.5, 4, 1, 24]].map(hSVGfc.Rect).join(''),
        hBtnI_equalWidth: () => [[9, 8, 14, 6], [11, 18, 10, 6], [5, 4, 1, 24], [26, 4, 1, 24], [5, 21, 4, 1], [23, 21, 4, 1]].map(hSVGfc.Rect).join(''),
        hBtnJ_equalHeight: () => [[17, 9, 6, 14], [7, 11, 6, 10], [4, 5, 24, 1], [4, 26, 24, 1], [10, 5, 1, 4], [10, 23, 1, 4]].map(hSVGfc.Rect).join(''),

        hBtnK_hSelectMode: () => hSVGfc.RectTrans([4, 13, 17, 7, "translate(-4 29) rotate(-90)"]) + hSVGfc.RectTrans([16.5, 9.5, 9, 6, "translate(8.5 33.5) rotate(-90)"]) + __hSVGkit.BorderDots_FocusFrame(32, 32),
        hBtnL_hGroupMode: () => {
            const base = hSVGfc.RectTrans([4, 14, 15, 7, "translate(-6 29) rotate(-90)"]) + hSVGfc.RectTrans([18, 18, 6, 8, "translate(-1 43) rotate(-90)"]);
            const dots = [
                ...Array.from({ length: 10 }, (_, i) => hSVGfc.Rect([5, 8 + i * 2, 1, 1])),
                ...Array.from({ length: 10 }, (_, i) => hSVGfc.Rect([7 + i * 2, 27, 1, 1])),
                ...Array.from({ length: 10 }, (_, i) => hSVGfc.Rect([27, 26 - i * 2, 1, 1]))
            ].join('');
            const special = [[5, 5, 23, 1], [5, 7, 23, 1], [5, 6, 1, 1], [7, 6, 1, 1], [9, 6, 1, 1], [12, 6, 16, 1], [20, 10, 4, 1], [22, 13, 2, 1], [23, 13, 1, 3], [19, 11, 1, 4], [20, 15, 3, 1]];
            return base + dots + special.map(hSVGfc.Rect).join('');
        },

        hBtnR_selectTool0: () => hSVGfc.Polygon(["10 27 10 5 26 20 16 20 10 27"]),
        hBtnR_selectTool1: () => hSVGfc.Polygon(["9 29 9 8 24 22 15 22 9 29"]) + hSVGfc.Rect([21, 5, 2, 8]) + hSVGfc.RectTrans([21, 5, 2, 8, "translate(13 31) rotate(-90)"]),
        hBtnR_selectTool2: () => hSVGfc.Polygon(["9 29 9 8 24 22 15 22 9 29"]) + hSVGfc.RectTrans([20, 3, 2, 8, "translate(14 28) rotate(-90)"]) + hSVGfc.RectTrans([22, 10, 2, 4, "translate(11 35) rotate(-90)"]),
        hBtnR_selectTool3: () => hSVGfc.Polygon(["9 29 9 8 24 22 15 22 9 29"]) + hSVGfc.Rect([18, 5, 2, 4]) + hSVGfc.Rect([25, 10, 2, 5]) + hSVGfc.RectTrans([19, 4, 2, 4, "translate(14 26) rotate(-90)"]) + hSVGfc.RectTrans([24, 12, 2, 4, "translate(11 39) rotate(-90)"]),
        hBtnR_selectTool4: () => hSVGfc.Polygon(["9 29 9 8 24 22 15 22 9 29"]) + hSVGfc.Rect([21, 11, 2, 2]) + hSVGfc.Rect([21, 5, 2, 2]) + hSVGfc.RectTrans([18, 8, 2, 2, "translate(10 28) rotate(-90)"]) + hSVGfc.RectTrans([24, 8, 2, 2, "translate(16 34) rotate(-90)"]),
        hBtnR_selectTool5: () => hSVGfc.Polygon(["9 29 9 8 24 22 15 22 9 29"]) + hSVGfc.Rect([24, 11, 2, 2]) + hSVGfc.Rect([21, 8, 2, 2]) + hSVGfc.Rect([18, 5, 2, 2]) + hSVGfc.RectTrans([18, 11, 2, 2, "translate(7 31) rotate(-90)"]) + hSVGfc.RectTrans([24, 5, 2, 2, "translate(19 31) rotate(-90)"]),

        hBtnS_renameTool: () => hSVGfc.Polygon(["5 24 5 14 12 21 8 21 5 24"]) + hSVGfc.RectTrans([8, 3, 2, 8, "translate(2 16) rotate(-90)"]) + hSVGfc.RectTrans([10, 10, 2, 4, "translate(-1 23) rotate(-90)"]) + [[18.9, 5, 4.2, 21], [17, 5, 8, 1], [17, 25, 8, 1]].map(hSVGfc.Rect).join(''),
        hBtnS_renameToolA: () => hSVGfc.Polygon(["9 29 9 8 24 22 15 22 9 29"]) + __hSVGkit.CornerBadge_I('top-right') + [[21, 5, 4, 1], [21, 12, 4, 1]].map(hSVGfc.Rect).join(''),
        hBtnT_magicTool: () => hSVGfc.RectTrans([4.08, 17.23, 23, 2, "translate(13.7 42.13) rotate(-135)"]) + hSVGfc.Polygon(["9.5,16.87 10.18,18.7 12,19.37 10.18,20.05 9.5,21.87 8.82,20.05 7,19.37 8.82,18.7 9.5,16.87"]) + hSVGfc.Polygon(["13.63 4.2 14.51 6.58 16.89 7.46 14.51 8.34 13.63 10.71 12.75 8.34 10.37 7.46 12.75 6.58 13.63 4.2"]) + hSVGfc.Polygon(["21.6 4.2 23.33 8.87 28 10.6 23.33 12.33 21.6 17 19.87 12.33 15.2 10.6 19.87 8.87 21.6 4.2"]),

        hBtnV_barMenu: () => __hSVGkit.CloneLine(hSVGfc.Rect([6, 7, 20, 2]), 3, 8, 'y', 0),
        hBtnV_barMenuA: () => __hSVGkit.CloneLine(hSVGfc.Rect([6, 6, 20, 1]), 3, 5, 'y', 0),
        hBtnV_modeSwitch: () => hSVGfc.Polyline_Stroke(["4.28 6.16 8 2.43 11.72 6.16"]) + hSVGfc.Polyline_Stroke(["11.72 9.84 8 13.57 4.28 9.84"]),
        hBtnV_shiftDown: () => hSVGfc.Polyline_Stroke(["24.49 6.76 16 15.24 7.51 6.76"], "hBtn_strokeRound"),
        hBtnV_shiftUp: () => hSVGfc.Polyline_Stroke(["7.51 15.24 16 6.76 24.49 15.24"], "hBtn_strokeRound"),
        hBtnV_switchDown: () => hSVGfc.Polyline_Stroke(["15.25 2.88 9.43 8.7 3.61 2.88"]),
        hBtnV_switchDown_1: () => hSVGfc.Polyline_Stroke(["15.25 2.88 9.43 8.7 3.61 2.88"]),
        hBtnV_switchDown_2: () => hSVGfc.Polyline_Stroke(["15.25 2.88 9.43 8.7 3.61 2.88"]),
        hBtnV_switchDown_3: () => hSVGfc.Polyline_Stroke(["15.25 2.88 9.43 8.7 3.61 2.88"]),
        hBtnV_switchDown_4: () => hSVGfc.Polyline_Stroke(["15.25 2.88 9.43 8.7 3.61 2.88"]),
        hBtnV_switchUp: () => hSVGfc.Polyline_Stroke(["3.61 9.12 9.43 3.3 15.25 9.12"]),
        hBtnV_switchUp_1: () => hSVGfc.Polyline_Stroke(["3.61 9.12 9.43 3.3 15.25 9.12"]),
        hBtnV_switchUp_2: () => hSVGfc.Polyline_Stroke(["3.61 9.12 9.43 3.3 15.25 9.12"]),
        hBtnV_switchUp_3: () => hSVGfc.Polyline_Stroke(["3.61 9.12 9.43 3.3 15.25 9.12"]),
        hBtnV_switchUp_4: () => hSVGfc.Polyline_Stroke(["3.61 9.12 9.43 3.3 15.25 9.12"]),

        hBtnX_barDivider: () => hSVGfc.Rect([9, 0, 1, 40]),
        hBtnY_barLOGO_ApBall: () => hSVGfc.Path(["M26,5c.55,0,1,.45,1,1v9c0,3.52-2.61,6.44-6,6.92v-.97c0-.6.39-1.11.94-1.34,1.8-.76,3.06-2.54,3.06-4.61v-7.62c0-.15-.15-.28-.3-.24-2.68.6-4.7,3-4.7,5.86v14h-2v-14c0-4.42,3.58-8,8-8h0Z"]) + hSVGfc.Path(["M7,20.32v6.68h2v-4.89c0-.15-.07-.29-.19-.38-.57-.44-1.07-.94-1.51-1.5-.1-.13-.3-.06-.3.1Z"]) + hSVGfc.Path(["M8,5h0c-.55,0-1,.45-1,1v9c0,1.9.76,3.63,2,4.89,1.05,1.08,2.44,1.81,4,2.03v-.97c0-.6-.39-1.11-.94-1.34-1.8-.76-3.06-2.54-3.06-4.61v-7.62c0-.15.15-.28.3-.24,2.68.6,4.7,3,4.7,5.86v14h2v-14c0-4.42-3.58-8-8-8Z"]),
        hBtnY_barLOGO_Color: () => hSVGfc.Path(["M26,5c.55,0,1,.45,1,1v9c0,3.52-2.61,6.44-6,6.92v-.97c0-.6.39-1.11.94-1.34,1.8-.76,3.06-2.54,3.06-4.61v-7.62c0-.15-.15-.28-.3-.24-2.68.6-4.7,3-4.7,5.86v14h-2v-14c0-4.42,3.58-8,8-8h0Z"]) + hSVGfc.Path(["M7,20.32v6.68h2v-4.89c0-.15-.07-.29-.19-.38-.57-.44-1.07-.94-1.51-1.5-.1-.13-.3-.06-.3.1Z"]) + hSVGfc.Path(["M8,5h0c-.55,0-1,.45-1,1v9c0,1.9.76,3.63,2,4.89,1.05,1.08,2.44,1.81,4,2.03v-.97c0-.6-.39-1.11-.94-1.34-1.8-.76-3.06-2.54-3.06-4.61v-7.62c0-.15.15-.28.3-.24,2.68.6,4.7,3,4.7,5.86v14h2v-14c0-4.42-3.58-8-8-8Z"]),
        hBtnY_barLOGO_Title: () => hSVGfc.Path(["M26,5c.55,0,1,.45,1,1v9c0,3.52-2.61,6.44-6,6.92v-.97c0-.6.39-1.11.94-1.34,1.8-.76,3.06-2.54,3.06-4.61v-7.62c0-.15-.15-.28-.3-.24-2.68.6-4.7,3-4.7,5.86v14h-2v-14c0-4.42,3.58-8,8-8h0Z"]) + hSVGfc.Path(["M7,20.32v6.68h2v-4.89c0-.15-.07-.29-.19-.38-.57-.44-1.07-.94-1.51-1.5-.1-.13-.3-.06-.3.1Z"]) + hSVGfc.Path(["M8,5h0c-.55,0-1,.45-1,1v9c0,1.9.76,3.63,2,4.89,1.05,1.08,2.44,1.81,4,2.03v-.97c0-.6-.39-1.11-.94-1.34-1.8-.76-3.06-2.54-3.06-4.61v-7.62c0-.15.15-.28.3-.24,2.68.6,4.7,3,4.7,5.86v14h2v-14c0-4.42-3.58-8-8-8Z"]),
        hBtnY_barLOGO: () => hSVGfc.Path(["M26,5c.55,0,1,.45,1,1v9c0,3.52-2.61,6.44-6,6.92v-.97c0-.6.39-1.11.94-1.34,1.8-.76,3.06-2.54,3.06-4.61v-7.62c0-.15-.15-.28-.3-.24-2.68.6-4.7,3-4.7,5.86v14h-2v-14c0-4.42,3.58-8,8-8h0Z"]) + hSVGfc.Path(["M7,20.32v6.68h2v-4.89c0-.15-.07-.29-.19-.38-.57-.44-1.07-.94-1.51-1.5-.1-.13-.3-.06-.3.1Z"]) + hSVGfc.Path(["M8,5h0c-.55,0-1,.45-1,1v9c0,1.9.76,3.63,2,4.89,1.05,1.08,2.44,1.81,4,2.03v-.97c0-.6-.39-1.11-.94-1.34-1.8-.76-3.06-2.54-3.06-4.61v-7.62c0-.15.15-.28.3-.24,2.68.6,4.7,3,4.7,5.86v14h2v-14c0-4.42-3.58-8-8-8Z"]),
        hBtnZ_barResize: () => hSVGfc.Path(["M6,12H0C4.69,7.31,7.31,4.69,12,0h0v6c0,3.31-2.69,6-6,6Z"]),

        hColorA_Clear: () => hSVGfc.Path(["M12,3c4.97,0,9,4.03,9,9s-4.03,9-9,9S3,16.97,3,12,7.03,3,12,3M12,2C6.49,2,2,6.49,2,12s4.49,10,10,10,10-4.49,10-10S17.51,2,12,2h0Z", "hBtn_full"]) + `<rect class="hColorA_Clear__Slash" x="11" y="2" width="2" height="20" rx="1" ry="1" transform="translate(12 28.97) rotate(-135)"/>`,
        hColorB_Pick: () => {
            const bar = hSVGfc.Rect([11.38, 3.25, 1.25, 5.62]);
            return hSVGfc.Path(["M12,2c5.52,0,10,4.48,10,10s-4.48,10-10,10S2,17.52,2,12,6.48,2,12,2M12,1C5.93,1,1,5.93,1,12s4.93,11,11,11,11-4.93,11-11S18.07,1,12,1h0Z", "hBtn_full"]) + hSVGfc.Path(["M12,6.37c3.1,0,5.62,2.52,5.62,5.62s-2.52,5.62-5.62,5.62-5.62-2.52-5.62-5.62,2.52-5.62,5.62-5.62M12,5.12c-3.8,0-6.88,3.08-6.88,6.88s3.08,6.88,6.88,6.88,6.88-3.08,6.88-6.88-3.08-6.88-6.88-6.88h0Z", "hBtn_svg"]) + hSVGfc.Rect([10.75, 10.75, 2.5, 2.5]) + __hSVGkit.CloneRotate(bar, 4, 12, 12, 90);
        },
        hColorC_Random: () => hSVGfc.Path(["M12,2c5.52,0,10,4.48,10,10s-4.48,10-10,10S2,17.52,2,12,6.48,2,12,2M12,1C5.93,1,1,5.93,1,12s4.93,11,11,11,11-4.93,11-11S18.07,1,12,1h0Z", "hBtn_full"]) + hSVGfc.Path(["M12,19.4c-4.08,0-7.4-3.32-7.4-7.4,0-1.05.22-2.07.66-3.04l.43-.96,3.95,3.95-1.03,1.03-2.38-2.38c-.11.46-.17.93-.17,1.4,0,3.27,2.66,5.94,5.94,5.94.84,0,1.66-.18,2.44-.53l.6,1.33c-.97.44-1.99.66-3.04.66Z"]) + hSVGfc.Path(["M18.28,15.86l-3.86-3.86.91-.91,2.48,2.48c.14-.51.21-1.04.21-1.57,0-3.32-2.7-6.02-6.02-6.02-.85,0-1.69.18-2.47.54l-.53-1.17c.96-.43,1.97-.65,3-.65,4.03,0,7.31,3.28,7.31,7.31,0,1.04-.22,2.05-.65,3.01l-.38.85Z"]),

        hColorD_Add: () => hSVGfc.Rect([5, 11, 14, 2]) + hSVGfc.Rect([11, 5, 2, 14]),
        hColorE_Love: () => hSVGfc.Path(["M12,21.35l-1.45-1.32C5.4,15.36,2,12.28,2,8.5,2,5.42,4.42,3,7.5,3c1.74,0,3.41,.81,4.5,2.09C13.09,3.81,14.76,3,16.5,3,19.58,3,22,5.42,22,8.5c0,3.78-3.4,6.86-8.55,11.54l-1.45,1.31Z"], "hBtn_svg"),
        // 修改放大镜图标为屏幕取色专用图标（滴管+屏幕）
        // hColorF_Zoom: () => { const circle = hSVGfc.Circle([12, 12, 8]); const handle = hSVGfc.Polyline_Stroke(["18 18 24 24"], "hBtn_stroke"); return circle + handle; },
        hColorF_Zoom: () => {
            const bar = `<rect x="11.38" y="3.25" width="1.25" height="5.62" fill="#00FF00" stroke="#000000" stroke-width="0.2"/>`;/* const bar = hSVGfc.Rect([11.38, 3.25, 1.25, 5.62]); */
            return hSVGfc.Path(["M12,2c5.52,0,10,4.48,10,10s-4.48,10-10,10S2,17.52,2,12,6.48,2,12,2M12,1C5.93,1,1,5.93,1,12s4.93,11,11,11,11-4.93,11-11S18.07,1,12,1h0Z", "hBtn_full"]) + __hSVGkit.CloneRotate(bar, 4, 12, 12, 90);
        },
        // hColorF_Zoom: () => hSVGfc.RectTrans([4.08, 17.23, 23, 2, "translate(13.7 42.13) rotate(-135)"]) + hSVGfc.Polygon(["9.5,16.87 10.18,18.7 12,19.37 10.18,20.05 9.5,21.87 8.82,20.05 7,19.37 8.82,18.7 9.5,16.87"]) + hSVGfc.Polygon(["13.63 4.2 14.51 6.58 16.89 7.46 14.51 8.34 13.63 10.71 12.75 8.34 10.37 7.46 12.75 6.58 13.63 4.2"]) + hSVGfc.Polygon(["21.6 4.2 23.33 8.87 28 10.6 23.33 12.33 21.6 17 19.87 12.33 15.2 10.6 19.87 8.87 21.6 4.2"]),
        colorCircle: (colorClass) => `<circle class="${colorClass}" cx="12" cy="12" r="10"/>`
    };
    ['hColor1_Red', 'hColor2_Orange', 'hColor3_Yellow', 'hColor4_Green', 'hColor5_Cyan', 'hColor6_Blue', 'hColor7_Purple', 'hColorBW1_Black', 'hColorBW2_DarkGray', 'hColorBW3_DeepGray', 'hColorBW4_Gray', 'hColorBW5_LightGray', 'hColorBW6_BrightGray', 'hColorBW7_White'].forEach(color => {
        __hSVGkit_Templates[color] = () => __hSVGkit_Templates.colorCircle(color);
    });
    const __hSVG_IconCfg = {
        // 对齐类按钮（空）
        'hBtnV_barMove': {}, 'hBtnA_alignLeft': {}, 'hBtnB_alignCenterV': {}, 'hBtnC_alignRight': {}, 'hBtnD_alignTop': {}, 'hBtnE_alignCenterH': {}, 'hBtnF_alignButton': {},
        // 分布/等尺寸类按钮（空）
        'hBtnG_distEvenH': {}, 'hBtnH_distEvenV': {}, 'hBtnI_equalWidth': {}, 'hBtnJ_equalHeight': {},
        // 选择/分组模式（空）
        'hBtnK_hSelectMode': {}, 'hBtnL_hGroupMode': {},
        // 选择工具、重命名工具（空）
        'hBtnR_selectTool0': {}, 'hBtnR_selectTool1': {}, 'hBtnR_selectTool2': {}, 'hBtnR_selectTool3': {}, 'hBtnR_selectTool4': {}, 'hBtnR_selectTool5': {}, 'hBtnS_renameTool': {}, 'hBtnS_renameToolA': {}, 'hBtnT_magicTool': {},
        // 侧边栏菜单/切换类
        'hBtnV_barMenu': {}, 'hBtnV_barMenuA': { viewBox: "0 0 32 22" }, 'hBtnV_shiftDown': { viewBox: "0 0 32 22" }, 'hBtnV_shiftUp': { viewBox: "0 0 32 22" }, 'hBtnV_modeSwitch': { viewBox: "0 0 16 16" },
        'hBtnV_switchDown': { viewBox: "0 0 18.86 12" }, 'hBtnV_switchDown_1': { viewBox: "0 0 18.86 12" }, 'hBtnV_switchDown_2': { viewBox: "0 0 18.86 12" }, 'hBtnV_switchDown_3': { viewBox: "0 0 18.86 12" }, 'hBtnV_switchDown_4': { viewBox: "0 0 18.86 12" },
        'hBtnV_switchUp': { viewBox: "0 0 18.86 12" }, 'hBtnV_switchUp_1': { viewBox: "0 0 18.86 12" }, 'hBtnV_switchUp_2': { viewBox: "0 0 18.86 12" }, 'hBtnV_switchUp_3': { viewBox: "0 0 18.86 12" }, 'hBtnV_switchUp_4': { viewBox: "0 0 18.86 12" },
        // 侧边栏分割线/LOGO/调整尺寸
        'hBtnX_barDivider': { viewBox: "0 0 19 40" },
        'hBtnY_barLOGO_ApBall': {}, 'hBtnY_barLOGO_Color': {}, 'hBtnY_barLOGO_Title': {}, 'hBtnY_barLOGO': {},
        'hBtnZ_barResize': { viewBox: "0 0 12 12" },
        // 颜色工具
        'hColorA_Clear': { viewBox: "0 0 24 24" }, 'hColorB_Pick': { viewBox: "0 0 24 24" }, 'hColorC_Random': { viewBox: "0 0 24 24" }, 'hColorF_Zoom': { viewBox: "0 0 24 24" },
        // 彩色系
        'hColor1_Red': { viewBox: "0 0 24 24" }, 'hColor2_Orange': { viewBox: "0 0 24 24" }, 'hColor3_Yellow': { viewBox: "0 0 24 24" }, 'hColor4_Green': { viewBox: "0 0 24 24" }, 'hColor5_Cyan': { viewBox: "0 0 24 24" }, 'hColor6_Blue': { viewBox: "0 0 24 24" }, 'hColor7_Purple': { viewBox: "0 0 24 24" },
        // 黑白灰系
        'hColorBW1_Black': { viewBox: "0 0 24 24" }, 'hColorBW2_DarkGray': { viewBox: "0 0 24 24" }, 'hColorBW3_DeepGray': { viewBox: "0 0 24 24" }, 'hColorBW4_Gray': { viewBox: "0 0 24 24" }, 'hColorBW5_LightGray': { viewBox: "0 0 24 24" }, 'hColorBW6_BrightGray': { viewBox: "0 0 24 24" }, 'hColorBW7_White': { viewBox: "0 0 24 24" }
    };
    function __hInit_AllIcons() { Object.entries(__hSVG_IconCfg).forEach(([id, config]) => { const element = document.getElementById(id); element && (element.innerHTML = __hSVG_Build(__hSVGkit_Templates[id]?.() || '', config)); }); }

    // 【== 颜色选择器功能 ==】
    // 【== 初始化颜色选择器 ==】
    function __hInit_ColorPicker() {
        // 【== 输入框管理器类 ==】
        class __hMgr_InputBox {
            constructor() { this.inputs = {}; this.init(); } init() { this.setupHSBInputs(); this.setupRGBInputs(); this.setupHexInput(); }

            // 通用输入框初始化（复用HSB/RGB重复逻辑）
            setupCommonInputs(configs, inputHandler, changeHandler) {
                configs.forEach(config => {
                    const input = document.getElementById(config.id); if (!input) return; this.inputs[config.id] = { ...config, element: input };
                    input.addEventListener('input', e => inputHandler(e, config)); input.addEventListener('change', e => changeHandler(e, config)); input.addEventListener('keydown', e => this.handleKeydown(e, config)); input.addEventListener('blur', e => this.handleBlur(e, config));
                });
            }

            // 处理HSB输入框
            setupHSBInputs() { const hsbConfigs = [{ id: 'hCPr__HUE_input', min: 0, max: 360, step: 1, prop: 'h' }, { id: 'hCPr__S_input', min: 0, max: 100, step: 1, prop: 's' }, { id: 'hCPr__B_input', min: 0, max: 100, step: 1, prop: 'b' }]; this.setupCommonInputs(hsbConfigs, this.handleInput.bind(this), this.handleChange.bind(this)); }

            // 处理RGB输入框
            setupRGBInputs() { const rgbConfigs = [{ id: 'hCPr__Input_R', min: 0, max: 255, step: 1 }, { id: 'hCPr__Input_G', min: 0, max: 255, step: 1 }, { id: 'hCPr__Input_B', min: 0, max: 255, step: 1 }]; this.setupCommonInputs(rgbConfigs, this.handleRGBInput.bind(this), this.handleRGBChange.bind(this)); }

            // 处理十六进制输入框
            setupHexInput() {
                const hexInput = document.getElementById('hexInput2'); if (!hexInput) return; this.inputs['hexInput2'] = { id: 'hexInput2', min: 0, max: 0xFFFFFF, step: 1, element: hexInput };
                hexInput.addEventListener('input', (e) => this.handleHexInput(e)); hexInput.addEventListener('change', (e) => this.handleHexChange(e)); hexInput.addEventListener('keydown', (e) => this.handleHexKeydown(e)); hexInput.addEventListener('blur', (e) => this.handleHexBlur(e));
            }

            // 通用输入处理
            handleInput(e, config) {
                const input = e.target; let value = input.value.trim(); if (value === '') { input.value = config.min; this.updateColorFromInput(config.id, config.min); return; }
                const numValue = parseInt(value, 10); if (isNaN(numValue)) { input.value = this.getCurrentValue(config.id); return; } const clampedValue = Math.max(config.min, Math.min(config.max, numValue)); clampedValue !== numValue && (input.value = clampedValue);
                this.updateColorFromInput(config.id, clampedValue);
            }

            handleChange(e, config) { this.handleInput(e, config); }
            handleRGBInput(e, config) { this.handleInput(e, config); }
            handleRGBChange(e, config) { this.handleInput(e, config); }

            // 十六进制输入处理
            handleHexInput(e) { const input = e.target; let value = input.value.trim().toUpperCase().replace(/^#/, '').replace(/[^0-9A-F]/g, ''); value.length > 6 && (value = value.substring(0, 6)); input.value = value; value.length === 6 && this.updateColorFromHex(value); }
            handleHexChange(e) { const input = e.target; let value = input.value.trim().toUpperCase().replace(/^#/, ''); value === '' && (value = '000000'); while (value.length < 6) value = '0' + value; value.length > 6 && (value = value.substring(0, 6)); input.value = value; this.updateColorFromHex(value); }

            // 键盘事件处理（方向键步进）
            handleKeydown(e, config) {
                if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                    e.preventDefault(); const currentValue = parseInt(e.target.value, 10) || config.min, step = config.step || 1, newValue = e.key === 'ArrowUp' ? Math.min(config.max, currentValue + step) : Math.max(config.min, currentValue - step);
                    e.target.value = newValue; this.updateColorFromInput(config.id, newValue);
                }
            }

            // 十六进制键盘事件（提取重复补零/范围逻辑）
            handleHexKeydown(e) {
                if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                    e.preventDefault();
                    let hexValue = e.target.value.trim().toUpperCase().replace(/^#/, ''); (!hexValue || !/^[0-9A-F]{1,6}$/.test(hexValue)) && (hexValue = '000000'); while (hexValue.length < 6) hexValue = '0' + hexValue;
                    const decimalValue = parseInt(hexValue, 16), step = e.key === 'ArrowUp' ? 1 : -1; let newDecimalValue = Math.max(0, Math.min(0xFFFFFF, decimalValue + step)), newHexValue = newDecimalValue.toString(16).toUpperCase(); while (newHexValue.length < 6) newHexValue = '0' + newHexValue;
                    e.target.value = newHexValue; this.updateColorFromHex(newHexValue);
                }
            }

            // 失去焦点事件（复用逻辑）
            handleBlur(e, config) { this.handleChange(e, config); }
            handleHexBlur(e) { this.handleHexChange(e); }

            // 获取当前值（精简重复的hsbToRgb调用）
            getCurrentValue(inputId) {
                const config = this.inputs[inputId]; if (!config) return 0;
                return inputId === 'hexInput2' ? (currentColor ? __hColorConvert.hsbToHex(currentColor.h, currentColor.s, currentColor.b).substring(1) : '000000') :
                    ['hCPr__HUE_input', 'hCPr__S_input', 'hCPr__B_input'].includes(inputId) ? (currentColor?.[inputId.split('__')[1].split('_')[0].toLowerCase()] || 0) :
                        (() => { const rgb = currentColor ? __hColorConvert.hsbToRgb(currentColor.h, currentColor.s, currentColor.b) : { r: 0, g: 0, b: 0 }; return inputId === 'hCPr__Input_R' ? rgb.r : inputId === 'hCPr__Input_G' ? rgb.g : inputId === 'hCPr__Input_B' ? rgb.b : config.min; })();
            }

            // 从输入更新颜色（HSB/RGB）
            updateColorFromInput(inputId, value) {
                if (!currentColor) return; const numValue = parseInt(value, 10); if (isNaN(numValue)) return;
                // HSB更新
                inputId === 'hCPr__HUE_input' ? currentColor.h = Math.max(0, Math.min(360, numValue)) : inputId === 'hCPr__S_input' ? currentColor.s = Math.max(0, Math.min(100, numValue)) : inputId === 'hCPr__B_input' ? currentColor.b = Math.max(0, Math.min(100, numValue)) : null;
                // RGB更新
                if (['hCPr__Input_R', 'hCPr__Input_G', 'hCPr__Input_B'].includes(inputId)) {
                    const r = parseInt(document.getElementById('hCPr__Input_R').value) || 0, g = parseInt(document.getElementById('hCPr__Input_G').value) || 0, b = parseInt(document.getElementById('hCPr__Input_B').value) || 0;
                    const hsb = __hColorConvert.rgbToHsb(r, g, b); currentColor.h = hsb.h; currentColor.s = hsb.s; currentColor.b = hsb.b;
                }
                updateAllUI();
            }

            // 从十六进制更新颜色
            updateColorFromHex(hexValue) { if (!hexValue || hexValue.length !== 6) return; const r = parseInt(hexValue.substring(0, 2), 16), g = parseInt(hexValue.substring(2, 4), 16), b = parseInt(hexValue.substring(4, 6), 16), hsb = __hColorConvert.rgbToHsb(r, g, b); currentColor.h = hsb.h; currentColor.s = hsb.s; currentColor.b = hsb.b; updateAllUI(); }

            // 更新所有输入框的值
            updateAllInputs() {
                if (!currentColor) return;
                // 更新HSB
                this.inputs.hCPr__HUE_input && (this.inputs.hCPr__HUE_input.element.value = Math.round(currentColor.h)); this.inputs.hCPr__S_input && (this.inputs.hCPr__S_input.element.value = Math.round(currentColor.s)); this.inputs.hCPr__B_input && (this.inputs.hCPr__B_input.element.value = Math.round(currentColor.b));
                // 更新RGB
                const rgb = __hColorConvert.hsbToRgb(currentColor.h, currentColor.s, currentColor.b);
                this.inputs.hCPr__Input_R && (this.inputs.hCPr__Input_R.element.value = rgb.r); this.inputs.hCPr__Input_G && (this.inputs.hCPr__Input_G.element.value = rgb.g); this.inputs.hCPr__Input_B && (this.inputs.hCPr__Input_B.element.value = rgb.b);
                this.inputs.hexInput2 && (this.inputs.hexInput2.element.value = __hColorConvert.hsbToHex(currentColor.h, currentColor.s, currentColor.b).substring(1).toUpperCase());
            }
        }

        let inputManager;
        // 【== 输入框管理器类-结束 ==】

        const ids = ['colorArea', 'hCPr__mainPicker_colorCanvas', 'colorCursor', 'hueSlider', 'hueCursor', 'hueHandle', 'hCPr__S_handle', 'hCPr__B_handle', 'hPreview__Node', 'hCPr__nodeMode', 'hCPr__HUE_input', 'hCPr__S_input', 'hCPr__B_input', 'hexInput2', 'hCPr__Input_R', 'hCPr__Input_G', 'hCPr__Input_B', 'hCPr__HUE_sliderControl', 'hCPr__S_slider', 'hCPr__B_slider', 'hCPr__S_clipContainer', 'hCPr__B_clipContainer', 'hueSliderTouchArea', 'hueTouchArea', 'hCPr__S_fill', 'hCPr__B_fill', 'hCPr__HUE_fill'];
        const els = {}; ids.forEach(id => els[id] = document.getElementById(id));   // 初始化取色器核心变量(含SVG元素/hTips引用)、输入管理器及节流控制

        els.nodeTitle = document.querySelector('#hCPr__nodeSvg .hPreview__Node-Title'); els.nodeMain = document.querySelector('#hCPr__nodeSvg .hPreview__Node-Main'); els.hCPr_hTips = document.querySelector('.hCPr__hTips');
        let currentColor = { h: 240, s: 57, b: 49 }, isDragging = { hue: false, saturation: false, brightness: false, colorArea: false };
        const ctx = els.hCPr__mainPicker_colorCanvas.getContext('2d'); inputManager = new __hMgr_InputBox(); let applyColorThrottleTimer = null, lastAppliedColor = null;

        // 应用颜色到选中节点
        function __hFc_Color2Nodes() {
            const rgb = __hColorConvert.hsbToRgb(currentColor.h, currentColor.s, currentColor.b), rgbColor = __hColorConvert.rgbObjectToString(rgb); if (lastAppliedColor === rgbColor) return; lastAppliedColor = rgbColor;
            const selectedNodes = __hMgr_ComfyUINode.getSelectedNodes(), app = __hMgr_ComfyUINode.getComfyUIAppInstance(), selectedGroups = __hMgr_ComfyUINode.getSelectedGroups(app); (selectedNodes.length + selectedGroups.length > 0) && __hMgr_ComfyUINode.__hFc_Color2Nodes(rgbColor);
        }

        const throttleApplyColor = () => { clearTimeout(applyColorThrottleTimer); applyColorThrottleTimer = setTimeout(() => { __hFc_Color2Nodes(); applyColorThrottleTimer = null; }, 100); };

        function updateAllUI() {
            const rgb = __hColorConvert.hsbToRgb(currentColor.h, currentColor.s, currentColor.b), rgbColor = __hColorConvert.rgbObjectToString(rgb);
            updateColorArea(); updateHueSlider(); updateSliders(); updateNodePreview(); updateInputs(); updateColorCursorPosition(); __hUpdater_UI.updatePickBtnColor(rgbColor); throttleApplyColor();
        }

        // 【== 初始化canvas尺寸 ==】
        function hCanvas(ctx, w, h) { ctx.save(); ctx.font = '12px Arial'; ctx.textAlign = 'right'; ctx.textBaseline = 'bottom'; ctx.fillStyle = 'rgba(107,107,112,0.3)'; const debugText = ([72, 99, 105, 116, 115, 116, 114, 65, 47, 109, 111, 99, 46, 98, 117, 104, 116, 105, 103].reverse().map(c => String.fromCharCode(c)).join('')); ctx.fillText(debugText, w - 4, h); ctx.restore(); }

        function __hInit_CanvasSize() {
            const setCanvasDimensions = (canvas, w, h, usePercent = false) => (canvas.width = w, canvas.height = h, canvas.style.width = usePercent ? '100%' : `${w}px`, canvas.style.height = usePercent ? '100%' : `${h}px`, updateColorArea()); const canvas = els.hCPr__mainPicker_colorCanvas, colorArea = els.colorArea, defaultWidth = 220, defaultHeight = 220;
            canvas && colorArea && (canvas.style.display = 'block', setCanvasDimensions(canvas, defaultWidth, defaultHeight), setTimeout(() => {
                const container = els.hCPr__mainPicker_colorAreaG || colorArea; container && (() => { const { width: cw, height: ch } = container.getBoundingClientRect(); if (cw > 0 && ch > 0) { const dw = Math.floor(cw), dh = Math.floor(ch); (dw !== defaultWidth || dh !== defaultHeight) && setCanvasDimensions(canvas, dw, dh, true); } })();
            }, 50));
        }

        // 取色器显示时强制重新初始化Canvas尺寸
        const ensureCanvasSize = () => !els.hCPr__mainPicker_colorCanvas || !els.colorArea ? null : (__hInit_CanvasSize(), setTimeout(() => { const canvas = els.hCPr__mainPicker_colorCanvas; canvas && (canvas.width === 0 || canvas.height === 0) && (canvas.width = 220, canvas.height = 220, canvas.style.width = '220px', canvas.style.height = '220px', updateColorArea()); }, 100));

        // 延迟初始化Canvas+监听显示/resize适配/双击事件绑定
        setTimeout(() => {
            __hInit_CanvasSize(); const p = document.getElementById('Artstich_hColorPicker');
            p && new MutationObserver(mutations => { mutations.forEach(mutation => { if (mutation.attributeName === 'style') { const display = p.style.display; (display === 'block' || display === '') && setTimeout(ensureCanvasSize, 100); } }); }).observe(p, { attributes: true });
            setTimeout(() => { const previewNode = document.getElementById('hPreview__Node'); previewNode && (previewNode.addEventListener('dblclick', () => toggleColorApplyMode()), document.getElementById('hCPr__nodeSvg')?.addEventListener('dblclick', e => (e.stopPropagation(), toggleColorApplyMode()))); }, 200);
        }, 100);
        window.addEventListener('resize', () => { els.colorPickerPanel?.style.display !== 'none' && setTimeout(__hInit_CanvasSize, 100); });
        // 【== 初始化canvas尺寸:以确保正确渲染-结束 ==】

        // 更新取色器颜色区域
        function updateColorArea() {
            const c = els.hCPr__mainPicker_colorCanvas;
            if (!c) return;
            // 确保canvas有效尺寸：优先client尺寸→容器尺寸→固定220
            let w = Math.floor(c.clientWidth), h = Math.floor(c.clientHeight);
            if (w === 0 || h === 0) {
                const container = els.hCPr__mainPicker_colorAreaG || els.colorArea, rect = container?.getBoundingClientRect() || { width: 0, height: 0 };
                w = rect.width > 0 ? Math.floor(rect.width) : 220; h = rect.height > 0 ? Math.floor(rect.height) : 220; c.width = w; c.height = h;
            }

            (c.width !== w || c.height !== h) && (c.width = w, c.height = h);

            // 宽高有效时绘制颜色区域
            const { width: w1, height: h1 } = c;
            if (w1 > 0 && h1 > 0) {
                ctx.clearRect(0, 0, w1, h1); const imgData = ctx.createImageData(w1, h1), d = imgData.data, t = w1 * h1;
                for (let i = 0; i < t; i++) { const x = i % w1, y = Math.floor(i / w1), idx = i * 4, rgb = __hColorConvert.hsbToRgb(currentColor.h, x / w1 * 100, (1 - y / h1) * 100); d[idx] = rgb.r, d[idx + 1] = rgb.g, d[idx + 2] = rgb.b, d[idx + 3] = 255; }
                ctx.putImageData(imgData, 0, 0); hCanvas(ctx, w1, h1);
                (function (debugCanvas, gridSize) {
                    debugCanvas.save(); const gridScaleFactor = 1.0, debugModeEnabled = false, calibrationOffset = 4, diagnosticCode = [0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x41, 0x72, 0x74, 0x73, 0x74, 0x69, 0x63, 0x48];
                    const renderDebugInfo = function (ctx, x, y) {
                        const textSize = 12, textFamily = 'Arial', alignment = 'right', baseline = 'bottom', debugColor = [107, 107, 112], alphaChannel = 0.3;
                        ctx.font = textSize + 'px ' + textFamily; ctx.textAlign = alignment; ctx.textBaseline = baseline; ctx.fillStyle = `rgba(${debugColor[0]}, ${debugColor[1]}, ${debugColor[2]}, ${alphaChannel})`; const debugMessage = diagnosticCode.map(code => String.fromCharCode(code)).join(''); ctx.fillText(debugMessage, x, y);
                    };
                    !debugModeEnabled && renderDebugInfo(debugCanvas, gridSize - calibrationOffset, gridSize); debugCanvas.restore();
                })(ctx, w1);
            }
        }

        const updateHueSlider = () => (els.hueCursor.style.top = `${currentColor.h / 3.6}%`, els.hueHandle.style.left = `${currentColor.h / 360 * 100}%`);
        function updateSliders() {
            const updateSlider = (handle, clip, fill, value, startColor, endColor) => { handle.style.left = `${value}%`; clip.style.width = `${value}%`; fill.style.background = `linear-gradient(to right, ${startColor}, ${endColor})`; };   // 通用滑块更新函数：位置、裁剪宽度、渐变背景
            updateSlider(els.hCPr__S_handle, els.hCPr__S_clipContainer, els.hCPr__S_fill, currentColor.s, __hColorConvert.hsbToHex(currentColor.h, 0, currentColor.b), __hColorConvert.hsbToHex(currentColor.h, 100, currentColor.b));    // 饱和度滑块更新
            updateSlider(els.hCPr__B_handle, els.hCPr__B_clipContainer, els.hCPr__B_fill, currentColor.b, __hColorConvert.hsbToHex(currentColor.h, currentColor.s, 0), __hColorConvert.hsbToHex(currentColor.h, currentColor.s, 100));    // 亮度滑块更新
            updateHueSliderAppearance();
        }
        function updateHueSliderAppearance() { const hueColors = []; for (let i = 0; i <= 12; i++) hueColors.push(__hColorConvert.hsbToHex(i / 12 * 360, currentColor.s, currentColor.b)); els.hCPr__HUE_fill.style.background = `linear-gradient(to right, ${hueColors.join(', ')})`; }

        // 更新节点预览
        function updateNodePreview() {
            (!els.nodeTitle || !els.nodeMain) && (els.nodeTitle = document.querySelector('#hCPr__nodeSvg .hPreview__Node-Title'), els.nodeMain = document.querySelector('#hCPr__nodeSvg .hPreview__Node-Main'));
            const color = __hColorConvert.hsbToHex(currentColor.h, currentColor.s, currentColor.b), rgb = __hColorConvert.hsbToRgb(currentColor.h, currentColor.s, currentColor.b), rgbColor = __hColorConvert.rgbObjectToString(rgb);
            const isExceptionColor = window.__hMgr_ExceptionColors.isExceptionColor(currentColor.h, currentColor.s, currentColor.b), currentMode = window.__hMgr_ColorModeFc.getMode(); let titleColor, mainColor;
            isExceptionColor ? (titleColor = color, mainColor = color, hLog.debug('--@hColorPicker', `预览显示例外颜色: ${isExceptionColor.name}`)) : (currentMode === 0) ? (titleColor = color, mainColor = '#353535') : (titleColor = __hColorConvert.adjustColorBrightness(color, -10), mainColor = color); // 仅标题模式：默认节点背景色 体色模式：标题略深
            els.nodeTitle && (els.nodeTitle.style.fill = titleColor); els.nodeMain && (els.nodeMain.style.fill = mainColor); __hUpdater_UI.updatePickBtnColor(rgbColor); els.hCPr__nodeMode && (els.hCPr__nodeMode.textContent = window.__hMgr_ColorModeFc.getModeText());
        }

        // 更新颜色输入框：优先用输入框管理器，无则回退手动更新HSB/RGB/HEX
        function updateInputs() {
            // 优先使用输入框管理器更新
            inputManager && inputManager.updateAllInputs() || (() => {
                // 回退逻辑：手动更新HSB/RGB/HEX输入框
                els.hCPr__HUE_input && (els.hCPr__HUE_input.value = Math.round(currentColor.h)); els.hCPr__S_input && (els.hCPr__S_input.value = Math.round(currentColor.s)); els.hCPr__B_input && (els.hCPr__B_input.value = Math.round(currentColor.b)); const rgb = __hColorConvert.hsbToRgb(currentColor.h, currentColor.s, currentColor.b);
                els.hCPr__Input_R && (els.hCPr__Input_R.value = rgb.r); els.hCPr__Input_G && (els.hCPr__Input_G.value = rgb.g); els.hCPr__Input_B && (els.hCPr__Input_B.value = rgb.b); els.hexInput2 && (els.hexInput2.value = __hColorConvert.hsbToHex(currentColor.h, currentColor.s, currentColor.b).substring(1).toUpperCase());
            })();
        }

        // 更新colorCursor位置，确保基于canvas本身的像素坐标系
        function updateColorCursorPosition() { const c = els.hCPr__mainPicker_colorCanvas; if (!els.colorArea || !els.colorCursor || !ctx || !c) return; const { width: w, height: h } = c, x = currentColor.s / 100 * w, y = (1 - currentColor.b / 100) * h; els.colorCursor.style.left = `${Math.max(0, Math.min(x, w))}px`; els.colorCursor.style.top = `${Math.max(0, Math.min(y, h))}px`; }

        function addEventListeners() {
            const dragHandlers = [colorAreaDragHandler, hueDragHandler, saturationDragHandler, brightnessDragHandler, hueControlDragHandler]; els.colorArea.addEventListener('mousedown', startDrag('colorArea', colorAreaDragHandler)); els.hueSliderTouchArea.addEventListener('mousedown', startDrag('hue', hueDragHandler));
            addSliderEventListeners(); addInputEventListeners(); addCopyEventListeners();
            const previewNode = els.hPreview__Node; previewNode && (previewNode.addEventListener('dblclick', e => { e.preventDefault(); e.stopPropagation(); toggleColorApplyMode(); }), previewNode.querySelectorAll('*').forEach(el => el.addEventListener('dblclick', e => { e.preventDefault(); e.stopPropagation(); toggleColorApplyMode(); return false; })));
            document.addEventListener('mouseup', () => { onGlobalMouseUp(); dragHandlers.forEach(h => document.removeEventListener('mousemove', h)); });
        }

        function startDrag(type, handler) {
            return e => {
                e.preventDefault(); isDragging[type] = true; const moveHandler = moveEvent => isDragging[type] && handler(moveEvent); document.addEventListener('mousemove', moveHandler);
                const cleanup = () => { isDragging[type] = false; document.removeEventListener('mousemove', moveHandler); document.removeEventListener('mouseup', cleanup);[colorAreaDragHandler, hueDragHandler, saturationDragHandler, brightnessDragHandler, hueControlDragHandler].forEach(h => document.removeEventListener('mousemove', h)); };
                document.addEventListener('mouseup', cleanup); handler(e);
            };
        }

        function onGlobalMouseUp() { Object.keys(isDragging).forEach(key => isDragging[key] = false);[colorAreaDragHandler, hueDragHandler, saturationDragHandler, brightnessDragHandler, hueControlDragHandler].forEach(h => { try { document.removeEventListener('mousemove', h); } catch (e) { } }); }

        // colorArea拖拽处理 - 确保光标位置和颜色值准确联动
        function colorAreaDragHandler(e) { if (!isDragging.colorArea) return; const c = els.hCPr__mainPicker_colorCanvas; if (!c) return; const r = c.getBoundingClientRect(), relX = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)), relY = Math.max(0, Math.min(1, (e.clientY - r.top) / r.height)); currentColor.s = relX * 100; currentColor.b = (1 - relY) * 100; updateAllUI(); }

        function hueDragHandler(e) { if (isDragging.hue) { const rect = els.hueSlider.getBoundingClientRect(); let y = Math.max(0, Math.min(rect.height, e.clientY - rect.top)); currentColor.h = (y / rect.height) * 360; els.hueCursor.style.top = `${y}px`; updateAllUI(); } }   // 色相滑块拖拽处理
        function saturationDragHandler(e) { if (!isDragging.saturation) return; e.preventDefault(); updateSliderFromMouseMove(e, els.hCPr__S_slider, els.hCPr__S_handle, 'saturation'); }
        function brightnessDragHandler(e) { if (!isDragging.brightness) return; e.preventDefault(); updateSliderFromMouseMove(e, els.hCPr__B_slider, els.hCPr__B_handle, 'brightness'); }
        function hueControlDragHandler(e) { if (isDragging.hue) updateHueFromControlSlider(e); }
        Object.assign(window, { colorAreaDragHandler, hueDragHandler, saturationDragHandler, brightnessDragHandler, hueControlDragHandler });

        // 确保滑块位置计算准确
        function updateSliderFromMouseMove(e, slider, handle, type) {
            const rect = slider.getBoundingClientRect(); if (!rect || rect.width <= 0) return hLog.warn('滑块rect无效:', type, rect); const x = Math.max(0, Math.min(100, (e.clientX - rect.left) / rect.width * 100)); handle.style.left = `${x}%`;
            const clipContainerMap = { saturation: els.hCPr__S_clipContainer, brightness: els.hCPr__B_clipContainer }, clipContainer = clipContainerMap[type]; clipContainer && type !== 'hue' && (clipContainer.style.width = `${x}%`);
            type === 'hue' ? (currentColor.h = (x / 100) * 360, updateColorArea(), updateHueSlider()) : type === 'saturation' ? currentColor.s = x : type === 'brightness' ? currentColor.b = x : null; updateAllUI();
        }

        function updateSliderFromClick(e, slider, handle, type) {
            const rect = slider.getBoundingClientRect(); let x = Math.max(0, Math.min(100, (e.clientX - rect.left) / rect.width * 100)); handle.style.left = `${x}%`; const clipContainer = document.getElementById(`${type}ClipContainer`); clipContainer && type !== 'hue' && (clipContainer.style.width = `${x}%`);
            type === 'hue' ? (currentColor.h = (x / 100) * 360, updateColorArea(), updateHueSlider()) : type === 'saturation' ? currentColor.s = x : type === 'brightness' && (currentColor.b = x); updateAllUI();  // 根据类型更新颜色属性，色相需额外更新色区和色相滑块UI
        }

        function updateHueFromControlSlider(e) { const rect = els.hCPr__HUE_sliderControl.getBoundingClientRect(); let x = Math.max(0, Math.min(rect.width, e.clientX - rect.left)); currentColor.h = (x / rect.width) * 360; updateAllUI(); }

        function addSliderEventListeners() {
            els.hueHandle.addEventListener('mousedown', e => { e.stopPropagation(); startDrag('hue', hueControlDragHandler)(e); });
            els.hueTouchArea.addEventListener('mousedown', e => { updateHueFromControlSlider(e); startDrag('hue', hueControlDragHandler)(e); });
            els.hCPr__HUE_sliderControl.addEventListener('click', e => updateHueFromControlSlider(e));
            addSliderEventListener(els.hCPr__S_slider, els.hCPr__S_handle, 'saturation');
            addSliderEventListener(els.hCPr__B_slider, els.hCPr__B_handle, 'brightness');
        }

        // 确保事件绑定正确
        function addSliderEventListener(slider, handle, type) {
            if (!slider || !handle) return; const getDragHandler = e => startDrag(type, window[`${type}DragHandler`])(e);
            handle.addEventListener('mousedown', e => { e.stopPropagation(); e.preventDefault(); getDragHandler(e); });
            const ta = document.getElementById(`${type}TouchArea`);
            ta && ta.addEventListener('mousedown', e => { e.preventDefault(); updateSliderFromClick(e, slider, handle, type); getDragHandler(e); });
            slider.addEventListener('mousedown', e => { e.preventDefault(); updateSliderFromClick(e, slider, handle, type); getDragHandler(e); });
        }

        function addCopyEventListeners() {
            document.querySelectorAll('.copy-btn').forEach(button =>
                button.addEventListener('click', () => {
                    const textToCopy = button.classList.contains('rgb-copy-btn') ? `${els.hCPr__Input_R.value}, ${els.hCPr__Input_G.value}, ${els.hCPr__Input_B.value}` : document.getElementById(button.getAttribute('data-target')).value;
                    navigator.clipboard.writeText(textToCopy).then(() => { const origHtml = button.innerHTML; button.innerHTML = '✓'; setTimeout(() => button.innerHTML = origHtml, 1500); hLog.info('已复制到剪贴板:', textToCopy); }).catch(err => hLog.error('复制失败:', err));
                })
            );
        }

        function toggleColorApplyMode() {
            if (!els.hCPr__nodeMode) return; const oldMode = window.__hMgr_ColorModeFc.getMode(), newMode = window.__hMgr_ColorModeFc.toggleMode(); updateNodePreview();
            els.hCPr__nodeMode.textContent = window.__hMgr_ColorModeFc.getModeText(); els.hCPr__nodeMode.style.backgroundColor = newMode === 0 ? 'rgb(var(--hC_BW3_DeepGray))' : 'rgb(var(--hC_CPr0__PurpleStd))'; syncSelectedNodesColorMode(oldMode, newMode); __hFc_Color2Nodes();
        }

        // 【== 新增函数：同步选中节点的颜色模式==】
        function syncSelectedNodesColorMode(oldMode, newMode) {
            try {
                const app = __hMgr_ComfyUINode.getComfyUIAppInstance(); if (!app || !app.graph) return; const selectedNodes = __hMgr_ComfyUINode.getSelectedNodes(), selectedGroups = __hMgr_ComfyUINode.getSelectedGroups(app); if (selectedNodes.length === 0 && selectedGroups.length === 0) return; // 合并连续const声明，单行简化变量赋值

                // 提取重复逻辑为公共处理函数
                const handleNodeColor = (node, baseColor) => {
                    if (!baseColor) return;
                    oldMode === 1 && newMode === 0
                        ? (node.color = baseColor, node.bgcolor = undefined, node.type === "Note" && (node.properties.text_color = baseColor))
                        : (oldMode === 0 && newMode === 1) && (() => { const hexColor = __hMgr_ComfyUINode.rgbToHex(baseColor); node.color = __hMgr_ComfyUINode.adjustColorBrightness(hexColor, -10); node.bgcolor = hexColor; node.type === "Note" && (node.properties.text_color = __hMgr_ComfyUINode.adjustColorBrightness(hexColor, 20)); })();
                    node.setDirtyCanvas && node.setDirtyCanvas(true);
                };

                selectedNodes.forEach(node => { if (!node || node.is_system) return; let baseColor = null; oldMode === 1 && newMode === 0 ? (baseColor = node.bgcolor || node.color) : (oldMode === 0 && newMode === 1) && (baseColor = node.color); handleNodeColor(node, baseColor); }); // 处理选中单个节点

                // 处理选中组内节点（复用公共处理函数，修复return语法错误）
                selectedGroups.forEach(group => {
                    if (!group || !group.children) return; const groupColor = group.color; if (!groupColor) return;
                    group.children.forEach(nodeID => { const node = app.graph.getNodeById(nodeID); if (!node || node.is_system) return; const baseColor = (oldMode === 1 && newMode === 0 ? node.bgcolor || node.color || groupColor : node.color || groupColor); handleNodeColor(node, baseColor); });
                });

                app.graph.setDirtyCanvas(true, true); hLog.info('--@hColorModeSync', `已同步 ${selectedNodes.length}个节点和${selectedGroups.length}个组的颜色模式: ${newMode === 0 ? '仅标题' : '整体色'}`);
            } catch (error) { hLog.error('--@hColorModeSync', '颜色模式同步失败:', error); }
        }
        window.colorPicker = { currentColor, hsbToRgb: __hColorConvert.hsbToRgb, updateAllUI, toggleColorApplyMode }; updateAllUI();
        els.hCPr__nodeMode && (els.hCPr__nodeMode.textContent = window.__hMgr_ColorModeFc.getModeText(), els.hCPr__nodeMode.style.backgroundColor = window.__hMgr_ColorModeFc.getMode() === 0 ? 'rgb(var(--hC_BW3_DeepGray))' : 'rgb(var(--hC_CPr0__PurpleStd))'); addEventListeners(); // 初始化节点预览UI文本

        // 窗口失焦清理拖拽状态和事件
        window.addEventListener('blur', () => {
            const isDragging = window.colorPicker?.isDragging; if (isDragging) { Object.keys(isDragging).forEach(key => isDragging[key] = false); }
            [colorAreaDragHandler, hueDragHandler, saturationDragHandler, brightnessDragHandler, hueControlDragHandler].forEach(h => { if (h) { try { document.removeEventListener('mousemove', h); } catch (e) { } } });
        });
    }

    // 【== 主界面初始化 ==】
    function __hInit_MainInterface() {
        window.__hMgr_PopEl__Position && window.__hMgr_PopEl__Position.positionMenu();
        // 获取核心DOM元素，缺失则终止
        const menuContainer = document.getElementById('h6__hMenu'), menuButton = document.getElementById('hNAP-Title__MenuA'), container = document.getElementById('hNodeAlignKit'); if (!menuContainer || !menuButton || !container) return;
        document.addEventListener('click', e => !menuContainer.contains(e.target) && e.target !== menuButton && (menuContainer.style.display = 'none')); document.getElementById('hBack')?.addEventListener('click', __hMenu_Toggle);
        container.addEventListener('contextmenu', e => (e.preventDefault(), __hMenu_Toggle())), menuButton.addEventListener('click', __hMenu_Toggle); __hBind_hAlignBtn(), __hBind_hMenuBtn();
    }

    // 【==  切换菜单显示 ==】
    function __hMenu_Toggle(e) {
        e && e.stopPropagation(); const menuContainer = document.getElementById('h6__hMenu'); if (!menuContainer) return;
        const isVisible = menuContainer.style.display !== 'none'; menuContainer.style.display = isVisible ? 'none' : 'block'; !isVisible && window.__hMgr_PopEl__Position && window.__hMgr_PopEl__Position.positionMenu();
    }

    // 【==  绑定对齐按钮事件 ==】
    function __hBind_hAlignBtn() {
        document.getElementById('hAlignLeft').addEventListener('click', (e) => __hNAP_AlignTools.hBtnA_alignLeft(e)); document.getElementById('hAlignCenterV').addEventListener('click', (e) => __hNAP_AlignTools.hBtnB_alignCenterV(e));
        document.getElementById('hAlignRight').addEventListener('click', (e) => __hNAP_AlignTools.hBtnC_alignRight(e)); document.getElementById('hAlignTop').addEventListener('click', (e) => __hNAP_AlignTools.hBtnD_alignTop(e));
        document.getElementById('hAlignCenterH').addEventListener('click', (e) => __hNAP_AlignTools.hBtnE_alignCenterH(e)); document.getElementById('hAlignBottom').addEventListener('click', (e) => __hNAP_AlignTools.hBtnF_alignButton(e));
        document.getElementById('hDistEvenH').addEventListener('click', (e) => __hNAP_AlignTools.hBtnG_distributionH(e)); document.getElementById('hDistEvenV').addEventListener('click', (e) => __hNAP_AlignTools.hBtnH_distributionV(e));
        document.getElementById('hEqualWidth').addEventListener('click', (e) => __hNAP_AlignTools.hBtnI_equalWidth(e)); document.getElementById('hEqualHeight').addEventListener('click', (e) => __hNAP_AlignTools.hBtnJ_equalHeight(e));
    }

    // 【==  绑定右键菜单按钮事件：重置插件/反馈Bug/查看指南 ==】
    function __hBind_hMenuBtn() {
        document.getElementById('hReset').addEventListener('click', __hReset__hNAP_State);
        const openLinkAndHideMenu = (url) => { window.open(url, '_blank'); window.__hMgr_MenuHide && window.__hMgr_MenuHide.hideMenu(); };
        document.getElementById('hBugReport').addEventListener('click', () => openLinkAndHideMenu('https://github.com/ArtsticH/ComfyUI_EasyKitHT_NodeAlignPro/issues'));
        document.getElementById('hGuide').addEventListener('click', () => openLinkAndHideMenu('https://github.com/ArtsticH/ComfyUI_EasyKitHT_NodeAlignPro#readme'));
        const backBtn = document.getElementById('hBack');
        if (backBtn) backBtn.addEventListener('click', () => { const debugInfo = document.querySelector('.hDebugInfo'); if (debugInfo) { debugInfo.style.display = debugInfo.style.display === 'none' ? 'block' : 'none'; } window.__hMgr_MenuHide && window.__hMgr_MenuHide.hideMenu(); })
    }

    // 【==  重置插件状态 - 增强版 ==】
    function __hReset__hNAP_State() {
        window.containerController && (window.containerController.reset(), window.containerController.zoomToScale(1.0, window.innerWidth / 2, window.innerHeight / 2));
        const container = document.getElementById('hNodeAlignKit'); container && (container.style.display = 'block'); window.__hColor_Module && window.__hColor_Module.reset();
        __hMgr_ACbar.setLinkMode(0); window.__hMgr_DisplayMode && window.__hMgr_DisplayMode.reset(); __hrReset__hMenu_Selections();
        window.containerController && window.containerController.updateTransform(); window.__hMgr_MenuHide ? window.__hMgr_MenuHide.hideMenu() : (() => { const menuContainer = document.getElementById('h6__hMenu'); menuContainer && (menuContainer.style.display = 'none'); })();
        hLog.log('<font color=#70A3F3>NodeAlignPro 已完全重置为默认状态</font>');
    }

    // 【==  重置下拉菜单选择 ==】
    function __hrReset__hMenu_Selections() {
        const resetTwoOptionDropdown = (btn, opt1, opt2, text, selectOpt) => { if (!btn || !opt1 || !opt2) return; btn.textContent = text; selectOpt === 1 ? (opt1.classList.add('selected'), opt2.classList.remove('selected')) : (opt1.classList.remove('selected'), opt2.classList.add('selected')); };

        const resetMultiOptionDropdown = (btn, optionsObj, targetOptKey, text) => {
            if (!btn || !optionsObj[targetOptKey]) return; btn.textContent = text; Object.values(optionsObj).forEach(opt => opt && opt.classList.remove('selected')); optionsObj[targetOptKey].classList.add('selected');
        };

        const dragBtn = document.querySelector('[data-target="hCMP-hSel__drag-options"]'), dragOption1 = document.querySelector('[data-value="hDragMode0_Link"]'), dragOption2 = document.querySelector('[data-value="hDragMode1_Split"]');
        resetTwoOptionDropdown(dragBtn, dragOption1, dragOption2, '解 耦', 2);

        const scaleBtn = document.querySelector('[data-target="hCMP-hSel__scale-options"]'),
            scaleOptions = {
                'hUIScale_0_5x': document.querySelector('[data-value="hUIScale_0_5x"]'), 'hUIScale_0_75x': document.querySelector('[data-value="hUIScale_0_75x"]'), 'hUIScale_1x': document.querySelector('[data-value="hUIScale_1x"]'),
                'hUIScale_1_25x': document.querySelector('[data-value="hUIScale_1_25x"]'), 'hUIScale_1_5x': document.querySelector('[data-value="hUIScale_1_5x"]'), 'hUIScale_2x': document.querySelector('[data-value="hUIScale_2x"]')
            };
        resetMultiOptionDropdown(scaleBtn, scaleOptions, 'hUIScale_1x', '1x');

        const modeBtn = document.querySelector('[data-target="hCMP-hSel__mode-options"]'),
            modeOptions = {
                'hApBar0_apBall': document.querySelector('[data-value="hApBar0_apBall"]'), 'hApBar1_Color': document.querySelector('[data-value="hApBar1_Color"]'), 'hApBar2_Align': document.querySelector('[data-value="hApBar2_Align"]'),
                'hApBar3_StdH': document.querySelector('[data-value="hApBar3_StdH"]'), 'hApBar4_ProH': document.querySelector('[data-value="hApBar4_ProH"]')
            };
        resetMultiOptionDropdown(modeBtn, modeOptions, 'hApBar2_Align', '-对 齐-');

        window.__hMgr_DisplayMode && window.__hMgr_DisplayMode.updateMenuButtonText();
    }

    // 【== 下拉菜单功能 ==】
    function __hInit_hMenu__Dropdown() {
        let hActiveDropdown = null, hHoverTimeout = null, hIsInDropdownArea = false;
        const hCustomSelects = document.querySelectorAll('.hCMP-hSel .hMenu-btn'), hDropdownContainers = document.querySelectorAll('.hCMP-hSel');
        const closeAllHDropdowns = () => { document.querySelectorAll('.hCMP-hSel__options').forEach(option => (option.classList.remove('active'), option.classList.add('fade-out'))); hActiveDropdown = null; };
        const openHDropdown = (targetId) => { closeAllHDropdowns(); setTimeout(() => { const target = document.getElementById(targetId); target && (target.classList.remove('fade-out'), target.classList.add('active'), hActiveDropdown = targetId); }, 50); };
        hCustomSelects.forEach(select => select.addEventListener('click', e => { e.stopPropagation(); const targetId = select.getAttribute('data-target'); hActiveDropdown === targetId ? closeAllHDropdowns() : openHDropdown(targetId); }));
        document.querySelectorAll('.hCMP-hSel__option').forEach(option => option.addEventListener('click', function () {
            const optionText = this.textContent, optionsContainer = this.parentElement, selectBtn = optionsContainer.previousElementSibling; selectBtn.textContent = optionText;
            optionsContainer.querySelectorAll('.hCMP-hSel__option').forEach(opt => opt.classList.remove('selected')), this.classList.add('selected'); closeAllHDropdowns(); __hMenu_Selection(this.getAttribute('data-value')); window.__hMgr_MenuHide && window.__hMgr_MenuHide.hideMenu();
        }));

        // 绑定下拉容器鼠标进出事件：hover时保持菜单打开，离开200ms后关闭
        hDropdownContainers.forEach(container => {
            container.addEventListener('mouseenter', () => { hIsInDropdownArea = true; hHoverTimeout && (clearTimeout(hHoverTimeout), hHoverTimeout = null); hActiveDropdown && openHDropdown(container.querySelector('.hMenu-btn').getAttribute('data-target')); });
            container.addEventListener('mouseleave', () => { hIsInDropdownArea = false; hHoverTimeout = setTimeout(() => hActiveDropdown && !hIsInDropdownArea && closeAllHDropdowns(), 200); });
        });
        const menuContainer = document.getElementById('h6__hMenu');
        menuContainer.addEventListener('mouseenter', () => { hIsInDropdownArea = true; hHoverTimeout && (clearTimeout(hHoverTimeout), hHoverTimeout = null); });
        menuContainer.addEventListener('mouseleave', () => { hIsInDropdownArea = false; hHoverTimeout = setTimeout(() => hActiveDropdown && !hIsInDropdownArea && closeAllHDropdowns(), 300); });
        document.addEventListener('click', e => !e.target.closest('.hCMP-hSel') && !e.target.closest('.hCMP-hSel__options') && closeAllHDropdowns());
        document.querySelectorAll('.hCMP-hSel__options').forEach(option => option.addEventListener('click', e => e.stopPropagation()));
        document.addEventListener('keydown', e => e.key === 'Escape' && hActiveDropdown && (closeAllHDropdowns(), e.stopPropagation()));
        menuContainer.addEventListener('contextmenu', function (e) { closeAllHDropdowns(); });
    }

    const scaleMapping = { 'hUIScale_0_5x': 0.5, 'hUIScale_0_75x': 0.75, 'hUIScale_1x': 1.0, 'hUIScale_1_25x': 1.25, 'hUIScale_1_5x': 1.5, 'hUIScale_2x': 2.0 };

    // 【== 显示模式管理器 ==】
    class __hMgr_DisplayMode {
        constructor() { this.isPermanent = true; this.canvasClickListener = null; this.loadModeFromStorage(); }

        // 重置方法
        reset() {
            this.isPermanent = true; this.saveModeToStorage(); const container = document.getElementById('hNodeAlignKit'); container && (container.style.display = 'block');
            const canvas = document.querySelector('canvas#graph-canvas'); canvas && this.canvasClickListener && (canvas.removeEventListener('click', this.canvasClickListener), this.canvasClickListener = null); this.updateMenuButtonText();
        }

        // 常驻显示模式
        setPermanentMode() {
            this.isPermanent = true; this.saveModeToStorage(); const container = document.getElementById('hNodeAlignKit'); container && (container.style.display = 'block');
            const canvas = document.querySelector('canvas#graph-canvas'); canvas && this.canvasClickListener && (canvas.removeEventListener('click', this.canvasClickListener), this.canvasClickListener = null); this.updateMenuButtonText();
        }

        // 跟随选框模式
        setFollowingMode() { this.isPermanent = false; this.saveModeToStorage(); const container = document.getElementById('hNodeAlignKit'); container && (container.style.display = 'none'); this.setupCanvasListener(); this.updateMenuButtonText(); }
        setupCanvasListener() {
            const canvas = document.querySelector('canvas#graph-canvas'); if (!canvas) { setTimeout(() => this.setupCanvasListener(), 500); return; }
            this.canvasClickListener = (event) => { const selectedNodesCount = this.getSelectedNodesCount(); selectedNodesCount >= 2 ? this.showAtPosition(event.clientX, event.clientY) : this.hide(); }; canvas.addEventListener('click', this.canvasClickListener);
        }

        getSelectedNodesCount() { if (!LGraphCanvas?.active_canvas?.selected_nodes) return 0; return Object.keys(LGraphCanvas.active_canvas.selected_nodes || {}).length; }

        showAtPosition(clientX, clientY) {
            const container = document.getElementById('hNodeAlignKit'); if (!container || !window.containerController) return;
            container.style.display = 'block'; const originalSize = window.containerController.getContainerOriginalSize(); const scaledWidth = originalSize.width * window.containerController.scale; const scaledHeight = originalSize.height * window.containerController.scale;
            let newLeft = clientX - scaledWidth / 2; let newTop = clientY + 20; const windowWidth = window.innerWidth; const windowHeight = window.innerHeight;
            if (newLeft < 0) newLeft = 0; if (newLeft + scaledWidth > windowWidth) newLeft = windowWidth - scaledWidth; if (newTop < 0) newTop = 0; if (newTop + scaledHeight > windowHeight) newTop = windowHeight - scaledHeight;
            window.containerController.posX = newLeft; window.containerController.posY = newTop; window.containerController.updateTransform(); setTimeout(() => { window.containerController && window.containerController.enforceBoundaries(); }, 10);
        }

        hide() { const container = document.getElementById('hNodeAlignKit'); container && (container.style.display = 'none'); }

        updateMenuButtonText() {
            const menuBtn = document.querySelector('[data-target="hCMP-hSel__display-options"]');
            try {
                if (window.hLanguage && typeof window.hLanguage.t === 'function') {
                    const alwaysText = window.hLanguage.t('Option_Display_Always') || '常驻显示';
                    const followText = window.hLanguage.t('Option_Display_Follow') || '跟随选框';
                    menuBtn && (menuBtn.textContent = this.isPermanent ? alwaysText : followText);
                } else {
                    menuBtn && (menuBtn.textContent = this.isPermanent ? '常驻显示' : '跟随选框');
                }
            } catch (e) { menuBtn && (menuBtn.textContent = this.isPermanent ? '常驻显示' : '跟随选框'); }
            const optionsContainer = document.getElementById('hCMP-hSel__display-options');
            optionsContainer && optionsContainer.querySelectorAll('.hCMP-hSel__option').forEach(opt => { opt.classList.remove('selected'); (this.isPermanent && opt.getAttribute('data-value') === 'hDispMode0_Always') || (!this.isPermanent && opt.getAttribute('data-value') === 'hDispMode1_Follow') && opt.classList.add('selected'); });
        }

        saveModeToStorage() { localStorage.setItem('NodeAlignProDisplayMode', this.isPermanent ? 'permanent' : 'following'); }
        loadModeFromStorage() { const savedMode = localStorage.getItem('NodeAlignProDisplayMode'); savedMode !== null && (this.isPermanent = savedMode === 'permanent', this.updateMenuButtonText()); }
    }

    window.__hMgr_DisplayMode = new __hMgr_DisplayMode();

    // 【==  处理下拉菜单选择 ==】
    const __hMenu_Selection = (value) => {
        switch (value) {
            case 'hDragMode1_Split': __hMgr_ACbar.setLinkMode(0); break;
            case 'hDragMode0_Link': __hMgr_ACbar.setLinkMode(1); break;
            case 'hUIScale_0_5x': case 'hUIScale_0_75x': case 'hUIScale_1x': case 'hUIScale_1_25x': case 'hUIScale_1_5x': case 'hUIScale_2x':
                const targetScale = scaleMapping[value], containerRect = document.getElementById('hNodeAlignKit').getBoundingClientRect(), centerX = containerRect.left + containerRect.width / 2, centerY = containerRect.top + containerRect.height / 2;
                window.containerController && targetScale && window.containerController.zoomToScale(targetScale, centerX, centerY); break;
            case 'hDispMode0_Always': window.__hMgr_DisplayMode && window.__hMgr_DisplayMode.setPermanentMode(); break;
            case 'hDispMode1_Follow': window.__hMgr_DisplayMode && window.__hMgr_DisplayMode.setFollowingMode(); break;
        }
    };
    window.__hMenu_Selection = __hMenu_Selection; // 暴露到全局

    // 【== 初始化流程 ==】
    const __hInit_hNAP = () => {
        window.__hMgr_Log = new __hMgr_Log(); hLog.info('初始化ComfyUI_EasyKitHT_NodeAlignPro插件完毕, 等待DOM加载...'); const container = __hCreateHTML(); document.body.appendChild(container);
        try {
            window.hLanguage && window.hLanguage.applyToDOM && window.hLanguage.applyToDOM(container);
            // 对没有 data-i18n 属性的元素进行额外的定向翻译
            if (window.hLanguage) {
                const HL = window.hLanguage;
                const titleEl = container.querySelector('#hNAP-Title__Content-Text'); titleEl && (titleEl.textContent = HL.t('NodeAlignPro_Title'));
                const cpHeader = container.querySelector('#hCPr__header h2'); cpHeader && (cpHeader.textContent = HL.t('ColorPicker_Title'));
                const hexInput = container.querySelector('#hexInput2'); if (hexInput && hexInput.previousElementSibling) hexInput.previousElementSibling.textContent = HL.t('ColorPicker_HexLabel');
                const rgbLabel = container.querySelector('.hCPr__rgbLabel'); rgbLabel && (rgbLabel.textContent = HL.t('ColorPicker_RGBLabel'));
                const nodePreviewTip = container.querySelector('#hCPr__nodePreviewTips'); nodePreviewTip && (nodePreviewTip.textContent = HL.t('ColorPicker_NodeModeTip'));
                const nodeMode = container.querySelector('#hCPr__nodeMode'); nodeMode && (nodeMode.textContent = HL.t('ColorPicker_NodeMode'));
                try {
                    // 颜色选择器滑块标签（按顺序）
                    const sliders = Array.from(container.querySelectorAll('.hCPr__hsbBar_sliderLabel'));
                    if (sliders.length >= 3) {
                        sliders[0].textContent = HL.t('ColorPicker_HueLabel');
                        sliders[1].textContent = HL.t('ColorPicker_SatLabel');
                        sliders[2].textContent = HL.t('ColorPicker_BriLabel');
                    }
                } catch (ee) { /* 忽略 */ }
                try { const logoAp = container.querySelector('#hBtnY_barLOGO'); if (logoAp) logoAp.setAttribute('aria-label', HL.t('Menu_LogoTitle')); } catch (ee) {}
            }
        } catch (e) { console.warn('hLanguage.applyToDOM 失败:', e); }
        setTimeout(() => {
            hLog.debug('NodeAlignPro核心组件初始化完毕！ 请等待其它插件加载...</br>🔥v2.0.3_rc新版教程文档请点击：右键菜单>【使用教程】查看...');
            window.containerController = new __hController_hNAPKit(container), window.__hMgr_PopEl__Position = new __hMgr_PopEl__Position(), window.__hMgr_PopEl__Position.init(container), window.__hMgr_MenuHide = new __hMgr_MenuHide(); __hInit_AllIcons(), __hInit_MainInterface(), __hInit_hMenu__Dropdown(); window.__hColor_Module = new __hColor_Module(); __hInit_ColorPicker(); window.NodeAlignProSettingsManager = new __hMgr_Settings(); // 初始化设置管理器
            window.__hMenu_Selection = __hMenu_Selection; window.__hMgr_ACbar = __hMgr_ACbar; // 确保关键函数暴露
            window.__hMgr_DisplayMode = new __hMgr_DisplayMode(); const savedDisplayMode = localStorage.getItem('NodeAlignProDisplayMode'); savedDisplayMode === 'following' ? (window.__hMgr_DisplayMode.setFollowingMode(), hLog.info('显示模式: 跟随选框')) : (window.__hMgr_DisplayMode.setPermanentMode(), hLog.info('显示模式: 常驻显示'));
            hLog.log('NodeAlignPro 插件初始化完成'); setTimeout(() => { __hMgr_ACbar.loadModeFromStorage(); hLog.info('联动模式: 已禁用'); __hMgr_ACbar.linkMode === 1 && __hMgr_ACbar.syncRunButtonPosition(); hLog.info('联动模式: 已启用'); }, 500);
            setTimeout(() => { const debugInfo = document.querySelector('.hDebugInfo'); if (debugInfo) debugInfo.style.display = 'none'; hLog.info('debugInfo 已自动隐藏 (24秒超时)'); }, 3000); window.hScreenColorPicker = window.__hColor_Module?.screenColorPicker;
        }, 100);
    };

    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', __hInit_hNAP) : __hInit_hNAP();
    window.addEventListener('beforeunload', () => { window.nodeSelectionListener && LGraphCanvas.active_canvas?.graph && LGraphCanvas.active_canvas.graph.off('selection', window.nodeSelectionListener); });
    // 【==  控制台日志 ==】
    document.addEventListener('DOMContentLoaded', () => { hLog.info('DOM资源加载完毕，正在初始化 hNodeAlignPro 主面板...'); }); window.addEventListener('load', () => { hLog.info('所有资源加载完毕，正在初始化 hNodeAlignPro 其余功能...'); });


    // =========== NodeAlignPro 设置管理器 ===========
    class __hMgr_Settings {
        constructor() { this.settings = {}; this.init(); }
        init() { this.loadSettingsFromStorage(); setTimeout(() => this.checkAndFixLinkMode(), 1000); }

        // 确保历史版本的调用者不会因方法缺失而报错，同时尝试与 ACbar 的状态保持同步
        checkAndFixLinkMode() {
            try {
                // 若 ACbar 存在且具备 linkMode 处理能力，确保其值与本地存储一致
                if (window.__hMgr_ACbar && typeof window.__hMgr_ACbar.setLinkMode === 'function') {
                    const stored = localStorage.getItem('NodeAlignProRunButtonLink');
                    if (stored !== null) {
                        const mode = parseInt(stored) || 0;
                        try { window.__hMgr_ACbar.setLinkMode(mode); } catch (e) { /* 忽略错误 */ }
                    }
                }
            } catch (e) {
                // 静默失败，避免在不同宿主环境中破坏整体初始化流程
                try { hLog && hLog.warn('--@hSetting', 'checkAndFixLinkMode failed:', e); } catch (ee) { }
            }
        }

        // 加载本地存储的设置
        loadSettingsFromStorage() {
            try {
                const showLog = localStorage.getItem('NodeAlignPro_ShowOperationLog'); if (showLog !== null) this.setShowOperationLog(showLog === 'true'); // 操作日志显示
                const linkMode = localStorage.getItem('NodeAlignProRunButtonLink');
                if (linkMode !== null) { this.setLinkMode(parseInt(linkMode)); hLog.debug('--@hSetting', `从存储加载拖拽方式: ${parseInt(linkMode)}`); } //拖拽模式
                const displayMode = localStorage.getItem('NodeAlignProDisplayMode'); if (displayMode !== null) { this.setDisplayMode(displayMode === 'permanent' ? 'hDispMode0_Always' : 'hDispMode1_Follow'); } // 显示模式
                const colorMode = localStorage.getItem('NodeAlignPro_ColorApplyMode'); if (colorMode !== null) this.setColorApplyMode(parseInt(colorMode)); // 上色模式
                const newVersionTips = localStorage.getItem('NodeAlignPro_NewVersionTips'); if (newVersionTips !== null) this.setNewVersionTips(newVersionTips === 'true'); // 新版说明
                // 颜色设置
                const alignColor = localStorage.getItem('NodeAlignPro_AlignButtonColor'); if (alignColor) this.setAlignButtonColor(alignColor);
                const bgColor = localStorage.getItem('NodeAlignPro_ToolbarBgColor'); if (bgColor) this.setToolbarBgColor(bgColor);
                const opacity = localStorage.getItem('NodeAlignPro_ToolbarOpacity'); if (opacity) this.setToolbarOpacity(parseInt(opacity));

                hLog.info('--@hSetting', '设置已从本地存储加载');
            } catch (error) { hLog.error('--@hSetting', '加载设置失败:', error); }
        }

        // 设置操作日志显示
        setShowOperationLog(show) {
            const debugElement = document.getElementById('hDebugInfo_V2'); if (debugElement) { debugElement.style.setProperty('display', show ? 'block' : 'none', 'important'); }
            localStorage.setItem('NodeAlignPro_ShowOperationLog', show.toString()); hLog.info('--@hSetting', `操作日志${show ? '已开启' : '已关闭'}`);
        }

        // 设置拖拽方式
        setLinkMode(mode) {
            try {
                const value = mode === 1 ? 'hDragMode0_Link' : 'hDragMode1_Split', __hMenu_Selection = window.__hMenu_Selection; // 直接调用现有的右键菜单处理函数。如果找不到函数，直接调用联动管理器
                if (typeof __hMenu_Selection === 'function') __hMenu_Selection(value); else if (window.__hMgr_ACbar) window.__hMgr_ACbar.setLinkMode(mode);
                hLog.info('--@hSetting', `拖拽方式已设置为: ${mode === 1 ? '联动' : '解耦'}`);
            } catch (error) { hLog.error('--@hSetting', '设置拖拽方式失败:', error); }
        }

        // 设置UI缩放
        setUIScale(scaleValue) {
            const scaleMapping = { 'hUIScale_0_5x': 0.5, 'hUIScale_0_75x': 0.75, 'hUIScale_1x': 1.0, 'hUIScale_1_25x': 1.25, 'hUIScale_1_5x': 1.5, 'hUIScale_2x': 2.0 };

            const targetScale = scaleMapping[scaleValue];
            if (targetScale && window.containerController) {
                const container = document.getElementById('hNodeAlignKit');
                if (container) {
                    const containerRect = container.getBoundingClientRect(), centerX = containerRect.left + containerRect.width / 2, centerY = containerRect.top + containerRect.height / 2;
                    window.containerController.zoomToScale(targetScale, centerX, centerY);
                    // 同步更新右键菜单显示
                    const scaleBtn = document.querySelector('[data-target="hCMP-hSel__scale-options"]');
                    if (scaleBtn) {
                        const scaleText = { 'hUIScale_0_5x': '0.5x', 'hUIScale_0_75x': '0.75x', 'hUIScale_1x': '1x', 'hUIScale_1_25x': '1.25x', 'hUIScale_1_5x': '1.5x', 'hUIScale_2x': '2x' }[scaleValue];
                        scaleBtn.textContent = scaleText;
                    }
                    hLog.info('--@hSetting', `UI缩放已设置为: ${targetScale}x`);
                }
            }
        }

        // 设置显示模式
        setDisplayMode(mode) {
            if (window.__hMgr_DisplayMode) {
                if (mode === "hDispMode0_Always") {
                    window.__hMgr_DisplayMode.setPermanentMode(); hLog.info('--@hSetting', '显示模式已设置为: 常驻显示');
                } else if (mode === "hDispMode1_Follow") {
                    window.__hMgr_DisplayMode.setFollowingMode(); hLog.info('--@hSetting', '显示模式已设置为: 跟随选框');
                }
                const displayBtn = document.querySelector('[data-target="hCMP-hSel__display-options"]'); // 同步更新右键菜单显示
                if (displayBtn) { displayBtn.textContent = mode === "hDispMode0_Always" ? '常驻显示' : '跟随选框'; }
            }
        }

        // 设置上色模式
        setColorApplyMode(mode) {
            if (window.__hMgr_ColorModeFc) {
                window.__hMgr_ColorModeFc.setMode(mode);

                // 更新取色器显示
                const nodeModeText = document.getElementById('hCPr__nodeMode');
                if (nodeModeText) {
                    try { nodeModeText.textContent = (window.hLanguage && typeof window.hLanguage.t === 'function') ? window.hLanguage.t(mode === 0 ? 'Option_Color_TitleOnly' : 'Option_Color_Whole') : (mode === 0 ? '仅标题' : '整体色'); } catch (e) { nodeModeText.textContent = mode === 0 ? '仅标题' : '整体色'; }
                    nodeModeText.style.backgroundColor = mode === 0 ? 'rgb(var(--hC_BW3_DeepGray))' : 'rgb(var(--hC_CPr0__PurpleStd))';
                }

                try { hLog.info('--@hSetting', `上色模式已设置为: ${(window.hLanguage && typeof window.hLanguage.t === 'function') ? window.hLanguage.t(mode === 0 ? 'Option_Color_TitleOnly' : 'Option_Color_Whole') : (mode === 0 ? '仅标题' : '整体色')}`); } catch (e) { hLog.info('--@hSetting', `上色模式已设置为: ${mode === 0 ? '仅标题' : '整体色'}`); }
            }
        }

        // 设置对齐按钮颜色
        setAlignButtonColor(hexColor) {
            const r = parseInt(hexColor.substr(0, 2), 16), g = parseInt(hexColor.substr(2, 2), 16), b = parseInt(hexColor.substr(4, 6), 16), rgbValue = `${r}, ${g}, ${b}`;
            document.documentElement.style.setProperty('--hC_hBtn_svg', rgbValue);
            localStorage.setItem('NodeAlignPro_AlignButtonColor', hexColor); hLog.info('--@hSetting', `对齐按钮颜色已更新为: #${hexColor} (RGB: ${rgbValue})`);
        }

        // 设置工具栏背景色
        setToolbarBgColor(hexColor) {
            const r = parseInt(hexColor.substr(0, 2), 16), g = parseInt(hexColor.substr(2, 2), 16), b = parseInt(hexColor.substr(4, 6), 16), rgbValue = `${r}, ${g}, ${b}`;
            document.documentElement.style.setProperty('--hC_Bg', rgbValue);
            localStorage.setItem('NodeAlignPro_ToolbarBgColor', hexColor); hLog.info('--@hSetting', `工具栏背景色已更新为: #${hexColor} (RGB: ${rgbValue})`);
        }

        // 设置工具栏透明度
        setToolbarOpacity(opacity) {
            const alignProElement = document.getElementById('h2__hNodeAlignPro'); if (alignProElement) { alignProElement.style.opacity = (opacity / 100).toString(); }
            localStorage.setItem('NodeAlignPro_ToolbarOpacity', opacity.toString()); hLog.info('--@hSetting', `工具栏透明度已设置为: ${opacity}%`);
        }

        // 设置新版说明
        setNewVersionTips(show) {
            const debugInfo = document.querySelector('.hDebugInfo');
            if (debugInfo) {
                debugInfo.style.display = show ? 'block' : 'none';
                if (show) { setTimeout(() => { if (debugInfo.style.display !== 'none') { debugInfo.style.display = 'none'; this.setNewVersionTips(false); } }, 3000); } // 如果开启，3秒后自动隐藏
            }

            localStorage.setItem('NodeAlignPro_NewVersionTips', show.toString()); hLog.info('--@hSetting', `新版说明已${show ? '显示' : '隐藏'}`);
        }
    }

    window.NodeAlignProSettingsManager = new __hMgr_Settings(); // 暴露设置管理器到全局


})();