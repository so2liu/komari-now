import { createContext } from "react";
import { produce } from "immer";
import {
  TOrder,
  IItemFoundFromMenu,
  TMenu,
  IOrderItem,
  TID,
} from "./interfaces";
import { findSubFromMenuByID, findIndexFromOrderByID } from "./utils";

export const OrderDefault: TOrder = {
  order: [],
  submitTimestamp: null,
  isDealed: false,
  isThisTableFinished: false,
};
export const OrderContext = createContext(OrderDefault);

export const OrderReducer = {
  appendOrder: produce(function (
    draft: TOrder,
    id: TID,
    quantity: number,
    menu: TMenu
  ) {
    const targetOrder = findSubFromMenuByID(id, menu);
    if (targetOrder.isFound) {
      const newOrder: IOrderItem = {
        id: targetOrder.sub.id as TID,
        name: targetOrder.sub.subname as string,
        price: targetOrder.sub.price as number,
        quantity,
        timestamp: new Date(),
      };
      draft.order.push(newOrder);
    }
  }),
  changeQuantity: produce(function (
    draft: TOrder,
    id: TID,
    newQuantity: number
  ) {
    const targetOrderIndex = findIndexFromOrderByID(id, draft);
    if (targetOrderIndex >= 0)
      draft.order[targetOrderIndex].quantity = newQuantity;
  }),
  removeItem: produce(function (draft: TOrder, id: TID) {
    const targetOrderIndex = findIndexFromOrderByID(id, draft);
    if (targetOrderIndex >= 0) {
      draft.order.splice(targetOrderIndex, 1);
    }
  }),
};
