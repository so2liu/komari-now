import { OrderReducer, OrderInit } from "./stores";
import partnerInfo from "./mock/taumi_menu.json";

const MENU = partnerInfo.taumi.menu;

test("OrderReducer append & create new state", () => {
  const thisOrder = OrderInit;
  const nextOrder = OrderReducer.appendOrder(thisOrder, "M11", 1, MENU);
  expect(nextOrder).toStrictEqual({
    order: [
      {
        id: "M11",
        name: "Avocado - Avocado",
        price: 4.2,
        quantity: 1,
        timestamp: expect.any(Date),
      },
    ],
    isDealed: false,
    isThisTableFinished: false,
    submitTimestamp: null,
  });
  expect(thisOrder === nextOrder).toBe(false);
});

test("OrderReducer change quantity", () => {
  const thisOrder = OrderReducer.appendOrder(OrderInit, "M11", 1, MENU);
  const nextOrder = OrderReducer.changeQuantity(thisOrder, "M11", 2);
  expect(nextOrder).toStrictEqual({
    order: [
      {
        id: "M11",
        name: "Avocado - Avocado",
        price: 4.2,
        quantity: 2,
        timestamp: expect.any(Date),
      },
    ],
    isDealed: false,
    isThisTableFinished: false,
    submitTimestamp: null,
  });
  expect(thisOrder === nextOrder).toBe(false);
});

test("OrderReducer delete order item", () => {
  let thisOrder = OrderReducer.appendOrder(OrderInit, "M11", 1, MENU);
  thisOrder = OrderReducer.appendOrder(thisOrder, "M12", 1, MENU);
  let nextOrder = OrderReducer.removeItem(thisOrder, "M11");
  expect(nextOrder).toStrictEqual({
    order: [
      {
        id: "M12",
        name: "Kappa - Gurke",
        price: 3.9,
        quantity: 1,
        timestamp: expect.any(Date),
      },
    ],
    isDealed: false,
    isThisTableFinished: false,
    submitTimestamp: null,
  });
  expect(thisOrder === nextOrder).toBe(false);
  nextOrder = OrderReducer.removeItem(nextOrder, "M12");
  expect(nextOrder).toStrictEqual({
    order: [],
    isDealed: false,
    isThisTableFinished: false,
    submitTimestamp: null,
  });
});
