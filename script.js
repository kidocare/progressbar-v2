const http = new EasyHTTP();
http
  .get("http://pb-api.herokuapp.com/bars")
  .then((data) => {
    console.log(data);
    let limit = data.limit;
    console.log(limit);
    let btnBar = "";
    data.buttons.forEach((element, index) => {
      btnBar += `<button type="button" class="btn btn-secondary" id="btn-${index}" onclick="addToBar(${element} , ${limit})">${element}</button>`;
      //   console.log(btnBar);
    });
    document.getElementById("btn-ctr").innerHTML = btnBar;
    let prBar = "";
    data.bars.forEach((element, index) => {
      prBar += `<div class="row my-3 ">
              <div class="col-12 d-flex justify-content-center" >
                  <div class="progress" style="height: 40px;width:${limit}px;" >
                      <div  aria-valuenow="${element}" aria-valuemin="0" aria-valuemax="${limit}" id="${element}" role="progressbar"  
                      class="progress-bar bg-info progress-bar-striped progress-bar-animated" style="width:${
                        (element / limit) * 100
                      }%;" >${element}</div>
                  </div>
              </div>
          </div>`;
    });

    document.getElementById("proBar").innerHTML = prBar;
    // console.log(prBar);
    let selBar = "";
    let selBarMain = `	
          <select onchange= "barSelect(value)"  id="select-ctr" class="form-control pr-5 mr-3" ></select>
          `;
    document.getElementById("select-main-ctr").innerHTML = selBarMain;
    data.bars.forEach((elem, index) => {
      selBar += `<option   id="sel${elem}" data="${elem}" value = "${elem}" >Bar ${
        index + 1
      }</option>`;
    });
    document.getElementById("select-ctr").innerHTML = selBar;
    let checkedBar = document.querySelectorAll(".progress-bar");
    checkedBar[0].classList.add("active");
    let addToBar;
    let barSelect;
  })

  .catch((err) => console.log(err));

barSelect = (value) => {
  let el = document.querySelectorAll(".progress-bar");

  // console.log(el);
  el.forEach((elem) => {
    if (elem.classList.contains("active")) {
      elem.classList.remove("active");
    }
    document.getElementById(value).classList.add("active");
  });
};

addToBar = (params, limit) => {
  let barWidth = document.querySelector(".active").textContent;
  barWidth = parseInt(barWidth);

  if (barWidth >= 0) {
    barWidth += params;
    document.querySelector(".active").textContent = barWidth;
    document.querySelector(".active").style.width =
      (barWidth / limit) * 100 + "%";
  }
  if (barWidth < 0) {
    document.querySelector(".active").textContent = 0;
  }
  if (barWidth > limit) {
    document.querySelector(".active").classList.remove("bg-info");
    document.querySelector(".active").classList.add("bg-danger");
  }
  if (barWidth <= limit) {
    document.querySelector(".active").classList.remove("bg-danger");
    document.querySelector(".active").classList.add("bg-info");
  }
  if (barWidth <= 0) {
    document.querySelector(".active").style.width = 5 + "%";
  }
  return barWidth;
  console.log(limit);

  console.log(params);
};
