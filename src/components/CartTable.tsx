import React, { useContext } from "react";
import Table from "./UI/Table";
import { TableRow, TableCell, TableFooter } from "@material-ui/core";
import ChangeNumBtn from "./UI/ChangeNumBtn";
import { getTotalPrice } from "../utils";
import { OrderContext } from "../stores";

export default () => {
  const order = useContext(OrderContext);
  const labels = [
    // { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "quantity", label: "Menge" },
    { key: "price", label: "Preis" },
  ];

  const footer = (
    <TableFooter>
      <TableRow>
        <TableCell colSpan={labels.length - 1} align="right">
          TOTAL:
        </TableCell>
        <TableCell align="right">{getTotalPrice(order.state)}</TableCell>
      </TableRow>
    </TableFooter>
  );

  const row = (item: { [label: string]: string | number }, keys: string[]) => {
    const handlePlus = () => {
      order.dispatch({
        type: "Increment",
        payload: {
          id: item["id"],
        },
      });
    };
    const handleMinus = () => {
      order.dispatch({
        type: "Decrement",
        payload: {
          id: item["id"],
        },
      });
    };
    return (
      <TableRow key={item[keys[0]]}>
        {keys.map((key, index) => {
          if (index === 0)
            return (
              <TableCell key={index} component="th" scope="row">
                {item[keys[0]]}
              </TableCell>
            );
          if (key === "quantity")
            return (
              <TableCell key={index} align="right">
                <ChangeNumBtn
                  num={item[key] as number}
                  onPlusOne={handlePlus}
                  onMinusOne={handleMinus}
                />
              </TableCell>
            );
          return (
            <TableCell key={index} align="right">
              {item[key]}
            </TableCell>
          );
        })}
      </TableRow>
    );
  };

  return (
    <Table labels={labels} data={order.state.order} row={row} footer={footer} />
  );
};
