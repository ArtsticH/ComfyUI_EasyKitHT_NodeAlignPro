
// ======================== 导入颜色SVG模板 ========================
import { ColorSVGs } from "./web/color_svgs.js";





// ======================== 公共构建工具 ========================
const buildSVG = (innerContent, { t, pId }) => {
    return `<svg t="${t}" class="icon" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" p-id="${pId}" width="100%">
        ${innerContent}
    </svg>`;
};

// ======================== 基础图形元素 ========================
const Elements = {
    // 标准矩形（严格使用原始坐标参数）
    rect: (x, y, width, height) => 
        `<rect class="ht-1" x="${x}" y="${y}" width="${width}" height="${height}" rx="1" ry="1"/>`,

    // 垂直线（精确到像素）
    vLine: (x, height = 24) =>
        `<rect class="ht-1" x="${x}" y="${(32 - height)/2}" width="2" height="${height}" rx="1"/>`,

    // 水平线（精确到像素）
    hLine: (y, width = 24) =>
        `<rect class="ht-1" x="${(32 - width)/2}" y="${y}" width="${width}" height="2" rx="1"/>`,

    // 拖动点矩阵
    dotMatrix: () => {
        const dots = [];
        // 原始坐标：三行两列
        const positions = [
            [11, 6], [21, 6],
            [11, 16], [21, 16],
            [11, 26], [21, 26]
        ];
        positions.forEach(([cx, cy], index) => {
            dots.push(`<circle ${index === 0 ? 'id="dot"' : ''} class="ht-2" cx="${cx}" cy="${cy}" r="2"/>`);
        });
        return dots.join('');
    }
};

// ======================== 具体图标模板 ========================
const Templates = {
    // 拖动按钮
    moveElement: () => {
        const dotMatrixContent = Elements.dotMatrix().replace(/id="dot"/g, 'id="base-dot"');
        return `
            <defs>${dotMatrixContent}</defs>
            ${dotMatrixContent.replace(/id="base-dot"/g, 'use href="#base-dot"')}
        `;
    },

    // 左对齐
    alignLeft: () => `
        ${Elements.rect(10, 9, 12, 6)}
        ${Elements.rect(10, 19, 18, 6)}
        ${Elements.vLine(5, 24)}`,

    // 竖向居中对齐
    alignCenterVertically: () => `
        ${Elements.rect(9, 9, 14, 6)}
        ${Elements.rect(6, 19, 20, 6)}
        ${Elements.vLine(15, 24)}`,

    // 右对齐
    alignRight: () => `
        ${Elements.rect(11, 9, 12, 6)}
        ${Elements.rect(5, 19, 18, 6)}
        ${Elements.vLine(26, 24)}`,

    // 顶部对齐
    alignTop: () => `
        ${Elements.rect(8, 9, 6, 12)}
        ${Elements.rect(18, 9, 6, 18)}
        ${Elements.hLine(5, 24)}`,

    // 横向居中对齐
    alignCenterHorizontally: () => `
        ${Elements.rect(18, 6, 6, 20)}
        ${Elements.rect(8, 9, 6, 14)}
        ${Elements.hLine(15, 24)}`,

    // 底部对齐
    alignBottom: () => `
        ${Elements.rect(8, 11, 6, 12)}
        ${Elements.rect(18, 5, 6, 18)}
        ${Elements.hLine(26, 24)}`,

    // 横向分布	基准线（y=7，长度24px）
    horizontalDistribution: () => `
        ${Elements.rect(19, 5, 2, 7)}
        ${Elements.rect(11, 5, 2, 7)}
        ${Elements.rect(19, 13, 6, 11)}
        ${Elements.rect(7, 13, 6, 15)}
        ${Elements.hLine(7, 24)}`,

    // 竖向分布	基准线（x=6，高度24px）
    verticalDistribution: () => `
        ${Elements.rect(12, 7, 11, 6)}
        ${Elements.rect(4, 11, 7, 2)}
        ${Elements.rect(4, 19, 7, 2)}
        ${Elements.rect(12, 19, 16, 6)}
        ${Elements.vLine(6, 24)}`,

    // 等宽
    equalWidth: () => `
        ${Elements.rect(9, 9, 14, 6)}
        ${Elements.rect(11, 19, 10, 6)}
        ${Elements.vLine(4, 24)}
        ${Elements.vLine(26, 24)}
        ${Elements.rect(4, 21, 5, 2)}
        ${Elements.rect(23, 21, 5, 2)}`,

    // 等高
    equalHeight: () => `
        ${Elements.rect(18, 9, 6, 14)}
        ${Elements.rect(8, 11, 6, 10)}
        ${Elements.hLine(4, 24)}
        ${Elements.hLine(26, 24)}
        ${Elements.rect(10, 4, 2, 5)}
        ${Elements.rect(10, 23, 2, 5)}`
};

// ======================== 最终导出的SVG常量 ========================
const moveElementSvg = buildSVG(Templates.moveElement(), { 
    t: '1745769856000', 
    pId: '8808' 
});

const alignLeftSvg = buildSVG(Templates.alignLeft(), {
    t: '1725534370541',
    pId: '2104'
});

const alignCenterVerticallySvg = buildSVG(Templates.alignCenterVertically(), {
    t: '1725534363707',
    pId: '1810'
});

const alignRightSvg = buildSVG(Templates.alignRight(), {
    t: '1725534384109',
    pId: '2398'
});

const alignTopSvg = buildSVG(Templates.alignTop(), {
    t: '1725534367556',
    pId: '1957'
});

const alignCenterHorizontallySvg = buildSVG(Templates.alignCenterHorizontally(), {
    t: '1725534379860',
    pId: '2251'
});

const alignBottomSvg = buildSVG(Templates.alignBottom(), {
    t: '1725534360155',
    pId: '1663'
});

const horizontalDistributionSvg = buildSVG(Templates.horizontalDistribution(), {
    t: '1725534354023',
    pId: '1516'
});

const verticalDistributionSvg = buildSVG(Templates.verticalDistribution(), {
    t: '1725534350231',
    pId: '1369'
});

const equalWidthSvg = buildSVG(Templates.equalWidth(), {
    t: '1725606034670',
    pId: '7216'
});

const equalHeightSvg = buildSVG(Templates.equalHeight(), {
    t: '1725606224564',
    pId: '7793'
});
    







