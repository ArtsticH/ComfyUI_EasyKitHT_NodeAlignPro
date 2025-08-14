import {
    ColorSVGs
  } from "./web/color_svgs.js";
  const buildSVG = (innerContent, {
    t,
    pId
  }) => {
    return `<svg t="${t}" class="icon" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" p-id="${pId}" width="100%">
  ${innerContent}
  </svg>`;
  };
  const Elements = {
    rect: (x, y, width, height) =>
      `<rect class="ht-1" x="${x}" y="${y}" width="${width}" height="${height}" rx="1" ry="1"/>`,
    vLine: (x, height = 24) =>
      `<rect class="ht-1" x="${x}" y="${(32 - height)/2}" width="2" height="${height}" rx="1"/>`,
    hLine: (y, width = 24) =>
      `<rect class="ht-1" x="${(32 - width)/2}" y="${y}" width="${width}" height="2" rx="1"/>`,
    dotMatrix: () => {
      const dots = [];
      const positions = [
        [11, 6],
        [21, 6],
        [11, 16],
        [21, 16],
        [11, 26],
        [21, 26]
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
    hBtn_moveElement: () => {
      const dotMatrixContent = Elements.dotMatrix().replace(/id="dot"/g, 'id="base-dot"');
      return `
  <defs>${dotMatrixContent}</defs>
  ${dotMatrixContent.replace(/id="base-dot"/g, 'use href="#base-dot"')}
  `;
    },
    // 左对齐
    hBtnA_alignLeft: () => `
  ${Elements.rect(10, 9, 12, 6)}
  ${Elements.rect(10, 19, 18, 6)}
  ${Elements.vLine(5, 24)}`,
    // 竖向居中对齐
    hBtnB_alignCenterV: () => `
  ${Elements.rect(9, 9, 14, 6)}
  ${Elements.rect(6, 19, 20, 6)}
  ${Elements.vLine(15, 24)}`,
    // 右对齐
    hBtnC_alignRight: () => `
  ${Elements.rect(11, 9, 12, 6)}
  ${Elements.rect(5, 19, 18, 6)}
  ${Elements.vLine(26, 24)}`,
    // 顶部对齐
    hBtnD_alignTop: () => `
  ${Elements.rect(8, 9, 6, 12)}
  ${Elements.rect(18, 9, 6, 18)}
  ${Elements.hLine(5, 24)}`,
    // 横向居中对齐
    hBtnE_alignCenterH: () => `
  ${Elements.rect(18, 6, 6, 20)}
  ${Elements.rect(8, 9, 6, 14)}
  ${Elements.hLine(15, 24)}`,
    // 底部对齐
    hBtnF_alignButton: () => `
  ${Elements.rect(8, 11, 6, 12)}
  ${Elements.rect(18, 5, 6, 18)}
  ${Elements.hLine(26, 24)}`,
    // 横向分布	基准线（y=7，长度24px）
    hBtnG_distributionH: () => `
  ${Elements.rect(19, 5, 2, 7)}
  ${Elements.rect(11, 5, 2, 7)}
  ${Elements.rect(19, 13, 6, 11)}
  ${Elements.rect(7, 13, 6, 15)}
  ${Elements.hLine(7, 24)}`,
    // 竖向分布	基准线（x=6，高度24px）
    hBtnH_distributionV: () => `
  ${Elements.rect(12, 7, 11, 6)}
  ${Elements.rect(4, 11, 7, 2)}
  ${Elements.rect(4, 19, 7, 2)}
  ${Elements.rect(12, 19, 16, 6)}
  ${Elements.vLine(6, 24)}`,
    // 等宽
    hBtnI_equalWidth: () => `
  ${Elements.rect(9, 9, 14, 6)}
  ${Elements.rect(11, 19, 10, 6)}
  ${Elements.vLine(4, 24)}
  ${Elements.vLine(26, 24)}
  ${Elements.rect(4, 21, 5, 2)}
  ${Elements.rect(23, 21, 5, 2)}`,
    // 等高
    hBtnJ_equalHeight: () => `
  ${Elements.rect(18, 9, 6, 14)}
  ${Elements.rect(8, 11, 6, 10)}
  ${Elements.hLine(4, 24)}
  ${Elements.hLine(26, 24)}
  ${Elements.rect(10, 4, 2, 5)}
  ${Elements.rect(10, 23, 2, 5)}`
  };
  // ======================== 最终导出的SVG常量 ========================
  const hSvg_moveElement = buildSVG(Templates.hBtn_moveElement(), {
    t: '1745769856000',
    pId: '8808'
  });
  const hSvgA_alignLeft = buildSVG(Templates.hBtnA_alignLeft(), {
    t: '1725534370541',
    pId: '2104'
  });
  const hSvgB_alignCenterV = buildSVG(Templates.hBtnB_alignCenterV(), {
    t: '1725534363707',
    pId: '1810'
  });
  const hSvgC_alignRight = buildSVG(Templates.hBtnC_alignRight(), {
    t: '1725534384109',
    pId: '2398'
  });
  const hSvgD_alignTop = buildSVG(Templates.hBtnD_alignTop(), {
    t: '1725534367556',
    pId: '1957'
  });
  const hSvgE_alignCenterH = buildSVG(Templates.hBtnE_alignCenterH(), {
    t: '1725534379860',
    pId: '2251'
  });
  const hSvgF_alignButton = buildSVG(Templates.hBtnF_alignButton(), {
    t: '1725534360155',
    pId: '1663'
  });
  const hSvgG_distributionH = buildSVG(Templates.hBtnG_distributionH(), {
    t: '1725534354023',
    pId: '1516'
  });
  const hSvgH_distributionV = buildSVG(Templates.hBtnH_distributionV(), {
    t: '1725534350231',
    pId: '1369'
  });
  const hSvgI_equalWidth = buildSVG(Templates.hBtnI_equalWidth(), {
    t: '1725606034670',
    pId: '7216'
  });
  const hSvgJ_equalHeight = buildSVG(Templates.hBtnJ_equalHeight(), {
    t: '1725606224564',
    pId: '7793'
  });
  const ButtonManager = {
    zoomLevels: [1, 1.5, 2, 0.5],
    currentZoom: 1,
    isSystemZoom: false,
    isRunButtonAligned: false,
    linkMode: 0,
    linkColors: ['', '#60A5FA', '#355757', '#675535', '#32512A'],
    linkOffset: -1,
    syncRunButtonPosition() {
      if (!this.isRunButtonAligned || this.linkMode === 0) return;
      const alignKit = this.hMainToolbar;
      const runKit = document.querySelector('.p-panel.actionbar');
      if (alignKit && runKit) {
        const alignRect = alignKit.getBoundingClientRect();
        const runRect = runKit.getBoundingClientRect();
        const offset = this.linkOffset;
        let left, top;
        switch (this.linkMode) {
          case 1:
            left = alignRect.right + window.scrollX + offset;
            top = alignRect.top + window.scrollY;
            break;
          case 2:
            left = alignRect.left + window.scrollX;
            top = alignRect.bottom + window.scrollY + offset;
            break;
          case 3:
            left = alignRect.left + window.scrollX;
            top = alignRect.top + window.scrollY - runRect.height - offset;
            break;
          case 4:
            left = alignRect.left + window.scrollX - runRect.width - offset;
            top = alignRect.top + window.scrollY;
            break;
        }
        runKit.style.left = `${left}px`;
        runKit.style.top = `${top}px`;
      }
    },
    ColorConfig: {
      colors: {
        red: '#a93232',
        orange: '#79461d',
        yellow: '#6e6e1d',
        green: '#2b652b',
        cyan: '#248382',
        blue: '#246283',
        purple: '#3c3c83',
        custom: '#ffffff'
      },
      colorMapping: {
        titleDarken: -0.1,
        noteTextLighten: 0.2
      }
    },
    isInitialized: false,
    hMainToolbar: null,
    contextMenu: null,
    isPermanent: true,
    initialX: 0,
    initialY: 0,
    dragStartX: 0,
    dragStartY: 0,
    isDragging: false,
    hasShownhTooltip: false,
    isShow: true,
    init() {
      if (this.isInitialized) return;
      this.isRunButtonAligned = false;
      this.currentZoomIndex = 0;
      this.systemWideZoom = false;
      this.boundOnDragging = this.onDragging.bind(this);
      this.boundOnDragEnd = this.onDragEnd.bind(this);
      window.addEventListener('beforeunload', () => {
        document.removeEventListener('mousedown', this.hideMenuHandler);
        document.removeEventListener('keydown', this.escKeyHandler);
      });
      const style = document.createElement('style');
      style.textContent = `
  /* 2025-04-28 07:56:21 ArtsticH-提取自 SVG 的全局通用样式 */
  .ht-1 {
  fill: #6b6b70;				/* 主图标颜色 */
  stroke-width: 0px;
  }
  .ht-2 {
  fill: #525252;				/* 拖动按钮圆点颜色 */
  stroke-width: 0px;
  }
  /* 修改运行按钮容器高度 */
  .p-panel.actionbar {
  height: 48px !important; /* 原高度为32px，增加2px */
  min-height: 48px !important; /* 同步调整最小高度 */
  align-items: center; /* 确保内容垂直居中 */
  }
  #pv_id_11_content  {
  /* 这是目标元素-ComfyUI官方原生的【运行按钮】 */
  /* 选择器： #comfyui-body-top > div.comfyui-menu.flex.items-center > div.p-panel.p-component.actionbar.w-fit */
  /* Xpath: //*[@id="comfyui-body-top"]/div[1]/div[4] */
  /* Xpath: /html/body/div[1]/main/div[1]/div[1]/div[1]/div[4] */
  }
  #hNodeAlignKit {					/* 【对齐按钮组样式】 */
  /* white-space: nowrap;	设置元素为绝对定位方式			position: absolute; */
  top: 20px;					
  right: 10px;				
  left: 10px;					
  bottom: unset;				
  display: flex;				
  flex-direction: row; 		
  background: #18181B;		
  padding: 8px;				
  border-radius: 6px;			
  z-index: 9999;				
  width: fit-content;			
  height: 48px;				
  position: absolute;			
  border: 1px solid;			
  border-color: #3D3D43;		
  align-self: center;     	
  box-sizing: border-box; 	
  /* place-items: center; 子元素水平和垂直居中 */
  /* text-align: center; 让子元素水平居中 */
  max-width: 800;
  min-width: 420;
  }
  /* 禁止子元素改变容器尺寸 */
  #hNodeAlignKit > * {
  flex-shrink: 0;
  }
  .hC_alignBtn {					
  width: 32px;					
  height: 32px;					
  background-size: contain;		
  background-repeat: no-repeat;	
  background-position: center;	
  background-color: #18181B;		
  border: none;					
  cursor: pointer;				
  padding: 4px;					
  border-radius: 4px;				
  transition: background-color 0.3s ease;		
  align-self: center;			
  vertical-align: middle;     
  display: inline-flex;       
  align-items: center;        
  justify-content: center;    
  }
  .hC_alignBtn:hover {		
  background-color: #222226;	
  }
  /* ↓2025-04-28 01:09:28	Artstich新增移动按钮专属悬浮色-开始	fill: #232935 !important; */
  #hBtn_moveElement:hover {
  background-color: #70A3F3 !important;
  cursor: move;
  }
  /* ↓2025-04-28 18:00:05 新增SVG图标样式-开始 */
  /* .hC_alignBtn { border: 1px solid red !important; }		显示按钮大小位置示意测试 */
  .hC_alignBtn svg path {
  pointer-events: none; /* 防止路径阻挡点击 */
  }
  .hC_alignBtn:hover svg {
  filter: drop-shadow(0 2px 4px rgba(255,255,255,0.2));
  }
  /* #hBtn_moveElement:hover svg .ht-1 {fill: #232935 !important;} */
  #hNodeAlignKit #hBtn_moveElement:hover svg .ht-1 {  /* 精准覆盖 SVG 内部类名 */
  fill: #232935 !important;    /* 优先级覆盖内联样式-增加嵌套层级 */
  }
  /* ↑2025-04-28 01:09:28	Artstich新增移动按钮专属悬浮色-结束 */
  .hC_dividerLine {			
  width: 1px;					
  height: 40px;				
  background-color: #27272B;	
  margin: 0px 10px;			
  border-radius: 9px;			
  cursor: move; 				
  align-self: center;     	
  }
  .hC_dividerLine:active {	
  cursor: grabbing;			
  }
  /* 提示样式 */
  #hTooltip {					
  position: absolute;			
  bottom: -20px;				
  right: 0;					
  background: #70A3F3;		
  color: white;				
  padding: 5px 10px;			
  border-radius: 6px;			
  display: none;				
  z-index: 1001;				
  white-space: nowrap;		
  font-size: 16px;			
  }
  /* 2025-04-28 03:48:09 ArtsticH新增-右键菜单容器样式 */
  #hContext-Menu {
  display: flex;			/* flex布局 */
  white-space: nowrap;			/* 防止换行、合并空白字符 */
  box-sizing: border-box;
  background: #18181B;			/* 设置提示框的背景颜色-测试定位用	#70A3F3; */
  align-items: center; /* 确保子元素垂直居中 */
  justify-content: center; /* 确保子元素水平居中 */
  width: auto; /* 改为自动宽度width: 1300;auto; */
  height: auto; /* 保持固定高度height: 32px; */
  border-radius: 6px;
  z-index: 9999;
  padding: 0 8px; /* 添加内边距 */
  gap: 6px; /* 按钮间距 */
  margin-top: -1px !important;          /* 微调垂直偏移量 */
  margin-left: -644.28px;/* 微调水平偏移量	margin-left: -630.73px; */
  /* margin-left: -200px; 向左偏移 20px */
  /* display: inline-block; */
  /* vertical-align: middle; */
  /* align-self: center;     新增：确保单个按钮垂直居中 */
  /* place-items: center; 子元素水平和垂直居中 */
  /* text-align: center; 让子元素水平居中 */
  }
  /* 2025-04-28 03:48:09 ArtsticH新增-右键菜单按钮样式-精准控制按钮垂直位置 */
  #hContext-Menu :is(input, button) {
  height: 26; 				/* 高度auto;height: 26px; */
  min-height: 16px; 	/* 最小高度 */
  font-size: 14px;
  background: #09090B;
  border: 1px solid #3D3D43;
  border-radius: 6px;
  color: #fff;
  padding: 4px 12px; /* 调整内边距 */
  margin: 0;		/* 移除外边距。	按钮间距margin: 0 3px; */
  transition: all 0.1s ease;	/* 过渡动画		transition: all 0.2s ease; */
  position: relative !important;
  }
  #hContext-Menu button {
  min-height: 32px !important;
  /* top: -233x !important;          微调垂直偏移量 */
  /* right: 35px !important;          微调水平偏移量 */
  }
  #hContext-Menu input {
  outline: none;
  min-height: 32px !important;
  top: -1.5px !important;          /* 微调垂直偏移量 */
  /* right: 35px !important;          微调水平偏移量 */
  }
  /* 2025-04-28 03:48:09 ArtsticH新增-悬停效果 */
  #hContext-Menu :is(input, button):hover {
  background: #222226;		/* 悬停背景色	background: #222226; */
  border-color: #70A3F3;		/* 悬停边框色	border-color: #70A3F3; */
  transform: scale(1.1);		/* 轻微放大		transform: scale(1.1); */
  }
  /* 2025-04-28 03:48:09 ArtsticH新增-点击效果 */
  #hContext-Menu :is(input, button):active {
  background: #2D2D32;        /* 点击背景色	background: #2D2D32; */
  transform: scale(0.98);     /* 轻微缩小		transform: scale(0.98); */
  }
  #hContext-Menu input:hover {
  outline: none;
  transform: scale(1) !important;		/* 轻微放大		transform: scale(1.1); */
  }
  /* 2025-04-28 03:48:09 ArtsticH新增-点击效果 */
  #hContext-Menu input:active {
  outline: none;
  transform: scale(0.99) !important;     /* 轻微缩小		transform: scale(0.98); */
  }
  /* 2025-04-28 03:48:09 ArtsticH新增-文字标签和文字链接样式 */
  #hContext-Menu a.no-underline {
  color: #A1A1AA;             /* 文字颜色		color: #A1A1AA; */
  text-decoration: none;      /* 去除下划线	text-decoration: none; */
  margin-right: 8px;          /* 右侧间距		margin-right: 8px; */
  /* display: inline-block !important; */
  /* vertical-align: middle !important; */
  /* line-height: 32px !important; 与按钮高度一致 */
  /* margin-right: 8px !important; */
  }
  /* UI缩放按钮专用样式 */
  #ui-scale-btn {
  width: 82px !important;      
  min-width: 82px !important;  
  max-width: 82px !important;  
  white-space: nowrap;         
  overflow: hidden;            
  
  box-sizing: border-box;      
  
  padding: 4px 0px !important; 
  }
  /* 覆盖通用按钮的宽度设置 */
  #hContext-Menu button#ui-scale-btn {
  width: 80px !important;
  flex-shrink: 0; /* 禁止在flex布局中收缩 */
  }
  /* 2025-04-28 18:44:47 新增颜色按钮专用样式 */
  #hNodeAlignKit [id^="color"] {
  width: 24px !important;		
  height: 24px !important;	
  padding: 0px !important;	
  margin: 0 2px !important;	
  background: none !important;
  margin-top: 40px; /* 增加上边距，使颜色按钮位于基础按钮下方 */
  }
  #hNodeAlignKit [id^="color"] svg {
  display: block !important;
  width: 100% !important;
  height: 100% !important;
  transition: transform 0.1s ease;
  }
  #hNodeAlignKit [id^="color"]:hover svg {
  transform: scale(1.5);
  filter: drop-shadow(0 2px 4px rgba(255,255,255,0.2));
  }
  /* 2025-04-28 18:44:47 颜色按钮激活状态 */
  .hC_alignBtn.color-active {
  box-shadow: 0 0 0 2px #70A3F3;
  }
  /* 颜色选择器图标特殊样式 */
  #colorPick svg {
  position: relative;
  background: rgba(0,0,0,1);	/* rgba(7,7,8,0.8); background: rgba(100,100,100,0.3); */
  border-radius: 50%;		/* border-radius: 6px; */
  transition: transform 0.1s ease;	/* 2025-04-28 18:44:47 颜色选择器图标动画 */
  }
  #colorPick:hover svg {
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
  /* 2025-04-28 18:44:47 颜色按钮提示 .color-tooltip { */
  .color-hTooltip {
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
      this.hMainToolbar = document.createElement('div');
      this.hMainToolbar.id = 'hNodeAlignKit';
      this.restorePosition();
      document.body.appendChild(this.hMainToolbar);
      const buttons = this.getButtons();
      buttons.forEach(btn => {
        if (btn.type === 'hC_dividerLine') {
          const hC_dividerLine = document.createElement('div');
          hC_dividerLine.classList.add('hC_dividerLine');
          this.hMainToolbar.appendChild(hC_dividerLine);
        } else {
          const button = document.createElement('button');
          button.id = btn.id;
          button.classList.add('hC_alignBtn');
          button.innerHTML = btn.svg;
          button.addEventListener('click', (event) => {
            btn.action.call(this, event);
            event.stopPropagation();
          });
          this.hMainToolbar.appendChild(button);
        }
      });
      this.hMainToolbar.addEventListener('mousedown', (e) => {
        const ishBtn_moveElement = e.target.closest('#hBtn_moveElement') !== null;
        const ishC_dividerLine = e.target.classList.contains('hC_dividerLine');
        if (ishBtn_moveElement || ishC_dividerLine) {
          this.onDragStart(e);
        }
      });
      this.isInitialized = true;
      this.showContextMenu();
      const hTooltip = document.createElement('div');
      hTooltip.id = 'hTooltip';
      hTooltip.textContent = '右键可选按钮呈现模式';
      this.hMainToolbar.appendChild(hTooltip);
      if (!this.hasShownhTooltip) {
        this.hMainToolbar.addEventListener('mouseenter', () => {
          if (!this.hasShownhTooltip) {
            setTimeout(() => {
              hTooltip.style.display = 'block';
              this.hasShownhTooltip = true;
            }, 1000);
          }
        });
        this.hMainToolbar.addEventListener('mouseleave', () => {
          hTooltip.remove();
        });
      }
      let isPermanent = localStorage.getItem('NodeAlignerIsPermanent');
      if (isPermanent) {
        this.isPermanent = localStorage.getItem('NodeAlignerIsPermanent') == '1';
        this.isPermanent ? this.show() : this.hide();
      } else {
        this.show()
      }
      const linkRunBtn = this.contextMenu.querySelector('#link-run-btn');
      linkRunBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.linkMode = (this.linkMode + 1) % 5;
        this.isRunButtonAligned = this.linkMode !== 0;
        linkRunBtn.style.backgroundColor = this.linkColors[this.linkMode];
        if (this.isRunButtonAligned) {
          this.syncRunButtonPosition();
          this.hMainToolbar.addEventListener('mousemove', this.syncRunButtonPosition.bind(this));
        } else {
          this.hMainToolbar.removeEventListener('mousemove', this.syncRunButtonPosition.bind(this));
        }
      });
    },
    createColorCircle(colorName) {
      return ColorSVGs.circle(this.ColorConfig.colors[colorName]);
    },
    createColorPickerIcon() {
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
    setNodesColor(event, colorType) {
      try {
        const app = this.getComfyUIAppInstance();
        if (!app) {
          console.warn("ComfyUI实例获取失败");
          return;
        }
        const color = this.ColorConfig.colors[colorType];
        if (!color) {
          console.warn(`未定义的颜色类型: ${colorType}`);
          return;
        }
        const selectedNodes = this.getSelectedNodes(app);
        const selectedGroups = this.getSelectedGroups(app);
        if (selectedNodes.length + selectedGroups.length === 0) {
          console.warn("未选择任何节点或组");
          return;
        }
        selectedNodes.forEach(node => {
          if (node.is_system) return;
          this.applyColorToNode(node, color);
        });
        selectedGroups.forEach(group => {
          group.color = color;
          if (group.children) {
            group.children.forEach(nodeID => {
              const node = app.graph.getNodeById(nodeID);
              if (node) this.applyColorToNode(node, color);
            });
          }
        });
        app.graph.setDirtyCanvas(true, true);
        if (app.graph.afterChange) app.graph.afterChange();
      } catch (error) {
        console.error("颜色设置失败:", error);
      }
    },
    resetNodesColor() {
      try {
        const app = this.getComfyUIAppInstance();
        if (!app) return;
        const selected = [...this.getSelectedNodes(app), ...this.getSelectedGroups(app)];
        if (selected.length === 0) return;
        selected.forEach(item => {
          if (item.is_system) return;
          if (item.pos !== undefined) {
            item.color = undefined;
            item.bgcolor = undefined;
            if (item.setDirtyCanvas) item.setDirtyCanvas(true);
          } else if (item.children) {
            item.color = undefined;
            item.children.forEach(nodeId => {
              const node = app.graph.getNodeById(nodeId);
              if (node) {
                node.color = undefined;
                node.bgcolor = undefined;
                if (node.setDirtyCanvas) node.setDirtyCanvas(true);
              }
            });
          }
        });
        app.graph.setDirtyCanvas(true, true);
        if (app.graph.afterChange) app.graph.afterChange();
      } catch (error) {
        console.error("颜色重置失败:", error);
      }
    },
    openNativeColorPicker() {
      try {
        const app = this.getComfyUIAppInstance();
        if (!app) {
          console.warn("ComfyUI实例获取失败");
          return;
        }
        const selectedNodes = this.getSelectedNodes(app);
        const selectedGroups = this.getSelectedGroups(app);
        if (selectedNodes.length + selectedGroups.length === 0) {
          console.warn("请先选择节点或组");
          return;
        }
        const input = document.createElement('input');
        input.type = 'color';
        input.style.cssText = `
  position: fixed;
  opacity: 0;
  pointer-events: none;
  top: -100px;
  `;
        const lastColor = selectedNodes[0]?.bgcolor || selectedGroups[0]?.color || '#3355aa';
        input.value = this.rgbToHex(lastColor);
        input.addEventListener('change', (e) => {
          const color = e.target.value;
          selectedNodes.forEach(node => {
            if (node.is_system) return;
            this.applyColorToNode(node, color);
          });
          selectedGroups.forEach(group => {
            group.color = color;
            if (group.children) {
              group.children.forEach(nodeID => {
                const node = app.graph.getNodeById(nodeID);
                if (node) this.applyColorToNode(node, color);
              });
            }
          });
          app.graph.setDirtyCanvas(true, true);
          if (app.graph.afterChange) app.graph.afterChange();
          document.body.removeChild(input);
        });
        document.body.appendChild(input);
        input.click();
      } catch (error) {
        console.error("颜色选择器打开失败:", error);
      }
    },
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
    getComfyUIAppInstance() {
      return {
        canvas: LGraphCanvas.active_canvas,
        graph: LGraphCanvas.active_canvas.graph
      };
    },
    getButtons() {
      return [{
          id: 'hBtn_moveElement',
          svg: hSvg_moveElement
        },
        {
          type: 'hC_dividerLine'
        },
        {
          id: 'hBtnA_alignLeft',
          svg: hSvgA_alignLeft,
          action: this.hBtnA_alignLeft.bind(this)
        },
        {
          id: 'hBtnB_alignCenterV',
          svg: hSvgB_alignCenterV,
          action: this.hBtnB_alignCenterV.bind(this)
        },
        {
          id: 'hBtnC_alignRight',
          svg: hSvgC_alignRight,
          action: this.hBtnC_alignRight.bind(this)
        },
        {
          type: 'hC_dividerLine'
        },
        {
          id: 'hBtnD_alignTop',
          svg: hSvgD_alignTop,
          action: this.hBtnD_alignTop.bind(this)
        },
        {
          id: 'hBtnE_alignCenterH',
          svg: hSvgE_alignCenterH,
          action: this.hBtnE_alignCenterH.bind(this)
        },
        {
          id: 'hBtnF_alignButton',
          svg: hSvgF_alignButton,
          action: this.hBtnF_alignButton.bind(this)
        },
        {
          type: 'hC_dividerLine'
        },
        {
          id: 'hBtnG_distributionH',
          svg: hSvgG_distributionH,
          action: this.hBtnG_distributionH.bind(this)
        },
        {
          id: 'hBtnH_distributionV',
          svg: hSvgH_distributionV,
          action: this.hBtnH_distributionV.bind(this)
        },
        {
          type: 'hC_dividerLine'
        },
        {
          id: 'hBtnI_equalWidth',
          svg: hSvgI_equalWidth,
          action: this.hBtnI_equalWidth.bind(this)
        },
        {
          id: 'hBtnJ_equalHeight',
          svg: hSvgJ_equalHeight,
          action: this.hBtnJ_equalHeight.bind(this)
        },
        {
          type: 'hC_dividerLine'
        },
        {
          id: 'colorRed',
          svg: this.createColorCircle('red'),
          action: (e) => this.setNodesColor(e, 'red')
        },
        {
          id: 'colorOrange',
          svg: this.createColorCircle('orange'),
          action: (e) => this.setNodesColor(e, 'orange')
        },
        {
          id: 'colorYellow',
          svg: this.createColorCircle('yellow'),
          action: (e) => this.setNodesColor(e, 'yellow')
        },
        {
          id: 'colorGreen',
          svg: this.createColorCircle('green'),
          action: (e) => this.setNodesColor(e, 'green')
        },
        {
          id: 'colorCyan',
          svg: this.createColorCircle('cyan'),
          action: (e) => this.setNodesColor(e, 'cyan')
        },
        {
          id: 'colorBlue',
          svg: this.createColorCircle('blue'),
          action: (e) => this.setNodesColor(e, 'blue')
        },
        {
          id: 'colorPurple',
          svg: this.createColorCircle('purple'),
          action: (e) => this.setNodesColor(e, 'purple')
        },
        {
          id: 'colorClear',
          svg: this.createColorCircle('clear'),
          action: this.resetNodesColor.bind(this)
        },
        {
          id: 'colorPick',
          svg: this.createColorPickerIcon(),
          action: () => this.openNativeColorPicker()
        },
        {
          id: 'hBtn_moveElement',
          svg: hSvg_moveElement
        },
      ];
    },
    showContextMenu() {
      this.contextMenu = document.createElement('div');
      this.contextMenu.id = 'hContext-Menu';
      this.contextMenu.style.display = 'none';
      this.contextMenu.innerHTML = `
  <input type="text" placeholder="搜索节点 Github@ArtsitcH">
  <button id="ui-scale-btn">UI缩放${this.zoomLevels[this.currentZoomIndex]}x</button>
  <button id="link-run-btn">激活联动</button>
  <button id="">待定功能</button>
  <button id="pin-mode">常驻显示</button>
  <button id="toggle-on-select">跟随选框</button>
  `;
      this.hMainToolbar.appendChild(this.contextMenu);
      this.hMainToolbar.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        const isMenuVisible = this.contextMenu.style.display === 'block';
        const isClickInsideMenu = this.contextMenu.contains(event.target);
        if (isMenuVisible) {
          if (!isClickInsideMenu) {
            this.contextMenu.style.display = 'none';
          }
        } else {
          this.contextMenu.style.display = 'block';
          this.contextMenu.style.left = `${event.pageX}px`;
          this.contextMenu.style.top = `${event.pageY}px`;
        }
      });
      document.addEventListener('mousedown', (e) => {
        if (this.contextMenu.style.display === 'block' &&
          !this.contextMenu.contains(e.target) &&
          !this.hMainToolbar.contains(e.target)) {
          this.contextMenu.style.display = 'none';
        }
      });
      this.contextMenu.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        this.contextMenu.style.display = 'none';
      });
      this.contextMenu.querySelector('#pin-mode').addEventListener('click', () => {
        this.contextMenu.style.display = 'none';
        this.isPermanent = true;
        localStorage.setItem('NodeAlignerIsPermanent', '1');
        this.restorePosition();
      });
      this.contextMenu.querySelector('#toggle-on-select').addEventListener('click', () => {
        this.hMainToolbar.style.display = 'none';
        this.contextMenu.style.display = 'none';
        this.isPermanent = false;
        localStorage.setItem('NodeAlignerIsPermanent', '0');
      });
      this.contextMenu.querySelector('#ui-scale-btn').addEventListener('click', (e) => {
        this.systemWideZoom = e.ctrlKey;
        this.toggleUIScale(e);
        e.stopPropagation();
      });
    },
    show() {
      this.isShow = true;
      this.hMainToolbar.style.display = 'flex';
    },
    hide() {
      this.isShow = false;
      this.hMainToolbar.style.display = 'none';
    },
    setPosition(x, y) {
      this.hMainToolbar.style.left = `${x}px`;
      this.hMainToolbar.style.top = `${y}px`;
    },
    toggleUIScale(e) {
      const isCtrlPressed = e ? e.ctrlKey : this.systemWideZoom;
      this.currentZoomIndex = (this.currentZoomIndex + 1) % this.zoomLevels.length;
      const scale = this.zoomLevels[this.currentZoomIndex];
      if (isCtrlPressed) {
        document.body.style.zoom = scale;
        this.hMainToolbar.style.transform = '';
      } else {
        this.hMainToolbar.style.transform = `scale(${scale})`;
        document.body.style.zoom = '';
      }
      // 直接更新按钮文本
      const scaleBtn = this.contextMenu.querySelector('#ui-scale-btn');
      if (scaleBtn) {
        scaleBtn.textContent = `UI缩放${scale}x`;
      }
    },
    onDragStart(e) {
      if (this.isDragging) return;
      const ishBtn_moveElement = e.target.closest('#hBtn_moveElement') !== null;
      const ishC_dividerLine = e.target.classList.contains('hC_dividerLine');
      if (!(ishBtn_moveElement || ishC_dividerLine)) return;
      this.isDragging = true;
      this.initialX = e.clientX;
      this.initialY = e.clientY;
      this.dragStartX = this.hMainToolbar.offsetLeft;
      this.dragStartY = this.hMainToolbar.offsetTop;
      document.addEventListener('mousemove', this.boundOnDragging);
      document.addEventListener('mouseup', this.boundOnDragEnd);
      this.isDragging = true;
    },
    onDragging(e) {
      if (this.isDragging) {
        const originalWidth = this.hMainToolbar.offsetWidth;
        const deltaX = e.clientX - this.initialX;
        const deltaY = e.clientY - this.initialY;
        let newLeft = this.dragStartX + deltaX;
        let newTop = this.dragStartY + deltaY;
        const containerRect = this.hMainToolbar.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
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
        this.hMainToolbar.style.width = `${originalWidth}px`;
        this.hMainToolbar.style.left = `${newLeft}px`;
        this.hMainToolbar.style.top = `${newTop}px`;
        this.hMainToolbar.style.left = `${newLeft}px`;
        this.hMainToolbar.style.top = `${newTop}px`;
      }
    },
    validateAndAdjustPosition(pos) {
      const containerRect = this.hMainToolbar.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const safeLeft = Math.max(0, Math.min(pos.left, windowWidth - containerRect.width));
      const safeTop = Math.max(0, Math.min(pos.top, windowHeight - containerRect.height));
      if (Math.abs(pos.left - safeLeft) > 20 || Math.abs(pos.top - safeTop) > 20) {
        return this.getCentralPosition();
      }
      return {
        left: safeLeft,
        top: safeTop
      };
    },
    getCentralPosition() {
      return {
        left: Math.max(0, window.innerWidth / 2 - this.hMainToolbar.offsetWidth / 2),
        top: 20
      };
    },
    onDragEnd() {
      this.isDragging = false;
      document.removeEventListener('mousemove', this.boundOnDragging);
      document.removeEventListener('mouseup', this.boundOnDragEnd);
      const rect = this.hMainToolbar.getBoundingClientRect();
      const originalPos = {
        left: rect.left,
        top: rect.top
      };
      const safePos = this.validateAndAdjustPosition(originalPos);
      this.hMainToolbar.style.left = `${safePos.left}px`;
      this.hMainToolbar.style.top = `${safePos.top}px`;
      localStorage.setItem('NodeAlignerhMainToolbarPosition', JSON.stringify({
        left: safePos.left,
        top: safePos.top
      }));
      this.hMainToolbar.style.width = 'fit-content';
      this.syncRunButtonPosition();
    },
    restorePosition() {
      try {
        const savedPosition = JSON.parse(localStorage.getItem('NodeAlignerhMainToolbarPosition'));
        if (!savedPosition) {
          this.setCentralPosition();
          return;
        }
        let pos = {
          left: savedPosition.left || window.innerWidth / 2 - this.hMainToolbar.offsetWidth / 2,
          top: savedPosition.top || 20
        };
        const validatedPos = this.validateAndAdjustPosition(pos);
        this.hMainToolbar.style.left = `${validatedPos.left}px`;
        this.hMainToolbar.style.top = `${validatedPos.top}px`;
        localStorage.setItem('NodeAlignerhMainToolbarPosition', JSON.stringify(validatedPos));
        if (this.isRunButtonAligned) {
          this.syncRunButtonPosition();
        }
        const linkRunBtn = this.contextMenu?.querySelector('#link-run-btn');
        if (linkRunBtn) {
          linkRunBtn.style.backgroundColor = this.linkColors[this.linkMode];
        }
      } catch (e) {
        console.warn('位置信息异常，重置到默认位置:', e);
        this.setCentralPosition();
      }
    },
    setCentralPosition() {
      const pos = this.getCentralPosition();
      this.hMainToolbar.style.left = `${pos.left}px`;
      this.hMainToolbar.style.top = `${pos.top}px`;
      localStorage.setItem('NodeAlignerhMainToolbarPosition', JSON.stringify(pos));
    },
    getSelectedNodes() {
      if (!LGraphCanvas.active_canvas) return [];
      const selectedNodesObj = LGraphCanvas.active_canvas.selected_nodes;
      return selectedNodesObj ? Object.values(selectedNodesObj) : [];
    },
    adjustColorBrightness(hex, percent) {
      hex = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => '#' + r + r + g + g + b + b);
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      if (!result) return '#000000';
      let r = parseInt(result[1], 16);
      let g = parseInt(result[2], 16);
      let b = parseInt(result[3], 16);
      const amount = Math.round(2.55 * percent * 100);
      r = Math.min(255, Math.max(0, r + amount));
      g = Math.min(255, Math.max(0, g + amount));
      b = Math.min(255, Math.max(0, b + amount));
      return '#' +
        (r | 1 << 8).toString(16).slice(1) +
        (g | 1 << 8).toString(16).slice(1) +
        (b | 1 << 8).toString(16).slice(1);
    },
    applyColorToNode(node, color) {
      if (!node || typeof node !== 'object') return;
      try {
        node.color = this.adjustColorBrightness(color, -0.1);
        node.bgcolor = color;
        if (node.setDirtyCanvas) {
          node.setDirtyCanvas(true);
        }
        if (node.type === "Note") {
          node.properties.text_color = this.adjustColorBrightness(color, 0.2);
        }
      } catch (error) {
        console.error(`应用颜色到节点失败:`, error);
      }
    },
    getSelectedGroups(app) {
      try {
        if (app.canvas?.selected_group) {
          return [app.canvas.selected_group];
        }
        const groups = [];
        if (app.graph?.groups) {
          for (const group of app.graph.groups) {
            if (group.selected) {
              groups.push(group);
            }
          }
        }
        return groups;
      } catch (error) {
        console.error("获取选中组失败:", error);
        return [];
      }
    },
    groupNodesByCoordinate(nodes, axis, tolerance = 1000) {
      if (nodes.length < 4) {
        return [nodes];
      }
      const groups = [];
      const otherAxis = 1 - axis;
      nodes.sort((a, b) => a.pos[axis] - b.pos[axis]);
      const gaps = [];
      for (let i = 1; i < nodes.length; i++) {
        gaps.push(nodes[i].pos[axis] - (nodes[i - 1].pos[axis] + nodes[i - 1].size[axis]));
      }
      const avgGap = gaps.reduce((sum, gap) => sum + gap, 0) / gaps.length;
      const stdDevGap = Math.sqrt(gaps.reduce((sum, gap) => sum + Math.pow(gap - avgGap, 2), 0) / gaps.length);
      const threshold = avgGap + stdDevGap;
      let currentGroup = [nodes[0]];
      for (let i = 1; i < nodes.length; i++) {
        const gap = nodes[i].pos[axis] - (nodes[i - 1].pos[axis] + nodes[i - 1].size[axis]);
        const otherAxisDiff = Math.abs(nodes[i].pos[otherAxis] - nodes[i - 1].pos[otherAxis]);
        if (gap <= threshold && otherAxisDiff <= tolerance) {
          currentGroup.push(nodes[i]);
        } else {
          groups.push(currentGroup);
          currentGroup = [nodes[i]];
        }
      }
      groups.push(currentGroup);
      return groups;
    },
    hBtnA_alignLeft() {
      const selectedNodes = this.getSelectedNodes();
      if (selectedNodes.length === 0) {
        const canvas = LGraphCanvas.active_canvas;
        if (canvas) {
          canvas.ds.offset = [80, 140];
          canvas.ds.scale = 1;
          canvas.setDirty(true, true);
        }
      } else {
        const groups = this.groupNodesByCoordinate(selectedNodes, 0);
        groups.forEach(group => {
          const leftMost = Math.min(...group.map(node => node.pos[0]));
          group.forEach(node => {
            node.pos[0] = leftMost;
          });
        });
      }
      LGraphCanvas.active_canvas.setDirty(true, true);
    },
    hBtnC_alignRight() {
      const selectedNodes = this.getSelectedNodes();
      if (selectedNodes.length > 0) {
        const groups = this.groupNodesByCoordinate(selectedNodes, 0);
        groups.forEach(group => {
          const rightMost = Math.max(...group.map(node => node.pos[0] + node.size[0]));
          group.forEach(node => {
            node.pos[0] = rightMost - node.size[0];
          });
        });
      }
      LGraphCanvas.active_canvas.setDirty(true, true);
    },
    hBtnD_alignTop() {
      const selectedNodes = this.getSelectedNodes();
      if (selectedNodes.length > 0) {
        const groups = this.groupNodesByCoordinate(selectedNodes, 1);
        groups.forEach(group => {
          const topMost = Math.min(...group.map(node => node.pos[1]));
          group.forEach(node => {
            node.pos[1] = topMost;
          });
        });
      }
      LGraphCanvas.active_canvas.setDirty(true, true);
    },
    hBtnF_alignButton() {
      const selectedNodes = this.getSelectedNodes();
      if (selectedNodes.length > 0) {
        const groups = this.groupNodesByCoordinate(selectedNodes, 1);
        groups.forEach(group => {
          const bottomMost = Math.max(...group.map(node => node.pos[1] + node.size[1]));
          group.forEach(node => {
            node.pos[1] = bottomMost - node.size[1];
          });
        });
      }
      LGraphCanvas.active_canvas.setDirty(true, true);
    },
    hBtnE_alignCenterH() {
      const selectedNodes = this.getSelectedNodes();
      if (selectedNodes.length > 0) {
        const groups = this.groupNodesByCoordinate(selectedNodes, 1);
        groups.forEach(group => {
          const centerY = this.calculateCenterInGroup(group, 1);
          group.forEach(node => {
            node.pos[1] = centerY - node.size[1] / 2;
          });
        });
      }
      LGraphCanvas.active_canvas.setDirty(true, true);
    },
    hBtnB_alignCenterV() {
      const selectedNodes = this.getSelectedNodes();
      if (selectedNodes.length > 0) {
        const groups = this.groupNodesByCoordinate(selectedNodes, 0);
        groups.forEach(group => {
          const centerX = this.calculateCenterInGroup(group, 0);
          group.forEach(node => {
            node.pos[0] = centerX - node.size[0] / 2;
          });
        });
      }
      LGraphCanvas.active_canvas.setDirty(true, true);
    },
    calculateCenterInGroup(group, axis) {
      const minCoord = Math.min(...group.map(node => node.pos[axis]));
      const maxCoord = Math.max(...group.map(node => node.pos[axis] + node.size[axis]));
      return (minCoord + maxCoord) / 2;
    },
    hBtnG_distributionH() {
      const nodes = this.getSelectedNodes();
      const axis = 0;
      if (nodes.length > 1) {
        nodes.sort((a, b) => a.pos[axis] - b.pos[axis]);
        const min = Math.min(...nodes.map(node => node.pos[axis]));
        const max = Math.max(...nodes.map(node => node.pos[axis] + node.size[axis]));
        const totalSize = nodes.reduce((sum, node) => sum + node.size[axis], 0);
        const spacing = (max - min - totalSize) / (nodes.length - 1);
        let current = min;
        nodes.forEach(node => {
          node.pos[axis] = current;
          current += node.size[axis] + spacing;
        });
        LGraphCanvas.active_canvas.setDirty(true, true);
      }
    },
    hBtnH_distributionV() {
      const nodes = this.getSelectedNodes();
      if (nodes.length > 1) {
        const axis = 1;
        const otherAxis = 0;
        const tolerance = 100;
        const minSpacing = 20;
        const columns = [];
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
        const columnHeights = columns.map(column => {
          const minY = Math.min(...column.map(node => node.pos[axis]));
          const maxY = Math.max(...column.map(node => node.pos[axis] + node.size[axis]));
          return maxY - minY;
        });
        const maxColumnHeight = Math.max(...columnHeights);
        columns.forEach((column, columnIndex) => {
          if (column.length > 1) {
            column.sort((a, b) => a.pos[axis] - b.pos[axis]);
            const minY = Math.min(...column.map(node => node.pos[axis]));
            const totalSize = column.reduce((sum, node) => sum + node.size[axis], 0);
            let spacing = (maxColumnHeight - totalSize) / (column.length - 1);
            spacing = Math.max(spacing, minSpacing);
            let currentY = column[0].pos[axis];
            column.forEach((node, idx) => {
              if (idx === 0) {
                currentY += node.size[axis] + spacing;
              } else {
                node.pos[axis] = currentY;
                currentY += node.size[axis] + spacing;
              }
              node.pos[otherAxis] = column[0].pos[otherAxis];
            });
          } else if (column.length === 1) {
            const node = column[0];
          }
        });
        LGraphCanvas.active_canvas.setDirty(true, true);
      }
    },
    hBtnI_equalWidth() {
      this.equalSize(0);
    },
    hBtnJ_equalHeight() {
      this.equalSize(1);
    },
    equalSize(axis) {
      const nodes = this.getSelectedNodes();
      if (nodes.length > 0) {
        const maxSize = Math.max(...nodes.map(node => node.size[axis]));
        nodes.forEach(node => {
          node.size[axis] = maxSize;
        });
        LGraphCanvas.active_canvas.setDirty(true, true);
      }
    }
  };
  
  function pollForCanvas() {
    const canvas = document.querySelector('canvas#graph-canvas');
    if (canvas) {
      ButtonManager.init();
      canvas.addEventListener('click', function(event) {
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
      setTimeout(pollForCanvas, 1000);
    }
  }
  pollForCanvas();