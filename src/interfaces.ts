import { type } from "os";

export type id = string | number;

export interface orderItem {
  id: id;
  name: string;
  price: number;
  quantity: number;
  timestamp: Date;
}

export type order = Omit<submitOrder, "tableID">;

export interface submitOrder {
  order: orderItem[];
  tableID: string | null;
  submitTimestamp: Date | null;
  isDealed: boolean | null;
  isThisTableFinished: boolean | null;
}

export interface sub {
  id: id;
  subname: string | null;
  price: number;
}

// export type menu = {
//   [first in "discount" | "normal" | "drinks"]: {
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

export type menu = {
  [first: string]: {
    [second: string]:
      | {}
      | {
          [name: string]: {
            DE: string;
            EN: string | null;
            sub: sub[];
            imgSrc: string | null;
          };
        };
  };
};

export interface ItemFoundFromMenu {
  isFound: boolean;
  sub: { id: null; subname: null; price: null } | sub;
  firstKey: null | string;
  secondKey: null | string;
}
