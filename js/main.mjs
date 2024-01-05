import { Scene } from "./Scene.mjs";
import { Transform } from "./Transform.mjs";

window.onload = main;

function main() {
  //-------------------Init Scene-------------------//
  const scene = new Scene();
  scene.Init();

  //-------------------Render Loop-------------------//
  let lastFrame = 0;
  function render(currentFrame) {
    currentFrame *= 0.001;
    const deltaTime = currentFrame - lastFrame;
    lastFrame = currentFrame;
    document.querySelector(".fps").textContent = `${(1 / deltaTime).toFixed(2)}`;
    scene.Draw();
    scene.Update(deltaTime);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}
