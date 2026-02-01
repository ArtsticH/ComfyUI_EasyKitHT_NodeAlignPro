/**
 * @Artstich_Example
 * @name         easykit-node-align (ComfyUI Plugin)
 * @description  Node2.0-based professional alignment & real-time node color picker - innovative first support: A must-have plugin for managing node layout and color schemes in ComfyUI. Features a real-time color picker, alignment, 7 preset colors, grayscale/custom modes, and one-click reverse alignment.
 * @author ArtsticH
 * @see https://registry.comfy.org/nodes/easykit-node-align
 * @see https://github.com/ArtsticH/ComfyUI_EasyKitHT_NodeAlignPro
 * @see https://gitee.com/ArtsticH/ComfyUI_EasyKitHT_NodeAlignPro
 * @installCommand comfy node install easykit-node-align
 * @installCommand git clone https://github.com/ArtsticH/ComfyUI_EasyKitHT_NodeAlignPro.git
 * @installCommand git clone https://gitee.com/ArtsticH/ComfyUI_EasyKitHT_NodeAlignPro.git
 * @created 2025-04-29 @date 2025-06-15 @lastUpdated 2026-02-02 @version v2.1.15 @license GPL-3.0
 * @copyright ©2012-2026, All rights reserved. Freely open to use, modify, and distribute in accordance with the GPL-3.0 license.
 */

import { app } from "../../scripts/app.js";

// 简单的国际化助手，当hLanguage未就绪时回退到提供的中文文本
function h_i18n(key, fallback) { try { return window.hLanguage && typeof window.hLanguage.t === 'function' ? window.hLanguage.t(key) : (fallback || key); } catch (e) { return fallback || key; } }

// 辅助函数：安全地调用存在的方法，否则存储待处理的值
function __hNodeAlignPro_safeCall(target, methodName, keyForPending, value) {
    try { if (target && typeof target[methodName] === 'function') return target[methodName](value), true; } catch (e) { console.warn(`[NodeAlignPro 设置模块] 调用 ${methodName} 失败:`, e); }
    try { window.__hNodeAlignPro_pendingSettings = window.__hNodeAlignPro_pendingSettings || {}; window.__hNodeAlignPro_pendingSettings[keyForPending] = value; console.info(`[NodeAlignPro 设置模块] 挂起设置 ${keyForPending}=${value}，等待主模块处理`); } catch (e) { /* 忽略 */ } // 存储待处理值供主模块稍后获取
    return false;
}

// 【前景色】的选择器(--color-muted)
let hAutoTheme__FgColor = [
    '#hCPr__nodePreviewTips',  // ID选择器
    '.hCPr__valueLabel',        // 类选择器
    '.hSelKit-label',   //右键菜单标签文本
    '.copy-btn',    //取色器复制图标
    '.hCPr__hsbBar_sliderLabel' //取色器hsb滑块标签
];

// 【背景色】的选择器(--comfy-menu-bg)
let hAutoTheme__BgColor = [
    '.Artstich_hColorPicker',
    '#h2__hNodeAlignPro',
    '#h6__hMenu',
    '.hCPr__sliderValue', // HSB颜色文本框
    '.hValue-input',    //取色器文本框
    '.hCPr__sliderValue',   //取色器hsb文本框
    '.hCPr__copyIcon-front', '.hCPr__copyIcon-back', //取色器复制图标
    '#debugInfo'
];

// 【边框色】的选择器(--border-color)
let hAutoTheme__BorderColor = [
    '.Artstich_hColorPicker',
    '#h2__hNodeAlignPro',
    '#h6__hMenu',
    '.hCPr__sliderValue', // HSB颜色文本框
    '.hValue-input',    //取色器文本框
    '.hCPr__sliderValue',   //取色器hsb文本框
    '.hCPr__header', //取色器标题下划线
    '#debugInfo'
];

// 【分割线颜色】的选择器（使用主题边框色作为填充色）
let hAutoTheme__DividerColor = [
    '.hBarDivider'
];

// 【悬浮背景色】的选择器(--comfy-menu-hover-bg)
let hAutoTheme__HoverColor = [
    '.btn:hover'         // 对齐按钮悬浮状态
];

// 备份原始数组
const ORIGINAL_SELECTORS = { hAutoTheme__FgColor: [...hAutoTheme__FgColor], hAutoTheme__BgColor: [...hAutoTheme__BgColor], hAutoTheme__BorderColor: [...hAutoTheme__BorderColor], hAutoTheme__HoverColor: [...hAutoTheme__HoverColor], hAutoTheme__DividerColor: [...hAutoTheme__DividerColor] };

// 清空选择器数组（开关关闭时调用）
function disableThemeSelectors() { hAutoTheme__FgColor = []; hAutoTheme__BgColor = []; hAutoTheme__BorderColor = []; hAutoTheme__HoverColor = []; hAutoTheme__DividerColor = []; console.log('主题选择器已禁用（数组已清空）'); }

