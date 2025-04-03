document.addEventListener("DOMContentLoaded", function () {
    const products = [
        { id: "product-1", title: "Смартфон Morf", image: "images/product1.webp", price: "₴ 9,999", link: "smartphone.html" },
        { id: "product-2", title: "Ноутбук Morf", image: "images/product2.webp", price: "₴ 19,999", link: "laptop.html" },
        { id: "product-3", title: "Планшет Morf", image: "images/product3.jpg", price: "₴ 5,999", link: "tablet.html" }
    ];

    // Показ вікна підписки
    if (!localStorage.getItem("subscribed")) {
        setTimeout(showSubscribeBox, 3000);
    }

    function showSubscribeBox() {
        let subscribeBox = document.createElement("div");
        subscribeBox.id = "subscribeBox";
        subscribeBox.innerHTML = `
            <p>Підпишіться на повідомлення з нашого сайту!</p>
            <button id="acceptSubscribe">Так</button>
            <button id="declineSubscribe">Ні</button>
        `;
        document.body.appendChild(subscribeBox);
    
        let style = document.createElement("style");
        style.innerHTML = `
            #subscribeBox {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: white;
                padding: 15px;
                border-radius: 10px;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
                text-align: center;
                z-index: 1000;
                font-family: Arial, sans-serif;
            }
            #subscribeBox p {
                font-size: 16px;
                font-weight: bold;
                margin-bottom: 10px;
            }
            #acceptSubscribe {
                background:rgb(0, 183, 122);
                color: white;
                border: none;
                padding: 10px 15px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 14px;
                font-weight: bold;
                transition: 0.3s;
            }
            #acceptSubscribe:hover {
                opacity: 0.8;
            }
            #declineSubscribe {
                background: red;
                color: white;
                border: none;
                padding: 10px 15px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 14px;
                font-weight: bold;
                margin-left: 10px;
                transition: 0.3s;
            }
            #declineSubscribe:hover {
                background: darkred;
            }
        `;
        document.head.appendChild(style);
    
        document.getElementById("acceptSubscribe").addEventListener("click", function () {
            localStorage.setItem("subscribed", "true");
            hideSubscribeBox();
            alert("Дякуємо за підписку!");
        });
    
        document.getElementById("declineSubscribe").addEventListener("click", hideSubscribeBox);
    }
    
    function hideSubscribeBox() {
        let box = document.getElementById("subscribeBox");
        if (box) box.remove();
    }

    // Показ реклами після прокрутки або через 10 секунд
    let adTriggered = false;
    window.addEventListener("scroll", function () {
        if (!adTriggered && window.scrollY > 300) {
            showAdModal();
            adTriggered = true;
        }
    });

    setTimeout(() => {
        if (!adTriggered) {
            showAdModal();
        }
    }, 10000);

    function showAdModal() {
        let randomProduct = products[Math.floor(Math.random() * products.length)];

        let adModal = document.createElement("div");
        adModal.id = "adModal";
        adModal.innerHTML = `
            <p>🎉 Спеціальна пропозиція! Купуйте зараз зі знижкою!</p>
            <a href="${randomProduct.link}" class="product-link">
                <img src="${randomProduct.image}" alt="${randomProduct.title}">
                <h3>${randomProduct.title}</h3>
                <p class="price">${randomProduct.price}</p>
            </a>
            <button id="closeAdBtn" disabled>Закрити (<span id="timer">5</span> сек)</button>
        `;
        document.body.appendChild(adModal);

        let style = document.createElement("style");
        style.innerHTML = `
            #adModal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 320px; /* Зменшуємо ширину */
    background: white;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
    text-align: center;
    z-index: 1001;
    font-family: Arial, sans-serif;
}

#adModal img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
}

#adModal h3 {
    font-size: 18px;
    margin: 10px 0 5px;
}

#adModal p.price {
    font-size: 16px;
    font-weight: bold;
    color: #007bff;
}

            #closeAdBtn {
                background: red;
                color: white;
                border: none;
                padding: 10px 15px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 14px;
                font-weight: bold;
            }
            #closeAdBtn:disabled {
                background: lightgray;
                cursor: not-allowed;
            }
        `;
        document.head.appendChild(style);

        let timer = 5;
        let timerInterval = setInterval(() => {
            timer--;
            document.getElementById("timer").innerText = timer;
            if (timer <= 0) {
                clearInterval(timerInterval);
                document.getElementById("closeAdBtn").disabled = false;
            }
        }, 1000);

        document.getElementById("closeAdBtn").addEventListener("click", function () {
            document.getElementById("adModal").remove();
        });
    }
});
