document.addEventListener('DOMContentLoaded', () => {
    const products = [
        {
            id: 1,
            name: 'Смартфон Morf',
            price: 9999,
            image: 'images/product1.webp',
            link: 'smartphone.html',
            alt: 'Продукт 1'
        },
        {
            id: 2,
            name: 'Ноутбук Morf',
            price: 19999,
            image: 'images/product2.webp',
            link: 'laptop.html',
            alt: 'Продукт 2'
        },
        {
            id: 3,
            name: 'Планшет Morf',
            price: 5999,
            image: 'images/product3.jpg',
            link: 'tablet.html',
            alt: 'Продукт 3'
        }
    ];

    const container = document.getElementById('products-grid');
    container.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
            <a href="${product.link}">
                <img src="${product.image}" alt="${product.alt}" class="product-image"/>
                <h3>${product.name}</h3>
            </a>
            <p class="price">₴${product.price.toFixed(2)}</p>
            <button class="add-to-cart-button" data-name="${product.name}" data-price="${product.price}">
                Додати до кошика
            </button>
        `;

        container.appendChild(productCard);
    });

    initCatalogButtons(); // Після створення карток — підключаємо кнопки
});

function initCatalogButtons() {
    const buttons = document.querySelectorAll('.add-to-cart-button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.getAttribute('data-name');
            const productPrice = parseFloat(button.getAttribute('data-price'));

            addCartItem(productName, productPrice);

            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push({ name: productName, price: productPrice });
            localStorage.setItem('cart', JSON.stringify(cart));
        });
    });
}
