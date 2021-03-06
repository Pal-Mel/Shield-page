// сортування массиву за сумою
function SortArray(x, y) {
  if (Number(x["summa"]) > Number(y["summa"])) {
    return -1;
  }
  if (Number(x["summa"]) < Number(y["summa"])) {
    return 1;
  }
  return 0;
}

// заповнення клітинок на картинці
function fillSectors(name) {
  var curHer = dt[name];
  var otst = otstoinik[name];

  const countOfRow = 100;
  const countOfColumn = 100;
  const widthBlock = 6;

  var h = 0;
  var countForFill = 0;
  var curWidthRow = 0;
  var width;

  let j = 1;
  do {
    if (curHer.length == 0) {
      width = widthBlock;
      createBlock(width, false, null, name);
      j += 1;
    } else {
      if (h < curHer.length) {
        countForFill = curHer[h]["count"] * 1;
        width = widthBlock * countForFill;

        if (curWidthRow + width > countOfColumn * widthBlock) {
          if (countOfColumn * widthBlock - curWidthRow != 0) {
            createBlock(
              countOfColumn * widthBlock - curWidthRow,
              true,
              curHer[h]
            );
          }

          var qq = width - (countOfColumn * widthBlock - curWidthRow);
          curWidthRow = qq;
          if (qq != 0) {
            createBlock(qq, true, curHer[h]);
          }
        } else {
          createBlock(width, true, curHer[h]);
          curWidthRow += width;
        }

        h += 1;
        j += countForFill;
      } else {
        createBlock(width, false, null);
        j += 1;
      }
    }
  } while (j <= countOfColumn * countOfRow - parseInt(otst["count"]));

  var countOtst = Math.trunc(parseInt(otst["count"]) / countOfColumn);
  var ostCountOtst = parseInt(otst["count"]) - countOtst * countOfColumn; //=( Math.trunc(parseInt(otst["count"])/countOfColumn) - Math.trunc(parseInt(otst["count"]) / countOfColumn)) * countOfColumn
  if (ostCountOtst != 0)
    createBlock(ostCountOtst * widthBlock, true, null, "", widthBlock);
  if (countOtst != 0)
    createBlock(
      countOfColumn * widthBlock,
      true,
      null,
      "",
      widthBlock * countOtst
    );
}

function createBlock(
  width,
  payed,
  her = null,
  name = "",
  height = null,
  classDiv = "mainDiv"
) {
  var d = document.getElementById(classDiv);
  var nEl;
  nEl = document.createElement("span");
  nEl.style.width = width.toString() + "px";

  if (height) {
    nEl.style.height = height.toString() + "px";
  }
  if (payed) {
    nEl.className = "tooltip fillDiv paySector";
    nEl.delayOpen = "10";
    if (her) {
      if (her["Name"]) {
        nEl.title = her["Name"];
      }
    } else {
      nEl.title = "Анонімний донатор";
    }
    // nEl.content = " - " + her["summa"] + " грн"; // tool tip text
    d.appendChild(nEl);
  } else {
    nEl = document.createElement("a");

    // var modal = document.getElementById("myModal");
    nEl.href = "https://shop.spgr.org.ua/" + name + "/";
    nEl.target = "blank";
    nEl.className = "fillDiv noPaySector";
    nEl.title =
      "Натисни! Допоможи ЗСУ. Купи частину автомобіля. Залиш своє ім’я на сайті";
    // nEl.onclick = function() {
    //   modal.style.display = "block";
    // }

    d.appendChild(nEl);
  }
}

var random_color = function () {
  var color = [0, 0, 0];
  for (var i = 0; i <= 2; i++) {
    if (Math.random() < 0.66666) color[i] = 32 + parseInt(Math.random() * 192);
  }
  return "rgb(" + color[0] + "," + color[1] + "," + color[2] + ")";
};

function fillMosaic(name) {
  var her = dt[name];
  var otst = otstoinik[name];
  const widthBlock = 6;
  var mosaic = document.getElementById("mosaic");
  mosaic.style.position = "relative";
  // var packer = new Packer(600, 600); // or:  new GrowingPacker();
  var blocks = [];
  for (i in her) {
    her[i]["size"] = Math.trunc(Math.sqrt(parseInt(her[i]["count"])));
    her[i]["last"] =
      parseInt(her[i]["count"]) -
      parseInt(her[i]["size"]) * parseInt(her[i]["size"]);
    blocks.push({
      w: her[i]["size"] * widthBlock,
      h: her[i]["size"] * widthBlock,
    });

    if (her[i]["last"] != 0) {
      blocks.push({ w: her[i]["last"] * widthBlock, h: widthBlock });
    }
  }

  blocks.sort(function (a, b) {
    return b.h < a.h;
  }); // sort inputs for best results
  packer.fit(blocks);

  // for (var n = 0; n < blocks.length; n++) {
  //   var block = blocks[n];
  //   if (block.fit) {
  //     console.log(block);
  //     var div = document.createElement("div");
  //     div.innerHTML = n;
  //     div.style.width = block.w;
  //      div.id = 'div'+n;
  //     div.style.height = block.h;
  //     div.style.position = "absolute";
  //     div.style.left = block.fit.x;
  //     div.style.top = block.fit.y;
  //     div.style.backgroundColor = random_color();
  //     mosaic.appendChild(div);
  //     // DrawRectangle(block.fit.x, block.fit.y, block.w, block.h);
  //   }
  // }
}
// for (i in her) {
// her[i]["size"] = Math.trunc(Math.sqrt(parseInt(her[i]["count"])));
// her[i]["last"] =
//   parseInt(her[i]["count"]) -
//   parseInt(her[i]["size"]) * parseInt(her[i]["size"]);

// var div = document.createElement("div");
// div.innerHTML = i;
// div.style.width = her[i]["size"] * widthBlock;
// // div.id = 'div'+i;
// div.style.height = her[i]["size"] * widthBlock;
// div.style.position = "absolute";
// div.style.left = 0;
// div.style.top = 0;
// div.style.backgroundColor = random_color();
// mosaic.appendChild(div);
// if (her[i]["last"] != 0) {
//   div = document.createElement("div");
//   div.innerHTML = i;
//   div.style.width = widthBlock;
//   // div.id = 'div'+i;
//   div.style.height = parseInt(her[i]["last"]) * widthBlock;
//   div.style.position = "absolute";
//   div.style.left = 0;
//   div.style.top = 0;
//   div.style.backgroundColor = random_color();
//   mosaic.appendChild(div);
// }
// her[i]["size"] = Math.trunc(Math.sqrt(parseInt(her[i]["count"])))
// her[i]["last"] = parseInt(her[i]["count"]) - (parseInt(her[i]["size"]) * parseInt(her[i]["size"]))
// createBlock(her[i]["size"]*widthBlock, true,her,her[i]["Name"], her[i]["size"]*widthBlock,"mosaik")
// if(her[i]["last"]!=0){createBlock(parseInt(her[i]["last"])*widthBlock, true,her,her[i]["Name"], widthBlock,"mosaik")}
// console.log(her[i]);
// }

// }
