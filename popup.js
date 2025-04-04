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
            showSuccessMessage();
        });
    
        document.getElementById("declineSubscribe").addEventListener("click", hideSubscribeBox);
    }
    
    function hideSubscribeBox() {
        let box = document.getElementById("subscribeBox");
        if (box) box.remove();
    }

    function showSuccessMessage() {
        let subscribeBox = document.getElementById("subscribeBox");
        if (subscribeBox) {
            subscribeBox.innerHTML = `
                <p>Дякуємо за підписку!</p>
            `;
            setTimeout(hideSubscribeBox, 2000); // Приховати повідомлення через 2 секунди
        }
    }

    // Функція для показу реклами
    function showAdModal() {
        let randomProduct = products[Math.floor(Math.random() * products.length)];

        let adModal = document.createElement("div");
        adModal.id = "adModal";
        adModal.innerHTML = `
            <div id="overlay"></div>
            <div id="adContent">
                <p>🎉 Спеціальна пропозиція! Купуйте зараз зі знижкою!</p>
                <a href="${randomProduct.link}" class="product-link">
                    <img src="${randomProduct.image}" alt="${randomProduct.title}">
                    <h3>${randomProduct.title}</h3>
                    <p class="price">${randomProduct.price}</p>
                </a>
                <button id="closeAdBtn" disabled>Закрити (<span id="timer">5</span> сек)</button>
            </div>
        `;
        document.body.appendChild(adModal);

        let style = document.createElement("style");
        style.innerHTML = `
            #adModal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 1001;
                display: flex;
                justify-content: center;
                align-items: center;
                background: rgba(0, 0, 0, 0.7); /* затемнення */
            }

            #overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5); /* затемнення */
                z-index: -1;
            }

            #adContent {
                background: white;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
                width: 80%; /* збільшили ширину */
                max-width: 800px; /* максимальна ширина */
                text-align: center;
                font-family: Arial, sans-serif;
            }

            #adContent img {
                max-width: 100%;
                height: auto;
                border-radius: 8px;
            }

            #adContent h3 {
                font-size: 22px;
                margin: 10px 0 5px;
            }

            #adContent p.price {
                font-size: 18px;
                font-weight: bold;
                color: #007bff;
            }

            #closeAdBtn {
                background: red;
                color: white;
                border: none;
                padding: 15px 25px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 16px;
                font-weight: bold;
                margin-top: 20px;
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

        // Заборонити прокручування під час показу реклами
        document.body.style.overflow = "hidden";
        document.getElementById("overlay").addEventListener("click", closeAdModal);
    }

    function closeAdModal() {
        document.getElementById("adModal").remove();
        document.body.style.overflow = "auto"; // Повертаємо можливість прокручування
    }

    // Функція для перевірки, чи можна показати рекламу
    function checkAdDisplay() {
        const lastAdTime = localStorage.getItem("lastAdTime");
        const currentTime = Date.now();

        if (!lastAdTime || currentTime - lastAdTime >= 600000) { // 600000 мс = 10 хв
            showAdModal();
            localStorage.setItem("lastAdTime", currentTime); // Зберігаємо час показу
        }
    }

    // Перевіряємо через 10 секунд або при прокрутці
    setTimeout(checkAdDisplay, 10000);

    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            checkAdDisplay();
        }
    });
});
