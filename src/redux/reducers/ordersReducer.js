import { SET_ORDERS } from "../actions/api/actions-types";


const initialState = {
  orders: [
    {
      _id: '622907271fd40f025da26aeb',
      clientName: "Client name C",
      clientAdress: "Client address",
      clientPostalCode: "Client postal code",
      clientResidence: "Client Residence",
      arrayFromOrder: "array from order",
      totalPrice: "total price",
    },
    {
      _id: '622907271fd40f025da26aeb',
      clientName: "Client name B",
      clientAdress: "Client address",
      clientPostalCode: "Client postal code",
      clientResidence: "Client Residence",
      arrayFromOrder: "array from order",
      totalPrice: "total price",
    },
    {
      _id: '622907271fd40f025da26aeb',
      clientName: "Client name A",
      clientAdress: "Client address",
      clientPostalCode: "Client postal code",
      clientResidence: "Client Residence",
      arrayFromOrder: "array from order",
      totalPrice: "total price",
    },
  ],
  errors: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
  }

  return state;
}
