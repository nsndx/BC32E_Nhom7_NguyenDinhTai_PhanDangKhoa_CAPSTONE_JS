const dom = (id) => document.getElementById(id)
// lấy data về
const url = 'https://shop.cyberlearn.vn/api/Product'
fetch(url)
    .then((response) => response.json())
    .then((data) => {
        const products = data.content
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
    .catch((err)=>alert(err))