// 恢复选择器数组（开关开启时调用）
function enableThemeSelectors() {
    hAutoTheme__FgColor = [...ORIGINAL_SELECTORS.hAutoTheme__FgColor];
    hAutoTheme__BgColor = [...ORIGINAL_SELECTORS.hAutoTheme__BgColor];
    hAutoTheme__BorderColor = [...ORIGINAL_SELECTORS.hAutoTheme__BorderColor];
    hAutoTheme__HoverColor = [...ORIGINAL_SELECTORS.hAutoTheme__HoverColor];
    hAutoTheme__DividerColor = [...ORIGINAL_SELECTORS.hAutoTheme__DividerColor];
    console.log('主题选择器已启用（数组已恢复）');
}

// 封装函数：为颜色添加0.8透明度
function h_getColorWithOpacity(colorValue, opacity = 0.8) {
    if (!colorValue || colorValue === 'auto') return colorValue;
    let r, g, b;
    if (colorValue.startsWith('rgb')) { // 处理RGB格式
        const rgbMatch = colorValue.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (rgbMatch) [r, g, b] = rgbMatch.slice(1, 4).map(Number);
    } else { // 处理十六进制格式
        const hex = colorValue.replace('#', '');
        r = parseInt(hex.substring(0, 2), 16), g = parseInt(hex.substring(2, 4), 16), b = parseInt(hex.substring(4, 6), 16);
    }
    return r != undefined ? `rgba(${r}, ${g}, ${b}, ${opacity})` : colorValue;
}

// 判断是否为DebugInfo元素
function h_isDebugInfoElement(selectorOrElement, isElement = false) {
    return isElement
        ? selectorOrElement.classList?.contains('hDebugInfo') || selectorOrElement.id === 'debugInfo'
        : (selectorOrElement = selectorOrElement.trim(), selectorOrElement === '.hDebugInfo' || selectorOrElement === '#debugInfo');
}

// 通用选择器样式应用函数
function hAutoTheme__ApplyStyle(selectors, styleProperty, styleValue, pseudoClass = '') {
    if (!selectors?.length) return;

    // 将JavaScript样式属性名转换为CSS属性名（camelCase -> kebab-case）
    const cssPropertyName = styleProperty.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);

    if (pseudoClass) { // 批量处理伪类选择器
        const styleId = `hThemeStyle_${styleProperty}_${pseudoClass.replace(':', '')}`; let styleElement = document.getElementById(styleId);
        if (styleValue === null || styleValue === 'auto') styleElement && styleElement.parentNode && styleElement.parentNode.removeChild(styleElement); // 清除样式
        else { // 批量生成CSS规则
            const cssRules = selectors.map(selector => { let finalValue = styleValue, trimmedSelector = selector.trim(); styleProperty === 'backgroundColor' && h_isDebugInfoElement(trimmedSelector) && (finalValue = h_getColorWithOpacity(finalValue)); return `${trimmedSelector}${pseudoClass} { ${cssPropertyName}: ${finalValue} !important; }`; }).join('\n'); // 为DebugInfo元素添加0.8透明度
            styleElement.textContent = cssRules;
        }
        return;
    }

    // 批量处理普通选择器
    selectors.forEach(selector => {
        let trimmedSelector = selector?.trim(); if (!trimmedSelector) return;
        try {
            const isIdSelector = trimmedSelector.startsWith('#');
            const targetElements = isIdSelector ? [document.getElementById(trimmedSelector.slice(1))].filter(Boolean) : document.querySelectorAll(trimmedSelector); targetElements.length > 0 && targetElements.forEach(element => { if (styleValue === null || styleValue === 'auto') element.style.removeProperty(cssPropertyName); else { let finalValue = styleValue; styleProperty === 'backgroundColor' && h_isDebugInfoElement(element, true) && (finalValue = h_getColorWithOpacity(finalValue)); element.style[styleProperty] = finalValue; } });
        } catch (error) { console.warn(`应用样式到选择器 ${selector} 失败:`, error); }
    });
}

// 【== 统一颜色管理函数 ==】
// 统一应用颜色到选择器
function hNAP_applyColorToSelectors(colorType, colorValue) {
    try {
        // 根据颜色类型确定选择器、样式属性和伪类 - 使用对象映射替代switch
        const colorConfig = {
            fg: { selectors: hAutoTheme__FgColor, styleProperty: 'color' },
            bg: { selectors: hAutoTheme__BgColor, styleProperty: 'backgroundColor' },
            border: { selectors: hAutoTheme__BorderColor, styleProperty: 'borderColor' },
            hover: { selectors: hAutoTheme__HoverColor, styleProperty: 'backgroundColor', pseudoClass: ':hover' },
            divider: { selectors: hAutoTheme__DividerColor, styleProperty: 'backgroundColor' }
        };

        const config = colorConfig[colorType];
        if (!config) return console.warn(`[NodeAlignPro] 未知的颜色类型: ${colorType}`);

        hAutoTheme__ApplyStyle(config.selectors, config.styleProperty, colorValue, config.pseudoClass || '');
    } catch (error) { console.error(`[NodeAlignPro] 应用颜色到选择器失败 (${colorType}):`, error); }
}

