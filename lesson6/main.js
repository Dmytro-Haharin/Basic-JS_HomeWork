/*
1. Доработать модуль корзины.
    a. Добавлять в объект корзины выбранные товары по клику на кнопке «Купить» без перезагрузки страницы
    b. Привязать к событию покупки товара пересчет корзины и обновление ее внешнего вида
2 *У товара может быть несколько изображений. Нужно:
    a. Реализовать функционал показа полноразмерных картинок товара в модальном окне
    b. Реализовать функционал перехода между картинками внутри модального окна ("листалка")
*/

const cart = {
    products : [],
    pushCartProduct(product){
        if(!this.products.includes(product)){
            this.products.push(product);
        }else if(this.products.includes(product)){
            product.count++
        }
    },
    getPriceBasket(){
        let allPrice = null;
        this.products.forEach(elem=>{
            allPrice += elem.price * elem.count;
        })
        cart.renderCart(allPrice );
    },
    renderCart(allPrice ){
        const cartBody = document.querySelector(".cart")
        if(cart.products == 0){
            cartBody.textContent = "корзина пуста"
        }else{
            cartBody.textContent = "";
            this.products.forEach(product=>{
                cartBody.insertAdjacentHTML("afterbegin",`
                    <div class="product-cart">
                        <h2 class="catalog__product-heading_cart">${product.name}</h2>
                        <img src="${product.minImg}" alt="catalog product img" class="catalog__product-img_cart">
                        <p><span class="catalog__product-price_cart">цена продукта ${product.price}</span>
                        <span class="catalog__product-count_cart">количество продуктов ${product.count}</span></p>
                    </div> 
                `);
            })
            cartBody.insertAdjacentHTML("beforeend",`<span class="all-price"></span>`)
            let allPriceEl = cartBody.querySelector(".all-price")
            if(cartBody.contains(allPriceEl)){
                allPriceEl.textContent = `Общая цена : ${allPrice}` ;
            }
        };
    },
};
const catalog = {
    products : [
        {name : "monitor" , price : "5000" , count : 1 , minImg : "img/min/min-monitor.jpg",
            imgList : [
                "img/max/monitor/1.jpg",
                "img/max/monitor/2.jpg",
                "img/max/monitor/3.jpg",
                "img/max/monitor/4.jpg",
            ],
        },
        {name : "mouse" , price : "500" , count : 1 , minImg : "img/min/min-mouse.jpg",
            imgList : [
                "img/max/mouse/1.jpg",
                "img/max/mouse/2.jpg",
                "img/max/mouse/3.jpg",
                "img/max/mouse/4.jpg",
            ],
        },
        {name : "keyboard" , price : "1500" , count : 1 ,  minImg : "img/min/min-keyboard.jpg", 
            imgList : [
            "img/max/keyboard/1.jpg",
            "img/max/keyboard/2.jpg",
            "img/max/keyboard/3.jpg",
            "img/max/keyboard/4.jpg",
        ]},
        {name : "system unit" , price : "2000" , count : 1 , minImg : "img/min/min-system-unit.jpg",
            imgList : [
                "img/max/system-unit/1.jpg",
                "img/max/system-unit/2.jpg",
                "img/max/system-unit/3.jpg",
                "img/max/system-unit/4.jpg",
            ],
        },
    ],
    renderCatalog(){
        const catalogBody = document.querySelector(".catalog");
        this.products.forEach( product=>{
            catalogBody.insertAdjacentHTML("afterbegin",`
                <div class="product-card">
                    <h2 class="catalog__product-heading">${product.name}</h2>
                    <img src="${product.minImg}" alt="catalog product img" class="catalog__product-img">
                    <span class="catalog__product-price">${product.price}</span>
                    <button class="add-to-card">Добавить в корзину</button>
                </div> 
            `);
        });
    },
    getProduct(event){
        if(event.target.classList.contains("add-to-card")){
            catalog.products.forEach(product=>{
                if(product.name == event.target.parentElement.children[0].textContent){
                    cart.pushCartProduct(product);
                }
            })
        }
    },
};
const modalScreen = {
    id : 0,
    
    muveImg(event){
        if(event.target.classList.contains("modal-screen__arr_right")){
            this.id++
            document.querySelector(".modal-screen-img").attributes.src.value = product.imgList[this.id]
            if(this.id == product.imgList.length){
                this.id = 0
                document.querySelector(".modal-screen-img").attributes.src.value = product.imgList[this.id]
            }
        }else{
            if(this.id == 0){
                this.id = product.imgList.length
                document.querySelector(".modal-screen-img").attributes.src.value = product.imgList[this.id]
            }
            this.id--
            document.querySelector(".modal-screen-img").attributes.src.value = product.imgList[this.id]
        }
    },
    renderModalScreen(targetName){
        product = this.getProduct(targetName)
        document.querySelector(".modal-screen").insertAdjacentHTML("afterbegin", `
            <div class="wrapper__modal-screen">
                <i class="fa-solid fa-arrow-left modal-screen__arr modal-screen__arr_left"></i>
                <div class="modal-screen__body">
                    <img src="" alt="catalog modalScreen img" class="modal-screen-img">
                </div>
                <i class="fa-solid fa-arrow-right modal-screen__arr modal-screen__arr_right"></i>
                <i class="fa-solid fa-circle-xmark close"></i>
            </div>
        `)
        if(document.querySelector(".modal-screen-img").attributes.src.value == 0){
            document.querySelector(".modal-screen-img").attributes.src.value = product.imgList[this.id]
        }
    },
    getProduct(targetName){
        let result = null;
        catalog.products.forEach(elem=>{
            if(elem.name == targetName){
                result = elem;
            }
        })
        return result;
    }
}


catalog.renderCatalog();
cart.renderCart();

document.querySelector(".catalog").addEventListener("click" , event=>{
    catalog.getProduct(event);
    cart.getPriceBasket();

        if(event.target.classList.contains("catalog__product-img")){
            modalScreen.renderModalScreen(event.target.parentElement.children[0].textContent)
            document.querySelector(".modal-screen").style.zIndex = 1
        }
    }
)


document.querySelector(".modal-screen").addEventListener("click" , event=>{
    if(event.target.classList.contains("modal-screen__arr_left") || event.target.classList.contains("modal-screen__arr_right")){
        modalScreen.muveImg(event)
    }else if(event.target.classList.contains("close")){
        document.querySelector(".wrapper__modal-screen").remove();
        
        
    }
})
