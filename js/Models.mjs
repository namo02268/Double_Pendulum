import { Transform } from "./Transform.mjs";
import { VertexBuffer, IndexBuffer, VertexArray } from "./GL/Buffer.mjs";

class Model {
  transform;
  VBO;
  IBO;
  VAO;

  constructor() {
    this.transform = new Transform();
    this.VBO = new VertexBuffer();
    this.IBO = new IndexBuffer();
    this.VAO = new VertexArray();
  }

  Bind() {
    this.VAO.Bind();
  }
}

class Sphere extends Model {
  constructor(radius, segments) {
    super();

    let vertices = [];
    let indices = [];
    const angleIncrement = (2 * Math.PI) / segments;
    for (let i = 0; i < segments; i++) {
      const angle = i * angleIncrement;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      vertices.push(x, y, 0);

      if (i > 0 && i < segments) {
        indices.push(0, i, i + 1);
      }
    }

    this.VAO.Bind();
    this.VBO.SetData(vertices.length, vertices);
    this.IBO.SetData(indices.length, indices);
    this.VAO.BindAttribute(this.VBO);
  }
}

class Rectangle extends Model {
  constructor(width, height) {
    super();

    let vertices = [];
    vertices.push(-0.5 * width, -0.5 * height, 0.0);
    vertices.push(-0.5 * width, 0.5 * height, 0.0);
    vertices.push(0.5 * width, 0.5 * height, 0.0);
    vertices.push(0.5 * width, -0.5 * height, 0.0);
    let indices = [0, 1, 3, 1, 3, 2];

    this.VAO.Bind();
    this.VBO.SetData(vertices.length, vertices);
    this.IBO.SetData(indices.length, indices);
    this.VAO.BindAttribute(this.VBO);
  }
}

export { Model, Sphere, Rectangle };
