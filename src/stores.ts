import { createContext } from "react";
import { produce } from "immer";
import { order, ItemFoundFromMenu, menu, orderItem, id } from "./interfaces";
import { findSubFromMenuByID, findIndexFromOrderByID } from "./utils";

export const OrderDefault: order = {
  order: [],
  submitTimestamp: null,
  isDealed: false,
  isThisTableFinished: false,
};
export const OrderContext = createContext(OrderDefault);

export const OrderReducer = {
  appendOrder: produce(function (
    draft: order,
    id: string | number,
    quantity: number,
    menu: menu
  ) {
    const targetOrder = findSubFromMenuByID(id, menu);
    if (targetOrder.isFound) {
      const newOrder: orderItem = {
        id: targetOrder.sub.id as id,
        name: targetOrder.sub.subname as string,
        price: targetOrder.sub.price as number,
        quantity,
        timestamp: new Date(),
      };
      draft.order.push(newOrder);
    }
  }),
  changeQuantity: produce(function (draft: order, id: id, newQuantity: number) {
    const targetOrderIndex = findIndexFromOrderByID(id, draft);
    if (targetOrderIndex >= 0)
      draft.order[targetOrderIndex].quantity = newQuantity;
  }),
  removeItem: produce(function (draft: order, id: id) {
    const targetOrderIndex = findIndexFromOrderByID(id, draft);
    if (targetOrderIndex >= 0) {
      draft.order.splice(targetOrderIndex, 1);
    }
  }),
};
