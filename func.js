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
  var otst = otstoinik[name]

  const countOfRow = 100;
  const countOfColumn = 100;
  const widthBlock = 6;

  var h = 0;
  var countForFill = 0;
  var curWidthRow = 0;
  var width 

  let j = 1;
  do {
    if (curHer.length == 0) {
      width = widthBlock
      createBlock(width, false, null, name);
      j += 1;
    } else {
      if (h < curHer.length ) {
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

  var countOtst = Math.trunc(parseInt(otst["count"])/countOfColumn) 
  var ostCountOtst = parseInt(otst["count"]) - countOtst * countOfColumn//=( Math.trunc(parseInt(otst["count"])/countOfColumn) - Math.trunc(parseInt(otst["count"]) / countOfColumn)) * countOfColumn
  if (ostCountOtst != 0) createBlock(ostCountOtst*widthBlock, true,null ,"",widthBlock)
  if (countOtst != 0)createBlock(countOfColumn*widthBlock, true,null ,"",widthBlock*countOtst)


}

function createBlock(width, payed, her = null, name = "", height = null) {
  var d = document.getElementById("mainDiv");
  var nEl;
  nEl = document.createElement("span");
  nEl.style.width = width.toString() + "px";
  
  if(height) {nEl.style.height = height.toString() + "px";}
  if (payed) {
    nEl.className = "tooltip fillDiv paySector";
    nEl.delayOpen = "10";
   if(her) {if(her["Name"]) {nEl.title = her["Name"];} }else {nEl.title = 'Анонімний донатор'} 
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
