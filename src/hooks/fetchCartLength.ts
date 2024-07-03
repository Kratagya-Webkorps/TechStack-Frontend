import { CartState } from "../redux/interfaces/interfaces";

export const fetchCartLength = (username: string, cart: CartState): number => {

  const userCart = cart.cartItems.find((item) => item.username === username);

  if (userCart) {
    return userCart.products.length;
  }

  return 0;
};
