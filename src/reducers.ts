import { IOrder } from "./interfaces";
import { findIndexFromOrderByID } from "./utils";
import { OrderReducer, OrderInit } from "./stores";

export function orderReducer(
  state: IOrder,
  action: { type: string; payload?: any }
) {
  const id = action.payload?.id;
  const index = findIndexFromOrderByID(id, state);

  switch (action.type) {
    case "setTableLocation":
      return OrderReducer.setTableLocation(
        state,
        action.payload.tableID,
        action.payload.location
      );
    case "Append":
      if (index >= 0)
        return OrderReducer.changeQuantity(
          state,
          id,
          state.order[index].quantity + 1
        );
      return OrderReducer.appendOrder(state, id, 1, action.payload.menu);
    case "Increment":
      return OrderReducer.changeQuantity(
        state,
        id,
        state.order[index].quantity + 1
      );
    case "Decrement":
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
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

// export function orderHistoryReducer(
//   state: IOrderHistory,
//   action: {
//     type: string;
//     payload?: any;
//   }
// ) {
//   switch (action.type) {
//     case "Push":
//       const order = action.payload?.order;
//       return produce(state, (draft) => {
//         const { IDs, quantities } = mergeOrders([order, draft.summary]);
//         draft.summary = createOrder(
//           IDs,
//           quantities,
//           action.payload.menu as TMenu
//         );
//         draft.details.push(order);
//       });
//     default:
//       throw new Error(`Unknown action type: ${action.type}`);
//   }
// }