// 统一应用主题色到CSS变量
function hNAP_applyThemeToCSSVars(fgColor) {
    try {
        if (!fgColor) return document.documentElement.style.removeProperty('--hC_hBtn_svg'); // 应用前景色到CSS变量（对齐按钮颜色）
        let r, g, b;
        if (fgColor.startsWith('rgb')) { // RGB格式：rgb(r, g, b)
            const rgbMatch = fgColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
            rgbMatch && ([r, g, b] = rgbMatch.slice(1, 4));
        } else { // 非RGB格式，使用全局颜色转换工具处理
            try { const colorWithHash = fgColor.startsWith('#') ? fgColor : `#${fgColor}`; const rgbObj = window.__hColorConvert ? window.__hColorConvert.hexToRgb(colorWithHash) : null; if (rgbObj) [r, g, b] = [rgbObj.r, rgbObj.g, rgbObj.b]; else r = g = 107, b = 112; } catch (e) { r = g = 107, b = 112; } // 确保颜色有#前缀，使用全局转换工具，失败则用默认值
        }
        r !== undefined && g !== undefined && b !== undefined && document.documentElement.style.setProperty('--hC_hBtn_svg', `${r}, ${g}, ${b}`); // 设置CSS变量
    } catch (error) { console.error('[NodeAlignPro] 应用主题色到CSS变量失败:', error); }
}

// 统一应用手动颜色到CSS变量
function hNAP_applyManualToCSSVars(alignColor) {
    try {
        // 处理对齐按钮颜色：通过CSS变量--hC_hBtn_svg设置
        const alignColorHex = alignColor.startsWith('#') ? alignColor.slice(1) : alignColor;
        const r = parseInt(alignColorHex.substr(0, 2), 16), g = parseInt(alignColorHex.substr(2, 2), 16), b = parseInt(alignColorHex.substr(4, 2), 16);
        document.documentElement.style.setProperty('--hC_hBtn_svg', `${r}, ${g}, ${b}`);
    } catch (error) { console.error('[NodeAlignPro] 应用手动颜色到CSS变量失败:', error); }
}

// 标准化主题色应用函数
function hAutoTheme__ApplyColors(fgColor, bgColor, borderColor, hoverColor) {
    try {
        // 应用主题色到CSS变量及各类型颜色
        hNAP_applyThemeToCSSVars(fgColor); hNAP_applyColorToSelectors('fg', fgColor); hNAP_applyColorToSelectors('bg', bgColor);
        hNAP_applyColorToSelectors('border', borderColor); hNAP_applyColorToSelectors('hover', hoverColor); hNAP_applyColorToSelectors('divider', borderColor);
        // 确保取色器按钮的核心CSS变量不被清除
        const root = document.documentElement;
        !root.style.getPropertyValue('--hC_BW1_Black') && root.style.removeProperty('--hC_BW1_Black'); // 移除内联样式，恢复CSS文件中的默认值
    } catch (error) { console.error('应用主题色到选择器失败:', error); }
}

// 获取ComfyUI主题颜色
function getComfyUIThemeColors() {
    try {
        const root = document.documentElement, computedStyles = getComputedStyle(root); // 获取根元素和计算样式
        // 获取ComfyUI主题的文字颜色（用于对齐按钮）
        let textColor = computedStyles.getPropertyValue('--color-muted').trim();
        textColor = !textColor ? (computedStyles.getPropertyValue('--comfy-input-text').trim() || computedStyles.getPropertyValue('--comfy-menu-text').trim()) : textColor;
        // 获取主题相关颜色：背景色、悬浮色、边框色
        const bgColor = computedStyles.getPropertyValue('--comfy-menu-bg').trim();
        const hoverBgColor = computedStyles.getPropertyValue('--comfy-menu-hover-bg').trim() || computedStyles.getPropertyValue('--comfy-focus-bg').trim();
        const borderColor = computedStyles.getPropertyValue('--border-color').trim() || computedStyles.getPropertyValue('--comfy-border-color').trim();
        return { textColor, bgColor, hoverBgColor, borderColor };
    } catch (error) { console.error('获取ComfyUI主题颜色失败:', error); return null; }
}

// 应用主题颜色的函数
function applyThemeColors(forceApply = false) {
    try {
        // 快速检查主题色开关状态，避免不必要的计算
        const useThemeColor = forceApply ? true : (app.ui?.settings?.getSettingValue("hNodeAlignPro.hColor_AutoTtheme") || false);
        if (!useThemeColor) return; // 如果开关关闭且非强制应用，直接返回
        // 缓存主题颜色，避免重复获取
        const themeColors = getComfyUIThemeColors();
        if (!themeColors) return;
        const { textColor, bgColor, hoverBgColor, borderColor } = themeColors;
        hAutoTheme__ApplyColors(textColor, bgColor, borderColor, hoverBgColor); // 直接应用主题色，hAutoTheme__ApplyColors内部会处理样式清除
    } catch (error) { console.error('应用ComfyUI主题配色失败:', error); }
}

