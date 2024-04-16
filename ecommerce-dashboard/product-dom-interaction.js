// Class definition for a Product & here also use objects for parameters in order to ensure the encapsulation(group related information) of parameters data and avoid overwhelming usage of parameters...
class Product {
    constructor({
        id,
        details = {},
        inventory = {},
        pricing = {},
        type,
        shippingRates,
        refillLimit,
        location
    }) {
        this.id = id;
        this.details = details;
        this.inventory = inventory;
        this.pricing = pricing;
        this.type = type;
        this.shippingRates = shippingRates;
        this.refillLimit = refillLimit;
        this.location = location;
    }
}

// Function to handle form submission and add products...
function handleFormSubmission(productManager) {
    const productForm = document.getElementById('productForm');
    productForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(productForm);
        let productId = formData.get('id');
        // add product id dynamically if not present
        if (!productId) {
            productId = productManager.products.length + 1;
        }
        // Construct new product object using form data
        const product = new Product({
            id: productId,
            details: {
                productName: formData.get('productName'),
                productTitle: formData.get('productTitle'),
                description: formData.get('description'),
                vendor: formData.get('vendor')
            },
            inventory: {
                inStock: formData.get('inStock'),
                quantity: formData.get('quantity')
            },
            pricing: {
                buyingPrice: formData.get('buyingPrice'),
                salePrice: formData.get('salePrice')
            },
            type: formData.get('type'),
            shippingRates: formData.get('shippingRates'),
            refillLimit: formData.get('refillLimit'),
            location: formData.get('location')
        });
        productManager.addProduct(product);
        populateDataTable(productManager.products);
        productManager.removeModal();
        productManager.reset();
    });
}

// Function to handle showing and removing the modal...
function handleModal(productManager) {
    document.getElementById("add-product").addEventListener("click", function () {
        productManager.reset();
        productManager.showModal();
    });
    document.querySelector(".cross-icon").addEventListener("click", function () {
        productManager.removeModal();
    });
}

// Function to handle editing products...
function handleEditProduct(productManager) {
    console.log(productManager);
    document.getElementById("tableBody").addEventListener("click", function (event) {
        if (event.target.closest(".editProducts")) {
            const row = event.target.closest("tr");
            const productId = row.querySelector(".tableData").innerText;
            console.log("PRODUCT ID IN DOM: ",productId)
            productManager.editProduct(productId);
        }
    });
}

// Function to handle deleting products....
function handleDeleteProduct(productManager) {
    document.getElementById('dataTable').addEventListener('click', function (event) {
        if (event.target.closest('.del-btn')) {
            const row = event.target.closest('tr');
            const productId = row.querySelector('.tableData:nth-child(2)').innerText;
            productManager.deleteProduct(productId);
        }
    });
}

// Function to handle searching products in the table...
function handleSearchProduct() {
    const searchInput = document.getElementById('searchInput');
    const tableBody = document.getElementsByTagName('tbody')[0];
    const tableRows = tableBody.getElementsByTagName('tr');
    searchInput.addEventListener('keyup', function searchProduct() {
        const searchTerm = this.value.toLowerCase();
        const length = tableRows.length;
        for (let i = 0; i < length; i++) {
            let row = tableRows[i];
            let found = false;
            let childLength = row.children.length;
            for (let j = 0; j < childLength; j++) {
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
}

// Function to populate the data table with product data...
function populateDataTable(products) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';
    products.forEach(product => {
        const newRow = document.createElement('tr');
        newRow.setAttribute('data-id', product.id);
        newRow.innerHTML = `
            <td class="tableData"><input type="checkbox"/></td>
            <td class="tableData">${product.id}</td>
            <td class="tableData td-heading">${product.details.productName}</td>
            <td class="tableData">${product.details.productTitle}</td>
            <td class="tableData">${product.details.description}</td>
            <td class="tableData">${product.details.vendor}</td>
            <td class="tableData">${product.inventory.inStock}</td>
            <td class="tableData">${product.pricing.buyingPrice}</td> 
            <td class="tableData">${product.pricing.salePrice}</td> 
            <td class="tableData">${product.inventory.quantity}</td>
            <td class="tableData">${product.type}</td>
            <td class="tableData">${product.shippingRates}</td>
            <td class="tableData">${product.refillLimit}</td>
            <td class="tableData">${product.location}</td>
            <td class="action-cell">
                <button class="action-btn del-btn">
                    <i class="material-icons">delete</i>
                </button>
                <button class="action-btn editProducts ">
                    <i class="material-icons">edit</i>
                </button>
            </td>
        `;
        tableBody.appendChild(newRow);
        document.getElementById('btn-text').innerText = 'Create';
        document.getElementById('modal-heading').innerText = 'Create Product';
    });
}

// function populateDataTable(products) {
//     const tableBody = document.getElementById('tableBody');
//     tableBody.innerHTML = '';
//     products.foreach(product => {
//         const newRow = document.createElement('tr');
//         newRow.setAttribute('data-id', product.id);
//         newRow.innerHTML = `
//             <td class="tableData"><input type="checkbox"/></td>
//             <td class="tableData">${product.id}</td>
//             <td class="tableData td-heading">${product.details.productName}</td>
//             <td class="tableData">${product.details.productTitle}</td>
//             <td class="tableData">${product.details.description}</td>
//             <td class="tableData">${product.details.vendor}</td>
//             <td class="tableData">${product.inventory.inStock}</td>
//             <td class="tableData">${product.pricing.buyingPrice}</td> 
//             <td class="tableData">${product.pricing.salePrice}</td> 
//             <td class="tableData">${product.inventory.quantity}</td>
//             <td class="tableData">${product.type}</td>
//             <td class="tableData">${product.shippingRates}</td>
//             <td class="tableData">${product.refillLimit}</td>
//             <td class="tableData">${product.location}</td>
//             <td class="action-cell">
//                 <button class="action-btn del-btn">
//                     <i class="material-icons">delete</i>
//                 </button>
//                 <button class="action-btn editProducts ">
//                     <i class="material-icons">edit</i>
//                 </button>
//             </td>
//         `;
//         tableBody.appendChild(newRow);
//         document.getElementById('btn-text').innerText = 'Create';
//         document.getElementById('modal-heading').innerText = 'Create Product';
//     });
// }

document.addEventListener("DOMContentLoaded", function () {
    const productManager = new ProductManager();
    populateDataTable(productManager.products);
    handleFormSubmission(productManager);
    handleModal(productManager);
    handleEditProduct(productManager);
    handleDeleteProduct(productManager);
    handleSearchProduct();
});
