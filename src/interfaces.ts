export type TID = string;

export interface IOrderItem {
  id: TID;
  name: string;
  price: number;
  quantity: number;
  timestamp: Date;
}

export interface IOrder {
  order: IOrderItem[];
  tableID: string;
  location: string;
  isPartnerHandled: boolean;
  isThisTableFinished: boolean;
}

export type TOrderHistory = IOrder[];

export interface ISub {
  id: TID;
  subname: string | null;
  price: number;
}

export interface IProduct {
  [name: string]: {
    DE: string;
    EN: string | null;
    sub: ISub[];
    imgSrc: string | null;
    ratedNum: number;
    rating: number;
  };
}

// export type menu = {
//   [first in "food" | "drinks"]: {
//     [second in
//       | "Angebote"
//       | "Sushiset"
//       | "Sushi"
//       | "Hauptspeise"
//       | "Vorspeise"]:
//       | {}
//       | {
//           [name: string]: {
//             DE: string;
//             EN: string | null;
//             sub: sub[];
//             imgSrc: string | null;
//           };
//         };
//   };
// };

export type TMenu = {
  [first: string]: {
    [second: string]: {} | IProduct;
  };
};

export interface IItemFoundFromMenu {
  isFound: boolean;
  sub: { id: null; subname: null; price: null } | ISub;
  firstKey: null | string;
  secondKey: null | string;
  name: null | string;
}
