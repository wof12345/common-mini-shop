let mainContainer = document.querySelector(`.main_container`);
let header = document.querySelector(".header");
let subtitle = document.querySelector(`.subtitle`);
let animation_text_container = document.querySelector(`.header_animated_text `);
let registerBtn = document.querySelector(`.register`);
let register_login_btn = document.querySelector(`.register_login`);
let registerBtnImg = document.querySelector(`.btn_img`);
let loginBtnImg = document.querySelector(`.btn_img_register`);
let siginCont = document.querySelector(`.inner_query_container`);
let registerCont = document.querySelector(`.inner_query_container--register`);
let forgot_pass_cont = document.querySelector(`.forgot_password`);
let calender = document.querySelector(`#select_birthdate`);
let before = document.querySelector(`.before`);
let after = document.querySelector(`.after`);
let loginInputs = siginCont.querySelectorAll(`.input`);
let registerInputs = registerCont.querySelectorAll(`.input`);

let rateBox = document.querySelector(`.rate_u`);
let rate = document.querySelector(`.rate`);

let pP = document.querySelector(`.main_page`);
let cost = document.querySelector(`.cost`);
let productCont = document.querySelector(`.products`);
let cart = document.querySelector(`.user_cart`);

let confirm = document.querySelector(`.confirm`);
let infoBox = document.querySelector(`.info_box`);

let user_info = document.querySelector(`.user_info`);
let switchState = false;

let cartBtn = document.querySelector(`.min`);
let last_rating;

let user_cart = [];

let lastChanged = [];

let logic = {
  pagefold: 1,
  loggedIn: false,
};

let userData = [];
let recievedData = [];

function generalAnimation(elements, animations) {
  elements.forEach((element, ind) => {
    element.style = animations[ind];
  });
}

function resetAnimation() {
  let left = window.getComputedStyle(before, null).getPropertyValue("left");
  console.log(left);

  if (left === "252.114px") {
    before.style = `animation: none;left:0;`;
    after.style = `animation:none;left:0;`;

    setTimeout(() => {
      before.style = `animation: var(--typewriter_before);left:0;`;
      after.style = `animation: var(--typewriter_animation);left:0;`;
    }, 200);
  }
}

function foldPage() {
  if (logic.pagefold === 1) {
    generalAnimation(
      [siginCont, registerCont, animation_text_container, forgot_pass_cont],
      [
        "transform:translateX(-400px);",
        "transform:translateX(0px);max-height: 320px;",
        "min-height: 100px;",
        "display:none",
      ]
    );
    setTimeout(() => {
      generalAnimation([siginCont], ["display:none"]);
    }, 500);
    logic.pagefold = 2;
    subtitle.textContent = "Please register to continue >";
    resetAnimation();
  } else {
    generalAnimation(
      [siginCont, registerCont, animation_text_container, forgot_pass_cont],
      [
        "transform:translateX(-400px);max-height: 170px;",
        "transform:translateX(-400px);",
        "min-height: 200px;",
        "display:block",
      ]
    );
    setTimeout(() => {
      generalAnimation(
        [siginCont, registerCont],
        [
          "transform:translateX(0px);",
          "transform:translateX(500px);max-height: 170px;",
        ]
      );
    }, 400);
    logic.pagefold = 1;
    subtitle.textContent = "Please login to continue >";
    resetAnimation();
  }
}

document.addEventListener("click", function (e) {
  let target = e.target;
  let targetClass = target.className;

  if (targetClass === "buy") {
    let id = target.dataset.id;
    let elm = document.querySelector(`#${id}`);

    let quantity = elm.querySelector(`quantity`);

    let currentQuan = quantity.textContent.match(/\d+/)[0];
    if (currentQuan > 0) {
      let nextQuan = currentQuan - 1;
      quantity.textContent = "Quantity : " + nextQuan;
      user_cart.push(elm);
      let price = elm.querySelector(`price`);

      price = price.textContent.match(/\d+/)[0];
      let costU = cost.textContent.match(/\d+/)[0];

      let total = +price + +costU;
      cost.textContent = "" + total;

      updateUserCart();
    } else {
      console.log(quantity.textContent, "no item");
      invokeInfoBox("red", "Item out of stock!");
    }
  }

  if (targetClass === "remove") {
    let id = target.dataset.id;
    let elm = document.querySelector(`#${id}`);

    for (let i = 0; i < user_cart.length; i++) {
      if (user_cart[i] === elm) {
        user_cart.splice(i, 1);
        break;
      }
    }

    let quantity = elm.querySelector(`quantity`);
    let price = elm.querySelector(`price`);
    price = price.textContent.match(/\d+/)[0];
    let costU = cost.textContent.match(/\d+/)[0];

    let total = +costU - +price;
    if (total <= 0) total = 0;
    cost.textContent = "" + total;

    let currentQuan = quantity.textContent.match(/\d+/)[0];
    let nextQuan = +currentQuan + 1;
    quantity.textContent = "Quantity : " + nextQuan;

    updateUserCart();
  }

  if (targetClass === "rate") {
    let id = target.dataset.id;
    let elm = document.querySelector(`#${id}`);

    let ratingU = elm.querySelector(`rating`);
    let ratingInt = ratingU.textContent.match(/\d+/)[0];

    console.log(ratingInt);

    rating(ratingU, ratingInt);
  }

  if (targetClass === "min") {
    switchState = !switchState;
    console.log(switchState);

    changeCartState(switchState);
  }

  if (targetClass === "confirm") {
    getProductInfoFE();
    user_cart = [];
    cost.textContent = "0";
    updateUserCart();
  }
});

mainContainer.addEventListener("click", function (e) {
  // console.log(e.target);
  let targetClass = e.target.className;
  // console.log(targetClass);

  if (targetClass === "register") {
    foldPage();
  }

  if (targetClass === "login") {
    handleQuery(loginInputs);
  }

  if (targetClass === "register_login") {
    foldPage();
  }

  if (targetClass === "register_register") {
    handleQuery(registerInputs);
  }
});

document.querySelector(`.logout`).addEventListener("click", () => {
  initLogin(0);
});

registerBtn.addEventListener("mouseover", () => {
  generalAnimation(
    [registerBtnImg],
    ["width:16px ;  transform: translateX(4px);"]
  );
});

registerBtn.addEventListener("mouseout", () => {
  generalAnimation(
    [registerBtnImg],
    ["width:0px ;  transform: translateX(200px);"]
  );
});

register_login_btn.addEventListener("mouseover", () => {
  generalAnimation(
    [loginBtnImg],
    ["width:16px ;  transform: translateX(-6px);"]
  );
});

register_login_btn.addEventListener("mouseout", () => {
  generalAnimation(
    [loginBtnImg],
    ["width:0px ;  transform: translateX(-200px);"]
  );
});

$("#select_birthdate").datepicker({
  showOn: "button",
  buttonImage: "calendar.svg",
  buttonImageOnly: true,
  buttonText: "",
  showAnim: "slideDown",
  changeYear: true,
  yearRange: "1991:2020",
  dateFormat: "dd-mm-yy",
});

function invokeInfoBox(color, message) {
  infoBox.style = `background-color:${color};opacity:1;`;
  infoBox.textContent = message;

  setTimeout(() => {
    infoBox.style = ``;
  }, 4000);
}

function handleQuery(reference) {
  let data = extractAndReturnValues(reference);

  if (Object.keys(data).length < 3) loginProcess(data);
  else registerProcess(data);
}
