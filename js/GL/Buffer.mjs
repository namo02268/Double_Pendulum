import { gl } from "./GL.mjs";

class BufferBase {
  /*---------------------------------------
    パブリック関数
  ---------------------------------------*/
  // コンストラクタ
  constructor(bufferType) {
    this.#m_id = gl.createBuffer();
    this.#m_bufferType = bufferType;
    this.#m_usage = gl.STATIC_DRAW;
    this.#m_dataSize = 0;
  }
  // バッファの解放
  FreeBuffer() {
    if (this.#m_id !== 0) {
      gl.deleteBuffer(this.#m_id);
      this.#m_id = 0;
    }
  }
  // バッファのバインド
  Bind() {
    gl.bindBuffer(this.#m_bufferType, this.#m_id);
  }
  // バッファのアンバインド
  UnBind() {
    gl.bindBuffer(this.#m_bufferType, null);
  }
  // 頂点データのセット
  SetData(size, data) {
    this.#m_dataSize = size;
    this.Bind();
    if (this.#m_bufferType == gl.ARRAY_BUFFER) {
      gl.bufferData(this.#m_bufferType, new Float32Array(data), this.#m_usage);
    } else if (this.#m_bufferType == gl.ELEMENT_ARRAY_BUFFER) {
      gl.bufferData(this.#m_bufferType, new Uint16Array(data), this.#m_usage);
    }
  }
  // 頂点データの追加セット
  SetSubData(size, offset, data) {
    if (size + offset <= this.#m_dataSize) {
      this.Bind();
      gl.bufferSubData(this.#m_bufferType, offset, data);
    }
  }
  SetUsage(usage) {
    this.#m_usage = usage;
  }
  // バッファハンドルの取得
  GetHandle() {
    return this.#m_id;
  }
  // サイズの取得
  GetSize() {
    return this.#m_dataSize;
  }

  /*---------------------------------------
    プライベート変数
  ---------------------------------------*/
  #m_id;  // バッファの固有ID
  #m_usage;
  #m_bufferType;
  #m_dataSize;
}

class VertexBuffer extends BufferBase {
  constructor() {
    super(gl.ARRAY_BUFFER);
  }
}

class IndexBuffer extends BufferBase {
  constructor() {
    super(gl.ELEMENT_ARRAY_BUFFER);
  }
}

class VertexArray {
  /*---------------------------------------
    パブリック関数
  ---------------------------------------*/
  // コンストラクタ
  constructor() {
    this.#m_id = gl.createVertexArray();
  }
  // 解放
  FreeBuffer() {
    if (this.#m_id !== 0) {
      gl.deleteVertexArray(this.#m_id);
      this.#m_id = 0;
    }
  }
  // バインド
  Bind() {
    gl.bindVertexArray(this.#m_id);
  }
  // アンバインド
  UnBind() {
    gl.bindVertexArray(null);
  }
  BindAttribute(VBO) {
    this.Bind();
    VBO.Bind();
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
  }

  /*---------------------------------------
    プライベート変数
  ---------------------------------------*/
  #m_id;
}

export { VertexBuffer, IndexBuffer, VertexArray };
