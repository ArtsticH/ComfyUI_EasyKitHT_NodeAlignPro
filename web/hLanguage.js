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
 * @created 2025-04-29 @date 2025-06-15 @lastUpdated 2026-03-05 @version v2.1.18 @license GPL-3.0
 * @copyright ©2012-2026, All rights reserved. Freely open to use, modify, and distribute in accordance with the GPL-3.0 license.
 */

// 本插件全局默认官方语言为中文(cn)。国际友人可自行切换英文，支持'auto'以跟随浏览器/ComfyUI的语言设置
// This plugin uses Chinese (cn) as the global default language. International users can switch to English. The 'auto' setting is also supported to follow the browser or ComfyUI's language preference.

// NodeAlignPro 全局国际化配置
// 在 `window.hLanguage` 对象上提供 `t(key)` 辅助函数和 `lang` 属性（支持getter/setter）
(function(){
    'use strict';
    const data = {
        NodeAlignPro_Title: {cn: 'Node Align Pro', en: 'Node Align Pro'},
        // 头部/菜单/标签文字
        Menu_LogoTitle: {cn: '菜单栏 LOGO', en: 'Menu Logo'},
        Title_Search: {cn: '搜索节点 Github@ArtsticH...', en: 'Search nodes Github@ArtsticH...'},
        Aria_ModeSwitch: {cn: '模式切换', en: 'Mode Switch'},
        Aria_Menu: {cn: '菜单', en: 'Menu'},
        Label_Align: {cn: '对齐:', en: 'Align:'},
        Label_Distribute: {cn: '分布:', en: 'Distribute:'},
        Label_Mode: {cn: '模式', en: 'Mode'},
        Label_Size: {cn: '尺寸:', en: 'Size:'},
        Label_Select: {cn: '选择:', en: 'Select:'},
        Aria_SelectMode: {cn: '框选模式', en: 'Selection Mode'},
        Aria_GroupMode: {cn: '群组模式', en: 'Group Mode'},
        Aria_Separator: {cn: '分隔线', en: 'Separator'},
        Aria_DragMove: {cn: '按住拖移位置', en: 'Hold to drag/move'},
        ColorPicker_Title: {cn: 'hColorPicker™', en: 'hColorPicker™'},
        ColorPicker_HexLabel: {cn: '十六进制:', en: 'Hex:'},
        ColorPicker_RGBLabel: {cn: 'RGB:', en: 'RGB:'},
        ColorPicker_NodeMode: {cn: '整体色', en: 'Whole Color'},
        ColorPicker_NodeModeTip: {cn: '👆双击切换上色模式：', en: '👆Double-click to toggle color mode:'},
        Panel_TestTitle: {cn: 'Node 2.0 Alignment Test', en: 'Node 2.0 Alignment Test'},
        ColorPicker_HueLabel: {cn: '色相(H):', en: 'Hue (H):'},
        ColorPicker_SatLabel: {cn: '饱和(S):', en: 'Sat (S):'},
        ColorPicker_BriLabel: {cn: '亮度(B):', en: 'Bri (B):'},
        Btn_LeftAlign: {cn: '左对齐', en: 'Left Align'},
        Btn_RightAlign: {cn: '右对齐', en: 'Right Align'},
        Btn_TopAlign: {cn: '顶对齐', en: 'Top Align'},
        Btn_BottomAlign: {cn: '底对齐', en: 'Bottom Align'},
        Btn_HCenter: {cn: '水平居中', en: 'H Center'},
        Btn_VCenter: {cn: '垂直居中', en: 'V Center'},
        Btn_DistH: {cn: '水平等距分布', en: 'Dist H'},
        Btn_DistV: {cn: '垂直等距分布', en: 'Dist V'},
        Btn_EqualWidth: {cn: '等宽', en: 'Equal Width'},
        Btn_EqualHeight: {cn: '等高', en: 'Equal Height'},
        Picker_ScreenPickUnsupported: {cn: '浏览器不支持屏幕取色功能，请使用最新版Chrome/Edge浏览器', en: 'Browser does not support EyeDropper API; use latest Chrome/Edge.'},
        Pick_NoSelection: {cn: '未选中任何节点', en: 'No nodes selected'},
        Setting_ShowOperationLog: {cn: '显示操作日志 (Show Operation Log)', en: 'Show Operation Log'},
        Setting_ForceReset: {cn: '⚠强制重置NodeAlignPro插件 (Force reset NodeAlignPro plugin)', en: '⚠Force reset NodeAlignPro plugin'},
        hSelKit_DragMode: {cn: '拖拽方式:', en: 'Drag Mode'},
        hSelKit_UIscale: {cn: 'UI缩放:', en: 'UI Scale'},
        hSelKit_WorkMode: {cn: '工作模式:', en: 'Work Mode'},
        hSelKit_DisplayMode: {cn: '显示模式:', en: 'Display Mode'},
        Setting_DragMode: {cn: '拖拽方式 (Drag Mode)', en: 'Drag Mode'},
        Setting_UIScale: {cn: 'UI缩放 (UI Scale)', en: 'UI Scale'},
        Setting_WorkMode: {cn: '工作模式 (Work Mode)：可开启新版Node2.0对齐模式', en: 'Work Mode'},
        hTooltip_WorkMode: { cn: '工作模式：切换插件工作模式，可开启新版Node2.0对齐模式', en: 'Work Mode: Switch plugin working mode (sync with right-click menu). Enable new Node2.0 alignment mode.' },
        Setting_DisplayMode: {cn: '显示模式 (Display Mode)', en: 'Display Mode'},
        Setting_AlignBtnColor: {cn: '对齐按钮颜色 (Align Button Color)', en: 'Align Button Color'},
        Setting_ToolbarBgColor: {cn: '工具栏背景色 (Toolbar Background Color)', en: 'Toolbar Background Color'},
        Setting_ToolbarColor_Auto: {cn: '使用ComfyUI主题配色(Use ComfyUI theme color)', en: 'Use ComfyUI theme color'},
        Setting_ToolbarColor_Auto1: {cn: '若开启，将ComfyUI主题配色，下方手动设置的颜色将无效(If enabled, ComfyUI theme color will be used, and manual color setting will be ignored)', en: 'If enabled, ComfyUI theme color will be used, and manual color setting will be ignored'},
        Setting_ToolbarOpacity: {cn: '工具栏透明度 (Toolbar Opacity)', en: 'Toolbar Opacity'},
        Setting_NewVersionTips: {cn: '新版说明 (New Version Tips)', en: 'New Version Tips'},
        Setting_ColorApplyMode: {cn: '上色模式 (Color Apply Mode)', en: 'Color Apply Mode'},
        Setting_Language: {cn: 'NodeAlignPro UI语言 (Language)', en: 'NodeAlignPro UI Language'},
        // 选项标签文字
        Option_Lang_CN: {cn: '中文', en: '中文'},
        Option_Lang_EN: {cn: 'English', en: 'English'},
        hSelKit_DragSplit: {cn: '解 耦', en: 'Split'},
        hSelKit_DragSplit2: {cn: '解 耦(Split)', en: 'Split'},
        hSelKit_DragLink: {cn: '联 动', en: 'Link'},
        hSelKit_DragLink2: {cn: '联 动(Link)', en: 'Link'},


        hSelKit_APBall: {cn: 'AP球', en: 'AP Ball'},
        hSelKit_StdBar: {cn: '标 准', en: 'Standard'},
        hSelKit_AlignAuto: {cn: '自动', en: 'Auto'},
        hSelKit_AlignAuto2: {cn: '自动(Auto)', en: 'Auto'},
        hSelKit_ColorBar: {cn: '色 卡', en: 'ColorBar'},
        hSelKit_ColorBar2: {cn: '色卡(ColorBar)', en: 'ColorBar'},
        hSelKit_AlignBar: {cn: '传统对齐', en: 'AlignStd'},
        hSelKit_AlignBar2: {cn: '传统对齐(AlignStd)', en: 'AlignStd'},
        hSelKit_Node2: {cn: 'Node2.0', en: 'Node2.0'},
        hSelKit_ProBar: {cn: '专 业', en: 'Pro'},

        hSelKit_Always: {cn: '常驻显示', en: 'Always'},
        hSelKit_Always2: {cn: '常驻显示(Always)', en: 'Always'},
        hSelKit_Follow: {cn: '跟随选框', en: 'Follow+'},
        hSelKit_Follow2: {cn: '跟随选框(Follow+)', en: 'Follow+'},
        hNodePreview_Tips: {cn: '👆双击切换上色模式：', en: '👆Dbl-Click this:　'},
        Option_Color_Whole: {cn: '整体色', en: 'Whole Color'},
        Option_Color_Whole2: {cn: '整体色(Whole)', en: 'Whole Color'},
        Option_Color_TitleOnly: {cn: '仅标题', en: 'Title Only'},
        Option_Color_TitleOnly2: {cn: '仅标题(Title)', en: 'Title Only'},

        hDebug_Tips: {
            cn: '<font color ="#70A3F3"><strong>v2.1.17新功能</strong></font>：<br>&Tab;0. <span style="color:#70A3F3;">启用自动主题色</span>：左下角ComfyUI设置>🔥NodeAlignPro>【使用ComfyUI主题配色】<br>&Tab;1. <span style="color:#70A3F3;">启用新版Node2.0模式</span>：右键菜单>工作模式>【Node2.0】<br>&Tab;2. <span style="color:#70A3F3;">高级对齐</span>：Alt+对齐按钮：对齐到“反向基准”节点<br>&Tab;3. <span style="color:#70A3F3;">色卡切换</span>：按Shift、Alt、Ctrl Alt切换不同色卡模式...<br>________________<br>&Tab;4. <span style="color:#70A3F3;">Switch English</span>：ComfyUI Menu> Language>【English】<br>________________<br>^_^（右键菜单><font color ="#70A3F3">新版说明</font>隐藏本提示）',
            en: '<font color="#70A3F3"><strong>v2.1.17 New Features</strong></font>:<br>&Tab;0. <span style="color:#70A3F3;">Auto-Theme-Color</span>: Bottom left Settings > 🔥NodeAlignPro > 【Use ComfyUI Theme Colors】<br>&Tab;1. <span style="color:#70A3F3;">Node2.0 Mode</span>: Right-click Menu > Work Mode > 【Node2.0】<br>&Tab;2. <span style="color:#70A3F3;">Advanced Alignment</span>: Alt + Align Button: Align to "Reverse Reference" Node<br>&Tab;3. <span style="color:#70A3F3;">Color Palette Switching</span>: Press Shift, Alt, Ctrl+Alt to switch different color palette modes...<br>________________<br>&Tab;4. <span style="color:#70A3F3;">切换中文</span>：ComfyUI菜单>NodeAlignPro UI语言 (Language)>【中文】<br>________________<br>^_^ (Right-click Menu > <font color="#70A3F3">NewTips</font> to hide this tip)'
        },
        Aria_ClearColor: {cn: '清除颜色', en: 'Clear Color'},
        Aria_Pick: {cn: '取色', en: 'Pick Color'},
        Aria_RandomColor: {cn: '随机颜色', en: 'Random Color'},
        Aria_ScreenPick: {cn: '屏幕取色', en: 'Screen Pick'},
        Aria_Prev: {cn: '上个', en: 'Previous'},
        Aria_Next: {cn: '下个', en: 'Next'},
        Select_SameColor: {cn: '相同颜色', en: 'Same Color'},
        Select_SameName: {cn: '相同名称', en: 'Same Name'},
        Select_SameSize: {cn: '相同尺寸', en: 'Same Size'},
        Select_DefaultColor: {cn: '默认色', en: 'Default Color'},
        Select_Colored: {cn: '已上色', en: 'Colored'},
        Select_State: {cn: '选择状态', en: 'Select State'},
        Tool_MagicWand: {cn: '魔棒', en: 'Magic Wand'},
        Aria_Rename: {cn: '重命名', en: 'Rename'},
        hMenu_ResetAll: {cn: '快速重置', en: 'FastReset'},
        hMenu_BugReport: {cn: 'bug反馈', en: 'Bug2Issue'},
        hMenu_Guide: {cn: '使用教程', en: 'Guide'},
        hMenu_NewTips: {cn: '新版说明', en: 'New Tips'},
        // 按需添加更多键值
    };

    const state = { lang: 'cn' };

    // 从ComfyUI或浏览器检测实际使用的语言
    function detectLang() {
        try {
            // 优先尝试ComfyUI应用级别的设置（如果可用）
            if (window.app && window.app.ui && typeof window.app.ui.settings?.getSettingValue === 'function') {
                const v = window.app.ui.settings.getSettingValue('language') || window.app.ui.settings.getSettingValue('lang');
                if (v && typeof v === 'string') {
                    const lv = v.toLowerCase();
                    if (lv.startsWith('en')) return 'en';
                    if (lv.startsWith('zh')) return 'cn';
                }
            }
            // 回退到浏览器语言设置
            const nav = (navigator && (navigator.language || navigator.userLanguage || '')).toLowerCase();
            if (nav.startsWith('en')) return 'en';
            if (nav.startsWith('zh')) return 'cn';
        } catch (e) { /* 忽略 */ }
        return 'cn';
    }

    // 简单的翻译函数：t(key)
    function t(key) {
        if (!key) return '';
        const entry = data[key];
        if (!entry) return key;
        const langToUse = (state.lang === 'auto') ? detectLang() : (state.lang || 'cn');
        return entry[langToUse] || entry.cn || Object.values(entry)[0];
    }

    // 增强的翻译函数：支持HTML标签和换行符
    function tHtml(key) {
        if (!key) return '';
        const entry = data[key];
        if (!entry) return key;
        const langToUse = (state.lang === 'auto') ? detectLang() : (state.lang || 'cn');
        let text = entry[langToUse] || entry.cn || Object.values(entry)[0];
        
        if (!text) return '';
        
        // 处理换行符：将\n转换为<br>
        text = text.replace(/\n/g, '<br>');
        
        return text;
    }

    // 将API暴露在window对象上
    window.hLanguage = {
        t,
        tHtml, // 新增支持HTML的翻译函数
        data,
        getLang() { return state.lang; },
        setLang(l) { state.lang = (l === 'auto') ? 'auto' : ((l === 'en') ? 'en' : 'cn'); return state.lang; },
        detectLang,
        // 通过键值（data-i18n属性）翻译DOM元素文本内容的辅助函数
        applyToDOM(root = document) {
            try {
                // 翻译textContent / placeholder / value属性
                // 跳过仅需翻译属性（data-i18n-attr）的元素
                root.querySelectorAll('[data-i18n]').forEach(el => {
                    if (el.hasAttribute('data-i18n-attr')) return; // 保留SVG/图标内容不翻译
                    const key = el.getAttribute('data-i18n');
                    if (!key) return;
                    
                    // 检查是否需要HTML支持
                    const useHtml = el.hasAttribute('data-i18n-html');
                    const text = useHtml ? tHtml(key) : t(key);
                    
                    if (!text) return;
                    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                        el.placeholder = text;
                        if (el.type === 'button' || el.type === 'submit') el.value = text;
                    } else {
                        if (useHtml) {
                            // 使用innerHTML来支持HTML标签
                            el.innerHTML = text;
                        } else {
                            // 使用textContent保持原有行为
                            el.textContent = text;
                        }
                    }
                });

                // 通过data-i18n-attr属性翻译aria-label、title等属性
                root.querySelectorAll('[data-i18n][data-i18n-attr]').forEach(el => {
                    try {
                        const key = el.getAttribute('data-i18n');
                        const attrName = el.getAttribute('data-i18n-attr');
                        if (!key || !attrName) return;
                        
                        // 检查是否需要HTML支持
                        const useHtml = el.hasAttribute('data-i18n-html');
                        const text = useHtml ? tHtml(key) : t(key);
                        
                        if (!text) return;
                        el.setAttribute(attrName, text);
                    } catch (ee) { /* 忽略单个元素的翻译错误 */ }
                });
            } catch (e) { console.warn('hLanguage.applyToDOM failed:', e); }
        }
    };

    // DOM内容加载完成后自动应用翻译，更新所有带data-i18n属性的元素
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.hLanguage.applyToDOM(document);
        });
    } else {
        setTimeout(() => window.hLanguage.applyToDOM(document), 50);
    }
})();

export default window.hLanguage;