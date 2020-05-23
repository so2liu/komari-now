import React, { useState, useEffect } from "react";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    "& > * + *": {
      marginTop: theme.spacing(1),
    },
  },
}));

export default function HalfRating(props: {
  rating: number;
  readonly?: boolean;
  handleChange?: (value: number | null) => void;
}) {
  const { rating, readonly } = props;
  const classes = useStyles();
  const [value, setValue] = useState<number | null>(rating);
  useEffect(() => {
    if (readonly) setValue(rating);
  }, [rating]);

  useEffect(() => {
    if (!readonly) setValue(null);
  }, []);

  function handleChange(e: any, value: number | null) {
    setValue(value);
    if (props.handleChange) props.handleChange(value);
  }

  return (
    <div className={classes.root}>
      <Rating
        name="half-rating-read"
        value={value}
        size={readonly ? undefined : "large"}
        precision={0.5}
        readOnly={readonly}
        onChange={handleChange}
      />
    </div>
  );
}
