const initialState = [
  {
    name: "Sledgehammer",
    price: 125.75
  },
  {
    name: "Axe",
    price: 190.5
  },
  {
    name: "Bandsaw",
    price: 562.13
  },
  {
    name: "Chisel",
    price: 12.9
  },
  {
    name: "Hacksaw",
    price: 18.45
  }
];

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default productReducer;
