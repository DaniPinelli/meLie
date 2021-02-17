
window.onload = function(){
    let latestProducts = document.getElementById('latest-products');
    let offerProducts = document.getElementById('offers-products');

        fetch('http://localhost:3000/products/latest')
            .then(function(response){
                return response.json();
            })
            .then(function(dataDeCode){

                for(let i = 0; i < dataDeCode.data.length; i++){
                    let lastChild = latestProducts.lastElementChild
                    let newChild = lastChild.cloneNode(true)

                    console.log(dataDeCode.data[i].name);

                    let stringDiscount = ''
                    if( dataDeCode.data[i].discount > 0 ) {
                        stringDiscount = `<span>` + dataDeCode.data[i].discount + ` % OFF</span>`
                    }

                    newChild.innerHTML = 
                        `<section class="product-box">
                            <a href="/products/detail/` + dataDeCode.data[i].id + `">
                                <figure class="product-box_image">
                                    <img src="/images/products/` + dataDeCode.data[i].image + `" alt="` + dataDeCode.data[i].name + `">
                                </figure>
                                <article class="product-box_data">
                                    <h2>` + (dataDeCode.data[i].price - dataDeCode.data[i].price * dataDeCode.data[i].discount / 100) + `</h2>
                                    ` + stringDiscount + `
                                    <p>` + dataDeCode.data[i].name + `</p>
                                    <i class="fas fa-truck"></i>
                                </article>
                            </a>
                        </section>`
                    lastChild.after(newChild)
                }
            });

            fetch('http://localhost:3000/products/offers')
            .then(function(response){
                return response.json();
            })
            .then(function(dataDeCode){

                for(let i = 0; i < dataDeCode.data.length; i++){
                    let lastChild = offerProducts.lastElementChild
                    let newChild = lastChild.cloneNode(true)

                    console.log(dataDeCode.data[i].name);

                    let stringDiscount = ''
                    if( dataDeCode.data[i].discount > 0 ) {
                        stringDiscount = `<span>` + dataDeCode.data[i].discount + ` % OFF</span>`
                    }

                    newChild.innerHTML = 
                        `<section class="product-box">
                            <a href="/products/detail/` + dataDeCode.data[i].id + `">
                                <figure class="product-box_image">
                                    <img src="/images/products/` + dataDeCode.data[i].image + `" alt="` + dataDeCode.data[i].name + `">
                                </figure>
                                <article class="product-box_data">
                                    <h2>` + (dataDeCode.data[i].price - dataDeCode.data[i].price * dataDeCode.data[i].discount / 100) + `</h2>
                                    ` + stringDiscount + `
                                    <p>` + dataDeCode.data[i].name + `</p>
                                    <i class="fas fa-truck"></i>
                                </article>
                            </a>
                        </section>`
                    lastChild.after(newChild)
                }


            })
}