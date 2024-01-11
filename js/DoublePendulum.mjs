function degrees_to_radians(degrees) {
  var pi = Math.PI;
  return degrees * (pi / 180);
}

function radians_to_degrees(radians) {
  var pi = Math.PI;
  return radians * (180 / pi);
}

class DoublePendulum {
  constructor() {
    this.#A1 = (this.#M1 + this.#M2) * this.#L1 * this.#L1;
    this.#A2 = this.#M2 * this.#L2 * this.#L2;
  }

  Update(dt) {
    let B = this.#M2 * this.#L1 * this.#L2 * Math.cos(this.#theta1 - this.#theta2);
    let D1 = -this.#M2 * this.#L1 * this.#L2 * this.#theta2Dot * this.#theta2Dot * Math.sin(this.#theta1 - this.#theta2) - (this.#M1 + this.#M2) * this.#g * this.#L1 * Math.sin(this.#theta1);
    let D2 = this.#M2 * this.#L1 * this.#L2 * this.#theta1Dot * this.#theta1Dot * Math.sin(this.#theta1 - this.#theta2) - this.#M2 * this.#g * this.#L2 * Math.sin(this.#theta2);

    let theta1DotDot = (this.#A2 * D1 - B * D2) / (this.#A1 * this.#A2 - B * B);
    let theta2DotDot = (this.#A1 * D2 - B * D1) / (this.#A1 * this.#A2 - B * B);
    this.#theta1Dot += theta1DotDot * dt;
    this.#theta2Dot += theta2DotDot * dt;
    this.#theta1 += this.#theta1Dot * dt;
    this.#theta2 += this.#theta2Dot * dt;

    this.#point1x = -this.#L1 * Math.sin(this.#theta1);
    this.#point1y = -this.#L1 * Math.cos(this.#theta1);
    this.#point2x = -this.#L2 * Math.sin(this.#theta2) + this.#point1x;
    this.#point2y = -this.#L2 * Math.cos(this.#theta2) + this.#point1y;
  }

  GetPoint1X() { return this.#point1x };
  GetPoint1Y() { return this.#point1y };
  GetPoint2X() { return this.#point2x };
  GetPoint2Y() { return this.#point2y };

  GetTheta1() { return radians_to_degrees(this.#theta1); }
  GetTheta2() { return radians_to_degrees(this.#theta2); }


  #M1 = 1.0;
  #M2 = 0.5;
  #L1 = 1.0;
  #L2 = 2.0;
  #g = 9.8;         // 重力加速度

  #A1;
  #A2;

  #theta1 = degrees_to_radians(-90.0);    // 初期角度1
  #theta2 = degrees_to_radians(-120.0);    // 初期角度2
  #theta1Dot = 0.0; // 初期角速度
  #theta2Dot = 0.0; // 初期角速度

  #point1x;
  #point1y;
  #point2x;
  #point2y;
}

export { DoublePendulum };
