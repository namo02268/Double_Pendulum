import { gl } from "./GL.mjs";

class Shader {
  /*---------------------------------------
    パブリック関数
  ---------------------------------------*/
  // シェーダーコンパイル
  Compile(vertexSource, fragmentSource) {
    // バーテックスシェーダー
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexSource);
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      alert(
        "An error occurred compiling the shaders: " + gl.getShaderInfoLog(vertexShader)
      );
      return null;
    }
    // フラグメントシェーダー
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentSource);
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      alert(
        "An error occurred compiling the shaders: " + gl.getShaderInfoLog(fragmentShader)
      );
      return null;
    }
    // プログラムにリンク
    this.#m_id = gl.createProgram();
    gl.attachShader(this.#m_id, vertexShader);
    gl.attachShader(this.#m_id, fragmentShader);
    gl.linkProgram(this.#m_id)
    if (!gl.getProgramParameter(this.#m_id, gl.LINK_STATUS)) {
      alert(
        "Unable to initialize the shader program: " + gl.getProgramInfoLog(this.#m_id)
      );
      return null;
    }
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
  }
  // シェーダーの解放
  FreeProgram() {
    if (this.#m_id !== 0) {
      gl.deleteProgram(this.#m_id);
      this.#m_id = 0;
    }
  }
  // シェーダーのバインド
  Bind() {
    gl.useProgram(this.#m_id);
  }
  // シェーダーのアンバインド
  UnBind() {
    gl.useProgram(0);
  }
  // シェーダーのハンドルの取得
  GetHandle() {
    return this.#m_id;
  }
  BindAttribLocation(name, num) {
    gl.bindAttribLocation(this.#m_id, num, name);
  }
  GetAttribLocation(name) {
    return gl.getAttribLocation(this.#m_id, name);
  }
  GetUniformLocation(name) {
    return gl.getUniformLocation(this.#m_id, name);
  }
  SetUniform1f(name, value) {
    gl.uniform1f(this.GetUniformLocation(name), value);
  }
  SetUniform2f(name, value1, value2) {
    gl.uniform2f(this.GetUniformLocation(name), value1, value2);
  }
  SetUniformMatrix4(name, value) {
    gl.uniformMatrix4fv(this.GetUniformLocation(name), false, value);
  }
  /*---------------------------------------
    プライベート変数
  ---------------------------------------*/
  #m_id;
}

export { Shader };
