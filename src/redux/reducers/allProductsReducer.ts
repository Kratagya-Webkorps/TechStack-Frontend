import { Reducer } from "@reduxjs/toolkit";

const allProductsReducer:Reducer = (state = 1, action) => {
  switch (action.type) {
    case "SAVE_PRODUCTS":
      return state + 1;
    default:
      return state;
  }
};
export default allProductsReducer;