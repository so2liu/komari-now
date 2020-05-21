import { createContext, Dispatch } from "react";
import { produce } from "immer";
import { IOrder, TMenu, IOrderItem, TID, TOrderHistory } from "./interfaces";
import {
  findSubFromMenuByID,
  findIndexFromOrderByID,
  concatNameSubname,
} from "./utils";
import { mockMenu } from "./mock";

export const OrderInit: IOrder = {
  order: [],
  tableID: "",
  location: "",
  isPartnerHandled: false,
  isThisTableFinished: false,
};
export const OrderContext = createContext<{
  state: IOrder;
  dispatch: Dispatch<{ type: string; payload?: object }>;
}>({
  state: OrderInit,
  dispatch: () => null,
});

export const OrderReducer = {
  setTableLocation: produce(function (
    draft: IOrder,
    tableID: string,
    location: string
  ) {
    draft.tableID = tableID;
    draft.location = location;
  }),
  appendOrder: produce(function (
    draft: IOrder,
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
    draft: IOrder,
    id: TID,
    newQuantity: number
  ) {
    const targetOrderIndex = findIndexFromOrderByID(id, draft);
    if (targetOrderIndex >= 0)
      draft.order[targetOrderIndex].quantity = newQuantity;
  }),
  removeItem: produce(function (draft: IOrder, id: TID) {
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
