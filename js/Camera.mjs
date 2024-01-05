class Camera {
  #fov;
  #aspect;
  #zNear;
  #zFar;
  #projectionMatrix;

  constructor(width, height) {
    this.#fov = (45 * Math.PI) / 180;
    this.#aspect = width / height;
    this.#zNear = 0.1;
    this.#zFar = 100.0;
    this.#projectionMatrix = mat4.create();
  }

  Resize(width, height) {
    this.#aspect = width / height;
  }

  GetProjection() {
    return mat4.ortho(
      this.#projectionMatrix,
      -4 * this.#aspect,
      4 * this.#aspect,
      -4.0,
      4.0,
      -1.0,
      1.0,
    );
  }
}

export { Camera };