// 应用手动设置的颜色
function applyManualColors() {
    try {
        const savedAlignColor = app.ui.settings.getSettingValue("hNodeAlignPro.hColor_SVG") || "6B6B70", savedBgColor = app.ui.settings.getSettingValue("hNodeAlignPro.hColor_bg") || "18181B"; // 从设置中获取用户手动设置的颜色
        const alignColor = savedAlignColor.startsWith('#') ? savedAlignColor : `#${savedAlignColor}`, bgColor = savedBgColor.startsWith('#') ? savedBgColor : `#${savedBgColor}`; // 确保颜色值有#前缀
        hNAP_applyManualToCSSVars(alignColor); // 应用手动颜色到CSS变量
        const resetBorderColor = null, resetHoverBgColor = null; // 对于没有手动设置选项的悬浮色和边框色，清除样式以恢复默认的CSS变量值
        // 使用原始选择器数组，确保手动颜色能正确应用
        hAutoTheme__ApplyStyle(ORIGINAL_SELECTORS.hAutoTheme__FgColor, 'color', alignColor);
        hAutoTheme__ApplyStyle(ORIGINAL_SELECTORS.hAutoTheme__BgColor, 'backgroundColor', bgColor);
        hAutoTheme__ApplyStyle(ORIGINAL_SELECTORS.hAutoTheme__BorderColor, 'borderColor', resetBorderColor);
        hAutoTheme__ApplyStyle(ORIGINAL_SELECTORS.hAutoTheme__HoverColor, 'backgroundColor', resetHoverBgColor, ':hover');
        hAutoTheme__ApplyStyle(ORIGINAL_SELECTORS.hAutoTheme__DividerColor, 'backgroundColor', resetBorderColor);
        // 确保取色器按钮（包括#hZoom）的样式正确
        ['#hClear', '#hPick', '#hRandom', '#hZoom'].forEach(selector => {
            try { const element = document.querySelector(selector); element && (element.style.removeProperty('background-color'), element.style.removeProperty('border-color')); } catch (e) { console.warn(`恢复取色器按钮样式失败 (${selector}):`, e); }
        });
    } catch (error) { console.error('应用手动设置颜色失败:', error); }
}

// 防抖函数，用于优化高频触发的函数调用
function debounce(func, wait) { let timeout; return function executedFunction(...args) { const later = () => { clearTimeout(timeout); func(...args); }; clearTimeout(timeout); timeout = setTimeout(later, wait); }; }

// 设置主题变化监听
function setupThemeChangeListener() {
    const root = document.documentElement;
    const debouncedApplyThemeColors = debounce(() => { applyThemeColors(); }, 100); // 100ms防抖主题色更新函数，避免频繁触发
    const observer = new MutationObserver((mutations) => { mutations.forEach((mutation) => { mutation.attributeName === 'style' && debouncedApplyThemeColors(); }); }); // 创建MutationObserver监听根元素的style属性变化 主题变化时重新应用颜色
    observer.observe(root, { attributes: true, attributeFilter: ['style'] });
    window.__hNodeAlignPro_themeObserver = observer; // 配置观察器并存储观察器引用，以便在需要时可以移除
}

