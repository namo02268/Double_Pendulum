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
    let projection;
    if (this.#aspect < 1.0) {
      projection = mat4.ortho(
        this.#projectionMatrix,
        -4,
        4,
        -4.0 / this.#aspect,
        4.0 / this.#aspect,
        -1.0,
        1.0,
      );
    } else {
      projection = mat4.ortho(
        this.#projectionMatrix,
        -4 * this.#aspect,
        4 * this.#aspect,
        -4.0,
        4.0,
        -1.0,
        1.0,
      );
    }
    return projection;
  }
}

export { Camera };
