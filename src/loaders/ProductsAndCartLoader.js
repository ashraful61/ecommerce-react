import { getStoredCart } from "../utilities/fakedb"

export const ProductsAndCartLoader = async () => {
    const productsData = await fetch('products.json')
    const products = await productsData.json()

    //get cart
    const saveCart = getStoredCart()
    const initialCart = [];
    for(const id in saveCart) {
        const addedProduct = products.find(product => product.id === id)
        if(addedProduct) {
            const quantity = saveCart[id]
            // addedProduct.quantity = saveCart[id]
            addedProduct.quantity = quantity
            // console.log(id, quantity)
            initialCart.push(addedProduct)
        }
    }
    return {products, initialCart};
}