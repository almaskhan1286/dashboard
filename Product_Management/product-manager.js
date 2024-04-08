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
    
    
    deleteProduct(id) {
        // Remove product from the table
        const tableBody = document.getElementById('tableBody');
        const rowToRemove = document.querySelector(`tr[data-id="${id}"]`);
        if (rowToRemove) {
            tableBody.removeChild(rowToRemove);
            // Add alert for successful deletion
            alert("Product successfully deleted.");
        } else {
            alert("Incorrect Product Id")
        }
    
        // Remove product from local storage
        this.products = this.products.filter(product => product.id != id);
        this.saveProducts();
    }
    
    
      
    editProduct(productId) {
        const product = this.products.find(product => product.id === productId);
        if (product) {
            this.populateModal(product);
            this.showModal();
        } else {
            console.log('Product not found.');
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
        this.products =  storedData.map(data => new Product(...Object.values(data)));
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
            console.log("Modal container not found.")
        }
    }

    removeModal() {
        const modal = document.querySelector(".modal-container");
        if (modal) {
            modal.style.display = "none";
        } else {
            console.log("Modal not found.")
        }
    }

    reset() {
        this.form.reset();
    }

    addNewColumn() {
        
    }


}