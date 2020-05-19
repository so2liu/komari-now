import React, { useState, useEffect } from "react";
import { makeStyles, Grid, IconButton, Typography } from "@material-ui/core";
import { ISub, TID } from "../interfaces";
import { CheckCircle, AddCircle } from "@material-ui/icons";

export default (props: {
  mainName: string;
  subs: ISub[];
  onClick: (id: string) => void;
}) => {
  const { subs, mainName } = props;
  const [clickedID, setClickedID] = useState("");

  function handleClick(id: TID) {
    setClickedID(id);
    props.onClick(id);
  }
  useEffect(() => {
    if (clickedID) {
      setTimeout(() => {
        setClickedID("");
      }, 2000);
    }
  }, [clickedID]);
  return (
    <Grid container justify="center" spacing={3}>
      {subs.map((sub) => {
        const { id, subname, price } = sub;
        const labelID = [mainName, subname].join(" ");
        return (
          <Grid
            key={labelID}
            item
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            onClick={() => {
              handleClick(id);
            }}
          >
            {Start(clickedID, id)}
            {Mid(id, subname ?? mainName)}
            {End(price)}
          </Grid>
        );
      })}
    </Grid>
  );
};

// const useStyles = makeStyles((theme) => ({
//   root: {
//     backgroundColor: theme.palette.background.paper,
//   },
//   addCircle: {
//     color: theme.palette.secondary.light,
//   },
//   checkCircle: {
//     color: theme.palette.primary,
//   },
// }));

const Start = (clickedID: TID, id: TID) => (
  <Grid item xs={1} container justify="flex-start" alignItems="center">
    <IconButton edge="start">
      {clickedID === id ? <CheckCircle /> : <AddCircle />}
    </IconButton>
  </Grid>
);

const Mid = (id: TID, name: string) => (
  <Grid item xs={9} container justify="flex-start" alignContent="center">
    <Typography>
      <b>[{id}]</b> {name}
    </Typography>
  </Grid>
);

const End = (price: number) => (
  <Grid item xs={1} container justify="flex-end" alignContent="center">
    <Typography>{price}</Typography>
  </Grid>
);
