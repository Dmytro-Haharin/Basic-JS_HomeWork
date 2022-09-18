/*
    1. Реализовать страницу корзины:
        a. Добавить возможность не только смотреть состав корзины, но и редактировать его,
            обновляя общую стоимость или выводя сообщение «Корзина пуста».
    2. На странице корзины:
        a. Сделать отдельные блоки «Состав корзины», «Адрес доставки», «Комментарий»;
        b. Сделать эти поля сворачиваемыми;
        c. Заполнять поля по очереди, то есть давать посмотреть состав корзины, внизу которого
            есть кнопка «Далее». Если нажать ее, сворачивается «Состав корзины» и открывается
            «Адрес доставки» и так далее.
    3. * Убрать границы поля: пересекая их, змейка должна появляться с противоположной стороны.
    4. * Для задачи со звездочкой из шестого урока реализовать функционал переключения между
         картинками по стрелкам на клавиатуре.
*/
const cart = {
    products : JSON.parse(window.localStorage.getItem("products")),
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
                        <span class="catalog__product-count_cart">количество продуктов 
                            <i class="fa-solid fa-minus minus-count"></i> ${product.count} 
                            <i class="fa-light fa-plus plus-count"></i>
                        </span></p>
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
    swichChapter(){

    },
};
console.log();
document.querySelector(".cart").addEventListener("click", event=>{
    if(event.target.classList.contains("minus-count")){
        
        cart.products.forEach(el=>{
            if(event.target.closest(".product-cart").children[0].textContent == el.name){
                el.count--
                if(el.count == 0){
                    
                    cart.products.splice(cart.products.indexOf(el),1)
                }
            }
        })  
    }else if(event.target.classList.contains("plus-count")){
        cart.products.forEach(el=>{
            if(event.target.closest(".product-cart").children[0].textContent == el.name){
                
                el.count++
            };
        });
    };
    window.localStorage.setItem("products" , JSON.stringify(cart.products))
    cart.renderCart()
    cart.getPriceBasket()
})

const basketPage = document.querySelector(".basket-page__wrapper")
let basketPageCount = 0
basketPage.addEventListener("click" , event=>{
    if(event.target.classList.contains("next-chapter")){
        event.target.closest(".basket__content").classList.remove("basket__content_active")
        basketPageCount++
        basketPage.children[basketPageCount].querySelector(".basket__content").classList.add("basket__content_active")
        
    }
})

cart.renderCart()
cart.getPriceBasket()