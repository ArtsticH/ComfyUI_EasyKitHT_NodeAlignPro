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

import { app } from "../../scripts/app.js";

// 简单的国际化助手，当hLanguage未就绪时回退到提供的中文文本
function h_i18n(key, fallback) {
    try { return window.hLanguage && typeof window.hLanguage.t === 'function' ? window.hLanguage.t(key) : (fallback || key); } catch (e) { return fallback || key; }
}

// 辅助函数：安全地调用存在的方法，否则存储待处理的值
function __hNodeAlignPro_safeCall(target, methodName, keyForPending, value) {
    try {
        if (target && typeof target[methodName] === 'function') {
            target[methodName](value);
            return true;
        }
    } catch (e) { console.warn(`[NodeAlignPro 设置模块] 调用 ${methodName} 失败:`, e); }
    // 存储待处理值供主模块稍后获取
    try {
        window.__hNodeAlignPro_pendingSettings = window.__hNodeAlignPro_pendingSettings || {};
        window.__hNodeAlignPro_pendingSettings[keyForPending] = value;
        console.info(`[NodeAlignPro 设置模块] 挂起设置 ${keyForPending}=${value}，等待主模块处理`);
    } catch (e) { /* 忽略 */ }
    return false;
}

const NodeAlignProSettings = [
    {
        id: "hNodeAlignPro.ShowOperationLog", name: h_i18n('Setting_ShowOperationLog','显示操作日志'), type: "boolean",
        defaultValue: false,
        category: ["🔥 NodeAlignPro", "Z开发人员选项 (Developer Options)", h_i18n('Setting_ShowOperationLog','显示操作日志')],
        tooltip: h_i18n('Setting_ShowOperationLog','开启后，插件操作日志将输出到页面左上角，方便进阶用户调试'),
        onChange: (value) => { try { if (window.NodeAlignProSettingsManager) { window.NodeAlignProSettingsManager.setShowOperationLog(value); } } catch (error) { console.error('设置操作日志显示失败:', error); } }
    },

    {
        id: "hNodeAlignPro.hReset", name: h_i18n('Setting_ForceReset','⚠强制重置NodeAlignPro插件'), type: "boolean",
        defaultValue: false,
        category: ["🔥 NodeAlignPro", "Z开发人员选项 (Developer Options)", h_i18n('Setting_ForceReset','⚠强制重置NodeAlignPro插件')],
        tooltip: h_i18n('Setting_ForceReset','⚠此操作会强制刷新页面,请务必先保存工作流! 开启后会强制重建NodeAlignPro插件，仅在插件异常时使用! '),
        onChange: (value) => {
            if (value) try {
                if (typeof __hReset__hNAP_State === 'function') __hReset__hNAP_State(); else resetNodeAlignProManually(); // 1. 调用核心文件中的重置函数。如果核心重置函数不存在，执行手动重置
                resetAllSettings(); clearAllStorage(); // 2. 重置所有设置；3. 清除所有本地存储
                setTimeout(() => { // 4. 刷新页面以完全重置插件
                    const isResetEnabled = app.ui?.settings?.getSettingValue?.("hNodeAlignPro.hReset"); // 检查开关是否处于关闭状态
                    if (isResetEnabled === true) location.reload(); // 只有当开关处于开启状态时才刷新
                    else { if (hLog) hLog.info('--@hSetting', '🔥NodeAlignPro已重置！直接可用，无需重复刷新页面'); console.log('🔥NodeAlignPro已重置！直接可用，无需重复刷新页面'); } // 如果开关已关闭，则不刷新，仅记录日志
                }, 500);
                if (hLog) hLog.info('--@hSetting', '插件已通过设置菜单强制重置，页面将重新加载...');
            } catch (error) { console.error('重置插件失败:', error); if (hLog) hLog.error('--@hSetting', '重置失败:', error); }
        }
    },

    // { id: "hNodeAlignPro.button_test", name: "测试", type: "input", defaultValue: "测试文本", category: ["🔥 NodeAlignPro", "NodeAlignPro颜色预设 (Color preset)", "测试"], onChange: (newVal) => { } },

    {
        id: "hNodeAlignPro.linkMode", name: h_i18n('Setting_DragMode','拖拽方式'), type: "combo",
        options: [{ value: "hDragMode1_Split", text: h_i18n('Option_Drag_Split','解 耦') }, { value: "hDragMode0_Link", text: h_i18n('Option_Drag_Link','联 动') }],
        defaultValue: "hDragMode1_Split",
        category: ["🔥 NodeAlignPro", "NodeAlignPro基本设置 (Basic Settings)", h_i18n('Setting_DragMode','拖拽方式')],
        tooltip: h_i18n('Setting_DragMode','切换是否联动[运行/Action]按钮到插件面板（与插件右键菜单设置同步）'),
        onChange: (value) => {
            try {
                const mode = value === "hDragMode0_Link" ? 1 : 0;
                // 首先尝试显式的全局处理函数
                if (typeof __hMenu_Selection === 'function') {
                    try { __hMenu_Selection(value); return; } catch (e) { console.warn('调用 __hMenu_Selection 失败:', e); }
                }
                // 如果可用，尝试设置管理器方法
                if (window.NodeAlignProSettingsManager && typeof window.NodeAlignProSettingsManager.setLinkMode === 'function') {
                    try { window.NodeAlignProSettingsManager.setLinkMode(mode); return; } catch (e) { console.warn('调用 NodeAlignProSettingsManager.setLinkMode 失败:', e); }
                }
                // 尝试ACbar管理器
                if (window.__hMgr_ACbar && typeof window.__hMgr_ACbar.setLinkMode === 'function') {
                    try { window.__hMgr_ACbar.setLinkMode(mode); return; } catch (e) { console.warn('调用 __hMgr_ACbar.setLinkMode 失败:', e); }
                }
                // 回退：存储待处理值供主模块稍后获取
                __hNodeAlignPro_safeCall(null, null, 'linkMode', mode);
            } catch (error) { console.error('设置拖拽方式失败:', error); }
        }
    },

    {
        id: "hNodeAlignPro.UIScale", name: h_i18n('Setting_UIScale','UI缩放'), type: "combo",
        options: [{ value: "hUIScale_0_5x", text: "0.5x" }, { value: "hUIScale_0_75x", text: "0.75x" }, { value: "hUIScale_1x", text: "1x(默认)" }, { value: "hUIScale_1_25x", text: "1.25x" }, { value: "hUIScale_1_5x", text: "1.5x" }, { value: "hUIScale_2x", text: "2x" }],
        defaultValue: "hUIScale_1x",
        category: ["🔥 NodeAlignPro", "NodeAlignPro基本设置 (Basic Settings)", h_i18n('Setting_UIScale','UI缩放')],
        tooltip: "调整插件UI缩放比例（与插件右键菜单设置同步）",
        onChange: (value) => { try { if (window.NodeAlignProSettingsManager && typeof window.NodeAlignProSettingsManager.setUIScale === 'function') { window.NodeAlignProSettingsManager.setUIScale(value); } else __hNodeAlignPro_safeCall(null, null, 'uiScale', value); } catch (error) { console.error('设置UI缩放失败:', error); } }
    },
/*     {
        id: "hNodeAlignPro.UIScale_v2", name: "UI缩放v2", type: "combo",
        options: [{ value: "hUIScale_0_5x", text: "0.5x" }, { value: "hUIScale_0_75x", text: "0.75x" }, { value: "hUIScale_1x", text: "1x(默认)" }, { value: "hUIScale_1_25x", text: "1.25x" }, { value: "hUIScale_1_5x", text: "1.5x" }, { value: "hUIScale_2x", text: "2x" }],
        defaultValue: "hUIScale_1x",
        category: ["🔥 NodeAlignPro", "NodeAlignPro基本设置 (Basic Settings)", "UI缩放v2"],
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
        id: "hNodeAlignPro.WorkMode", name: h_i18n('Setting_WorkMode','工作模式'), type: "combo",
        options: [{ value: "hApBar2_Align", text: h_i18n('hSelKit_AlignBar','对 齐(AlignKit)') }],
        defaultValue: "hApBar2_Align",
        category: ["🔥 NodeAlignPro", "NodeAlignPro基本设置 (Basic Settings)", h_i18n('Setting_WorkMode','工作模式')],
        tooltip: h_i18n('Setting_WorkMode','切换插件工作模式（与插件右键菜单设置同步）'),
        onChange: (value) => { try { if (window.NodeAlignProSettingsManager && typeof window.NodeAlignProSettingsManager.setWorkMode === 'function') { window.NodeAlignProSettingsManager.setWorkMode(value); } else __hNodeAlignPro_safeCall(null, null, 'workMode', value); } catch (error) { console.error('设置工作模式失败:', error); } }
    },

    {
        id: "hNodeAlignPro.DisplayMode", name: h_i18n('Setting_DisplayMode','显示模式'), type: "combo",
        options: [{ value: "hDispMode0_Always", text: h_i18n('Option_Display_Always','常驻显示') }, { value: "hDispMode1_Follow", text: h_i18n('Option_Display_Follow','跟随选框') }],
        defaultValue: "hDispMode0_Always",
        category: ["🔥 NodeAlignPro", "NodeAlignPro基本设置 (Basic Settings)", h_i18n('Setting_DisplayMode','显示模式')],
        tooltip: h_i18n('Setting_DisplayMode','切换插件面板的显示模式（与插件右键菜单设置同步）'),
        onChange: (value) => { try { if (window.NodeAlignProSettingsManager && typeof window.NodeAlignProSettingsManager.setDisplayMode === 'function') { window.NodeAlignProSettingsManager.setDisplayMode(value); } else __hNodeAlignPro_safeCall(null, null, 'displayMode', value); } catch (error) { console.error('设置显示模式失败:', error); } }
    },

    // 语言选择（优先级高于浏览器语言），切换即刻生效
    {
        id: "hNodeAlignPro.Language", name: h_i18n('Setting_Language','语言'), type: "combo",
        options: [
            { value: 'auto', text: h_i18n('Option_Lang_Auto','自动(Auto)') },
            { value: 'cn', text: h_i18n('Option_Lang_CN','中文') },
            { value: 'en', text: h_i18n('Option_Lang_EN','English') }
        ],
        defaultValue: 'cn',
        category: ["🔥 NodeAlignPro", "NodeAlignPro基本设置 (Basic Settings)", h_i18n('Setting_Language','语言')],
        tooltip: h_i18n('Setting_Language','选择插件界面语言（优先于浏览器语言设置）'),
        onChange: (value) => {
            try {
                if (window.hLanguage && typeof window.hLanguage.setLang === 'function') {
                    // 'auto'表示不强制特定语言；遵循浏览器/ComfyUI设置
                    if (value === 'auto') window.hLanguage.setLang('auto'); else window.hLanguage.setLang(value);
                    // 立即应用到文档和现有插件容器
                    try { window.hLanguage.applyToDOM(document); } catch (e) { console.warn('应用语言到DOM失败:', e); }
                    // 如果存在插件容器，也应用到该容器
                    try { const c = document.getElementById('hNodeAlignKit'); if (c && window.hLanguage) window.hLanguage.applyToDOM(c); } catch (e) { /* 忽略 */ }
                    console.info('[NodeAlignPro 设置] 语言已切换为', window.hLanguage.getLang());
                } else {
                    __hNodeAlignPro_safeCall(null, null, 'language', value);
                }
            } catch (error) { console.error('设置语言失败:', error); }
        }
    },

    {
        id: "hNodeAlignPro.hColor_SVG", name: h_i18n('Setting_AlignBtnColor','对齐按钮颜色'), type: "color",
        defaultValue: "6B6B70",
        category: ["🔥 NodeAlignPro", "NodeAlignPro颜色预设 (Color preset)", h_i18n('Setting_AlignBtnColor','对齐按钮颜色')],
        tooltip: h_i18n('Setting_AlignBtnColor','控制对齐按钮颜色'),
        onChange: (newVal) => { try { if (window.NodeAlignProSettingsManager && typeof window.NodeAlignProSettingsManager.setAlignButtonColor === 'function') { window.NodeAlignProSettingsManager.setAlignButtonColor(newVal); } else __hNodeAlignPro_safeCall(null, null, 'alignButtonColor', newVal); } catch (error) { console.error('设置对齐按钮颜色失败:', error); } }
    },

    {
        id: "hNodeAlignPro.hColor_bg", name: h_i18n('Setting_ToolbarBgColor','工具栏背景色'), type: "color",
        defaultValue: "18181B",
        category: ["🔥 NodeAlignPro", "NodeAlignPro颜色预设 (Color preset)", h_i18n('Setting_ToolbarBgColor','工具栏背景色')],
        tooltip: h_i18n('Setting_ToolbarBgColor','控制对齐组件的背景色'),
        onChange: (newVal) => { try { if (window.NodeAlignProSettingsManager && typeof window.NodeAlignProSettingsManager.setToolbarBgColor === 'function') { window.NodeAlignProSettingsManager.setToolbarBgColor(newVal); } else __hNodeAlignPro_safeCall(null, null, 'toolbarBgColor', newVal); } catch (error) { console.error('设置工具栏背景色失败:', error); } }
    },

    {
        id: "hNodeAlignPro.hOpacity", name: h_i18n('Setting_ToolbarOpacity','工具栏透明度'), type: "slider",
        defaultValue: 95,
        attrs: { min: 0, max: 100, step: 1 },
        category: ["🔥 NodeAlignPro", "NodeAlignPro颜色预设 (Color preset)", h_i18n('Setting_ToolbarOpacity','工具栏透明度')],
        tooltip: h_i18n('Setting_ToolbarOpacity','控制对齐组件的背景透明度'),
        onChange: (newVal) => { try { if (window.NodeAlignProSettingsManager && typeof window.NodeAlignProSettingsManager.setToolbarOpacity === 'function') { window.NodeAlignProSettingsManager.setToolbarOpacity(newVal); } else __hNodeAlignPro_safeCall(null, null, 'toolbarOpacity', newVal); } catch (error) { console.error('设置工具栏透明度失败:', error); } }
    },

    {
        id: "hNodeAlignPro.NewVersionTips", name: h_i18n('Setting_NewVersionTips','新版说明'), type: "boolean",
        defaultValue: true,
        category: ["🔥 NodeAlignPro", "NodeAlignPro基本设置 (Basic Settings)", h_i18n('Setting_NewVersionTips','新版说明')],
        tooltip: h_i18n('Setting_NewVersionTips','v2.0.3_rc新版功能：按Shift、Alt、Ctrl Alt切换不同色卡模式... Alt+对齐按钮：对齐到“反向基准”节点^_^'),
        onChange: (value) => { try { if (window.NodeAlignProSettingsManager && typeof window.NodeAlignProSettingsManager.setNewVersionTips === 'function') { window.NodeAlignProSettingsManager.setNewVersionTips(value); } else __hNodeAlignPro_safeCall(null, null, 'newVersionTips', value); } catch (error) { console.error('设置新版说明失败:', error); } }
    },

    {
        id: "hNodeAlignPro.ColorApplyMode", name: h_i18n('Setting_ColorApplyMode','上色模式'), type: "combo",
        options: [ { value: "1", text: h_i18n('Option_Color_Whole','整体色') }, { value: "0", text: h_i18n('Option_Color_TitleOnly','仅标题') } ],
        defaultValue: "1",
        category: ["🔥 NodeAlignPro", "NodeAlignPro节点设置 (Node Settings)", h_i18n('Setting_ColorApplyMode','上色模式')],
        tooltip: h_i18n('Setting_ColorApplyMode','设置节点上色模式：整体色（背景+标题）或仅标题色'),
        onChange: (value) => { try { const intVal = parseInt(value); if (window.NodeAlignProSettingsManager && typeof window.NodeAlignProSettingsManager.setColorApplyMode === 'function') { window.NodeAlignProSettingsManager.setColorApplyMode(intVal); } else __hNodeAlignPro_safeCall(null, null, 'colorApplyMode', intVal); } catch (error) { console.error('设置上色模式失败:', error); } }
    }
];

