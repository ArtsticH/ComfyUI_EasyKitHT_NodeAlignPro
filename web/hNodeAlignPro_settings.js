import { app } from "../../scripts/app.js";

const NodeAlignProSettings = [
    {
        id: "hNodeAlignPro.ShowOperationLog", name: "显示操作日志", type: "boolean",
        defaultValue: false,
        category: ["🔥 NodeAlignPro", "Z开发人员选项", "显示操作日志"],
        tooltip: "开启后，插件操作日志将输出到页面左上角，方便进阶用户调试",
        onChange: (value) => { try { if (window.NodeAlignProSettingsManager) { window.NodeAlignProSettingsManager.setShowOperationLog(value); } } catch (error) { console.error('设置操作日志显示失败:', error); } }
    },

    {
        id: "hNodeAlignPro.hReset", name: "⚠强制重置NodeAlignPro插件", type: "boolean",
        defaultValue: false,
        category: ["🔥 NodeAlignPro", "Z开发人员选项", "⚠强制重置NodeAlignPro插件"],
        tooltip: "⚠此操作会强制刷新页面,请务必先保存工作流! 开启后会强制重建NodeAlignPro插件，仅在插件异常时使用! ",
        onChange: (value) => {
            if (value) try {
                if (typeof __hReset__hNAP_State === 'function') __hReset__hNAP_State(); else resetNodeAlignProManually(); // 1. 调用核心文件中的重置函数。如果核心重置函数不存在，执行手动重置
                resetAllSettings(); clearAllStorage(); // 2. 重置所有设置；3. 清除所有本地存储
                setTimeout(() => { // 4. 刷新页面以完全重置插件
                    const isResetEnabled = app.ui?.settings?.getSettingValue?.("hNodeAlignPro.hReset"); // 检查开关是否处于关闭状态
                    if (isResetEnabled === true) location.reload(); // 只有当开关处于开启状态时才刷新
                    else { if (hLog) hLog.info('--@hSetting', '重置操作已完成，开关已自动关闭，无需刷新页面'); console.log('重置操作已完成，开关已自动关闭，无需刷新页面'); } // 如果开关已关闭，则不刷新，仅记录日志
                }, 500);
                if (hLog) hLog.info('--@hSetting', '插件已通过设置菜单强制重置，页面将重新加载...');
            } catch (error) { console.error('重置插件失败:', error); if (hLog) hLog.error('--@hSetting', '重置失败:', error); }
        }
    },

    // { id: "hNodeAlignPro.button_test", name: "测试", type: "input", defaultValue: "测试文本", category: ["🔥 NodeAlignPro", "NodeAlignPro预置颜色", "测试"], onChange: (newVal) => { } },

    {
        id: "hNodeAlignPro.linkMode", name: "拖拽方式", type: "combo",
        options: [{ value: "hDragMode1_Split", text: "解 耦(默认)" }, { value: "hDragMode0_Link", text: "联 动" }],
        defaultValue: "hDragMode1_Split",
        category: ["🔥 NodeAlignPro", "NodeAlignPro基本设置", "拖拽方式"],
        tooltip: "切换是否联动[运行/Action]按钮到插件面板（与插件右键菜单设置同步）",
        onChange: (value) => {
            try {
                const mode = value === "hDragMode0_Link" ? 1 : 0; // 直接调用全局的处理函数。或者通过设置管理器。或者直接调用联动管理器
                (typeof __hMenu_Selection === 'function' && __hMenu_Selection(value)) || (window.NodeAlignProSettingsManager && window.NodeAlignProSettingsManager.setLinkMode(mode)) || (window.__hMgr_ACbar && window.__hMgr_ACbar.setLinkMode(mode)) || console.error('无法找到拖拽方式处理函数');
            } catch (error) { console.error('设置拖拽方式失败:', error); }
        }
    },

    {
        id: "hNodeAlignPro.UIScale", name: "UI缩放", type: "combo",
        options: [{ value: "hUIScale_0_5x", text: "0.5x" }, { value: "hUIScale_0_75x", text: "0.75x" }, { value: "hUIScale_1x", text: "1x(默认)" }, { value: "hUIScale_1_25x", text: "1.25x" }, { value: "hUIScale_1_5x", text: "1.5x" }, { value: "hUIScale_2x", text: "2x" }],
        defaultValue: "hUIScale_1x",
        category: ["🔥 NodeAlignPro", "NodeAlignPro基本设置", "UI缩放"],
        tooltip: "调整插件UI缩放比例（与插件右键菜单设置同步）",
        onChange: (value) => { try { if (window.NodeAlignProSettingsManager) { window.NodeAlignProSettingsManager.setUIScale(value); } } catch (error) { console.error('设置UI缩放失败:', error); } }
    },
/*     {
        id: "hNodeAlignPro.UIScale_v2", name: "UI缩放v2", type: "combo",
        options: [{ value: "hUIScale_0_5x", text: "0.5x" }, { value: "hUIScale_0_75x", text: "0.75x" }, { value: "hUIScale_1x", text: "1x(默认)" }, { value: "hUIScale_1_25x", text: "1.25x" }, { value: "hUIScale_1_5x", text: "1.5x" }, { value: "hUIScale_2x", text: "2x" }],
        defaultValue: "hUIScale_1x",
        category: ["🔥 NodeAlignPro", "NodeAlignPro基本设置", "UI缩放v2"],
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
        id: "hNodeAlignPro.WorkMode", name: "工作模式", type: "combo",
        options: [{ value: "hApBar2_Align", text: "-对 齐-" }],
        defaultValue: "hApBar2_Align",
        category: ["🔥 NodeAlignPro", "NodeAlignPro基本设置", "工作模式"],
        tooltip: "切换插件工作模式（与插件右键菜单设置同步）",
        onChange: (value) => { try { if (window.NodeAlignProSettingsManager) { window.NodeAlignProSettingsManager.setWorkMode(value); } } catch (error) { console.error('设置工作模式失败:', error); } }
    },

    {
        id: "hNodeAlignPro.DisplayMode", name: "显示模式", type: "combo",
        options: [{ value: "hDispMode0_Always", text: "常驻显示(默认)" }, { value: "hDispMode1_Follow", text: "跟随选框" }],
        defaultValue: "hDispMode0_Always",
        category: ["🔥 NodeAlignPro", "NodeAlignPro基本设置", "显示模式"],
        tooltip: "切换插件面板的显示模式（与插件右键菜单设置同步）",
        onChange: (value) => { try { if (window.NodeAlignProSettingsManager) { window.NodeAlignProSettingsManager.setDisplayMode(value); } } catch (error) { console.error('设置显示模式失败:', error); } }
    },

    {
        id: "hNodeAlignPro.hColor_SVG", name: "对齐按钮颜色", type: "color",
        defaultValue: "6B6B70",
        category: ["🔥 NodeAlignPro", "NodeAlignPro预置颜色", "对齐按钮颜色"],
        tooltip: "控制对齐按钮颜色",
        onChange: (newVal) => { try { if (window.NodeAlignProSettingsManager) { window.NodeAlignProSettingsManager.setAlignButtonColor(newVal); } } catch (error) { console.error('设置对齐按钮颜色失败:', error); } }
    },

    {
        id: "hNodeAlignPro.hColor_bg", name: "工具栏背景色", type: "color",
        defaultValue: "18181B",
        category: ["🔥 NodeAlignPro", "NodeAlignPro预置颜色", "工具栏背景色"],
        tooltip: "控制对齐组件的背景色",
        onChange: (newVal) => { try { if (window.NodeAlignProSettingsManager) { window.NodeAlignProSettingsManager.setToolbarBgColor(newVal); } } catch (error) { console.error('设置工具栏背景色失败:', error); } }
    },

    {
        id: "hNodeAlignPro.hOpacity", name: "工具栏透明度", type: "slider",
        defaultValue: 95,
        attrs: { min: 0, max: 100, step: 1 },
        category: ["🔥 NodeAlignPro", "NodeAlignPro预置颜色", "工具栏透明度"],
        tooltip: "控制对齐组件的背景透明度",
        onChange: (newVal) => { try { if (window.NodeAlignProSettingsManager) { window.NodeAlignProSettingsManager.setToolbarOpacity(newVal); } } catch (error) { console.error('设置工具栏透明度失败:', error); } }
    },

    {
        id: "hNodeAlignPro.NewVersionTips", name: "新版说明", type: "boolean",
        defaultValue: true,
        category: ["🔥 NodeAlignPro", "NodeAlignPro基本设置", "新版说明"],
        tooltip: "v2.0.3_rc新版功能：按Shift、Alt、Ctrl Alt切换不同色卡模式... Alt+对齐按钮：对齐到“反向基准”节点^_^",
        onChange: (value) => { try { if (window.NodeAlignProSettingsManager) { window.NodeAlignProSettingsManager.setNewVersionTips(value); } } catch (error) { console.error('设置新版说明失败:', error); } }
    },

    {
        id: "hNodeAlignPro.ColorApplyMode", name: "上色模式", type: "combo",
        options: [ { value: "1", text: "整体色" }, { value: "0", text: "仅标题" } ],
        defaultValue: "1",
        category: ["🔥 NodeAlignPro", "NodeAlignPro节点设置", "上色模式"],
        tooltip: "设置节点上色模式：整体色（背景+标题）或仅标题色",
        onChange: (value) => { try { if (window.NodeAlignProSettingsManager) window.NodeAlignProSettingsManager.setColorApplyMode(parseInt(value)); } catch (error) { console.error('设置上色模式失败:', error); } }
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
        if (app.ui?.settings?.addSetting) {
            NodeAlignProSettings.forEach(setting => { try { app.ui.settings.addSetting(setting); } catch (err) { console.warn(`[NodeAlignPro.Settings] 注册设置项${setting.id}失败：`, err); } }); initNodeAlignProSettings(); // 注册设置项初始化设置
        }
        console.info("[NodeAlignPro.Settings] registered", NodeAlignProSettings.map(s => s.id));
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