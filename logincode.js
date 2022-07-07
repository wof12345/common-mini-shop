function loginProcess(data) {
  getData("data");

  setTimeout(() => {
    let pass = validateInputs(data);
    if (pass !== "pass") {
      invokeInfoBox("red", pass);
      return pass;
    }

    pass = checkData(data, recievedData);

    if (pass) {
      getProducts();
      initLogin(1);
    } else invokeInfoBox("red", "Username or Password is wrong!");
  }, 500);
}

function checkData(data, recieved) {
  for (let i = 0; i < recieved.length; i++) {
    if (data.username === recieved[i].user) {
      if (data.password === recieved[i].userpass) {
        return true;
      }
    }
  }

  return false;
}

function checkDataReg(data, recieved) {
  for (let i = 0; i < recieved.length; i++) {
    if (data.username === recieved[i].user) {
      return false;
    }
  }

  return true;
}

function initLogin(command) {
  if (command) {
    pP.style = "transform:none;";
    mainContainer.style = "opacity:0;pointer-events:none;";
    cartBtn.style = "display:block";
    user_cart = [];
  } else {
    pP.style = "";
    mainContainer.style = "";
    user_cart = [];
    cartBtn.style = "";
    changeCartState(0);
  }
}

function registerProcess(data) {
  getData("data");

  setTimeout(() => {
    let pass = validateInputs(data);

    if (pass !== "pass") {
      invokeInfoBox("red", pass);
      return pass;
    }

    pass = checkDataReg(data, recievedData);
    console.log(pass);

    if (pass) {
      console.log(data);
      invokeInfoBox("green", "Registered!");
      insertData(data);
    } else {
      invokeInfoBox(
        "red",
        "User exists! Try a different name!(Use special characters if needed)"
      );
    }
  }, 500);
}