// 初始化函数
function initNodeAlignProSettings() {
    try {
        setTimeout(() => { // 延迟执行，确保核心文件已加载
            if (window.NodeAlignProSettingsManager) { console.log('NodeAlignPro 设置系统已初始化'); if (window.hLog) hLog.info('--@hSetting', 'NodeAlignPro 设置系统已初始化'); } else console.warn('NodeAlignProSettingsManager 未找到，设置可能未完全加载');  // 设置管理器会自动从localStorage加载设置
        }, 2000);
    } catch (error) { console.error('初始化NodeAlignPro设置失败:', error); }
}

// 注册扩展
app.registerExtension({
    name: "NodeAlignPro.Settings", settings: NodeAlignProSettings,
    setup() {
        try {
            // ComfyUI会自动注册通过`settings`字段传递的设置
            // 避免在此处手动调用addSetting，以防止重复注册错误
            initNodeAlignProSettings(); // 初始化设置管理器和相关回调
            console.info("[NodeAlignPro 设置模块] 已注册（ NodeAlignPro.Settings）", NodeAlignProSettings.map(s => s.id));
        } catch (e) { console.error('[NodeAlignPro 设置模块] 初始化时发生异常（ NodeAlignPro.Settings）:', e); }
    },
    beforeConfigureGraph(graph) { setTimeout(initNodeAlignProSettings, 2000); } // 延迟初始化，确保DOM已准备好
});

