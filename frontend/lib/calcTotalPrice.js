export default function calcTotalPrice(cart) {
  return cart.reduce((amount, cartItem) => {
    if (!cartItem.product) return amount; // products can be deleted while they are in a cart

    return amount + cartItem.quantity * cartItem.product.price;
  }, 0);
}
