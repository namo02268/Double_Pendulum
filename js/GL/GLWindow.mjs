import { gl } from "./GL.mjs";

class GLWindow {
  /*---------------------------------------
    パブリック関数
  ---------------------------------------*/
  // コンストラクタ
  constructor() {
    this.Clear();
    this.Resize();
  }
  // 画面のクリア
  Clear() {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }
  // 画面のリサイズ
  Resize() {
    const displayWidth = gl.canvas.parentElement.clientWidth;
    const displayHeight = gl.canvas.parentElement.clientHeight;

    if (gl.canvas.width !== displayWidth || gl.canvas.height !== displayHeight) {
      gl.canvas.width = displayWidth;
      gl.canvas.height = displayHeight;
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    }
  }
}

export { GLWindow };
