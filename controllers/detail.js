const dom = (id) => document.getElementById(id)
const urlParams = new URLSearchParams(window.location.search)
const myParam = urlParams.get('producid')

// lấy data theo myParam
const url = 'https://shop.cyberlearn.vn/api/Product/getbyid?id=' + myParam
fetch(url)
    .then((response) => response.json())
    .then((data) => {
        const detail = data.content // đối tượng detail
        const detailRender = `<div class="row">
                                <div class="col-left">
                                    <div class="img">
                                        <img src="${detail.image}" alt="">
                                    </div>
                                </div>
                                <div class="col-right">
                                    <h1>${detail.name}</h1>
                                    <p>${detail.description}</p>
                                    <h3>Available size</h3>
                                    <div class="button-size" id="size"></div>                    
                                    <h4>${detail.price}$</h4>
                                    <div class="button-amount">
                                        <button class="button-plus">+</button>
                                        <span>1</span>
                                        <button class="button-minus">-</button>
                                    </div>
                                    <div class="button-add">
                                        <button>Add to cart</button>
                                    </div>                    
                                </div>
                            </div>`
        dom('detail').innerHTML = detailRender

        const size = detail.size // mảng size
        const sizeRender = size.reduce((value, size, index) => {
            return value += `<button class="size${index + 1}">${size}</button>`
        }, '')
        dom('size').innerHTML = sizeRender
        
        const products = detail.relatedProducts // mảng relatedProducts
        const productRender = products.reduce((value, product) => {
            return value += `<div class="col">
                                <div class="card">
                                <img src="${product.image}" alt="">
                                <h3>${product.name}</h3>
                                <p>${product.shortDescription}</p>
                                <a href="./detail.html?producid=${product.id}">Buy now</a>
                                <span>${product.price}$</span>
                                </div>
                            </div>`
        }, '')
        dom('products').innerHTML = productRender
    })
    .catch((err) => alert(err))