import { gl } from "./GL/GL.mjs";
import { InputHandler } from "./InputHandler.mjs";
import { GLWindow } from "./GL/GLWindow.mjs";
import { Shader } from "./GL/Shader.mjs";
import { Camera } from "./Camera.mjs";

import { fsSource } from "./fragmentShader.mjs";
import { vsSource } from "./vertexShader.mjs";
import { Model, Sphere, Rectangle } from "./Models.mjs";
import { DoublePendulum } from "./DoublePendulum.mjs";

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

    // Double Pendulum
    this.#m_doublePendulum = new DoublePendulum();
    this.#m_doublePendulum.Update(0);

    // Buffer
    this.#m_centerSphere = new Sphere(0.1, 64);

    this.#m_sphere_1 = new Sphere(0.1, 64);
    this.#m_sphere_2 = new Sphere(0.1, 64);
    this.#m_rod_1 = new Rectangle(0.05, 1);
    this.#m_rod_1.transform.TranslateY(-0.5);
    this.#m_rod_2 = new Rectangle(0.05, 2);
    this.#m_rod_2.SetCenter([0.0, -1.0, 0.0]);
  }

  // 描画
  Draw() {
    const view = mat4.create(1.0);
    const projection = this.#m_camera.GetProjection();

    this.#m_shader.Bind();
    this.#m_shader.SetUniformMatrix4("view", view);
    this.#m_shader.SetUniformMatrix4("projection", projection);

    this.#m_centerSphere.Bind();
    this.#m_shader.SetUniformMatrix4("model", this.#m_centerSphere.transform.GetLocalMatrix());
    gl.drawElements(gl.TRIANGLES, this.#m_sphere_1.IBO.GetSize(), gl.UNSIGNED_SHORT, 0);

    this.#m_sphere_1.transform.SetPosition([this.#m_doublePendulum.GetPoint1X(), this.#m_doublePendulum.GetPoint1Y(), 0.0]);
    this.#m_sphere_1.Bind();
    this.#m_shader.SetUniformMatrix4("model", this.#m_sphere_1.transform.GetLocalMatrix());
    gl.drawElements(gl.TRIANGLES, this.#m_sphere_1.IBO.GetSize(), gl.UNSIGNED_SHORT, 0);

    this.#m_sphere_2.transform.SetPosition([this.#m_doublePendulum.GetPoint2X(), this.#m_doublePendulum.GetPoint2Y(), 0.0]);
    this.#m_sphere_2.Bind();
    this.#m_shader.SetUniformMatrix4("model", this.#m_sphere_2.transform.GetLocalMatrix());
    gl.drawElements(gl.TRIANGLES, this.#m_sphere_2.IBO.GetSize(), gl.UNSIGNED_SHORT, 0);


    this.#m_rod_1.transform.SetRotation([0.0, 0.0, -this.#m_doublePendulum.GetTheta1()]);
    this.#m_rod_1.Bind();
    this.#m_shader.SetUniformMatrix4("model", this.#m_rod_1.transform.GetLocalMatrix());
    gl.drawElements(gl.TRIANGLES, this.#m_rod_1.IBO.GetSize(), gl.UNSIGNED_SHORT, 0);

    this.#m_rod_2.transform.SetRotation([0.0, 0.0, -this.#m_doublePendulum.GetTheta2()]);
    this.#m_rod_2.transform.SetPosition([
      this.#m_doublePendulum.GetPoint1X(),
      this.#m_doublePendulum.GetPoint1Y(),
      0.0
    ]);
    this.#m_rod_2.Bind();
    this.#m_shader.SetUniformMatrix4("model", this.#m_rod_2.transform.GetLocalMatrixInv());
    gl.drawElements(gl.TRIANGLES, this.#m_rod_2.IBO.GetSize(), gl.UNSIGNED_SHORT, 0);
  }

  // 更新
  Update(dt) {
    this.#m_camera.Resize(gl.canvas.width, gl.canvas.height);
    this.#m_window.Resize();
    this.#m_inputHandler.Update();
    this.#m_doublePendulum.Update(dt);
  }

  /*---------------------------------------
    プライベート変数
  ---------------------------------------*/
  #m_shader;
  #m_inputHandler;
  #m_window;;
  #m_camera;

  #m_doublePendulum;
  #m_centerSphere;
  #m_sphere_1;
  #m_sphere_2;
  #m_rod_1;
  #m_rod_2;
}

export { Scene };
