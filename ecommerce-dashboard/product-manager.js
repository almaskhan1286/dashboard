class ProductManager {
    constructor() {
        this.products = [];
        this.modal = document.querySelector(".modal-container");
        this.form = document.getElementById("productForm");
        this.loadProducts();
        
    }

    addProduct(product) {
        if (product) {
            this.products.push(product);
            this.saveProducts();
            alert("Product Successfully added.")
        } else {
            console.log("Product Not added")
        } 
    }
    
    // Remove product from the table
    
    deleteProduct(id) {
        const tableBody = document.getElementById('tableBody');
        const allRows = tableBody.querySelectorAll('tr');
        
        allRows.forEach(row => {
       
        })
        const rowToRemove = document.querySelector(`tr[data-id="${id}"]`);
        
        if (rowToRemove) {
            tableBody.removeChild(rowToRemove);
            alert("Product successfully deleted.");
            
        } else {
            
            localStorage.clear();
            alert("Incorrect Product Id")
        }
    
        // Remove product from local storage
        this.products = this.products.filter(product => product.id != id);
        this.saveProducts();
    }

    // deleteProduct(id) {
    //     this.products.splice(0,id);
    //     localStorage.setItem('productData',JSON.stringify(this.products));
    //     this.products = this.products.filter(product => product.id != id);
    //     this.saveProducts();
    // }
    
    
      
    editProduct(productId) {
        console.log("PRODUCT: ",productId)
        const product = this.products.find(product => product.id === productId);
        if (product) {
            this.populateModal(product);
            this.showModal();
            // Change the text of the submit button to 'Update'
            document.getElementById('btn-text').innerText = 'Update';
            // Change the modal heading to 'Edit Product'
            document.getElementById('modal-heading').innerText = 'Edit Product';
            // Add a data attribute to the form to store the id of the product being edited
            this.form.setAttribute('data-product-id', productId);
        } else {
            alert('Product not found.');
        }
    }

    updateProduct() {
        const updatedProduct = this.getFormData();
        const index = this.products.findIndex(product => product.id === updatedProduct.id);
        if (index !== -1) {
            this.products[index] = updatedProduct;
            console.log('Product updated successfully.');
            this.saveProducts();
            this.removeModal();
        } else {
            console.log('Product not found.');
        }
    }
    
    searchProducts() {

    }
    
    loadProducts() {
        const storedData = JSON.parse(localStorage.getItem("productData")) || [];
        
        if (storedData !== null && Array.isArray(storedData)) {
            this.products = storedData.map(data => new Product(data));
        } else {
            alert("No product data found in localStorage.");
        }
    }

    saveProducts() {
        localStorage.setItem("productData", JSON.stringify(this.products));
    }

    handleFormSubmission() {
        function defaultSubmission(event) {
            event.preventDefault();
        }
    }

    showModal() {
        const modal = document.querySelector(".modal-container");
        if (modal) {
            modal.style.display = "flex";  
        } else {
            alert("Modal container not found.")
        }
    }

    removeModal() {
        const modal = document.querySelector(".modal-container");
        if (modal) {
            modal.style.display = "none";
        } else {
            alert("Modal not found.")
        }
    }

    reset() {
        this.form.reset();
    }

    addNewColumn() {
        
    }


}