const NodeAlignProSettings = [
    {
        id: "hNodeAlignPro.ShowOperationLog", name: h_i18n('Setting_ShowOperationLog', '显示操作日志'), type: "boolean",
        defaultValue: false,
        category: ["🔥 NodeAlignPro", "🛠️Z开发人员选项 (Developer Options)", h_i18n('Setting_ShowOperationLog', '显示操作日志')],
        tooltip: h_i18n('Setting_ShowOperationLog', '开启后，插件操作日志将输出到页面左上角，方便进阶用户调试'),
        onChange: (value) => { try { if (window.NodeAlignProSettingsManager) { window.NodeAlignProSettingsManager.setShowOperationLog(value); } } catch (error) { console.error('设置操作日志显示失败:', error); } }
    },

    {
        id: "hNodeAlignPro.hReset", name: h_i18n('Setting_ForceReset', '⚠强制重置NodeAlignPro插件'), type: "boolean",
        defaultValue: false,
        category: ["🔥 NodeAlignPro", "🛠️Z开发人员选项 (Developer Options)", h_i18n('Setting_ForceReset', '⚠强制重置NodeAlignPro插件')],
        tooltip: h_i18n('Setting_ForceReset', '⚠此操作会强制刷新页面,请务必先保存工作流! 开启后会强制重建NodeAlignPro插件，仅在插件异常时使用! '),
        onChange: (value) => {
            if (value) try {
                (typeof __hReset__hNAP_State === 'function' ? __hReset__hNAP_State() : resetNodeAlignProManually()); // 调用核心文件中的重置函数，核心函数不存在则执行手动重置
                resetAllSettings(); clearAllStorage(); // 重置所有设置并清除本地存储
                setTimeout(() => { const isResetEnabled = app.ui?.settings?.getSettingValue?.('hNodeAlignPro.hReset'); isResetEnabled === true ? location.reload() : (hLog && hLog.info('--@hSetting', '🔥NodeAlignPro已重置！直接可用，无需重复刷新页面'), console.log('🔥NodeAlignPro已重置！直接可用，无需重复刷新页面')); }, 500); // 检查开关状态，开启则刷新，否则记录日志
                hLog && hLog.info('--@hSetting', '插件已通过设置菜单强制重置，页面将重新加载...');
            } catch (error) { console.error('重置插件失败:', error); hLog && hLog.error('--@hSetting', '重置失败:', error); }
        }
    },

    // { id: "hNodeAlignPro.button_test", name: "测试", type: "input", defaultValue: "测试文本", category: ["🔥 NodeAlignPro", "🎨NodeAlignPro颜色预设 (Color preset)", "测试"], onChange: (newVal) => { } },

    {
        id: "hNodeAlignPro.linkMode", name: h_i18n('Setting_DragMode', '拖拽方式'), type: "combo",
        options: [{ value: "hDragMode1_Split", text: h_i18n('hSelKit_DragSplit2', '解 耦') }, { value: "hDragMode0_Link", text: h_i18n('hSelKit_DragLink2', '联 动') }],
        defaultValue: "hDragMode1_Split",
        category: ["🔥 NodeAlignPro", "⚙️NodeAlignPro基本设置 (Basic Settings)", h_i18n('Setting_DragMode', '拖拽方式')],
        tooltip: h_i18n('Setting_DragMode', '切换是否联动[运行/Action]按钮到插件面板（与插件右键菜单设置同步）'),
        onChange: (value) => {
            try {
                const mode = value === "hDragMode0_Link" ? 1 : 0;
                if (typeof __hMenu_Selection === 'function') { try { __hMenu_Selection(value); return; } catch (e) { console.warn('调用 __hMenu_Selection 失败:', e); } }
                if (window.NodeAlignProSettingsManager && typeof window.NodeAlignProSettingsManager.setLinkMode === 'function') { try { window.NodeAlignProSettingsManager.setLinkMode(mode); return; } catch (e) { console.warn('调用 NodeAlignProSettingsManager.setLinkMode 失败:', e); } }
                if (window.__hMgr_ACbar && typeof window.__hMgr_ACbar.setLinkMode === 'function') { try { window.__hMgr_ACbar.setLinkMode(mode); return; } catch (e) { console.warn('调用 __hMgr_ACbar.setLinkMode 失败:', e); } }
                __hNodeAlignPro_safeCall(null, null, 'linkMode', mode); // 回退：存储待处理值供主模块稍后获取
            } catch (error) { console.error('设置拖拽方式失败:', error); }
        }
    },

    {
        id: "hNodeAlignPro.UIScale", name: h_i18n('Setting_UIScale', 'UI缩放'), type: "combo",
        options: [{ value: "hUIScale_0_5x", text: "0.5x" }, { value: "hUIScale_0_75x", text: "0.75x" }, { value: "hUIScale_1x", text: "1x(默认)" }, { value: "hUIScale_1_25x", text: "1.25x" }, { value: "hUIScale_1_5x", text: "1.5x" }, { value: "hUIScale_2x", text: "2x" }],
        defaultValue: "hUIScale_1x",
        category: ["🔥 NodeAlignPro", "⚙️NodeAlignPro基本设置 (Basic Settings)", h_i18n('Setting_UIScale', 'UI缩放')],
        tooltip: "调整插件UI缩放比例（与插件右键菜单设置同步）",
        onChange: (value) => { try { if (window.NodeAlignProSettingsManager && typeof window.NodeAlignProSettingsManager.setUIScale === 'function') { window.NodeAlignProSettingsManager.setUIScale(value); } else __hNodeAlignPro_safeCall(null, null, 'uiScale', value); } catch (error) { console.error('设置UI缩放失败:', error); } }
    },
    /*     {
        id: "hNodeAlignPro.UIScale_v2", name: "UI缩放v2", type: "combo",
        options: [{ value: "hUIScale_0_5x", text: "0.5x" }, { value: "hUIScale_0_75x", text: "0.75x" }, { value: "hUIScale_1x", text: "1x(默认)" }, { value: "hUIScale_1_25x", text: "1.25x" }, { value: "hUIScale_1_5x", text: "1.5x" }, { value: "hUIScale_2x", text: "2x" }],
        defaultValue: "hUIScale_1x",
        category: ["🔥 NodeAlignPro", "⚙️NodeAlignPro基本设置 (Basic Settings)", "UI缩放v2"],
        attrs: { editable: true, filter: true, filterPlaceholder: "输入/选择缩放比例...", showClear: true, loading: false, loadingIcon: "pi pi-spinner pi-spin" },
        onChange: (newVal, oldVal) => {
            try {
                if (window.containerController && oldVal !== newVal) {
                    const scaleMapping = { 'hUIScale_0_5x': 0.5, 'hUIScale_0_75x': 0.75, 'hUIScale_1x': 1.0, 'hUIScale_1_25x': 1.25, 'hUIScale_1_5x': 1.5, 'hUIScale_2x': 2.0 }, targetScale = scaleMapping[newVal];
                    if (targetScale) {
                        const container = document.getElementById('hNodeAlignKit');
                        if (container) {
                            const containerRect = container.getBoundingClientRect(), centerX = containerRect.left + containerRect.width / 2, centerY = containerRect.top + containerRect.height / 2;
                            window.containerController.zoomToScale(targetScale, centerX, centerY); if (hLog) hLog.info('--@hSetting', `UI缩放v2已设置为: ${targetScale}x`);
                        }
                    }
                }
            } catch (error) { console.error('设置UI缩放v2失败:', error); }
        },
    }, */
    {
        id: "hNodeAlignPro.WorkMode", name: h_i18n('Setting_WorkMode', '工作模式'), type: "combo",
        options: [
            // { value: 'hAlign_Auto', text: h_i18n('hSelKit_AlignAuto2','自动(Auto)') }, { value: "hApBar1_Color", text: h_i18n('hSelKit_ColorBar2', '色卡(ColorBar)') },
            { value: "hApBar2_Align", text: h_i18n('hSelKit_AlignBar2', '传统对齐(AlignStd)') }, { value: "hApBar2_Node2", text: h_i18n('hSelKit_Node2', 'Node2.0') }
        ],
        defaultValue: "hApBar2_Align",
        category: ["🔥 NodeAlignPro", "⚙️NodeAlignPro基本设置 (Basic Settings)", h_i18n('Setting_WorkMode', '工作模式')],
        tooltip: h_i18n('hTooltip_WorkMode', '工作模式 (Work Mode)：切换插件工作模式（与插件右键菜单设置同步）。可开启新版Node2.0对齐模式'),
        onChange: (value) => { try { if (window.NodeAlignProSettingsManager && typeof window.NodeAlignProSettingsManager.setWorkMode === 'function') { window.NodeAlignProSettingsManager.setWorkMode(value); } else __hNodeAlignPro_safeCall(null, null, 'workMode', value); } catch (error) { console.error('设置工作模式失败:', error); } }
    },

    {
        id: "hNodeAlignPro.DisplayMode", name: h_i18n('Setting_DisplayMode', '显示模式'), type: "combo",
        options: [{ value: "hDispMode0_Always", text: h_i18n('hSelKit_Always2', '常驻显示') }, { value: "hDispMode1_Follow", text: h_i18n('hSelKit_Follow2', '跟随选框') }],
        defaultValue: "hDispMode0_Always",
        category: ["🔥 NodeAlignPro", "⚙️NodeAlignPro基本设置 (Basic Settings)", h_i18n('Setting_DisplayMode', '显示模式')],
        tooltip: h_i18n('Setting_DisplayMode', '切换插件面板的显示模式（与插件右键菜单设置同步）'),
        onChange: (value) => { try { if (window.NodeAlignProSettingsManager && typeof window.NodeAlignProSettingsManager.setDisplayMode === 'function') { window.NodeAlignProSettingsManager.setDisplayMode(value); } else __hNodeAlignPro_safeCall(null, null, 'displayMode', value); } catch (error) { console.error('设置显示模式失败:', error); } }
    },

    // 语言选择（优先级高于浏览器语言），切换即刻生效
    {
        id: "hNodeAlignPro.Language", name: h_i18n('Setting_Language', '语言'), type: "combo",
        options: [{ value: 'auto', text: h_i18n('hSelKit_AlignAuto', '自动(Auto)') }, { value: 'cn', text: h_i18n('Option_Lang_CN', '中文') }, { value: 'en', text: h_i18n('Option_Lang_EN', 'English') }],
        defaultValue: 'cn',
        category: ["🔥 NodeAlignPro", "⚙️NodeAlignPro基本设置 (Basic Settings)", h_i18n('Setting_Language', '语言')],
        tooltip: h_i18n('Setting_Language', '选择插件界面语言（优先于浏览器语言设置）'),
        onChange: (value) => {
            try {
                if (window.hLanguage && typeof window.hLanguage.setLang === 'function') {
                    window.hLanguage.setLang(value === 'auto' ? 'auto' : value); // 'auto'表示不强制特定语言；遵循浏览器/ComfyUI设置
                    try { window.hLanguage.applyToDOM(document); } catch (e) { console.warn('应用语言到DOM失败:', e); } // 立即应用到文档和现有插件容器
                    try { const c = document.getElementById('hNodeAlignKit'); c && window.hLanguage && window.hLanguage.applyToDOM(c); } catch (e) { /* 忽略 */ } // 如果存在插件容器，也应用到该容器
                    console.info('[NodeAlignPro 设置] 语言已切换为', window.hLanguage.getLang());
                } else { __hNodeAlignPro_safeCall(null, null, 'language', value); }
            } catch (error) { console.error('设置语言失败:', error); }
        }
    },

    {
        id: "hNodeAlignPro.hColor_SVG", name: h_i18n('Setting_AlignBtnColor', '对齐按钮颜色'), type: "color",
        defaultValue: "6B6B70",
        category: ["🔥 NodeAlignPro", "🎨NodeAlignPro颜色预设 (Color preset)", h_i18n('Setting_AlignBtnColor', '对齐按钮颜色')],
        tooltip: h_i18n('Setting_AlignBtnColor', '控制对齐按钮颜色'),
        onChange: (newVal) => { try { const useThemeColor = app.ui?.settings?.getSettingValue("hNodeAlignPro.hColor_AutoTtheme") || false; !useThemeColor && applyManualColors(); } catch (error) { console.error('设置对齐按钮颜色失败:', error); } } // 检查主题配色是否启用，如果启用则不做处理
    },

    {
        id: "hNodeAlignPro.hColor_AutoTtheme", name: h_i18n('Setting_ToolbarColor_Auto', '使用ComfyUI主题配色(Use ComfyUI theme color)'), type: "boolean",
        defaultValue: false,
        category: ["🔥 NodeAlignPro", "🎨NodeAlignPro颜色预设 (Color preset)", h_i18n('Setting_ToolbarColor_Auto', '使用ComfyUI theme color)')],
        tooltip: h_i18n('Setting_ToolbarColor_Auto1', '若开启，将ComfyUI主题配色，下方手动设置的颜色将无效(If enabled, ComfyUI theme color will be used, and manual color setting will be ignored)'),
        onChange: (value) => {
            try {
                value ? (enableThemeSelectors(), applyThemeColors(true), !window.__hNodeAlignPro_themeObserver && setupThemeChangeListener()) : (window.__hNodeAlignPro_themeObserver?.disconnect(), window.__hNodeAlignPro_themeObserver = null, hAutoTheme__ApplyColors(null, null, null, null), applyManualColors()); // 开启时：启用选择器数组，应用主题色并设置监听；关闭时：移除主题监听、清除主题样式、应用手动颜色
            } catch (error) { console.error('使用ComfyUI主题配色失败:', error); }
        }
    },

    {
        id: "hNodeAlignPro.hColor_bg", name: h_i18n('Setting_ToolbarBgColor', '工具栏背景色'), type: "color",
        defaultValue: "18181B",
        category: ["🔥 NodeAlignPro", "🎨NodeAlignPro颜色预设 (Color preset)", h_i18n('Setting_ToolbarBgColor', '工具栏背景色')],
        tooltip: h_i18n('Setting_ToolbarBgColor', '控制对齐组件的背景色'),
        onChange: (newVal) => { try { const useThemeColor = app.ui?.settings?.getSettingValue("hNodeAlignPro.hColor_AutoTtheme") || false; !useThemeColor && applyManualColors(); } catch (error) { console.error('设置工具栏背景色失败:', error); } } // 检查主题配色是否启用，如果启用则不做处理
    },

    {
        id: "hNodeAlignPro.hOpacity", name: h_i18n('Setting_ToolbarOpacity', '工具栏透明度'), type: "slider",
        defaultValue: 100,
        attrs: { min: 0, max: 100, step: 1 },
        category: ["🔥 NodeAlignPro", "🎨NodeAlignPro颜色预设 (Color preset)", h_i18n('Setting_ToolbarOpacity', '工具栏透明度')],
        tooltip: h_i18n('Setting_ToolbarOpacity', '控制对齐组件的背景透明度'),
        onChange: (newVal) => { try { if (window.NodeAlignProSettingsManager && typeof window.NodeAlignProSettingsManager.setToolbarOpacity === 'function') { window.NodeAlignProSettingsManager.setToolbarOpacity(newVal); } else __hNodeAlignPro_safeCall(null, null, 'toolbarOpacity', newVal); } catch (error) { console.error('设置工具栏透明度失败:', error); } }
    },

    {
        id: "hNodeAlignPro.NewVersionTips", name: h_i18n('Setting_NewVersionTips', '新版说明'), type: "boolean",
        defaultValue: true,
        category: ["🔥 NodeAlignPro", "⚙️NodeAlignPro基本设置 (Basic Settings)", h_i18n('Setting_NewVersionTips', '新版说明')],
        tooltip: h_i18n('Setting_NewVersionTips', 'v2.0.3_rc新版功能：按Shift、Alt、Ctrl Alt切换不同色卡模式... Alt+对齐按钮：对齐到"反向基准"节点^_^'),
        onChange: (value) => { try { if (window.NodeAlignProSettingsManager && typeof window.NodeAlignProSettingsManager.setNewVersionTips === 'function') { window.NodeAlignProSettingsManager.setNewVersionTips(value); } else __hNodeAlignPro_safeCall(null, null, 'newVersionTips', value); } catch (error) { console.error('设置新版说明失败:', error); } }
    },

    {
        id: "hNodeAlignPro.ColorApplyMode", name: h_i18n('Setting_ColorApplyMode', '上色模式'), type: "combo",
        options: [{ value: "1", text: h_i18n('Option_Color_Whole2', '整体色') }, { value: "0", text: h_i18n('Option_Color_TitleOnly2', '仅标题') }],
        defaultValue: "1",
        category: ["🔥 NodeAlignPro", "🧩NodeAlignPro节点设置 (Node Settings)", h_i18n('Setting_ColorApplyMode', '上色模式')],
        tooltip: h_i18n('Setting_ColorApplyMode', '设置节点上色模式：整体色（背景+标题）或仅标题色'),
        onChange: (value) => { try { const intVal = parseInt(value); if (window.NodeAlignProSettingsManager && typeof window.NodeAlignProSettingsManager.setColorApplyMode === 'function') { window.NodeAlignProSettingsManager.setColorApplyMode(intVal); } else __hNodeAlignPro_safeCall(null, null, 'colorApplyMode', intVal); } catch (error) { console.error('设置上色模式失败:', error); } }
    }
];

