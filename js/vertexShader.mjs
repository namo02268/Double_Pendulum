const vsSource = `
  attribute vec3 aPos;
  uniform mat4 model;
  uniform mat4 view;
  uniform mat4 projection;

  void main(void) {
    gl_Position = projection * view * model * vec4(aPos, 1.0);
  }
`;

export { vsSource };
