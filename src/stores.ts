import { createContext, Dispatch } from "react";
import { produce } from "immer";
import { TOrder, TMenu, IOrderItem, TID, TOrderHistory } from "./interfaces";
import {
  findSubFromMenuByID,
  findIndexFromOrderByID,
  concatNameSubname,
} from "./utils";
import { mockMenu } from "./mock";

export const OrderInit: TOrder = {
  order: [],
  submitTimestamp: null,
  isDealed: false,
  isThisTableFinished: false,
};
export const OrderContext = createContext<{
  state: TOrder;
  dispatch: Dispatch<{ type: string; payload?: object }>;
}>({
  state: OrderInit,
  dispatch: () => null,
});

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
        name: concatNameSubname(
          targetOrder.name as string,
          targetOrder.sub.subname
        ),
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

export const OrderHistoryContext = createContext<{
  orderHistory: TOrderHistory;
  setOrderHistory: React.Dispatch<React.SetStateAction<TOrderHistory>>;
}>({ orderHistory: [], setOrderHistory: () => {} });

export const MenuContext = createContext(mockMenu);
