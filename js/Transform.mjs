class Transform {
  /*---------------------------------------
    パブリック関数
  ---------------------------------------*/
  GetLocalMatrix() {
    let mat = mat4.create();
    mat4.scale(mat, mat, this.#m_scale);
    mat4.rotateX(mat, mat, glMatrix.toRadian(this.#m_rotation[0]));
    mat4.rotateY(mat, mat, glMatrix.toRadian(this.#m_rotation[1]));
    mat4.rotateZ(mat, mat, glMatrix.toRadian(this.#m_rotation[2]));
    mat4.translate(mat, mat, this.#m_position);
    return mat;
  }

  GetPosition() { return this.#m_position; }
  GetRotation() { return this.#m_rotation; }
  GetScale() { return this.#m_scale; }

  SetPosition(position) { this.#m_position = position; }
  SetRotation(rotation) { this.#m_rotation = rotation; }
  SetScale(scale) { this.#m_scale = scale; }

  Translate(dist) {
    this.#m_position[0] += dist[0];
    this.#m_position[1] += dist[1];
    this.#m_position[2] += dist[2];
  }
  TranslateX(x) { this.Translate([x, 0.0, 0.0]); }
  TranslateY(y) { this.Translate([0.0, y, 0.0]); }
  TranslateZ(z) { this.Translate([0.0, 0.0, z]); }

  Rotate(angle) {
    this.#m_rotation[0] = (this.#m_rotation[0] + angle[0]) % 360.0;
    this.#m_rotation[1] = (this.#m_rotation[1] + angle[1]) % 360.0;
    this.#m_rotation[2] = (this.#m_rotation[2] + angle[2]) % 360.0;
  }
  RotateX(x) { this.Rotate([x, 0.0, 0.0]); }
  RotateY(y) { this.Rotate([0.0, y, 0.0]); }
  RotateZ(z) { this.Rotate([0.0, 0.0, z]); }

  Scale(scale) {
    this.#m_scale[0] *= scale[0];
    this.#m_scale[1] *= scale[1];
    this.#m_scale[2] *= scale[2];
  }
  ScaleX(x) { this.Scale([x, 0.0, 0.0]); }
  ScaleY(y) { this.Scale([0.0, y, 0.0]); }
  ScaleZ(z) { this.Scale([0.0, 0.0, z]); }

  /*---------------------------------------
    プライベート変数
  ---------------------------------------*/
  #m_position = [0.0, 0.0, 0.0];
  #m_rotation = [0.0, 0.0, 0.0];
  #m_scale = [1.0, 1.0, 1.0];
}

export { Transform };
