class Product {
    static nextId = 1;

    constructor(id, productName, productTitle, description, inStock, buyingPrice, salePrice, quantity, type, shippingRates, refillLimit, location) {
  
      this.id = Product.nextId++;
      this.productName = productName;
      this.productTitle = productTitle;
      this.description = description;
      this.inStock = inStock;
      this.buyingPrice = buyingPrice;
      this.salePrice = salePrice;
      this.quantity = quantity;
      this.type = type;
      this.shippingRates = shippingRates;
      this.refillLimit = refillLimit;
      this.location = location;
  
    }
  }


  
  document.addEventListener("DOMContentLoaded", function () {
    const productManager = new ProductManager();

    populateDataTable(productManager.products);

    // Handle form submission
    const productForm = document.getElementById('productForm');
    productForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(productForm);
        const product = new Product(
            formData.get('id'),
            formData.get('productName'),
            formData.get('productTitle'),
            formData.get('description'),
            formData.get('vendor'),
            formData.get('inStock'),
            formData.get('buyingPrice'),
            formData.get('salePrice'),
            formData.get('quantity'),
            formData.get('type'),
            formData.get('shippingRates'),
            formData.get('refillLimit'),
            formData.get('location')
        );
        productManager.addProduct(product);
        // Refresh table with updated products
        populateDataTable(productManager.products);
        productManager.removeModal();
        productManager.reset();
    });

    // Show and Remove Modal...
    document.getElementById("add-product").addEventListener("click", function () {
        productManager.reset();
        productManager.showModal();
    });

    document.querySelector(".cross-icon").addEventListener("click", function () {
        productManager.removeModal();
    });

    // Event listener for editing products

    document.getElementById("tableBody").addEventListener("click", function (event) {
        if (event.target.closest(".editProducts")) {
            const row = event.target.closest("tr");
            const productId = row.querySelector(".tableData").innerText;
            productManager.editProduct(productId);
        }
    });

    // Event Listener for deleting product

    document.getElementById('dataTable').addEventListener('click', function(event) {
        if (event.target.closest('.del-btn')) {
            const row = event.target.closest('tr');
            console.log(row)
            const productId = row.querySelector('.tableData:nth-child(2)').innerText;
            console.log(productId)
            productManager.deleteProduct(productId);
        }
    });
    


    function populateDataTable(products) {
        const tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = '';
        products.forEach(product => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td class="tableData"><input type="checkbox"/></td>
                <td class="tableData">${product.id}</td>
                <td class="tableData td-heading">${product.productName}</td>
                <td class="tableData">${product.productTitle}</td>
                <td class="tableData">${product.description}</td>
                <td class="tableData">${product.vendor}</td>
                <td class="tableData">${product.inStock}</td>
                <td class="tableData">${product.buyingPrice}</td>
                <td class="tableData">${product.salePrice}</td>
                <td class="tableData">${product.quantity}</td>
                <td class="tableData">${product.type}</td>
                <td class="tableData">${product.shippingRates}</td>
                <td class="tableData">${product.refillLimit}</td>
                <td class="tableData">${product.location}</td>
                <td class="action-cell">
                  <button class="action-btn del-btn">
                  <i class="material-icons">delete</i>
                  </button>
                  <button class="action-btn editProducts">
                  <i class="material-icons">edit</i>
                  </button>
                </td>
            `;
            tableBody.appendChild(newRow);

            document.getElementById('btn-text').innerText = 'Create';
            document.getElementById('modal-heading').innerText = 'Create Product';
        });
    }

    // Edit Product....

    document.getElementById("dataTable").addEventListener("click", function (event) {
        if (event.target.closest(".editProducts")) {
            const row = event.target.closest("tr");
            console.log(row)
            const productId = row.querySelector(".tableData:nth-child(2)").innerText; // Adjust index to match the column order in your table
            console.log(productId)
            const productName = row.querySelector(".tableData:nth-child(3)").innerText;
            const productTitle = row.querySelector(".tableData:nth-child(4)").innerText;
            const description = row.querySelector(".tableData:nth-child(5)").innerText;
            const vendor = row.querySelector(".tableData:nth-child(6)").innerText;
            const inStock = row.querySelector(".tableData:nth-child(7)").innerText;
            const buyingPrice = row.querySelector(".tableData:nth-child(8)").innerText;
            const salePrice = row.querySelector(".tableData:nth-child(9)").innerText;
            const quantity = row.querySelector(".tableData:nth-child(10)").innerText;
            const type = row.querySelector(".tableData:nth-child(11)").innerText;
            const shippingRates = row.querySelector(".tableData:nth-child(12)").innerText;
            const refillLimit = row.querySelector(".tableData:nth-child(13)").innerText;
            const location = row.querySelector(".tableData:nth-child(14)").innerText;
            console.log(location)
            
            // Populate form with row data
            document.getElementById('productName').value = productName;
            document.getElementById('productTitle').value = productTitle;
            document.getElementById('description').value = description;
            document.getElementById('vendor').value = vendor;
            document.getElementById('inStock').value = inStock;
            document.getElementById('buyingPrice').value = buyingPrice;
            document.getElementById('salePrice').value = salePrice;
            document.getElementById('quantity').value = quantity;
            document.getElementById('type').value = type;
            document.getElementById('shippingRates').value = shippingRates;
            document.getElementById('refillLimit').value = refillLimit;
            document.getElementById('location').value = location;

            // change inner text of button and heading for product editing

            document.getElementById('btn-text').innerText = 'Update';
            document.getElementById('modal-heading').innerText = 'Edit Product';
            
            // Show modal
            productManager.showModal();
        }
    });

    // handle btn text and heading of modal form for create product..

    document.getElementById("add-product").addEventListener("click", function () {
        // Reset modal button text to "Create" and modal heading to "Create Product"
        document.getElementById('btn-text').innerText = 'Create';
        document.getElementById('modal-heading').innerText = 'Create Product';
    
        // Reset form fields
        productManager.reset();
    
        // Show modal
        productManager.showModal();
    });
    
});













