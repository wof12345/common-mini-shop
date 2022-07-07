function getProducts() {
  getData("productData");
}

function populateProducts(recieved) {
  let generatedHtml = "";
  console.log("da", recieved);

  for (let i = 0; i < recieved.length; i++) {
    generatedHtml += `<product id="${recieved[i].Name}">
    <img src="./productimages/${recieved[i].Name}.jpg" alt="" />
    <name>Name : ${recieved[i].Name}</name>
    <description>Description : ${recieved[i].Desc}</description>

    <div class="user_view common">
      <quantity>Quantity : ${recieved[i].Quantity}</quantity>
      <price> Price : ${recieved[i].Price}</price>
      <category> Category : ${recieved[i].Category}</category>
    </div>

    <rating> Rating : ${recieved[i].Rating}</rating>

    <div class="user_interaction common">
      <button class="buy" data-id=${recieved[i].Name}>Buy</button>
      <button class="rate" data-id=${recieved[i].Name}>Rate</button>
      <button class="remove" data-id=${recieved[i].Name}>Remove</button>
    </div>
  </product>`;
  }

  console.log("gen", generatedHtml);

  productCont.innerHTML = generatedHtml;
}

function updateUserCart() {
  let generatedHtml = "";
  changeCartState(1);

  for (let i = 0; i < user_cart.length; i++) {
    generatedHtml += user_cart[i].outerHTML;
  }

  cart.innerHTML = generatedHtml;
  console.log(user_cart);

  if (user_cart.length <= 0) {
    changeCartState(0);
  }
}

function changeCartState(command) {
  if (command) {
    user_info.style = "right:10px;";
    switchState = true;
  } else {
    user_info.style = "";
    switchState = false;
  }
}

function getProductInfoFE() {
  let products = document.querySelectorAll(`product`);
  let sql;
  products.forEach((elm) => {
    let name = elm.querySelector("name").textContent.split(" ")[2];
    let quan = elm.querySelector("quantity");
    let rate = elm.querySelector("rating");
    rate = rate.textContent.match(/\d+/)[0];
    quan = quan.textContent.match(/\d+/)[0];
    sql = `Quantity = '${quan}', Rating = '${rate}'`;
    console.log(sql, name);

    updateSpecdata([sql, name]);
    getData("productData");
  });
}

function rating(ratingU, ratingInt) {
  let rateCircle = document.querySelectorAll(`.rate_box`);
  rateBox.style = "display:flex";

  rateCircle.forEach((elm, ind) => {
    elm.addEventListener("mouseover", (e) => {
      for (let j = 0; j <= ind; j++)
        rateCircle[j].style = "background-color: gold;";
    });

    elm.addEventListener("mouseout", (e) => {
      elm.style = "";
    });

    elm.addEventListener("click", (e) => {
      for (let j = 0; j <= rateCircle.length - 1; j++) rateCircle[j].style = "";

      last_rating = ind + 1;
      ratingInt = last_rating; //not implemented
      ratingU.textContent = "Rating : " + ratingInt;
      rateBox.style = "";
    });
  });
}
