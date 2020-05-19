import { TOrder, TMenu, ISub, IItemFoundFromMenu, TID } from "./interfaces";

const baseURL = window.location.href;
export function getIsPartnerDev(url: string): boolean {
  return url.includes("dev") && url.includes("eat-togo.com");
}
export const isPartnerDev = getIsPartnerDev(baseURL);

export function getIsDeveloperDev(url: string): boolean {
  return url.split(":").length > 2 || url.includes("web.app");
}
export const isDeveloperDev = getIsDeveloperDev(baseURL);

export function getIsDev(url: string): boolean {
  return getIsPartnerDev(url) || getIsDeveloperDev(url);
}
export const isDev = getIsDev(baseURL);

export function findIndexFromOrderByID(id: TID, order: TOrder): number {
  const index = order.order.findIndex((element) => element.id === id);
  return index;
}

export function findSubFromMenuByID(id: TID, menu: TMenu): IItemFoundFromMenu {
  const target: IItemFoundFromMenu = {
    isFound: false,
    sub: { id: null, subname: null, price: null },
    firstKey: null,
    secondKey: null,
  };
  for (let [firstKey, firstContent] of Object.entries(menu)) {
    for (let [secondKey, secondContent] of Object.entries(firstContent)) {
      if (secondContent) {
        for (let [name, content] of Object.entries(secondContent)) {
          const targetSub = content.sub.find((element) => element.id === id);
          if (targetSub) {
            target.isFound = true;
            target.firstKey = firstKey;
            target.secondKey = secondKey;
            target.sub = targetSub;
            return target;
          }
        }
      }
    }
  }
  return target;
}
