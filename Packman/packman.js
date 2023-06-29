(() => {
  let canvas = document.querySelector("#myCanvas");
  if (canvas == null) return;

  class Packman {
    #_x = 50;
    #_y = 50;
    #_radius = 25;
    #_color = "yellow";
    #_isOpen = false;
    #_kOpen = 0.2;
    #_ctx = null;

    #_dir = null;
    #_lastDir = null;
    #_speed = 5;

    #offset1 = 0.55;
    #offset2 = 0.2;

    isMoving = false;

    constructor(x, y, radius, color, ctx) {
      this.#_x = x;
      this.#_y = y;
      this.#_radius = radius;
      this.#_color = color;
      this.#_ctx = ctx;
      this.draw();
    }

    draw = () => {
      const drawFrame = () => {
        this.#_ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        let k = 0.2;

        if (this.#_kOpen <= 0) {
          this.#_isOpen = true;
        } else if (this.#_kOpen >= k) {
          this.#_isOpen = false;
        }
        if (this.#_isOpen === true) {
          this.#_kOpen += 0.005;
        } else {
          this.#_kOpen -= 0.005;
        }
        const eyeRadius = this.#_radius * 0.15;
        let eyeX = this.#_x + this.#_radius * 0.2;
        let eyeY = this.#_y - this.#_radius * 0.55;
        let startAngle, endAngle;

        if (this.#_dir !== null) {
          this.#_lastDir = this.#_dir;
        }
        switch (this.#_lastDir) {
          case Dir.UP:
            startAngle = (1.5 + this.#_kOpen) * Math.PI;
            endAngle = (1.5 - this.#_kOpen) * Math.PI;

            eyeX = this.#_x + this.#_radius * this.#offset1;
            eyeY = this.#_y - this.#_radius * this.#offset2;
            break;
          case Dir.DOWN:
            startAngle = (0.5 + this.#_kOpen) * Math.PI;
            endAngle = (0.5 - this.#_kOpen) * Math.PI;

            eyeX = this.#_x + this.#_radius * this.#offset1;
            eyeY = this.#_y - this.#_radius * -this.#offset2;
            break;
          case Dir.RIGHT:
            startAngle = (0 + this.#_kOpen) * Math.PI;
            endAngle = (2 - this.#_kOpen) * Math.PI;

            eyeX = this.#_x + this.#_radius * this.#offset2;
            eyeY = this.#_y - this.#_radius * this.#offset1;
            break;
          case Dir.LEFT:
            startAngle = (1 + this.#_kOpen) * Math.PI;
            endAngle = (1 - this.#_kOpen) * Math.PI;

            eyeX = this.#_x + this.#_radius * -this.#offset2;
            eyeY = this.#_y - this.#_radius * this.#offset1;
            break;
          default:
            startAngle = this.#_kOpen * Math.PI;
            endAngle = (2 - this.#_kOpen) * Math.PI;
            break;
        }

        this.#_ctx.beginPath();
        this.#_ctx.fillStyle = this.#_color;
        this.#_ctx.arc(this.#_x, this.#_y, this.#_radius, startAngle, endAngle);
        this.#_ctx.lineTo(this.#_x, this.#_y);
        this.#_ctx.fill();
        this.#_ctx.closePath();

        this.#_ctx.beginPath();
        this.#_ctx.fillStyle = "black";
        this.#_ctx.arc(eyeX, eyeY, eyeRadius, 0, 2 * Math.PI);
        this.#_ctx.fill();
        this.#_ctx.closePath();

        this.updatePosition();

        requestAnimationFrame(drawFrame);
      };

      requestAnimationFrame(drawFrame);
    };

    updatePosition = () => {
      if (this.#_dir !== null) {
        switch (this.#_dir) {
          case Dir.UP: {
            this.#_y -= this.#_speed;
            break;
          }
          case Dir.DOWN: {
            this.#_y += this.#_speed;
            break;
          }
          case Dir.RIGHT: {
            this.#_x += this.#_speed;
            break;
          }
          case Dir.LEFT: {
            this.#_x -= this.#_speed;
            break;
          }
        }
        this.isMoving = true;
      }
    };

    move = (dir) => {
      this.#_dir = dir;
      this.updatePosition();
    };

    stop = () => {
      this.#_dir = null;
      this.isMoving = false;
    };
  }

  let ctx = canvas.getContext("2d");

  let cX = canvas.clientWidth / 2;
  let cY = canvas.clientHeight / 2;

  let packman = new Packman(cX, cY, 50, "orange", ctx);

  let Dir = {
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3,
  };

  window.addEventListener("keydown", (e) => {
    if (!packman.isMoving) {
      switch (e.code) {
        case "KeyW": {
          packman.move(Dir.UP);
          break;
        }
        case "KeyS": {
          packman.move(Dir.DOWN);
          break;
        }
        case "KeyD": {
          packman.move(Dir.RIGHT);
          break;
        }
        case "KeyA": {
          packman.move(Dir.LEFT);
          break;
        }
      }
    }
  });

  window.addEventListener("keyup", (e) => {
    if (packman.isMoving) {
      switch (e.code) {
        case "KeyW":
        case "KeyS":
        case "KeyD":
        case "KeyA": {
          packman.stop();
          break;
        }
      }
    }
  });
})();
