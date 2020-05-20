import React from "react";
import Table from "./UI/Table";
import { TableRow, TableCell, TableFooter } from "@material-ui/core";
import ChangeNumBtn from "./UI/ChangeNumBtn";
import { TOrder } from "../interfaces";
import { getTotalPrice } from "../utils";
import { mockOrder } from "../mock";

export default () => {
  const labels = [
    { key: "id", label: "ID" },
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
        <TableCell align="right">{getTotalPrice(mockOrder)}</TableCell>
      </TableRow>
    </TableFooter>
  );
  return (
    <Table labels={labels} data={mockOrder.order} row={row} footer={footer} />
  );
};

const row = (item: { [label: string]: string | number }, keys: string[]) => {
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
              <ChangeNumBtn num={item[key] as number} />
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
