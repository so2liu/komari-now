import React, { useState } from "react";
import ChangeNumBtn from "../components/UI/ChangeNumBtn";
import partnerInfo from "../mock/taumi_menu.json";
import { Container } from "@material-ui/core";
import OrderTable from "../components/OrderTable";

const MENU = partnerInfo.taumi.menu;

export default {
  title: "SummaryTable",
  component: ChangeNumBtn,
};

export const Btn = () => {
  const [num, setNum] = useState(5);
  function handlePlusOne() {
    setNum((pre) => pre + 1);
  }
  function handleMinusOne() {
    setNum((pre) => (pre >= 1 ? pre - 1 : 0));
  }

  return (
    <ChangeNumBtn
      num={num}
      onPlusOne={handlePlusOne}
      onMinusOne={handleMinusOne}
    />
  );
};

export const Standard = () => {
  return <OrderTable />;
};