// 实现ButtonManager对象
const ButtonManager = {
	
    
	// 2025-04-28 18:44:47 ================= 颜色配置 =================
    ColorConfig: {
        colors: {
            red: '#a93232',
            orange: '#79461d',
            yellow: '#6e6e1d',
            green: '#2b652b',
            cyan: '#248382',
            blue: '#246283',
            purple: '#3c3c83',
            custom: '#ffffff' // 自定义颜色占位符
        },
        // 新增颜色映射
        colorMapping: {
            titleDarken: -0.1,   // 标题颜色加深比例
            noteTextLighten: 0.2 // 注释文本提亮比例
        }
    },

    isInitialized: false, // 检查是否已经初始化
    buttonContainer: null, // 保存按钮容器
    contextMenu: null, // 右键菜单
    isPermanent: true, // 是否为常驻显示按钮
    initialX: 0,  // 初始位置X
    initialY: 0,  // 初始位置Y
    dragStartX: 0, // 拖拽开始时的X
    dragStartY: 0, // 拖拽开始时的Y
    isDragging: false, // 检查是否正在拖拽
    hasShownTooltip: false, // 检查是否已经显示过提示
    isShow: true, // 是否显示按钮
  
    // 初始化按钮
    init() {
        if (this.isInitialized) return; // 如果已经初始化过，不再重复创建

        this.boundOnDragging = this.onDragging.bind(this);
        this.boundOnDragEnd = this.onDragEnd.bind(this);

        // 使用 CSS 定义 hover 效果和所有样式
        const style = document.createElement('style');
		style.textContent = `
            /* 2025-04-28 07:56:21 ArtsticH-提取自 SVG 的全局通用样式 */
            .ht-1 {
                fill: #6b6b70;		/* 主图标颜色 */
                stroke-width: 0px;
            }
            .ht-2 {
                fill: #525252;		/* 拖动按钮圆点颜色 */
                stroke-width: 0px;
            }
			
			#alignment-buttons {	/* 【对齐按钮组样式】 */
				/* white-space: nowrap;	设置元素为绝对定位方式			position: absolute; */
				top: 20px;				/* 设置元素距离顶部的偏移量			top: 20px; */
				right: 10px;			/* 设置元素距离右侧的偏移量			right: 10px; */
				left: 10px;			/* 取消元素左侧定位设置				left: unset; */
				bottom: unset;			/* 取消元素底部定位设置				bottom: unset; */
				display: flex;			/* 设置元素为弹性布局显示			display: flex; */
				flex-direction: row; /* 使子元素垂直排列column; */
				background: #18181B;	/* 设置元素的背景颜色（建议#161616,18181B）	background: #2b2b2b; */
				padding: 8px;			/* 设置元素的内边距					padding: 4px; */
				border-radius: 6px;		/* 设置元素的边框圆角				border-radius: 4px; */
				z-index: 9999;			/* 设置元素的层级，确保在上方显示 	z-index: 9999; */

				width: fit-content;			/*设置元素的宽度	760px;519px;503px;461px;414px;382px				width: 290px; */
				height: 48px;			/* 设置元素的高度	46px				height: 32px; */	
				position: absolute;		/* 禁止文本换行，使按钮同行显示 	white-space: nowrap; */
				border: 1px solid;		/* 2025-04-27 23:32:07	Artstich新增*/
				border-color: #3D3D43;		/* 2025-04-27 23:32:07	Artstich新增*/
				align-self: center;     /* 新增：确保单个按钮垂直居中 */
				box-sizing: border-box; /* 新增：防止padding影响高度计算 */
				/* place-items: center; 子元素水平和垂直居中 */
				/* text-align: center; 让子元素水平居中 */
				max-width: 800;
				min-width: 420;
			}
			/* 禁止子元素改变容器尺寸 */
			#alignment-buttons > * {
			    flex-shrink: 0;
			}

			.custom-button {		/* 单个按钮样式 */
				width: 32px;			/* 设置按钮的宽度					width: 25px; */
				height: 32px;			/* 设置按钮的高度					height: 25px; */
				background-size: contain;	/* 设置背景图片大小以适应元素	background-size: contain; */
				background-repeat: no-repeat;	/* 设置背景图片不重复显示	background-repeat: no-repeat; */
				background-position: center;	/* 设置背景图片居中显示		background-position: center; */
				background-color: #18181B;	/* 设置按钮的背景颜色（建议#161616,18181B）	background-color: #2b2b2b; */
				border: none;			/* 设置按钮无边框					border: none; */
				cursor: pointer;		/* 设置鼠标悬停按钮时的指针样式		cursor: pointer; */
				padding: 4px;			/* 设置按钮的内边距					padding: 4px; */
				border-radius: 4px;		/* 设置按钮的边框圆角				border-radius: 4px; */
				transition: background-color 0.3s ease;	/* 设置按钮背景颜色过渡效果		transition: background-color 0.3s ease; */
				align-self: center;			/* 新增：确保单个按钮垂直居中 */
				vertical-align: middle;      /* 修复 SVG 图标基线偏移问题 */
				display: inline-flex;        /* 改为行内弹性布局 */
				align-items: center;         /* 按钮内部垂直居中 */
				justify-content: center;     /* 按钮内部水平居中 */
			}
			.custom-button:hover {	/* 【按钮悬浮效果】 */
				background-color: #222226;	/* 设置鼠标悬停按钮时的背景颜色		background-color: #141414; */
			}
			/* ↓2025-04-28 01:09:28	Artstich新增移动按钮专属悬浮色-开始	fill: #232935 !important; */
			#moveElement:hover {
			    background-color: #70A3F3 !important;
			    cursor: move;
			}

			/* ↓2025-04-28 18:00:05 新增SVG图标样式-开始 */
			/* .custom-button { border: 1px solid red !important; }		显示按钮大小位置示意测试 */
			.custom-button svg path {
				pointer-events: none; /* 防止路径阻挡点击 */
			}
			.custom-button:hover svg {
				filter: drop-shadow(0 2px 4px rgba(255,255,255,0.2));
			}

			/* #moveElement:hover svg .ht-1 {fill: #232935 !important;} */
			#alignment-buttons #moveElement:hover svg .ht-1 {  /* 精准覆盖 SVG 内部类名 */
			    fill: #232935 !important;    /* 优先级覆盖内联样式-增加嵌套层级 */
			}
			/* ↑2025-04-28 01:09:28	Artstich新增移动按钮专属悬浮色-结束 */
			.divider {			/* 【按钮分割线】 */
				width: 1px;				/* 设置分割线的宽度					width: 3.2px; */
				height: 40px;			/* 设置分割线的高度					height: 15px; */
				background-color: #27272B;	/* 设置分割线的背景颜色(建议#111117,27272B)	background-color: #1e1e1e; */
				margin: 0px 10px;		/* 设置分割线的外边距-6px 10px;		margin: 5px 4px; */
				border-radius: 9px;		/* 设置分割线的边框圆角				border-radius: 9px; */
				cursor: move; 			/* 设置鼠标悬停分割线时的指针样式	cursor: grab; */ 
				align-self: center;     /* 新增：确保单个按钮垂直居中 */
			}
			.divider:active {	/* 【按钮分割线-鼠标悬浮样式】用以拖动 */
				cursor: grabbing;		/* 设置鼠标按下分割线时的指针样式	cursor: grabbing; */
			}



			/* 提示样式 */
			#tooltip {			/* 【提示框样式】 */
				position: absolute;		/* 设置提示框为绝对定位方式		position: absolute; */
				bottom: -20px;			/* 设置提示框距离底部的偏移量	bottom: -20px; */
				right: 0;				/* 设置提示框距离右侧的偏移量	right: 0; */
				background: #70A3F3;	/* 设置提示框的背景颜色			background: #333; */
				color: white;			/* 设置提示框内文字的颜色		color: white; */
				padding: 5px 10px;		/* 设置提示框的内边距			padding: 5px 10px; */
				border-radius: 6px;		/* 设置提示框的边框圆角			border-radius: 6px; */
				display: none;			/* 设置提示框默认隐藏			display: none; */
				z-index: 1001;			/* 设置提示框的层级				z-index: 1001; */
				white-space: nowrap;	/* 禁止提示框内文本换行			white-space: nowrap; */
				font-size: 16px;		/* 设置提示框内文字的字体大小	font-size: 12px; */
			}



			/* 2025-04-28 03:48:09 ArtsticH新增-右键菜单容器样式 */
			#context-menu {
				display: flex;
				width: 1300;
				height: 32px;
				z-index: 9999;
				margin-left: -200px; /* 向左偏移 20px */
				background: #70A3F3;	/* 设置提示框的背景颜色-测试定位用			background: #333; */
				/* display: inline-block; */
				/* vertical-align: middle; */
				align-self: center;     /* 新增：确保单个按钮垂直居中 */
				/* place-items: center; 子元素水平和垂直居中 */
				/* text-align: center; 让子元素水平居中 */
			}
			/* 2025-04-28 03:48:09 ArtsticH新增-右键菜单按钮样式-精准控制按钮垂直位置 */
			#context-menu button {
			    font-size: 16px;			/* 字号 */
			    background: #09090B;        /* 背景色		background: #18181B; */
			    border: 1px solid #3D3D43;  /* 边框颜色		border: 1px solid #3D3D43; */
			    border-radius: 6px;         /* 圆角			border-radius: 6px; */
			    color: #fff;                /* 文字颜色		color: #fff; */
			    padding: 6px 12px;          /* 内边距		padding: 6px 12px; */
			    margin: 0 3px;              /* 按钮间距		margin: 0 4px; */
			    cursor: pointer;            /* 鼠标手势		cursor: pointer; */
			    transition: all 0.1s ease;  /* 过渡动画		transition: all 0.2s ease; */
			    /* position: relative !important; */
				/* top: -4.5px !important;          微调垂直偏移量 */
				/* right: 35px !important;          微调水平偏移量 */
				/* vertical-align: middle !important; */
			}
			/* 2025-04-28 03:48:09 ArtsticH新增-悬停效果 */
			#context-menu button:hover {
			    background: #222226;		/* 悬停背景色	background: #222226; */
			    border-color: #70A3F3;		/* 悬停边框色	border-color: #70A3F3; */
			    transform: scale(1.1);		/* 轻微放大		transform: scale(1.1); */
			}
			/* 2025-04-28 03:48:09 ArtsticH新增-点击效果 */
			#context-menu button:active {
			    background: #2D2D32;        /* 点击背景色	background: #2D2D32; */
			    transform: scale(0.98);     /* 轻微缩小		transform: scale(0.98); */
			}
			/* 2025-04-28 03:48:09 ArtsticH新增-文字标签和文字链接样式 */
			#context-menu a.no-underline {
			    color: #A1A1AA;             /* 文字颜色		color: #A1A1AA; */
			    text-decoration: none;      /* 去除下划线	text-decoration: none; */
			    margin-right: 8px;          /* 右侧间距		margin-right: 8px; */
			    /* display: inline-block !important; */
				/* vertical-align: middle !important; */
				/* line-height: 32px !important; 与按钮高度一致 */
				/* margin-right: 8px !important; */
			}


			/* 2025-04-28 18:44:47 新增颜色按钮专用样式 */
			#alignment-buttons [id^="color"] {
				width: 24px !important;		/* width: 16px !important; */
				height: 24px !important;	/* height: 16px !important; */
				padding: 0px !important;	/* 内边距	padding: 2px !important; */
				margin: 0 2px !important;	/* 外边距	margin: 0 4px !important; */
				background: none !important;
				margin-top: 40px; /* 增加上边距，使颜色按钮位于基础按钮下方 */
			}
			#alignment-buttons [id^="color"] svg {
				display: block !important;
				width: 100% !important;
				height: 100% !important;
				transition: transform 0.1s ease;
			}

			#alignment-buttons [id^="color"]:hover svg {
				transform: scale(1.5);
				filter: drop-shadow(0 2px 4px rgba(255,255,255,0.2));
			}

			/* 2025-04-28 18:44:47 颜色按钮激活状态 */
		    .custom-button.color-active {
		        box-shadow: 0 0 0 2px #70A3F3;
		    }

			/* 颜色选择器图标特殊样式 */
			#colorCustom svg {
				position: relative;
				background: rgba(0,0,0,1);	/* rgba(7,7,8,0.8); background: rgba(100,100,100,0.3); */
				border-radius: 50%;		/* border-radius: 6px; */
				transition: transform 0.1s ease;	/* 2025-04-28 18:44:47 颜色选择器图标动画 */
			}
		    #colorCustom:hover svg {
		        transform: rotate(15deg);
		    }

		    /* 清除按钮特殊样式 */
		    #colorClear {
		        position: relative;
		    }

		    #colorClear::after {
		        content: "×";
		        position: absolute;
		        color: #ff4444;
		        font-size: 20px;
		        top: 50%;
		        left: 50%;
		        transform: translate(-50%, -50%);
		        transition: font-size 0.1s ease;
		    }
			#colorClear:hover::after {
			    font-size: 32px;
			}

		    /* 2025-04-28 18:44:47 颜色按钮提示 */
		    .color-tooltip {
		        position: absolute;
		        bottom: -25px;
		        background: #333;
		        color: white;
		        padding: 2px 8px;
		        border-radius: 4px;
		        font-size: 12px;
		        white-space: nowrap;
		    }

		`;
        document.head.appendChild(style);

        // 创建按钮容器（保留结构和ID）
        this.buttonContainer = document.createElement('div');
        this.buttonContainer.id = 'alignment-buttons';

        // 从 localStorage 恢复位置
        this.restorePosition();


        document.body.appendChild(this.buttonContainer);

        // 创建按钮并分配功能
        const buttons = this.getButtons();
        buttons.forEach(btn => {
            if (btn.type === 'divider') {
                // 创建分割线
                const divider = document.createElement('div');
                divider.classList.add('divider');

                this.buttonContainer.appendChild(divider);
            } else {
                // 创建按钮
                const button = document.createElement('button');
                button.id = btn.id;
                button.classList.add('custom-button');
                button.innerHTML = btn.svg;		/* SVG作为按钮的子元素 */
                button.addEventListener('click', (event) => {
                    btn.action.call(this, event);
                    event.stopPropagation();
                });
                this.buttonContainer.appendChild(button);
            }  
        });

		// 2025-04-28 02:54:54 修复事件委托：绑定 mousedown 到按钮容器，正确触发拖拽
		this.buttonContainer.addEventListener('mousedown', (e) => {
		    
			// 使用 closest 查找是否是分割线或移动按钮
		    const isMoveElement = e.target.closest('#moveElement') !== null;
		    const isDivider = e.target.classList.contains('divider');
		    
		    if (isMoveElement || isDivider) {
		        this.onDragStart(e); // 触发拖拽
		    }
		});

        this.isInitialized = true; // 标记已经初始化
        this.showContextMenu();

        // 创建工具提示元素
        const tooltip = document.createElement('div');
        tooltip.id = 'tooltip';
        tooltip.textContent = '右键可选按钮呈现模式';  // 工具提示的内容
        this.buttonContainer.appendChild(tooltip);

        // 从 localStorage 检查是否已经显示过提示
        if (!this.hasShownTooltip) {
            // 如果还没有显示过提示，设置悬停事件
            this.buttonContainer.addEventListener('mouseenter', () => {
                if (!this.hasShownTooltip) {
                    setTimeout(() => {
                        tooltip.style.display = 'block';
                        this.hasShownTooltip = true;
                    }, 1000);
                }
            });

            this.buttonContainer.addEventListener('mouseleave', () => {
                // 删除tooltip 当鼠标离开时隐藏提示
                tooltip.remove();
            });
        }

        let isPermanent = localStorage.getItem('NodeAlignerIsPermanent');
        if (isPermanent) {
            this.isPermanent = localStorage.getItem('NodeAlignerIsPermanent') == '1';
            this.isPermanent ? this.show() : this.hide();
        } else {
            this.show()
        }
    },


	// ================= 简化后的颜色方法 =================
	createColorCircle(colorName) {
		return ColorSVGs.circle(this.ColorConfig.colors[colorName]);
	},

	createColorPickerIcon() {
		/* return ColorSVGs.colorPicker;	旧版颜色选择器图标svg */
		return `
		<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32">
		  <defs>
		    <style>
		      .cls-1 {
		        fill: #6b6b70;
		        stroke-width: 0px;
		      }
		    </style>
		  </defs>
		  <path class="cls-1" d="M16,7c4.96,0,9,4.04,9,9s-4.04,9-9,9-9-4.04-9-9,4.04-9,9-9M16,5c-6.08,0-11,4.92-11,11s4.92,11,11,11,11-4.92,11-11-4.92-11-11-11h0Z"/>
		  <rect class="cls-1" x="15" y="2" width="2" height="9" rx="1" ry="1"/>
		  <rect class="cls-1" x="15" y="21" width="2" height="9" rx="1" ry="1"/>
		  <rect class="cls-1" x="14" y="14" width="4" height="4" rx="1" ry="1"/>
		  <rect class="cls-1" x="2" y="15" width="9" height="2" rx="1" ry="1"/>
		  <rect class="cls-1" x="21" y="15" width="9" height="2" rx="1" ry="1"/>
		</svg>
	    `;

	},

	// 2025-04-28 18:44:47 ================= 优化后的颜色设置方法 =================
	setNodesColor(event, colorType) {
	    try {
	        const app = this.getComfyUIAppInstance();
	        if (!app) {
	            console.warn("ComfyUI实例获取失败");
	            return;
	        }

	        // 获取颜色配置
	        const color = this.ColorConfig.colors[colorType];
	        if (!color) {
	            console.warn(`未定义的颜色类型: ${colorType}`);
	            return;
	        }

	        // 获取选中项
	        const selectedNodes = this.getSelectedNodes(app);
	        const selectedGroups = this.getSelectedGroups(app);
	        
	        if (selectedNodes.length + selectedGroups.length === 0) {
	            console.warn("未选择任何节点或组");
	            return;
	        }

	        // 应用颜色到节点
	        selectedNodes.forEach(node => {
	            // 跳过系统节点
	            if(node.is_system) return; 
	            this.applyColorToNode(node, color);
	        });

	        // 应用颜色到组
	        selectedGroups.forEach(group => {
	            group.color = color;
	            // 设置子节点颜色
	            if(group.children) {
	                group.children.forEach(nodeID => {
	                    const node = app.graph.getNodeById(nodeID);
	                    if(node) this.applyColorToNode(node, color);
	                });
	            }
	        });

	        // 刷新画布
	        app.graph.setDirtyCanvas(true, true);
	        // 记录操作历史
	        if(app.graph.afterChange) app.graph.afterChange();
	        
	    } catch(error) {
	        console.error("颜色设置失败:", error);
	    }
	},

	// 2025-04-28 18:44:47 ================打开原生颜色选择器==========================
	openNativeColorPicker() {
	    try {
	        const app = this.getComfyUIAppInstance();
	        if (!app) {
	            console.warn("ComfyUI实例获取失败");
	            return;
	        }

	        // 获取选中项
	        const selectedNodes = this.getSelectedNodes(app);
	        const selectedGroups = this.getSelectedGroups(app);
	        
	        if (selectedNodes.length + selectedGroups.length === 0) {
	            console.warn("请先选择节点或组");
	            return;
	        }

	        // 创建隐藏的input元素
	        const input = document.createElement('input');
	        input.type = 'color';
	        input.style.cssText = `
	            position: fixed;
	            opacity: 0;
	            pointer-events: none;
	            top: -100px;
	        `;

	        // 设置初始颜色值
	        const lastColor = selectedNodes[0]?.bgcolor || selectedGroups[0]?.color || '#3355aa';
	        input.value = this.rgbToHex(lastColor);

	        // 颜色变更处理
	        input.addEventListener('change', (e) => {
	            const color = e.target.value;
	            
	            // 应用颜色到节点
	            selectedNodes.forEach(node => {
	                if(node.is_system) return;
	                this.applyColorToNode(node, color);
	            });

	            // 应用颜色到组
	            selectedGroups.forEach(group => {
	                group.color = color;
	                if(group.children) {
	                    group.children.forEach(nodeID => {
	                        const node = app.graph.getNodeById(nodeID);
	                        if(node) this.applyColorToNode(node, color);
	                    });
	                }
	            });

	            // 刷新并记录历史
	            app.graph.setDirtyCanvas(true, true);
	            if(app.graph.afterChange) app.graph.afterChange();
	            
	            document.body.removeChild(input);
	        });

	        document.body.appendChild(input);
	        input.click();

	    } catch(error) {
	        console.error("颜色选择器打开失败:", error);
	    }
	},

	/**
	 * RGB转HEX（新增辅助方法）
	 */
	rgbToHex(rgb) {
	    if (!rgb) return '#000000';
	    if (rgb.startsWith('#')) return rgb;
	    
	    const match = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
	    if (match) {
	        return '#' + 
	            (1 << 24 | 
	             parseInt(match[1]) << 16 | 
	             parseInt(match[2]) << 8 | 
	             parseInt(match[3])
	            ).toString(16).slice(1);
	    }
	    return '#000000';
	},


	// 获取ComfyUI实例
	getComfyUIAppInstance() {
		return {
			canvas: LGraphCanvas.active_canvas,
			graph: LGraphCanvas.active_canvas.graph
		};
	},



    // 获取按钮配置
    getButtons() {
        return [
            /* 拖动按钮 2025-04-28 00:11:44	ArtsticH新增 */
            /* { id: 'moveElement', svg: moveElementSvg, action: () => {} }, */
            { id: 'moveElement', svg: moveElementSvg },
            // 按钮：分割线
            { type: 'divider' },
            /* 按钮：左对齐 */
            { id: 'alignLeft', svg: alignLeftSvg, action: this.alignLeft.bind(this) },
            /* 按钮：竖向居中对齐 */
            { id: 'alignCenterVertically', svg: alignCenterVerticallySvg, action: this.alignCenterVertically.bind(this) },
            /* 按钮：右对齐 */
            { id: 'alignRight', svg: alignRightSvg, action: this.alignRight.bind(this) },
            // 按钮：分割线
            { type: 'divider' },
            /* 按钮：顶部对齐 */
            { id: 'alignTop', svg: alignTopSvg, action: this.alignTop.bind(this) },
            /* 按钮：横向居中对齐 */
            { id: 'alignCenterHorizontally', svg: alignCenterHorizontallySvg, action: this.alignCenterHorizontally.bind(this) },
            /* 按钮：底部对齐 */
            { id: 'alignBottom', svg: alignBottomSvg, action: this.alignBottom.bind(this) },
            // 按钮：分割线
            { type: 'divider' },
            /* 按钮：横向分布 */
            { id: 'horizontalDistribution', svg: horizontalDistributionSvg, action: this.horizontalDistribution.bind(this) },
            /* 按钮：竖向分布 */
            { id: 'verticalDistribution', svg: verticalDistributionSvg, action: this.verticalDistribution.bind(this) },
            // 按钮：分割线
            { type: 'divider' },
            /* 按钮：等宽 */
            { id: 'equalWidth', svg: equalWidthSvg, action: this.equalWidth.bind(this) },
            /* 按钮：等高 */
            { id: 'equalHeight', svg: equalHeightSvg, action: this.equalHeight.bind(this) },
            // 按钮：分割线
            { type: 'divider' },
            /* 拖动按钮 2025-04-28 00:11:44	ArtsticH新增 */
            /* { id: 'moveElement', svg: moveElementSvg, action: () => {} }, */
            
        	// 2025-04-28 18:44:47 ================颜色按钮配置==========================
            // 颜色按钮组（按顺序排列）
            { id: 'colorRed', svg: this.createColorCircle('red'), action: (e) => this.setNodesColor(e, 'red') },
            { id: 'colorOrange', svg: this.createColorCircle('orange'), action: (e) => this.setNodesColor(e, 'orange') },
            { id: 'colorYellow', svg: this.createColorCircle('yellow'), action: (e) => this.setNodesColor(e, 'yellow') },
            { id: 'colorGreen', svg: this.createColorCircle('green'), action: (e) => this.setNodesColor(e, 'green') },
            { id: 'colorCyan', svg: this.createColorCircle('cyan'), action: (e) => this.setNodesColor(e, 'cyan') },
            { id: 'colorBlue', svg: this.createColorCircle('blue'), action: (e) => this.setNodesColor(e, 'blue') },
            { id: 'colorPurple', svg: this.createColorCircle('purple'), action: (e) => this.setNodesColor(e, 'purple') },
            { id: 'colorClear', svg: this.createColorCircle('clear'), action: (e) => this.setNodesColor(e, 'clear') },
            { id: 'colorCustom', svg: this.createColorPickerIcon(), action: () => this.openNativeColorPicker() },
			{ id: 'moveElement', svg: moveElementSvg },
      
        ];
    },
    // 显示右键菜单
    showContextMenu() {
        // 创建右键菜单元素
        this.contextMenu = document.createElement('div');
        this.contextMenu.id = 'context-menu';
        this.contextMenu.style.display = 'none'; // 初始设置为不显示
        
        /* ↓若需加提示文字，请把此注释加到常驻显示button前： <a href="#" class="no-underline">显示模式：</a>  */
		// ↓2025-04-28 17:20:25 ArtsticH新增 配色按钮组
        this.contextMenu.innerHTML = `

			<button id="pin-mode">色卡减淡</button>
			<button id="pin-mode">色卡换行</button>
            <button id="pin-mode">常驻显示</button>
            <button id="toggle-on-select">跟随选框</button>
        `;

        this.buttonContainer.appendChild(this.contextMenu);

        // 原始的基础绑定右键菜单显示事件-2025-04-28 16:59:18已移除
        // this.buttonContainer.addEventListener('contextmenu', (event) => {
            // event.preventDefault();
            // this.contextMenu.style.display = 'block';
            // this.contextMenu.style.left = `${event.pageX}px`;
            // this.contextMenu.style.top = `${event.pageY}px`;
        // });
        
        // ↓2025-04-28 17:00:12 ArtsticH重写右键菜单逻辑-开始
		this.buttonContainer.addEventListener('contextmenu', (event) => {
			event.preventDefault();
			
			// 判断菜单是否已显示
			const isMenuVisible = this.contextMenu.style.display === 'block';
			const isClickInsideMenu = this.contextMenu.contains(event.target);

			if (isMenuVisible) {
				// 如果菜单已显示且点击在菜单外，则关闭
				if (!isClickInsideMenu) {
					this.contextMenu.style.display = 'none';
				}
			} else {
				// 显示菜单并定位
				this.contextMenu.style.display = 'block';
				this.contextMenu.style.left = `${event.pageX}px`;
				this.contextMenu.style.top = `${event.pageY}px`;
			}
		});
		// 新增：点击菜单外部区域关闭-暂未生效
		document.addEventListener('mousedown', (e) => {
			if (this.contextMenu.style.display === 'block' && 
				!this.contextMenu.contains(e.target) &&
				!this.buttonContainer.contains(e.target)) {
				this.contextMenu.style.display = 'none';
			}
		});
		// 新增：菜单内部右键关闭
		this.contextMenu.addEventListener('contextmenu', (e) => {
			e.preventDefault();
			this.contextMenu.style.display = 'none';
		});
		// ↑2025-04-28 17:00:12 ArtsticH重写右键菜单逻辑-结束
		

        // 绑定菜单项的点击事件
        this.contextMenu.querySelector('#pin-mode').addEventListener('click', () => {
            // 实现固定模式的逻辑
            this.contextMenu.style.display = 'none'; // 隐藏右键菜
            this.isPermanent = true;
            localStorage.setItem('NodeAlignerIsPermanent', '1');
            this.restorePosition();
        });
        this.contextMenu.querySelector('#toggle-on-select').addEventListener('click', () => {
            // 实现跟随选框模式的逻辑
            this.buttonContainer.style.display = 'none'; // 默认不显示按钮容器
            this.contextMenu.style.display = 'none'; // 隐藏右键菜单
            this.isPermanent = false;
            localStorage.setItem('NodeAlignerIsPermanent', '0');
        });
    },
    // 显示按钮
    show() {
        this.isShow = true;
        this.buttonContainer.style.display = 'flex'; // 显示按钮容器
    },

    // 隐藏按钮
    hide() {
        this.isShow = false;
        this.buttonContainer.style.display = 'none'; // 隐藏按钮容器
    },
    setPosition(x, y) {
        this.buttonContainer.style.left = `${x}px`;
        this.buttonContainer.style.top = `${y}px`;
    },
    // 开始拖拽-2025-04-28 02:54:54修正
    onDragStart(e) {
        // 2025-04-28 01:39:38 新增-修正后的 onDragStart 方法
	    if (this.isDragging) return;	/* 优先检查是否正在拖拽-防止重复触发 */
	    
	    // 2025-04-28 02:58:53-新增-确认目标元素是分割线或移动按钮
        const isMoveElement = e.target.closest('#moveElement') !== null;
        const isDivider = e.target.classList.contains('divider');
        if (!(isMoveElement || isDivider)) return;
	    
        this.isDragging = true;
		// 记录初始位置
        this.initialX = e.clientX;
        this.initialY = e.clientY;
        this.dragStartX = this.buttonContainer.offsetLeft;
        this.dragStartY = this.buttonContainer.offsetTop;
		// 绑定全局事件
        document.addEventListener('mousemove', this.boundOnDragging);
        document.addEventListener('mouseup', this.boundOnDragEnd);


		// 2025-04-28 02:43:52 新增-直接放行，事件委托已过滤无效目标
    	this.isDragging = true;
    },
    // 拖拽中
    onDragging(e) {
        if (this.isDragging) {
	        // 2025-04-29 16:36:27 保存原始宽度
	        const originalWidth = this.buttonContainer.offsetWidth;
	        
	        // 位置计算逻辑
            const deltaX = e.clientX - this.initialX;
            const deltaY = e.clientY - this.initialY;

            // 计算新的位置
            let newLeft = this.dragStartX + deltaX;
            let newTop = this.dragStartY + deltaY;

            // 获取容器的宽高和屏幕的宽高
            const containerRect = this.buttonContainer.getBoundingClientRect();
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            // 边缘控制，确保容器不超出屏幕
            if (newLeft < 0) {
                newLeft = 0;
            } else if (newLeft + containerRect.width > windowWidth) {
                newLeft = windowWidth - containerRect.width;
            }

            if (newTop < 0) {
                newTop = 0;
            } else if (newTop + containerRect.height > windowHeight) {
                newTop = windowHeight - containerRect.height;
            }

	        // 2025-04-29 16:36:27 更新位置前强制设置宽度
	        this.buttonContainer.style.width = `${originalWidth}px`;
	        this.buttonContainer.style.left = `${newLeft}px`;
	        this.buttonContainer.style.top = `${newTop}px`;

            // 更新位置
            this.buttonContainer.style.left = `${newLeft}px`;
            this.buttonContainer.style.top = `${newTop}px`;
        }
    },
    // 结束拖拽
    onDragEnd() {
        this.isDragging = false;
        // 移除事件监听器
        document.removeEventListener('mousemove', this.onDragging);
        document.removeEventListener('mouseup', this.onDragEnd);

        // 获取按钮容器的位置信息
        const rect = this.buttonContainer.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // 计算距离四个边的距离
        const distanceToTop = rect.top;
        const distanceToBottom = windowHeight - rect.bottom;
        const distanceToLeft = rect.left;
        const distanceToRight = windowWidth - rect.right;

        // 选择两个最近的边
        let top = 'unset';
        let bottom = 'unset';
        let left = 'unset';
        let right = 'unset';

        if (distanceToTop < distanceToBottom) {
            top = `${distanceToTop}px`;
        } else {
            bottom = `${distanceToBottom}px`;
        }

        if (distanceToLeft < distanceToRight) {
            left = `${distanceToLeft}px`;
        } else {
            right = `${distanceToRight}px`;
        }

        // 更新样式使其根据距离四边的情况固定
        this.buttonContainer.style.top = top;
        this.buttonContainer.style.bottom = bottom;
        this.buttonContainer.style.left = left;
        this.buttonContainer.style.right = right;

	    // 2025-04-29 16:36:27 恢复自适应宽度
	    this.buttonContainer.style.width = 'fit-content';

        // 保存位置到 localStorage
        localStorage.setItem('NodeAlignerButtonContainerPosition', JSON.stringify({ top, left, right, bottom }));
    },
    // 恢复位置
    restorePosition() {
        try {
            const savedPosition = JSON.parse(localStorage.getItem('NodeAlignerButtonContainerPosition'));
            if (savedPosition && typeof savedPosition === 'object') {
                this.buttonContainer.style.top = savedPosition.top || '20px';
                this.buttonContainer.style.bottom = savedPosition.bottom || 'unset';
                this.buttonContainer.style.left = savedPosition.left || 'unset';
                this.buttonContainer.style.right = savedPosition.right || '20px';
            } else {
                this.setDefaultPosition();
            }
        } catch (e) {
            console.warn('Failed to parse saved position:', e);
            this.setDefaultPosition();
        }

        // ===== 在这里检测是否超出屏幕边界 =====
        const containerRect = this.buttonContainer.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        if (
            containerRect.left < 0 ||
            containerRect.top < 0 ||
            containerRect.right > windowWidth ||
            containerRect.bottom > windowHeight
        ) {
            console.log('NodeAligner位置已超出屏幕范围，重置为默认位置');
            // 调用setDefaultPosition重置位置
            this.setDefaultPosition();

            // 保存默认位置到 localStorage，确保下次进入不会越界
            localStorage.setItem('NodeAlignerButtonContainerPosition', JSON.stringify({
                top: this.buttonContainer.style.top,
                left: this.buttonContainer.style.left,
                right: this.buttonContainer.style.right,
                bottom: this.buttonContainer.style.bottom
            }));
        }
    },
    setDefaultPosition() {
        this.buttonContainer.style.top = '20px';
        this.buttonContainer.style.right = '20px';
        this.buttonContainer.style.bottom = 'unset';
        this.buttonContainer.style.left = 'unset';
    },
    // 获取当前选中的节点
    getSelectedNodes() {
        if (!LGraphCanvas.active_canvas) return [];
        const selectedNodesObj = LGraphCanvas.active_canvas.selected_nodes;
        return selectedNodesObj ? Object.values(selectedNodesObj) : [];
    },
    
    
    
    
// 2025-04-28 18:44:47  ================= 颜色功能核心方法-开始 =================
	/**
	 * 调整颜色亮度（完整移植自align.js）
	 * @param {string} hex - 原始颜色值
	 * @param {number} percent - 调整比例(-1到1)
	 * @returns {string} 调整后的HEX颜色
	 */
	adjustColorBrightness(hex, percent) {
	    // 处理缩写格式
	    hex = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => '#' + r + r + g + g + b + b);
	    
	    // 解析颜色分量
	    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	    if (!result) return '#000000';
	    
	    let r = parseInt(result[1], 16);
	    let g = parseInt(result[2], 16);
	    let b = parseInt(result[3], 16);

	    // 计算调整量
	    const amount = Math.round(2.55 * percent * 100);
	    r = Math.min(255, Math.max(0, r + amount));
	    g = Math.min(255, Math.max(0, g + amount));
	    b = Math.min(255, Math.max(0, b + amount));

	    // 转回HEX
	    return '#' + 
	        (r | 1 << 8).toString(16).slice(1) + 
	        (g | 1 << 8).toString(16).slice(1) + 
	        (b | 1 << 8).toString(16).slice(1);
	},

	/**
	 * 应用颜色到单个节点（完整逻辑）
	 * @param {LGraphNode} node - 节点实例
	 * @param {string} color - HEX颜色值
	 */
	applyColorToNode(node, color) {
	    if (!node || typeof node !== 'object') return;
	    
	    try {
	        // 设置标题颜色（加深10%）
	        node.color = this.adjustColorBrightness(color, -0.1);
	        // 设置背景色（原始颜色）
	        node.bgcolor = color;
	        
	        // 标记需要刷新
	        if(node.setDirtyCanvas) {
	            node.setDirtyCanvas(true);
	        }
	        
	        // 特殊处理注释节点
	        if(node.type === "Note") {
	            node.properties.text_color = this.adjustColorBrightness(color, 0.2);
	        }
	    } catch(error) {
	        console.error(`应用颜色到节点失败:`, error);
	    }
	},

	/**
	 * 获取选中的组（完整移植）
	 */
	getSelectedGroups(app) {
	    try {
	        // 优先使用canvas的选中组
	        if(app.canvas?.selected_group) {
	            return [app.canvas.selected_group];
	        }
	        
	        // 备用方案：遍历所有组
	        const groups = [];
	        if(app.graph?.groups) {
	            for(const group of app.graph.groups) {
	                if(group.selected) {
	                    groups.push(group);
	                }
	            }
	        }
	        return groups;
	    } catch(error) {
	        console.error("获取选中组失败:", error);
	        return [];
	    }
	},
