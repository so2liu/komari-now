import {
  getIsPartnerDev,
  getIsDeveloperDev,
  getIsDev,
  findIndexFromOrderByID,
  findSubFromMenuByID,
  mapDrawerList,
  getTotalPrice,
} from "./utils";
import { TOrder, IItemFoundFromMenu } from "./interfaces";
import partnerInfo from "./mock/taumi_menu.json";

const MENU = partnerInfo.taumi.menu;

const localhost = "http://localhost:3000";
const lanLocalhost = "http://192.168.0.54:3000";
const partnerDevURL = "https://komari-now-dev.eat-togo.com";
const developerDevURL = "https://komari-now.web.app";
const productionURL = "https://komari-now.eat-togo.com";

test("isPartnerDev for all kinds of url", () => {
  expect(getIsPartnerDev(localhost)).toBe(false);
  expect(getIsPartnerDev(lanLocalhost)).toBe(false);
  expect(getIsPartnerDev(developerDevURL)).toBe(false);
  expect(getIsPartnerDev(partnerDevURL)).toBe(true);
  expect(getIsPartnerDev(productionURL)).toBe(false);
});

test("isDeveloperDev for all kinds of url", () => {
  expect(getIsDeveloperDev(localhost)).toBe(true);
  expect(getIsDeveloperDev(lanLocalhost)).toBe(true);
  expect(getIsDeveloperDev(developerDevURL)).toBe(true);
  expect(getIsDeveloperDev(partnerDevURL)).toBe(false);
  expect(getIsDeveloperDev(productionURL)).toBe(false);
});

test("isDev (devloper and partner) for all kinds of url", () => {
  expect(getIsDev(localhost)).toBe(true);
  expect(getIsDev(lanLocalhost)).toBe(true);
  expect(getIsDev(developerDevURL)).toBe(true);
  expect(getIsDev(partnerDevURL)).toBe(true);
  expect(getIsDev(productionURL)).toBe(false);
});

test("findIndexFromOrderByID", () => {
  expect(findIndexFromOrderByID("15H", mockOrder)).toBe(1);
  expect(findIndexFromOrderByID("15", mockOrder)).toBe(-1);
});

test("findSubFromMenuByID", () => {
  expect(findSubFromMenuByID("1", MENU)).toStrictEqual({
    isFound: true,
    firstKey: "food",
    secondKey: "Vorspeise",
    sub: { id: "1", subname: null, price: 7.5 },
  } as IItemFoundFromMenu);

  expect(findSubFromMenuByID("M11", MENU)).toStrictEqual({
    isFound: true,
    firstKey: "food",
    secondKey: "Sushi",
    sub: { id: "M11", subname: "Avocado - Avocado", price: 4.2 },
  } as IItemFoundFromMenu);

  expect(findSubFromMenuByID("M1", MENU)).toStrictEqual({
    isFound: false,
    firstKey: null,
    secondKey: null,
    sub: { id: null, subname: null, price: null },
  } as IItemFoundFromMenu);
});

test("mapDrawerList", () => {
  const drawerItems = [
    ["Mittagstisch", "Vorspeise"],
    ["Hauptspeise", "Sushi", "Sushi Set"],
  ];
  expect(mapDrawerList(drawerItems)).toStrictEqual([
    [
      {
        key: "Mittagstisch",
        label: "Mittagstisch",
      },
      {
        key: "Vorspeise",
        label: "Vorspeise",
      },
    ],
    [
      {
        key: "Hauptspeise",
        label: "Hauptspeise",
      },
      {
        key: "Sushi",
        label: "Sushi",
      },
      {
        key: "Sushi Set",
        label: "Sushi Set",
      },
    ],
  ]);
});

test("getTotalPrice", () => {
  expect(getTotalPrice(mockOrder)).toBe(36.4);
});

const mockOrder: TOrder = {
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
