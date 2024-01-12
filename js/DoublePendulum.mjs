import Decimal from './decimal.mjs';

function degrees_to_radians(degrees) {
  return Decimal.mul(degrees, Decimal.div(Math.PI, 180));
}

function radians_to_degrees(radians) {
  return Decimal.mul(radians, Decimal.div(180, Math.PI));
}

class DoublePendulum {
  constructor() {
    this.#RecalculateA();
  }

  Update(dt) {
    let B = Decimal.mul(Decimal.mul(Decimal.mul(this.#M2, this.#L1), this.#L2), Decimal.cos(Decimal.sub(this.#theta1, this.#theta2)));
    let D1 = -Decimal.sum(Decimal.mul(Decimal.mul(Decimal.mul(Decimal.mul(Decimal.mul(this.#M2, this.#L1), this.#L2), this.#theta2Dot), this.#theta2Dot), Decimal.sin(Decimal.sub(this.#theta1, this.#theta2))), Decimal.mul(Decimal.mul(Decimal.mul(Decimal.sum(this.#M1, this.#M2), this.#g), this.#L1), Decimal.sin(this.#theta1)));
    let D2 = Decimal.sub(Decimal.mul(Decimal.mul(Decimal.mul(Decimal.mul(Decimal.mul(this.#M2, this.#L1), this.#L2), this.#theta1Dot), this.#theta1Dot), Decimal.sin(Decimal.sub(this.#theta1, this.#theta2))), Decimal.mul(Decimal.mul(Decimal.mul(this.#M2, this.#g), this.#L2), Decimal.sin(this.#theta2)));

    let theta1DotDot = Decimal.div(Decimal.sub(Decimal.mul(this.#A2, D1), Decimal.mul(B, D2)), Decimal.sub(Decimal.mul(this.#A1, this.#A2), Decimal.mul(B, B)));
    let theta2DotDot = Decimal.div(Decimal.sub(Decimal.mul(this.#A1, D2), Decimal.mul(B, D1)), Decimal.sub(Decimal.mul(this.#A1, this.#A2), Decimal.mul(B, B)));
    this.#theta1Dot = Decimal.sum(this.#theta1Dot, Decimal.mul(theta1DotDot, dt));
    this.#theta2Dot = Decimal.sum(this.#theta2Dot, Decimal.mul(theta2DotDot, dt));
    this.#theta1 = Decimal.sum(this.#theta1, Decimal.mul(this.#theta1Dot, dt));
    this.#theta2 = Decimal.sum(this.#theta2, Decimal.mul(this.#theta2Dot, dt));

    this.#point1x = -Decimal.mul(this.#L1, Decimal.sin(this.#theta1));
    this.#point1y = -Decimal.mul(this.#L1, Decimal.cos(this.#theta1));
    this.#point2x = Decimal.sub(this.#point1x, Decimal.mul(this.#L2, Decimal.sin(this.#theta2)));
    this.#point2y = Decimal.sub(this.#point1y, Decimal.mul(this.#L2, Decimal.cos(this.#theta2)));
  }

  Reset() {
    this.#theta1 = degrees_to_radians(-90.0);
    this.#theta2 = degrees_to_radians(-120.0);
    this.#theta1Dot = new Decimal(0.0);
    this.#theta2Dot = new Decimal(0.0);
    this.#M1 = new Decimal(1.0);
    this.#M2 = new Decimal(1.0);
    this.#L1 = new Decimal(1.0);
    this.#L2 = new Decimal(1.0);
    this.#RecalculateA();
  }

  #RecalculateA() {
    this.#A1 = Decimal.mul(Decimal.mul(Decimal.sum(this.#M1, this.#M2), this.#L1), this.#L1);
    this.#A2 = Decimal.mul(Decimal.mul(this.#M2, this.#L2), this.#L2);
  }

  GetPoint1X() { return this.#point1x };
  GetPoint1Y() { return this.#point1y };
  GetPoint2X() { return this.#point2x };
  GetPoint2Y() { return this.#point2y };

  GetTheta1() { return radians_to_degrees(this.#theta1); }
  GetTheta2() { return radians_to_degrees(this.#theta2); }

  SetM1(M1) { this.#M1 = M1; this.#RecalculateA(); }
  SetM2(M2) { this.#M2 = M2; this.#RecalculateA(); }

  SetL1(L1) { this.#L1 = L1; this.#RecalculateA(); }
  SetL2(L2) { this.#L2 = L2; this.#RecalculateA(); }

  #M1 = new Decimal(1.0);
  #M2 = new Decimal(1.0);
  #L1 = new Decimal(1.0);
  #L2 = new Decimal(1.0);
  #g = new Decimal(9.8);         // 重力加速度

  #A1 = new Decimal(0.0);
  #A2 = new Decimal(0.0);

  #theta1 = degrees_to_radians(-90.0);    // 初期角度1
  #theta2 = degrees_to_radians(-120.0);    // 初期角度2
  #theta1Dot = new Decimal(0.0); // 初期角速度
  #theta2Dot = new Decimal(0.0); // 初期角速度

  #point1x = new Decimal(0.0);;
  #point1y = new Decimal(0.0);;
  #point2x = new Decimal(0.0);;
  #point2y = new Decimal(0.0);;
}

export { DoublePendulum };