// 2025-04-28 18:44:47  ================= 颜色功能核心方法-结束 =================
    
    
    
    
    // 辅助函数：按照 X 或 Y 坐标分组
    groupNodesByCoordinate(nodes, axis, tolerance = 1000) {
        if (nodes.length < 4) {
            // 当选中节点小于 4 个时，不进行分组，直接返回包含所有节点的单个组
            return [nodes];
        }

        const groups = [];
        const otherAxis = 1 - axis; // 获取另一个轴 (0 -> 1, 1 -> 0)

        // 1. 基于主轴（axis）对节点进行排序
        nodes.sort((a, b) => a.pos[axis] - b.pos[axis]);

        // 2. 计算主轴上的间距分布
        const gaps = [];
        for (let i = 1; i < nodes.length; i++) {
            gaps.push(nodes[i].pos[axis] - (nodes[i - 1].pos[axis] + nodes[i - 1].size[axis]));
        }

        // 3. 使用统计方法确定分组的阈值（例如，平均间距加上标准差）
        const avgGap = gaps.reduce((sum, gap) => sum + gap, 0) / gaps.length;
        const stdDevGap = Math.sqrt(gaps.reduce((sum, gap) => sum + Math.pow(gap - avgGap, 2), 0) / gaps.length);
        const threshold = avgGap + stdDevGap; // 阈值设置为平均间距加上一个标准差

        // 4. 根据间距和副轴（otherAxis）上的位置进行分组
        let currentGroup = [nodes[0]];
        for (let i = 1; i < nodes.length; i++) {
            const gap = nodes[i].pos[axis] - (nodes[i - 1].pos[axis] + nodes[i - 1].size[axis]);
            const otherAxisDiff = Math.abs(nodes[i].pos[otherAxis] - nodes[i - 1].pos[otherAxis]);

            if (gap <= threshold && otherAxisDiff <= tolerance) {
                // 如果间距小于阈值且副轴上的差异小于容差，则将节点添加到当前组
                currentGroup.push(nodes[i]);
            } else {
                // 否则，开始一个新的组
                groups.push(currentGroup);
                currentGroup = [nodes[i]];
            }
        }
        groups.push(currentGroup); // 添加最后一组

        return groups;
    },

    // 左对齐
    alignLeft() {
        const selectedNodes = this.getSelectedNodes();
        if (selectedNodes.length === 0) {
            const canvas = LGraphCanvas.active_canvas;
            if (canvas) {
                canvas.ds.offset = [80, 140]; // 重置视图位置
                canvas.ds.scale = 1;          // 重置缩放比例
                canvas.setDirty(true, true);
            }
        } else {
            // 按 X 轴进行分组
            const groups = this.groupNodesByCoordinate(selectedNodes, 0); // 分组基于X轴坐标
            groups.forEach(group => {
                const leftMost = Math.min(...group.map(node => node.pos[0]));
                group.forEach(node => {
                    node.pos[0] = leftMost; // 左对齐
                });
            });
        }
        LGraphCanvas.active_canvas.setDirty(true, true);
    },

    // 右对齐
    alignRight() {
        const selectedNodes = this.getSelectedNodes();
        if (selectedNodes.length > 0) {
            // 按 X 轴进行分组
            const groups = this.groupNodesByCoordinate(selectedNodes, 0); // 分组基于X轴坐标
            groups.forEach(group => {
                const rightMost = Math.max(...group.map(node => node.pos[0] + node.size[0]));
                group.forEach(node => {
                    node.pos[0] = rightMost - node.size[0]; // 右对齐
                });
            });
        }
        LGraphCanvas.active_canvas.setDirty(true, true);
    },

    // 顶部对齐
    alignTop() {
        const selectedNodes = this.getSelectedNodes();
        if (selectedNodes.length > 0) {
            // 按 Y 轴进行分组
            const groups = this.groupNodesByCoordinate(selectedNodes, 1); // 分组基于Y轴坐标
            groups.forEach(group => {
                const topMost = Math.min(...group.map(node => node.pos[1]));
                group.forEach(node => {
                    node.pos[1] = topMost; // 顶部对齐
                });
            });
        }
        LGraphCanvas.active_canvas.setDirty(true, true);
    },

    // 底部对齐
    alignBottom() {
        const selectedNodes = this.getSelectedNodes();
        if (selectedNodes.length > 0) {
            // 按 Y 轴进行分组
            const groups = this.groupNodesByCoordinate(selectedNodes, 1); // 分组基于Y轴坐标
            groups.forEach(group => {
                const bottomMost = Math.max(...group.map(node => node.pos[1] + node.size[1]));
                group.forEach(node => {
                    node.pos[1] = bottomMost - node.size[1]; // 底部对齐
                });
            });
        }
        LGraphCanvas.active_canvas.setDirty(true, true);
    },

    // 水平居中对齐
    alignCenterHorizontally() {
        const selectedNodes = this.getSelectedNodes();
        if (selectedNodes.length > 0) {
            // 按 Y 轴进行分组
            const groups = this.groupNodesByCoordinate(selectedNodes, 1); // 分组基于Y轴坐标
            groups.forEach(group => {
                const centerY = this.calculateCenterInGroup(group, 1); // 计算 Y 轴中心
                group.forEach(node => {
                    node.pos[1] = centerY - node.size[1] / 2; // 垂直居中
                });
            });
        }
        LGraphCanvas.active_canvas.setDirty(true, true);
    },

    // 垂直居中对齐
    alignCenterVertically() {
        const selectedNodes = this.getSelectedNodes();
        if (selectedNodes.length > 0) {
            // 按 X 轴进行分组
            const groups = this.groupNodesByCoordinate(selectedNodes, 0); // 分组基于X轴坐标
            groups.forEach(group => {
                const centerX = this.calculateCenterInGroup(group, 0); // 计算 X 轴中心
                group.forEach(node => {
                    node.pos[0] = centerX - node.size[0] / 2; // 水平居中
                });
            });
        }
        LGraphCanvas.active_canvas.setDirty(true, true);
    },

    // 计算组内节点的中心坐标
    calculateCenterInGroup(group, axis) {
        const minCoord = Math.min(...group.map(node => node.pos[axis]));
        const maxCoord = Math.max(...group.map(node => node.pos[axis] + node.size[axis]));
        return (minCoord + maxCoord) / 2;
    },

    // 横向分布
    horizontalDistribution() {
        const nodes = this.getSelectedNodes();
        const axis = 0;
        if (nodes.length > 1) {
            // 按照节点在 axis 轴上的位置（高低）进行排序
            nodes.sort((a, b) => a.pos[axis] - b.pos[axis]);

            // 获取最小和最大的位置范围
            const min = Math.min(...nodes.map(node => node.pos[axis]));
            const max = Math.max(...nodes.map(node => node.pos[axis] + node.size[axis]));

            // 计算节点的总尺寸
            const totalSize = nodes.reduce((sum, node) => sum + node.size[axis], 0);

            // 计算间距
            const spacing = (max - min - totalSize) / (nodes.length - 1);

            // 初始化当前分布位置
            let current = min;

            // 遍历排序后的节点，按顺序分布
            nodes.forEach(node => {
                node.pos[axis] = current;  // 设置当前节点位置
                current += node.size[axis] + spacing;  // 更新下一个节点位置
            });

            // 重新渲染画布
            LGraphCanvas.active_canvas.setDirty(true, true);
        }
    },

    // 纵向分布
    verticalDistribution() {
        const nodes = this.getSelectedNodes();

        if (nodes.length > 1) {
            const axis = 1; // Y轴
            const otherAxis = 0; // X轴
            const tolerance = 100; // 用于将节点分组的容差
            const minSpacing = 20; // 最小间距，保证节点之间至少有 20 像素的间隔

            // 用于存储列的数组
            const columns = [];

            // 将节点按照 X 轴的位置进行分组（分成列）
            nodes.forEach(node => {
                let foundColumn = null;

                for (let column of columns) {
                    const columnX = column[0].pos[otherAxis];

                    if (Math.abs(columnX - node.pos[otherAxis]) <= tolerance) {
                        foundColumn = column;
                        break;
                    }
                }

                if (foundColumn) {
                    foundColumn.push(node);
                } else {
                    columns.push([node]);
                }
            });

            // 计算每列的总高度
            const columnHeights = columns.map(column => {
                const minY = Math.min(...column.map(node => node.pos[axis]));
                const maxY = Math.max(...column.map(node => node.pos[axis] + node.size[axis]));
                return maxY - minY;
            });

            // 找到最高列的高度
            const maxColumnHeight = Math.max(...columnHeights);

            // 对每列进行处理
            columns.forEach((column, columnIndex) => {
                if (column.length > 1) {
                    // 按照节点在 Y 轴上的位置（高低）进行排序
                    column.sort((a, b) => a.pos[axis] - b.pos[axis]);

                    // 获取当前列的最小和最大 Y 位置
                    const minY = Math.min(...column.map(node => node.pos[axis]));

                    // 计算当前列的节点总尺寸
                    const totalSize = column.reduce((sum, node) => sum + node.size[axis], 0);

                    // 计算该列的额外可用空间并分配给节点之间的间距
                    let spacing = (maxColumnHeight - totalSize) / (column.length - 1);
                    spacing = Math.max(spacing, minSpacing);  // 保证间距不小于最小间距

                    // 初始化当前分布位置，保持第一个节点位置不变
                    let currentY = column[0].pos[axis];  // 将第一个节点的位置作为起点

                    // 分布节点
                    column.forEach((node, idx) => {
                        if (idx === 0) {
                            // 第一个节点位置保持不变
                            currentY += node.size[axis] + spacing;
                        } else {
                            // 设置当前节点位置
                            node.pos[axis] = currentY;
                            currentY += node.size[axis] + spacing;
                        }

                        // 对齐 X 轴位置（所有节点在列内对齐）
                        node.pos[otherAxis] = column[0].pos[otherAxis];
                    });
                } else if (column.length === 1) {
                    // 单个节点时，保持第一个节点与最小 Y 位置对齐
                    const node = column[0];
                }
            });

            // 重新渲染画布
            LGraphCanvas.active_canvas.setDirty(true, true);
        }
    },
    // 等宽
    equalWidth() {
        this.equalSize(0);
    },

    // 等高
    equalHeight() {
        this.equalSize(1);
    },

    // 通用的节点尺寸调整
    equalSize(axis) {
        const nodes = this.getSelectedNodes();
        if (nodes.length > 0) {
            // 找到节点中最大的尺寸
            const maxSize = Math.max(...nodes.map(node => node.size[axis]));
            nodes.forEach(node => {
                node.size[axis] = maxSize; // 设置所有节点的大小为最大值
            });
            LGraphCanvas.active_canvas.setDirty(true, true);
        }
    }
};

function pollForCanvas() {
    const canvas = document.querySelector('canvas#graph-canvas');
    if (canvas) {
        ButtonManager.init();
        // 监听左键单击事件
        canvas.addEventListener('click', function (event) {
            // 检查是否为非常驻显示模式
            if (!ButtonManager.isPermanent) {
                const selectedNodes = ButtonManager.getSelectedNodes();
                if (selectedNodes.length >= 2) {
                    ButtonManager.show();
                    ButtonManager.setPosition(event.layerX - 240, event.layerY - 20);
                } else {
                    ButtonManager.hide();
                }
            }
        });
    } else {
        setTimeout(pollForCanvas, 1000); // 每隔 1 秒尝试查找一次
    }
}

// 启动轮询查找
pollForCanvas();

