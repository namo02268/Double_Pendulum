class InputHandler {
  /*---------------------------------------
    パブリック関数
  ---------------------------------------*/
  // コンストラクタ
  constructor() {
    document.addEventListener('pointerdown', this.#HandlePointerDown);
    document.addEventListener('pointermove', this.#HandlePointerMove);
    document.addEventListener('pointerup', this.#HandlePointerUp);
    document.addEventListener('wheel', this.#HandleWheel);
    document.addEventListener('gesturestart', (event) => event.preventDefault());
  }
  // アップデート・変数のリセット
  Update() {
    this.#isPointerPressed = false;
    this.#isPointerReleased = false;
    this.#deltaX = 0;
    this.#deltaY = 0;
  }
  // X座標の取得
  X() {
    return this.#X;
  }
  // Y座標の取得
  Y() {
    return this.#Y;
  }
  // X変化量の取得
  DeltaX() {
    return this.#deltaX;
  }
  // Y変化量の取得
  DeltaY() {
    return this.#deltaY;
  }
  // ズーム量の取得
  Zoom() {
    return this.#zoom;
  }
  // ポインタが押されたか
  IsPointerPressed() {
    return this.#isPointerPressed;
  }
  // ポインタが押されているか
  IsPointerHeld() {
    return this.#isPointerHeld;
  }
  // ポインタが離されたか
  IsPointerReleased() {
    return this.#isPointerReleased;
  }

  /*---------------------------------------
    プライベート関数
  ---------------------------------------*/
  // ポインタが押された時
  #HandlePointerDown = (event) => {
    this.#eventCache.push(event);
    if (this.#eventCache.length === 1) {
      this.#isPointerPressed = true;
      this.#isPointerHeld = true;
      this.#isPointerReleased = false;
      if (event.isPrimary) {
        this.#X = event.clientX;
        this.#Y = event.clientY;
      }
    }
  }
  // ポインタが移動した時
  #HandlePointerMove = (event) => {
    // キャッシュから同じイベントを見つけて更新
    const index = this.#eventCache.findIndex(
      (tmp) => tmp.pointerId === event.pointerId,
    );
    this.#eventCache[index] = event;
    // キャッシュが1個の時、平行移動
    if (this.#eventCache.length === 1) {
      if (event.isPrimary) {
        this.#deltaX = this.#X - event.clientX;
        this.#deltaY = this.#Y - event.clientY;
        this.#X = event.clientX;
        this.#Y = event.clientY;
      }
    }
    // キャッシュが2個の時、拡大縮小
    else if (this.#eventCache.length === 2) {
      const curDiffX = Math.abs(this.#eventCache[0].clientX - this.#eventCache[1].clientX);
      const curDiffY = Math.abs(this.#eventCache[0].clientY - this.#eventCache[1].clientY);
      const curDiff = Math.sqrt(curDiffX * curDiffX + curDiffY * curDiffY);
      if (this.#prevDiff > 0) {
        if (curDiff > this.#prevDiff) {
          this.#zoom *= this.#zoomStepSMH;
        }
        if (curDiff < this.#prevDiff) {
          this.#zoom /= this.#zoomStepSMH;
        }
      }
      this.#prevDiff = curDiff;
    }
  }
  // ポインタが離された時
  #HandlePointerUp = (event) => {
    if (this.#eventCache.length === 1) {
      this.#isPointerPressed = false;
      this.#isPointerHeld = false;
      this.#isPointerReleased = true;
    }
    // キャッシュから同じイベントを削除
    const index = this.#eventCache.findIndex(
      (tmp) => tmp.pointerId === event.pointerId,
    );
    this.#eventCache.splice(index, 1);
  }
  // マウスホイールが回転した時
  #HandleWheel = (event) => {
    if (event.deltaY > 0) {
      this.#zoom /= this.#zoomStepPC;
    } else {
      this.#zoom *= this.#zoomStepPC;
    }
  }

  /*---------------------------------------
    プライベート変数
  ---------------------------------------*/
  #X = 0;               // X座標
  #Y = 0;               // Y座標
  #deltaX = 0;          // X変化量
  #deltaY = 0;          // Y変化量
  #zoomStepPC = 0.9;    // PC用ズーム
  #zoomStepSMH = 0.97;  // PC用ズーム
  #zoom = 1.0;          // ズーム
  #eventCache = [];     // ポインタイベント用キャッシュ
  #prevDiff = -1;       // ポインタの距離の差
  #isPointerPressed = false;  // ポインタが押されたか
  #isPointerHeld = false;     // ポインタが押されているか
  #isPointerReleased = false; // ポインタが離されたか
}

export { InputHandler };
