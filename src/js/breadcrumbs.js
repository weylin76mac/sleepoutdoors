document.addEventListener("DOMContentLoaded", () => {
    // Get the breadcrumbs container
    const breadcrumbElement = document.getElementById("breadcrumbs");
    if (!breadcrumbElement) return;

    // Function to update the breadcrumb
    function updateBreadcrumb(category, count) {
        breadcrumbElement.innerHTML = `<a href="/index.html">Home</a> -> <span>${category}</span> -> <span>(${count} items)</span>`;
    }

    // Function to count the number of visible products
    function countVisibleProducts() {
        const productListElement = document.getElementById("productList");
        if (productListElement) {
            const visibleProducts = productListElement.querySelectorAll('li:not([style*="display: none"])').length;
            return visibleProducts;
        }
        return 0;
    }

    // Function to set breadcrumbs based on the current path
    function setBreadcrumbs(path) {
        // Get the query parameter for category
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');

        if (path.includes("product-list")) {
            const categoryName = category ? category.charAt(0).toUpperCase() + category.slice(1) : "Category"; // Capitalize the category name

            // Wait for the products to load and then count the visible products
            setTimeout(() => {
                const itemCount = countVisibleProducts();
                updateBreadcrumb(categoryName, itemCount);
            }, 500); 
        } else {
            // Hide the breadcrumb for home page or any undefined path
            breadcrumbElement.style.display = "none";
        }
    }

    // Get the current path to determine the breadcrumb context
    const currentPath = window.location.pathname;

    // Call the setBreadcrumbs function
    setBreadcrumbs(currentPath);
});



