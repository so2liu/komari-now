import { TOrder } from "../interfaces";

export const mockOrder: TOrder = {
  submitTimestamp: new Date(),
  isDealed: false,
  isThisTableFinished: false,
  order: [
    {
      id: "M11",
      name: "Maki Avocado",
      price: 4.2,
      quantity: 2,
      timestamp: new Date(),
    },
    {
      id: "15H",
      name: "Curry Chicken",
      price: 14,
      quantity: 2,
      timestamp: new Date(),
    },
  ],
};

export const mockPartnerInfo = require("./taumi_menu.json");
export const mockMenu = mockPartnerInfo.taumi.menu;
