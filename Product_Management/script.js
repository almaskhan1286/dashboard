class Product {
  constructor(id, productName, productTitle, description, inStock, buyingPrice, salePrice, quantity, shippingRates, refillLimit, location) {

    this.id = id;
    this.productName = productName;
    this.productTitle = productTitle;
    this.description = description;
    this.inStock = inStock;
    this.buyingPrice = buyingPrice;
    this.salePrice = salePrice;
    this.quantity = quantity;
    this.shippingRates = shippingRates;
    this.refillLimit = refillLimit;
    this.location = location;

  }
}





let storedData = [];
document.addEventListener("DOMContentLoaded", function () {
  console.log("This is js");

// Get Stored data For Searching purpose
  storedData = JSON.parse(localStorage.getItem("productData")) || [];
  console.log(storedData);

  renderRows(storedData);

  const searchInput = document.getElementById("searchInput");
  const tableBody = document
    .getElementById("dataTable")
    .getElementsByTagName("tbody")[0];

  const tableRows = tableBody.getElementsByTagName("tr");

  searchInput.addEventListener("keyup", function searchProduct() {
    const searchTerm = this.value.toLowerCase();
    for (let i = 0; i < tableRows.length; i++) {
      let row = tableRows[i];
      let found = false;
      for (let j = 0; j < row.children.length; j++) {
        let cell = row.children[j];
        let text = cell.textContent.toLowerCase();
        if (text.indexOf(searchTerm) !== -1) {
          found = true;
          break;
        }
      }
      if (found) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    }
  });

  // Remove the Modal
  let modal = document.querySelector(".modal-container");
  let crossIcon = document.querySelector(".cross-icon i.fa-xmark");
  crossIcon.addEventListener("click", function () {
    modal.style.display = "none";
  });

  // Edit Products
  let editButton = document.querySelectorAll(".editProducts");
  editButton.forEach((button) => {
    button.addEventListener("click", function () {
      modal.style.display = "flex";
      let parent = button.parentElement.parentElement;
      console.log(parent);
      console.log(parent.children[2]);
      let getRowData = {
        ID: parent.children[1],
        ProductName: parent.children[2],
        Title: parent.children[3],
        Description: parent.children[4],
        Vendor: parent.children[5],
        InStock: parent.children[6],
        BuyingPrice: parent.children[7],
        SalePrice: parent.children[8],
        PurchaseQty: parent.children[9],
        Type: parent.children[10],
        ShippingRates: parent.children[11],
        RefillLimit: parent.children[12],
        Location: parent.children[13],
      };
      // console.log(getRowData.Location)

      let proName = document.getElementById("productName");
      let ptitle = document.getElementById("productTitle");
      let pdesc = document.getElementById("description");
      let pvendor = document.getElementById("vendor");
      let inStock = document.getElementById("inStock");
      let buyingPrice = document.getElementById("buyingPrice");
      let salePrice = document.getElementById("salePrice");
      let quantity = document.getElementById("quantity");
      let type = document.getElementById("type");
      let shippingRates = document.getElementById("shippingRates");
      let refillLimit = document.getElementById("refillLimit");
      let location = document.getElementById("location");

      proName.value = getRowData.ProductName.textContent;
      ptitle.value = getRowData.Title.textContent;
      pdesc.value = getRowData.Description.textContent;
      pvendor.value = getRowData.Vendor.textContent;
      inStock.value = getRowData.InStock.textContent;
      buyingPrice.value = getRowData.BuyingPrice.textContent;
      salePrice.value = getRowData.SalePrice.textContent;
      quantity.value = getRowData.PurchaseQty.textContent;
      type.value = getRowData.Type.textContent;
      shippingRates.value = getRowData.ShippingRates.textContent;
      refillLimit.value = getRowData.RefillLimit.textContent;
      location.value = getRowData.Location.textContent;
      productName.value = getRowData.ProductName.textContent;
      salePrice.value = getRowData.SalePrice.textContent;
    });
  });

  // ADD New Column In Data Table...
  function addCol() {
    let tableHeader = document.querySelector("thead tr");
    let newCol = document.createElement("th");
    newCol.textContent = "New Column";

    let actionsIndex = Array.from(tableHeader.children).findIndex(
      (th) => th.textContent === "Actions"
    );

    // ADD new column header before the "Actions" column
    tableHeader.insertBefore(newCol, tableHeader.children[actionsIndex]);

    let tBody = document.querySelector("tbody");
    let tRows = document.querySelectorAll("tbody tr");

    tRows.forEach(function (row) {
      // Add a new cell for the new column
      let newCell = document.createElement("td");
      newCell.textContent = "New Text";

      // Add new cell before the "Actions" cell in the row
      row.insertBefore(newCell, row.children[actionsIndex]);
    });
  }

// Add Product....

  let addEntryHeading = document.getElementById("add-product");
  console.log(addEntryHeading);

  addEntryHeading.addEventListener("click", function () {
    const modal = document.querySelector(".modal-container");
    console.log(modal);
    modal.style.display = "flex";
    document.getElementById("productForm").reset();
    // clearModalContent();
  });

  const productForm = document.getElementById("productForm");
  productForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Find the last row in the table
    const lastRow = document.querySelector("#dataTable tbody tr:last-child");
    let lastID = 0;

    if (lastRow) {
      lastID = parseInt(
        lastRow.querySelector(".tableData:nth-child(2)").textContent
      );
    }
    const newID = lastID + 1;

    let productName = document.getElementById("productName").value;
    let productTitle = document.getElementById("productTitle").value;
    let description = document.getElementById("description").value;
    let vendor = document.getElementById("vendor").value;
    let inStock = document.getElementById("inStock").value;
    let buyingPrice = document.getElementById("buyingPrice").value;
    let salePrice = document.getElementById("salePrice").value;
    let quantity = document.getElementById("quantity").value;
    let type = document.getElementById("type").value;
    let shippingRates = document.getElementById("shippingRates").value;
    let refillLimit = document.getElementById("refillLimit").value;
    let location = document.getElementById("location").value;

    let newRowHTML = `
    <tr class="tableRows">
    <td class="tableData"><input type="checkbox" /></td>
    <td class="tableData">${newID}</td>
    <td class="tableData">${productName}</td>
    <td class="tableData">${productTitle}</td>
    <td class="tableData">${description}</td>
    <td class="tableData">${vendor}</td>
    <td class="tableData">${inStock}</td>
    <td class="tableData">${buyingPrice}</td>
    <td class="tableData">${salePrice}</td>
    <td class="tableData">${quantity}</td>
    <td class="tableData">${type}</td>
    <td class="tableData">${shippingRates}</td>
    <td class="tableData">${refillLimit}</td>
    <td class="tableData">${location}</td>
    
          <td class="action-cell">
              <button class="action-btn">
                  <i class="fa-solid fa-trash-can"></i>
              </button>
              <button class="action-btn editProducts">
                  <i class="fa-solid fa-pen-to-square"></i>
              </button>
          </td>
      </tr>
          `;

    document
      .querySelector("#dataTable tbody")
      .insertAdjacentHTML("beforeend", newRowHTML);

    // Save data to localStorage
    const newProduct = {
      ID: newID,
      ProductName: productName,
      Title: productTitle,
      Description: description,
      Vendor: vendor,
      InStock: inStock,
      BuyingPrice: buyingPrice,
      SalePrice: salePrice,
      PurchaseQty: quantity,
      Type: type,
      ShippingRates: shippingRates,
      RefillLimit: refillLimit,
      Location: location,
    };
    storedData.push(newProduct);
    localStorage.setItem("productData", JSON.stringify(storedData));

    document.querySelector(".modal-container").style.display = "none";
  });

  // Delete Row from table....
  document.querySelectorAll(".del-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const row = btn.closest("tr");
      const rowID = parseInt(
        row.querySelector(".tableData:nth-child(2)").textContent
      );

      if (!isNaN(rowID)) {
        row.remove();
        storedData = storedData.filter((item) => item.ID !== rowID);
        localStorage.setItem("productData", JSON.stringify(storedData));
      } else {
        // localStorage.clear();
        alert("Invalid Product Id for Deletion");
      }
    });
  });

  function renderRows(data) {
    const tableBody = document
      .getElementById("dataTable")
      .getElementsByTagName("tbody")[0];
    tableBody.innerHTML = "";
    data.forEach((item) => {
      let newRowHTML = `
        <tr class="tableRows">
        <td class="tableData"><input type="checkbox" /></td>
        <td class="tableData">${item.ID}</td>
        <td class="tableData">${item.ProductName}</td>
        <td class="tableData">${item.Title}</td>
        <td class="tableData">${item.Description}</td>
        <td class="tableData">${item.Vendor}</td>
        <td class="tableData">${item.InStock}</td>
        <td class="tableData">${item.BuyingPrice}</td>
        <td class="tableData">${item.SalePrice}</td>
        <td class="tableData">${item.PurchaseQty}</td>
        <td class="tableData">${item.Type}</td>
        <td class="tableData">${item.ShippingRates}</td>
        <td class="tableData">${item.RefillLimit}</td>
        <td class="tableData">${item.Location}</td>
        
              <td class="action-cell">
                  <button class="action-btn del-btn">
                      <i class="fa-solid fa-trash-can"></i>
                  </button>
                  <button class="action-btn editProducts">
                      <i class="fa-solid fa-pen-to-square"></i>
                  </button>
              </td>
          </tr>
              `;
      tableBody.insertAdjacentHTML("beforeend", newRowHTML);
    });
  }
  // User Management.....
  // const currentPage = window.location.pathname;
  
  // if (!localStorage.getItem('user')) {
  //   if (currentPage !== "/signIn.html") {
  //     window.location.href = "signIn.html";
  //   }
  // } else {
  //   if (currentPage !== "/Product_Management/product_management.html") {
  //     window.location.href = "/Product_Management/product_management.html";
  //   }
  // }
});


    // Populate the modal form fields with product data

    populateModal(product) {
      document.getElementById("productName").value = product.productName;
      document.getElementById("productTitle").value = product.productTitle;
      document.getElementById("description").value = product.description;
      document.getElementById("vendor").value = product.vendor;
      document.getElementById("inStock").value = product.inStock;
      document.getElementById("buyingPrice").value = product.buyingPrice;
      document.getElementById("salePrice").value = product.salePrice;
      document.getElementById("quantity").value = product.quantity;
      document.getElementById("type").value = product.type;
      document.getElementById("shippingRates").value = product.shippingRates;
      document.getElementById("refillLimit").value = product.refillLimit;
      document.getElementById("location").value = product.location;
  }

  // Retrieve data from the modal form fields and return as an object

  getFormData() {
      return {
          productName: document.getElementById("productName").value,
          productTitle: document.getElementById("productTitle").value,
          description: document.getElementById("description").value,
          vendor: document.getElementById("vendor").value,
          inStock: document.getElementById("inStock").value,
          buyingPrice: document.getElementById("buyingPrice").value,
          salePrice: document.getElementById("salePrice").value,
          quantity: document.getElementById("quantity").value,
          type: document.getElementById("type").value,
          shippingRates: document.getElementById("shippingRates").value,
          refillLimit: document.getElementById("refillLimit").value,
          location: document.getElementById("location").value
      };
  }