import React, { useReducer } from "react";
import { OrderContext, OrderInit, MenuContext, RatingContext } from "./stores";
import { mockMenu, mockRating } from "./mock";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import { orderReducer } from "./reducers";
import { useNowRatings } from "./services/firebase";

export default (props: { children: React.ReactNode }) => {
  const [order, dispatchOrder] = useReducer(orderReducer, OrderInit);
  const nowRatings = useNowRatings();
  return (
    <ThemeProvider theme={theme}>
      <MenuContext.Provider value={mockMenu}>
        <RatingContext.Provider value={nowRatings.ratings as any}>
          <OrderContext.Provider
            value={{ state: order, dispatch: dispatchOrder }}
          >
            ${props.children}
          </OrderContext.Provider>
        </RatingContext.Provider>
      </MenuContext.Provider>
    </ThemeProvider>
  );
};
