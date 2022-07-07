async function getData(data) {
  fetch(`http://localhost:3000/${data}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      recievedData = data;
      populateProducts(recievedData);
      console.log(recievedData);
    })
    .catch((err) => {
      throw err;
    });
}

async function insertData(data) {
  fetch(`http://localhost:3000/data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      recievedData = data;
      console.log(recievedData);
    })
    .catch((err) => {
      throw err;
    });
}

async function getSpecdata(data) {
  fetch(`http://localhost:3000/specData`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      recievedData = data;
      // console.log(recievedData);
      userPageElements.currentUserAllowedtables.push(recievedData);
    })
    .catch((err) => {
      throw err;
    });
}

async function updateSpecdata(data) {
  // console.log(data);

  fetch(`http://localhost:3000/data`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      recievedData = data;
      //   console.log(recievedData);
      if (!recievedData.sqlState) {
        // invokeInfoBox("green", "Updated!");
      } else {
        // invokeInfoBox("red", "Update error!");
      }
    })
    .catch((err) => {
      invokeInfoBox("red", "Update error!");
      throw err;
    });
}
