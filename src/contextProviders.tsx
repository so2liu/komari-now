import React, { useState } from "react";
import { OrderContext, OrderDefault } from "./stores";

export default (props: { children: React.ReactNode }) => {
  const [order, setOrder] = useState(OrderDefault);
  return (
    <OrderContext.Provider value={order}>
      ${props.children}
    </OrderContext.Provider>
  );
};
