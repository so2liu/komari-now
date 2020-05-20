import React from "react";
import {
  ButtonGroup,
  Button,
  IconButton,
  Typography,
  Container,
  Grid,
} from "@material-ui/core";
import {
  AddCircleOutline,
  RemoveCircleOutline,
  AddOutlined,
  RemoveOutlined,
} from "@material-ui/icons";

export default (props: {
  num: number;
  onPlusOne?: () => void;
  onMinusOne?: () => void;
}) => {
  return (
    <>
      <ButtonGroup
        variant="contained"
        color="primary"
        aria-label="contained primary button group"
        size="small"
      >
        <IconButton onClick={props.onPlusOne}>
          <AddOutlined />
        </IconButton>
        <Grid container justify="center" alignItems="center">
          <Typography variant="button">{props.num}</Typography>
        </Grid>
        <IconButton onClick={props.onMinusOne}>
          <RemoveOutlined />
        </IconButton>
      </ButtonGroup>
    </>
  );
};
