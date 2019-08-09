const { ipcRenderer } = require('electron')

ipcRenderer.addListener('paste-image', (e, img, size) => {
  let canvas = document.createElement('canvas')
  let ctx = canvas.getContext('2d')
  canvas.width = size.width
  canvas.height = size.height
  document.body.appendChild(canvas)

  let data = new ImageData(new Uint8ClampedArray(img), size.width, size.height)
  console.log(data)
  ctx.putImageData(data, 0, 0)
})