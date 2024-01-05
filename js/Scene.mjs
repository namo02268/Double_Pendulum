import { gl } from "./GL/GL.mjs";
import { InputHandler } from "./InputHandler.mjs";
import { GLWindow } from "./GL/GLWindow.mjs";
import { Shader } from "./GL/Shader.mjs";
import { Camera } from "./Camera.mjs";

import { fsSource } from "./fragmentShader.mjs";
import { vsSource } from "./vertexShader.mjs";
import { Model, Sphere, Rectangle } from "./Models.mjs";

class Scene {
  /*---------------------------------------
    パブリック関数
  ---------------------------------------*/
  // 初期化
  Init() {
    // Window
    this.#m_window = new GLWindow();

    // Shader
    this.#m_shader = new Shader();
    this.#m_shader.Compile(vsSource, fsSource);
    this.#m_shader.Bind();
    this.#m_shader.BindAttribLocation("aPos", 0);

    // InputHandler
    this.#m_inputHandler = new InputHandler();

    // Camera
    this.#m_camera = new Camera(gl.canvas.width, gl.canvas.height);

    // Buffer
    this.#m_sphere = new Sphere(1.0, 64);
    this.#m_sphere_2 = new Rectangle(1.0, 1.0);
    this.#m_sphere_2.transform.TranslateX(-3.0);
  }

  // 描画
  Draw() {
    const view = mat4.create(1.0);
    const projection = this.#m_camera.GetProjection();

    this.#m_shader.Bind();
    this.#m_shader.SetUniformMatrix4("view", view);
    this.#m_shader.SetUniformMatrix4("projection", projection);

    this.#m_sphere.Bind();
    this.#m_shader.SetUniformMatrix4("model", this.#m_sphere.transform.GetLocalMatrix());
    gl.drawElements(gl.TRIANGLES, this.#m_sphere.IBO.GetSize(), gl.UNSIGNED_SHORT, 0);

    this.#m_sphere_2.Bind();
    this.#m_shader.SetUniformMatrix4("model", this.#m_sphere_2.transform.GetLocalMatrix());
    gl.drawElements(gl.TRIANGLES, this.#m_sphere_2.IBO.GetSize(), gl.UNSIGNED_SHORT, 0);
  }

  // 更新
  Update(deltaTime) {
    this.#m_camera.Resize(gl.canvas.width, gl.canvas.height);
    this.#m_window.Resize();
    this.#m_inputHandler.Update();
  }

  /*---------------------------------------
    プライベート変数
  ---------------------------------------*/
  #m_sphere;
  #m_sphere_2;

  #m_shader;
  #m_inputHandler;
  #m_window;;
  #m_camera;
}

export { Scene };
