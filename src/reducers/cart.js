import { ADD_PRODUCT, REMOVE_PRODUCT } from "../actions/cartActions";
import { loadState } from "../localStorage";
const state =loadState();
const initialState = state&&state.state.cart ? state.state.cart : [];

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return [...state, action.product];
    case REMOVE_PRODUCT:
      //find index of the select product
      const index = state.findIndex(item => item.name === action.product.name);
      //remove the index of the select product from store
      return state.filter((_, i) => i !== index);
    default:
      return state;
  }
};

export default cartReducer;