// 重置所有设置
function resetAllSettings() {
    try {
        const defaultSettings = {
            "hNodeAlignPro.ShowOperationLog": false, "hNodeAlignPro.hReset": false, "hNodeAlignPro.button_test": "测试文本",
            "hNodeAlignPro.linkMode": "hDragMode1_Split", "hNodeAlignPro.UIScale": "hUIScale_1x", "hNodeAlignPro.UIScale_v2": "hUIScale_1x",
            "hNodeAlignPro.WorkMode": "hApBar2_Align", "hNodeAlignPro.DisplayMode": "hDispMode0_Always", "hNodeAlignPro.hColor_SVG": "6B6B70",
            "hNodeAlignPro.hColor_bg": "18181B", "hNodeAlignPro.hOpacity": 95, "hNodeAlignPro.NewVersionTips": true
        };
        Object.keys(defaultSettings).forEach(settingId => { // 设置每个配置项到默认值
            try { app.ui.settings?.setSettingValue?.(settingId, defaultSettings[settingId]); } catch (e) { console.warn(`重置设置 ${settingId} 失败:`, e); }
        });
        console.log('所有设置项已重置为默认值');
    } catch (error) { console.error('重置设置项失败:', error); }
}
// 手动重置插件
function resetNodeAlignProManually() {
    try {
        const container = document.getElementById('hNodeAlignKit'); // 重置容器位置和缩放
        if (container) container.style.transform = 'translate(0px, 0px) scale(1)', container.style.left = '', container.style.top = '';
        if (window.__hColor_Module) window.__hColor_Module.reset();
        if (window.__hMgr_DisplayMode) window.__hMgr_DisplayMode.reset();
        if (window.__hMgr_ACbar) window.__hMgr_ACbar.setLinkMode(0);
        console.log('NodeAlignPro 已手动重置');
    } catch (error) { console.error('手动重置失败:', error); }
}
// 清除所有本地存储
function clearAllStorage() {
    try {
        const storageKeys = ['NodeAlignPro_ShowOperationLog', 'NodeAlignPro_WorkMode', 'NodeAlignPro_AlignButtonColor', 'NodeAlignPro_ToolbarBgColor', 'NodeAlignPro_ToolbarOpacity', 'NodeAlignPro_NewVersionTips', 'NodeAlignPro_LinkMode', 'NodeAlignProPosition', 'NodeAlignProRunButtonLink', 'NodeAlignProDisplayMode', 'NodeAlignPro_ColorApplyMode'];
        storageKeys.forEach(key => { localStorage.removeItem(key); }); console.log('所有相关localStorage项已清除');
    } catch (error) { console.error('清除localStorage失败:', error); }
}