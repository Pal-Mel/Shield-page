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
  curHer = curHer.sort(SortArray);
  for (i in curHer) {
    console.log(curHer[i]);
  }
  const countOfRow = 100
  const countOfColumn = 100

  var h = 0
  var nEl
  var d = document.getElementById("mainDiv");
console.log(d.clientWidth)

  for (let i = 1; i <= countOfRow; i++) {
    for (let j = 1; j <= countOfRow; j++) {

      nEl = document.createElement("span");
      nEl.className = "tooltip fillDiv paySector";
      nEl.delayOpen = "10"
      nEl.title = "Element"; // tool tip text
     
      d.appendChild(nEl);
    }
  }
}
