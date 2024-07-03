export interface LoginFormState {
  email: string;
  username: string;
  role: string;
  isLoggedIn: boolean;
}

export interface FormData {
  username: string;
  name: string;
  email: string;
  password: string;
}

export interface SignupFormState {
  users: FormData[];
}
export interface LoginFormState {
  username: string;
  email: string;
  isLoggedIn: boolean;
  role: string;
}

export interface AppState {
  loginForm: LoginFormState;
}

export interface ProductFormData {
  category: string;
  description: string;
  name: string;
  productImage: File | null;
  price: string;
  stock: string;
  owner: string;
}

export interface ProductCardProps {
  image: string;
  name: string;
  price: number;
  rating: number;
  className: string;
  key: string | number;
  id: string;
}
export interface Product {
  productImage: string;
  price: number;
  rating: number;
  name: string;
  _id: string;
}

export interface ProductDetails {
  category: string;
  description: string;
  name: string;
  price: number;
  productImage: string;
  rating: number;
  stock: number;
  _id?: string;
}

export interface ProductPrice {
  productId: string;
  price: number;
}

export interface TotalPriceState {
  products: ProductPrice[];
}

export interface AppendPriceAction {
  type: "APPEND_PRICE";
  payload: {
    productId: string;
    price: number;
  };
}

export interface CartItem {
  username: string;
  productId: string;
  quantity: number;
}

export interface CartData {
  productId: string;
  quantity: number;
}
export interface CartState {
  cartItems: {
    cartItemCount?: number;
    username: string;
    products: {
      productId: string;
      quantity: number;
      _id?: string;
    }[];
  }[];
}
export interface WishlistState {
  wishlistItems: {
    wishlistItemCount?: number;
    username: string;
    products: {
      productId: string;
      _id?: string;
    }[];
  }[];
}
export interface AddToCartAction {
  type: typeof ADD_TO_CART;
  payload: CartItem;
}

export interface UpdateCartItemCountAction {
  type: typeof UPDATE_CART_ITEM_COUNT;
  payload: {
    username: string;
    productId: string;
    quantity: number;
  };
}

export interface RemoveFromCartAction {
  type: typeof REMOVE_FROM_CART;
  payload: {
    username: string;
    productId: string;
  };
}

export type CartActionTypes =
  | AddToCartAction
  | UpdateCartItemCountAction
  | RemoveFromCartAction;

export const SUBMIT_FORM = "SUBMIT_FORM";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const ADD_TO_CART = "ADD_TO_CART";
export const SAVE_TO_CART = "SAVE_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const UPDATE_CART_ITEM_COUNT = "UPDATE_CART_ITEM_COUNT";
export const ADD_TO_WISHLIST = "ADD_TO_WISHLIST";
export const SAVE_TO_WISHLIST = "SAVE_TO_WISHLIST";
export const REMOVE_FROM_WISHLIST = "REMOVE_FROM_WISHLIST";
export const DELETE_FROM_WISHLIST = "DELETE_FROM_WISHLIST";
export const UPDATE_WISHLIST_ITEM_COUNT = "UPDATE_WISHLIST_ITEM_COUNT";