// 初始化函数-延迟执行，确保核心文件已加载：设置管理器会自动从localStorage加载设置
function initNodeAlignProSettings() {
    try {
        setTimeout(() => { if (window.NodeAlignProSettingsManager) { console.log('NodeAlignPro 设置系统已初始化'); if (window.hLog) hLog.info('--@hSetting', 'NodeAlignPro 设置系统已初始化'); } else console.warn('NodeAlignProSettingsManager 未找到，设置可能未完全加载'); }, 2000);
    } catch (error) { console.error('初始化NodeAlignPro设置失败:', error); }
}

// 注册扩展-初始化代码
app.registerExtension({
    name: "NodeAlignProSettings",
    setup() {
        NodeAlignProSettings.forEach(setting => { app.ui.settings.addSetting(setting); }); // 注册设置
        const useThemeColor = app.ui?.settings?.getSettingValue("hNodeAlignPro.hColor_AutoTtheme") || false; // 检查初始状态，如果主题配色功能已开启，则应用颜色并设置监听
        setTimeout(() => { useThemeColor ? (applyThemeColors(), setupThemeChangeListener()) : applyManualColors(); }, 500); // 如果未开启主题配色，应用手动设置的颜色
    }
});

// 重置所有设置
function resetAllSettings() {
    try {
        const defaultSettings = {}; // 从NodeAlignProSettings数组动态获取所有设置项的默认值
        NodeAlignProSettings.forEach(setting => { defaultSettings[setting.id] = setting.defaultValue; }); // 遍历所有设置项，收集默认值
        defaultSettings["hNodeAlignPro.hReset"] = false; // 添加特殊处理项确保重置选项本身被重置为false
        Object.keys(defaultSettings).forEach(settingId => { try { app.ui.settings?.setSettingValue?.(settingId, defaultSettings[settingId]); } catch (e) { console.warn(`重置设置 ${settingId} 失败:`, e); } }); // 设置每个配置项到默认值
        console.log('所有设置项已重置为默认值');
    } catch (error) { console.error('重置设置项失败:', error); }
}
// 手动重置插件
function resetNodeAlignProManually() {
    try {
        window.containerController?.reset() || (() => { const el = document.getElementById('hNodeAlignKit'); el && (el.style.left = '', el.style.top = ''); })(); // 优先使用容器控制器的reset方法，它已经实现了正确的位置重置逻辑
        window.__hColor_Module && window.__hColor_Module.reset(), window.__hMgr_DisplayMode && window.__hMgr_DisplayMode.reset(), window.__hMgr_ACbar && window.__hMgr_ACbar.setLinkMode(0); // 重置各个模块状态
        console.log('NodeAlignPro 已手动重置');
    } catch (error) { console.error('手动重置失败:', error); }
}
// 清除所有本地存储
function clearAllStorage() {
    try {
        const storageKeys = ['NodeAlignPro_ShowOperationLog', 'NodeAlignPro_WorkMode', 'NodeAlignPro_AlignButtonColor', 'NodeAlignPro_ToolbarBgColor', 'NodeAlignPro_ToolbarOpacity', 'NodeAlignPro_NewVersionTips', 'NodeAlignPro_LinkMode', 'NodeAlignProPosition', 'NodeAlignProRunButtonLink', 'NodeAlignProDisplayMode', 'NodeAlignPro_ColorApplyMode', 'hNodeAlignPro_Logic'];
        storageKeys.forEach(key => { localStorage.removeItem(key); }); console.log('所有相关localStorage项已清除');
    } catch (error) { console.error('清除localStorage失败:', error); }
}