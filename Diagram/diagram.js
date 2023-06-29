(() => {
  var uploadData = [
    {
      year: 2018,
      data: [
        {
          name: "Польща",
          salary: 15123,
        },
        {
          name: "Украина",
          salary: 3200,
        },
        {
          name: "Литва",
          salary: 11111,
        },
        {
          name: "Румуния",
          salary: 12312,
        },
        {
          name: "Болгария",
          salary: 4444,
        },
        {
          name: "Эстония",
          salary: 3333,
        },
      ],
    },
    {
      year: 2019,
      data: [
        {
          name: "Польща",
          salary: 31242,
        },
        {
          name: "Украина",
          salary: 15323,
        },
        {
          name: "Литва",
          salary: 17325,
        },
        {
          name: "Румуния",
          salary: 19203,
        },
        {
          name: "Болгария",
          salary: 10000,
        },
        {
          name: "Эстония",
          salary: 5420,
        },
      ],
    },
  ];

  let canvas = document.querySelector("#myCanvas");
  if (canvas == null) return;

  let ctx = canvas.getContext("2d");

  let userSelect = document.querySelector(".diagram-select");
  for (let i = 0; i < uploadData.length; i++) {
    let option = document.createElement("option");
    option.value = uploadData[i].year;
    option.innerHTML = uploadData[i].year;

    userSelect.appendChild(option);
  }

  let DIR = {
    UP: 0,
    DOWN: 1,
    RIGHT: 2,
    LEFT: 3,
  };

  let drawArrow = (ctx, x, y, dir, len, lineW, w = 14, h = 8) => {
    ctx.beginPath();

    ctx.moveTo(x, y);

    ctx.strokeStyle = "gray";
    ctx.lineWidth = lineW;
    let end;
    switch (dir) {
      case DIR.UP: {
        end = y - len;
        ctx.lineTo(x, end);

        ctx.moveTo(x, end);
        ctx.lineTo(x - h, end + w);
        ctx.moveTo(x, end);
        ctx.lineTo(x + h, end + w);
        break;
      }
      case DIR.DOWN: {
        end = y + len;
        ctx.lineTo(x, end);

        ctx.moveTo(x, end);
        ctx.lineTo(x + h, end - w);
        ctx.moveTo(x - h, end - w);
        ctx.lineTo(x, end);
        break;
      }
      case DIR.RIGHT: {
        end = x + len;
        ctx.lineTo(end, y);

        ctx.moveTo(end, y);
        ctx.lineTo(end - w, y - h);
        ctx.moveTo(end - w, y + h);
        ctx.lineTo(end, y);
        break;
      }
      case DIR.LEFT: {
        end = x - len;
        ctx.lineTo(end, y);

        ctx.moveTo(end, y);
        ctx.lineTo(end + w, y + h);
        ctx.moveTo(end + w, y - h);
        ctx.lineTo(end, y);
        break;
      }
    }

    ctx.stroke();
    ctx.closePath();
  };

  function createDiagram() {
    let currentYearData = uploadData[userSelect.selectedIndex];

    let header = document.querySelector(".header-style");
    if(header !== null)
      document.querySelector(".diagram-container").removeChild(header);

    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    header = document.createElement("h2");
    header.innerHTML = `Мінімальна заробітна плата на ${currentYearData.year} рік, грн/міс`;
    header.classList.add("header-style");
    document.querySelector(".diagram-container").appendChild(header);


    let locX = 80;
    let locY = canvas.clientHeight - 50;
    let len = canvas.clientWidth - 80 * 2;

    drawArrow(ctx, locX, locY, DIR.RIGHT, len, 3);
    drawArrow(ctx, locX, locY, DIR.UP, canvas.clientHeight - 50 * 2, 3);

    let maxSalary = 0;
    let topBound;
    for (let i = 0; i < currentYearData.data.length; i++) {
      if(currentYearData.data[i].salary > maxSalary)
        maxSalary = currentYearData.data[i].salary;
    }

    let countRow = Math.ceil(maxSalary / 2000);

    let step = (canvas.clientHeight - 80 * 2) / countRow + 1;

    let temp = locY;

    for (let i = 0; i < countRow + 1; i++) {
      ctx.beginPath();

      if(i > 0)
        temp -= step;

      ctx.font = "bold 16px Courier New";
      ctx.textAlign = "right";
      ctx.fillText(topBound = i * 2000, locX - 25, temp + 4);
      ctx.moveTo(locX - 8, temp);

      if(i > 0)
        ctx.lineTo(locX + 8, temp);
      else
        ctx.lineTo(locX, temp);

      ctx.stroke();
      ctx.closePath();
    }

    temp = locY;

    for (let i = 0; i < countRow; i++) {
      ctx.beginPath();

      temp -= step;

      ctx.moveTo(locX + 14, temp);
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.5;
      ctx.lineTo(len + 80, temp);

      ctx.stroke();
      ctx.closePath();
    }

    let colWidth = ((len / currentYearData.data.length) / 2) * 1.1;
    let gap = (colWidth / 2) * 1.4;

    let colX = locX;
    let colY = canvas.clientHeight - 51.8;

    let eightyPercent = (topBound / 100) * 80;
    for (let i = 0; i < currentYearData.data.length; i++) {
      ctx.beginPath();
      if(currentYearData.data[i].salary <= eightyPercent / 2){
        ctx.fillStyle = `rgb(${255}, ${0}, ${0})`;
      }
      else if (currentYearData.data[i].salary > eightyPercent / 2 && currentYearData.data[i].salary <= eightyPercent){
        console.log(eightyPercent);
        console.log(currentYearData.data[i].salary);
        ctx.fillStyle = `rgb(${255}, ${255}, ${0})`;
      }
      else{
        ctx.fillStyle = `rgb(${0}, ${255}, ${0})`;
      }
      ctx.lineWidth = 3;
      ctx.globalAlpha = 1;
      ctx.moveTo(colX += gap, colY);
      ctx.lineTo(colX += colWidth, colY);
      let height = (currentYearData.data[i].salary / 2000) * step;
      ctx.lineTo(colX, colY - height);
      ctx.lineTo(colX - colWidth, colY - height);


      ctx.fill();
      ctx.closePath();

      ctx.fillStyle = "black";
      ctx.font = "bold 28px Courier New";
      ctx.textAlign = "center";
      ctx.fillText(
        currentYearData.data[i].name,
        colX - colWidth / 2,
        colY + 30
      );

      ctx.font = "bold 24px Courier New";
      ctx.fillText(
        currentYearData.data[i].salary,
        colX - colWidth / 2,
        colY - height - 10
      );
    }
  }

  createDiagram();

  userSelect.addEventListener("change", createDiagram);
})();