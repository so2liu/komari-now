import React, { useReducer, useState } from "react";
import {
  OrderContext,
  OrderInit,
  OrderReducer,
  MenuContext,
  OrderHistoryContext,
} from "./stores";
import { IOrder, TOrderHistory } from "./interfaces";
import { findIndexFromOrderByID } from "./utils";
import { mockMenu } from "./mock";

export default (props: { children: React.ReactNode }) => {
  const [order, dispatchOrder] = useReducer(orderReducer, OrderInit);
  const [orderHistory, setOrderHistory] = useState([] as TOrderHistory);
  return (
    <MenuContext.Provider value={mockMenu}>
      <OrderHistoryContext.Provider value={{ orderHistory, setOrderHistory }}>
        <OrderContext.Provider
          value={{ state: order, dispatch: dispatchOrder }}
        >
          ${props.children}
        </OrderContext.Provider>
      </OrderHistoryContext.Provider>
    </MenuContext.Provider>
  );
};

function orderReducer(state: IOrder, action: { type: string; payload?: any }) {
  const id = action.payload?.id;
  const index = findIndexFromOrderByID(id, state);

  switch (action.type) {
    case "setTableLocation":
      return OrderReducer.setTableLocation(
        state,
        action.payload.tableID,
        action.payload.location
      );
    case "append":
      if (index >= 0)
        return OrderReducer.changeQuantity(
          state,
          id,
          state.order[index].quantity + 1
        );
      return OrderReducer.appendOrder(state, id, 1, action.payload.menu);
    case "increment":
      return OrderReducer.changeQuantity(
        state,
        id,
        state.order[index].quantity + 1
      );
    case "decrement":
      if (state.order[index].quantity === 0) return state;
      return OrderReducer.changeQuantity(
        state,
        id,
        state.order[index].quantity - 1
      );
    case "Delete":
      return OrderReducer.removeItem(state, id);
    case "Clear":
      return OrderInit;
    default:
      throw new Error();
  }
}
