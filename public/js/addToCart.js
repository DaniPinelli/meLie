window.onload = () => {
    let addToCartForm = document.getElementById('addToCartForm');
    let quantity = document.getElementById('quantity');
    let productId = document.getElementById('productId');

    addToCartForm.addEventListener('submit', () => {
        axios.post('http://localhost:3000/addToCart', {productId: productId.value, quantity: quantity.value, userId: 102})
        .then((resultado) => {
            console.log(resultado)
        })
    })
}