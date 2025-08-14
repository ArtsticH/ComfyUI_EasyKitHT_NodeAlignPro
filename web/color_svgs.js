// ComfyUI_EasyKitHT_NodeAlignPro/web/color_svgs.js
export const ColorSVGs = {
  circle: (color) => `
    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="14" fill="${color}" stroke="#333" stroke-width="1"/>
    </svg>
  `,
  
  colorPicker: `
    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <path fill="#fff" d="M16 4l-3 9h6l-3 9 9-3v6l9-3-9-3 3-9-9 3v-6z"
        transform="translate(0 2) scale(0.8)"/>
    </svg>
  `

};