const canvas = document.querySelector("#glCanvas");
const gl = canvas.getContext("webgl2");
if (!gl) {
  alert(
    "Unable to initialize WebGL. Your browser or machine may not support it."
  );
}

export { gl };
