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
  for (let i = 1; i <= 100; i++) {
    for (let j = 1; j <= 100; j++) {
      var d = document.getElementById("mainDiv");
      var nEl = document.createElement("span");
      nEl.className = "tooltip";
      nEl.delayOpen = "50"
      nEl.title = "Element"; // tool tip text
      var sEl = document.createElement("div");
      sEl.className = "fillDiv paySector";
      nEl.appendChild(sEl);

      d.appendChild(nEl);
    }
  }
}