import { Reducer } from "@reduxjs/toolkit";
import {
  ADD_TO_CART,
  SAVE_TO_CART,
  REMOVE_FROM_CART,
  CartState,
  UPDATE_CART_ITEM_COUNT,
} from "../interfaces/interfaces";

const initialState: CartState = {
  cartItems: [],
};

const calculateCartItemCount = (products: any[]) => {
  return products.length;
};

const cartReducer: Reducer<CartState> = (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_CART_ITEM_COUNT:
      const { username: updateUsername, count } = action.payload;
      const updatedCartItems = state.cartItems.map((item) => {
        if (item.username === updateUsername) {
          return {
            ...item,
            cartItemCount: count,
          };
        }
        return item;
      });

      return {
        ...state,
        cartItems: updatedCartItems,
      };

    case SAVE_TO_CART:
      const { username, products } = action.payload;
      const existingUserIndex = state.cartItems.findIndex(
        (item) => item.username === username
      );

      if (existingUserIndex !== -1) {
        return {
          ...state,
          cartItems: [
            ...state.cartItems.slice(0, existingUserIndex),
            {
              username,
              products,
              cartItemCount: calculateCartItemCount(products),
            },
            ...state.cartItems.slice(existingUserIndex + 1),
          ],
        };
      } else {
        return {
          ...state,
          cartItems: [
            ...state.cartItems,
            {
              username,
              products,
              cartItemCount: calculateCartItemCount(products),
            },
          ],
        };
      }

    case ADD_TO_CART:
      const { username: addUsername, productId, quantity } = action.payload;
      const existingUserIndexAdd = state.cartItems.findIndex(
        (item) => item.username === addUsername
      );

      if (existingUserIndexAdd !== -1) {
        const updatedUserProductsAdd = [
          ...state.cartItems[existingUserIndexAdd].products,
        ];
        const existingProductIndexAdd = updatedUserProductsAdd.findIndex(
          (item) => item.productId === productId
        );

        if (existingProductIndexAdd !== -1) {
          updatedUserProductsAdd[existingProductIndexAdd].quantity += quantity;
        } else {
          updatedUserProductsAdd.push({ productId, quantity });
        }

        return {
          ...state,
          cartItems: [
            ...state.cartItems.slice(0, existingUserIndexAdd),
            {
              username: addUsername,
              products: updatedUserProductsAdd,
              cartItemCount: calculateCartItemCount(updatedUserProductsAdd),
            },
            ...state.cartItems.slice(existingUserIndexAdd + 1),
          ],
        };
      } else {
        return {
          ...state,
          cartItems: [
            ...state.cartItems,
            {
              username: addUsername,
              products: [{ productId, quantity }],
              cartItemCount: quantity,
            },
          ],
        };
      }

    case REMOVE_FROM_CART:
      const { username: removeUsername, productId: removeProductId } = action.payload;
      const existingUserIndexRemove = state.cartItems.findIndex(
        (item) => item.username === removeUsername
      );

      if (existingUserIndexRemove !== -1) {
        const updatedUserProductsRemove = state.cartItems[existingUserIndexRemove].products.filter(
          (item) => item.productId !== removeProductId
        );

        return {
          ...state,
          cartItems: [
            ...state.cartItems.slice(0, existingUserIndexRemove),
            {
              username: removeUsername,
              products: updatedUserProductsRemove,
              cartItemCount: calculateCartItemCount(updatedUserProductsRemove),
            },
            ...state.cartItems.slice(existingUserIndexRemove + 1),
          ],
        };
      }

      return state;

    default:
      return state;
  }
};

export default cartReducer;
