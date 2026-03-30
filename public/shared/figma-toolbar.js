// Figma Capture Toolbar
// Only activates when ?dev is present in URL
// See specs/figma-toolbar-spec.md for full specification

;(function () {
  if (!window.location.search.includes('dev')) return

  // TODO: implement full toolbar per spec
  const toolbar = document.createElement('div')
  toolbar.id = 'figma-toolbar'
  toolbar.style.cssText = `
    position: fixed;
    top: 16px;
    right: 16px;
    z-index: 9999;
    background: #1E1E1E;
    border-radius: 12px;
    padding: 8px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-family: -apple-system, sans-serif;
  `

  const btn = (text) => {
    const b = document.createElement('button')
    b.textContent = text
    b.style.cssText = `
      padding: 8px 14px;
      border-radius: 8px;
      border: none;
      background: transparent;
      color: #fff;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      text-align: left;
    `
    b.onmouseenter = () => b.style.background = 'rgba(255,255,255,0.1)'
    b.onmouseleave = () => b.style.background = 'transparent'
    return b
  }

  toolbar.appendChild(btn('Отправить в Figma'))
  toolbar.appendChild(btn('Весь экран'))
  toolbar.appendChild(btn('Выбрать элемент'))

  document.body.appendChild(toolbar)
})()
